/**
 * POST /api/bookings/webhook
 *
 * Stripe webhook handler for the booking engine.
 * Handled events:
 *   checkout.session.completed  → confirm booking + send confirmation email
 *   checkout.session.expired    → mark booking expired
 *   payment_intent.payment_failed → mark booking expired (edge case)
 *
 * Stripe signs every request — verified via STRIPE_WEBHOOK_SECRET.
 * Handler errors return 200 to prevent Stripe retries; logged externally.
 */

import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import Stripe from 'stripe'
import config from '@payload-config'
import { sendBookingConfirmation } from '@/lib/booking-email'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
})

type StripeGroup = { sessionId: string; paymentIntentId: string; customerId: string; checkoutUrl: string }

export async function POST(req: NextRequest) {
  const sig    = req.headers.get('stripe-signature') ?? ''
  const secret = process.env.STRIPE_WEBHOOK_SECRET!

  let event: Stripe.Event

  try {
    const rawBody = await req.text()
    event = stripe.webhooks.constructEvent(rawBody, sig, secret)
  } catch (err: any) {
    console.error('[BookingWebhook] Signature verification failed:', err.message)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const payload = await getPayload({ config })

  try {
    switch (event.type) {

      // ── Payment succeeded ─────────────────────────────────────────────────
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const meta    = session.metadata ?? {}
        const { idempotencyKey, tenantEmail, tenantName, propertyName, checkIn, checkOut, nights } = meta

        if (!idempotencyKey) {
          console.warn('[BookingWebhook] checkout.session.completed missing idempotencyKey')
          break
        }

        const { docs } = await payload.find({
          collection: 'bookings',
          where: { idempotencyKey: { equals: idempotencyKey } },
          limit: 1,
          depth: 0,
        })

        if (!docs.length) {
          console.warn('[BookingWebhook] No booking found for idempotencyKey:', idempotencyKey)
          break
        }

        const booking = docs[0]!

        if (booking.status === 'confirmed') break // idempotent no-op

        const existingStripe = (booking as any).stripe as Partial<StripeGroup> ?? {}

        await payload.update({
          collection: 'bookings',
          id: booking.id,
          data: {
            status: 'confirmed',
            stripe: {
              ...existingStripe,
              paymentIntentId: typeof session.payment_intent === 'string'
                ? session.payment_intent
                : ((session.payment_intent as Stripe.PaymentIntent)?.id ?? ''),
              customerId: typeof session.customer === 'string'
                ? session.customer
                : ((session.customer as Stripe.Customer)?.id ?? ''),
            },
          },
        })

        console.info('[BookingWebhook] Booking confirmed:', booking.id, booking.confirmationCode)

        // Send confirmation email (non-blocking — webhook must return fast)
        if (tenantEmail) {
          sendBookingConfirmation({
            to:               tenantEmail,
            tenantName:       tenantName ?? 'Valued Guest',
            confirmationCode: String(booking.confirmationCode),
            propertyName:     propertyName ?? 'Your Property',
            checkIn:          checkIn?.slice(0, 10) ?? '',
            checkOut:         checkOut?.slice(0, 10) ?? '',
            nights:           parseInt(nights ?? '1', 10),
            totalAmountCents: (booking.totalAmount as number) ?? 0,
          }).catch(err => console.error('[BookingWebhook] Email send failed:', err))
        }

        break
      }

      // ── Payment session expired ───────────────────────────────────────────
      case 'checkout.session.expired': {
        const session = event.data.object as Stripe.Checkout.Session
        const { idempotencyKey } = session.metadata ?? {}
        if (!idempotencyKey) break

        const { docs } = await payload.find({
          collection: 'bookings',
          where: {
            and: [
              { idempotencyKey: { equals: idempotencyKey } },
              { status: { equals: 'pending_payment' } },
            ],
          },
          limit: 1,
          depth: 0,
        })

        if (docs.length) {
          await payload.update({
            collection: 'bookings',
            id: docs[0]!.id,
            data: { status: 'expired' },
          })
          console.info('[BookingWebhook] Booking expired:', docs[0]!.id)
        }
        break
      }

      // ── Payment failed ────────────────────────────────────────────────────
      // payment_intent.payment_failed fires on card decline before session expires.
      // Match by sessionId stored on the booking (set at create time).
      case 'payment_intent.payment_failed': {
        const pi = event.data.object as Stripe.PaymentIntent

        // Find the Stripe checkout session that created this PI
        const sessions = await stripe.checkout.sessions.list({ payment_intent: pi.id, limit: 1 })
        const sessionId = sessions.data[0]?.id
        if (!sessionId) break

        const { docs } = await payload.find({
          collection: 'bookings',
          where: {
            and: [
              { 'stripe.sessionId': { equals: sessionId } },
              { status: { equals: 'pending_payment' } },
            ],
          },
          limit: 1,
          depth: 0,
        })

        if (docs.length) {
          await payload.update({
            collection: 'bookings',
            id: docs[0]!.id,
            data: { status: 'expired' },
          })
          console.info('[BookingWebhook] Booking marked expired (payment failed):', docs[0]!.id)
        }
        break
      }

      default:
        break
    }
  } catch (err) {
    console.error('[BookingWebhook] Handler error:', err)
    return NextResponse.json({ error: 'Handler error', received: true }, { status: 200 })
  }

  return NextResponse.json({ received: true })
}

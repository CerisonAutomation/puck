/**
 * POST /api/bookings/webhook
 *
 * Stripe webhook handler for the booking engine.
 * Handled events:
 *   checkout.session.completed  → mark booking confirmed + store paymentIntentId
 *   checkout.session.expired    → mark booking expired
 *   payment_intent.payment_failed → mark booking expired (edge case)
 *
 * ⚠️  This route MUST be excluded from Payload's CSRF protection.
 *     It is already safe because Stripe signs every request with STRIPE_WEBHOOK_SECRET.
 *
 * Add to vercel.json if needed:
 *   { "path": "/api/bookings/webhook", "methods": ["POST"] }
 */

import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import Stripe from 'stripe'
import config from '@payload-config'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
})

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
        const { idempotencyKey, tenantEmail } = session.metadata ?? {}

        if (!idempotencyKey) {
          console.warn('[BookingWebhook] checkout.session.completed missing idempotencyKey in metadata')
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

        if (booking.status === 'confirmed') {
          // Already confirmed (duplicate webhook delivery) — idempotent, no-op
          break
        }

        await payload.update({
          collection: 'bookings',
          id: booking.id,
          data: {
            status: 'confirmed',
            stripe: {
              ...((booking as any).stripe ?? {}),
              paymentIntentId: typeof session.payment_intent === 'string'
                ? session.payment_intent
                : (session.payment_intent?.id ?? ''),
              customerId: typeof session.customer === 'string'
                ? session.customer
                : (session.customer?.id ?? ''),
            },
          },
        })

        console.info('[BookingWebhook] Booking confirmed:', booking.id, booking.confirmationCode)
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
      case 'payment_intent.payment_failed': {
        const pi = event.data.object as Stripe.PaymentIntent
        // Find by paymentIntentId stored on the booking after session creation
        const { docs } = await payload.find({
          collection: 'bookings',
          where: {
            and: [
              { 'stripe.paymentIntentId': { equals: pi.id } },
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
        // Unhandled event — return 200 so Stripe stops retrying
        break
    }
  } catch (err) {
    console.error('[BookingWebhook] Handler error:', err)
    // Return 200 anyway to prevent Stripe from retrying — log the error externally
    return NextResponse.json({ error: 'Handler error', received: true }, { status: 200 })
  }

  return NextResponse.json({ received: true })
}

/**
 * GET   /api/bookings/[id]  — fetch a single booking (Payload auth required)
 * PATCH /api/bookings/[id]  — cancel or refund a booking (Payload auth required)
 *
 * PATCH body:
 *   { action: 'cancel', reason?: string }
 *   { action: 'refund' }  — issues Stripe refund + marks cancelled
 *
 * Cancellation: sets status → 'cancelled'.
 * Refund: issues full Stripe refund then sets status → 'cancelled'.
 */

import { NextRequest } from 'next/server'
import { getPayload } from 'payload'
import Stripe from 'stripe'
import config from '@payload-config'
import { errorResponse, ok, BookingError } from '@/lib/booking-utils'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
})

type Params = { params: Promise<{ id: string }> }

export async function GET(_req: NextRequest, { params }: Params) {
  try {
    const { id } = await params
    const payload = await getPayload({ config })

    const booking = await payload.findByID({
      collection: 'bookings',
      id,
      depth: 1,
    })

    if (!booking) throw new BookingError('Booking not found', 404, 'NOT_FOUND')

    const { stripe: stripeData, ...safe } = booking as any
    return ok({
      ...safe,
      stripe: stripeData?.sessionId
        ? { sessionId: stripeData.sessionId, checkoutUrl: stripeData.checkoutUrl ?? null }
        : undefined,
    })
  } catch (err) {
    return errorResponse(err)
  }
}

export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    const { id } = await params
    const body   = await req.json()
    const { action, reason } = body

    if (!['cancel', 'refund'].includes(action)) {
      throw new BookingError(`Unknown action: "${action}". Supported: cancel, refund`, 400, 'UNKNOWN_ACTION')
    }

    const payload = await getPayload({ config })

    const user = await payload.auth({ headers: req.headers })
    if (!user?.user) throw new BookingError('Authentication required', 401, 'UNAUTHORIZED')

    const booking = await payload.findByID({
      collection: 'bookings',
      id,
      depth: 0,
    })

    if (!booking) throw new BookingError('Booking not found', 404, 'NOT_FOUND')

    const cancellable = ['pending_payment', 'confirmed']
    if (!cancellable.includes(booking.status as string)) {
      throw new BookingError(
        `Cannot cancel a booking with status "${booking.status}"`,
        409,
        'INVALID_STATUS_TRANSITION',
      )
    }

    // ── Stripe refund ─────────────────────────────────────────────────────────
    if (action === 'refund') {
      const stripeData = (booking as any).stripe
      if (!stripeData?.paymentIntentId) {
        throw new BookingError(
          'Cannot refund: no PaymentIntent found on this booking. Was the payment completed?',
          409,
          'NO_PAYMENT_INTENT',
        )
      }
      try {
        await stripe.refunds.create({ payment_intent: stripeData.paymentIntentId })
      } catch (stripeErr: any) {
        throw new BookingError(
          `Stripe refund failed: ${stripeErr.message}`,
          502,
          'STRIPE_REFUND_FAILED',
        )
      }
    }

    const updated = await payload.update({
      collection: 'bookings',
      id,
      data: {
        status:             'cancelled',
        cancellationReason: reason ?? (action === 'refund' ? 'Refunded by admin' : 'Cancelled by user'),
      },
    })

    return ok({ id: updated.id, status: updated.status, confirmationCode: updated.confirmationCode })
  } catch (err) {
    return errorResponse(err)
  }
}

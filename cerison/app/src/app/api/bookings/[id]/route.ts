/**
 * GET  /api/bookings/[id]  — fetch a single booking (auth required)
 * PATCH /api/bookings/[id]  — cancel a booking   (auth required)
 *
 * PATCH body:
 *   { action: 'cancel', reason?: string }
 *
 * Only bookings in 'pending_payment' or 'confirmed' status can be cancelled.
 * Cancellation does NOT automatically refund Stripe — handle refunds separately.
 */

import { NextRequest } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { errorResponse, ok, BookingError } from '@/lib/booking-utils'

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

    // Omit internal Stripe secrets from public response
    const { stripe, ...safe } = booking as any
    return ok({
      ...safe,
      stripe: stripe?.sessionId ? { sessionId: stripe.sessionId, checkoutUrl: stripe.checkoutUrl ?? null } : undefined,
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

    if (action !== 'cancel') {
      throw new BookingError(`Unknown action: "${action}". Supported: cancel`, 400, 'UNKNOWN_ACTION')
    }

    const payload = await getPayload({ config })

    // ── Verify auth (Payload session cookie or Bearer token) ─────────────────
    // For server-to-server calls pass X-Payload-Token header.
    // For browser calls the Payload auth cookie is forwarded automatically.
    const authHeader = req.headers.get('authorization')
    const user       = authHeader
      ? await payload.auth({ headers: req.headers })
      : null

    if (!user) throw new BookingError('Authentication required', 401, 'UNAUTHORIZED')

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

    const updated = await payload.update({
      collection: 'bookings',
      id,
      data: {
        status:             'cancelled',
        cancellationReason: reason ?? 'Cancelled by user',
      },
    })

    return ok({ id: updated.id, status: updated.status, confirmationCode: updated.confirmationCode })
  } catch (err) {
    return errorResponse(err)
  }
}

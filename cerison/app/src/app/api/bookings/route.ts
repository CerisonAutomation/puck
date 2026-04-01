/**
 * POST /api/bookings
 *
 * Creates a pending booking and returns a Stripe Checkout URL.
 *
 * Body (JSON):
 *   propertyId    string   — Payload doc ID
 *   checkIn       string   — YYYY-MM-DD
 *   checkOut      string   — YYYY-MM-DD
 *   tenant.name   string
 *   tenant.email  string   — validated as email
 *   tenant.phone? string
 *   idempotencyKey? string — client-supplied; server generates one if absent
 *
 * Returns:
 *   { bookingId, confirmationCode, checkoutUrl, totalAmount, nights }
 *
 * Security:
 *   - Zod validation on all inputs
 *   - In-memory rate limiting (10 req / IP / 60s)
 *   - Idempotency key dedup on retry
 *   - DB-level conflict check (no double-booking)
 */

import { NextRequest } from 'next/server'
import { getPayload } from 'payload'
import Stripe from 'stripe'
import config from '@payload-config'
import {
  CreateBookingSchema,
  parseDate,
  countNights,
  generateIdempotencyKey,
  errorResponse,
  ok,
  BookingError,
  checkRateLimit,
} from '@/lib/booking-utils'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
})

export async function POST(req: NextRequest) {
  try {
    // ── Rate limiting ─────────────────────────────────────────────────────────
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? '127.0.0.1'
    if (!checkRateLimit(ip)) {
      throw new BookingError('Too many requests — please wait before trying again', 429, 'RATE_LIMITED')
    }

    // ── Zod validation ────────────────────────────────────────────────────────
    const rawBody = await req.json()
    const parsed  = CreateBookingSchema.safeParse(rawBody)
    if (!parsed.success) {
      const message = parsed.error.issues.map(i => i.message).join('; ')
      throw new BookingError(message, 400, 'VALIDATION_ERROR')
    }

    const { propertyId, checkIn: checkInRaw, checkOut: checkOutRaw, tenant, idempotencyKey: clientKey } = parsed.data

    const checkIn  = parseDate(checkInRaw,  'checkIn')
    const checkOut = parseDate(checkOutRaw, 'checkOut')

    if (checkOut <= checkIn) {
      throw new BookingError('checkOut must be after checkIn', 400, 'INVALID_DATES')
    }

    const nights = countNights(checkIn, checkOut)
    if (nights < 1) throw new BookingError('Minimum stay is 1 night', 400, 'MIN_STAY')

    const payload = await getPayload({ config })

    // ── Idempotency check ────────────────────────────────────────────────────
    const idempotencyKey = clientKey ?? generateIdempotencyKey(propertyId, checkIn, checkOut, tenant.email)

    const { docs: existing } = await payload.find({
      collection: 'bookings',
      where: {
        and: [
          { idempotencyKey: { equals: idempotencyKey } },
          { status: { not_in: ['expired', 'cancelled'] } },
        ],
      },
      limit: 1,
      depth: 0,
    })

    if (existing.length > 0) {
      const dup = existing[0]!
      return ok({
        bookingId:        dup.id,
        confirmationCode: dup.confirmationCode,
        checkoutUrl:      (dup as any).stripe?.checkoutUrl ?? null,
        totalAmount:      dup.totalAmount,
        nights:           dup.nights,
        duplicate:        true,
      })
    }

    // ── Fetch property early (needed for pricing + availability flag) ─────────
    const property = await payload.findByID({
      collection: 'properties',
      id: propertyId,
      depth: 0,
    })

    if (!property)         throw new BookingError('Property not found', 404, 'NOT_FOUND')
    if (!property.available) throw new BookingError('Property is not available for booking', 409, 'PROPERTY_UNAVAILABLE')

    // ── Availability double-check (conflict guard) ───────────────────────────
    const [{ totalDocs: bookingConflicts }, { totalDocs: blockConflicts }] = await Promise.all([
      payload.find({
        collection: 'bookings',
        where: {
          and: [
            { property: { equals: propertyId } },
            { status:   { in: ['pending_payment', 'confirmed'] } },
            { checkIn:  { less_than: checkOut.toISOString() } },
            { checkOut: { greater_than: checkIn.toISOString() } },
          ],
        },
        limit: 1,
        depth: 0,
      }),
      payload.find({
        collection: 'booking-availability-blocks',
        where: {
          and: [
            { property:  { equals: propertyId } },
            { startDate: { less_than: checkOut.toISOString() } },
            { endDate:   { greater_than: checkIn.toISOString() } },
          ],
        },
        limit: 1,
        depth: 0,
      }),
    ])

    if (bookingConflicts + blockConflicts > 0) {
      throw new BookingError(
        'Property is not available for the requested dates',
        409,
        'PROPERTY_UNAVAILABLE',
      )
    }

    // ── Pricing ───────────────────────────────────────────────────────────────
    const monthlyRent: number = (property.monthlyRent as number) ?? 0
    const nightlyRateCents    = Math.round((monthlyRent / 30) * 100)
    const totalAmountCents    = nightlyRateCents * nights

    if (totalAmountCents <= 0) {
      throw new BookingError(
        'Property has no pricing configured. Contact the property manager.',
        422,
        'NO_PRICING',
      )
    }

    // ── Create Stripe Checkout session ───────────────────────────────────────
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL ?? 'http://localhost:3000'

    let session: Stripe.Checkout.Session
    try {
      session = await stripe.checkout.sessions.create(
        {
          mode: 'payment',
          payment_method_types: ['card'],
          customer_email: tenant.email,
          line_items: [
            {
              quantity: 1,
              price_data: {
                currency: 'usd',
                unit_amount: totalAmountCents,
                product_data: {
                  name: `${property.name} — ${nights} night${nights > 1 ? 's' : ''}`,
                  description: `Check-in: ${checkIn.toISOString().slice(0, 10)} · Check-out: ${checkOut.toISOString().slice(0, 10)}`,
                  images: [],
                },
              },
            },
          ],
          metadata: {
            propertyId,
            propertyName: String(property.name),
            checkIn:      checkIn.toISOString(),
            checkOut:     checkOut.toISOString(),
            tenantEmail:  tenant.email,
            tenantName:   tenant.name,
            tenantPhone:  tenant.phone ?? '',
            idempotencyKey,
            nights:       String(nights),
          },
          success_url: `${baseUrl}/booking/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url:  `${baseUrl}/booking/cancel?session_id={CHECKOUT_SESSION_ID}`,
        },
        { idempotencyKey },
      )
    } catch (stripeErr: any) {
      console.error('[BookingAPI] Stripe session creation failed:', stripeErr.message)
      throw new BookingError(
        'Payment system is temporarily unavailable. Please try again in a moment.',
        503,
        'STRIPE_ERROR',
      )
    }

    // ── Persist booking in Payload ────────────────────────────────────────────
    const booking = await payload.create({
      collection: 'bookings',
      data: {
        property:    propertyId,
        status:      'pending_payment',
        checkIn:     checkIn.toISOString(),
        checkOut:    checkOut.toISOString(),
        tenant:      { name: tenant.name, email: tenant.email, phone: tenant.phone ?? '' },
        totalAmount: totalAmountCents,
        nightlyRate: nightlyRateCents,
        nights,
        idempotencyKey,
        stripe: {
          sessionId:   session.id,
          checkoutUrl: session.url ?? '',
        },
      },
    })

    return ok(
      {
        bookingId:        booking.id,
        confirmationCode: booking.confirmationCode,
        checkoutUrl:      session.url,
        totalAmount:      totalAmountCents,
        nights,
      },
      201,
    )
  } catch (err) {
    return errorResponse(err)
  }
}

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
 *   tenant.email  string
 *   tenant.phone? string
 *   idempotencyKey? string — client-supplied; server generates one if absent
 *
 * Returns:
 *   { bookingId, confirmationCode, checkoutUrl, totalAmount, nights }
 *
 * Idempotency:
 *   If a booking with the same idempotencyKey already exists and is not
 *   expired/cancelled, returns the existing record without creating a new one.
 */

import { NextRequest } from 'next/server'
import { getPayload } from 'payload'
import Stripe from 'stripe'
import config from '@payload-config'
import {
  parseDate,
  countNights,
  generateIdempotencyKey,
  errorResponse,
  ok,
  BookingError,
} from '@/lib/booking-utils'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const { propertyId, checkIn: checkInRaw, checkOut: checkOutRaw, tenant, idempotencyKey: clientKey } = body

    // ── Validate inputs ──────────────────────────────────────────────────────
    if (!propertyId)       throw new BookingError('propertyId is required', 400, 'MISSING_PROPERTY')
    if (!tenant?.name)     throw new BookingError('tenant.name is required', 400, 'MISSING_TENANT_NAME')
    if (!tenant?.email)    throw new BookingError('tenant.email is required', 400, 'MISSING_TENANT_EMAIL')

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
        checkoutUrl:      dup.stripe?.checkoutUrl ?? null,
        totalAmount:      dup.totalAmount,
        nights:           dup.nights,
        duplicate:        true,
      })
    }

    // ── Availability double-check (atomic guard) ─────────────────────────────
    const { totalDocs: conflicts } = await payload.find({
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
    })

    if (conflicts > 0) {
      throw new BookingError(
        'Property is not available for the requested dates',
        409,
        'PROPERTY_UNAVAILABLE',
      )
    }

    // ── Fetch property for pricing ───────────────────────────────────────────
    const property = await payload.findByID({
      collection: 'properties',
      id: propertyId,
      depth: 0,
    })

    if (!property) throw new BookingError('Property not found', 404, 'NOT_FOUND')
    if (!property.available) throw new BookingError('Property is not available', 409, 'PROPERTY_UNAVAILABLE')

    // monthlyRent is stored in USD — derive a nightly rate
    const monthlyRent: number = (property.monthlyRent as number) ?? 0
    const nightlyRateCents = Math.round((monthlyRent / 30) * 100)
    const totalAmountCents = nightlyRateCents * nights

    if (totalAmountCents <= 0) {
      throw new BookingError(
        'Property has no pricing configured. Contact the property manager.',
        422,
        'NO_PRICING',
      )
    }

    // ── Create Stripe Checkout session ───────────────────────────────────────
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL ?? 'http://localhost:3000'

    const session = await stripe.checkout.sessions.create({
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
        checkIn:  checkIn.toISOString(),
        checkOut: checkOut.toISOString(),
        tenantEmail: tenant.email,
        tenantName:  tenant.name,
        tenantPhone: tenant.phone ?? '',
        idempotencyKey,
        nights: String(nights),
      },
      success_url: `${baseUrl}/booking/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:  `${baseUrl}/booking/cancel?session_id={CHECKOUT_SESSION_ID}`,
    }, { idempotencyKey })

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

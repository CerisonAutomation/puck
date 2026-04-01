/**
 * GET /api/bookings/availability
 *
 * Query params:
 *   propertyId  — Payload document ID of the property
 *   checkIn     — YYYY-MM-DD
 *   checkOut    — YYYY-MM-DD
 *
 * Returns:
 *   { available: boolean, conflicts: number }
 *
 * Checks BOTH confirmed Bookings AND admin BookingAvailabilityBlocks.
 * Does NOT require authentication — safe for public calendars.
 */

import { NextRequest } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { parseDate, datesOverlap, errorResponse, ok, BookingError } from '@/lib/booking-utils'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl
    const propertyId = searchParams.get('propertyId')
    const checkInRaw  = searchParams.get('checkIn')
    const checkOutRaw = searchParams.get('checkOut')

    if (!propertyId) throw new BookingError('propertyId is required', 400, 'MISSING_PROPERTY')

    const checkIn  = parseDate(checkInRaw,  'checkIn')
    const checkOut = parseDate(checkOutRaw, 'checkOut')

    if (checkOut <= checkIn) {
      throw new BookingError('checkOut must be after checkIn', 400, 'INVALID_DATES')
    }

    const payload = await getPayload({ config })

    // ── 1. Confirmed bookings that overlap ───────────────────────────────────
    const { totalDocs: bookingConflicts } = await payload.find({
      collection: 'bookings',
      where: {
        and: [
          { property:  { equals: propertyId } },
          { status:    { in: ['pending_payment', 'confirmed'] } },
          { checkIn:   { less_than: checkOut.toISOString() } },
          { checkOut:  { greater_than: checkIn.toISOString() } },
        ],
      },
      limit: 1,
      depth: 0,
    })

    // ── 2. Admin availability blocks that overlap ────────────────────────────
    const { totalDocs: blockConflicts } = await payload.find({
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
    })

    const conflicts = bookingConflicts + blockConflicts
    return ok({ available: conflicts === 0, conflicts })
  } catch (err) {
    return errorResponse(err)
  }
}

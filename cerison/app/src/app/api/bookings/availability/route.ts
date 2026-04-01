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
 * Checks BOTH confirmed Bookings AND admin BookingAvailabilityBlocks in parallel.
 * Does NOT require authentication — safe for public calendars.
 * Short cache (30s) applied to reduce DB load from calendar widgets.
 */

import { NextRequest } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { parseDate, errorResponse, ok, BookingError } from '@/lib/booking-utils'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl
    const propertyId  = searchParams.get('propertyId')
    const checkInRaw  = searchParams.get('checkIn')
    const checkOutRaw = searchParams.get('checkOut')

    if (!propertyId) throw new BookingError('propertyId is required', 400, 'MISSING_PROPERTY')

    const checkIn  = parseDate(checkInRaw,  'checkIn')
    const checkOut = parseDate(checkOutRaw, 'checkOut')

    if (checkOut <= checkIn) {
      throw new BookingError('checkOut must be after checkIn', 400, 'INVALID_DATES')
    }

    const payload = await getPayload({ config })

    // Run both checks in parallel
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

    const conflicts = bookingConflicts + blockConflicts
    const response  = ok({ available: conflicts === 0, conflicts })

    // Short public cache — safe because availability is eventually-consistent
    response.headers.set('Cache-Control', 's-maxage=30, stale-while-revalidate=60')
    return response
  } catch (err) {
    return errorResponse(err)
  }
}

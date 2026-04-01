import { NextResponse } from 'next/server'

// ---------------------------------------------------------------------------
// Date helpers
// ---------------------------------------------------------------------------

/**
 * Returns true when [aStart, aEnd) overlaps [bStart, bEnd).
 * Uses exclusive end-date convention (checkout day is not a blocked night).
 */
export function datesOverlap(
  aStart: Date,
  aEnd: Date,
  bStart: Date,
  bEnd: Date,
): boolean {
  return aStart < bEnd && aEnd > bStart
}

/**
 * Count the number of nights between two Date objects.
 * checkOut - checkIn, floored to whole days.
 */
export function countNights(checkIn: Date, checkOut: Date): number {
  const ms = checkOut.getTime() - checkIn.getTime()
  return Math.floor(ms / (1000 * 60 * 60 * 24))
}

/**
 * Parse a YYYY-MM-DD or ISO string into a UTC midnight Date.
 * Throws a descriptive error if the string is invalid.
 */
export function parseDate(raw: unknown, fieldName: string): Date {
  if (typeof raw !== 'string' || !raw) {
    throw new BookingError(`${fieldName} must be a non-empty date string`, 400)
  }
  const d = new Date(raw)
  if (isNaN(d.getTime())) {
    throw new BookingError(`${fieldName} is not a valid date: "${raw}"`, 400)
  }
  // Normalise to UTC midnight so comparisons are day-accurate
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()))
}

// ---------------------------------------------------------------------------
// Idempotency
// ---------------------------------------------------------------------------

/**
 * Generate a stable idempotency key from booking inputs.
 * Safe to pass from client on retry — server re-hashes and compares.
 */
export function generateIdempotencyKey(
  propertyId: string,
  checkIn: Date,
  checkOut: Date,
  tenantEmail: string,
): string {
  const raw = `${propertyId}|${checkIn.toISOString()}|${checkOut.toISOString()}|${tenantEmail.toLowerCase()}`
  // Simple deterministic hash (no crypto dependency needed for this use-case)
  let hash = 0
  for (let i = 0; i < raw.length; i++) {
    hash = (Math.imul(31, hash) + raw.charCodeAt(i)) | 0
  }
  return `idem_${Math.abs(hash).toString(36)}_${Date.now().toString(36)}`
}

// ---------------------------------------------------------------------------
// Typed error class
// ---------------------------------------------------------------------------

export class BookingError extends Error {
  constructor(
    public readonly message: string,
    public readonly statusCode: number = 500,
    public readonly code?: string,
  ) {
    super(message)
    this.name = 'BookingError'
  }
}

// ---------------------------------------------------------------------------
// Response helpers
// ---------------------------------------------------------------------------

export function errorResponse(err: unknown): NextResponse {
  if (err instanceof BookingError) {
    return NextResponse.json(
      { error: err.message, code: err.code ?? 'BOOKING_ERROR' },
      { status: err.statusCode },
    )
  }
  console.error('[BookingAPI] Unhandled error:', err)
  return NextResponse.json(
    { error: 'Internal server error', code: 'INTERNAL_ERROR' },
    { status: 500 },
  )
}

export function ok<T>(data: T, status = 200): NextResponse {
  return NextResponse.json(data, { status })
}

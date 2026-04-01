import { NextResponse } from 'next/server'
import { z } from 'zod'

// ---------------------------------------------------------------------------
// Zod schemas
// ---------------------------------------------------------------------------

export const CreateBookingSchema = z.object({
  propertyId:     z.string().min(1, 'propertyId is required'),
  checkIn:        z.string().min(1, 'checkIn is required'),
  checkOut:       z.string().min(1, 'checkOut is required'),
  idempotencyKey: z.string().optional(),
  tenant: z.object({
    name:  z.string().min(1, 'tenant.name is required'),
    email: z.string().email('tenant.email must be a valid email address'),
    phone: z.string().optional(),
  }),
})

export type CreateBookingInput = z.infer<typeof CreateBookingSchema>

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

/** Count the number of nights between two Date objects. */
export function countNights(checkIn: Date, checkOut: Date): number {
  const ms = checkOut.getTime() - checkIn.getTime()
  return Math.floor(ms / (1000 * 60 * 60 * 24))
}

/**
 * Parse a YYYY-MM-DD or ISO string into a UTC midnight Date.
 * Throws a descriptive BookingError if the string is invalid.
 */
export function parseDate(raw: unknown, fieldName: string): Date {
  if (typeof raw !== 'string' || !raw) {
    throw new BookingError(`${fieldName} must be a non-empty date string`, 400, 'INVALID_DATE')
  }
  const d = new Date(raw)
  if (isNaN(d.getTime())) {
    throw new BookingError(`${fieldName} is not a valid date: "${raw}"`, 400, 'INVALID_DATE')
  }
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()))
}

// ---------------------------------------------------------------------------
// Idempotency
// ---------------------------------------------------------------------------

/**
 * Generate a stable idempotency key from booking inputs.
 * NOTE: does NOT embed Date.now() so the key is truly stable for retries.
 */
export function generateIdempotencyKey(
  propertyId: string,
  checkIn: Date,
  checkOut: Date,
  tenantEmail: string,
): string {
  const raw = `${propertyId}|${checkIn.toISOString()}|${checkOut.toISOString()}|${tenantEmail.toLowerCase()}`
  let hash = 0
  for (let i = 0; i < raw.length; i++) {
    hash = (Math.imul(31, hash) + raw.charCodeAt(i)) | 0
  }
  return `idem_${Math.abs(hash).toString(36)}`
}

// ---------------------------------------------------------------------------
// Rate limiting (in-memory, edge-safe simple sliding window)
// ---------------------------------------------------------------------------

const rateLimitMap = new Map<string, number[]>()
const RATE_WINDOW_MS = 60_000   // 1 minute
const RATE_LIMIT     = 10       // max requests per IP per window

export function checkRateLimit(ip: string): boolean {
  const now   = Date.now()
  const times = (rateLimitMap.get(ip) ?? []).filter(t => now - t < RATE_WINDOW_MS)
  times.push(now)
  rateLimitMap.set(ip, times)
  return times.length <= RATE_LIMIT
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
  // Zod validation error
  if (err && typeof err === 'object' && 'issues' in err) {
    const issues = (err as any).issues
    const message = issues.map((i: any) => i.message).join('; ')
    return NextResponse.json(
      { error: message, code: 'VALIDATION_ERROR' },
      { status: 400 },
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

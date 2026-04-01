/**
 * GET /api/healthz
 * Lightweight health-check endpoint for Vercel/uptime monitors.
 * Returns 200 { ok: true, ts } when the runtime is healthy.
 */
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export function GET() {
  return NextResponse.json({ ok: true, ts: new Date().toISOString() })
}

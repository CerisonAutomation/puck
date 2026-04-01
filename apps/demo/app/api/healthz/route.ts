import { NextResponse } from "next/server";

/**
 * @route GET /api/healthz
 * @description Health check endpoint for Vercel deployment monitoring.
 * Returns 200 OK with uptime and environment info.
 */
export async function GET() {
  return NextResponse.json(
    {
      status: "ok",
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV ?? "unknown",
      version: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? "local",
    },
    { status: 200 }
  );
}

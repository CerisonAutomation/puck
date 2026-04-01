import { NextRequest, NextResponse } from "next/server";

/**
 * @route POST /api/save
 * @description Persists Puck editor page data.
 * In production, replace the in-memory store with Supabase / KV / DB.
 * Body: { path: string; data: PuckData }
 */

// In-memory store — swap for Supabase/Redis in production
const store = new Map<string, unknown>();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { path, data } = body as { path: string; data: unknown };

    if (!path || !data) {
      return NextResponse.json(
        { error: "Missing required fields: path, data" },
        { status: 400 }
      );
    }

    // Sanitise path key
    const key = path.replace(/[^a-zA-Z0-9\-\/]/g, "").slice(0, 200);
    store.set(key, data);

    return NextResponse.json({ ok: true, key }, { status: 200 });
  } catch (err) {
    console.error("[/api/save] Error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const path = searchParams.get("path");

  if (!path) {
    return NextResponse.json({ error: "Missing path query param" }, { status: 400 });
  }

  const key = path.replace(/[^a-zA-Z0-9\-\/]/g, "").slice(0, 200);
  const data = store.get(key) ?? null;

  return NextResponse.json({ data }, { status: 200 });
}

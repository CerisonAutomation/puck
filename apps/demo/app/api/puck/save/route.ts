import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { z } from 'zod';

// Service-role client for writes (bypasses RLS on server-side only)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Zod schema — validates incoming payload
const SaveSchema = z.object({
  slug:    z.string().min(1).max(200).regex(/^[a-z0-9/_-]+$/),
  content: z.record(z.unknown()),
});

/**
 * POST /api/puck/save
 * Body: { slug: string; content: PuckData }
 * Requires authenticated Supabase session.
 */
export async function POST(req: NextRequest) {
  // Auth check
  const supabase = createRouteHandlerClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Parse + validate body
  let body: unknown;
  try { body = await req.json(); } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = SaveSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 });
  }

  const { slug, content } = parsed.data;

  const { error } = await supabaseAdmin
    .from('pages')
    .upsert(
      { slug, content, updated_at: new Date().toISOString() },
      { onConflict: 'slug' }
    );

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, slug });
}

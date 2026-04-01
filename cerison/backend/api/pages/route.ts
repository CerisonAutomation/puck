/**
 * @file api/pages/route.ts
 * @description Next.js App Router Route Handler — Pages collection
 *
 * GET  /api/pages          → list all pages (authenticated)
 * POST /api/pages          → create new page (authenticated)
 */

import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '../../lib/supabase-server';
import { requireAuth, AuthError } from '../../lib/auth';
import { z } from 'zod';

// ── Zod schema ─────────────────────────────────────────────
const CreatePageSchema = z.object({
  slug:        z.string().min(1).regex(/^[a-z0-9-/]+$/, 'Slug must be URL-safe'),
  title:       z.string().min(1).max(200).optional().default('Untitled Page'),
  description: z.string().max(500).optional(),
  og_image:    z.string().url().optional().or(z.literal('')),
  lang:        z.enum(['en', 'es', 'fr', 'de', 'pt']).optional().default('en'),
  data:        z.record(z.unknown()).optional().default({}),
  published:   z.boolean().optional().default(false),
});

// ── GET /api/pages ──────────────────────────────────────────
export async function GET(request: NextRequest) {
  try {
    await requireAuth(request);

    const { searchParams } = new URL(request.url);
    const published = searchParams.get('published');
    const search    = searchParams.get('search');
    const limit     = Math.min(parseInt(searchParams.get('limit') ?? '50'), 100);
    const offset    = parseInt(searchParams.get('offset') ?? '0');

    let query = supabaseServer
      .from('pages')
      .select('id, slug, title, description, published, lang, created_at, updated_at', { count: 'exact' })
      .order('updated_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (published !== null) {
      query = query.eq('published', published === 'true');
    }
    if (search) {
      query = query.or(`title.ilike.%${search}%,slug.ilike.%${search}%`);
    }

    const { data, error, count } = await query;

    if (error) throw error;

    return NextResponse.json({ data, total: count, limit, offset });
  } catch (err) {
    return handleError(err);
  }
}

// ── POST /api/pages ─────────────────────────────────────────
export async function POST(request: NextRequest) {
  try {
    const { user } = await requireAuth(request);
    const body = await request.json();
    const parsed = CreatePageSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', issues: parsed.error.flatten() },
        { status: 422 }
      );
    }

    const { data, error } = await supabaseServer
      .from('pages')
      .insert({
        ...parsed.data,
        data: parsed.data.data as object,
        created_by: user.id,
        updated_by: user.id,
      })
      .select()
      .single();

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json({ error: 'Slug already exists' }, { status: 409 });
      }
      throw error;
    }

    return NextResponse.json({ data }, { status: 201 });
  } catch (err) {
    return handleError(err);
  }
}

// ── Error handler ───────────────────────────────────────────
function handleError(err: unknown): NextResponse {
  if (err instanceof AuthError) {
    return NextResponse.json({ error: err.message }, { status: err.status });
  }
  console.error('[/api/pages]', err);
  return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
}

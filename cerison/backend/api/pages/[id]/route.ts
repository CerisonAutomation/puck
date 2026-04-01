/**
 * @file api/pages/[id]/route.ts
 * @description Next.js App Router Route Handler — Single page
 *
 * GET    /api/pages/:id  → get page by id or slug
 * PATCH  /api/pages/:id  → update page (authenticated)
 * DELETE /api/pages/:id  → delete page (authenticated)
 */

import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '../../../lib/supabase-server';
import { requireAuth, AuthError } from '../../../lib/auth';
import { z } from 'zod';

const UpdatePageSchema = z.object({
  slug:        z.string().min(1).regex(/^[a-z0-9-/]+$/).optional(),
  title:       z.string().min(1).max(200).optional(),
  description: z.string().max(500).optional(),
  og_image:    z.string().url().optional().or(z.literal('')),
  lang:        z.enum(['en', 'es', 'fr', 'de', 'pt']).optional(),
  data:        z.record(z.unknown()).optional(),
  published:   z.boolean().optional(),
});

type RouteParams = { params: { id: string } };

// ── GET /api/pages/:id ──────────────────────────────────────
export async function GET(_: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params;

    // Allow lookup by UUID or slug
    const isUuid = /^[0-9a-f-]{36}$/.test(id);
    const query = supabaseServer.from('pages').select('*');
    const { data, error } = await (isUuid ? query.eq('id', id) : query.eq('slug', id))
      .single();

    if (error?.code === 'PGRST116') {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    }
    if (error) throw error;

    return NextResponse.json({ data });
  } catch (err) {
    return handleError(err);
  }
}

// ── PATCH /api/pages/:id ────────────────────────────────────
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { user } = await requireAuth(request);
    const body = await request.json();
    const parsed = UpdatePageSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', issues: parsed.error.flatten() },
        { status: 422 }
      );
    }

    // Save a revision before applying changes
    const { data: existing } = await supabaseServer
      .from('pages')
      .select('data')
      .eq('id', params.id)
      .single();

    if (existing?.data) {
      await supabaseServer.from('page_revisions').insert({
        page_id:    params.id,
        data:       existing.data as object,
        created_by: user.id,
      });
    }

    const { data, error } = await supabaseServer
      .from('pages')
      .update({ ...parsed.data, updated_by: user.id })
      .eq('id', params.id)
      .select()
      .single();

    if (error?.code === 'PGRST116') {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    }
    if (error?.code === '23505') {
      return NextResponse.json({ error: 'Slug already exists' }, { status: 409 });
    }
    if (error) throw error;

    return NextResponse.json({ data });
  } catch (err) {
    return handleError(err);
  }
}

// ── DELETE /api/pages/:id ───────────────────────────────────
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    await requireAuth(request);

    const { error } = await supabaseServer
      .from('pages')
      .delete()
      .eq('id', params.id);

    if (error?.code === 'PGRST116') {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    }
    if (error) throw error;

    return new NextResponse(null, { status: 204 });
  } catch (err) {
    return handleError(err);
  }
}

function handleError(err: unknown): NextResponse {
  if (err instanceof AuthError) {
    return NextResponse.json({ error: err.message }, { status: err.status });
  }
  console.error('[/api/pages/[id]]', err);
  return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
}

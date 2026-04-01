/**
 * @file api/pages/publish/route.ts
 * @description Toggle page published state
 *
 * POST /api/pages/publish  { id: string, published: boolean }
 */

import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '../../../lib/supabase-server';
import { requireAuth, AuthError } from '../../../lib/auth';
import { z } from 'zod';

const PublishSchema = z.object({
  id:        z.string().uuid(),
  published: z.boolean(),
});

export async function POST(request: NextRequest) {
  try {
    const { user } = await requireAuth(request);
    const body = await request.json();
    const parsed = PublishSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', issues: parsed.error.flatten() },
        { status: 422 }
      );
    }

    const { data, error } = await supabaseServer
      .from('pages')
      .update({ published: parsed.data.published, updated_by: user.id })
      .eq('id', parsed.data.id)
      .select('id, slug, title, published')
      .single();

    if (error?.code === 'PGRST116') {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    }
    if (error) throw error;

    return NextResponse.json({ data });
  } catch (err) {
    if (err instanceof AuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    console.error('[/api/pages/publish]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * @file api/pages/[id]/revisions/route.ts
 * @description List and restore page revisions
 *
 * GET   /api/pages/:id/revisions            → list revisions (paginated)
 * POST  /api/pages/:id/revisions/:revId/restore → restore (handled via POST with body)
 */

import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '../../../../lib/supabase-server';
import { requireAuth, AuthError } from '../../../../lib/auth';

type RouteParams = { params: { id: string } };

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    await requireAuth(request);

    const { searchParams } = new URL(request.url);
    const limit  = Math.min(parseInt(searchParams.get('limit') ?? '20'), 50);
    const offset = parseInt(searchParams.get('offset') ?? '0');

    const { data, error, count } = await supabaseServer
      .from('page_revisions')
      .select('id, page_id, label, created_at, created_by', { count: 'exact' })
      .eq('page_id', params.id)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;

    return NextResponse.json({ data, total: count, limit, offset });
  } catch (err) {
    if (err instanceof AuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    console.error('[/api/pages/[id]/revisions]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

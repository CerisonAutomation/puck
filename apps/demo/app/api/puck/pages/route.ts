import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/**
 * GET /api/puck/pages
 * Returns list of all pages (slug + updated_at) for the dashboard.
 */
export async function GET() {
  const { data, error } = await supabase
    .from('pages')
    .select('slug, updated_at')
    .order('updated_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ pages: data });
}

/**
 * DELETE /api/puck/pages?slug=my-page
 * Deletes a page by slug.
 */
export async function DELETE(req: Request) {
  const url  = new URL(req.url);
  const slug = url.searchParams.get('slug');
  if (!slug) return NextResponse.json({ error: 'Missing slug' }, { status: 400 });

  const { error } = await supabase.from('pages').delete().eq('slug', slug);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}

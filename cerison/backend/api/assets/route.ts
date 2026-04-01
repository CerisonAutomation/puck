/**
 * @file api/assets/route.ts
 * @description Media library — upload to Supabase Storage, register in DB
 *
 * GET  /api/assets   → list assets
 * POST /api/assets   → upload (multipart/form-data: file, alt?)
 */

import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '../../lib/supabase-server';
import { requireAuth, AuthError } from '../../lib/auth';

const BUCKET = process.env.SUPABASE_STORAGE_BUCKET ?? 'puck-assets';
const MAX_SIZE_MB = 10;

export async function GET(request: NextRequest) {
  try {
    await requireAuth(request);

    const { searchParams } = new URL(request.url);
    const limit  = Math.min(parseInt(searchParams.get('limit') ?? '50'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');

    const { data, error, count } = await supabaseServer
      .from('assets')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;

    return NextResponse.json({ data, total: count, limit, offset });
  } catch (err) {
    return handleError(err);
  }
}

export async function POST(request: NextRequest) {
  try {
    const { user } = await requireAuth(request);

    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const alt  = (formData.get('alt') as string | null) ?? '';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      return NextResponse.json({ error: `File too large (max ${MAX_SIZE_MB}MB)` }, { status: 413 });
    }

    const ext      = file.name.split('.').pop();
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const buffer   = Buffer.from(await file.arrayBuffer());

    // Upload to Supabase Storage
    const { error: storageError } = await supabaseServer.storage
      .from(BUCKET)
      .upload(filename, buffer, { contentType: file.type, upsert: false });

    if (storageError) throw storageError;

    const { data: { publicUrl } } = supabaseServer.storage
      .from(BUCKET)
      .getPublicUrl(filename);

    // Register in DB
    const { data, error: dbError } = await supabaseServer
      .from('assets')
      .insert({
        filename:   file.name,
        url:        publicUrl,
        mime_type:  file.type,
        size:       file.size,
        alt:        alt || null,
        created_by: user.id,
      })
      .select()
      .single();

    if (dbError) throw dbError;

    return NextResponse.json({ data }, { status: 201 });
  } catch (err) {
    return handleError(err);
  }
}

function handleError(err: unknown): NextResponse {
  if (err instanceof AuthError) {
    return NextResponse.json({ error: err.message }, { status: err.status });
  }
  console.error('[/api/assets]', err);
  return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
}

/**
 * @file api/templates/route.ts
 * @description Page templates API
 *
 * GET  /api/templates   → list all templates
 * POST /api/templates   → create template
 */

import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '../../lib/supabase-server';
import { requireAuth, AuthError } from '../../lib/auth';
import { z } from 'zod';

const CreateTemplateSchema = z.object({
  name:        z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  thumbnail:   z.string().url().optional().or(z.literal('')),
  data:        z.record(z.unknown()),
});

export async function GET(request: NextRequest) {
  try {
    await requireAuth(request);

    const { data, error } = await supabaseServer
      .from('templates')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json({ data });
  } catch (err) {
    return handleError(err);
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAuth(request);
    const body = await request.json();
    const parsed = CreateTemplateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', issues: parsed.error.flatten() },
        { status: 422 }
      );
    }

    const { data, error } = await supabaseServer
      .from('templates')
      .insert(parsed.data as { name: string; data: object })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ data }, { status: 201 });
  } catch (err) {
    return handleError(err);
  }
}

function handleError(err: unknown): NextResponse {
  if (err instanceof AuthError) {
    return NextResponse.json({ error: err.message }, { status: err.status });
  }
  console.error('[/api/templates]', err);
  return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
}

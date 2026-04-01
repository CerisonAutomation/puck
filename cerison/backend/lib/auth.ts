/**
 * @file auth.ts
 * @description Server-side auth helpers for Next.js Route Handlers.
 * Validates Bearer JWT from Authorization header using Supabase.
 */

import { createClient } from '@supabase/supabase-js';
import type { NextRequest } from 'next/server';
import type { Database } from './database.types';

/**
 * Extracts and validates the Bearer token from an incoming request.
 * Returns the authenticated user or throws a 401 Response.
 *
 * @example
 * const user = await requireAuth(request);
 */
export async function requireAuth(request: NextRequest) {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    throw new AuthError('Missing or malformed Authorization header', 401);
  }

  const token = authHeader.slice(7);

  // Create a per-request client with the user's JWT (anon key + user token)
  const client = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: { headers: { Authorization: `Bearer ${token}` } },
      auth: { persistSession: false, autoRefreshToken: false },
    }
  );

  const { data, error } = await client.auth.getUser(token);

  if (error || !data.user) {
    throw new AuthError('Invalid or expired token', 401);
  }

  return { user: data.user, token };
}

/**
 * Typed AuthError that carries an HTTP status code.
 */
export class AuthError extends Error {
  constructor(
    message: string,
    public readonly status: number = 401
  ) {
    super(message);
    this.name = 'AuthError';
  }
}

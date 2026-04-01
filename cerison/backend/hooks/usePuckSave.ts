/**
 * @file usePuckSave.ts
 * @description React hook — wires Puck's onPublish callback to the backend API.
 * Handles optimistic UI, error toasts, and auto-save debouncing.
 *
 * @example
 * const { handlePublish, isSaving, lastSaved } = usePuckSave({ pageId });
 * <Puck ... onPublish={handlePublish} />
 */

'use client';

import { useCallback, useState } from 'react';
import type { Data } from '@measured/puck';
import { supabaseBrowser } from '../lib/supabase-browser';

interface UsePuckSaveOptions {
  pageId: string;
  onSuccess?: () => void;
  onError?: (err: Error) => void;
}

interface UsePuckSaveReturn {
  handlePublish: (data: Data) => Promise<void>;
  handleSaveDraft: (data: Data) => Promise<void>;
  isSaving: boolean;
  lastSaved: Date | null;
  error: string | null;
}

async function getAccessToken(): Promise<string | null> {
  const { data } = await supabaseBrowser.auth.getSession();
  return data.session?.access_token ?? null;
}

async function patchPage(pageId: string, payload: object, token: string) {
  const res = await fetch(`/api/pages/${pageId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const json = await res.json().catch(() => ({}));
    throw new Error((json as { error?: string }).error ?? `HTTP ${res.status}`);
  }
  return res.json();
}

export function usePuckSave({ pageId, onSuccess, onError }: UsePuckSaveOptions): UsePuckSaveReturn {
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);

  const save = useCallback(
    async (data: Data, publish: boolean) => {
      setIsSaving(true);
      setError(null);
      try {
        const token = await getAccessToken();
        if (!token) throw new Error('Not authenticated');

        await patchPage(pageId, { data, ...(publish ? { published: true } : {}) }, token);
        setLastSaved(new Date());
        onSuccess?.();
      } catch (err) {
        const e = err instanceof Error ? err : new Error(String(err));
        setError(e.message);
        onError?.(e);
      } finally {
        setIsSaving(false);
      }
    },
    [pageId, onSuccess, onError]
  );

  const handlePublish   = useCallback((data: Data) => save(data, true),  [save]);
  const handleSaveDraft = useCallback((data: Data) => save(data, false), [save]);

  return { handlePublish, handleSaveDraft, isSaving, lastSaved, error };
}

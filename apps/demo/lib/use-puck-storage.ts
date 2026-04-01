"use client";

import { useCallback, useEffect, useState } from "react";

interface UsePuckStorageOptions {
  /** Route path used as storage key, e.g. "/" or "/blog/my-post" */
  path: string;
}

/**
 * @hook usePuckStorage
 * @description Loads and saves Puck editor data via the /api/save route.
 * Swap the fetch calls for Supabase client in production.
 */
export function usePuckStorage({ path }: UsePuckStorageOptions) {
  const [data, setData] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/save?path=${encodeURIComponent(path)}`)
      .then((r) => r.json())
      .then(({ data }) => setData(data))
      .catch(() => setError("Failed to load page data"))
      .finally(() => setLoading(false));
  }, [path]);

  const save = useCallback(
    async (newData: unknown) => {
      setSaving(true);
      setError(null);
      try {
        const res = await fetch("/api/save", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ path, data: newData }),
        });
        if (!res.ok) throw new Error(await res.text());
      } catch (err) {
        setError(err instanceof Error ? err.message : "Save failed");
      } finally {
        setSaving(false);
      }
    },
    [path]
  );

  return { data, loading, saving, error, save };
}

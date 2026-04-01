'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Puck, type Data } from '@measured/puck';
import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { config } from '../../../../cerison/puck.config';
import '@measured/puck/puck.css';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getSlug(puckPath: string[] | string): string {
  const parts = Array.isArray(puckPath) ? puckPath : [puckPath];
  return parts.join('/') || 'home';
}

async function loadPage(slug: string): Promise<Data | null> {
  try {
    const res = await fetch(`/api/puck/load?slug=${encodeURIComponent(slug)}`);
    if (!res.ok) return null;
    const json = await res.json();
    return json.data ?? null;
  } catch {
    return null;
  }
}

async function savePage(slug: string, data: Data): Promise<void> {
  const res = await fetch('/api/puck/save', {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ slug, content: data }),
  });
  if (!res.ok) throw new Error(await res.text());
}

// ---------------------------------------------------------------------------
// Editor page
// ---------------------------------------------------------------------------

export default function EditorPage() {
  const params          = useParams();
  const router          = useRouter();
  const slug            = getSlug(params.puckPath as string[] | string);
  const [data, setData] = useState<Data | undefined>(undefined);
  const [loading, setLoading]     = useState(true);
  const [saving,  setSaving]      = useState(false);
  const autoSaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load existing page data
  useEffect(() => {
    loadPage(slug).then((d) => {
      setData(d ?? { content: [], root: { props: {} } });
      setLoading(false);
    });
  }, [slug]);

  // Auto-save with 3s debounce
  const handleChange = useCallback((d: Data) => {
    setData(d);
    if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
    autoSaveTimer.current = setTimeout(async () => {
      try {
        await savePage(slug, d);
        toast.success('Auto-saved');
      } catch {
        // silent — manual save still works
      }
    }, 3000);
  }, [slug]);

  // Manual save
  const handlePublish = useCallback(async (d: Data) => {
    setSaving(true);
    const id = toast.loading('Publishing…');
    try {
      await savePage(slug, d);
      toast.success('Published!', { id });
    } catch (err) {
      toast.error(`Save failed: ${err}`, { id });
    } finally {
      setSaving(false);
    }
  }, [slug]);

  // Keyboard shortcuts: Ctrl+S = publish, Ctrl+P = preview
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
        if (data) handlePublish(data);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'p') {
        e.preventDefault();
        router.push(`/${slug}`);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [data, slug, handlePublish, router]);

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', flexDirection: 'column', gap: 16 }}>
        <div style={{ width: 40, height: 40, border: '3px solid #e0e0e0', borderTop: '3px solid #01696f', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
        <p style={{ color: '#7a7974', fontSize: 14 }}>Loading editor…</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div className="puck-editor-fullscreen">
      <Puck
        config={config}
        data={data!}
        onPublish={handlePublish}
        onChange={handleChange}
        overrides={{
          headerActions: ({ children }) => (
            <>
              {children}
              <a
                href={`/${slug}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: '6px 14px',
                  borderRadius: 6,
                  fontSize: 13,
                  fontWeight: 600,
                  color: '#fff',
                  background: 'rgba(255,255,255,0.12)',
                  textDecoration: 'none',
                  marginRight: 8,
                }}
              >
                Preview ↗
              </a>
            </>
          ),
        }}
      />
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';

type Page = { slug: string; updated_at: string };

export default function Dashboard() {
  const [pages, setPages]     = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [newSlug, setNewSlug] = useState('');

  const fetchPages = async () => {
    const res  = await fetch('/api/puck/pages');
    const json = await res.json();
    setPages(json.pages ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchPages(); }, []);

  const deletePage = async (slug: string) => {
    if (!confirm(`Delete "${slug}"?`)) return;
    const res = await fetch(`/api/puck/pages?slug=${encodeURIComponent(slug)}`, { method: 'DELETE' });
    if (res.ok) { toast.success('Page deleted'); fetchPages(); }
    else        { toast.error('Delete failed'); }
  };

  const createPage = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = newSlug.trim().toLowerCase().replace(/\s+/g, '-');
    if (!slug) return;
    window.location.href = `/edit/${slug}`;
  };

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '48px 24px', fontFamily: 'system-ui, sans-serif' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#1c1b19' }}>Cerison Pages</h1>
          <p style={{ color: '#7a7974', fontSize: 14, marginTop: 4 }}>Visual page builder powered by Puck</p>
        </div>
      </div>

      {/* Create new page */}
      <form onSubmit={createPage} style={{ display: 'flex', gap: 12, marginBottom: 40 }}>
        <input
          value={newSlug}
          onChange={(e) => setNewSlug(e.target.value)}
          placeholder="new-page-slug"
          style={{ flex: 1, padding: '10px 16px', borderRadius: 8, border: '1px solid rgba(0,0,0,0.15)', fontSize: 15, outline: 'none' }}
        />
        <button
          type="submit"
          style={{ padding: '10px 24px', background: '#01696f', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, cursor: 'pointer', fontSize: 15 }}
        >
          + New Page
        </button>
      </form>

      {/* Pages list */}
      {loading ? (
        <p style={{ color: '#7a7974' }}>Loading…</p>
      ) : pages.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '64px 0', color: '#7a7974' }}>
          <p style={{ fontSize: 18, marginBottom: 8 }}>No pages yet.</p>
          <p style={{ fontSize: 14 }}>Create your first page above.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {pages.map((p) => (
            <div
              key={p.slug}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '16px 20px',
                background: '#fff',
                borderRadius: 10,
                border: '1px solid rgba(0,0,0,0.08)',
                boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
              }}
            >
              <div>
                <span style={{ fontWeight: 600, fontSize: 15, color: '#1c1b19' }}>/{p.slug}</span>
                <span style={{ marginLeft: 12, fontSize: 12, color: '#bab9b4' }}>
                  Updated {new Date(p.updated_at).toLocaleDateString()}
                </span>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <Link
                  href={`/edit/${p.slug}`}
                  style={{ padding: '6px 14px', background: '#01696f', color: '#fff', borderRadius: 6, fontSize: 13, fontWeight: 600, textDecoration: 'none' }}
                >
                  Edit
                </Link>
                <Link
                  href={`/${p.slug}`}
                  target="_blank"
                  style={{ padding: '6px 14px', background: '#f3f0ec', color: '#28251d', borderRadius: 6, fontSize: 13, fontWeight: 600, textDecoration: 'none' }}
                >
                  View
                </Link>
                <button
                  onClick={() => deletePage(p.slug)}
                  style={{ padding: '6px 14px', background: 'transparent', color: '#a12c7b', border: '1px solid #a12c7b', borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Keyboard shortcuts hint */}
      <div style={{ marginTop: 48, padding: '16px 20px', background: '#f3f0ec', borderRadius: 8, fontSize: 13, color: '#7a7974' }}>
        <strong style={{ color: '#28251d' }}>Keyboard shortcuts inside editor:</strong>
        {' '}⌘S / Ctrl+S = Publish  ·  ⌘P / Ctrl+P = Open preview
      </div>
    </div>
  );
}

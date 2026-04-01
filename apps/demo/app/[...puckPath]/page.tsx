import { notFound }     from 'next/navigation';
import { Render }        from '@measured/puck';
import type { Metadata } from 'next';
import { config }        from '../../../cerison/puck.config';
import '@measured/puck/puck.css';

// ---------------------------------------------------------------------------
// Data fetching
// ---------------------------------------------------------------------------

async function getPageData(slug: string) {
  const base = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000';
  try {
    const res = await fetch(
      `${base}/api/puck/load?slug=${encodeURIComponent(slug)}`,
      { next: { revalidate: 60 } } // ISR: revalidate every 60s
    );
    if (!res.ok) return null;
    const json = await res.json();
    return json.data ?? null;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Metadata (dynamic SEO)
// ---------------------------------------------------------------------------

export async function generateMetadata({
  params,
}: {
  params: { puckPath: string[] };
}): Promise<Metadata> {
  const slug = params.puckPath?.join('/') ?? 'home';
  const data = await getPageData(slug);
  const root = data?.root?.props ?? {};
  return {
    title:       root.title       ?? slug,
    description: root.description ?? '',
    openGraph:   root.ogImage ? { images: [root.ogImage] } : undefined,
  };
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function Page({
  params,
}: {
  params: { puckPath: string[] };
}) {
  const slug = params.puckPath?.join('/') ?? 'home';
  const data = await getPageData(slug);

  if (!data) notFound();

  return (
    <main className="puck-preview">
      <Render config={config} data={data} />
    </main>
  );
}

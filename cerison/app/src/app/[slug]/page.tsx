import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Render } from '@measured/puck'
import { puckConfig } from '@/puck/config.tsx'
import '@measured/puck/puck.css'

export const revalidate = 60

interface Props {
  params: Promise<{ slug: string }>
}

export default async function SlugPage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
  })

  const page = result.docs[0]
  if (!page) notFound()

  const puckData = (page as any).puckData
  if (!puckData) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Page has no layout yet.</p>
      </main>
    )
  }

  return <Render config={puckConfig} data={puckData} />
}

export async function generateStaticParams() {
  try {
    const payload = await getPayload({ config: configPromise })
    const pages = await payload.find({ collection: 'pages', limit: 200, depth: 0 })
    return pages.docs.map((p: any) => ({ slug: p.slug as string }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'pages',
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 0,
    })
    const page = result.docs[0] as any
    return {
      title: page?.meta?.title ?? page?.title ?? slug,
      description: page?.meta?.description ?? page?.excerpt ?? '',
      openGraph: {
        title: page?.meta?.title ?? page?.title ?? slug,
        description: page?.meta?.description ?? '',
        url: `${process.env.NEXT_PUBLIC_SERVER_URL ?? ''}/${slug}`,
      },
    }
  } catch {
    return { title: slug }
  }
}

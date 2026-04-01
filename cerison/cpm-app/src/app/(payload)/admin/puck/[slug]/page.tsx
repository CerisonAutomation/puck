import { redirect } from 'next/navigation'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'
import { PuckEditor } from '@/components/PuckEditor'

export default async function PuckEditorPage({ params }: { params: { slug: string } }) {
  const payload = await getPayloadHMR({ config })
  const { user } = await payload.auth({ headers: new Headers() })
  if (!user) redirect(`/admin/login?redirect=/admin/puck/${params.slug}`)
  const pages = await payload.find({
    collection: 'pages',
    where: { slug: { equals: params.slug } },
    depth: 1,
    limit: 1,
  })
  const page = pages.docs[0]
  const initialData = page?.puckData ?? { content: [], root: { props: { title: params.slug, description: '' } }, zones: {} }
  return <PuckEditor slug={params.slug} pageId={page?.id} initialData={initialData} />
}

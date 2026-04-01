import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { resendAdapter } from '@payloadcms/email-resend'
import { stripePlugin } from '@payloadcms/plugin-stripe'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { searchPlugin } from '@payloadcms/plugin-search'
import sharp from 'sharp'
import { Pages } from './src/collections/Pages'
import { Properties } from './src/collections/Properties'
import { Testimonials } from './src/collections/Testimonials'
import { Media } from './src/collections/Media'
import { Users } from './src/collections/Users'

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: { titleSuffix: '— CPM Admin', favicon: '/favicon.ico' },
  },
  collections: [Pages, Properties, Testimonials, Media, Users],
  editor: lexicalEditor(),
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URI! },
  }),
  email: resendAdapter({
    defaultFromAddress: 'hello@christianpropertymanagement.com',
    defaultFromName: 'Christian Property Management',
    apiKey: process.env.RESEND_API_KEY!,
  }),
  plugins: [
    vercelBlobStorage({
      enabled: true,
      collections: { media: true },
      token: process.env.BLOB_READ_WRITE_TOKEN!,
    }),
    stripePlugin({
      stripeSecretKey: process.env.STRIPE_SECRET_KEY!,
      stripeWebhooksEndpointSecret: process.env.STRIPE_WEBHOOK_SECRET!,
      webhooks: {
        'checkout.session.completed': ({ event }) => {
          console.log('[Stripe] Payment complete', event.id)
        },
      },
    }),
    seoPlugin({
      collections: ['pages', 'properties'],
      uploadsCollection: 'media',
      generateTitle: ({ doc }: any) => `${doc?.title} - Christian Property Management`,
      generateDescription: ({ doc }: any) => doc?.excerpt || '',
    }),
    formBuilderPlugin({ fields: { payment: false } }),
    redirectsPlugin({ collections: ['pages'] }),
    nestedDocsPlugin({ collections: ['pages'] }),
    searchPlugin({
      collections: ['pages', 'properties'],
      defaultPriorities: { pages: 20, properties: 10 },
    }),
  ],
  sharp,
  typescript: { outputFile: 'src/payload-types.ts' },
  cors: [process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'],
  csrf: [process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'],
})

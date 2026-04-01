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
import path from 'path'
import { fileURLToPath } from 'url'

import { Pages } from './src/collections/Pages'
import { Properties } from './src/collections/Properties'
import { Testimonials } from './src/collections/Testimonials'
import { Media } from './src/collections/Media'
import { Users } from './src/collections/Users'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '— CPM Admin',
      favicon: '/favicon.ico',
      ogImage: '/og.jpg',
    },
    components: {},
  },

  collections: [Pages, Properties, Testimonials, Media, Users],

  editor: lexicalEditor(),

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI!,
    },
    prodMigrations: [],
  }),

  plugins: [
    vercelBlobStorage({
      enabled: process.env.NODE_ENV === 'production',
      collections: { media: true },
      token: process.env.BLOB_READ_WRITE_TOKEN ?? '',
      clientUploads: true,
    }),

    stripePlugin({
      stripeSecretKey: process.env.STRIPE_SECRET_KEY ?? '',
      stripeWebhooksEndpointSecret: process.env.STRIPE_WEBHOOK_SECRET ?? '',
      webhooks: {
        'checkout.session.completed': async ({ event, payload }) => {
          const session = event.data.object as any
          payload.logger.info({ msg: 'Payment complete', session: session.id })
        },
        'customer.subscription.updated': async ({ event, payload }) => {
          payload.logger.info({ msg: 'Subscription updated', id: (event.data.object as any).id })
        },
      },
    }),

    seoPlugin({
      collections: ['pages', 'properties'],
      uploadsCollection: 'media',
      tabbedUI: true,
      generateTitle: ({ doc }) =>
        `${(doc as any)?.title ?? ''} — Christian Property Management`,
      generateDescription: ({ doc }) => (doc as any)?.excerpt ?? '',
      generateURL: ({ doc, collectionConfig }) =>
        `${process.env.NEXT_PUBLIC_SERVER_URL}/${collectionConfig?.slug}/${(doc as any)?.slug}`,
    }),

    formBuilderPlugin({
      fields: { payment: false },
      formOverrides: {
        fields: [
          {
            name: 'confirmationMessage',
            type: 'richText',
            editor: lexicalEditor(),
          },
        ],
      },
    }),

    redirectsPlugin({
      collections: ['pages'],
      overrides: { admin: { group: 'Content' } },
    }),

    nestedDocsPlugin({
      collections: ['pages'],
      generateLabel: (_, doc) => (doc as any).title ?? '',
      generateURL: (docs) => docs.reduce((url, doc) => `${url}/${(doc as any).slug}`, ''),
    }),

    searchPlugin({
      collections: ['pages', 'properties'],
      defaultPriorities: { pages: 20, properties: 10 },
      searchOverrides: {
        fields: [
          { name: 'excerpt', type: 'textarea', admin: { position: 'sidebar' } },
        ],
      },
    }),
  ],

  email: resendAdapter({
    defaultFromAddress: 'hello@christianpropertymanagement.com',
    defaultFromName: 'Christian Property Management',
    apiKey: process.env.RESEND_API_KEY ?? '',
  }),

  sharp,

  cors: [
    process.env.NEXT_PUBLIC_SERVER_URL ?? 'http://localhost:3000',
  ],
  csrf: [
    process.env.NEXT_PUBLIC_SERVER_URL ?? 'http://localhost:3000',
  ],

  typescript: {
    outputFile: path.resolve(dirname, 'src/payload-types.ts'),
  },

  graphQL: {
    schemaOutputFile: path.resolve(dirname, 'generated-schema.graphql'),
  },
})

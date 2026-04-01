import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'status', 'updatedAt'],
    group: 'Content',
    livePreview: {
      url: ({ data }) =>
        `${process.env.NEXT_PUBLIC_SERVER_URL ?? 'http://localhost:3000'}/${data?.slug ?? ''}`,
    },
  },
  versions: {
    drafts: { autosave: { interval: 800 } },
    maxPerDoc: 20,
  },
  access: {
    read:   () => true,
    create: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => req.user?.role === 'admin',
  },
  fields: [
    { name: 'title',   type: 'text',     required: true },
    { name: 'slug',    type: 'text',     required: true, unique: true, index: true,
      admin: { position: 'sidebar' } },
    { name: 'status',  type: 'select',   required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Draft',     value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      admin: { position: 'sidebar' },
    },
    { name: 'excerpt', type: 'textarea', admin: { position: 'sidebar' } },
    {
      name: 'puckData',
      type: 'json',
      label: 'Page Builder Data',
      admin: {
        description: 'Managed by the Puck visual editor — do not edit directly.',
      },
    },
  ],
}

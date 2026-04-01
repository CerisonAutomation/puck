import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'status', 'updatedAt'],
  },
  access: {
    read: ({ req }) => {
      if (req.user) return true
      return { status: { equals: 'published' } }
    },
    create: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  versions: { drafts: { autosave: { interval: 5000 } } },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug', type: 'text', required: true, unique: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'puckData', type: 'json',
      admin: { description: 'Edit via Puck editor at /admin/puck/[slug]' },
    },
    {
      name: 'status', type: 'select',
      options: [{ label: 'Draft', value: 'draft' }, { label: 'Published', value: 'published' }],
      defaultValue: 'draft', required: true,
      admin: { position: 'sidebar' },
    },
    { name: 'publishedAt', type: 'date', admin: { position: 'sidebar' } },
    {
      name: 'meta', type: 'group',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'noIndex', type: 'checkbox', defaultValue: false },
      ],
    },
  ],
  timestamps: true,
}

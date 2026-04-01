import type { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'authorName',
    defaultColumns: ['authorName', 'rating', 'platform', 'featured'],
    group: 'Content',
  },
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    { name: 'authorName', type: 'text', required: true },
    { name: 'authorTitle', type: 'text' },
    { name: 'authorPhoto', type: 'upload', relationTo: 'media' },
    {
      name: 'rating',
      type: 'select',
      options: ['1', '2', '3', '4', '5'],
      defaultValue: '5',
      admin: { position: 'sidebar' },
    },
    {
      name: 'platform',
      type: 'select',
      options: [
        { label: 'Google', value: 'google' },
        { label: 'Yelp', value: 'yelp' },
        { label: 'Facebook', value: 'facebook' },
        { label: 'Direct', value: 'direct' },
      ],
      defaultValue: 'google',
      admin: { position: 'sidebar' },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
    {
      name: 'quote',
      type: 'textarea',
      required: true,
    },
    {
      name: 'propertyManaged',
      type: 'relationship',
      relationTo: 'properties',
      admin: { position: 'sidebar' },
    },
  ],
  timestamps: true,
}

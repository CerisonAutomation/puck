import type { CollectionConfig } from 'payload'

export const Properties: CollectionConfig = {
  slug: 'properties',
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'type', 'city', 'available', 'monthlyRent'] },
  access: {
    read: () => true,
    create: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, admin: { position: 'sidebar' } },
    {
      name: 'type', type: 'select',
      options: ['single-family', 'condo', 'multi-family', 'commercial', 'townhouse'],
      admin: { position: 'sidebar' },
    },
    { name: 'address', type: 'text' },
    { name: 'city', type: 'text' },
    { name: 'state', type: 'text', defaultValue: 'CA' },
    { name: 'zip', type: 'text' },
    { name: 'bedrooms', type: 'number' },
    { name: 'bathrooms', type: 'number' },
    { name: 'sqft', type: 'number' },
    { name: 'monthlyRent', type: 'number', admin: { position: 'sidebar' } },
    { name: 'available', type: 'checkbox', defaultValue: true, admin: { position: 'sidebar' } },
    { name: 'featured', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar' } },
    {
      name: 'gallery', type: 'array',
      fields: [{ name: 'image', type: 'upload', relationTo: 'media', required: true }],
    },
    { name: 'description', type: 'richText' },
    { name: 'excerpt', type: 'textarea' },
    {
      name: 'amenities', type: 'array',
      fields: [{ name: 'item', type: 'text', required: true }],
    },
    {
      name: 'meta', type: 'group',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
        { name: 'image', type: 'upload', relationTo: 'media' },
      ],
    },
    { name: 'stripeProductId', type: 'text', admin: { position: 'sidebar', description: 'Stripe Product ID (auto-synced)' } },
  ],
  timestamps: true,
}

import type { CollectionConfig } from 'payload'

export const Properties: CollectionConfig = {
  slug: 'properties',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'type', 'city', 'available', 'monthlyRent'],
    group: 'Properties',
  },
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true, admin: { position: 'sidebar' } },
    {
      name: 'type',
      type: 'select',
      options: [
        { label: 'Single Family', value: 'single-family' },
        { label: 'Condo', value: 'condo' },
        { label: 'Multi-Family', value: 'multi-family' },
        { label: 'Townhouse', value: 'townhouse' },
        { label: 'Commercial', value: 'commercial' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'available',
      type: 'checkbox',
      defaultValue: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
    {
      name: 'monthlyRent',
      type: 'number',
      admin: { position: 'sidebar', description: 'USD per month' },
    },
    {
      type: 'row',
      fields: [
        { name: 'bedrooms', type: 'number', admin: { width: '25%' } },
        { name: 'bathrooms', type: 'number', admin: { width: '25%' } },
        { name: 'sqft', type: 'number', admin: { width: '25%' } },
        { name: 'yearBuilt', type: 'number', admin: { width: '25%' } },
      ],
    },
    {
      name: 'address',
      type: 'group',
      fields: [
        { name: 'street', type: 'text' },
        { name: 'city', type: 'text' },
        { name: 'state', type: 'text', defaultValue: 'CA' },
        { name: 'zip', type: 'text' },
      ],
    },
    {
      name: 'gallery',
      type: 'array',
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'alt', type: 'text' },
        { name: 'caption', type: 'text' },
      ],
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'amenities',
      type: 'array',
      fields: [{ name: 'item', type: 'text' }],
    },
    {
      name: 'virtualTourUrl',
      type: 'text',
      admin: { description: 'Matterport or YouTube 360 URL' },
    },
    {
      name: 'stripeProductId',
      type: 'text',
      admin: { position: 'sidebar', description: 'Auto-synced from Stripe' },
    },
  ],
  timestamps: true,
}

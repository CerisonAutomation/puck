import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
    group: 'Admin',
  },
  access: {
    read:   ({ req }) => !!req.user,
    create: ({ req }) => req.user?.role === 'admin',
    update: ({ req, id }) => req.user?.role === 'admin' || req.user?.id === id,
    delete: ({ req }) => req.user?.role === 'admin',
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      options: [
        { label: 'Admin',  value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
      admin: { position: 'sidebar' },
    },
    { name: 'firstName', type: 'text' },
    { name: 'lastName',  type: 'text' },
  ],
}

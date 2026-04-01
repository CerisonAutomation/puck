import type { CollectionConfig } from 'payload'

/**
 * Bookings collection — core reservation record for CPM.
 *
 * Status machine:
 *   pending_payment → confirmed (Stripe webhook)
 *   pending_payment → expired   (cron / manual)
 *   confirmed       → cancelled (tenant or admin)
 *   confirmed       → completed (after checkout date)
 */
export const Bookings: CollectionConfig = {
  slug: 'bookings',
  admin: {
    useAsTitle: 'confirmationCode',
    defaultColumns: ['confirmationCode', 'property', 'tenantEmail', 'status', 'checkIn', 'checkOut', 'totalAmount'],
    group: 'Bookings',
  },
  access: {
    // Public read is intentionally closed — use the /api/bookings/[id] route with token auth
    read:   ({ req }) => Boolean(req.user),
    create: () => true,   // created programmatically by the API route
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => req.user?.role === 'super-admin',
  },
  hooks: {
    beforeChange: [
      ({ data }) => {
        // Auto-generate confirmation code on first creation
        if (!data.confirmationCode) {
          data.confirmationCode = `CPM-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'confirmationCode',
      type: 'text',
      unique: true,
      index: true,
      admin: { position: 'sidebar', readOnly: true },
    },
    {
      name: 'property',
      type: 'relationship',
      relationTo: 'properties',
      required: true,
      index: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'pending_payment',
      index: true,
      options: [
        { label: 'Pending Payment', value: 'pending_payment' },
        { label: 'Confirmed',       value: 'confirmed' },
        { label: 'Cancelled',       value: 'cancelled' },
        { label: 'Expired',         value: 'expired' },
        { label: 'Completed',       value: 'completed' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      type: 'row',
      fields: [
        { name: 'checkIn',  type: 'date', required: true, admin: { date: { pickerAppearance: 'dayOnly' }, width: '50%' } },
        { name: 'checkOut', type: 'date', required: true, admin: { date: { pickerAppearance: 'dayOnly' }, width: '50%' } },
      ],
    },
    {
      name: 'tenant',
      type: 'group',
      fields: [
        { name: 'name',  type: 'text',  required: true },
        { name: 'email', type: 'email', required: true, index: true },
        { name: 'phone', type: 'text' },
      ],
    },
    {
      name: 'totalAmount',
      type: 'number',
      required: true,
      admin: { description: 'Total in USD cents (e.g. 150000 = $1,500.00)', position: 'sidebar' },
    },
    {
      name: 'nightlyRate',
      type: 'number',
      admin: { description: 'USD cents per night at time of booking', position: 'sidebar' },
    },
    {
      name: 'nights',
      type: 'number',
      admin: { position: 'sidebar' },
    },
    {
      name: 'stripe',
      type: 'group',
      admin: { condition: (data) => Boolean(data?.stripe?.sessionId) },
      fields: [
        { name: 'sessionId',       type: 'text', admin: { readOnly: true } },
        { name: 'paymentIntentId', type: 'text', admin: { readOnly: true } },
        { name: 'customerId',      type: 'text', admin: { readOnly: true } },
        { name: 'checkoutUrl',     type: 'text', admin: { readOnly: true } },
      ],
    },
    {
      name: 'idempotencyKey',
      type: 'text',
      unique: true,
      index: true,
      admin: { readOnly: true, description: 'Prevents duplicate bookings on retry' },
    },
    {
      name: 'notes',
      type: 'textarea',
      admin: { description: 'Internal admin notes' },
    },
    {
      name: 'cancellationReason',
      type: 'textarea',
      admin: { condition: (data) => data?.status === 'cancelled' },
    },
  ],
  timestamps: true,
}

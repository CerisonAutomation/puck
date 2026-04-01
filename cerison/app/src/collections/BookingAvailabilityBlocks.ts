import type { CollectionConfig } from 'payload'

/**
 * BookingAvailabilityBlocks — admin-defined unavailability windows.
 * Used to block out maintenance, owner stays, or seasonal closures.
 * The availability API checks both confirmed Bookings AND these blocks.
 */
export const BookingAvailabilityBlocks: CollectionConfig = {
  slug: 'booking-availability-blocks',
  admin: {
    useAsTitle: 'reason',
    defaultColumns: ['property', 'startDate', 'endDate', 'reason'],
    group: 'Bookings',
  },
  access: {
    read:   () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'property',
      type: 'relationship',
      relationTo: 'properties',
      required: true,
      index: true,
    },
    {
      type: 'row',
      fields: [
        { name: 'startDate', type: 'date', required: true, admin: { date: { pickerAppearance: 'dayOnly' }, width: '50%' } },
        { name: 'endDate',   type: 'date', required: true, admin: { date: { pickerAppearance: 'dayOnly' }, width: '50%' } },
      ],
    },
    {
      name: 'reason',
      type: 'select',
      options: [
        { label: 'Maintenance',   value: 'maintenance' },
        { label: 'Owner Stay',    value: 'owner-stay' },
        { label: 'Seasonal Close', value: 'seasonal-close' },
        { label: 'Other',         value: 'other' },
      ],
      defaultValue: 'maintenance',
    },
    { name: 'notes', type: 'textarea' },
  ],
  timestamps: true,
}

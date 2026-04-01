'use client'
import type { ComponentConfig } from '@measured/puck'

interface Property {
  image: string
  address: string
  city: string
  beds: number
  baths: number
  rent: string
  status: 'available' | 'occupied' | 'maintenance'
}

export interface PropertyShowcaseProps {
  heading: string
  properties: Property[]
}

const statusColors: Record<string, string> = {
  available: 'bg-green-100 text-green-800',
  occupied: 'bg-blue-100 text-blue-800',
  maintenance: 'bg-amber-100 text-amber-800',
}

export const PropertyShowcaseBlock: ComponentConfig<PropertyShowcaseProps> = {
  label: 'Property Showcase',
  defaultProps: {
    heading: 'Our Properties',
    properties: [
      { image: '', address: 'Calle Mayor 12', city: 'Madrid', beds: 3, baths: 2, rent: '€1,800/mo', status: 'available' },
      { image: '', address: 'Gran Vía 45', city: 'Madrid', beds: 2, baths: 1, rent: '€1,400/mo', status: 'occupied' },
      { image: '', address: 'Paseo del Prado 8', city: 'Madrid', beds: 4, baths: 3, rent: '€2,500/mo', status: 'available' },
    ],
  },
  fields: {
    heading: { type: 'text', label: 'Section Heading' },
    properties: {
      type: 'array',
      label: 'Properties',
      arrayFields: {
        image: { type: 'text', label: 'Image URL' },
        address: { type: 'text', label: 'Address' },
        city: { type: 'text', label: 'City' },
        beds: { type: 'number', label: 'Bedrooms' },
        baths: { type: 'number', label: 'Bathrooms' },
        rent: { type: 'text', label: 'Rent' },
        status: {
          type: 'select',
          label: 'Status',
          options: [
            { label: 'Available', value: 'available' },
            { label: 'Occupied', value: 'occupied' },
            { label: 'Maintenance', value: 'maintenance' },
          ],
        },
      },
    },
  },
  render: ({ heading, properties }) => (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">{heading}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {properties.map((p, i) => (
            <div key={i} className="rounded-xl overflow-hidden border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 shadow-sm">
              {p.image ? (
                <img src={p.image} alt={p.address} className="w-full h-48 object-cover" loading="lazy" />
              ) : (
                <div className="w-full h-48 bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-400">No Image</div>
              )}
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-semibold text-stone-900 dark:text-white">{p.address}</p>
                    <p className="text-sm text-stone-500">{p.city}</p>
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusColors[p.status]}`}>
                    {p.status.charAt(0).toUpperCase() + p.status.slice(1)}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-stone-600 dark:text-stone-400 mt-3">
                  <span>{p.beds} bd</span>
                  <span>{p.baths} ba</span>
                  <span className="ml-auto font-semibold text-amber-600">{p.rent}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  ),
}

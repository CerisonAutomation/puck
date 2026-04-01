'use client'
import type { ComponentConfig } from '@measured/puck'

interface Feature {
  icon: string
  title: string
  description: string
}

export interface FeatureGridProps {
  heading: string
  features: Feature[]
}

export const FeatureGridBlock: ComponentConfig<FeatureGridProps> = {
  label: 'Feature Grid',
  defaultProps: {
    heading: 'Why Choose CPM',
    features: [
      { icon: '🏠', title: 'Full Management', description: 'We handle everything from tenant screening to maintenance.' },
      { icon: '📊', title: 'Transparent Reporting', description: 'Monthly reports with full financial transparency.' },
      { icon: '✝️', title: 'Values-Driven', description: 'Christian principles guide every decision we make.' },
    ],
  },
  fields: {
    heading: { type: 'text', label: 'Section Heading' },
    features: {
      type: 'array',
      label: 'Features',
      arrayFields: {
        icon: { type: 'text', label: 'Icon (emoji or URL)' },
        title: { type: 'text', label: 'Title' },
        description: { type: 'textarea', label: 'Description' },
      },
    },
  },
  render: ({ heading, features }) => (
    <section className="py-20 px-6 bg-stone-50 dark:bg-stone-900">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">{heading}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div key={i} className="p-6 bg-white dark:bg-stone-800 rounded-xl shadow-sm border border-stone-200 dark:border-stone-700">
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-stone-600 dark:text-stone-400">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  ),
}

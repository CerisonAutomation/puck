'use client'
import type { ComponentConfig } from '@measured/puck'

interface PricingTier {
  name: string
  price: string
  period: string
  description: string
  features: string
  ctaLabel: string
  ctaHref: string
  featured: boolean
}

export interface PricingProps {
  heading: string
  tiers: PricingTier[]
}

export const PricingBlock: ComponentConfig<PricingProps> = {
  label: 'Pricing',
  defaultProps: {
    heading: 'Simple, Transparent Pricing',
    tiers: [
      { name: 'Starter', price: '8%', period: 'of monthly rent', description: 'Ideal for single property owners.', features: 'Tenant screening\nRent collection\nMaintenance coordination', ctaLabel: 'Get Started', ctaHref: '/contact', featured: false },
      { name: 'Professional', price: '12%', period: 'of monthly rent', description: 'Full-service management for portfolios.', features: 'Everything in Starter\nLegal support\nDedicated manager\nMonthly reporting', ctaLabel: 'Book a Call', ctaHref: '/contact', featured: true },
    ],
  },
  fields: {
    heading: { type: 'text', label: 'Section Heading' },
    tiers: {
      type: 'array',
      label: 'Pricing Tiers',
      arrayFields: {
        name: { type: 'text', label: 'Plan Name' },
        price: { type: 'text', label: 'Price' },
        period: { type: 'text', label: 'Period (e.g. /month)' },
        description: { type: 'textarea', label: 'Description' },
        features: { type: 'textarea', label: 'Features (one per line)' },
        ctaLabel: { type: 'text', label: 'CTA Label' },
        ctaHref: { type: 'text', label: 'CTA URL' },
        featured: { type: 'radio', label: 'Featured', options: [{ label: 'Yes', value: true }, { label: 'No', value: false }] },
      },
    },
  },
  render: ({ heading, tiers }) => (
    <section className="py-20 px-6 bg-stone-50 dark:bg-stone-900">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">{heading}</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {tiers.map((tier, i) => (
            <div
              key={i}
              className={`p-8 rounded-2xl border ${
                tier.featured
                  ? 'border-amber-400 bg-amber-50 dark:bg-amber-900/20 shadow-lg'
                  : 'border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800'
              }`}
            >
              {tier.featured && (
                <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-widest uppercase bg-amber-500 text-black rounded-full">Most Popular</span>
              )}
              <h3 className="text-xl font-bold mb-1">{tier.name}</h3>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-4xl font-black">{tier.price}</span>
                <span className="text-stone-500 text-sm">{tier.period}</span>
              </div>
              <p className="text-stone-500 dark:text-stone-400 mb-6 text-sm">{tier.description}</p>
              <ul className="space-y-2 mb-8">
                {tier.features.split('\n').filter(Boolean).map((f, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm">
                    <span className="text-green-500">✓</span> {f}
                  </li>
                ))}
              </ul>
              <a
                href={tier.ctaHref}
                className={`block text-center px-6 py-3 rounded-lg font-semibold transition-colors ${
                  tier.featured
                    ? 'bg-amber-500 hover:bg-amber-400 text-black'
                    : 'bg-stone-900 hover:bg-stone-700 text-white dark:bg-stone-100 dark:text-stone-900'
                }`}
              >
                {tier.ctaLabel}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  ),
}

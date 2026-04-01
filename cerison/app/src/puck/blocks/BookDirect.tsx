'use client'
import type { ComponentConfig } from '@measured/puck'

export interface BookDirectProps {
  heading: string
  subheading: string
  ctaLabel: string
  ctaHref: string
  badge: string
}

export const BookDirectBlock: ComponentConfig<BookDirectProps> = {
  label: 'Book Direct CTA',
  defaultProps: {
    heading: 'Skip the Middleman. Book Direct.',
    subheading: 'Get the best rates when you book directly with us. No platform fees.',
    ctaLabel: 'Book a Viewing',
    ctaHref: '/booking',
    badge: 'Best Price Guaranteed',
  },
  fields: {
    heading: { type: 'text', label: 'Heading' },
    subheading: { type: 'textarea', label: 'Subheading' },
    ctaLabel: { type: 'text', label: 'CTA Label' },
    ctaHref: { type: 'text', label: 'CTA URL' },
    badge: { type: 'text', label: 'Badge Text' },
  },
  render: ({ heading, subheading, ctaLabel, ctaHref, badge }) => (
    <section className="py-20 px-6 bg-gradient-to-br from-stone-900 to-stone-800 text-white text-center">
      <div className="max-w-2xl mx-auto">
        {badge && (
          <span className="inline-block px-4 py-1 mb-6 text-xs font-semibold tracking-widest uppercase bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-full">
            {badge}
          </span>
        )}
        <h2 className="text-4xl font-bold mb-4">{heading}</h2>
        <p className="text-white/70 mb-8">{subheading}</p>
        <a
          href={ctaHref}
          className="inline-block px-8 py-4 bg-amber-500 hover:bg-amber-400 text-black font-semibold rounded-lg transition-colors"
        >
          {ctaLabel}
        </a>
      </div>
    </section>
  ),
}

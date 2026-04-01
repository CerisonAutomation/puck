'use client'
import type { ComponentConfig } from '@measured/puck'

export interface HeroProps {
  heading: string
  subheading: string
  ctaLabel: string
  ctaHref: string
  bgImage: string
}

export const heroBlockDefaultProps: HeroProps = {
  heading: 'Your Property, Our Mission',
  subheading: 'Premium Christian-values-driven property management in Madrid.',
  ctaLabel: 'Book a Viewing',
  ctaHref: '/booking',
  bgImage: '',
}

export const HeroBlock: ComponentConfig<HeroProps> = {
  label: 'Hero',
  defaultProps: heroBlockDefaultProps,
  fields: {
    heading: { type: 'text', label: 'Heading' },
    subheading: { type: 'textarea', label: 'Subheading' },
    ctaLabel: { type: 'text', label: 'CTA Label' },
    ctaHref: { type: 'text', label: 'CTA URL' },
    bgImage: { type: 'text', label: 'Background Image URL' },
  },
  render: ({ heading, subheading, ctaLabel, ctaHref, bgImage }) => (
    <section
      className="relative min-h-[80vh] flex items-center justify-center text-white"
      style={bgImage ? { backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : { background: 'linear-gradient(135deg,#0c1c2c 0%,#1a3a4a 100%)' }}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <h1 className="text-5xl font-bold mb-4 leading-tight">{heading}</h1>
        <p className="text-xl text-white/80 mb-8">{subheading}</p>
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

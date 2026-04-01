'use client'
import type { ComponentConfig } from '@measured/puck'
import { useEffect, useRef } from 'react'

type Props = {
  headline: string
  subheadline: string
  ctaText: string
  ctaHref: string
  ctaSecondaryText?: string
  ctaSecondaryHref?: string
  bgImage?: string
  bgVideo?: string
  align?: 'left' | 'center'
  overlay?: 'dark' | 'gold' | 'none'
}

export const HeroCinematic: ComponentConfig<Props> = {
  label: 'Hero Cinematic',
  fields: {
    headline: { type: 'text', label: 'Headline (use \\n for line breaks)' },
    subheadline: { type: 'textarea', label: 'Subheadline' },
    ctaText: { type: 'text', label: 'CTA Button Text' },
    ctaHref: { type: 'text', label: 'CTA Button URL' },
    ctaSecondaryText: { type: 'text', label: 'Secondary CTA Text' },
    ctaSecondaryHref: { type: 'text', label: 'Secondary CTA URL' },
    bgImage: { type: 'text', label: 'Background Image URL' },
    bgVideo: { type: 'text', label: 'Background Video URL (mp4)' },
    align: { type: 'radio', options: [{ label: 'Left', value: 'left' }, { label: 'Center', value: 'center' }] },
    overlay: { type: 'radio', options: [{ label: 'Dark', value: 'dark' }, { label: 'Gold', value: 'gold' }, { label: 'None', value: 'none' }] },
  },
  defaultProps: {
    headline: 'Property Management\nYou Can Trust',
    subheadline: 'Over 200 properties managed across Southern California. Licensed, insured, and faith-driven.',
    ctaText: 'Get a Free Quote',
    ctaHref: '/contact',
    ctaSecondaryText: 'View Properties',
    ctaSecondaryHref: '/properties',
    bgImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=80',
    align: 'left',
    overlay: 'dark',
  },
  render: ({ headline, subheadline, ctaText, ctaHref, ctaSecondaryText, ctaSecondaryHref, bgImage, bgVideo, align, overlay }) => {
    const lines = headline.split('\\n')
    const overlayClass = overlay === 'dark' ? 'bg-black/60' : overlay === 'gold' ? 'bg-[#C9A650]/30' : 'bg-transparent'
    const alignClass = align === 'center' ? 'items-center text-center' : 'items-start text-left'

    return (
      <section className="relative min-h-[100svh] flex items-end overflow-hidden" style={{ fontFamily: 'Satoshi, sans-serif' }}>
        {/* Background */}
        {bgVideo ? (
          <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" src={bgVideo} />
        ) : bgImage ? (
          <img src={bgImage} alt="" className="absolute inset-0 w-full h-full object-cover" loading="eager" />
        ) : (
          <div className="absolute inset-0 bg-[#0C0B09]" />
        )}

        {/* Overlay */}
        <div className={`absolute inset-0 ${overlayClass}`} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Content */}
        <div className={`relative z-10 w-full max-w-7xl mx-auto px-6 pb-20 pt-40 flex flex-col ${alignClass} gap-6`}>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-white leading-[0.95] tracking-tight" style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic' }}>
            {lines.map((line, i) => (
              <span key={i} className="block">{line}</span>
            ))}
          </h1>

          <p className="text-lg md:text-xl text-white/75 max-w-xl leading-relaxed">{subheadline}</p>

          <div className={`flex flex-wrap gap-4 ${align === 'center' ? 'justify-center' : ''}`}>
            <a href={ctaHref} className="inline-flex items-center gap-2 bg-[#C9A650] text-black px-8 py-4 text-sm font-semibold tracking-widest uppercase hover:bg-[#e2c070] transition-colors">
              {ctaText}
            </a>
            {ctaSecondaryText && ctaSecondaryHref && (
              <a href={ctaSecondaryHref} className="inline-flex items-center gap-2 border border-white/40 text-white px-8 py-4 text-sm font-semibold tracking-widest uppercase hover:border-white hover:bg-white/10 transition-all">
                {ctaSecondaryText}
              </a>
            )}
          </div>
        </div>
      </section>
    )
  },
}

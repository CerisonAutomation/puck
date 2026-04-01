'use client'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export type HeroCinematicProps = {
  headline: string
  subheadline: string
  ctaText: string
  ctaHref: string
  secondaryCtaText?: string
  secondaryCtaHref?: string
  backgroundVideo?: string
  backgroundImage?: string
  overlay?: boolean
  overlayOpacity?: number
  align?: 'left' | 'center' | 'right'
}

export const HeroCinematic = {
  fields: {
    headline: { type: 'text' as const },
    subheadline: { type: 'textarea' as const },
    ctaText: { type: 'text' as const },
    ctaHref: { type: 'text' as const },
    secondaryCtaText: { type: 'text' as const },
    secondaryCtaHref: { type: 'text' as const },
    backgroundVideo: { type: 'text' as const },
    backgroundImage: { type: 'text' as const },
    overlay: { type: 'radio' as const, options: [{ label: 'Yes', value: true }, { label: 'No', value: false }] },
    overlayOpacity: { type: 'number' as const },
    align: { type: 'radio' as const, options: [{ label: 'Left', value: 'left' }, { label: 'Center', value: 'center' }, { label: 'Right', value: 'right' }] },
  },
  defaultProps: {
    headline: 'Trusted Property Management You Can Believe In',
    subheadline: 'Serving Southern California with faith-based values, transparent pricing, and exceptional results since 2010.',
    ctaText: 'Get a Free Quote',
    ctaHref: '/contact',
    secondaryCtaText: 'View Properties',
    secondaryCtaHref: '/properties',
    overlay: true,
    overlayOpacity: 55,
    align: 'center',
  } as HeroCinematicProps,
  render: ({ headline, subheadline, ctaText, ctaHref, secondaryCtaText, secondaryCtaHref, backgroundVideo, backgroundImage, overlay, overlayOpacity, align }: HeroCinematicProps) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const headlineRef = useRef<HTMLHeadingElement>(null)
    const subRef = useRef<HTMLParagraphElement>(null)
    const ctaRef = useRef<HTMLDivElement>(null)
    useGSAP(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.fromTo(containerRef.current, { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', duration: 1.2 })
        .fromTo(headlineRef.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, '-=0.4')
        .fromTo(subRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, '-=0.5')
        .fromTo(ctaRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.4')
    }, { scope: containerRef })
    const alignClass = align === 'left' ? 'items-start text-left' : align === 'right' ? 'items-end text-right' : 'items-center text-center'
    return (
      <section ref={containerRef} style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', background: '#0C0B09' }}>
        {backgroundVideo && <video autoPlay muted loop playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}><source src={backgroundVideo} type="video/mp4" /></video>}
        {!backgroundVideo && backgroundImage && <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />}
        {overlay && <div style={{ position: 'absolute', inset: 0, background: 'black', opacity: (overlayOpacity ?? 55) / 100 }} />}
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '1200px', margin: '0 auto', padding: '0 24px', display: 'flex', flexDirection: 'column', gap: '32px' }} className={alignClass}>
          <h1 ref={headlineRef} style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', fontWeight: 300, color: 'white', lineHeight: 0.95, letterSpacing: '-0.02em', margin: 0 }}>{headline}</h1>
          <p ref={subRef} style={{ fontSize: '1.125rem', color: 'rgba(255,255,255,0.8)', maxWidth: '640px', lineHeight: 1.6, margin: 0 }}>{subheadline}</p>
          <div ref={ctaRef} style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
            <a href={ctaHref} style={{ display: 'inline-flex', alignItems: 'center', background: '#C9A650', color: 'black', fontWeight: 600, padding: '16px 32px', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none' }}>{ctaText}</a>
            {secondaryCtaText && <a href={secondaryCtaHref} style={{ display: 'inline-flex', alignItems: 'center', border: '1px solid rgba(255,255,255,0.4)', color: 'white', fontWeight: 600, padding: '16px 32px', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none' }}>{secondaryCtaText}</a>}
          </div>
        </div>
      </section>
    )
  },
}

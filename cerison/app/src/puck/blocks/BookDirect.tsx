import { ComponentConfig } from '@measured/puck'

type Props = {
  title?: string
  subtitle?: string
  ctaText?: string
  ctaUrl?: string
  badge?: string
}

export const BookDirect: ComponentConfig<Props> = {
  label: 'Book Direct CTA',
  fields: {
    title: { type: 'text', label: 'Main Heading' },
    subtitle: { type: 'text', label: 'Supporting Copy' },
    ctaText: { type: 'text', label: 'Button Label' },
    ctaUrl: { type: 'text', label: 'Button URL' },
    badge: { type: 'text', label: 'Badge Text (optional)' },
  },
  defaultProps: {
    title: 'Ready to Maximize Your Investment?',
    subtitle: 'Join 500+ Southern California property owners who trust CPM to protect and grow their assets. No long-term contracts. Cancel anytime.',
    ctaText: 'Schedule Your Free Assessment',
    ctaUrl: '#contact',
    badge: 'No Setup Fees',
  },
  render: ({ title, subtitle, ctaText, ctaUrl, badge }) => (
    <section className="relative bg-[#0A0906] py-32 px-6 overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,166,80,0.06)_0%,_transparent_70%)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A650]/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A650]/20 to-transparent" />
      
      <div className="relative max-w-3xl mx-auto text-center">
        {badge && (
          <div className="inline-flex items-center gap-2 border border-[#C9A650]/30 px-4 py-2 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A650]" />
            <span className="text-[#C9A650] text-xs tracking-[0.2em] uppercase">{badge}</span>
          </div>
        )}
        <h2
          className="text-4xl md:text-6xl font-light text-white mb-6 leading-tight"
          style={{ fontFamily: 'Cormorant Garamond, serif' }}
        >
          {title}
        </h2>
        <p className="text-white/50 text-lg leading-relaxed mb-10 max-w-xl mx-auto">{subtitle}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href={ctaUrl}
            className="bg-[#C9A650] text-black px-10 py-4 text-sm tracking-[0.2em] uppercase font-medium hover:bg-[#b8943f] transition-colors"
          >
            {ctaText}
          </a>
          <a
            href="tel:8005550199"
            className="text-white/50 text-sm tracking-wider hover:text-[#C9A650] transition-colors"
          >
            Or call (800) 555-0199
          </a>
        </div>
        <p className="mt-8 text-white/20 text-xs tracking-wider">Licensed · Insured · CalDRE #02XXXXXX</p>
      </div>
    </section>
  ),
}

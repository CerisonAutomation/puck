import type { ComponentConfig } from '@measured/puck'

type Props = {
  headline: string
  subheadline?: string
  ctaText: string
  ctaHref: string
  variant?: 'dark' | 'gold' | 'light'
}

export const CTABanner: ComponentConfig<Props> = {
  label: 'CTA Banner',
  fields: {
    headline: { type: 'text' },
    subheadline: { type: 'text' },
    ctaText: { type: 'text' },
    ctaHref: { type: 'text' },
    variant: { type: 'radio', options: [{ label: 'Dark', value: 'dark' }, { label: 'Gold', value: 'gold' }, { label: 'Light', value: 'light' }] },
  },
  defaultProps: {
    headline: 'Ready to Simplify Your Investment?',
    subheadline: 'Join 200+ property owners who trust Christian Property Management.',
    ctaText: 'Schedule a Free Consultation',
    ctaHref: '/contact',
    variant: 'gold',
  },
  render: ({ headline, subheadline, ctaText, ctaHref, variant }) => {
    const bg = variant === 'gold' ? 'bg-[#C9A650]' : variant === 'light' ? 'bg-white' : 'bg-[#0C0B09]'
    const textColor = variant === 'light' ? 'text-[#0C0B09]' : 'text-white'
    const btnClass = variant === 'gold'
      ? 'bg-[#0C0B09] text-white hover:bg-black'
      : variant === 'light'
      ? 'bg-[#C9A650] text-black hover:bg-[#e2c070]'
      : 'bg-[#C9A650] text-black hover:bg-[#e2c070]'

    return (
      <section className={`${bg} ${textColor} py-24 px-6`}>
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-6">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight" style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic' }}>
            {headline}
          </h2>
          {subheadline && <p className="text-lg opacity-75 max-w-2xl">{subheadline}</p>}
          <a href={ctaHref} className={`inline-flex items-center gap-2 ${btnClass} px-10 py-4 text-sm font-semibold tracking-widest uppercase transition-colors`}>
            {ctaText}
          </a>
        </div>
      </section>
    )
  },
}

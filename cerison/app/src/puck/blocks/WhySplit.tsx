import { ComponentConfig } from '@measured/puck'

const DEFAULT_REASONS = [
  { num: '01', title: 'Local Expertise', body: 'Deep roots in Southern California’s rental market with 15+ years managing properties across LA, Orange County, and the Inland Empire.' },
  { num: '02', title: 'Transparent Reporting', body: 'Real-time owner portal with monthly statements, maintenance logs, and vacancy analytics — zero surprises.' },
  { num: '03', title: 'Maximum ROI', body: 'Data-driven pricing strategies and proactive maintenance that protect asset value and maximize net operating income.' },
  { num: '04', title: 'Tenant Quality', body: 'Rigorous screening results in average tenancy of 2.7 years and a 97% on-time rent collection rate.' },
]

type Props = { title?: string; subtitle?: string }

export const WhySplit: ComponentConfig<Props> = {
  label: 'Why Choose Us (Split)',
  fields: {
    title: { type: 'text', label: 'Heading' },
    subtitle: { type: 'text', label: 'Subheading' },
  },
  defaultProps: {
    title: 'Why Christian Property Management',
    subtitle: 'We treat your investment like our own.',
  },
  render: ({ title, subtitle }) => (
    <section className="bg-[#050505] py-24 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start">
        <div className="sticky top-24">
          <p className="text-[#C9A650] text-xs tracking-[0.3em] uppercase mb-4">Why Us</p>
          <h2 className="text-4xl md:text-5xl font-light text-white leading-tight mb-6" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{title}</h2>
          <p className="text-white/50 text-lg leading-relaxed">{subtitle}</p>
          <div className="mt-10 h-px bg-white/10 w-24" />
          <p className="mt-6 text-white/30 text-sm">Trusted by 500+ property owners across Southern California.</p>
        </div>
        <div className="space-y-0 divide-y divide-white/10">
          {DEFAULT_REASONS.map(({ num, title: t, body }) => (
            <div key={num} className="py-8 group">
              <div className="flex items-start gap-6">
                <span className="text-[#C9A650]/40 text-5xl font-light leading-none" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{num}</span>
                <div>
                  <h3 className="text-white font-medium text-lg mb-2 group-hover:text-[#C9A650] transition-colors">{t}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  ),
}

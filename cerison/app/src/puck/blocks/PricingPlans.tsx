import { ComponentConfig } from '@measured/puck'

const PLANS = [
  {
    name: 'Leasing Only',
    price: 'One Month\'s Rent',
    freq: 'one-time',
    desc: 'Perfect for owners who want to self-manage but need expert tenant placement.',
    features: ['Professional photography', 'Multi-platform listing', 'Tenant screening', 'Lease preparation', 'Move-in inspection'],
    cta: 'Get Started',
    highlight: false,
  },
  {
    name: 'Full Management',
    price: '8%',
    freq: 'of monthly rent',
    desc: 'Our most popular plan. Complete hands-off ownership with maximum returns.',
    features: ['Everything in Leasing Only', 'Rent collection & disbursement', '24/7 maintenance coordination', 'Monthly owner statements', 'Annual inspections', 'Lease renewals', 'Eviction support'],
    cta: 'Start Managing',
    highlight: true,
  },
  {
    name: 'Portfolio',
    price: 'Custom',
    freq: 'pricing',
    desc: 'Tailored solutions for investors with 5+ properties or commercial assets.',
    features: ['Dedicated account manager', 'Custom reporting dashboard', 'Bulk maintenance pricing', 'Priority response SLA', 'Quarterly strategy reviews'],
    cta: 'Contact Us',
    highlight: false,
  },
]

type Props = { title?: string }

export const PricingPlans: ComponentConfig<Props> = {
  label: 'Pricing Plans',
  fields: { title: { type: 'text', label: 'Section Title' } },
  defaultProps: { title: 'Simple, Transparent Pricing' },
  render: ({ title }) => (
    <section className="bg-[#050505] py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[#C9A650] text-xs tracking-[0.3em] uppercase mb-3">Pricing</p>
          <h2 className="text-4xl md:text-5xl font-light text-white" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{title}</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-px bg-white/10">
          {PLANS.map(({ name, price, freq, desc, features, cta, highlight }) => (
            <div key={name} className={`p-8 flex flex-col ${
              highlight ? 'bg-[#0F0E0B] border-t-2 border-[#C9A650]' : 'bg-[#050505]'
            }`}>
              {highlight && <span className="text-[#C9A650] text-xs tracking-[0.2em] uppercase mb-4">Most Popular</span>}
              <h3 className="text-white font-medium text-xl mb-2">{name}</h3>
              <div className="mb-4">
                <span className="text-4xl font-light text-white" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{price}</span>
                <span className="text-white/40 text-sm ml-2">{freq}</span>
              </div>
              <p className="text-white/50 text-sm leading-relaxed mb-6">{desc}</p>
              <ul className="space-y-3 mb-8 flex-1">
                {features.map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm text-white/70">
                    <span className="text-[#C9A650] mt-0.5 text-xs">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a href="#contact" className={`text-center py-3 px-6 text-sm tracking-wider transition-colors ${
                highlight
                  ? 'bg-[#C9A650] text-black hover:bg-[#b8943f]'
                  : 'border border-white/20 text-white hover:border-[#C9A650] hover:text-[#C9A650]'
              }`}>{cta}</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  ),
}

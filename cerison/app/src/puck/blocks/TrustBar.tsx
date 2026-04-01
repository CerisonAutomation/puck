import type { ComponentConfig } from '@measured/puck'

const DEFAULT_STATS = [
  { value: '200+', label: 'Properties Managed' },
  { value: '15', label: 'Years of Experience' },
  { value: '98%', label: 'Owner Satisfaction' },
  { value: '24/7', label: 'Emergency Support' },
]

const DEFAULT_PLATFORMS = [
  { name: 'Google', rating: '5.0', reviews: '127 reviews' },
  { name: 'Yelp', rating: '4.9', reviews: '84 reviews' },
  { name: 'BBB', rating: 'A+', reviews: 'Accredited' },
]

type Props = { title?: string }

export const TrustBar: ComponentConfig<Props> = {
  label: 'Trust Bar',
  fields: { title: { type: 'text', label: 'Section Label (optional)' } },
  defaultProps: { title: 'Trusted by Hundreds of Property Owners Across Southern California' },
  render: ({ title }) => (
    <section className="bg-[#0F0E0B] border-y border-white/10 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {title && (
          <p className="text-center text-white/40 text-xs tracking-[0.3em] uppercase mb-14">{title}</p>
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {DEFAULT_STATS.map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="text-5xl md:text-6xl font-light text-[#C9A650] mb-2" style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic' }}>{value}</div>
              <div className="text-white/60 text-sm tracking-wider uppercase">{label}</div>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          {DEFAULT_PLATFORMS.map(({ name, rating, reviews }) => (
            <div key={name} className="flex items-center gap-3 border border-white/10 px-6 py-3 rounded-none">
              <span className="text-white font-semibold">{name}</span>
              <span className="text-[#C9A650] font-bold">{rating}</span>
              <span className="text-white/40 text-sm">{reviews}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  ),
}

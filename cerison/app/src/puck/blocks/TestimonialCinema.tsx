'use client'
import { useState } from 'react'
import { ComponentConfig } from '@measured/puck'

const DEFAULT_TESTIMONIALS = [
  { name: 'Robert & Linda Chen', location: 'Pasadena, CA', quote: 'Christian Property Management transformed our rental income. Vacancy dropped to zero within 2 weeks of listing and our ROI increased by 31% in the first year.', rating: 5, tenure: '3 years' },
  { name: 'Marcus Williams', location: 'Long Beach, CA', quote: 'After a nightmare experience with our previous manager, CPM restored our faith. Transparent reporting, responsive team, and tenants who actually pay on time.', rating: 5, tenure: '5 years' },
  { name: 'Sofia Gutierrez', location: 'Riverside, CA', quote: 'They handled everything — maintenance calls, lease renewals, legal issues. I went from stressed landlord to completely hands-off investor.', rating: 5, tenure: '2 years' },
]

type Props = { title?: string }

export const TestimonialCinema: ComponentConfig<Props> = {
  label: 'Testimonial Cinema',
  fields: { title: { type: 'text', label: 'Section Title' } },
  defaultProps: { title: 'What Our Owners Say' },
  render: ({ title }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [active, setActive] = useState(0)
    const t = DEFAULT_TESTIMONIALS[active]
    return (
      <section className="bg-[#0C0B09] py-24 px-6 overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#C9A650] text-xs tracking-[0.3em] uppercase mb-3">Testimonials</p>
            <h2 className="text-4xl md:text-5xl font-light text-white" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{title}</h2>
          </div>
          <div className="relative border border-white/10 p-10 md:p-16 bg-[#0F0E0B]">
            <div className="text-6xl text-[#C9A650]/20 font-serif leading-none mb-6">&ldquo;</div>
            <blockquote className="text-white/80 text-xl md:text-2xl font-light leading-relaxed mb-8" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              {t.quote}
            </blockquote>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">{t.name}</p>
                <p className="text-white/40 text-sm">{t.location} &bull; {t.tenure} with CPM</p>
              </div>
              <div className="flex gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <span key={i} className="text-[#C9A650] text-sm">★</span>
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-3 mt-6 justify-center">
            {DEFAULT_TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`h-px w-12 transition-all ${
                  i === active ? 'bg-[#C9A650]' : 'bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      </section>
    )
  },
}

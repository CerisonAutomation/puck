'use client'
import { useState } from 'react'
import { ComponentConfig } from '@measured/puck'

const DEFAULT_FAQS = [
  { q: 'How much do you charge for property management?', a: 'Our full management fee is 8% of monthly collected rent with no hidden costs. The leasing fee is one month\'s rent for tenant placement only.' },
  { q: 'How quickly can you find a tenant for my property?', a: 'Our average time-to-lease is 12 days. We use professional photography, optimized pricing, and syndicate listings across 20+ platforms including Zillow, Apartments.com, and MLS.' },
  { q: 'What happens if a tenant stops paying rent?', a: 'We handle the entire eviction process including legal notices, court filings, and coordination with attorneys. Our proactive screening minimizes this risk — our eviction rate is under 1%.' },
  { q: 'Can I still access my property while you manage it?', a: 'Absolutely. You retain ownership and access rights. We simply ask for 24-hour notice so we can inform tenants — as required by California law.' },
  { q: 'Do you manage commercial properties?', a: 'Yes, through our Portfolio plan. We manage retail, office, and mixed-use properties with dedicated account managers and custom lease structures.' },
  { q: 'How do I receive my rental income?', a: 'Via ACH direct deposit to your bank account by the 10th of each month, along with a detailed owner statement through your online portal.' },
]

type Props = { title?: string }

export const FAQAccordion: ComponentConfig<Props> = {
  label: 'FAQ Accordion',
  fields: { title: { type: 'text' } },
  defaultProps: { title: 'Frequently Asked Questions' },
  render: ({ title }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState<number | null>(null)
    return (
      <section className="bg-[#0C0B09] py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-light text-white mb-16 text-center" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{title}</h2>
          <div className="divide-y divide-white/10">
            {DEFAULT_FAQS.map(({ q, a }, i) => (
              <div key={i}>
                <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex justify-between items-center py-6 text-left">
                  <span className="text-white group-hover:text-[#C9A650] transition-colors font-medium pr-4">{q}</span>
                  <span className="text-[#C9A650] text-2xl flex-shrink-0">{open === i ? '-' : '+'}</span>
                </button>
                {open === i && <p className="text-white/60 pb-6 leading-relaxed">{a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  },
}

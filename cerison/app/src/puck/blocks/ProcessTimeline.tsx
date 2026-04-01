import { ComponentConfig } from '@measured/puck'

const DEFAULT_STEPS = [
  { step: '01', title: 'Free Consultation', desc: 'We assess your property, discuss your goals, and provide a custom management proposal with projected ROI.' },
  { step: '02', title: 'Onboarding & Setup', desc: 'We document the property condition, set up your owner portal, and configure automated rent collection within 48 hours.' },
  { step: '03', title: 'Marketing & Leasing', desc: 'Professional photography, optimized listings across 20+ platforms, and rigorous tenant screening begins immediately.' },
  { step: '04', title: 'Ongoing Management', desc: 'We handle all tenant communications, maintenance coordination, inspections, and monthly financial reporting.' },
]

type Props = { title?: string }

export const ProcessTimeline: ComponentConfig<Props> = {
  label: 'Process Timeline',
  fields: { title: { type: 'text', label: 'Section Title' } },
  defaultProps: { title: 'How It Works' },
  render: ({ title }) => (
    <section className="bg-[#080808] py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-20">
          <p className="text-[#C9A650] text-xs tracking-[0.3em] uppercase mb-3">Our Process</p>
          <h2 className="text-4xl md:text-5xl font-light text-white" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{title}</h2>
        </div>
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-white/10" />
          <div className="space-y-12">
            {DEFAULT_STEPS.map(({ step, title: t, desc }) => (
              <div key={step} className="flex gap-8 items-start pl-4">
                <div className="relative z-10 flex-shrink-0 w-8 h-8 rounded-full border border-[#C9A650]/40 bg-[#080808] flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-[#C9A650]" />
                </div>
                <div className="pt-1">
                  <span className="text-[#C9A650]/50 text-xs tracking-widest uppercase">{step}</span>
                  <h3 className="text-white text-xl font-medium mt-1 mb-2">{t}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  ),
}

import { ComponentConfig } from '@measured/puck'

const DEFAULT_SERVICES = [
  { icon: '🏠', title: 'Full Property Management', desc: 'End-to-end management of your rental — from tenant screening to maintenance coordination.' },
  { icon: '📋', title: 'Tenant Screening', desc: 'Comprehensive background, credit, and rental history checks for every applicant.' },
  { icon: '🔧', title: 'Maintenance & Repairs', desc: '24/7 maintenance coordination with a trusted network of licensed contractors.' },
  { icon: '💰', title: 'Rent Collection', desc: 'Automated rent collection with detailed monthly owner statements.' },
  { icon: '📸', title: 'Professional Marketing', desc: 'HDR photography, virtual tours, and multi-platform listings to minimize vacancy.' },
  { icon: '⚖️', title: 'Legal Compliance', desc: 'Stay protected with CA landlord-tenant law expertise and eviction support.' },
]

type Props = { title?: string }

export const ServicesGrid: ComponentConfig<Props> = {
  label: 'Services Grid',
  fields: { title: { type: 'text', label: 'Section Title (optional)' } },
  defaultProps: { title: 'What We Manage For You' },
  render: ({ title }) => (
    <section className="bg-[#0A0A0A] py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {title && (
          <div className="text-center mb-16">
            <p className="text-white/40 text-xs tracking-[0.3em] uppercase mb-3">Our Services</p>
            <h2 className="text-4xl md:text-5xl font-light text-white" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{title}</h2>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10">
          {DEFAULT_SERVICES.map(({ icon, title: t, desc }) => (
            <div key={t} className="bg-[#0A0A0A] p-8 hover:bg-[#111] transition-colors group">
              <div className="text-3xl mb-4">{icon}</div>
              <h3 className="text-white font-medium text-lg mb-3 group-hover:text-[#C9A650] transition-colors">{t}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  ),
}

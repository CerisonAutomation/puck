'use client'
import { useState } from 'react'
import { ComponentConfig } from '@measured/puck'

type Props = {
  title?: string
  subtitle?: string
  phone?: string
  email?: string
}

export const ContactForm: ComponentConfig<Props> = {
  label: 'Contact Form',
  fields: {
    title: { type: 'text', label: 'Heading' },
    subtitle: { type: 'text', label: 'Subheading' },
    phone: { type: 'text', label: 'Phone Number' },
    email: { type: 'text', label: 'Email Address' },
  },
  defaultProps: {
    title: 'Get a Free Property Assessment',
    subtitle: 'Tell us about your property and we\'ll respond within 2 business hours.',
    phone: '(800) 555-0199',
    email: 'info@christianpm.com',
  },
  render: ({ title, subtitle, phone, email }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      setStatus('sending')
      setTimeout(() => setStatus('sent'), 1500)
    }
    return (
      <section id="contact" className="bg-[#0A0A0A] py-24 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16">
          <div>
            <p className="text-[#C9A650] text-xs tracking-[0.3em] uppercase mb-4">Contact</p>
            <h2 className="text-4xl md:text-5xl font-light text-white leading-tight mb-6" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{title}</h2>
            <p className="text-white/50 leading-relaxed mb-10">{subtitle}</p>
            <div className="space-y-4">
              <a href={`tel:${phone}`} className="flex items-center gap-3 text-white/70 hover:text-[#C9A650] transition-colors">
                <span className="text-[#C9A650]">T</span> {phone}
              </a>
              <a href={`mailto:${email}`} className="flex items-center gap-3 text-white/70 hover:text-[#C9A650] transition-colors">
                <span className="text-[#C9A650]">E</span> {email}
              </a>
            </div>
          </div>
          <div>
            {status === 'sent' ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-16">
                <div className="text-[#C9A650] text-4xl mb-4">✓</div>
                <p className="text-white text-xl font-light">Message received.</p>
                <p className="text-white/40 mt-2 text-sm">We\'ll be in touch within 2 business hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  { name: 'name', label: 'Full Name', type: 'text' },
                  { name: 'email', label: 'Email Address', type: 'email' },
                  { name: 'phone', label: 'Phone Number', type: 'tel' },
                ].map(({ name, label, type }) => (
                  <div key={name}>
                    <label className="block text-white/40 text-xs tracking-wider uppercase mb-2">{label}</label>
                    <input
                      type={type}
                      name={name}
                      required
                      className="w-full bg-transparent border border-white/20 px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[#C9A650] transition-colors"
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-white/40 text-xs tracking-wider uppercase mb-2">Property Address</label>
                  <textarea
                    name="property"
                    rows={3}
                    className="w-full bg-transparent border border-white/20 px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[#C9A650] transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full bg-[#C9A650] text-black py-4 text-sm tracking-[0.2em] uppercase font-medium hover:bg-[#b8943f] transition-colors disabled:opacity-50"
                >
                  {status === 'sending' ? 'Sending...' : 'Request Free Assessment'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    )
  },
}

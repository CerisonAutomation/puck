'use client'
import type { ComponentConfig } from '@measured/puck'

interface Testimonial {
  quote: string
  name: string
  role: string
}

export interface TestimonialBandProps {
  heading: string
  testimonials: Testimonial[]
}

export const TestimonialBandBlock: ComponentConfig<TestimonialBandProps> = {
  label: 'Testimonial Band',
  defaultProps: {
    heading: 'What Our Clients Say',
    testimonials: [
      { quote: 'Exceptional service, honest communication, and true peace of mind.', name: 'María G.', role: 'Property Owner' },
      { quote: 'My property has never been better managed. Highly recommend.', name: 'Carlos R.', role: 'Landlord' },
    ],
  },
  fields: {
    heading: { type: 'text', label: 'Section Heading' },
    testimonials: {
      type: 'array',
      label: 'Testimonials',
      arrayFields: {
        quote: { type: 'textarea', label: 'Quote' },
        name: { type: 'text', label: 'Name' },
        role: { type: 'text', label: 'Role' },
      },
    },
  },
  render: ({ heading, testimonials }) => (
    <section className="py-20 px-6 bg-amber-50 dark:bg-stone-800">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">{heading}</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <blockquote key={i} className="p-6 bg-white dark:bg-stone-900 rounded-xl border border-amber-200 dark:border-stone-700">
              <p className="text-stone-700 dark:text-stone-300 italic mb-4">&ldquo;{t.quote}&rdquo;</p>
              <footer>
                <strong className="text-stone-900 dark:text-white">{t.name}</strong>
                <span className="text-stone-500 dark:text-stone-400 ml-2">{t.role}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  ),
}

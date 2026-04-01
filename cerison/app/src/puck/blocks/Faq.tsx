'use client'
import type { ComponentConfig } from '@measured/puck'
import { useState } from 'react'

interface FaqItem {
  question: string
  answer: string
}

export interface FaqProps {
  heading: string
  items: FaqItem[]
}

export const FaqBlock: ComponentConfig<FaqProps> = {
  label: 'FAQ',
  defaultProps: {
    heading: 'Frequently Asked Questions',
    items: [
      { question: 'What does property management include?', answer: 'We handle tenant screening, rent collection, maintenance, legal compliance, and monthly reporting.' },
      { question: 'How do you find tenants?', answer: 'We list on major portals, conduct thorough background checks, and verify employment and references.' },
      { question: 'What is the minimum contract length?', answer: 'Our standard management contract is 12 months, renewable annually.' },
    ],
  },
  fields: {
    heading: { type: 'text', label: 'Section Heading' },
    items: {
      type: 'array',
      label: 'FAQ Items',
      arrayFields: {
        question: { type: 'text', label: 'Question' },
        answer: { type: 'textarea', label: 'Answer' },
      },
    },
  },
  render: ({ heading, items }) => {
    const [open, setOpen] = useState<number | null>(null)
    return (
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">{heading}</h2>
          <div className="space-y-3">
            {items.map((item, i) => (
              <div key={i} className="border border-stone-200 dark:border-stone-700 rounded-xl overflow-hidden">
                <button
                  className="w-full flex items-center justify-between px-6 py-4 text-left font-medium bg-white dark:bg-stone-900 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                >
                  {item.question}
                  <span className="text-amber-500 ml-4">{open === i ? '−' : '+'}</span>
                </button>
                {open === i && (
                  <div className="px-6 py-4 bg-stone-50 dark:bg-stone-800/60 text-stone-600 dark:text-stone-400 text-sm">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  },
}

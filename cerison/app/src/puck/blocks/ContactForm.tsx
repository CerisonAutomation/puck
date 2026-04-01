'use client'
import type { ComponentConfig } from '@measured/puck'
import { useState } from 'react'

export interface ContactFormProps {
  heading: string
  description: string
  submitLabel: string
  recipientEmail: string
}

export const ContactFormBlock: ComponentConfig<ContactFormProps> = {
  label: 'Contact Form',
  defaultProps: {
    heading: 'Get in Touch',
    description: 'Fill in the form below and we will get back to you within 24 hours.',
    submitLabel: 'Send Message',
    recipientEmail: 'hello@christianpropertymanagement.com',
  },
  fields: {
    heading: { type: 'text', label: 'Heading' },
    description: { type: 'textarea', label: 'Description' },
    submitLabel: { type: 'text', label: 'Submit Button Label' },
    recipientEmail: { type: 'text', label: 'Recipient Email' },
  },
  render: ({ heading, description, submitLabel }) => {
    const [sent, setSent] = useState(false)
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault()
      setLoading(true)
      await new Promise((r) => setTimeout(r, 800))
      setSent(true)
      setLoading(false)
    }

    return (
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-2">{heading}</h2>
          <p className="text-stone-500 mb-8">{description}</p>
          {sent ? (
            <div className="p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl text-center">
              <p className="text-green-700 dark:text-green-300 font-semibold">Message sent! We will be in touch soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="cf-name">Name</label>
                  <input id="cf-name" required type="text" className="w-full px-4 py-2 border border-stone-300 dark:border-stone-600 rounded-lg bg-white dark:bg-stone-800" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="cf-email">Email</label>
                  <input id="cf-email" required type="email" className="w-full px-4 py-2 border border-stone-300 dark:border-stone-600 rounded-lg bg-white dark:bg-stone-800" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="cf-message">Message</label>
                <textarea id="cf-message" required rows={5} className="w-full px-4 py-2 border border-stone-300 dark:border-stone-600 rounded-lg bg-white dark:bg-stone-800" />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 bg-amber-500 hover:bg-amber-400 text-black font-semibold rounded-lg transition-colors disabled:opacity-50"
              >
                {loading ? 'Sending...' : submitLabel}
              </button>
            </form>
          )}
        </div>
      </section>
    )
  },
}

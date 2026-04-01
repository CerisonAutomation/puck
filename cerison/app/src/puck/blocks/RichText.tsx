'use client'
import type { ComponentConfig } from '@measured/puck'

export interface RichTextProps {
  content: string
  align: 'left' | 'center' | 'right'
  maxWidth: string
}

export const RichTextBlock: ComponentConfig<RichTextProps> = {
  label: 'Rich Text',
  defaultProps: { content: '<p>Enter your content here.</p>', align: 'left', maxWidth: '720px' },
  fields: {
    content: { type: 'textarea', label: 'HTML Content' },
    align: {
      type: 'select',
      label: 'Alignment',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
    },
    maxWidth: { type: 'text', label: 'Max Width (e.g. 720px)' },
  },
  render: ({ content, align, maxWidth }) => (
    <div className="py-12 px-6">
      <div
        className="mx-auto prose prose-lg"
        style={{ maxWidth, textAlign: align }}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  ),
}

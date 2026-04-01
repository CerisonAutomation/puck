'use client'
import type { Config } from '@measured/puck'
import { headingAnalyzer } from '@measured/puck-plugin-heading-analyzer'

// Block imports
import { HeroCinematic, type HeroCinematicProps } from './blocks/HeroCinematic'
import { TrustBar, type TrustBarProps } from './blocks/TrustBar'
import { ServicesGrid, type ServicesGridProps } from './blocks/ServicesGrid'
import { WhySplit, type WhySplitProps } from './blocks/WhySplit'
import { TestimonialCinema, type TestimonialCinemaProps } from './blocks/TestimonialCinema'
import { ProcessTimeline, type ProcessTimelineProps } from './blocks/ProcessTimeline'
import { PricingPlans, type PricingPlansProps } from './blocks/PricingPlans'
import { FAQAccordion, type FAQAccordionProps } from './blocks/FAQAccordion'
import { ContactForm, type ContactFormProps } from './blocks/ContactForm'
import { CTABanner, type CTABannerProps } from './blocks/CTABanner'
import { PropertyShowcase, type PropertyShowcaseProps } from './blocks/PropertyShowcase'
import { BookDirect, type BookDirectProps } from './blocks/BookDirect'

export type BlockProps =
  | ({ type: 'HeroCinematic' } & HeroCinematicProps)
  | ({ type: 'TrustBar' } & TrustBarProps)
  | ({ type: 'ServicesGrid' } & ServicesGridProps)
  | ({ type: 'WhySplit' } & WhySplitProps)
  | ({ type: 'TestimonialCinema' } & TestimonialCinemaProps)
  | ({ type: 'ProcessTimeline' } & ProcessTimelineProps)
  | ({ type: 'PricingPlans' } & PricingPlansProps)
  | ({ type: 'FAQAccordion' } & FAQAccordionProps)
  | ({ type: 'ContactForm' } & ContactFormProps)
  | ({ type: 'CTABanner' } & CTABannerProps)
  | ({ type: 'PropertyShowcase' } & PropertyShowcaseProps)
  | ({ type: 'BookDirect' } & BookDirectProps)

export const puckConfig: Config = {
  plugins: [headingAnalyzer],
  components: {
    HeroCinematic,
    TrustBar,
    ServicesGrid,
    WhySplit,
    TestimonialCinema,
    ProcessTimeline,
    PricingPlans,
    FAQAccordion,
    ContactForm,
    CTABanner,
    PropertyShowcase,
    BookDirect,
  },
  root: {
    fields: {
      title: { type: 'text', label: 'Page Title' },
      description: { type: 'textarea', label: 'Meta Description' },
    },
    render: ({ children, title }) => (
      <div className="cpm-root" data-page-title={title}>
        {children}
      </div>
    ),
  },
  categories: {
    hero: { title: 'Hero Sections', components: ['HeroCinematic', 'CTABanner'] },
    content: { title: 'Content', components: ['TrustBar', 'ServicesGrid', 'WhySplit', 'ProcessTimeline'] },
    social: { title: 'Social Proof', components: ['TestimonialCinema'] },
    properties: { title: 'Properties', components: ['PropertyShowcase'] },
    conversion: { title: 'Conversion', components: ['PricingPlans', 'FAQAccordion', 'ContactForm', 'BookDirect'] },
  },
}

'use client'
import type { Config } from '@measured/puck'
import { HeadingAnalyzer } from '@measured/puck-plugin-heading-analyzer'

import { HeroCinematic } from './blocks/HeroCinematic'
import { TrustBar } from './blocks/TrustBar'
import { ServicesGrid } from './blocks/ServicesGrid'
import { WhySplit } from './blocks/WhySplit'
import { TestimonialCinema } from './blocks/TestimonialCinema'
import { ProcessTimeline } from './blocks/ProcessTimeline'
import { PricingPlans } from './blocks/PricingPlans'
import { FAQAccordion } from './blocks/FAQAccordion'
import { ContactForm } from './blocks/ContactForm'
import { CTABanner } from './blocks/CTABanner'
import { PropertyShowcase } from './blocks/PropertyShowcase'
import { BookDirect } from './blocks/BookDirect'

export const puckConfig: Config = {
  plugins: [HeadingAnalyzer()],

  categories: {
    hero:       { title: 'Hero',         components: ['HeroCinematic'] },
    content:    { title: 'Content',      components: ['TrustBar', 'WhySplit', 'ServicesGrid'] },
    social:     { title: 'Social Proof', components: ['TestimonialCinema'] },
    services:   { title: 'Services',     components: ['ProcessTimeline', 'PricingPlans', 'FAQAccordion'] },
    conversion: { title: 'Conversion',   components: ['CTABanner', 'ContactForm', 'BookDirect'] },
    properties: { title: 'Properties',   components: ['PropertyShowcase'] },
  },

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
      title:       { type: 'text',     label: 'Page Title' },
      description: { type: 'textarea', label: 'Meta Description' },
    },
    defaultProps: {
      title:       'Christian Property Management',
      description: 'Premier property management services in Southern California.',
    },
    render: ({ children }) => <>{children}</>,
  },
}

export const pageDefaults: Record<string, any> = {
  home: {
    root: { props: { title: 'Home — CPM', description: 'Premier property management in SoCal.' } },
    content: [
      { type: 'HeroCinematic',   props: { headline: 'Property Management\nYou Can Trust', subheadline: 'Over 200 properties managed across Southern California. Licensed, insured, and faith-driven.', ctaText: 'Get a Free Quote', ctaHref: '/contact', bgImage: '' } },
      { type: 'TrustBar',        props: {} },
      { type: 'ServicesGrid',    props: {} },
      { type: 'WhySplit',        props: {} },
      { type: 'PropertyShowcase', props: {} },
      { type: 'TestimonialCinema', props: {} },
      { type: 'CTABanner',       props: { headline: 'Ready to Simplify Your Investment?', subheadline: 'Join 200+ owners who trust CPM.', ctaText: 'Schedule a Call', ctaHref: '/contact', variant: 'gold' } },
    ],
    zones: {},
  },
  about: {
    root: { props: { title: 'About — CPM', description: 'Our story and mission.' } },
    content: [
      { type: 'HeroCinematic',    props: { headline: 'About\nChristian PM', subheadline: 'Built on integrity, faith, and 15 years of local expertise.', ctaText: 'Our Services', ctaHref: '/services', bgImage: '' } },
      { type: 'WhySplit',         props: {} },
      { type: 'ProcessTimeline',  props: {} },
      { type: 'TestimonialCinema', props: {} },
      { type: 'CTABanner',        props: { headline: "Let's Work Together", subheadline: '', ctaText: 'Contact Us', ctaHref: '/contact', variant: 'dark' } },
    ],
    zones: {},
  },
  pricing: {
    root: { props: { title: 'Pricing — CPM', description: 'Transparent, fair pricing.' } },
    content: [
      { type: 'HeroCinematic', props: { headline: 'Simple,\nTransparent Pricing', subheadline: 'No hidden fees. No surprises. Ever.', ctaText: 'Get Started', ctaHref: '/contact', bgImage: '' } },
      { type: 'PricingPlans',  props: {} },
      { type: 'FAQAccordion',  props: {} },
      { type: 'CTABanner',     props: { headline: "Questions? Let's Talk.", subheadline: "We'll match you to the right plan.", ctaText: 'Book a Call', ctaHref: '/contact', variant: 'gold' } },
    ],
    zones: {},
  },
  contact: {
    root: { props: { title: 'Contact — CPM', description: 'Get in touch with our team.' } },
    content: [{ type: 'ContactForm', props: {} }],
    zones: {},
  },
  properties: {
    root: { props: { title: 'Properties — CPM', description: 'Browse available properties.' } },
    content: [
      { type: 'HeroCinematic',    props: { headline: 'Find Your\nPerfect Property', subheadline: 'Browse our curated portfolio of managed properties.', ctaText: 'Book Direct', ctaHref: '/booking', bgImage: '' } },
      { type: 'PropertyShowcase', props: {} },
      { type: 'BookDirect',       props: {} },
    ],
    zones: {},
  },
}

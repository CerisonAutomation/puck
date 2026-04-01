import type { Config } from '@measured/puck'

// ─── block imports ───────────────────────────────────────────────────────────
import { HeroBlock, heroBlockDefaultProps } from './blocks/Hero'
import { RichTextBlock } from './blocks/RichText'
import { FeatureGridBlock } from './blocks/FeatureGrid'
import { TestimonialBandBlock } from './blocks/TestimonialBand'
import { PropertyShowcaseBlock } from './blocks/PropertyShowcase'
import { BookDirectBlock } from './blocks/BookDirect'
import { ContactFormBlock } from './blocks/ContactForm'
import { PricingBlock } from './blocks/Pricing'
import { FaqBlock } from './blocks/Faq'

export type CPMComponents =
  | 'Hero'
  | 'RichText'
  | 'FeatureGrid'
  | 'TestimonialBand'
  | 'PropertyShowcase'
  | 'BookDirect'
  | 'ContactForm'
  | 'Pricing'
  | 'Faq'

export const puckConfig: Config = {
  components: {
    Hero: HeroBlock,
    RichText: RichTextBlock,
    FeatureGrid: FeatureGridBlock,
    TestimonialBand: TestimonialBandBlock,
    PropertyShowcase: PropertyShowcaseBlock,
    BookDirect: BookDirectBlock,
    ContactForm: ContactFormBlock,
    Pricing: PricingBlock,
    Faq: FaqBlock,
  },
  root: {
    render: ({ children }) => <>{children}</>,
  },
}

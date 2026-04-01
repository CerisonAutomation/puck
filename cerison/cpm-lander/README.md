# CPM Cinematic Lander — Puck Config

Full cinematic Puck page config for **Christian Property Management**.

## Design System

| Token | Value | Use |
|---|---|---|
| Navy `#0a1628` | Primary background | Dark sections, hero, footer |
| Gold `#c9a84c` | Accent | CTAs, headings accent, borders |
| White `#faf9f6` | Light surface | Body sections |
| Cormorant Garamond | Display font | All headings |
| Inter | Body font | Body copy, UI |

## 12 Blocks

| Block | Section |
|---|---|
| `CinematicHero` | Full-viewport hero with parallax BG, gold shimmer headline, animated CTAs |
| `TrustBar` | Icon + label trust signals below hero |
| `SectionHeader` | Reusable section headline component |
| `ServicesGrid` | 6-service grid with hover lift, gold accent borders |
| `PropertyShowcase` | 3-up property card grid with price, beds/baths, image |
| `LeasePathway` | 4-step lease-to-own program with side image |
| `StatsCounter` | Animated gold counter: 20+ years, 200+ properties, etc. |
| `Testimonials` | 3-column testimonial cards with gold quote marks |
| `TeamSection` | 2-col layout with contact info + team member cards |
| `FAQAccordion` | Native `<details>` accordion, no JS dependency |
| `CTABanner` | Full-bleed final CTA with phone number |
| `FooterBlock` | 3-col footer: brand, contact, nav links |

## Usage

```tsx
import cpmConfig from '@/cerison/cpm-lander/puck.config.cpm';
import pageData   from '@/cerison/cpm-lander/page-data.json';
import { Puck, Render } from '@measured/puck';

// Editor:
<Puck config={cpmConfig} data={pageData} onPublish={handlePublish} />

// Renderer (public page):
<Render config={cpmConfig} data={pageData} />
```

## Live Editing

Replace placeholder images by editing the `backgroundImage` and `properties` fields in the Puck sidebar. All real CPM data (address, phone, email, copy) is pre-loaded.

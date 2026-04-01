/**
 * @file puck.config.cpm.tsx
 * @description Christian Property Management — Cinematic Lander
 * All blocks built from the CPM site structure.
 * Premium, motion-forward, dark-capable, production-complete.
 * @version 1.0.0
 */

import type { Config } from '@measured/puck';

// ─── Design Tokens (inline, portable) ──────────────────────────────────────
const T = {
  gold:       '#c9a84c',
  goldLight:  '#e8c97a',
  goldDark:   '#8b6914',
  navy:       '#0a1628',
  navyMid:    '#112040',
  navyLight:  '#1a3260',
  white:      '#faf9f6',
  muted:      '#94a3b8',
  border:     'rgba(201,168,76,0.18)',
  radius:     '12px',
  radiusLg:   '20px',
  font:       '\'Cormorant Garamond\', \'Georgia\', serif',
  fontSans:   '\'Inter\', \'system-ui\', sans-serif',
};

// Shared CSS injected once
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .cpm-root {
    font-family: ${T.fontSans};
    background: ${T.white};
    color: ${T.navy};
    -webkit-font-smoothing: antialiased;
  }

  /* Gold shimmer animation */
  @keyframes goldShimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  .gold-text {
    background: linear-gradient(90deg, ${T.goldDark}, ${T.gold}, ${T.goldLight}, ${T.gold}, ${T.goldDark});
    background-size: 300% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: goldShimmer 4s linear infinite;
  }

  /* Fade-up reveal */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(32px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .fade-up { animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both; }
  .fade-up-d1 { animation-delay: 0.1s; }
  .fade-up-d2 { animation-delay: 0.2s; }
  .fade-up-d3 { animation-delay: 0.3s; }
  .fade-up-d4 { animation-delay: 0.4s; }

  /* Counter animation */
  @keyframes countUp {
    from { opacity: 0; transform: scale(0.7); }
    to   { opacity: 1; transform: scale(1); }
  }

  /* Line reveal */
  @keyframes lineGrow {
    from { width: 0; }
    to   { width: 72px; }
  }
  .line-accent {
    display: block;
    height: 2px;
    background: ${T.gold};
    animation: lineGrow 0.6s 0.3s cubic-bezier(0.16, 1, 0.3, 1) both;
  }

  /* Hover card lift */
  .card-lift {
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
                box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .card-lift:hover {
    transform: translateY(-6px);
    box-shadow: 0 24px 64px rgba(10,22,40,0.18);
  }

  /* Gold CTA button */
  .btn-gold {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 16px 36px;
    background: ${T.gold};
    color: ${T.navy};
    font-family: ${T.fontSans};
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    text-decoration: none;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 4px 24px rgba(201,168,76,0.3);
  }
  .btn-gold:hover {
    background: ${T.goldLight};
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(201,168,76,0.45);
  }

  /* Ghost button */
  .btn-ghost {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 15px 35px;
    background: transparent;
    color: ${T.white};
    font-family: ${T.fontSans};
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.06em;
    text-decoration: none;
    border-radius: 6px;
    border: 1.5px solid rgba(255,255,255,0.4);
    cursor: pointer;
    transition: border-color 0.2s, background 0.2s;
  }
  .btn-ghost:hover {
    border-color: ${T.gold};
    background: rgba(201,168,76,0.08);
    color: ${T.gold};
  }

  /* Section label */
  .section-label {
    display: inline-block;
    font-family: ${T.fontSans};
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: ${T.gold};
    margin-bottom: 16px;
  }

  /* Divider cross ornament */
  .ornament {
    display: flex;
    align-items: center;
    gap: 16px;
    margin: 0 auto;
    width: fit-content;
    color: ${T.gold};
  }
  .ornament::before, .ornament::after {
    content: '';
    display: block;
    width: 48px;
    height: 1px;
    background: ${T.gold};
    opacity: 0.5;
  }
`;

function InjectCSS() {
  return <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />;
}

// ─── Types ───────────────────────────────────────────────────────────────────

type CinematicHeroProps = {
  eyebrow: string;
  headline: string;
  headlineGold: string;
  subheadline: string;
  ctaPrimaryLabel: string;
  ctaPrimaryHref: string;
  ctaSecondaryLabel: string;
  ctaSecondaryHref: string;
  backgroundImage: string;
  overlayOpacity: number;
  showCross: boolean;
};

type TrustBarProps = {
  items: string; // JSON: [{icon, label}]
};

type SectionHeaderProps = {
  eyebrow: string;
  headline: string;
  headlineAccent: string;
  body: string;
  align: 'left' | 'center' | 'right';
  dark: boolean;
};

type ServicesGridProps = {
  eyebrow: string;
  headline: string;
  items: string; // JSON: [{icon, title, description}]
  dark: boolean;
  columns: 2 | 3 | 4;
};

type PropertyShowcaseProps = {
  eyebrow: string;
  headline: string;
  subheadline: string;
  properties: string; // JSON: [{image, label, address, beds, baths, price, tag}]
  ctaLabel: string;
  ctaHref: string;
};

type LeasePathwayProps = {
  eyebrow: string;
  headline: string;
  body: string;
  steps: string; // JSON: [{number, title, description}]
  ctaLabel: string;
  ctaHref: string;
  imageUrl: string;
};

type StatsCounterProps = {
  eyebrow: string;
  stats: string; // JSON: [{value, suffix, label}]
  dark: boolean;
};

type TestimonialsProps = {
  eyebrow: string;
  headline: string;
  items: string; // JSON: [{quote, author, role, avatar}]
  dark: boolean;
};

type TeamSectionProps = {
  eyebrow: string;
  headline: string;
  body: string;
  members: string; // JSON: [{name, role, bio, image}]
};

type FAQAccordionProps = {
  eyebrow: string;
  headline: string;
  items: string; // JSON: [{question, answer}]
  dark: boolean;
};

type CTABannerProps = {
  headline: string;
  headlineGold: string;
  body: string;
  ctaPrimaryLabel: string;
  ctaPrimaryHref: string;
  ctaSecondaryLabel: string;
  ctaSecondaryHref: string;
  backgroundImage: string;
  phone: string;
};

type FooterBlockProps = {
  logo: string;
  tagline: string;
  address: string;
  phone: string;
  email: string;
  copyright: string;
  links: string; // JSON: [{label, href}][]
};

type Components = {
  CinematicHero: CinematicHeroProps;
  TrustBar: TrustBarProps;
  SectionHeader: SectionHeaderProps;
  ServicesGrid: ServicesGridProps;
  PropertyShowcase: PropertyShowcaseProps;
  LeasePathway: LeasePathwayProps;
  StatsCounter: StatsCounterProps;
  Testimonials: TestimonialsProps;
  TeamSection: TeamSectionProps;
  FAQAccordion: FAQAccordionProps;
  CTABanner: CTABannerProps;
  FooterBlock: FooterBlockProps;
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function parseJSON<T>(str: string, fallback: T): T {
  try { return JSON.parse(str) as T; }
  catch { return fallback; }
}

const CrossIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
    <rect x="12" y="2" width="4" height="24" rx="2" fill="currentColor" opacity="0.9" />
    <rect x="2" y="10" width="24" height="4" rx="2" fill="currentColor" opacity="0.9" />
  </svg>
);

// ─── Config ──────────────────────────────────────────────────────────────────

export const cpmConfig: Config<Components> = {
  root: {
    fields: {
      title:       { type: 'text',     label: 'Page Title' },
      description: { type: 'textarea', label: 'Meta Description' },
      ogImage:     { type: 'text',     label: 'OG Image URL' },
    },
    defaultProps: {
      title: 'Christian Property Management | Princeton, WV',
      description: 'Faith-driven property management across southern West Virginia. Rentals, lease-to-own, and management services you can trust.',
      ogImage: '',
    },
    render: ({ children, title }) => (
      <div className="cpm-root">
        <InjectCSS />
        <title>{title}</title>
        {children}
      </div>
    ),
  },

  components: {

    // ══════════════════════════════════════════════════════
    // 1. CINEMATIC HERO
    // ══════════════════════════════════════════════════════
    CinematicHero: {
      label: '🎬 Cinematic Hero',
      fields: {
        eyebrow:            { type: 'text',     label: 'Eyebrow Label' },
        headline:           { type: 'text',     label: 'Main Headline' },
        headlineGold:       { type: 'text',     label: 'Gold Accent Word(s)' },
        subheadline:        { type: 'textarea', label: 'Subheadline' },
        ctaPrimaryLabel:    { type: 'text',     label: 'Primary CTA Label' },
        ctaPrimaryHref:     { type: 'text',     label: 'Primary CTA URL' },
        ctaSecondaryLabel:  { type: 'text',     label: 'Secondary CTA Label' },
        ctaSecondaryHref:   { type: 'text',     label: 'Secondary CTA URL' },
        backgroundImage:    { type: 'text',     label: 'Background Image URL' },
        overlayOpacity:     { type: 'number',   label: 'Overlay Opacity (0–1)', min: 0, max: 1 },
        showCross:          { type: 'radio',    label: 'Show Cross Icon', options: [{ label: 'Yes', value: true }, { label: 'No', value: false }] },
      },
      defaultProps: {
        eyebrow: 'Faith · Community · Excellence',
        headline: 'Property Management',
        headlineGold: 'You Can Trust',
        subheadline: 'Serving southern West Virginia with integrity for over 20 years. Rentals, lease-to-own programs, and full-service property management built on Christian values.',
        ctaPrimaryLabel: 'View Available Properties',
        ctaPrimaryHref: '#properties',
        ctaSecondaryLabel: 'Call (304) 589-5789',
        ctaSecondaryHref: 'tel:3045895789',
        backgroundImage: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1600&q=80',
        overlayOpacity: 0.72,
        showCross: true,
      },
      render: ({ eyebrow, headline, headlineGold, subheadline, ctaPrimaryLabel, ctaPrimaryHref, ctaSecondaryLabel, ctaSecondaryHref, backgroundImage, overlayOpacity, showCross }) => (
        <section
          style={{
            position: 'relative',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            overflow: 'hidden',
            background: T.navy,
          }}
        >
          {/* Parallax BG */}
          {backgroundImage && (
            <div
              style={{
                position: 'absolute', inset: 0,
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transform: 'scale(1.06)',
                willChange: 'transform',
              }}
            />
          )}
          {/* Overlay gradient */}
          <div
            style={{
              position: 'absolute', inset: 0,
              background: `linear-gradient(135deg, rgba(10,22,40,${overlayOpacity}) 0%, rgba(10,22,40,${overlayOpacity * 0.85}) 60%, rgba(139,105,20,0.15) 100%)`,
            }}
          />
          {/* Gold bottom border */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, transparent, ${T.gold}, transparent)` }} />

          {/* Content */}
          <div
            style={{
              position: 'relative',
              maxWidth: 1100,
              margin: '0 auto',
              padding: '140px 40px 120px',
              width: '100%',
            }}
          >
            {/* Cross ornament */}
            {showCross && (
              <div className="fade-up" style={{ color: T.gold, marginBottom: 24, opacity: 0.8 }}>
                <CrossIcon />
              </div>
            )}

            {/* Eyebrow */}
            <span className="section-label fade-up fade-up-d1">{eyebrow}</span>

            {/* Headline */}
            <h1
              className="fade-up fade-up-d2"
              style={{
                fontFamily: T.font,
                fontSize: 'clamp(3rem, 7vw, 6.5rem)',
                fontWeight: 300,
                lineHeight: 1.08,
                color: T.white,
                marginBottom: 24,
                letterSpacing: '-0.01em',
              }}
            >
              {headline}{' '}
              <em className="gold-text" style={{ fontStyle: 'italic' }}>{headlineGold}</em>
            </h1>

            {/* Line accent */}
            <span className="line-accent" style={{ marginBottom: 28 }} />

            {/* Subheadline */}
            <p
              className="fade-up fade-up-d3"
              style={{
                fontFamily: T.fontSans,
                fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
                color: 'rgba(250,249,246,0.78)',
                maxWidth: 580,
                lineHeight: 1.8,
                marginBottom: 48,
                fontWeight: 300,
              }}
            >
              {subheadline}
            </p>

            {/* CTAs */}
            <div className="fade-up fade-up-d4" style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <a href={ctaPrimaryHref} className="btn-gold">{ctaPrimaryLabel} →</a>
              <a href={ctaSecondaryHref} className="btn-ghost">{ctaSecondaryLabel}</a>
            </div>
          </div>

          {/* Scroll indicator */}
          <div
            style={{
              position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
              color: 'rgba(250,249,246,0.4)',
              fontFamily: T.fontSans, fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase',
            }}
          >
            <span>Scroll</span>
            <div
              style={{
                width: 1, height: 48,
                background: `linear-gradient(to bottom, ${T.gold}, transparent)`,
                animation: 'fadeUp 1.5s ease-in-out infinite alternate',
              }}
            />
          </div>
        </section>
      ),
    },

    // ══════════════════════════════════════════════════════
    // 2. TRUST BAR
    // ══════════════════════════════════════════════════════
    TrustBar: {
      label: '✦ Trust Bar',
      fields: {
        items: {
          type: 'textarea',
          label: 'Items JSON [{icon, label}]',
        },
      },
      defaultProps: {
        items: JSON.stringify([
          { icon: '✝', label: 'Faith-Driven Management' },
          { icon: '🏠', label: '20+ Years Experience' },
          { icon: '📍', label: 'Princeton, WV' },
          { icon: '🔑', label: 'Lease-to-Own Programs' },
          { icon: '⭐', label: 'Community-Focused' },
        ]),
      },
      render: ({ items: itemsJson }) => {
        const items = parseJSON<Array<{ icon: string; label: string }>>(itemsJson, []);
        return (
          <div
            style={{
              background: T.navyMid,
              borderTop: `1px solid ${T.border}`,
              borderBottom: `1px solid ${T.border}`,
              padding: '18px 40px',
              overflowX: 'auto',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: 'clamp(24px, 4vw, 64px)',
                flexWrap: 'wrap',
                maxWidth: 1100,
                margin: '0 auto',
              }}
            >
              {items.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    fontFamily: T.fontSans,
                    fontSize: 13,
                    fontWeight: 500,
                    letterSpacing: '0.06em',
                    color: 'rgba(250,249,246,0.7)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <span style={{ color: T.gold, fontSize: 16 }}>{item.icon}</span>
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        );
      },
    },

    // ══════════════════════════════════════════════════════
    // 3. SECTION HEADER (reusable)
    // ══════════════════════════════════════════════════════
    SectionHeader: {
      label: '📌 Section Header',
      fields: {
        eyebrow:       { type: 'text',     label: 'Eyebrow' },
        headline:      { type: 'text',     label: 'Headline' },
        headlineAccent:{ type: 'text',     label: 'Accent word(s)' },
        body:          { type: 'textarea', label: 'Body Copy' },
        align:         { type: 'radio',    label: 'Align', options: [{ label: 'Left', value: 'left' }, { label: 'Center', value: 'center' }] },
        dark:          { type: 'radio',    label: 'Dark BG', options: [{ label: 'Yes', value: true }, { label: 'No', value: false }] },
      },
      defaultProps: {
        eyebrow: 'Our Services',
        headline: 'Everything Your Property',
        headlineAccent: 'Needs',
        body: '',
        align: 'center',
        dark: false,
      },
      render: ({ eyebrow, headline, headlineAccent, body, align, dark }) => (
        <div
          className="fade-up"
          style={{
            textAlign: align,
            padding: '80px 40px 0',
            maxWidth: 760,
            margin: '0 auto',
            color: dark ? T.white : T.navy,
          }}
        >
          <span className="section-label">{eyebrow}</span>
          <div style={{ marginBottom: 8 }} />
          <h2
            style={{
              fontFamily: T.font,
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontWeight: 300,
              lineHeight: 1.12,
              letterSpacing: '-0.01em',
            }}
          >
            {headline}{' '}
            <em className="gold-text" style={{ fontStyle: 'italic' }}>{headlineAccent}</em>
          </h2>
          {body && (
            <p
              style={{
                marginTop: 20,
                fontFamily: T.fontSans,
                fontSize: '1.0625rem',
                color: dark ? 'rgba(250,249,246,0.68)' : T.muted,
                lineHeight: 1.8,
                fontWeight: 300,
              }}
            >{body}</p>
          )}
          <span className="line-accent" style={{ marginTop: 28, ...(align === 'center' ? { margin: '28px auto 0' } : {}) }} />
        </div>
      ),
    },

    // ══════════════════════════════════════════════════════
    // 4. SERVICES GRID
    // ══════════════════════════════════════════════════════
    ServicesGrid: {
      label: '⬛ Services Grid',
      fields: {
        eyebrow:  { type: 'text',     label: 'Eyebrow' },
        headline: { type: 'text',     label: 'Headline' },
        items:    { type: 'textarea', label: 'Items JSON [{icon, title, description}]' },
        dark:     { type: 'radio',    label: 'Dark BG', options: [{ label: 'Yes', value: true }, { label: 'No', value: false }] },
        columns:  { type: 'radio',    label: 'Columns', options: [{ label: '2', value: 2 }, { label: '3', value: 3 }, { label: '4', value: 4 }] },
      },
      defaultProps: {
        eyebrow: 'What We Offer',
        headline: 'Full-Service Property Management',
        dark: true,
        columns: 3,
        items: JSON.stringify([
          { icon: '🏡', title: 'Residential Rentals', description: 'Carefully maintained single-family homes and multi-unit properties across Princeton, Bluefield, and Beckley — ready for immediate occupancy.' },
          { icon: '📝', title: 'Lease Option (Path to Ownership)', description: 'Our exclusive Lease Option Program gives qualified tenants a structured path toward homeownership. Build equity while you rent.' },
          { icon: '🏢', title: 'Executive Short-Term Rentals', description: 'Fully furnished executive accommodations for business travelers, relocations, and extended stays. Premium comfort, flexible terms.' },
          { icon: '📊', title: 'Rent Collection & Bookkeeping', description: 'Automated rent collection, accounts payable processing, and detailed financial reporting. Your cash flow managed professionally.' },
          { icon: '🔧', title: 'Property Maintenance', description: 'Preventive maintenance schedules, rapid repair response, and trusted contractor relationships keep your property value protected.' },
          { icon: '🤝', title: 'We Buy Properties', description: 'Looking to sell? We purchase residential and commercial properties directly — fast, fair, and straightforward. No agent fees.' },
        ]),
      },
      render: ({ eyebrow, headline, items: itemsJson, dark, columns }) => {
        const items = parseJSON<Array<{ icon: string; title: string; description: string }>>(itemsJson, []);
        const bg = dark ? T.navyMid : T.white;
        const cardBg = dark ? T.navyLight : '#f8f7f3';
        const textColor = dark ? T.white : T.navy;

        return (
          <section style={{ background: bg, padding: '100px 40px' }}>
            <div style={{ maxWidth: 1200, margin: '0 auto' }}>
              {/* Header */}
              <div className="fade-up" style={{ textAlign: 'center', marginBottom: 64 }}>
                <span className="section-label">{eyebrow}</span>
                <h2
                  style={{
                    fontFamily: T.font,
                    fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                    fontWeight: 300,
                    color: textColor,
                    marginTop: 8,
                  }}
                >{headline}</h2>
              </div>

              {/* Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(auto-fill, minmax(${columns === 4 ? '240px' : columns === 3 ? '300px' : '380px'}, 1fr))`,
                  gap: 24,
                }}
              >
                {items.map((item, i) => (
                  <div
                    key={i}
                    className="card-lift fade-up"
                    style={{
                      animationDelay: `${i * 0.07}s`,
                      background: cardBg,
                      borderRadius: T.radiusLg,
                      padding: '36px 32px',
                      border: `1px solid ${T.border}`,
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    {/* Gold top border accent */}
                    <div
                      style={{
                        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                        background: `linear-gradient(90deg, ${T.gold}, transparent)`,
                        opacity: 0,
                        transition: 'opacity 0.3s',
                      }}
                      className="card-top-border"
                    />
                    <div style={{ fontSize: 36, marginBottom: 18 }}>{item.icon}</div>
                    <h3
                      style={{
                        fontFamily: T.font,
                        fontSize: '1.35rem',
                        fontWeight: 600,
                        color: textColor,
                        marginBottom: 12,
                        letterSpacing: '0.01em',
                      }}
                    >{item.title}</h3>
                    <p
                      style={{
                        fontFamily: T.fontSans,
                        fontSize: '0.9375rem',
                        color: dark ? 'rgba(250,249,246,0.62)' : T.muted,
                        lineHeight: 1.75,
                        fontWeight: 300,
                      }}
                    >{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      },
    },

    // ══════════════════════════════════════════════════════
    // 5. PROPERTY SHOWCASE
    // ══════════════════════════════════════════════════════
    PropertyShowcase: {
      label: '🏠 Property Showcase',
      fields: {
        eyebrow:     { type: 'text',     label: 'Eyebrow' },
        headline:    { type: 'text',     label: 'Headline' },
        subheadline: { type: 'textarea', label: 'Subheadline' },
        properties:  { type: 'textarea', label: 'Properties JSON [{image, label, address, beds, baths, price, tag}]' },
        ctaLabel:    { type: 'text',     label: 'CTA Label' },
        ctaHref:     { type: 'text',     label: 'CTA URL' },
      },
      defaultProps: {
        eyebrow: 'Available Now',
        headline: 'Find Your Next Home',
        subheadline: 'Carefully maintained properties across Mercer County. Every home meets our Christian standards of quality and care.',
        ctaLabel: 'View All Properties',
        ctaHref: 'https://christianpropertymanagement.com',
        properties: JSON.stringify([
          { image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=80', label: 'Available Now', address: 'Princeton, WV 24740', beds: 3, baths: 2, price: '$950/mo', tag: 'For Rent' },
          { image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80', label: 'Lease-to-Own', address: 'Bluefield, WV 24701', beds: 4, baths: 2, price: '$1,150/mo', tag: 'Lease Option' },
          { image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80', label: 'Executive Suite', address: 'Beckley, WV 25801', beds: 2, baths: 1, price: '$1,400/mo', tag: 'Short-Term' },
        ]),
      },
      render: ({ eyebrow, headline, subheadline, properties: propsJson, ctaLabel, ctaHref }) => {
        const props = parseJSON<Array<{ image: string; label: string; address: string; beds: number; baths: number; price: string; tag: string }>>(propsJson, []);
        return (
          <section style={{ background: T.white, padding: '100px 40px' }} id="properties">
            <div style={{ maxWidth: 1200, margin: '0 auto' }}>
              {/* Header */}
              <div className="fade-up" style={{ marginBottom: 56 }}>
                <span className="section-label">{eyebrow}</span>
                <h2
                  style={{
                    fontFamily: T.font,
                    fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                    fontWeight: 300,
                    color: T.navy,
                    marginTop: 8,
                    marginBottom: 16,
                  }}
                >{headline}</h2>
                <p style={{ fontFamily: T.fontSans, fontSize: '1rem', color: T.muted, maxWidth: 540, lineHeight: 1.8, fontWeight: 300 }}>{subheadline}</p>
              </div>

              {/* Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 28 }}>
                {props.map((p, i) => (
                  <div
                    key={i}
                    className="card-lift fade-up"
                    style={{
                      animationDelay: `${i * 0.1}s`,
                      background: T.white,
                      borderRadius: T.radiusLg,
                      overflow: 'hidden',
                      border: `1px solid rgba(10,22,40,0.08)`,
                      boxShadow: '0 4px 24px rgba(10,22,40,0.06)',
                    }}
                  >
                    {/* Image */}
                    <div style={{ position: 'relative', aspectRatio: '16/10', overflow: 'hidden' }}>
                      <img
                        src={p.image}
                        alt={p.address}
                        loading="lazy"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease' }}
                      />
                      {/* Tag */}
                      <span
                        style={{
                          position: 'absolute', top: 16, left: 16,
                          background: T.gold,
                          color: T.navy,
                          fontFamily: T.fontSans,
                          fontSize: 11,
                          fontWeight: 700,
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          padding: '5px 12px',
                          borderRadius: 4,
                        }}
                      >{p.tag}</span>
                    </div>

                    {/* Info */}
                    <div style={{ padding: '24px 28px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                        <div>
                          <p style={{ fontFamily: T.font, fontSize: '1.2rem', fontWeight: 600, color: T.navy, marginBottom: 4 }}>{p.address}</p>
                          <p style={{ fontFamily: T.fontSans, fontSize: 13, color: T.muted }}>{p.beds} bed · {p.baths} bath</p>
                        </div>
                        <p
                          style={{
                            fontFamily: T.font,
                            fontSize: '1.4rem',
                            fontWeight: 600,
                            color: T.gold,
                          }}
                        >{p.price}</p>
                      </div>
                      <a
                        href={ctaHref}
                        style={{
                          display: 'inline-block',
                          marginTop: 8,
                          fontFamily: T.fontSans,
                          fontSize: 13,
                          fontWeight: 600,
                          color: T.navyLight,
                          letterSpacing: '0.05em',
                          textDecoration: 'none',
                          borderBottom: `1.5px solid ${T.gold}`,
                          paddingBottom: 2,
                        }}
                      >View Details →</a>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div style={{ textAlign: 'center', marginTop: 56 }}>
                <a href={ctaHref} className="btn-gold" style={{ color: T.navy }}>{ctaLabel} →</a>
              </div>
            </div>
          </section>
        );
      },
    },

    // ══════════════════════════════════════════════════════
    // 6. LEASE PATHWAY (LEASE-TO-OWN PROGRAM)
    // ══════════════════════════════════════════════════════
    LeasePathway: {
      label: '🔑 Lease Pathway',
      fields: {
        eyebrow:  { type: 'text',     label: 'Eyebrow' },
        headline: { type: 'text',     label: 'Headline' },
        body:     { type: 'textarea', label: 'Body' },
        steps:    { type: 'textarea', label: 'Steps JSON [{number, title, description}]' },
        ctaLabel: { type: 'text',     label: 'CTA Label' },
        ctaHref:  { type: 'text',     label: 'CTA URL' },
        imageUrl: { type: 'text',     label: 'Side Image URL' },
      },
      defaultProps: {
        eyebrow: 'Lease Option Program',
        headline: 'Your Path to Home Ownership',
        body: 'We believe everyone deserves a place to call home. Our Lease Option Path to Home Ownership Program is designed for families who want to own but need time to build toward that goal.',
        ctaLabel: 'Learn About the Program',
        ctaHref: 'tel:3045895789',
        imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
        steps: JSON.stringify([
          { number: '01', title: 'Apply & Qualify', description: 'Complete our straightforward application. We review your situation holistically — not just credit scores.' },
          { number: '02', title: 'Choose Your Home', description: 'Select from our lease-option eligible properties. Tour at your convenience.' },
          { number: '03', title: 'Move In & Build Equity', description: 'A portion of every monthly payment credits toward your future purchase. Live in your home while building toward owning it.' },
          { number: '04', title: 'Exercise Your Option', description: 'When you\'re ready, exercise your purchase option at the agreed price. We guide you through the closing process.' },
        ]),
      },
      render: ({ eyebrow, headline, body, steps: stepsJson, ctaLabel, ctaHref, imageUrl }) => {
        const steps = parseJSON<Array<{ number: string; title: string; description: string }>>(stepsJson, []);
        return (
          <section style={{ background: T.navy, padding: '100px 40px', position: 'relative', overflow: 'hidden' }}>
            {/* Background cross watermark */}
            <div
              style={{
                position: 'absolute', right: -80, top: '50%', transform: 'translateY(-50%)',
                opacity: 0.04, pointerEvents: 'none',
              }}
            >
              <CrossIcon />
            </div>

            <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
              {/* Left: content */}
              <div className="fade-up">
                <span className="section-label">{eyebrow}</span>
                <h2
                  style={{
                    fontFamily: T.font,
                    fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                    fontWeight: 300,
                    color: T.white,
                    marginTop: 8,
                    marginBottom: 20,
                    lineHeight: 1.15,
                  }}
                >{headline}</h2>
                <p
                  style={{
                    fontFamily: T.fontSans,
                    fontSize: '1rem',
                    color: 'rgba(250,249,246,0.65)',
                    lineHeight: 1.8,
                    marginBottom: 40,
                    fontWeight: 300,
                  }}
                >{body}</p>

                {/* Steps */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 28, marginBottom: 44 }}>
                  {steps.map((step, i) => (
                    <div key={i} style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                      <div
                        style={{
                          flexShrink: 0,
                          width: 48, height: 48,
                          borderRadius: '50%',
                          border: `1.5px solid ${T.gold}`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontFamily: T.font,
                          fontSize: '0.875rem',
                          color: T.gold,
                          fontWeight: 600,
                        }}
                      >{step.number}</div>
                      <div>
                        <h4 style={{ fontFamily: T.font, fontSize: '1.15rem', fontWeight: 600, color: T.white, marginBottom: 6 }}>{step.title}</h4>
                        <p style={{ fontFamily: T.fontSans, fontSize: '0.9rem', color: 'rgba(250,249,246,0.58)', lineHeight: 1.7, fontWeight: 300 }}>{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <a href={ctaHref} className="btn-gold">{ctaLabel} →</a>
              </div>

              {/* Right: image */}
              {imageUrl && (
                <div
                  className="fade-up fade-up-d2"
                  style={{
                    borderRadius: T.radiusLg,
                    overflow: 'hidden',
                    aspectRatio: '4/5',
                    position: 'relative',
                    border: `1px solid ${T.border}`,
                  }}
                >
                  <img
                    src={imageUrl}
                    alt="Lease to own property"
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                  {/* Gold overlay tint */}
                  <div
                    style={{
                      position: 'absolute', inset: 0,
                      background: `linear-gradient(to top, rgba(10,22,40,0.5) 0%, transparent 50%)`,
                    }}
                  />
                  {/* Badge */}
                  <div
                    style={{
                      position: 'absolute', bottom: 24, left: 24,
                      background: T.gold,
                      color: T.navy,
                      fontFamily: T.fontSans,
                      fontSize: 12,
                      fontWeight: 700,
                      padding: '8px 16px',
                      borderRadius: 6,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                    }}
                  >✝ Path to Ownership</div>
                </div>
              )}
            </div>
          </section>
        );
      },
    },

    // ══════════════════════════════════════════════════════
    // 7. STATS COUNTER
    // ══════════════════════════════════════════════════════
    StatsCounter: {
      label: '📈 Stats Counter',
      fields: {
        eyebrow: { type: 'text', label: 'Eyebrow' },
        stats:   { type: 'textarea', label: 'Stats JSON [{value, suffix, label}]' },
        dark:    { type: 'radio', label: 'Dark BG', options: [{ label: 'Yes', value: true }, { label: 'No', value: false }] },
      },
      defaultProps: {
        eyebrow: 'By The Numbers',
        dark: false,
        stats: JSON.stringify([
          { value: '20',  suffix: '+', label: 'Years of Service' },
          { value: '200', suffix: '+', label: 'Properties Managed' },
          { value: '500', suffix: '+', label: 'Families Housed' },
          { value: '98',  suffix: '%', label: 'Tenant Satisfaction' },
        ]),
      },
      render: ({ eyebrow, stats: statsJson, dark }) => {
        const stats = parseJSON<Array<{ value: string; suffix: string; label: string }>>(statsJson, []);
        const bg = dark ? T.navyMid : '#f3f0e8';
        const textColor = dark ? T.white : T.navy;

        return (
          <section style={{ background: bg, padding: '80px 40px', borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}` }}>
            <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
              <div className="ornament" style={{ marginBottom: 48 }}>
                <CrossIcon />
              </div>
              {eyebrow && <span className="section-label" style={{ display: 'block', marginBottom: 48 }}>{eyebrow}</span>}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(auto-fill, minmax(200px, 1fr))`,
                  gap: 40,
                }}
              >
                {stats.map((s, i) => (
                  <div key={i} className="fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                    <div
                      style={{
                        fontFamily: T.font,
                        fontSize: 'clamp(3rem, 6vw, 4.5rem)',
                        fontWeight: 300,
                        lineHeight: 1,
                        marginBottom: 8,
                      }}
                    >
                      <span className="gold-text">{s.value}{s.suffix}</span>
                    </div>
                    <p
                      style={{
                        fontFamily: T.fontSans,
                        fontSize: 13,
                        fontWeight: 500,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: dark ? 'rgba(250,249,246,0.55)' : T.muted,
                      }}
                    >{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      },
    },

    // ══════════════════════════════════════════════════════
    // 8. TESTIMONIALS
    // ══════════════════════════════════════════════════════
    Testimonials: {
      label: '💬 Testimonials',
      fields: {
        eyebrow: { type: 'text',     label: 'Eyebrow' },
        headline: { type: 'text',    label: 'Headline' },
        items:    { type: 'textarea', label: 'Items JSON [{quote, author, role, avatar}]' },
        dark:     { type: 'radio',   label: 'Dark BG', options: [{ label: 'Yes', value: true }, { label: 'No', value: false }] },
      },
      defaultProps: {
        eyebrow: 'Testimonials',
        headline: 'What Our Tenants Say',
        dark: true,
        items: JSON.stringify([
          { quote: 'Christian Property Management treated us like family from day one. The lease-to-own program changed our lives — we now own the home we started renting five years ago.', author: 'Marcus & Latoya J.', role: 'Princeton, WV', avatar: '' },
          { quote: 'Response time on maintenance is unmatched. They genuinely care about the properties and about us as tenants. You can feel the difference when a company operates on Christian values.', author: 'Sandra K.', role: 'Bluefield, WV', avatar: '' },
          { quote: 'I needed short-term executive housing during my assignment in southern WV. The property was spotless, fully equipped, and the team was professional every step of the way.', author: 'James T.', role: 'Corporate Tenant', avatar: '' },
        ]),
      },
      render: ({ eyebrow, headline, items: itemsJson, dark }) => {
        const items = parseJSON<Array<{ quote: string; author: string; role: string; avatar: string }>>(itemsJson, []);
        const bg = dark ? T.navy : T.white;
        const textColor = dark ? T.white : T.navy;

        return (
          <section style={{ background: bg, padding: '100px 40px' }}>
            <div style={{ maxWidth: 1200, margin: '0 auto' }}>
              <div className="fade-up" style={{ textAlign: 'center', marginBottom: 64 }}>
                <span className="section-label">{eyebrow}</span>
                <h2
                  style={{
                    fontFamily: T.font,
                    fontSize: 'clamp(2rem, 4vw, 3rem)',
                    fontWeight: 300,
                    color: textColor,
                    marginTop: 8,
                  }}
                >{headline}</h2>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 28 }}>
                {items.map((item, i) => (
                  <div
                    key={i}
                    className="card-lift fade-up"
                    style={{
                      animationDelay: `${i * 0.1}s`,
                      background: dark ? T.navyMid : '#f8f7f3',
                      borderRadius: T.radiusLg,
                      padding: '36px 32px',
                      border: `1px solid ${T.border}`,
                      position: 'relative',
                    }}
                  >
                    {/* Gold quote mark */}
                    <div
                      style={{
                        fontFamily: T.font,
                        fontSize: '5rem',
                        lineHeight: 1,
                        color: T.gold,
                        opacity: 0.35,
                        position: 'absolute',
                        top: 16,
                        left: 28,
                        userSelect: 'none',
                      }}
                    >“</div>
                    <p
                      style={{
                        fontFamily: T.font,
                        fontSize: '1.1rem',
                        fontWeight: 400,
                        fontStyle: 'italic',
                        color: dark ? 'rgba(250,249,246,0.82)' : T.navy,
                        lineHeight: 1.8,
                        marginBottom: 28,
                        paddingTop: 24,
                        position: 'relative',
                      }}
                    >{item.quote}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                      <div
                        style={{
                          width: 42, height: 42,
                          borderRadius: '50%',
                          background: `linear-gradient(135deg, ${T.gold}, ${T.goldDark})`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontFamily: T.font,
                          fontSize: '1.1rem',
                          color: T.navy,
                          fontWeight: 700,
                          flexShrink: 0,
                        }}
                      >{item.author.charAt(0)}</div>
                      <div>
                        <p style={{ fontFamily: T.fontSans, fontSize: 14, fontWeight: 600, color: textColor }}>{item.author}</p>
                        <p style={{ fontFamily: T.fontSans, fontSize: 12, color: T.muted, marginTop: 2 }}>{item.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      },
    },

    // ══════════════════════════════════════════════════════
    // 9. TEAM SECTION
    // ══════════════════════════════════════════════════════
    TeamSection: {
      label: '👥 Team Section',
      fields: {
        eyebrow: { type: 'text',     label: 'Eyebrow' },
        headline: { type: 'text',    label: 'Headline' },
        body:     { type: 'textarea', label: 'Body Copy' },
        members:  { type: 'textarea', label: 'Members JSON [{name, role, bio, image}]' },
      },
      defaultProps: {
        eyebrow: 'Our Team',
        headline: 'People Who Care About Your Home',
        body: 'Located at 500 Thorn Street, Princeton, WV — our team is available in-person, by phone, or text. We operate with transparency and treat every property as if it were our own.',
        members: JSON.stringify([
          { name: 'Christian Management Corp', role: 'Principal Management Office', bio: 'Serving Mercer County and surrounding areas since 2004. Specialising in residential management, lease options, and community development.', image: '' },
        ]),
      },
      render: ({ eyebrow, headline, body, members: membersJson }) => {
        const members = parseJSON<Array<{ name: string; role: string; bio: string; image: string }>>(membersJson, []);
        return (
          <section style={{ background: '#f8f7f3', padding: '100px 40px' }}>
            <div style={{ maxWidth: 1100, margin: '0 auto' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>
                {/* Left */}
                <div className="fade-up">
                  <span className="section-label">{eyebrow}</span>
                  <h2
                    style={{
                      fontFamily: T.font,
                      fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                      fontWeight: 300,
                      color: T.navy,
                      marginTop: 8,
                      marginBottom: 20,
                      lineHeight: 1.15,
                    }}
                  >{headline}</h2>
                  <span className="line-accent" style={{ marginBottom: 28 }} />
                  <p
                    style={{
                      fontFamily: T.fontSans,
                      fontSize: '1rem',
                      color: T.muted,
                      lineHeight: 1.8,
                      fontWeight: 300,
                    }}
                  >{body}</p>

                  {/* Contact info */}
                  <div style={{ marginTop: 36, display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {[
                      { icon: '📍', text: '500 Thorn Street, Princeton, WV 24740' },
                      { icon: '📞', text: '(304) 589-5789' },
                      { icon: '✉️', text: 'PropertyManager@ChristianMgtCorp.Com' },
                    ].map((c, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, fontFamily: T.fontSans, fontSize: 14, color: T.navy }}>
                        <span style={{ fontSize: 16 }}>{c.icon}</span>{c.text}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: members */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                  {members.map((m, i) => (
                    <div
                      key={i}
                      className="card-lift fade-up"
                      style={{
                        animationDelay: `${i * 0.1}s`,
                        background: T.white,
                        borderRadius: T.radiusLg,
                        padding: '32px',
                        border: `1px solid rgba(10,22,40,0.08)`,
                        boxShadow: '0 4px 16px rgba(10,22,40,0.04)',
                      }}
                    >
                      {m.image && (
                        <img
                          src={m.image}
                          alt={m.name}
                          loading="lazy"
                          style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover', marginBottom: 16, border: `2px solid ${T.gold}` }}
                        />
                      )}
                      <h3 style={{ fontFamily: T.font, fontSize: '1.3rem', fontWeight: 600, color: T.navy, marginBottom: 4 }}>{m.name}</h3>
                      <p style={{ fontFamily: T.fontSans, fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: T.gold, marginBottom: 12 }}>{m.role}</p>
                      <p style={{ fontFamily: T.fontSans, fontSize: '0.9rem', color: T.muted, lineHeight: 1.75, fontWeight: 300 }}>{m.bio}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        );
      },
    },

    // ══════════════════════════════════════════════════════
    // 10. FAQ ACCORDION
    // ══════════════════════════════════════════════════════
    FAQAccordion: {
      label: '❓ FAQ Accordion',
      fields: {
        eyebrow: { type: 'text',     label: 'Eyebrow' },
        headline: { type: 'text',    label: 'Headline' },
        items:    { type: 'textarea', label: 'Items JSON [{question, answer}]' },
        dark:     { type: 'radio',   label: 'Dark BG', options: [{ label: 'Yes', value: true }, { label: 'No', value: false }] },
      },
      defaultProps: {
        eyebrow: 'FAQ',
        headline: 'Common Questions',
        dark: false,
        items: JSON.stringify([
          { question: 'How do I apply for a rental?', answer: 'You can apply online through the listing page, stop by our office at 500 Thorn Street in Princeton, or pick up a paper application available 24/7 on our office door. You can also text or email your documentation.' },
          { question: 'What is the Lease Option Program?', answer: 'Our Lease Option (Path to Home Ownership) Program lets qualified tenants rent a property with the option to purchase it at an agreed future price. A portion of monthly payments is credited toward the purchase. Contact us for full qualification details.' },
          { question: 'Do you offer short-term rentals?', answer: 'Yes. We offer fully furnished Executive Short-Term Rentals ideal for business travelers, contractors, and families in transition. Flexible terms available — call or text (304) 589-5789.' },
          { question: 'How quickly are maintenance requests handled?', answer: 'We prioritize maintenance and emergency repairs. Routine requests are typically addressed within 2–5 business days. Emergency maintenance is available around the clock.' },
          { question: 'Do you buy properties?', answer: 'Yes. We purchase residential and commercial properties directly in southern West Virginia. If you are looking to sell, contact us for a fair, obligation-free offer.' },
          { question: 'Where is your office?', answer: 'Our main office is located at 500 Thorn Street, Princeton, WV 24740. Applications and documentation can be dropped in our secure drop box after hours.' },
        ]),
      },
      render: ({ eyebrow, headline, items: itemsJson, dark }) => {
        const items = parseJSON<Array<{ question: string; answer: string }>>(itemsJson, []);
        const bg = dark ? T.navyMid : T.white;
        const textColor = dark ? T.white : T.navy;

        return (
          <section style={{ background: bg, padding: '100px 40px' }}>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
              <div className="fade-up" style={{ textAlign: 'center', marginBottom: 56 }}>
                <span className="section-label">{eyebrow}</span>
                <h2
                  style={{
                    fontFamily: T.font,
                    fontSize: 'clamp(2rem, 4vw, 3rem)',
                    fontWeight: 300,
                    color: textColor,
                    marginTop: 8,
                  }}
                >{headline}</h2>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {items.map((item, i) => (
                  <details
                    key={i}
                    style={{
                      borderBottom: `1px solid ${dark ? 'rgba(201,168,76,0.15)' : 'rgba(10,22,40,0.08)'}`,
                    }}
                  >
                    <summary
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '22px 0',
                        cursor: 'pointer',
                        listStyle: 'none',
                        fontFamily: T.font,
                        fontSize: '1.15rem',
                        fontWeight: 600,
                        color: textColor,
                        gap: 16,
                      }}
                    >
                      {item.question}
                      <span style={{ color: T.gold, fontSize: 20, flexShrink: 0, fontFamily: 'sans-serif', fontWeight: 300 }}>+</span>
                    </summary>
                    <p
                      style={{
                        fontFamily: T.fontSans,
                        fontSize: '0.9375rem',
                        color: dark ? 'rgba(250,249,246,0.62)' : T.muted,
                        lineHeight: 1.8,
                        paddingBottom: 24,
                        fontWeight: 300,
                      }}
                    >{item.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        );
      },
    },

    // ══════════════════════════════════════════════════════
    // 11. CTA BANNER
    // ══════════════════════════════════════════════════════
    CTABanner: {
      label: '📣 CTA Banner',
      fields: {
        headline:          { type: 'text',     label: 'Headline' },
        headlineGold:      { type: 'text',     label: 'Gold Word(s)' },
        body:              { type: 'textarea', label: 'Body Copy' },
        ctaPrimaryLabel:   { type: 'text',     label: 'Primary CTA Label' },
        ctaPrimaryHref:    { type: 'text',     label: 'Primary CTA URL' },
        ctaSecondaryLabel: { type: 'text',     label: 'Secondary CTA Label' },
        ctaSecondaryHref:  { type: 'text',     label: 'Secondary CTA URL' },
        backgroundImage:   { type: 'text',     label: 'Background Image URL' },
        phone:             { type: 'text',     label: 'Phone Number (display)' },
      },
      defaultProps: {
        headline: 'Ready to Find Your',
        headlineGold: 'New Home?',
        body: 'Call or text us today. Applications available 24/7 at our Princeton office — or apply online in minutes.',
        ctaPrimaryLabel: 'Apply Now',
        ctaPrimaryHref: 'https://christianpropertymanagement.com',
        ctaSecondaryLabel: 'Schedule a Viewing',
        ctaSecondaryHref: 'tel:3045895789',
        backgroundImage: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=1400&q=80',
        phone: '(304) 589-5789',
      },
      render: ({ headline, headlineGold, body, ctaPrimaryLabel, ctaPrimaryHref, ctaSecondaryLabel, ctaSecondaryHref, backgroundImage, phone }) => (
        <section
          style={{
            position: 'relative',
            padding: '120px 40px',
            overflow: 'hidden',
            background: T.navyMid,
            textAlign: 'center',
          }}
        >
          {backgroundImage && (
            <div
              style={{
                position: 'absolute', inset: 0,
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 0.15,
              }}
            />
          )}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent, rgba(10,22,40,0.4))' }} />

          <div style={{ position: 'relative', maxWidth: 720, margin: '0 auto' }}>
            <div className="ornament" style={{ marginBottom: 32 }}>
              <CrossIcon />
            </div>

            <h2
              className="fade-up"
              style={{
                fontFamily: T.font,
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                fontWeight: 300,
                color: T.white,
                lineHeight: 1.1,
                marginBottom: 24,
              }}
            >
              {headline}{' '}
              <em className="gold-text" style={{ fontStyle: 'italic' }}>{headlineGold}</em>
            </h2>

            <p
              className="fade-up fade-up-d1"
              style={{
                fontFamily: T.fontSans,
                fontSize: '1.0625rem',
                color: 'rgba(250,249,246,0.68)',
                lineHeight: 1.8,
                marginBottom: 16,
                fontWeight: 300,
              }}
            >{body}</p>

            {phone && (
              <a
                href={`tel:${phone.replace(/\D/g, '')}`}
                className="fade-up fade-up-d2"
                style={{
                  display: 'block',
                  fontFamily: T.font,
                  fontSize: '2rem',
                  color: T.gold,
                  textDecoration: 'none',
                  marginBottom: 40,
                  letterSpacing: '0.02em',
                }}
              >{phone}</a>
            )}

            <div className="fade-up fade-up-d3" style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href={ctaPrimaryHref} className="btn-gold">{ctaPrimaryLabel} →</a>
              <a href={ctaSecondaryHref} className="btn-ghost">{ctaSecondaryLabel}</a>
            </div>
          </div>
        </section>
      ),
    },

    // ══════════════════════════════════════════════════════
    // 12. FOOTER BLOCK
    // ══════════════════════════════════════════════════════
    FooterBlock: {
      label: '🦶 Footer',
      fields: {
        logo:      { type: 'text',     label: 'Logo / Brand Name' },
        tagline:   { type: 'text',     label: 'Tagline' },
        address:   { type: 'text',     label: 'Address' },
        phone:     { type: 'text',     label: 'Phone' },
        email:     { type: 'text',     label: 'Email' },
        copyright: { type: 'text',     label: 'Copyright' },
        links:     { type: 'textarea', label: 'Links JSON [{label, href}]' },
      },
      defaultProps: {
        logo: 'Christian Property Management',
        tagline: 'We don't just rent properties — we build communities.',
        address: '500 Thorn Street, Princeton, WV 24740',
        phone: '(304) 589-5789',
        email: 'PropertyManager@ChristianMgtCorp.Com',
        copyright: `© ${new Date().getFullYear()} Christian Management Corporation. All rights reserved.`,
        links: JSON.stringify([
          { label: 'Available Properties', href: '#properties' },
          { label: 'Lease Option Program', href: '#lease' },
          { label: 'Apply Now', href: 'https://christianpropertymanagement.com' },
          { label: 'Contact Us', href: 'tel:3045895789' },
        ]),
      },
      render: ({ logo, tagline, address, phone, email, copyright, links: linksJson }) => {
        const links = parseJSON<Array<{ label: string; href: string }>>(linksJson, []);
        return (
          <footer
            style={{
              background: T.navy,
              borderTop: `1px solid ${T.border}`,
              padding: '64px 40px 32px',
            }}
          >
            <div
              style={{
                maxWidth: 1100,
                margin: '0 auto',
                display: 'grid',
                gridTemplateColumns: '2fr 1fr 1fr',
                gap: 48,
                marginBottom: 48,
              }}
            >
              {/* Brand */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                  <span style={{ color: T.gold }}><CrossIcon /></span>
                  <span
                    style={{
                      fontFamily: T.font,
                      fontSize: '1.25rem',
                      fontWeight: 600,
                      color: T.white,
                      letterSpacing: '0.01em',
                    }}
                  >{logo}</span>
                </div>
                <p
                  style={{
                    fontFamily: T.font,
                    fontSize: '1rem',
                    fontStyle: 'italic',
                    color: 'rgba(250,249,246,0.5)',
                    maxWidth: 320,
                    lineHeight: 1.7,
                  }}
                >{tagline}</p>
              </div>

              {/* Contact */}
              <div>
                <h4
                  style={{
                    fontFamily: T.fontSans,
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: T.gold,
                    marginBottom: 20,
                  }}
                >Contact</h4>
                {[address, phone, email].map((item, i) => (
                  <p
                    key={i}
                    style={{
                      fontFamily: T.fontSans,
                      fontSize: 13,
                      color: 'rgba(250,249,246,0.55)',
                      marginBottom: 8,
                      lineHeight: 1.6,
                    }}
                  >{item}</p>
                ))}
              </div>

              {/* Nav */}
              <div>
                <h4
                  style={{
                    fontFamily: T.fontSans,
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: T.gold,
                    marginBottom: 20,
                  }}
                >Quick Links</h4>
                {links.map((link, i) => (
                  <a
                    key={i}
                    href={link.href}
                    style={{
                      display: 'block',
                      fontFamily: T.fontSans,
                      fontSize: 13,
                      color: 'rgba(250,249,246,0.55)',
                      textDecoration: 'none',
                      marginBottom: 8,
                      transition: 'color 0.2s',
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.color = T.gold)}
                    onMouseOut={(e) => (e.currentTarget.style.color = 'rgba(250,249,246,0.55)')}
                  >{link.label}</a>
                ))}
              </div>
            </div>

            {/* Bottom bar */}
            <div
              style={{
                borderTop: `1px solid ${T.border}`,
                paddingTop: 24,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 16,
              }}
            >
              <p style={{ fontFamily: T.fontSans, fontSize: 12, color: 'rgba(250,249,246,0.35)' }}>{copyright}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: T.gold, opacity: 0.6, fontSize: 13, fontFamily: T.font, fontStyle: 'italic' }}>
                <CrossIcon />
                <span>Built on Faith</span>
              </div>
            </div>
          </footer>
        );
      },
    },
  },
};

export default cpmConfig;

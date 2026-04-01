/**
 * @file puck.config.tsx
 * @description Cerison Enterprise Puck Configuration v2
 * Plugins: HeadingAnalyzer + emotionCache
 * Components: Hero, Section, Grid, Columns, Card, Text, Button,
 *             Image, Video, Testimonial, Stats, FAQ, CTA, Spacer,
 *             Divider, HTML, Form, Badge, Alert
 * @version 2.0.0
 */

import type { Config } from '@measured/puck';
import { HeadingAnalyzer }  from '@measured/puck-plugin-heading-analyzer';
import { emotionCache }     from '@measured/puck-plugin-emotion-cache';
import '@measured/puck-plugin-heading-analyzer/dist/index.css';

// ============================================================
// Component types
// ============================================================

type HeroProps        = { title: string; subtitle: string; ctaLabel: string; ctaHref: string; bgColor: string; textColor: string; align: 'left'|'center'|'right'; minHeight: string; };
type SectionProps     = { padding: string; bgColor: string; maxWidth: string; };
type GridProps        = { columns: number; gap: string; };
type ColumnsProps     = { distribution: '1/2+1/2'|'1/3+2/3'|'2/3+1/3'|'1/3+1/3+1/3'; gap: string; };
type CardProps        = { title: string; description: string; imageUrl: string; ctaLabel: string; ctaHref: string; variant: 'default'|'elevated'|'outlined'; };
type TextProps        = { text: string; tag: 'p'|'h1'|'h2'|'h3'|'h4'|'h5'|'h6'; size: string; color: string; align: 'left'|'center'|'right'; weight: '400'|'500'|'600'|'700'|'800'; lineHeight: string; };
type ButtonProps      = { label: string; href: string; variant: 'primary'|'secondary'|'ghost'|'destructive'; size: 'sm'|'md'|'lg'; openInNewTab: boolean; fullWidth: boolean; };
type ImageProps       = { src: string; alt: string; width: string; height: string; objectFit: 'cover'|'contain'|'fill'; borderRadius: string; caption: string; };
type VideoProps       = { src: string; autoPlay: boolean; controls: boolean; loop: boolean; muted: boolean; aspectRatio: '16/9'|'4/3'|'1/1'|'9/16'; };
type TestimonialProps = { quote: string; author: string; role: string; avatarUrl: string; rating: number; };
type StatsProps       = { items: string; columns: number; };
type FAQProps         = { title: string; items: string; };
type CTAProps         = { title: string; subtitle: string; ctaLabel: string; ctaHref: string; bgColor: string; };
type SpacerProps      = { height: string; };
type DividerProps     = { color: string; thickness: string; margin: string; style: 'solid'|'dashed'|'dotted'; };
type HTMLProps        = { code: string; };
type FormProps        = { title: string; submitLabel: string; action: string; fields: string; successMessage: string; };
type BadgeProps       = { label: string; color: string; bgColor: string; };
type AlertProps       = { message: string; type: 'info'|'success'|'warning'|'error'; dismissible: boolean; };

type Components = {
  Hero: HeroProps; Section: SectionProps; Grid: GridProps; Columns: ColumnsProps;
  Card: CardProps; Text: TextProps; Button: ButtonProps; Image: ImageProps;
  Video: VideoProps; Testimonial: TestimonialProps; Stats: StatsProps;
  FAQ: FAQProps; CTA: CTAProps; Spacer: SpacerProps; Divider: DividerProps;
  HTML: HTMLProps; Form: FormProps; Badge: BadgeProps; Alert: AlertProps;
};

// ============================================================
// Shared style helpers
// ============================================================

const PRIMARY = '#01696f';
const btnStyle = (variant: ButtonProps['variant'], size: ButtonProps['size'], fullWidth: boolean) => {
  const pad  = { sm: '8px 18px',  md: '12px 28px', lg: '16px 36px'  }[size];
  const fs   = { sm: 13, md: 15,  lg: 17 }[size];
  const base = { padding: pad, fontSize: fs, fontWeight: 600, borderRadius: 8, display: fullWidth ? 'block' : 'inline-block', textAlign: 'center' as const, textDecoration: 'none', cursor: 'pointer', border: 'none', width: fullWidth ? '100%' : undefined };
  const v    = {
    primary:     { background: PRIMARY,       color: '#fff'    },
    secondary:   { background: '#e8f5f5',      color: PRIMARY   },
    ghost:       { background: 'transparent',  color: PRIMARY,   border: `1.5px solid ${PRIMARY}` } as React.CSSProperties,
    destructive: { background: '#a12c7b',      color: '#fff'    },
  }[variant];
  return { ...base, ...v };
};

// ============================================================
// Config
// ============================================================

export const config: Config<Components> = {
  plugins: [HeadingAnalyzer, emotionCache],

  root: {
    fields: {
      title:       { type: 'text',     label: 'Page Title' },
      description: { type: 'textarea', label: 'Meta Description' },
      ogImage:     { type: 'text',     label: 'OG Image URL' },
      lang: {
        type: 'select', label: 'Language',
        options: [{ label: 'English', value: 'en' }, { label: 'Spanish', value: 'es' }, { label: 'French', value: 'fr' }],
      },
    },
    defaultProps: { title: 'Untitled Page', description: '', ogImage: '', lang: 'en' },
    render: ({ children, title }) => (
      <html lang="en"><head><title>{title}</title></head><body style={{ margin: 0, fontFamily: 'system-ui, sans-serif' }}>{children}</body></html>
    ),
  },

  components: {
    // ── Hero ────────────────────────────────────────────────────────────────
    Hero: {
      label: '\uD83E\uDDB8 Hero',
      fields: {
        title:     { type: 'text',     label: 'Headline' },
        subtitle:  { type: 'textarea', label: 'Subheadline' },
        ctaLabel:  { type: 'text',     label: 'CTA Label' },
        ctaHref:   { type: 'text',     label: 'CTA URL' },
        bgColor:   { type: 'text',     label: 'Background Color' },
        textColor: { type: 'text',     label: 'Text Color' },
        minHeight: { type: 'text',     label: 'Min Height (CSS)' },
        align: { type: 'radio', label: 'Alignment', options: [{ label: 'Left', value: 'left' }, { label: 'Center', value: 'center' }, { label: 'Right', value: 'right' }] },
      },
      defaultProps: { title: 'Your Headline Here', subtitle: 'A compelling subheadline that drives action.', ctaLabel: 'Get Started', ctaHref: '#', bgColor: '#01696f', textColor: '#ffffff', align: 'center', minHeight: '60vh' },
      render: ({ title, subtitle, ctaLabel, ctaHref, bgColor, textColor, align, minHeight }) => (
        <section style={{ background: bgColor, color: textColor, padding: '80px 24px', textAlign: align, minHeight, display: 'flex', flexDirection: 'column', alignItems: align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start', justifyContent: 'center' }}>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 800, margin: '0 0 16px', maxWidth: '14ch' }}>{title}</h1>
          <p style={{ fontSize: 'clamp(1rem, 2vw, 1.375rem)', opacity: 0.85, maxWidth: 560, margin: `0 0 32px` }}>{subtitle}</p>
          {ctaLabel && <a href={ctaHref} style={{ display: 'inline-block', padding: '14px 32px', background: '#fff', color: bgColor, borderRadius: 8, fontWeight: 700, fontSize: 16, textDecoration: 'none' }}>{ctaLabel}</a>}
        </section>
      ),
    },

    // ── Section ─────────────────────────────────────────────────────────────
    Section: {
      label: '\uD83D\uDCE6 Section',
      fields: {
        padding:  { type: 'text', label: 'Padding (CSS)' },
        bgColor:  { type: 'text', label: 'Background Color' },
        maxWidth: { type: 'text', label: 'Max Width' },
      },
      defaultProps: { padding: '64px 24px', bgColor: 'transparent', maxWidth: '1200px' },
      render: ({ padding, bgColor, maxWidth, children }) => (
        <section style={{ background: bgColor, padding }}><div style={{ maxWidth, margin: '0 auto' }}>{children}</div></section>
      ),
    },

    // ── Grid ────────────────────────────────────────────────────────────────
    Grid: {
      label: '\u268F Grid',
      fields: {
        columns: { type: 'number', label: 'Columns', min: 1, max: 12 },
        gap:     { type: 'text',   label: 'Gap (CSS)' },
      },
      defaultProps: { columns: 3, gap: '24px' },
      render: ({ columns, gap, children }) => (
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)`, gap }}>{children}</div>
      ),
    },

    // ── Columns ─────────────────────────────────────────────────────────────
    Columns: {
      label: '\u22A1 Columns',
      fields: {
        distribution: {
          type: 'select', label: 'Layout',
          options: [
            { label: '50 / 50',    value: '1/2+1/2' },
            { label: '33 / 67',    value: '1/3+2/3' },
            { label: '67 / 33',    value: '2/3+1/3' },
            { label: '33 / 33 / 33', value: '1/3+1/3+1/3' },
          ],
        },
        gap: { type: 'text', label: 'Gap (CSS)' },
      },
      defaultProps: { distribution: '1/2+1/2', gap: '32px' },
      render: ({ distribution, gap, children }) => {
        const cols = { '1/2+1/2': '1fr 1fr', '1/3+2/3': '1fr 2fr', '2/3+1/3': '2fr 1fr', '1/3+1/3+1/3': '1fr 1fr 1fr' }[distribution];
        return <div style={{ display: 'grid', gridTemplateColumns: cols, gap }}>{children}</div>;
      },
    },

    // ── Card ────────────────────────────────────────────────────────────────
    Card: {
      label: '\uD83C\uDCCF Card',
      fields: {
        title:       { type: 'text',     label: 'Title' },
        description: { type: 'textarea', label: 'Description' },
        imageUrl:    { type: 'text',     label: 'Image URL' },
        ctaLabel:    { type: 'text',     label: 'CTA Label' },
        ctaHref:     { type: 'text',     label: 'CTA URL' },
        variant: { type: 'select', label: 'Variant', options: [{ label: 'Default', value: 'default' }, { label: 'Elevated', value: 'elevated' }, { label: 'Outlined', value: 'outlined' }] },
      },
      defaultProps: { title: 'Card Title', description: 'Card description here.', imageUrl: '', ctaLabel: 'Learn More', ctaHref: '#', variant: 'elevated' },
      render: ({ title, description, imageUrl, ctaLabel, ctaHref, variant }) => (
        <div style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', boxShadow: variant === 'elevated' ? '0 4px 24px rgba(0,0,0,0.09)' : 'none', border: variant === 'outlined' ? '1px solid rgba(0,0,0,0.12)' : 'none', height: '100%', display: 'flex', flexDirection: 'column' }}>
          {imageUrl && <img src={imageUrl} alt={title} loading="lazy" style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover' }} />}
          <div style={{ padding: 24, flex: 1, display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ margin: '0 0 8px', fontSize: 20, fontWeight: 700 }}>{title}</h3>
            <p style={{ margin: '0 0 16px', color: '#666', fontSize: 15, lineHeight: 1.6, flex: 1 }}>{description}</p>
            {ctaLabel && <a href={ctaHref} style={{ color: PRIMARY, fontWeight: 600, textDecoration: 'none' }}>{ctaLabel} \u2192</a>}
          </div>
        </div>
      ),
    },

    // ── Text ────────────────────────────────────────────────────────────────
    Text: {
      label: '\uD83D\uDCDD Text',
      fields: {
        text:       { type: 'textarea', label: 'Content' },
        tag:        { type: 'select',   label: 'HTML Tag', options: ['p','h1','h2','h3','h4','h5','h6'].map(t => ({ label: t.toUpperCase(), value: t })) },
        size:       { type: 'text',     label: 'Font Size' },
        color:      { type: 'text',     label: 'Color' },
        weight:     { type: 'select',   label: 'Weight', options: ['400','500','600','700','800'].map(w => ({ label: w, value: w })) },
        lineHeight: { type: 'text',     label: 'Line Height' },
        align:      { type: 'radio',    label: 'Align', options: [{ label: 'Left', value: 'left' }, { label: 'Center', value: 'center' }, { label: 'Right', value: 'right' }] },
      },
      defaultProps: { text: 'Your text here.', tag: 'p', size: '1rem', color: 'inherit', align: 'left', weight: '400', lineHeight: '1.6' },
      render: ({ text, tag: Tag, size, color, align, weight, lineHeight }) => (
        <Tag style={{ fontSize: size, color, textAlign: align, fontWeight: weight, lineHeight, margin: 0 }}>{text}</Tag>
      ),
    },

    // ── Button ──────────────────────────────────────────────────────────────
    Button: {
      label: '\uD83D\uDD18 Button',
      fields: {
        label:       { type: 'text', label: 'Label' },
        href:        { type: 'text', label: 'URL' },
        variant:     { type: 'select', label: 'Variant', options: [{ label: 'Primary', value: 'primary' }, { label: 'Secondary', value: 'secondary' }, { label: 'Ghost', value: 'ghost' }, { label: 'Destructive', value: 'destructive' }] },
        size:        { type: 'radio',  label: 'Size',    options: [{ label: 'SM', value: 'sm' }, { label: 'MD', value: 'md' }, { label: 'LG', value: 'lg' }] },
        openInNewTab:{ type: 'radio',  label: 'New Tab', options: [{ label: 'Yes', value: true }, { label: 'No', value: false }] },
        fullWidth:   { type: 'radio',  label: 'Full Width', options: [{ label: 'Yes', value: true }, { label: 'No', value: false }] },
      },
      defaultProps: { label: 'Click Me', href: '#', variant: 'primary', size: 'md', openInNewTab: false, fullWidth: false },
      render: ({ label, href, variant, size, openInNewTab, fullWidth }) => (
        <a href={href} target={openInNewTab ? '_blank' : undefined} rel={openInNewTab ? 'noopener noreferrer' : undefined} style={btnStyle(variant, size, fullWidth)}>{label}</a>
      ),
    },

    // ── Image ───────────────────────────────────────────────────────────────
    Image: {
      label: '\uD83D\uDDBC Image',
      fields: {
        src:          { type: 'text', label: 'Image URL' },
        alt:          { type: 'text', label: 'Alt Text' },
        width:        { type: 'text', label: 'Width (CSS)' },
        height:       { type: 'text', label: 'Height (CSS)' },
        objectFit:    { type: 'select', label: 'Object Fit', options: [{ label: 'Cover', value: 'cover' }, { label: 'Contain', value: 'contain' }, { label: 'Fill', value: 'fill' }] },
        borderRadius: { type: 'text', label: 'Border Radius' },
        caption:      { type: 'text', label: 'Caption (optional)' },
      },
      defaultProps: { src: 'https://picsum.photos/seed/puck/800/400', alt: 'Image', width: '100%', height: 'auto', objectFit: 'cover', borderRadius: '8px', caption: '' },
      render: ({ src, alt, width, height, objectFit, borderRadius, caption }) => (
        <figure style={{ margin: 0 }}>
          <img src={src} alt={alt} loading="lazy" style={{ width, height, objectFit, borderRadius, display: 'block' }} />
          {caption && <figcaption style={{ fontSize: 13, color: '#888', marginTop: 6, textAlign: 'center' }}>{caption}</figcaption>}
        </figure>
      ),
    },

    // ── Video ───────────────────────────────────────────────────────────────
    Video: {
      label: '\uD83C\uDFAC Video',
      fields: {
        src:         { type: 'text', label: 'Video URL (mp4 or YouTube embed)' },
        autoPlay:    { type: 'radio', label: 'Autoplay', options: [{ label: 'Yes', value: true }, { label: 'No', value: false }] },
        controls:    { type: 'radio', label: 'Controls', options: [{ label: 'Yes', value: true }, { label: 'No', value: false }] },
        loop:        { type: 'radio', label: 'Loop',     options: [{ label: 'Yes', value: true }, { label: 'No', value: false }] },
        muted:       { type: 'radio', label: 'Muted',    options: [{ label: 'Yes', value: true }, { label: 'No', value: false }] },
        aspectRatio: { type: 'select', label: 'Aspect Ratio', options: [{ label: '16:9', value: '16/9' }, { label: '4:3', value: '4/3' }, { label: '1:1', value: '1/1' }, { label: '9:16', value: '9/16' }] },
      },
      defaultProps: { src: '', autoPlay: false, controls: true, loop: false, muted: false, aspectRatio: '16/9' },
      render: ({ src, autoPlay, controls, loop, muted, aspectRatio }) => {
        const isYT = src.includes('youtube.com') || src.includes('youtu.be');
        return (
          <div style={{ position: 'relative', aspectRatio, width: '100%', borderRadius: 8, overflow: 'hidden', background: '#000' }}>
            {isYT
              ? <iframe src={src} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
              : <video src={src} autoPlay={autoPlay} controls={controls} loop={loop} muted={muted} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />}
          </div>
        );
      },
    },

    // ── Testimonial ─────────────────────────────────────────────────────────
    Testimonial: {
      label: '\uD83D\uDCAC Testimonial',
      fields: {
        quote:     { type: 'textarea', label: 'Quote' },
        author:    { type: 'text',     label: 'Author Name' },
        role:      { type: 'text',     label: 'Role / Company' },
        avatarUrl: { type: 'text',     label: 'Avatar URL' },
        rating:    { type: 'number',   label: 'Stars (1-5)', min: 1, max: 5 },
      },
      defaultProps: { quote: 'This product changed my life.', author: 'Jane Doe', role: 'CEO, Acme Inc.', avatarUrl: '', rating: 5 },
      render: ({ quote, author, role, avatarUrl, rating }) => (
        <div style={{ background: '#fff', borderRadius: 12, padding: '28px 32px', boxShadow: '0 2px 16px rgba(0,0,0,0.07)', maxWidth: 520 }}>
          <div style={{ color: '#f59e0b', fontSize: 18, marginBottom: 12 }}>{'\u2605'.repeat(Math.min(5, Math.max(1, rating)))}</div>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: '#28251d', marginBottom: 20, fontStyle: 'italic' }}>&ldquo;{quote}&rdquo;</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {avatarUrl && <img src={avatarUrl} alt={author} style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover' }} />}
            <div>
              <div style={{ fontWeight: 700, fontSize: 15 }}>{author}</div>
              <div style={{ color: '#7a7974', fontSize: 13 }}>{role}</div>
            </div>
          </div>
        </div>
      ),
    },

    // ── Stats ───────────────────────────────────────────────────────────────
    Stats: {
      label: '\uD83D\uDCCA Stats',
      fields: {
        items:   { type: 'textarea', label: 'Stats JSON ([{"value":"10k+","label":"Users"},...])' },
        columns: { type: 'number', label: 'Columns', min: 1, max: 6 },
      },
      defaultProps: {
        columns: 3,
        items: JSON.stringify([
          { value: '10k+', label: 'Active Users'  },
          { value: '99%',  label: 'Uptime'        },
          { value: '4.9★', label: 'Avg Rating'    },
        ], null, 2),
      },
      render: ({ items, columns }) => {
        let parsed: { value: string; label: string }[] = [];
        try { parsed = JSON.parse(items); } catch { /* noop */ }
        return (
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: 24, textAlign: 'center' }}>
            {parsed.map((s, i) => (
              <div key={i} style={{ padding: '24px 16px' }}>
                <div style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 800, color: PRIMARY, lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: 14, color: '#7a7974', marginTop: 8, fontWeight: 500 }}>{s.label}</div>
              </div>
            ))}
          </div>
        );
      },
    },

    // ── FAQ ─────────────────────────────────────────────────────────────────
    FAQ: {
      label: '\u2753 FAQ',
      fields: {
        title: { type: 'text',     label: 'Section Title' },
        items: { type: 'textarea', label: 'Items JSON ([{"q":"...","a":"..."},...])' },
      },
      defaultProps: {
        title: 'Frequently Asked Questions',
        items: JSON.stringify([
          { q: 'What is Puck?',              a: 'Puck is an open-source visual editor for React.' },
          { q: 'Is it free?',                a: 'Yes, fully MIT licensed.' },
          { q: 'Does it work with Next.js?', a: 'Yes, it has first-class Next.js App Router support.' },
        ], null, 2),
      },
      render: ({ title, items }) => {
        let parsed: { q: string; a: string }[] = [];
        try { parsed = JSON.parse(items); } catch { /* noop */ }
        return (
          <div style={{ maxWidth: 720 }}>
            {title && <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 800, marginBottom: 32 }}>{title}</h2>}
            {parsed.map((item, i) => (
              <details key={i} style={{ borderBottom: '1px solid rgba(0,0,0,0.08)', padding: '16px 0' }}>
                <summary style={{ fontWeight: 600, fontSize: 16, cursor: 'pointer', listStyle: 'none', display: 'flex', justifyContent: 'space-between' }}>
                  {item.q} <span>+</span>
                </summary>
                <p style={{ marginTop: 12, color: '#555', lineHeight: 1.7, fontSize: 15 }}>{item.a}</p>
              </details>
            ))}
          </div>
        );
      },
    },

    // ── CTA Banner ──────────────────────────────────────────────────────────
    CTA: {
      label: '\uD83D\uDE80 CTA Banner',
      fields: {
        title:    { type: 'text', label: 'Title' },
        subtitle: { type: 'text', label: 'Subtitle' },
        ctaLabel: { type: 'text', label: 'Button Label' },
        ctaHref:  { type: 'text', label: 'Button URL' },
        bgColor:  { type: 'text', label: 'Background Color' },
      },
      defaultProps: { title: 'Ready to get started?', subtitle: 'Join thousands of teams building with Puck.', ctaLabel: 'Start for free', ctaHref: '#', bgColor: '#01696f' },
      render: ({ title, subtitle, ctaLabel, ctaHref, bgColor }) => (
        <div style={{ background: bgColor, borderRadius: 16, padding: '56px 32px', textAlign: 'center', color: '#fff' }}>
          <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 800, margin: '0 0 12px' }}>{title}</h2>
          <p style={{ fontSize: 18, opacity: 0.85, margin: '0 0 32px', maxWidth: 480, marginInline: 'auto' }}>{subtitle}</p>
          <a href={ctaHref} style={{ display: 'inline-block', padding: '14px 36px', background: '#fff', color: bgColor, borderRadius: 8, fontWeight: 700, fontSize: 16, textDecoration: 'none' }}>{ctaLabel}</a>
        </div>
      ),
    },

    // ── Spacer ──────────────────────────────────────────────────────────────
    Spacer: {
      label: '\u2195 Spacer',
      fields: { height: { type: 'text', label: 'Height (CSS)' } },
      defaultProps: { height: '48px' },
      render: ({ height }) => <div style={{ height }} aria-hidden="true" />,
    },

    // ── Divider ─────────────────────────────────────────────────────────────
    Divider: {
      label: '\u2500\u2500 Divider',
      fields: {
        color:     { type: 'text',   label: 'Color' },
        thickness: { type: 'text',   label: 'Thickness' },
        margin:    { type: 'text',   label: 'Vertical Margin' },
        style:     { type: 'select', label: 'Style', options: [{ label: 'Solid', value: 'solid' }, { label: 'Dashed', value: 'dashed' }, { label: 'Dotted', value: 'dotted' }] },
      },
      defaultProps: { color: 'rgba(0,0,0,0.1)', thickness: '1px', margin: '32px', style: 'solid' },
      render: ({ color, thickness, margin, style }) => (
        <hr style={{ border: 'none', borderTop: `${thickness} ${style} ${color}`, margin: `${margin} 0` }} />
      ),
    },

    // ── Raw HTML ────────────────────────────────────────────────────────────
    HTML: {
      label: '</> Raw HTML',
      fields: { code: { type: 'textarea', label: 'HTML Code' } },
      defaultProps: { code: '<p>Raw HTML here</p>' },
      render: ({ code }) => <div dangerouslySetInnerHTML={{ __html: code }} />,
    },

    // ── Form ────────────────────────────────────────────────────────────────
    Form: {
      label: '\uD83D\uDCCB Form',
      fields: {
        title:          { type: 'text',     label: 'Title' },
        submitLabel:    { type: 'text',     label: 'Submit Label' },
        action:         { type: 'text',     label: 'Action URL (blank = JS handled)' },
        fields:         { type: 'textarea', label: 'Fields JSON' },
        successMessage: { type: 'text',     label: 'Success Message' },
      },
      defaultProps: {
        title: 'Contact Us', submitLabel: 'Send Message', action: '', successMessage: 'Thanks! We\'ll be in touch.',
        fields: JSON.stringify([{ name: 'name', label: 'Full Name', type: 'text', required: true }, { name: 'email', label: 'Email', type: 'email', required: true }, { name: 'message', label: 'Message', type: 'textarea', required: false }], null, 2),
      },
      render: ({ title, submitLabel, action, fields: fj, successMessage }) => {
        let ff: Array<{ name: string; label: string; type: string; required?: boolean }> = [];
        try { ff = JSON.parse(fj); } catch { /* noop */ }
        return (
          <form action={action || undefined} onSubmit={(e) => { if (!action) { e.preventDefault(); alert(successMessage); } }}
            style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 520 }}>
            {title && <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>{title}</h2>}
            {ff.map((f) => (
              <div key={f.name} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label htmlFor={f.name} style={{ fontWeight: 500, fontSize: 14 }}>{f.label}{f.required && ' *'}</label>
                {f.type === 'textarea'
                  ? <textarea id={f.name} name={f.name} required={f.required} rows={4} style={{ padding: '10px 14px', borderRadius: 8, border: '1px solid rgba(0,0,0,0.15)', fontSize: 15, fontFamily: 'inherit', resize: 'vertical' }} />
                  : <input id={f.name} name={f.name} type={f.type} required={f.required} style={{ padding: '10px 14px', borderRadius: 8, border: '1px solid rgba(0,0,0,0.15)', fontSize: 15 }} />}
              </div>
            ))}
            <button type="submit" style={{ padding: '12px 28px', background: PRIMARY, color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 15, cursor: 'pointer', alignSelf: 'flex-start', marginTop: 8 }}>{submitLabel}</button>
          </form>
        );
      },
    },

    // ── Badge ───────────────────────────────────────────────────────────────
    Badge: {
      label: '\uD83C\uDFF7 Badge',
      fields: {
        label:   { type: 'text', label: 'Label' },
        color:   { type: 'text', label: 'Text Color' },
        bgColor: { type: 'text', label: 'Background Color' },
      },
      defaultProps: { label: 'New', color: '#01696f', bgColor: '#e8f5f5' },
      render: ({ label, color, bgColor }) => (
        <span style={{ display: 'inline-block', padding: '4px 12px', borderRadius: 9999, fontSize: 12, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color, background: bgColor }}>{label}</span>
      ),
    },

    // ── Alert ───────────────────────────────────────────────────────────────
    Alert: {
      label: '\u26A0 Alert',
      fields: {
        message:     { type: 'textarea', label: 'Message' },
        type:        { type: 'select', label: 'Type', options: [{ label: 'Info', value: 'info' }, { label: 'Success', value: 'success' }, { label: 'Warning', value: 'warning' }, { label: 'Error', value: 'error' }] },
        dismissible: { type: 'radio', label: 'Dismissible', options: [{ label: 'Yes', value: true }, { label: 'No', value: false }] },
      },
      defaultProps: { message: 'This is an informational alert.', type: 'info', dismissible: false },
      render: ({ message, type, dismissible }) => {
        const palette = { info: ['#006494','#c6d8e4'], success: ['#437a22','#d4dfcc'], warning: ['#964219','#ddcfc6'], error: ['#a12c7b','#e0ced7'] }[type];
        return (
          <div style={{ background: palette[1], borderLeft: `4px solid ${palette[0]}`, borderRadius: 8, padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
            <p style={{ color: palette[0], fontSize: 15, fontWeight: 500, margin: 0, lineHeight: 1.5 }}>{message}</p>
            {dismissible && <button onClick={(e) => (e.currentTarget.closest('div') as HTMLElement).remove()} style={{ background: 'none', border: 'none', cursor: 'pointer', color: palette[0], fontSize: 18, lineHeight: 1, padding: 0, flexShrink: 0 }}>&times;</button>}
          </div>
        );
      },
    },
  },
};

export default config;

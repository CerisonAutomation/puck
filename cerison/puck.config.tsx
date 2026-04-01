/**
 * @file puck.config.tsx
 * @description Cerison Enterprise Puck Configuration
 * All official plugins wired: heading-analyzer, emotion-cache, field-contentful
 * Components: Hero, Section, Grid, Card, Text, Button, Image, Video, Spacer, Divider, HTML, Form
 * @version 1.0.0
 */

import type { Config } from '@measured/puck';
import { HeadingAnalyzer } from '@measured/puck-plugin-heading-analyzer';
import { emotionCache } from '@measured/puck-plugin-emotion-cache';
import '@measured/puck-plugin-heading-analyzer/dist/index.css';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type HeroProps = {
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
  bgColor: string;
  textColor: string;
  align: 'left' | 'center' | 'right';
};

type SectionProps = {
  padding: string;
  bgColor: string;
  maxWidth: string;
};

type GridProps = {
  columns: number;
  gap: string;
};

type CardProps = {
  title: string;
  description: string;
  imageUrl: string;
  ctaLabel: string;
  ctaHref: string;
  variant: 'default' | 'elevated' | 'outlined';
};

type TextProps = {
  text: string;
  tag: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  size: string;
  color: string;
  align: 'left' | 'center' | 'right';
  weight: '400' | '500' | '600' | '700' | '800';
};

type ButtonProps = {
  label: string;
  href: string;
  variant: 'primary' | 'secondary' | 'ghost' | 'destructive';
  size: 'sm' | 'md' | 'lg';
  openInNewTab: boolean;
};

type ImageProps = {
  src: string;
  alt: string;
  width: string;
  height: string;
  objectFit: 'cover' | 'contain' | 'fill';
  borderRadius: string;
};

type VideoProps = {
  src: string;
  autoPlay: boolean;
  controls: boolean;
  loop: boolean;
  muted: boolean;
  aspectRatio: '16/9' | '4/3' | '1/1' | '9/16';
};

type SpacerProps = {
  height: string;
};

type DividerProps = {
  color: string;
  thickness: string;
  margin: string;
};

type HTMLProps = {
  code: string;
};

type FormProps = {
  title: string;
  submitLabel: string;
  action: string;
  fields: string; // JSON string of fields
};

type Components = {
  Hero: HeroProps;
  Section: SectionProps;
  Grid: GridProps;
  Card: CardProps;
  Text: TextProps;
  Button: ButtonProps;
  Image: ImageProps;
  Video: VideoProps;
  Spacer: SpacerProps;
  Divider: DividerProps;
  HTML: HTMLProps;
  Form: FormProps;
};

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

export const config: Config<Components> = {
  // ── Official Plugins ──────────────────────────────────────────────────────
  plugins: [
    HeadingAnalyzer,   // Adds SEO heading structure panel in the sidebar
    emotionCache,       // Fixes Emotion CSS-in-JS rendering inside the iframe
  ],

  // ── Root (canvas wrapper) ─────────────────────────────────────────────────
  root: {
    fields: {
      title: { type: 'text', label: 'Page Title' },
      description: { type: 'textarea', label: 'Meta Description' },
      ogImage: { type: 'text', label: 'OG Image URL' },
      lang: {
        type: 'select',
        label: 'Language',
        options: [
          { label: 'English', value: 'en' },
          { label: 'Spanish', value: 'es' },
          { label: 'French', value: 'fr' },
        ],
      },
    },
    defaultProps: {
      title: 'Untitled Page',
      description: '',
      ogImage: '',
      lang: 'en',
    },
    render: ({ children, title }) => (
      <html lang="en">
        <head><title>{title}</title></head>
        <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif' }}>
          {children}
        </body>
      </html>
    ),
  },

  // ── Components ────────────────────────────────────────────────────────────
  components: {
    // ── Hero ────────────────────────────────────────────────────────────────
    Hero: {
      label: '🦸 Hero',
      fields: {
        title:     { type: 'text',     label: 'Headline' },
        subtitle:  { type: 'textarea', label: 'Subheadline' },
        ctaLabel:  { type: 'text',     label: 'CTA Label' },
        ctaHref:   { type: 'text',     label: 'CTA URL' },
        bgColor:   { type: 'text',     label: 'Background Color' },
        textColor: { type: 'text',     label: 'Text Color' },
        align: {
          type: 'radio',
          label: 'Alignment',
          options: [
            { label: 'Left',   value: 'left' },
            { label: 'Center', value: 'center' },
            { label: 'Right',  value: 'right' },
          ],
        },
      },
      defaultProps: {
        title: 'Your Headline Here',
        subtitle: 'A compelling subheadline that drives conversions.',
        ctaLabel: 'Get Started',
        ctaHref: '#',
        bgColor: '#01696f',
        textColor: '#ffffff',
        align: 'center',
      },
      render: ({ title, subtitle, ctaLabel, ctaHref, bgColor, textColor, align }) => (
        <section
          style={{
            background: bgColor,
            color: textColor,
            padding: '80px 24px',
            textAlign: align,
          }}
        >
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 800, margin: '0 0 16px' }}>
            {title}
          </h1>
          <p style={{ fontSize: 'clamp(1rem, 2vw, 1.375rem)', opacity: 0.85, maxWidth: 600, margin: `0 ${align === 'center' ? 'auto' : '0'} 32px` }}>
            {subtitle}
          </p>
          {ctaLabel && (
            <a
              href={ctaHref}
              style={{
                display: 'inline-block',
                padding: '14px 32px',
                background: '#fff',
                color: bgColor,
                borderRadius: 8,
                fontWeight: 700,
                fontSize: 16,
                textDecoration: 'none',
              }}
            >
              {ctaLabel}
            </a>
          )}
        </section>
      ),
    },

    // ── Section ─────────────────────────────────────────────────────────────
    Section: {
      label: '📦 Section',
      fields: {
        padding:  { type: 'text', label: 'Padding (CSS)' },
        bgColor:  { type: 'text', label: 'Background Color' },
        maxWidth: { type: 'text', label: 'Max Width' },
      },
      defaultProps: {
        padding: '64px 24px',
        bgColor: 'transparent',
        maxWidth: '1200px',
      },
      render: ({ padding, bgColor, maxWidth, children }) => (
        <section style={{ background: bgColor, padding }}>
          <div style={{ maxWidth, margin: '0 auto' }}>{children}</div>
        </section>
      ),
    },

    // ── Grid ────────────────────────────────────────────────────────────────
    Grid: {
      label: '⚏ Grid',
      fields: {
        columns: {
          type: 'number',
          label: 'Columns',
          min: 1,
          max: 12,
        },
        gap: { type: 'text', label: 'Gap (CSS)' },
      },
      defaultProps: { columns: 3, gap: '24px' },
      render: ({ columns, gap, children }) => (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gap,
          }}
        >
          {children}
        </div>
      ),
    },

    // ── Card ────────────────────────────────────────────────────────────────
    Card: {
      label: '🃏 Card',
      fields: {
        title:       { type: 'text',  label: 'Title' },
        description: { type: 'textarea', label: 'Description' },
        imageUrl:    { type: 'text',  label: 'Image URL' },
        ctaLabel:    { type: 'text',  label: 'CTA Label' },
        ctaHref:     { type: 'text',  label: 'CTA URL' },
        variant: {
          type: 'select',
          label: 'Variant',
          options: [
            { label: 'Default',  value: 'default' },
            { label: 'Elevated', value: 'elevated' },
            { label: 'Outlined', value: 'outlined' },
          ],
        },
      },
      defaultProps: {
        title: 'Card Title',
        description: 'Card description goes here.',
        imageUrl: '',
        ctaLabel: 'Learn More',
        ctaHref: '#',
        variant: 'elevated',
      },
      render: ({ title, description, imageUrl, ctaLabel, ctaHref, variant }) => {
        const shadow = variant === 'elevated' ? '0 4px 24px rgba(0,0,0,0.10)' : 'none';
        const border = variant === 'outlined' ? '1px solid rgba(0,0,0,0.12)' : 'none';
        return (
          <div style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', boxShadow: shadow, border }}>
            {imageUrl && <img src={imageUrl} alt={title} style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover' }} />}
            <div style={{ padding: 24 }}>
              <h3 style={{ margin: '0 0 8px', fontSize: 20, fontWeight: 700 }}>{title}</h3>
              <p style={{ margin: '0 0 16px', color: '#666', fontSize: 15, lineHeight: 1.6 }}>{description}</p>
              {ctaLabel && <a href={ctaHref} style={{ color: '#01696f', fontWeight: 600, textDecoration: 'none' }}>{ctaLabel} →</a>}
            </div>
          </div>
        );
      },
    },

    // ── Text ────────────────────────────────────────────────────────────────
    Text: {
      label: '📝 Text',
      fields: {
        text:   { type: 'textarea', label: 'Content' },
        tag: {
          type: 'select',
          label: 'HTML Tag',
          options: [
            { label: 'Paragraph', value: 'p' },
            { label: 'H1', value: 'h1' },
            { label: 'H2', value: 'h2' },
            { label: 'H3', value: 'h3' },
            { label: 'H4', value: 'h4' },
            { label: 'H5', value: 'h5' },
            { label: 'H6', value: 'h6' },
          ],
        },
        size:   { type: 'text',  label: 'Font Size (CSS)' },
        color:  { type: 'text',  label: 'Color' },
        align: {
          type: 'radio',
          label: 'Align',
          options: [
            { label: 'Left',   value: 'left' },
            { label: 'Center', value: 'center' },
            { label: 'Right',  value: 'right' },
          ],
        },
        weight: {
          type: 'select',
          label: 'Font Weight',
          options: [
            { label: 'Regular (400)', value: '400' },
            { label: 'Medium (500)',  value: '500' },
            { label: 'SemiBold (600)', value: '600' },
            { label: 'Bold (700)',    value: '700' },
            { label: 'ExtraBold (800)', value: '800' },
          ],
        },
      },
      defaultProps: {
        text: 'Your text goes here.',
        tag: 'p',
        size: '1rem',
        color: 'inherit',
        align: 'left',
        weight: '400',
      },
      render: ({ text, tag: Tag, size, color, align, weight }) => (
        <Tag style={{ fontSize: size, color, textAlign: align, fontWeight: weight, margin: 0 }}>
          {text}
        </Tag>
      ),
    },

    // ── Button ──────────────────────────────────────────────────────────────
    Button: {
      label: '🔘 Button',
      fields: {
        label:       { type: 'text', label: 'Label' },
        href:        { type: 'text', label: 'URL' },
        variant: {
          type: 'select',
          label: 'Variant',
          options: [
            { label: 'Primary',     value: 'primary' },
            { label: 'Secondary',   value: 'secondary' },
            { label: 'Ghost',       value: 'ghost' },
            { label: 'Destructive', value: 'destructive' },
          ],
        },
        size: {
          type: 'radio',
          label: 'Size',
          options: [
            { label: 'SM', value: 'sm' },
            { label: 'MD', value: 'md' },
            { label: 'LG', value: 'lg' },
          ],
        },
        openInNewTab: { type: 'radio', label: 'Open in New Tab', options: [{ label: 'Yes', value: true }, { label: 'No', value: false }] },
      },
      defaultProps: {
        label: 'Click Me',
        href: '#',
        variant: 'primary',
        size: 'md',
        openInNewTab: false,
      },
      render: ({ label, href, variant, size, openInNewTab }) => {
        const sizes = { sm: '10px 20px', md: '14px 28px', lg: '18px 36px' };
        const fontSizes = { sm: 14, md: 15, lg: 17 };
        const styles: Record<string, React.CSSProperties> = {
          primary:     { background: '#01696f', color: '#fff', border: 'none' },
          secondary:   { background: '#e8f5f5', color: '#01696f', border: 'none' },
          ghost:       { background: 'transparent', color: '#01696f', border: '1.5px solid #01696f' },
          destructive: { background: '#a12c7b', color: '#fff', border: 'none' },
        };
        return (
          <a
            href={href}
            target={openInNewTab ? '_blank' : undefined}
            rel={openInNewTab ? 'noopener noreferrer' : undefined}
            style={{
              display: 'inline-block',
              padding: sizes[size],
              borderRadius: 8,
              fontWeight: 600,
              fontSize: fontSizes[size],
              textDecoration: 'none',
              cursor: 'pointer',
              ...styles[variant],
            }}
          >
            {label}
          </a>
        );
      },
    },

    // ── Image ───────────────────────────────────────────────────────────────
    Image: {
      label: '🖼 Image',
      fields: {
        src:          { type: 'text', label: 'Image URL' },
        alt:          { type: 'text', label: 'Alt Text' },
        width:        { type: 'text', label: 'Width (CSS)' },
        height:       { type: 'text', label: 'Height (CSS)' },
        objectFit: {
          type: 'select',
          label: 'Object Fit',
          options: [
            { label: 'Cover',   value: 'cover' },
            { label: 'Contain', value: 'contain' },
            { label: 'Fill',    value: 'fill' },
          ],
        },
        borderRadius: { type: 'text', label: 'Border Radius' },
      },
      defaultProps: {
        src: 'https://picsum.photos/seed/puck/800/400',
        alt: 'Image',
        width: '100%',
        height: 'auto',
        objectFit: 'cover',
        borderRadius: '8px',
      },
      render: ({ src, alt, width, height, objectFit, borderRadius }) => (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          style={{ width, height, objectFit, borderRadius, display: 'block' }}
        />
      ),
    },

    // ── Video ───────────────────────────────────────────────────────────────
    Video: {
      label: '🎬 Video',
      fields: {
        src:         { type: 'text', label: 'Video URL (mp4/webm or YouTube embed)' },
        autoPlay:    { type: 'radio', label: 'Autoplay', options: [{ label: 'Yes', value: true }, { label: 'No', value: false }] },
        controls:    { type: 'radio', label: 'Controls', options: [{ label: 'Yes', value: true }, { label: 'No', value: false }] },
        loop:        { type: 'radio', label: 'Loop', options: [{ label: 'Yes', value: true }, { label: 'No', value: false }] },
        muted:       { type: 'radio', label: 'Muted', options: [{ label: 'Yes', value: true }, { label: 'No', value: false }] },
        aspectRatio: {
          type: 'select',
          label: 'Aspect Ratio',
          options: [
            { label: '16:9',  value: '16/9' },
            { label: '4:3',   value: '4/3' },
            { label: '1:1',   value: '1/1' },
            { label: '9:16',  value: '9/16' },
          ],
        },
      },
      defaultProps: {
        src: '',
        autoPlay: false,
        controls: true,
        loop: false,
        muted: false,
        aspectRatio: '16/9',
      },
      render: ({ src, autoPlay, controls, loop, muted, aspectRatio }) => {
        const isYouTube = src.includes('youtube.com') || src.includes('youtu.be');
        return (
          <div style={{ position: 'relative', aspectRatio, width: '100%', borderRadius: 8, overflow: 'hidden' }}>
            {isYouTube ? (
              <iframe
                src={src}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video
                src={src}
                autoPlay={autoPlay}
                controls={controls}
                loop={loop}
                muted={muted}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
              />
            )}
          </div>
        );
      },
    },

    // ── Spacer ──────────────────────────────────────────────────────────────
    Spacer: {
      label: '↕ Spacer',
      fields: {
        height: { type: 'text', label: 'Height (CSS)' },
      },
      defaultProps: { height: '48px' },
      render: ({ height }) => <div style={{ height }} aria-hidden="true" />,
    },

    // ── Divider ─────────────────────────────────────────────────────────────
    Divider: {
      label: '── Divider',
      fields: {
        color:     { type: 'text', label: 'Color' },
        thickness: { type: 'text', label: 'Thickness (CSS)' },
        margin:    { type: 'text', label: 'Vertical Margin (CSS)' },
      },
      defaultProps: { color: 'rgba(0,0,0,0.1)', thickness: '1px', margin: '32px' },
      render: ({ color, thickness, margin }) => (
        <hr style={{ border: 'none', borderTop: `${thickness} solid ${color}`, margin: `${margin} 0` }} />
      ),
    },

    // ── HTML (Raw) ──────────────────────────────────────────────────────────
    HTML: {
      label: '</> Raw HTML',
      fields: {
        code: { type: 'textarea', label: 'HTML Code' },
      },
      defaultProps: { code: '<p>Raw HTML goes here</p>' },
      // eslint-disable-next-line react/no-danger
      render: ({ code }) => <div dangerouslySetInnerHTML={{ __html: code }} />,
    },

    // ── Form ────────────────────────────────────────────────────────────────
    Form: {
      label: '📋 Form',
      fields: {
        title:       { type: 'text', label: 'Form Title' },
        submitLabel: { type: 'text', label: 'Submit Button Label' },
        action:      { type: 'text', label: 'Form Action URL (or leave blank)' },
        fields:      { type: 'textarea', label: 'Fields JSON (see docs)' },
      },
      defaultProps: {
        title: 'Contact Us',
        submitLabel: 'Send Message',
        action: '',
        fields: JSON.stringify([
          { name: 'name',    label: 'Full Name',      type: 'text',     required: true },
          { name: 'email',   label: 'Email Address',  type: 'email',    required: true },
          { name: 'message', label: 'Your Message',   type: 'textarea', required: false },
        ], null, 2),
      },
      render: ({ title, submitLabel, action, fields: fieldsJson }) => {
        let parsedFields: Array<{ name: string; label: string; type: string; required?: boolean }> = [];
        try { parsedFields = JSON.parse(fieldsJson); } catch { /* noop */ }
        return (
          <form action={action || undefined} style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 520 }}>
            {title && <h2 style={{ margin: '0 0 8px', fontSize: 22, fontWeight: 700 }}>{title}</h2>}
            {parsedFields.map((f) => (
              <div key={f.name} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label htmlFor={f.name} style={{ fontWeight: 500, fontSize: 14 }}>{f.label}{f.required && ' *'}</label>
                {f.type === 'textarea' ? (
                  <textarea id={f.name} name={f.name} required={f.required} rows={4}
                    style={{ padding: '10px 14px', borderRadius: 8, border: '1px solid rgba(0,0,0,0.15)', fontSize: 15, fontFamily: 'inherit', resize: 'vertical' }} />
                ) : (
                  <input id={f.name} name={f.name} type={f.type} required={f.required}
                    style={{ padding: '10px 14px', borderRadius: 8, border: '1px solid rgba(0,0,0,0.15)', fontSize: 15 }} />
                )}
              </div>
            ))}
            <button type="submit"
              style={{ padding: '12px 28px', background: '#01696f', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 15, cursor: 'pointer', alignSelf: 'flex-start', marginTop: 8 }}>
              {submitLabel}
            </button>
          </form>
        );
      },
    },
  },
};

export default config;

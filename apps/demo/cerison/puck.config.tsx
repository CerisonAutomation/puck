/**
 * @file puck.config.tsx
 * @description Christian Property Management (CPM) Production Puck Configuration
 * Plugins: HeadingAnalyzer + emotionCache
 * Components: Hero, Section, Grid, Columns, Card, Text, Button,
 *            Image, Video, Testimonial, Stats, FAQ, CTA, Spacer,
 *            Divider, HTML, Form, Badge, Alert, FeatureList, Pricing,
 *            Gallery, Map, ContactForm, Newsletter
 * @version 3.0.0
 */

import type { Config } from '@measured/puck';
import { HeadingAnalyzer } from '@measured/puck-plugin-heading-analyzer';
import { emotionCache } from '@measured/puck-plugin-emotion-cache';
import '@measured/puck-plugin-heading-analyzer/dist/index.css';

// ============================================================
// Component types
// ============================================================
type HeroProps = {
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
  bgColor: string;
  textColor: string;
  align: 'left' | 'center' | 'right';
  minHeight: string;
  image?: string;
};

type SectionProps = {
  padding: string;
  bgColor: string;
  maxWidth: string;
  id?: string;
};

type GridProps = {
  columns: number;
  gap: string;
};

type ColumnsProps = {
  distribution: '1/2+1/2' | '1/3+2/3' | '2/3+1/3' | '1/3+1/3+1/3' | '1/4+1/4+1/4+1/4';
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
  tag: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span';
  size: string;
  color: string;
  align: 'left' | 'center' | 'right';
  weight: '400' | '500' | '600' | '700' | '800';
  lineHeight: string;
};

type ButtonProps = {
  label: string;
  href: string;
  variant: 'primary' | 'secondary' | 'ghost' | 'destructive' | 'outline';
  size: 'sm' | 'md' | 'lg';
  openInNewTab: boolean;
  fullWidth: boolean;
};

type ImageProps = {
  src: string;
  alt: string;
  width: string;
  height: string;
  objectFit: 'cover' | 'contain' | 'fill';
  borderRadius: string;
  caption: string;
};

type VideoProps = {
  src: string;
  autoPlay: boolean;
  controls: boolean;
  loop: boolean;
  muted: boolean;
  aspectRatio: '16/9' | '4/3' | '1/1' | '9/16';
};

type TestimonialProps = {
  quote: string;
  author: string;
  role: string;
  avatarUrl: string;
  rating: number;
};

type StatsProps = {
  items: { label: string; value: string; icon?: string }[];
};

type FAQProps = {
  title: string;
  items: { question: string; answer: string }[];
};

type CTAProps = {
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
  bgColor: string;
  variant: 'simple' | 'boxed' | 'image';
};

type SpacerProps = {
  height: string;
};

type DividerProps = {
  color: string;
  thickness: string;
  margin: string;
  style: 'solid' | 'dashed' | 'dotted';
};

type HTMLProps = {
  code: string;
};

type FormProps = {
  title: string;
  submitLabel: string;
  action: string;
  fields: { name: string; label: string; type: string; required: boolean }[];
  successMessage: string;
};

type BadgeProps = {
  label: string;
  color: string;
  bgColor: string;
  variant: 'pill' | 'square';
};

type AlertProps = {
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  dismissible: boolean;
};

type FeatureListProps = {
  title: string;
  features: { title: string; description: string; icon?: string }[];
};

type PricingProps = {
  plans: {
    name: string;
    price: string;
    description: string;
    features: string[];
    ctaLabel: string;
    ctaHref: string;
    highlighted: boolean;
  }[];
};

type GalleryProps = {
  images: { src: string; alt: string }[];
  layout: 'grid' | 'masonry' | 'carousel';
};

type MapProps = {
  address: string;
  zoom: number;
  height: string;
};

type ContactFormProps = {
  title: string;
  description: string;
  emailRecipient: string;
};

type NewsletterProps = {
  title: string;
  description: string;
  placeholder: string;
  buttonLabel: string;
};

type Components = {
  Hero: HeroProps;
  Section: SectionProps;
  Grid: GridProps;
  Columns: ColumnsProps;
  Card: CardProps;
  Text: TextProps;
  Button: ButtonProps;
  Image: ImageProps;
  Video: VideoProps;
  Testimonial: TestimonialProps;
  Stats: StatsProps;
  FAQ: FAQProps;
  CTA: CTAProps;
  Spacer: SpacerProps;
  Divider: DividerProps;
  HTML: HTMLProps;
  Form: FormProps;
  Badge: BadgeProps;
  Alert: AlertProps;
  FeatureList: FeatureListProps;
  Pricing: PricingProps;
  Gallery: GalleryProps;
  Map: MapProps;
  ContactForm: ContactFormProps;
  Newsletter: NewsletterProps;
};

// ============================================================
// Shared constants & helpers
// ============================================================
const CPM_PRIMARY = '#1a365d'; // Deep Navy for Christian Property Management
const CPM_SECONDARY = '#c05621'; // Warm terracotta
const CPM_ACCENT = '#2b6cb0';

const btnStyle = (variant: ButtonProps['variant'], size: ButtonProps['size'], fullWidth: boolean) => {
  const pad = { sm: '8px 16px', md: '12px 24px', lg: '16px 32px' }[size];
  const fs = { sm: 14, md: 16, lg: 18 }[size];
  
  const base: any = {
    padding: pad,
    fontSize: fs,
    fontWeight: 600,
    borderRadius: 6,
    display: fullWidth ? 'flex' : 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    width: fullWidth ? '100%' : 'auto',
    border: '2px solid transparent',
  };

  const variants = {
    primary: { backgroundColor: CPM_PRIMARY, color: '#fff' },
    secondary: { backgroundColor: CPM_SECONDARY, color: '#fff' },
    outline: { backgroundColor: 'transparent', color: CPM_PRIMARY, borderColor: CPM_PRIMARY },
    ghost: { backgroundColor: 'transparent', color: CPM_PRIMARY },
    destructive: { backgroundColor: '#e53e3e', color: '#fff' },
  }[variant];

  return { ...base, ...variants };
};

// ============================================================
// Config
// ============================================================
export const config: Config<Components> = {
  plugins: [HeadingAnalyzer, emotionCache],
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
          { label: 'Spanish', value: 'es' }
        ] 
      },
    },
    defaultProps: {
      title: 'Christian Property Management',
      description: 'Professional property management services.',
      ogImage: '',
      lang: 'en'
    },
    render: ({ children, title }) => (
      <div style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#1a202c' }}>
        <title>{title}</title>
        {children}
      </div>
    ),
  },
  components: {
    Hero: {
      label: '🦸 Hero',
      fields: {
        title: { type: 'text' },
        subtitle: { type: 'textarea' },
        ctaLabel: { type: 'text' },
        ctaHref: { type: 'text' },
        bgColor: { type: 'text' },
        textColor: { type: 'text' },
        align: {
          type: 'radio',
          options: [
            { label: 'Left', value: 'left' },
            { label: 'Center', value: 'center' },
            { label: 'Right', value: 'right' },
          ],
        },
        minHeight: { type: 'text' },
        image: { type: 'text', label: 'Background Image URL' },
      },
      defaultProps: {
        title: 'Excellence in Property Management',
        subtitle: 'Integrity-driven service for property owners and tenants.',
        ctaLabel: 'View Properties',
        ctaHref: '/properties',
        bgColor: CPM_PRIMARY,
        textColor: '#ffffff',
        align: 'center',
        minHeight: '80vh',
      },
      render: (props) => (
        <section style={{
          backgroundColor: props.bgColor,
          color: props.textColor,
          minHeight: props.minHeight,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: props.align === 'center' ? 'center' : props.align === 'right' ? 'flex-end' : 'flex-start',
          textAlign: props.align,
          padding: '4rem 2rem',
          backgroundImage: props.image ? `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${props.image})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', maxWidth: '800px' }}>{props.title}</h1>
          <p style={{ fontSize: '1.25rem', marginBottom: '2.5rem', maxWidth: '600px', opacity: 0.9 }}>{props.subtitle}</p>
          {props.ctaLabel && (
            <a href={props.ctaHref} style={btnStyle('secondary', 'lg', false)}>
              {props.ctaLabel}
            </a>
          )}
        </section>
      ),
    },
    Section: {
      label: '📦 Section',
      fields: {
        padding: { type: 'text' },
        bgColor: { type: 'text' },
        maxWidth: { type: 'text' },
        id: { type: 'text', label: 'Anchor ID' },
      },
      defaultProps: {
        padding: '80px 24px',
        bgColor: '#ffffff',
        maxWidth: '1200px',
      },
      render: ({ padding, bgColor, maxWidth, children, id }) => (
        <section id={id} style={{ padding, backgroundColor: bgColor }}>
          <div style={{ maxWidth, margin: '0 auto' }}>{children}</div>
        </section>
      ),
    },
    Grid: {
      label: '⊞ Grid',
      fields: {
        columns: { type: 'number', min: 1, max: 12 },
        gap: { type: 'text' },
      },
      defaultProps: {
        columns: 3,
        gap: '32px',
      },
      render: ({ columns, gap, children }) => (
        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap,
        }}>
          {children}
        </div>
      ),
    },
    Columns: {
      label: '◫ Columns',
      fields: {
        distribution: {
          type: 'select',
          options: [
            { label: '50 / 50', value: '1/2+1/2' },
            { label: '33 / 67', value: '1/3+2/3' },
            { label: '67 / 33', value: '2/3+1/3' },
            { label: '33 / 33 / 33', value: '1/3+1/3+1/3' },
            { label: '25 / 25 / 25 / 25', value: '1/4+1/4+1/4+1/4' },
          ],
        },
        gap: { type: 'text' },
      },
      defaultProps: {
        distribution: '1/2+1/2',
        gap: '40px',
      },
      render: ({ distribution, gap, children }) => {
        const cols = {
          '1/2+1/2': '1fr 1fr',
          '1/3+2/3': '1fr 2fr',
          '2/3+1/3': '2fr 1fr',
          '1/3+1/3+1/3': '1fr 1fr 1fr',
          '1/4+1/4+1/4+1/4': '1fr 1fr 1fr 1fr',
        }[distribution];
        return (
          <div style={{ display: 'grid', gridTemplateColumns: cols, gap }}>
            {children}
          </div>
        );
      },
    },
    FeatureList: {
      label: '✨ Features',
      fields: {
        title: { type: 'text' },
        features: {
          type: 'array',
          getItemSummary: (item) => item.title || 'Feature',
          arrayFields: {
            title: { type: 'text' },
            description: { type: 'textarea' },
            icon: { type: 'text' },
          },
        },
      },
      defaultProps: {
        title: 'Our Services',
        features: [
          { title: 'Tenant Screening', description: 'Comprehensive background and credit checks.' },
          { title: 'Maintenance', description: '24/7 emergency response and routine upkeep.' },
          { title: 'Financial Reporting', description: 'Transparent monthly statements and online portals.' },
        ],
      },
      render: ({ title, features }) => (
        <div>
          {title && <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>{title}</h2>}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            {features.map((f, i) => (
              <div key={i} style={{ padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{f.icon || '📍'}</div>
                <h3 style={{ marginBottom: '0.5rem' }}>{f.title}</h3>
                <p style={{ color: '#4a5568', lineHeight: '1.5' }}>{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    Pricing: {
      label: '💰 Pricing',
      fields: {
        plans: {
          type: 'array',
          getItemSummary: (item) => item.name || 'Plan',
          arrayFields: {
            name: { type: 'text' },
            price: { type: 'text' },
            description: { type: 'text' },
            features: { type: 'array', arrayFields: { item: { type: 'text' } } },
            ctaLabel: { type: 'text' },
            ctaHref: { type: 'text' },
            highlighted: { type: 'radio', options: [{label: 'Yes', value: true}, {label: 'No', value: false}] },
          }
        }
      },
      defaultProps: {
        plans: [
          { name: 'Basic', price: '8%', description: 'Standard management', features: ['Screening', 'Rent Collection'], ctaLabel: 'Get Started', ctaHref: '#', highlighted: false },
          { name: 'Premium', price: '10%', description: 'Full service', features: ['Screening', 'Rent Collection', 'Maintenance', 'Legal'], ctaLabel: 'Choose Premium', ctaHref: '#', highlighted: true },
        ]
      },
      render: ({ plans }) => (
        <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {plans.map((p, i) => (
            <div key={i} style={{
              flex: '1',
              minWidth: '300px',
              maxWidth: '400px',
              padding: '2.5rem',
              borderRadius: '12px',
              border: p.highlighted ? `2px solid ${CPM_PRIMARY}` : '1px solid #e2e8f0',
              boxShadow: p.highlighted ? '0 10px 25px -5px rgba(0,0,0,0.1)' : 'none',
              backgroundColor: '#fff',
              position: 'relative'
            }}>
              {p.highlighted && <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: CPM_PRIMARY, color: '#fff', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>MOST POPULAR</div>}
              <h3 style={{ margin: 0 }}>{p.name}</h3>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '1rem 0' }}>{p.price}</div>
              <p style={{ color: '#718096', marginBottom: '2rem' }}>{p.description}</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0' }}>
                {p.features.map((f: any, fi) => <li key={fi} style={{ marginBottom: '0.75rem' }}>✓ {f.item || f}</li>)}
              </ul>
              <a href={p.ctaHref} style={btnStyle(p.highlighted ? 'primary' : 'outline', 'md', true)}>{p.ctaLabel}</a>
            </div>
          ))}
        </div>
      )
    },
    ContactForm: {
      label: '📧 Contact Form',
      fields: {
        title: { type: 'text' },
        description: { type: 'textarea' },
        emailRecipient: { type: 'text' },
      },
      defaultProps: {
        title: 'Get a Free Quote',
        description: 'Tell us about your property and we will get back to you within 24 hours.',
        emailRecipient: 'info@christianpropertymanagement.com'
      },
      render: ({ title, description }) => (
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <h2>{title}</h2>
          <p style={{ marginBottom: '2rem', color: '#4a5568' }}>{description}</p>
          <form style={{ display: 'grid', gap: '1rem', textAlign: 'left' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Name</label>
              <input type="text" style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #cbd5e0' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Email</label>
              <input type="email" style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #cbd5e0' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Message</label>
              <textarea style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #cbd5e0', minHeight: '120px' }} />
            </div>
            <button type="button" style={btnStyle('primary', 'lg', true)}>Send Message</button>
          </form>
        </div>
      )
    },
    // Standard Components (Optimized for CPM)
    Card: {
      label: '🃏 Card',
      fields: {
        title: { type: 'text' },
        description: { type: 'textarea' },
        imageUrl: { type: 'text' },
        ctaLabel: { type: 'text' },
        ctaHref: { type: 'text' },
        variant: {
          type: 'select',
          options: [
            { label: 'Default', value: 'default' },
            { label: 'Elevated', value: 'elevated' },
            { label: 'Outlined', value: 'outlined' },
          ],
        },
      },
      defaultProps: {
        title: 'Property Listing',
        description: 'Beautiful 3-bedroom home in the suburbs.',
        imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80',
        ctaLabel: 'View Details',
        ctaHref: '#',
        variant: 'elevated',
      },
      render: ({ title, description, imageUrl, ctaLabel, ctaHref, variant }) => (
        <div style={{
          borderRadius: '10px',
          overflow: 'hidden',
          backgroundColor: '#fff',
          border: variant === 'outlined' ? '1px solid #e2e8f0' : 'none',
          boxShadow: variant === 'elevated' ? '0 4px 6px -1px rgba(0,0,0,0.1)' : 'none',
          height: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {imageUrl && <img src={imageUrl} alt={title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />}
          <div style={{ padding: '1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ margin: '0 0 0.75rem 0' }}>{title}</h3>
            <p style={{ color: '#4a5568', fontSize: '0.95rem', marginBottom: '1.5rem', flexGrow: 1 }}>{description}</p>
            {ctaLabel && <a href={ctaHref} style={{ color: CPM_PRIMARY, fontWeight: 'bold', textDecoration: 'none' }}>{ctaLabel} →</a>}
          </div>
        </div>
      ),
    },
    Text: {
      label: '✍️ Text',
      fields: {
        text: { type: 'textarea' },
        tag: {
          type: 'select',
          options: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span'].map(t => ({ label: t.toUpperCase(), value: t })),
        },
        size: { type: 'text' },
        color: { type: 'text' },
        weight: {
          type: 'select',
          options: ['400', '500', '600', '700', '800'].map(w => ({ label: w, value: w })),
        },
        lineHeight: { type: 'text' },
        align: {
          type: 'radio',
          options: [
            { label: 'Left', value: 'left' },
            { label: 'Center', value: 'center' },
            { label: 'Right', value: 'right' },
          ],
        },
      },
      defaultProps: {
        text: 'Your paragraph text goes here.',
        tag: 'p',
        size: '1rem',
        color: '#2d3748',
        align: 'left',
        weight: '400',
        lineHeight: '1.6',
      },
      render: ({ text, tag: Tag, size, color, align, weight, lineHeight }) => (
        <Tag style={{ fontSize: size, color, textAlign: align, fontWeight: weight, lineHeight, margin: 0 }}>
          {text}
        </Tag>
      ),
    },
    Button: {
      label: '🔘 Button',
      fields: {
        label: { type: 'text' },
        href: { type: 'text' },
        variant: {
          type: 'select',
          options: [
            { label: 'Primary', value: 'primary' },
            { label: 'Secondary', value: 'secondary' },
            { label: 'Outline', value: 'outline' },
            { label: 'Ghost', value: 'ghost' },
          ],
        },
        size: {
          type: 'radio',
          options: [
            { label: 'SM', value: 'sm' },
            { label: 'MD', value: 'md' },
            { label: 'LG', value: 'lg' },
          ],
        },
        fullWidth: { type: 'radio', options: [{ label: 'Yes', value: true }, { label: 'No', value: false }] },
      },
      defaultProps: {
        label: 'Button',
        href: '#',
        variant: 'primary',
        size: 'md',
        fullWidth: false,
      },
      render: (props) => (
        <a href={props.href} style={btnStyle(props.variant, props.size, props.fullWidth)}>
          {props.label}
        </a>
      ),
    },
    Spacer: {
      label: '📏 Spacer',
      fields: { height: { type: 'text' } },
      defaultProps: { height: '40px' },
      render: ({ height }) => <div style={{ height }} />,
    },
    Divider: {
      label: '➖ Divider',
      fields: {
        color: { type: 'text' },
        thickness: { type: 'text' },
        margin: { type: 'text' },
        style: {
          type: 'radio',
          options: [
            { label: 'Solid', value: 'solid' },
            { label: 'Dashed', value: 'dashed' },
            { label: 'Dotted', value: 'dotted' },
          ],
        },
      },
      defaultProps: {
        color: '#e2e8f0',
        thickness: '1px',
        margin: '40px 0',
        style: 'solid',
      },
      render: ({ color, thickness, margin, style }) => (
        <hr style={{ border: 'none', borderTop: `${thickness} ${style} ${color}`, margin }} />
      ),
    },
  },
};

-- ============================================================
-- Cerison Puck Editor — Seed Data (dev/staging only)
-- ============================================================

insert into public.templates (name, description, data) values
(
  'Blank Page',
  'An empty canvas to start from scratch.',
  '{"content":[], "root":{"props":{"title":"New Page","description":"","ogImage":"","lang":"en"}}}'
),
(
  'Landing Page',
  'Hero + features grid + CTA section.',
  '{
    "content": [
      {"type":"Hero","props":{"title":"Build faster with Puck","subtitle":"The open-source visual editor for React.","ctaLabel":"Get Started","ctaHref":"#","bgColor":"#01696f","textColor":"#ffffff","align":"center"}},
      {"type":"Section","props":{"padding":"64px 24px","bgColor":"#f9f8f5","maxWidth":"1200px"},"children":[
        {"type":"Grid","props":{"columns":3,"gap":"24px"},"children":[
          {"type":"Card","props":{"title":"Fast","description":"Optimised for speed and performance.","imageUrl":"","ctaLabel":"Learn More","ctaHref":"#","variant":"elevated"}},
          {"type":"Card","props":{"title":"Flexible","description":"Works with any React component.","imageUrl":"","ctaLabel":"Learn More","ctaHref":"#","variant":"elevated"}},
          {"type":"Card","props":{"title":"Open Source","description":"MIT licensed. No vendor lock-in.","imageUrl":"","ctaLabel":"Learn More","ctaHref":"#","variant":"elevated"}}
        ]}
      ]}
    ],
    "root":{"props":{"title":"Landing Page","description":"A compelling landing page.","ogImage":"","lang":"en"}}
  }'
);

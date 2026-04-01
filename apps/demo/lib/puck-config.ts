import type { Config } from "@measured/puck";

/**
 * @file puck-config.ts
 * @description Central Puck component registry.
 * Add your custom blocks here — each key maps to a draggable component.
 * See: https://puckeditor.com/docs/api-reference/configuration/config
 */

export type Props = {
  HeroBlock: { title: string; subtitle: string; ctaLabel: string; ctaHref: string };
  TextBlock: { content: string; align: "left" | "center" | "right" };
  CardGrid: { heading: string; columns: 2 | 3 | 4 };
  Spacer: { size: "sm" | "md" | "lg" | "xl" };
};

export const puckConfig: Config<Props> = {
  components: {
    HeroBlock: {
      label: "Hero Block",
      fields: {
        title: { type: "text", label: "Heading" },
        subtitle: { type: "textarea", label: "Subtitle" },
        ctaLabel: { type: "text", label: "CTA Label" },
        ctaHref: { type: "text", label: "CTA URL" },
      },
      defaultProps: {
        title: "Build pages visually",
        subtitle: "Drag, drop, publish. No code required.",
        ctaLabel: "Get started",
        ctaHref: "/edit",
      },
      render: ({ title, subtitle, ctaLabel, ctaHref }) => (
        <section
          style={{
            padding: "6rem 2rem",
            textAlign: "center",
            background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
          }}
        >
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 4rem)", fontWeight: 800, marginBottom: "1rem" }}>
            {title}
          </h1>
          <p style={{ fontSize: "1.25rem", color: "#4b5563", marginBottom: "2rem", maxWidth: "48ch", margin: "0 auto 2rem" }}>
            {subtitle}
          </p>
          <a
            href={ctaHref}
            style={{
              display: "inline-block",
              padding: "0.875rem 2rem",
              background: "#0f172a",
              color: "#fff",
              borderRadius: "0.5rem",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            {ctaLabel}
          </a>
        </section>
      ),
    },

    TextBlock: {
      label: "Text Block",
      fields: {
        content: { type: "textarea", label: "Content" },
        align: {
          type: "radio",
          label: "Alignment",
          options: [
            { label: "Left", value: "left" },
            { label: "Center", value: "center" },
            { label: "Right", value: "right" },
          ],
        },
      },
      defaultProps: { content: "Your content here...", align: "left" },
      render: ({ content, align }) => (
        <div style={{ padding: "2rem", textAlign: align, maxWidth: "72ch", margin: "0 auto" }}>
          <p style={{ fontSize: "1.125rem", lineHeight: 1.7, color: "#374151" }}>{content}</p>
        </div>
      ),
    },

    CardGrid: {
      label: "Card Grid",
      fields: {
        heading: { type: "text", label: "Section Heading" },
        columns: {
          type: "radio",
          label: "Columns",
          options: [
            { label: "2", value: 2 },
            { label: "3", value: 3 },
            { label: "4", value: 4 },
          ],
        },
      },
      defaultProps: { heading: "Features", columns: 3 },
      render: ({ heading, columns }) => (
        <section style={{ padding: "4rem 2rem" }}>
          <h2 style={{ textAlign: "center", fontSize: "2rem", fontWeight: 700, marginBottom: "2rem" }}>
            {heading}
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${columns}, 1fr)`,
              gap: "1.5rem",
              maxWidth: "1200px",
              margin: "0 auto",
            }}
          >
            {Array.from({ length: columns }).map((_, i) => (
              <div
                key={i}
                style={{
                  background: "#f9fafb",
                  border: "1px solid #e5e7eb",
                  borderRadius: "0.75rem",
                  padding: "1.5rem",
                }}
              >
                <h3 style={{ fontWeight: 600, marginBottom: "0.5rem" }}>Card {i + 1}</h3>
                <p style={{ color: "#6b7280", fontSize: "0.95rem" }}>
                  Add your content to this card slot.
                </p>
              </div>
            ))}
          </div>
        </section>
      ),
    },

    Spacer: {
      label: "Spacer",
      fields: {
        size: {
          type: "radio",
          label: "Size",
          options: [
            { label: "Small (1rem)", value: "sm" },
            { label: "Medium (2rem)", value: "md" },
            { label: "Large (4rem)", value: "lg" },
            { label: "XL (8rem)", value: "xl" },
          ],
        },
      },
      defaultProps: { size: "md" },
      render: ({ size }) => {
        const heights = { sm: "1rem", md: "2rem", lg: "4rem", xl: "8rem" };
        return <div style={{ height: heights[size] }} aria-hidden="true" />;
      },
    },
  },
};

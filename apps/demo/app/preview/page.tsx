import { Render } from "@measured/puck";
import "@measured/puck/puck.css";
import { puckConfig } from "../../lib/puck-config";

/**
 * @page /preview
 * @description Server-rendered preview of the published Puck page.
 * Fetches saved data from /api/save?path=/.
 */
async function getPageData() {
  try {
    const baseUrl =
      process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/save?path=%2F`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const { data } = await res.json();
    return data;
  } catch {
    return null;
  }
}

export default async function PreviewPage() {
  const data = await getPageData();

  if (!data) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          gap: "1rem",
          color: "#6b7280",
        }}
      >
        <p style={{ fontSize: "1.25rem" }}>No page published yet.</p>
        <a
          href="/edit"
          style={{
            padding: "0.75rem 1.5rem",
            background: "#0f172a",
            color: "#fff",
            borderRadius: "0.5rem",
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          Open Editor →
        </a>
      </div>
    );
  }

  return <Render config={puckConfig} data={data} />;
}

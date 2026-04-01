import type { Metadata } from "next";
import "./styles.css";

export const metadata: Metadata = {
  title: "Puck Editor — CerisonAutomation",
  description: "Production-ready visual page builder powered by Puck v0.20.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Puck Editor",
    description: "Drag-and-drop page builder built on @measured/puck",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

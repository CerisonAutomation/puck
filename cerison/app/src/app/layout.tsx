import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Christiano Property Management',
  description: 'Premium property management powered by AI and automation.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    siteName: 'Christiano Property Management',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">{children}</body>
    </html>
  )
}

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    template: '%s — Christian Property Management',
    default: 'Christian Property Management',
  },
  description: 'Premium property management with direct booking.',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SERVER_URL ?? 'http://localhost:3000'
  ),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className="antialiased">{children}</body>
    </html>
  )
}

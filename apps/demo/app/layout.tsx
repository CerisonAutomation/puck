import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import './styles.css';
import '@measured/puck/puck.css';
import '@measured/puck-plugin-heading-analyzer/dist/index.css';

export const metadata: Metadata = {
  title: {
    template: '%s | Cerison Puck Editor',
    default:  'Cerison Puck Editor',
  },
  description: 'Enterprise visual page builder powered by Puck',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'
  ),
  openGraph: {
    type:   'website',
    locale: 'en_US',
    siteName: 'Cerison Puck Editor',
  },
  robots: { index: false, follow: false }, // editor should not be indexed
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            success: { duration: 3000 },
            error:   { duration: 5000 },
            style: {
              borderRadius: '8px',
              background: '#1c1b19',
              color: '#cdccca',
              fontSize: '14px',
            },
          }}
        />
      </body>
    </html>
  );
}

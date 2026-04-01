import { Suspense } from 'react'

export default function HomePage() {
  return (
    <main style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', background: '#0a0a08' }}>
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h1 style={{
          fontFamily: 'serif',
          fontSize: 'clamp(2rem, 5vw, 4rem)',
          color: '#c9a84c',
          marginBottom: '1rem',
          fontWeight: 400,
        }}>
          Christiano Property Management
        </h1>
        <p style={{ color: '#8a8880', fontSize: '1.125rem', marginBottom: '2rem' }}>
          Premium AI-powered property management
        </p>
        <a
          href="/admin"
          style={{
            display: 'inline-block',
            padding: '0.75rem 2rem',
            border: '1px solid #c9a84c',
            color: '#c9a84c',
            textDecoration: 'none',
            borderRadius: '0.375rem',
            fontSize: '0.875rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            transition: 'all 200ms',
          }}
        >
          Enter Admin
        </a>
      </div>
    </main>
  )
}

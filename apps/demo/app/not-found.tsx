import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', gap: 16, fontFamily: 'system-ui, sans-serif', textAlign: 'center', padding: 24 }}>
      <div style={{ fontSize: 64 }}>404</div>
      <h1 style={{ fontSize: 28, fontWeight: 800, color: '#1c1b19' }}>Page Not Found</h1>
      <p style={{ color: '#7a7974', maxWidth: 360 }}>This page doesn’t exist yet. You can create it in the editor.</p>
      <div style={{ display: 'flex', gap: 12 }}>
        <Link href="/dashboard" style={{ padding: '10px 24px', background: '#01696f', color: '#fff', borderRadius: 8, fontWeight: 600, textDecoration: 'none' }}>Dashboard</Link>
        <Link href="/edit/home"  style={{ padding: '10px 24px', background: '#f3f0ec', color: '#28251d', borderRadius: 8, fontWeight: 600, textDecoration: 'none' }}>Edit Home</Link>
      </div>
    </div>
  );
}

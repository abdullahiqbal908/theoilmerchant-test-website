import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{ maxWidth: 560, margin: '0 auto', padding: '100px 40px', textAlign: 'center' }}>
      <p className="section-label" style={{ margin: '0 0 12px' }}>404</p>
      <h1 style={{ fontFamily: '"Libre Baskerville", serif', fontSize: '2rem', fontWeight: 400, margin: '0 0 16px', letterSpacing: '-0.02em' }}>Page Not Found</h1>
      <p style={{ fontSize: '0.9rem', color: '#6A7F8E', lineHeight: 1.7, margin: '0 0 36px' }}>
        The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you back to something good.
      </p>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link href="/" className="btn-primary">Go Home</Link>
        <Link href="/all-oils" className="btn-outline">Shop All Oils</Link>
      </div>
    </div>
  )
}

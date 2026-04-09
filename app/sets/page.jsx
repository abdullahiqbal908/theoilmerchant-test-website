import Link from 'next/link'

export const metadata = { title: 'Gift Sets — The Oil Merchant' }

export default function SetsPage() {
  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '80px 40px', textAlign: 'center' }}>
      <p className="section-label" style={{ margin: '0 0 12px' }}>Coming Soon</p>
      <h1 style={{ fontFamily: '"Libre Baskerville", serif', fontSize: '2.4rem', fontWeight: 400, margin: '0 0 16px', letterSpacing: '-0.03em' }}>Gift Sets</h1>
      <p style={{ fontSize: '0.9rem', color: '#6A7F8E', lineHeight: 1.7, margin: '0 0 36px', maxWidth: 440, marginLeft: 'auto', marginRight: 'auto' }}>
        We&apos;re curating beautiful gift sets for every ritual. Sign up to be the first to know when they launch.
      </p>
      <Link href="/all-oils" className="btn-outline">Browse All Oils</Link>
    </div>
  )
}

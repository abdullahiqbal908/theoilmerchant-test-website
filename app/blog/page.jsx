import Link from 'next/link'

export const metadata = { title: 'Blog — The Oil Merchant' }

const posts = [
  { title: '5 Oils Every Pakistani Woman Should Have in Her Routine', date: 'March 2026', category: 'Hair Care', slug: 'five-essential-oils' },
  { title: 'Cold-Pressed vs Refined: Why It Matters for Your Hair', date: 'February 2026', category: 'Education', slug: 'cold-pressed-vs-refined' },
  { title: 'The Ancient Art of Oil Pulling for Scalp Health', date: 'January 2026', category: 'Rituals', slug: 'oil-pulling-scalp' },
]

export default function BlogPage() {
  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '60px 40px 80px' }}>
      <div style={{ marginBottom: 48 }}>
        <p className="section-label" style={{ margin: '0 0 10px' }}>The Journal</p>
        <h1 style={{ fontFamily: '"Libre Baskerville", serif', fontSize: '2.4rem', fontWeight: 400, margin: 0, letterSpacing: '-0.03em' }}>Stories & Rituals</h1>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
        {posts.map(post => (
          <div key={post.slug}>
            <div style={{ background: '#EEF5FA', aspectRatio: '16/9', marginBottom: 16, overflow: 'hidden' }}>
              <img src={`https://placehold.co/400x225/EEF5FA/2A6496?text=${encodeURIComponent(post.category)}`} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <p style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#2A6496', margin: '0 0 8px' }}>{post.category}</p>
            <h2 style={{ fontFamily: '"Libre Baskerville", serif', fontSize: '1rem', fontWeight: 400, margin: '0 0 8px', lineHeight: 1.4 }}>{post.title}</h2>
            <p style={{ fontSize: '0.72rem', color: '#6A7F8E', margin: 0 }}>{post.date}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

import Link from 'next/link'

export const metadata = {
  title: 'About Us — The Oil Merchant',
}

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section style={{ background: '#1C2B3A', padding: '80px 40px', textAlign: 'center' }}>
        <p className="section-label" style={{ color: 'rgba(212,234,245,0.7)', margin: '0 0 16px' }}>Our Story</p>
        <h1 style={{ fontFamily: '"Libre Baskerville", serif', fontSize: '3rem', fontWeight: 400, color: '#fff', lineHeight: 1.1, letterSpacing: '-0.03em', margin: '0 0 20px' }}>
          From Root to <em>Ritual.</em>
        </h1>
        <p style={{ fontSize: '1rem', fontWeight: 300, color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, maxWidth: 560, margin: '0 auto' }}>
          Born in Pakistan. Rooted in nature. Delivered with honesty.
        </p>
      </section>

      {/* Story */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '72px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center', marginBottom: 64 }}>
          <div>
            <p className="section-label" style={{ margin: '0 0 12px' }}>The Beginning</p>
            <h2 style={{ fontFamily: '"Libre Baskerville", serif', fontSize: '1.6rem', fontWeight: 400, margin: '0 0 20px', letterSpacing: '-0.02em' }}>
              A grandmother's recipe. A daughter's mission.
            </h2>
            <p style={{ fontSize: '0.9rem', fontWeight: 300, color: '#4A5568', lineHeight: 1.8, margin: '0 0 16px' }}>
              The Oil Merchant was born from a simple truth: Pakistani women have been using nature's finest oils for centuries — cold-pressed, unrefined, and perfectly pure. Our founder, Aisha Khan, grew up watching her grandmother blend oils in Lahore, measuring nothing, trusting everything.
            </p>
            <p style={{ fontSize: '0.9rem', fontWeight: 300, color: '#4A5568', lineHeight: 1.8, margin: 0 }}>
              In 2022, Aisha decided to share these rituals with the world — not as diluted, chemical-laden products, but as they were always meant to be: honest, pure, and effective.
            </p>
          </div>
          <div style={{ background: '#EEF5FA', aspectRatio: '4/5', overflow: 'hidden' }}>
            <img src="https://placehold.co/500x625/EEF5FA/2A6496?text=Founder" alt="Our Founder" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center', marginBottom: 64 }}>
          <div style={{ background: '#F7F4EF', aspectRatio: '4/5', overflow: 'hidden' }}>
            <img src="https://placehold.co/500x625/F7F4EF/7D9B77?text=Process" alt="Our Process" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div>
            <p className="section-label" style={{ margin: '0 0 12px' }}>Our Process</p>
            <h2 style={{ fontFamily: '"Libre Baskerville", serif', fontSize: '1.6rem', fontWeight: 400, margin: '0 0 20px', letterSpacing: '-0.02em' }}>
              Cold-pressed. Unrefined. Honestly made.
            </h2>
            <p style={{ fontSize: '0.9rem', fontWeight: 300, color: '#4A5568', lineHeight: 1.8, margin: '0 0 16px' }}>
              Every oil in our collection is cold-pressed at temperatures below 49°C — preserving every fatty acid, antioxidant, and vitamin that heat would destroy. We source directly from Pakistani farmers and trusted suppliers across South Asia.
            </p>
            <p style={{ fontSize: '0.9rem', fontWeight: 300, color: '#4A5568', lineHeight: 1.8, margin: 0 }}>
              No additives. No preservatives. No compromises. What you see on the label is exactly what goes into the bottle.
            </p>
          </div>
        </div>

        {/* Mission statement */}
        <div style={{ background: '#1C2B3A', padding: '48px', textAlign: 'center', marginBottom: 64 }}>
          <p className="section-label" style={{ color: 'rgba(212,234,245,0.7)', margin: '0 0 16px' }}>Our Mission</p>
          <blockquote style={{ fontFamily: '"Libre Baskerville", serif', fontSize: '1.5rem', fontWeight: 400, color: '#fff', lineHeight: 1.4, letterSpacing: '-0.02em', margin: 0 }}>
            &ldquo;To make Pakistan&apos;s ancient oil wisdom accessible to every household — without compromise, without confusion, and without the chemicals.&rdquo;
          </blockquote>
        </div>

        {/* Values */}
        <div style={{ marginBottom: 48 }}>
          <p className="section-label" style={{ margin: '0 0 8px', textAlign: 'center' }}>Our Values</p>
          <h2 style={{ fontFamily: '"Libre Baskerville", serif', fontSize: '1.6rem', fontWeight: 400, margin: '0 0 40px', letterSpacing: '-0.02em', textAlign: 'center' }}>What we stand for</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
            {[
              { title: 'Purity', desc: 'Every product is single-ingredient or clearly labelled. Nothing hidden. Nothing synthetic.' },
              { title: 'Honesty', desc: 'We tell you exactly where each oil comes from, how it was extracted, and what it can — and cannot — do.' },
              { title: 'Heritage', desc: 'Our formulations are grounded in South Asian wisdom passed down through generations of women who understood nature deeply.' },
            ].map(v => (
              <div key={v.title} style={{ textAlign: 'center' }}>
                <h3 style={{ fontFamily: '"Libre Baskerville", serif', fontSize: '1.1rem', fontWeight: 400, margin: '0 0 12px' }}>{v.title}</h3>
                <p style={{ fontSize: '0.875rem', color: '#6A7F8E', lineHeight: 1.7, margin: 0 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <Link href="/all-oils" className="btn-primary">Explore Our Oils</Link>
        </div>
      </section>
    </div>
  )
}

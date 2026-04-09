import Link from 'next/link'

export const metadata = { title: 'Sustainability — The Oil Merchant' }

export default function SustainabilityPage() {
  return (
    <div>
      <section style={{ background: '#7D9B77', padding: '72px 40px', textAlign: 'center' }}>
        <p className="section-label" style={{ color: 'rgba(255,255,255,0.8)', margin: '0 0 16px' }}>Our Commitment</p>
        <h1 style={{ fontFamily: '"Libre Baskerville", serif', fontSize: '2.8rem', fontWeight: 400, color: '#fff', lineHeight: 1.1, letterSpacing: '-0.03em', margin: '0 0 16px' }}>Sustainability</h1>
        <p style={{ fontSize: '0.9rem', fontWeight: 300, color: 'rgba(255,255,255,0.85)', lineHeight: 1.8, maxWidth: 440, margin: '0 auto' }}>
          We believe in taking care of the earth the way we take care of your hair — with intention, respect, and nothing unnecessary.
        </p>
      </section>
      <section style={{ maxWidth: 800, margin: '0 auto', padding: '64px 40px 80px' }}>
        {[
          { title: 'Minimal Packaging', desc: 'Our bottles are made from recyclable glass and aluminium wherever possible. We use recycled cardboard for all our boxes. No plastic bubble wrap — we use shredded paper made in Pakistan.' },
          { title: 'Direct from Farmers', desc: 'We source directly from Pakistani farmers, cutting out middlemen and ensuring fair wages. Our rosehip is sourced from wild-harvested plants; our garlic from small family farms in Punjab.' },
          { title: 'No Waste Extraction', desc: 'Cold-pressing generates a seed cake by-product that we return to partner farms as animal feed or compost. We aim for zero-waste at our processing facility.' },
          { title: 'Carbon-Conscious Delivery', desc: 'We consolidate orders to reduce delivery trips. For Lahore and Karachi, we partner with local couriers who use CNG-powered vehicles on key routes.' },
        ].map(item => (
          <div key={item.title} style={{ marginBottom: 40, display: 'flex', gap: 24 }}>
            <div style={{ width: 4, background: '#7D9B77', flexShrink: 0, borderRadius: 2 }} />
            <div>
              <h2 style={{ fontFamily: '"Libre Baskerville", serif', fontSize: '1.1rem', fontWeight: 400, margin: '0 0 10px' }}>{item.title}</h2>
              <p style={{ fontSize: '0.875rem', color: '#4A5568', lineHeight: 1.8, margin: 0 }}>{item.desc}</p>
            </div>
          </div>
        ))}
        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <Link href="/all-oils" className="btn-primary">Shop Sustainably</Link>
        </div>
      </section>
    </div>
  )
}

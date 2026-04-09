import Link from 'next/link'

export const metadata = { title: 'The Ritual — The Oil Merchant' }

export default function RitualPage() {
  return (
    <div>
      <section style={{ background: '#1C2B3A', padding: '72px 40px', textAlign: 'center' }}>
        <p className="section-label" style={{ color: 'rgba(212,234,245,0.7)', margin: '0 0 16px' }}>A Philosophy</p>
        <h1 style={{ fontFamily: '"Libre Baskerville", serif', fontSize: '2.8rem', fontWeight: 400, color: '#fff', lineHeight: 1.1, letterSpacing: '-0.03em', margin: '0 0 16px' }}>The Ritual</h1>
        <p style={{ fontSize: '0.9rem', fontWeight: 300, color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, maxWidth: 480, margin: '0 auto' }}>
          In South Asia, oiling the hair is not a step in a beauty routine — it is a ritual. It is quiet time. It is care, passed down.
        </p>
      </section>
      <section style={{ maxWidth: 760, margin: '0 auto', padding: '64px 40px 80px' }}>
        <p style={{ fontFamily: '"Libre Baskerville", serif', fontSize: '1.1rem', fontWeight: 400, lineHeight: 1.9, margin: '0 0 28px', color: '#1C2B3A' }}>
          For generations, Pakistani mothers have oiled their daughters&apos; hair on Sunday afternoons. It was never about a product. It was about presence. About warmth. About the belief that the body, like the earth, flourishes when we tend to it honestly.
        </p>
        <p style={{ fontSize: '0.9rem', fontWeight: 300, color: '#4A5568', lineHeight: 1.9, margin: '0 0 28px' }}>
          The Oil Merchant exists to make that ritual accessible again — in its purest form. No synthetic fragrances to mask the real scent of an oil. No emulsifiers to make it feel lighter. No marketing language to confuse you about what you&apos;re actually buying.
        </p>
        <p style={{ fontSize: '0.9rem', fontWeight: 300, color: '#4A5568', lineHeight: 1.9, margin: '0 0 48px' }}>
          Just oils. Honestly made. Ready for your ritual.
        </p>
        <Link href="/rituals" className="btn-primary">Explore Ritual Guides</Link>
      </section>
    </div>
  )
}

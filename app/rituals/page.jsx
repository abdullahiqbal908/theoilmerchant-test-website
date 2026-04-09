import Link from 'next/link'

export const metadata = { title: 'Rituals — The Oil Merchant' }

export default function RitualsPage() {
  return (
    <div>
      <section style={{ background: '#1C2B3A', padding: '72px 40px', textAlign: 'center' }}>
        <p className="section-label" style={{ color: 'rgba(212,234,245,0.7)', margin: '0 0 16px' }}>The Oil Merchant</p>
        <h1 style={{ fontFamily: '"Libre Baskerville", serif', fontSize: '2.8rem', fontWeight: 400, color: '#fff', lineHeight: 1.1, letterSpacing: '-0.03em', margin: '0 0 16px' }}>
          The Ritual Guide
        </h1>
        <p style={{ fontSize: '0.9rem', fontWeight: 300, color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, maxWidth: 480, margin: '0 auto' }}>
          Ancient wisdom. Modern ritual. Learn how to use our oils for your hair, scalp, body, and face.
        </p>
      </section>

      <section style={{ maxWidth: 900, margin: '0 auto', padding: '64px 40px' }}>
        {[
          { title: 'The Morning Scalp Ritual', time: '5 minutes', steps: ['Warm 5 drops of Rosehip or Egg Oil between palms', 'Part hair into sections and apply directly to scalp', 'Massage with fingertips in circular motions for 3–5 minutes', 'Style as usual — no need to rinse in the morning'] },
          { title: 'The Weekly Deep Treatment', time: '45–60 minutes', steps: ['Apply 8–10 drops of your chosen oil from roots to ends', 'Wrap hair in a warm towel or shower cap', 'Leave for minimum 45 minutes (or overnight for intense repair)', 'Wash out with a gentle, sulfate-free shampoo — repeat if needed'] },
          { title: 'The Scalp Health Protocol', time: '15 minutes, 3x/week', steps: ['Mix 3 drops of Garlic or Turmeric Oil with 5ml of Rosehip as carrier', 'Apply to scalp only using a dropper or fingertips', 'Massage in circular motions to boost circulation', 'Leave for 15–20 minutes, then shampoo thoroughly'] },
        ].map(ritual => (
          <div key={ritual.title} style={{ marginBottom: 56, paddingBottom: 56, borderBottom: '1px solid #E5E9EC' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 20 }}>
              <h2 style={{ fontFamily: '"Libre Baskerville", serif', fontSize: '1.3rem', fontWeight: 400, margin: 0 }}>{ritual.title}</h2>
              <span style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6A7F8E', background: '#EEF5FA', padding: '3px 8px' }}>{ritual.time}</span>
            </div>
            {ritual.steps.map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 10 }}>
                <span style={{ width: 24, height: 24, borderRadius: '50%', background: '#1C2B3A', color: '#fff', fontSize: '0.65rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>{i + 1}</span>
                <p style={{ fontSize: '0.875rem', fontWeight: 300, color: '#4A5568', lineHeight: 1.7, margin: 0 }}>{step}</p>
              </div>
            ))}
          </div>
        ))}

        <div style={{ textAlign: 'center' }}>
          <Link href="/all-oils" className="btn-primary">Shop the Ritual Oils</Link>
        </div>
      </section>
    </div>
  )
}

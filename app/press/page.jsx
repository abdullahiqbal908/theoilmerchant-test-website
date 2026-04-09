export const metadata = { title: 'Press — The Oil Merchant' }

export default function PressPage() {
  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '60px 40px 80px' }}>
      <p className="section-label" style={{ margin: '0 0 10px' }}>In the Press</p>
      <h1 style={{ fontFamily: '"Libre Baskerville", serif', fontSize: '2.4rem', fontWeight: 400, margin: '0 0 40px', letterSpacing: '-0.03em' }}>Press & Media</h1>
      <p style={{ fontSize: '0.9rem', color: '#6A7F8E', lineHeight: 1.7, margin: '0 0 48px' }}>For press enquiries, collaborations, or media kits, please contact us at <a href="mailto:press@theoilmerchant.pk" style={{ color: '#2A6496' }}>press@theoilmerchant.pk</a>.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
        {['Dawn', 'The News', 'Aurora Magazine'].map(pub => (
          <div key={pub} style={{ border: '1px solid #E5E9EC', padding: '28px 24px', textAlign: 'center' }}>
            <p style={{ fontFamily: '"Libre Baskerville", serif', fontSize: '1.1rem', color: '#6A7F8E', margin: '0 0 8px' }}>{pub}</p>
            <p style={{ fontSize: '0.72rem', color: '#A0ADB5', margin: 0 }}>Feature coming soon</p>
          </div>
        ))}
      </div>
    </div>
  )
}

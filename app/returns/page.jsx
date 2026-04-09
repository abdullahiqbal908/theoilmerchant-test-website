import Link from 'next/link'

export const metadata = { title: 'Returns & Exchanges — The Oil Merchant' }

export default function ReturnsPage() {
  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '60px 40px 80px' }}>
      <div style={{ marginBottom: 48 }}>
        <p className="section-label" style={{ margin: '0 0 10px' }}>Policies</p>
        <h1 style={{ fontFamily: '"Libre Baskerville", serif', fontSize: '2.4rem', fontWeight: 400, margin: '0 0 12px', letterSpacing: '-0.03em' }}>Returns & Exchanges</h1>
        <p style={{ fontSize: '0.875rem', color: '#6A7F8E' }}>Last updated: April 2026</p>
      </div>

      {[
        {
          title: 'Our Return Policy',
          content: `We want you to be completely satisfied with every purchase. If for any reason you are not, we offer a straightforward return and exchange process.`,
        },
        {
          title: 'Unopened Products',
          content: `Unopened, unused products in their original packaging can be returned within 7 days of delivery for a full refund (minus delivery charges, unless the return is due to our error). To initiate a return, contact us at hello@theoilmerchant.pk with your order number.`,
        },
        {
          title: 'Opened Products',
          content: `Due to hygiene reasons, opened products cannot be returned unless there is a genuine quality issue. If you believe a product is faulty, contaminated, or not as described, please contact us within 3 days of delivery with clear photographs. We will review every case promptly and offer a replacement or full refund as appropriate.`,
        },
        {
          title: 'Damaged in Transit',
          content: `If your order arrives damaged, photograph the package and product immediately upon receipt and contact us within 24 hours. We will send a replacement at no extra cost. Do not dispose of any packaging until the matter is resolved.`,
        },
        {
          title: 'Refund Process',
          content: `Approved refunds for bank transfer and mobile wallet payments are processed within 3–5 business days. COD refunds are issued via Easypaisa or bank transfer — please provide your account details when contacting us.\n\nOriginal delivery charges are non-refundable unless the return is due to an error on our part.`,
        },
        {
          title: 'Non-Returnable Items',
          content: `• Products opened and used beyond a reasonable trial period\n• Gift wrapping fees\n• Products purchased during final sale or clearance events (clearly marked at time of purchase)\n• Orders where delivery address was provided incorrectly by the customer`,
        },
        {
          title: 'How to Start a Return',
          content: `Email hello@theoilmerchant.pk or WhatsApp +92 300 123 4567 with:\n1. Your order number\n2. The item(s) you wish to return\n3. Reason for return\n4. Photos (if applicable)\n\nOur team will respond within 24 hours with return instructions.`,
        },
      ].map(section => (
        <div key={section.title} style={{ marginBottom: 40 }}>
          <h2 style={{ fontFamily: '"Libre Baskerville", serif', fontSize: '1.1rem', fontWeight: 400, margin: '0 0 12px', borderLeft: '3px solid #7D9B77', paddingLeft: 14 }}>{section.title}</h2>
          <p style={{ fontSize: '0.875rem', fontWeight: 300, color: '#4A5568', lineHeight: 1.9, margin: 0, whiteSpace: 'pre-line' }}>{section.content}</p>
        </div>
      ))}

      <div style={{ marginTop: 48, padding: '24px 28px', background: '#F7F4EF', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <p style={{ margin: 0, fontSize: '0.875rem', color: '#1C2B3A' }}>Need to start a return?</p>
        <Link href="/contact" className="btn-outline">Contact Us</Link>
      </div>
    </div>
  )
}

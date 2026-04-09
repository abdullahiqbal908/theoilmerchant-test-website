import Link from 'next/link'

export const metadata = { title: 'Shipping Policy — The Oil Merchant' }

export default function ShippingPage() {
  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '60px 40px 80px' }}>
      <div style={{ marginBottom: 48 }}>
        <p className="section-label" style={{ margin: '0 0 10px' }}>Policies</p>
        <h1 style={{ fontFamily: '"Libre Baskerville", serif', fontSize: '2.4rem', fontWeight: 400, margin: '0 0 12px', letterSpacing: '-0.03em' }}>Shipping Policy</h1>
        <p style={{ fontSize: '0.875rem', color: '#6A7F8E' }}>Last updated: April 2026</p>
      </div>

      {[
        {
          title: 'Delivery Charges',
          content: `Standard delivery fee is PKR 250 for all orders under PKR 5,000. All orders PKR 5,000 and above qualify for FREE delivery anywhere in Pakistan — no discount code needed, it applies automatically at checkout.`,
        },
        {
          title: 'Delivery Timeframes',
          content: `• Karachi, Lahore, Islamabad, Rawalpindi: 2–3 business days\n• Faisalabad, Multan, Peshawar, Quetta: 3–4 business days\n• Other cities and towns: 4–7 business days\n\nOrders placed before 12:00 PM on a business day are dispatched the same day. Orders placed after 12:00 PM or on weekends/public holidays are dispatched the next business day.`,
        },
        {
          title: 'Order Tracking',
          content: `Once your order is dispatched, you will receive an SMS with your tracking number and a link to track your parcel. You can also visit our Track Order page and enter your order number at any time.`,
        },
        {
          title: 'Cash on Delivery (COD)',
          content: `COD is available across all cities we serve. Please ensure someone is available at the delivery address to receive and pay for the order. If a COD order is returned due to non-availability, a re-delivery fee of PKR 150 applies.`,
        },
        {
          title: 'Damaged or Lost Parcels',
          content: `If your parcel arrives damaged, please take photos immediately and contact us within 24 hours at hello@theoilmerchant.pk or WhatsApp +92 300 123 4567. We will arrange a replacement or full refund promptly.`,
        },
        {
          title: 'Public Holidays',
          content: `We do not process or dispatch orders on Pakistani public holidays. Orders placed on public holidays will be processed on the next working day.`,
        },
      ].map(section => (
        <div key={section.title} style={{ marginBottom: 40 }}>
          <h2 style={{ fontFamily: '"Libre Baskerville", serif', fontSize: '1.1rem', fontWeight: 400, margin: '0 0 12px', borderLeft: '3px solid #2A6496', paddingLeft: 14 }}>{section.title}</h2>
          <p style={{ fontSize: '0.875rem', fontWeight: 300, color: '#4A5568', lineHeight: 1.9, margin: 0, whiteSpace: 'pre-line' }}>{section.content}</p>
        </div>
      ))}

      <div style={{ marginTop: 48, padding: '24px 28px', background: '#F7F4EF', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <p style={{ margin: 0, fontSize: '0.875rem', color: '#1C2B3A' }}>Have a question about your delivery?</p>
        <Link href="/contact" className="btn-outline">Contact Us</Link>
      </div>
    </div>
  )
}

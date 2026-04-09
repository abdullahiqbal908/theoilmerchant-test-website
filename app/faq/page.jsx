'use client'

import { useState } from 'react'

const FAQS = [
  {
    q: 'Do you deliver across all of Pakistan?',
    a: 'Yes! We deliver to all major cities including Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, Peshawar, Quetta, Multan, and more. Delivery to major cities takes 2–4 business days; remote areas may take up to 7 days.',
  },
  {
    q: 'How much does delivery cost?',
    a: 'Standard delivery is PKR 250 for orders under PKR 5,000. Orders above PKR 5,000 qualify for FREE delivery anywhere in Pakistan. During promotions, free delivery thresholds may be lower — check our announcement bar for current offers.',
  },
  {
    q: 'Are your oils 100% natural?',
    a: 'Absolutely. Every oil in our range is either 100% single-ingredient or clearly labelled with all components. We never add synthetic fragrances, preservatives, or fillers. What\'s on the label is exactly what\'s in the bottle — nothing more.',
  },
  {
    q: 'How are the oils extracted?',
    a: 'All our oils are cold-pressed at temperatures below 49°C (120°F). This preserves the full spectrum of fatty acids, vitamins, antioxidants, and active compounds that heat extraction destroys. Cold-pressing is slower and more expensive — but it produces a far superior oil.',
  },
  {
    q: 'How should I store my oils?',
    a: 'Store your oils in a cool, dark place away from direct sunlight and heat. A cupboard or drawer works perfectly. Avoid storing in the bathroom, as humidity and temperature fluctuations can degrade the oil faster. Most oils have a shelf life of 12–24 months when stored correctly.',
  },
  {
    q: 'Can I return a product if I\'m not satisfied?',
    a: 'We want you to be completely happy with your purchase. If you\'re not satisfied, you can return unopened products within 7 days of delivery for a full refund. Opened products that have a genuine quality issue may also be eligible for a return — please contact us with photos and we\'ll make it right.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept Cash on Delivery (COD) — which is always available. We also accept Bank Transfer (Allied Bank) and mobile wallets including Easypaisa and JazzCash. Bank transfer and mobile wallet orders are processed immediately upon payment confirmation.',
  },
  {
    q: 'How do I use essential oils safely?',
    a: 'Essential oils are highly concentrated and should almost always be diluted with a carrier oil before applying to skin or scalp. A safe dilution ratio is 2–3% (about 10–15 drops of essential oil per 30ml of carrier oil). Always do a patch test on a small area of skin first and wait 24 hours before full application. Keep essential oils away from eyes and mucous membranes.',
  },
]

function AccordionItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: '1px solid #E5E9EC' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', gap: 16 }}
      >
        <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.9rem', fontWeight: 500, color: '#1C2B3A', lineHeight: 1.4 }}>{q}</span>
        <span style={{ flexShrink: 0, width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.25s', transform: open ? 'rotate(45deg)' : 'rotate(0)' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2A6496" strokeWidth="1.5">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
        </span>
      </button>
      <div style={{ maxHeight: open ? 400 : 0, overflow: 'hidden', transition: 'max-height 0.3s ease' }}>
        <p style={{ fontSize: '0.875rem', fontWeight: 300, color: '#4A5568', lineHeight: 1.8, margin: '0 0 20px', paddingRight: 32 }}>{a}</p>
      </div>
    </div>
  )
}

export default function FAQPage() {
  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '60px 40px 80px' }}>
      <div style={{ textAlign: 'center', marginBottom: 56 }}>
        <p className="section-label" style={{ margin: '0 0 10px' }}>Help Centre</p>
        <h1 style={{ fontFamily: '"Libre Baskerville", serif', fontSize: '2.4rem', fontWeight: 400, margin: '0 0 12px', letterSpacing: '-0.03em' }}>
          Frequently Asked Questions
        </h1>
        <p style={{ fontSize: '0.9rem', color: '#6A7F8E', lineHeight: 1.7 }}>
          Can&apos;t find what you&apos;re looking for?{' '}
          <a href="/contact" style={{ color: '#2A6496' }}>Contact us</a> and we&apos;ll help.
        </p>
      </div>

      <div>
        {FAQS.map((faq, i) => <AccordionItem key={i} q={faq.q} a={faq.a} />)}
      </div>
    </div>
  )
}

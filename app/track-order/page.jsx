'use client'
import { useState } from 'react'

export default function TrackOrderPage() {
  const [orderNum, setOrderNum] = useState('')
  const [tracked, setTracked] = useState(false)

  return (
    <div style={{ maxWidth: 560, margin: '0 auto', padding: '80px 40px', textAlign: 'center' }}>
      <p className="section-label" style={{ margin: '0 0 10px' }}>After Your Order</p>
      <h1 style={{ fontFamily: '"Libre Baskerville", serif', fontSize: '2.4rem', fontWeight: 400, margin: '0 0 12px', letterSpacing: '-0.03em' }}>Track Your Order</h1>
      <p style={{ fontSize: '0.875rem', color: '#6A7F8E', margin: '0 0 36px', lineHeight: 1.7 }}>Enter your order number (e.g. TOM-123456) to check your delivery status.</p>
      <div style={{ display: 'flex', gap: 0, marginBottom: 16 }}>
        <input type="text" value={orderNum} onChange={e => setOrderNum(e.target.value)} placeholder="TOM-123456" style={{ flex: 1, padding: '13px 16px', fontFamily: "'Jost', sans-serif", fontSize: '0.875rem', border: '1px solid #E5E9EC', outline: 'none' }} />
        <button className="btn-primary" style={{ whiteSpace: 'nowrap' }} onClick={() => orderNum && setTracked(true)}>Track</button>
      </div>
      {tracked && (
        <div style={{ background: '#F7F4EF', padding: '20px 24px', textAlign: 'left' }}>
          <p style={{ fontSize: '0.875rem', fontWeight: 500, margin: '0 0 8px' }}>Order {orderNum}</p>
          <p style={{ fontSize: '0.8rem', color: '#7D9B77', margin: 0 }}>✓ Out for delivery — expected today</p>
        </div>
      )}
    </div>
  )
}

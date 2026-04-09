'use client'
import { useState } from 'react'

export default function RewardsPage() {
  const [email, setEmail] = useState('')
  const [joined, setJoined] = useState(false)

  return (
    <div style={{ background: '#1C2B3A', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 40px' }}>
      <div style={{ maxWidth: 520, textAlign: 'center' }}>
        <p className="section-label" style={{ color: 'rgba(212,234,245,0.7)', margin: '0 0 16px' }}>Membership</p>
        <h1 style={{ fontFamily: '"Libre Baskerville", serif', fontSize: '2.4rem', fontWeight: 400, color: '#fff', lineHeight: 1.1, letterSpacing: '-0.03em', margin: '0 0 16px' }}>Oil Rewards</h1>
        <p style={{ fontSize: '0.9rem', fontWeight: 300, color: 'rgba(255,255,255,0.65)', lineHeight: 1.8, margin: '0 0 36px' }}>
          Join free. Earn points on every purchase. Unlock exclusive early access and free delivery anywhere in Pakistan.
        </p>
        {joined ? (
          <div style={{ background: 'rgba(125,155,119,0.2)', border: '1px solid #7D9B77', padding: '20px 28px', color: '#7D9B77' }}>
            <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 500 }}>You&apos;re in! Welcome to Oil Rewards.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: 0 }}>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email address" style={{ flex: 1, padding: '14px 20px', fontFamily: "'Jost', sans-serif", fontSize: '0.875rem', border: '1px solid rgba(255,255,255,0.25)', background: 'rgba(255,255,255,0.08)', color: '#fff', outline: 'none' }} />
            <button className="btn-primary" style={{ whiteSpace: 'nowrap', background: '#2A6496', padding: '14px 24px' }} onClick={() => email && setJoined(true)}>Join Free</button>
          </div>
        )}
      </div>
    </div>
  )
}

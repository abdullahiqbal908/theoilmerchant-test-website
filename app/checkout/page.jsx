'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/lib/products'
import { trackBeginCheckout, trackPurchase } from '@/lib/analytics'

const CITIES = ['Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Peshawar', 'Quetta', 'Other']

function generateOrderNumber() {
  return 'TOM-' + Math.floor(1000 + Math.random() * 9000)
}

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart()
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', address: '', city: '', notes: '' })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [orderPlaced, setOrderPlaced] = useState(null)

  // Track begin_checkout once on mount if cart has items
  useEffect(() => {
    if (cartItems.length > 0) trackBeginCheckout(cartItems, cartTotal + (cartTotal >= 5000 ? 0 : 250))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const deliveryFee = cartTotal >= 5000 ? 0 : 250
  const total = cartTotal + deliveryFee

  const validate = () => {
    const e = {}
    if (!form.fullName.trim()) e.fullName = 'Full name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email address'
    if (!form.phone.trim()) e.phone = 'Phone number is required'
    else if (!/^03\d{9}$/.test(form.phone.replace(/[\s\-]/g, ''))) e.phone = 'Must start with 03 and be 11 digits (e.g. 03001234567)'
    if (!form.address.trim()) e.address = 'Delivery address is required'
    if (!form.city) e.city = 'Please select a city'
    return e
  }

  const setField = (key, value) => {
    setForm(f => ({ ...f, [key]: value }))
    if (errors[key]) setErrors(e => ({ ...e, [key]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    setSubmitting(true)
    setSubmitError('')

    try {
      const orderNumber = generateOrderNumber()
      const orderItems = cartItems.map(item => ({
        name: item.name,
        slug: item.slug,
        quantity: item.quantity,
        price: item.price,
        size: item.size,
        subtotal: item.price * item.quantity,
      }))

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          order_number: orderNumber,
          customer_name: form.fullName,
          customer_email: form.email,
          customer_phone: form.phone,
          delivery_address: form.address,
          city: form.city,
          notes: form.notes || null,
          items: orderItems,
          subtotal: cartTotal,
          delivery_fee: deliveryFee,
          total,
          payment_method: 'Cash on Delivery',
          status: 'pending',
        }),
      })

      if (!res.ok) {
        const body = await res.json()
        throw new Error(body.error || 'Failed to place order')
      }

      clearCart()
      trackPurchase(orderNumber, total, orderItems)
      setOrderPlaced({
        orderNumber,
        items: [...cartItems],
        subtotal: cartTotal,
        deliveryFee,
        total,
        form: { ...form },
      })
    } catch (err) {
      setSubmitError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const inputStyle = (key) => ({
    width: '100%', padding: '12px 14px', fontFamily: "'Jost', sans-serif", fontSize: '0.875rem',
    border: `1px solid ${errors[key] ? '#E53E3E' : '#E5E9EC'}`, color: '#1C2B3A', outline: 'none', background: '#fff',
  })

  // ── CONFIRMATION SCREEN ──────────────────────────────────────────────────
  if (orderPlaced) {
    return (
      <div style={{ maxWidth: 640, margin: '0 auto', padding: '60px 40px 80px' }}>
        {/* Green check */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#7D9B77', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <p className="section-label" style={{ margin: '0 0 10px' }}>Order Placed Successfully!</p>
          <h1 style={{ fontFamily: '"Libre Baskerville", serif', fontSize: '2rem', fontWeight: 400, margin: '0 0 8px', letterSpacing: '-0.02em' }}>
            Thank you, {orderPlaced.form.fullName.split(' ')[0]}!
          </h1>
          <p style={{ fontSize: '1.1rem', fontWeight: 700, color: '#2A6496', margin: '0 0 8px', letterSpacing: '0.02em' }}>
            #{orderPlaced.orderNumber}
          </p>
          <p style={{ fontSize: '0.875rem', color: '#6A7F8E', lineHeight: 1.7 }}>
            A confirmation email has been sent to <strong style={{ color: '#1C2B3A' }}>{orderPlaced.form.email}</strong>
          </p>
        </div>

        {/* Order items */}
        <div style={{ background: '#F7F4EF', padding: 24, marginBottom: 20 }}>
          <h3 style={{ fontFamily: '"Libre Baskerville", serif', fontSize: '1rem', fontWeight: 400, margin: '0 0 16px' }}>Order Summary</h3>
          {orderPlaced.items.map(item => (
            <div key={item.key} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: '0.8rem', color: '#4A5568' }}>{item.name} ({item.size}) × {item.quantity}</span>
              <span style={{ fontSize: '0.8rem', fontWeight: 500 }}>{formatPrice(item.price * item.quantity)}</span>
            </div>
          ))}
          <div style={{ borderTop: '1px solid #E5E9EC', marginTop: 12, paddingTop: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: '0.8rem', color: '#6A7F8E' }}>Subtotal</span>
              <span style={{ fontSize: '0.8rem' }}>{formatPrice(orderPlaced.subtotal)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ fontSize: '0.8rem', color: '#6A7F8E' }}>Delivery</span>
              <span style={{ fontSize: '0.8rem', color: orderPlaced.deliveryFee === 0 ? '#7D9B77' : '#1C2B3A' }}>
                {orderPlaced.deliveryFee === 0 ? 'Free' : formatPrice(orderPlaced.deliveryFee)}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 12, borderTop: '1px solid #E5E9EC' }}>
              <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Total</span>
              <span style={{ fontWeight: 700, fontSize: '1.1rem', color: '#1C2B3A' }}>{formatPrice(orderPlaced.total)}</span>
            </div>
          </div>
        </div>

        {/* Delivery + payment info */}
        <div style={{ background: '#EEF5FA', padding: 20, marginBottom: 20, fontSize: '0.8rem', lineHeight: 1.8, color: '#2A6496' }}>
          <strong>Delivery to:</strong> {orderPlaced.form.address}, {orderPlaced.form.city}<br />
          <strong>Payment: Cash on Delivery</strong> — please keep <strong>{formatPrice(orderPlaced.total)}</strong> ready when your order arrives<br />
          <strong>Estimated delivery: 3-5 business days across Pakistan</strong>
        </div>

        <div style={{ textAlign: 'center' }}>
          <Link href="/" className="btn-primary" style={{ display: 'inline-block' }}>Continue Shopping</Link>
        </div>
      </div>
    )
  }

  // ── EMPTY CART ───────────────────────────────────────────────────────────
  if (cartItems.length === 0) {
    return (
      <div style={{ maxWidth: 480, margin: '80px auto', padding: '0 40px', textAlign: 'center' }}>
        <p style={{ fontFamily: '"Libre Baskerville", serif', fontSize: '1.4rem', color: '#1C2B3A', marginBottom: 12 }}>Your cart is empty</p>
        <p style={{ fontSize: '0.875rem', color: '#6A7F8E', marginBottom: 28 }}>Add some oils before checking out.</p>
        <Link href="/all-oils" className="btn-primary">Shop Now</Link>
      </div>
    )
  }

  // ── CHECKOUT FORM ────────────────────────────────────────────────────────
  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 40px 80px' }}>
      <div style={{ marginBottom: 40 }}>
        <p className="section-label" style={{ margin: '0 0 8px' }}>Almost There</p>
        <h1 style={{ fontFamily: '"Libre Baskerville", serif', fontSize: '2rem', fontWeight: 400, margin: 0, letterSpacing: '-0.03em' }}>Checkout</h1>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="checkout-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: 56 }}>

          {/* LEFT: Customer form */}
          <div>
            <h2 style={{ fontFamily: '"Libre Baskerville", serif', fontSize: '1.1rem', fontWeight: 400, margin: '0 0 20px', paddingBottom: 12, borderBottom: '1px solid #E5E9EC' }}>Contact Information</h2>

            <div style={{ marginBottom: 14 }}>
              <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6A7F8E', marginBottom: 6 }}>Full Name *</label>
              <input type="text" placeholder="Fatima Ahmed" style={inputStyle('fullName')} value={form.fullName} onChange={e => setField('fullName', e.target.value)} />
              {errors.fullName && <p style={{ fontSize: '0.72rem', color: '#E53E3E', margin: '4px 0 0' }}>{errors.fullName}</p>}
            </div>

            <div style={{ marginBottom: 14 }}>
              <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6A7F8E', marginBottom: 6 }}>Email Address *</label>
              <input type="email" placeholder="fatima@example.com" style={inputStyle('email')} value={form.email} onChange={e => setField('email', e.target.value)} />
              {errors.email && <p style={{ fontSize: '0.72rem', color: '#E53E3E', margin: '4px 0 0' }}>{errors.email}</p>}
            </div>

            <div style={{ marginBottom: 14 }}>
              <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6A7F8E', marginBottom: 6 }}>Phone Number * (starts with 03, 11 digits)</label>
              <input type="tel" placeholder="03001234567" style={inputStyle('phone')} value={form.phone} onChange={e => setField('phone', e.target.value)} />
              {errors.phone && <p style={{ fontSize: '0.72rem', color: '#E53E3E', margin: '4px 0 0' }}>{errors.phone}</p>}
            </div>

            <div style={{ marginBottom: 14 }}>
              <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6A7F8E', marginBottom: 6 }}>Full Delivery Address *</label>
              <textarea rows={3} placeholder="House no., street, area, landmark..." style={{ ...inputStyle('address'), resize: 'vertical' }} value={form.address} onChange={e => setField('address', e.target.value)} />
              {errors.address && <p style={{ fontSize: '0.72rem', color: '#E53E3E', margin: '4px 0 0' }}>{errors.address}</p>}
            </div>

            <div style={{ marginBottom: 14 }}>
              <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6A7F8E', marginBottom: 6 }}>City *</label>
              <select style={{ ...inputStyle('city'), appearance: 'none', backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%236A7F8E' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}
                value={form.city} onChange={e => setField('city', e.target.value)}>
                <option value="">Select city...</option>
                {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              {errors.city && <p style={{ fontSize: '0.72rem', color: '#E53E3E', margin: '4px 0 0' }}>{errors.city}</p>}
            </div>

            <div style={{ marginBottom: 32 }}>
              <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6A7F8E', marginBottom: 6 }}>Order Notes (optional)</label>
              <textarea rows={2} placeholder="Any special instructions..." style={{ ...inputStyle('notes'), resize: 'vertical' }} value={form.notes} onChange={e => setField('notes', e.target.value)} />
            </div>

            {/* Payment method — COD only */}
            <h2 style={{ fontFamily: '"Libre Baskerville", serif', fontSize: '1.1rem', fontWeight: 400, margin: '0 0 16px', paddingBottom: 12, borderBottom: '1px solid #E5E9EC' }}>Payment Method</h2>
            <div style={{ padding: '14px 16px', border: '1px solid #2A6496', background: '#F0F7FF', marginBottom: 32 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2A6496" strokeWidth="1.5">
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/>
                </svg>
                <div>
                  <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: 600, color: '#1C2B3A' }}>Cash on Delivery (COD)</p>
                  <p style={{ margin: '2px 0 0', fontSize: '0.75rem', color: '#2A6496' }}>Pay in cash when your order arrives.</p>
                </div>
              </div>
            </div>

            {submitError && (
              <div style={{ background: '#FFF5F5', border: '1px solid #FEB2B2', padding: '12px 16px', marginBottom: 16, color: '#C53030', fontSize: '0.8rem' }}>
                {submitError}
              </div>
            )}

            <button
              type="submit"
              className="btn-primary"
              disabled={submitting}
              style={{ width: '100%', textAlign: 'center', padding: '16px 32px', fontSize: '0.8rem', opacity: submitting ? 0.7 : 1 }}
            >
              {submitting ? 'Placing Order…' : 'Place Order'}
            </button>
          </div>

          {/* RIGHT: Order summary */}
          <div>
            <div style={{ background: '#F7F4EF', padding: 28, position: 'sticky', top: 120 }}>
              <h2 style={{ fontFamily: '"Libre Baskerville", serif', fontSize: '1.1rem', fontWeight: 400, margin: '0 0 20px', paddingBottom: 16, borderBottom: '1px solid #E5E9EC' }}>Order Summary</h2>

              {cartItems.map(item => (
                <div key={item.key} style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
                  <div style={{ width: 52, height: 68, flexShrink: 0, overflow: 'hidden', background: '#EEF5FA', position: 'relative' }}>
                    <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <span style={{ position: 'absolute', top: -6, right: -6, background: '#1C2B3A', color: '#fff', fontSize: '0.6rem', fontWeight: 700, width: 18, height: 18, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{item.quantity}</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: '0 0 2px', fontSize: '0.8rem', fontWeight: 500 }}>{item.name}</p>
                    <p style={{ margin: 0, fontSize: '0.72rem', color: '#6A7F8E' }}>{item.size}</p>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: 500 }}>{formatPrice(item.price * item.quantity)}</p>
                </div>
              ))}

              <div style={{ borderTop: '1px solid #E5E9EC', marginTop: 16, paddingTop: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: '0.8rem', color: '#6A7F8E' }}>Subtotal</span>
                  <span style={{ fontSize: '0.8rem' }}>{formatPrice(cartTotal)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                  <span style={{ fontSize: '0.8rem', color: '#6A7F8E' }}>Delivery</span>
                  <span style={{ fontSize: '0.8rem', color: deliveryFee === 0 ? '#7D9B77' : '#1C2B3A', fontWeight: 500 }}>
                    {deliveryFee === 0 ? 'Free' : formatPrice(deliveryFee)}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 12, borderTop: '1px solid #E5E9EC' }}>
                  <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Total</span>
                  <span style={{ fontWeight: 700, fontSize: '1.1rem', color: '#1C2B3A' }}>{formatPrice(total)}</span>
                </div>
              </div>

              <div style={{ marginTop: 16, padding: '12px 14px', background: '#1C2B3A', color: 'rgba(255,255,255,0.85)', fontSize: '0.75rem', textAlign: 'center', lineHeight: 1.6 }}>
                Payment: Cash on Delivery
              </div>

              {deliveryFee > 0 && (
                <p style={{ fontSize: '0.72rem', color: '#7D9B77', margin: '12px 0 0', textAlign: 'center' }}>
                  Add {formatPrice(5000 - cartTotal)} more for free delivery
                </p>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

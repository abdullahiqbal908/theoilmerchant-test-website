'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/data/products'

const CITIES = [
  { name: 'Karachi', province: 'Sindh' },
  { name: 'Lahore', province: 'Punjab' },
  { name: 'Islamabad', province: 'Islamabad Capital Territory' },
  { name: 'Rawalpindi', province: 'Punjab' },
  { name: 'Faisalabad', province: 'Punjab' },
  { name: 'Peshawar', province: 'Khyber Pakhtunkhwa' },
  { name: 'Quetta', province: 'Balochistan' },
  { name: 'Multan', province: 'Punjab' },
  { name: 'Other', province: '' },
]

function generateOrderNumber() {
  return 'TOM-' + Math.floor(100000 + Math.random() * 900000)
}

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart()
  const [form, setForm] = useState({
    fullName: '', email: '', phone: '', address: '', city: '', province: '', paymentMethod: 'cod',
  })
  const [errors, setErrors] = useState({})
  const [orderPlaced, setOrderPlaced] = useState(null)

  const deliveryFee = cartTotal >= 5000 ? 0 : 250
  const total = cartTotal + deliveryFee

  const validate = () => {
    const e = {}
    if (!form.fullName.trim()) e.fullName = 'Full name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email address'
    if (!form.phone.trim()) e.phone = 'Phone number is required'
    else if (!/^(03\d{2}[-\s]?\d{7}|0\d{9,10})$/.test(form.phone.replace(/\s/g, ''))) e.phone = 'Enter a valid Pakistani number (e.g. 0300-1234567)'
    if (!form.address.trim()) e.address = 'Delivery address is required'
    if (!form.city) e.city = 'Please select a city'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length === 0) {
      const orderNumber = generateOrderNumber()
      setOrderPlaced({ orderNumber, items: [...cartItems], total, form: { ...form } })
      clearCart()
    }
  }

  const setField = (key, value) => {
    setForm(f => {
      const updated = { ...f, [key]: value }
      if (key === 'city') {
        const city = CITIES.find(c => c.name === value)
        updated.province = city?.province || ''
      }
      return updated
    })
    if (errors[key]) setErrors(e => ({ ...e, [key]: '' }))
  }

  const inputStyle = (key) => ({
    width: '100%', padding: '12px 14px', fontFamily: "'Jost', sans-serif", fontSize: '0.875rem',
    border: `1px solid ${errors[key] ? '#E53E3E' : '#E5E9EC'}`, color: '#1C2B3A', outline: 'none', background: '#fff',
  })

  // Order confirmed screen
  if (orderPlaced) {
    return (
      <div style={{ maxWidth: 640, margin: '0 auto', padding: '60px 40px 80px', textAlign: 'center' }}>
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#7D9B77', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px' }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <p className="section-label" style={{ margin: '0 0 10px' }}>Order Confirmed</p>
        <h1 style={{ fontFamily: '"Libre Baskerville", serif', fontSize: '2rem', fontWeight: 400, margin: '0 0 8px', letterSpacing: '-0.02em' }}>Thank you, {orderPlaced.form.fullName.split(' ')[0]}!</h1>
        <p style={{ fontSize: '0.875rem', color: '#6A7F8E', margin: '0 0 32px', lineHeight: 1.7 }}>
          Your order <strong style={{ color: '#1C2B3A' }}>{orderPlaced.orderNumber}</strong> has been placed successfully.
          We&apos;ll send a confirmation to <strong style={{ color: '#1C2B3A' }}>{orderPlaced.form.email}</strong>.
        </p>

        {/* Order summary */}
        <div style={{ background: '#F7F4EF', padding: 24, marginBottom: 28, textAlign: 'left' }}>
          <h3 style={{ fontFamily: '"Libre Baskerville", serif', fontSize: '1rem', fontWeight: 400, margin: '0 0 16px' }}>Order Summary</h3>
          {orderPlaced.items.map(item => (
            <div key={item.key} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: '0.8rem', color: '#4A5568' }}>{item.name} × {item.quantity}</span>
              <span style={{ fontSize: '0.8rem', fontWeight: 500 }}>{formatPrice(item.price * item.quantity)}</span>
            </div>
          ))}
          <div style={{ borderTop: '1px solid #E5E9EC', marginTop: 12, paddingTop: 12, display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Total</span>
            <span style={{ fontWeight: 700, fontSize: '1rem', color: '#2A6496' }}>{formatPrice(orderPlaced.total)}</span>
          </div>
        </div>

        <div style={{ marginBottom: 16, padding: '16px', background: '#EEF5FA', fontSize: '0.8rem', color: '#2A6496', lineHeight: 1.7, textAlign: 'left' }}>
          <strong>Delivery to:</strong> {orderPlaced.form.address}, {orderPlaced.form.city}, {orderPlaced.form.province}<br />
          <strong>Payment:</strong> {orderPlaced.form.paymentMethod === 'cod' ? 'Cash on Delivery' : orderPlaced.form.paymentMethod === 'bank' ? 'Bank Transfer' : 'Easypaisa/JazzCash'}
        </div>

        <Link href="/" className="btn-primary" style={{ display: 'inline-block' }}>Continue Shopping</Link>
      </div>
    )
  }

  // Empty cart
  if (cartItems.length === 0) {
    return (
      <div style={{ maxWidth: 480, margin: '80px auto', padding: '0 40px', textAlign: 'center' }}>
        <p style={{ fontFamily: '"Libre Baskerville", serif', fontSize: '1.4rem', color: '#1C2B3A', marginBottom: 12 }}>Your cart is empty</p>
        <p style={{ fontSize: '0.875rem', color: '#6A7F8E', marginBottom: 28 }}>Add some oils before checking out.</p>
        <Link href="/all-oils" className="btn-primary">Shop Now</Link>
      </div>
    )
  }

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

            <div className="checkout-form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6A7F8E', marginBottom: 6 }}>Full Name *</label>
                <input type="text" placeholder="Fatima Ahmed" style={inputStyle('fullName')} value={form.fullName} onChange={e => setField('fullName', e.target.value)} />
                {errors.fullName && <p style={{ fontSize: '0.72rem', color: '#E53E3E', margin: '4px 0 0' }}>{errors.fullName}</p>}
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6A7F8E', marginBottom: 6 }}>Email *</label>
                <input type="email" placeholder="fatima@example.com" style={inputStyle('email')} value={form.email} onChange={e => setField('email', e.target.value)} />
                {errors.email && <p style={{ fontSize: '0.72rem', color: '#E53E3E', margin: '4px 0 0' }}>{errors.email}</p>}
              </div>
            </div>

            <div style={{ marginBottom: 14 }}>
              <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6A7F8E', marginBottom: 6 }}>Phone Number *</label>
              <input type="tel" placeholder="0300-1234567" style={inputStyle('phone')} value={form.phone} onChange={e => setField('phone', e.target.value)} />
              {errors.phone && <p style={{ fontSize: '0.72rem', color: '#E53E3E', margin: '4px 0 0' }}>{errors.phone}</p>}
            </div>

            <div style={{ marginBottom: 14 }}>
              <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6A7F8E', marginBottom: 6 }}>Delivery Address *</label>
              <textarea rows={3} placeholder="House no., street, area, landmark..." style={{ ...inputStyle('address'), resize: 'vertical' }} value={form.address} onChange={e => setField('address', e.target.value)} />
              {errors.address && <p style={{ fontSize: '0.72rem', color: '#E53E3E', margin: '4px 0 0' }}>{errors.address}</p>}
            </div>

            <div className="checkout-form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 32 }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6A7F8E', marginBottom: 6 }}>City *</label>
                <select style={{ ...inputStyle('city'), appearance: 'none', backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%236A7F8E' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}
                  value={form.city} onChange={e => setField('city', e.target.value)}>
                  <option value="">Select city...</option>
                  {CITIES.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                </select>
                {errors.city && <p style={{ fontSize: '0.72rem', color: '#E53E3E', margin: '4px 0 0' }}>{errors.city}</p>}
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6A7F8E', marginBottom: 6 }}>Province</label>
                <input type="text" readOnly value={form.province} placeholder="Auto-filled" style={{ ...inputStyle('province'), background: '#F7F7F7', color: '#6A7F8E' }} />
              </div>
            </div>

            {/* Payment method */}
            <h2 style={{ fontFamily: '"Libre Baskerville", serif', fontSize: '1.1rem', fontWeight: 400, margin: '0 0 20px', paddingBottom: 12, borderBottom: '1px solid #E5E9EC' }}>Payment Method</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
              {[
                { value: 'cod', label: 'Cash on Delivery (COD)', desc: 'Pay in cash when your order arrives.' },
                { value: 'bank', label: 'Bank Transfer', desc: 'Allied Bank — Account: 0010-00123456-7' },
                { value: 'wallet', label: 'Easypaisa / JazzCash', desc: 'Send to: 0300-1234567 (The Oil Merchant)' },
              ].map(method => (
                <label key={method.value} style={{ display: 'flex', gap: 12, padding: '14px 16px', border: `1px solid ${form.paymentMethod === method.value ? '#2A6496' : '#E5E9EC'}`, cursor: 'pointer', background: form.paymentMethod === method.value ? '#F0F7FF' : '#fff', transition: 'border-color 0.2s, background 0.2s' }}>
                  <input type="radio" name="payment" value={method.value} checked={form.paymentMethod === method.value} onChange={() => setField('paymentMethod', method.value)} style={{ marginTop: 2, accentColor: '#2A6496' }} />
                  <div>
                    <p style={{ margin: '0 0 4px', fontSize: '0.875rem', fontWeight: 500 }}>{method.label}</p>
                    {form.paymentMethod === method.value && (
                      <p style={{ margin: 0, fontSize: '0.8rem', color: '#2A6496' }}>{method.desc}</p>
                    )}
                  </div>
                </label>
              ))}
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', textAlign: 'center', padding: '16px 32px', fontSize: '0.8rem' }}>
              Place Order
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

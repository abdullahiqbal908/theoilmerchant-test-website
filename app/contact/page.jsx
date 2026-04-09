'use client'

import { useState } from 'react'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const subjects = ['General Enquiry', 'Order Issue', 'Returns & Refunds', 'Product Question', 'Wholesale', 'Other']

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Full name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Please enter a valid email'
    if (!form.subject) e.subject = 'Please select a subject'
    if (!form.message.trim()) e.message = 'Message is required'
    else if (form.message.trim().length < 20) e.message = 'Message must be at least 20 characters'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length === 0) setSubmitted(true)
  }

  if (submitted) {
    return (
      <div style={{ maxWidth: 560, margin: '80px auto', padding: '0 40px', textAlign: 'center' }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#7D9B77', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <h2 style={{ fontFamily: '"Libre Baskerville", serif', fontSize: '1.8rem', fontWeight: 400, margin: '0 0 12px' }}>Message Sent</h2>
        <p style={{ fontSize: '0.9rem', color: '#6A7F8E', lineHeight: 1.7, margin: '0 0 32px' }}>
          Thank you, {form.name}. We&apos;ll get back to you within 24 hours at <strong>{form.email}</strong>.
        </p>
        <button className="btn-outline" onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', subject: '', message: '' }) }}>
          Send Another Message
        </button>
      </div>
    )
  }

  const field = (key) => ({
    value: form[key],
    onChange: e => { setForm(f => ({ ...f, [key]: e.target.value })); if (errors[key]) setErrors(e => ({ ...e, [key]: '' })) },
  })

  const inputStyle = (key) => ({
    width: '100%', padding: '12px 14px', fontFamily: "'Jost', sans-serif", fontSize: '0.875rem',
    border: `1px solid ${errors[key] ? '#E53E3E' : '#E5E9EC'}`, color: '#1C2B3A', outline: 'none',
    transition: 'border-color 0.2s',
  })

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '60px 40px 80px' }}>
      <div style={{ textAlign: 'center', marginBottom: 56 }}>
        <p className="section-label" style={{ margin: '0 0 10px' }}>Get in Touch</p>
        <h1 style={{ fontFamily: '"Libre Baskerville", serif', fontSize: '2.4rem', fontWeight: 400, margin: '0 0 12px', letterSpacing: '-0.03em' }}>Contact Us</h1>
        <p style={{ fontSize: '0.9rem', color: '#6A7F8E', lineHeight: 1.7 }}>We&apos;re here to help. Reach out and we&apos;ll respond within 24 hours.</p>
      </div>

      <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: 64 }}>
        {/* Form */}
        <form onSubmit={handleSubmit} noValidate>
          <div className="contact-form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6A7F8E', marginBottom: 6 }}>
                Full Name <span style={{ color: '#E53E3E' }}>*</span>
              </label>
              <input type="text" placeholder="Fatima Ahmed" style={inputStyle('name')} {...field('name')} />
              {errors.name && <p style={{ fontSize: '0.72rem', color: '#E53E3E', margin: '4px 0 0' }}>{errors.name}</p>}
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6A7F8E', marginBottom: 6 }}>
                Email <span style={{ color: '#E53E3E' }}>*</span>
              </label>
              <input type="email" placeholder="fatima@example.com" style={inputStyle('email')} {...field('email')} />
              {errors.email && <p style={{ fontSize: '0.72rem', color: '#E53E3E', margin: '4px 0 0' }}>{errors.email}</p>}
            </div>
          </div>

          <div className="contact-form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6A7F8E', marginBottom: 6 }}>
                Phone <span style={{ color: '#6A7F8E', fontWeight: 400 }}>(optional)</span>
              </label>
              <input type="tel" placeholder="0300-1234567" style={inputStyle('phone')} {...field('phone')} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6A7F8E', marginBottom: 6 }}>
                Subject <span style={{ color: '#E53E3E' }}>*</span>
              </label>
              <select style={{ ...inputStyle('subject'), appearance: 'none', backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%236A7F8E' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', background: '#fff' }} {...field('subject')}>
                <option value="">Select a subject...</option>
                {subjects.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              {errors.subject && <p style={{ fontSize: '0.72rem', color: '#E53E3E', margin: '4px 0 0' }}>{errors.subject}</p>}
            </div>
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6A7F8E', marginBottom: 6 }}>
              Message <span style={{ color: '#E53E3E' }}>*</span>
            </label>
            <textarea
              rows={6}
              placeholder="How can we help you?"
              style={{ ...inputStyle('message'), resize: 'vertical', minHeight: 140 }}
              {...field('message')}
            />
            {errors.message && <p style={{ fontSize: '0.72rem', color: '#E53E3E', margin: '4px 0 0' }}>{errors.message}</p>}
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%', textAlign: 'center' }}>
            Send Message
          </button>
        </form>

        {/* Contact info */}
        <div>
          <div style={{ background: '#F7F4EF', padding: 32, marginBottom: 24 }}>
            <h3 style={{ fontFamily: '"Libre Baskerville", serif', fontSize: '1rem', fontWeight: 400, margin: '0 0 20px' }}>Contact Information</h3>
            {[
              { icon: '📱', label: 'WhatsApp', value: '+92 300 123 4567' },
              { icon: '✉️', label: 'Email', value: 'hello@theoilmerchant.pk' },
              { icon: '📍', label: 'Based in', value: 'Lahore, Pakistan' },
              { icon: '⏰', label: 'Response time', value: 'Within 24 hours' },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 16 }}>
                <span style={{ fontSize: '1.1rem', marginTop: 1 }}>{item.icon}</span>
                <div>
                  <p style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6A7F8E', margin: '0 0 2px' }}>{item.label}</p>
                  <p style={{ fontSize: '0.875rem', color: '#1C2B3A', margin: 0 }}>{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: '#1C2B3A', padding: 32 }}>
            <h3 style={{ fontFamily: '"Libre Baskerville", serif', fontSize: '1rem', fontWeight: 400, color: '#fff', margin: '0 0 16px' }}>Follow Us</h3>
            <div style={{ display: 'flex', gap: 16 }}>
              {['Instagram', 'Facebook', 'TikTok'].map(s => (
                <a key={s} href="#" style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.6)', textDecoration: 'none', letterSpacing: '0.08em', textTransform: 'uppercase' }}
                  onMouseOver={e => e.currentTarget.style.color = '#fff'}
                  onMouseOut={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
                >
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

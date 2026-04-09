'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import ProductCard from '@/components/ProductCard'
import { products } from '@/data/products'

const TABS = ['Featured', 'Essential Oils', 'Carrier Oils', 'Hair Care', 'Butters & Waxes']

const CATEGORY_CARDS = [
  {
    label: 'Featured',
    count: '11 Oils',
    href: '/collections/featured',
    gradient: 'linear-gradient(135deg, #2A6496 0%, #1C2B3A 100%)',
    iconColor: 'rgba(212,234,245,0.9)',
    countColor: 'rgba(212,234,245,0.7)',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(212,234,245,0.9)" strokeWidth="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  },
  {
    label: 'Essential Oils',
    count: '23 Oils',
    href: '/collections/essential-oils',
    gradient: 'linear-gradient(135deg, #5B9EC9 0%, #2A6496 100%)',
    iconColor: 'rgba(255,255,255,0.85)',
    countColor: 'rgba(255,255,255,0.65)',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  },
  {
    label: 'Carrier Oils',
    count: '14 Oils',
    href: '/collections/carrier-oils',
    gradient: 'linear-gradient(135deg, #7D9B77 0%, #4a6b45 100%)',
    iconColor: 'rgba(255,255,255,0.85)',
    countColor: 'rgba(255,255,255,0.65)',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="1.5"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/></svg>,
  },
  {
    label: 'Butters & Waxes',
    count: '3 Products',
    href: '/collections/butters-waxes',
    gradient: 'linear-gradient(135deg, #C8A96E 0%, #8a6a30 100%)',
    iconColor: 'rgba(255,255,255,0.85)',
    countColor: 'rgba(255,255,255,0.65)',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>,
  },
]

function getTabProducts(tab) {
  if (tab === 'Featured') return products.filter(p => p.subcategory === 'Featured')
  if (tab === 'Essential Oils') return products.filter(p => p.category === 'Essential Oils')
  if (tab === 'Carrier Oils') return products.filter(p => p.category === 'Carrier Oils')
  if (tab === 'Hair Care') return products.filter(p => p.category === 'Hair Care')
  if (tab === 'Butters & Waxes') return products.filter(p => p.category === 'Butters & Waxes')
  return products
}

const newArrivals = products.slice(0, 4)

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('Featured')
  const [dotIndex, setDotIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setDotIndex(i => (i + 1) % 3)
    }, 3500)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {/* ── HERO ── */}
      <section style={{ position: 'relative', width: '100%', height: 520, overflow: 'hidden', background: '#D4EAF5' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 70% 50%, #5B9EC9 0%, #2A6496 45%, #1C2B3A 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 80%, rgba(125,155,119,0.3) 0%, transparent 60%)' }} />

        {/* Product image right */}
        <div style={{ position: 'absolute', right: '8%', top: '50%', transform: 'translateY(-50%)', height: 400, width: 340, zIndex: 2 }}>
          <div style={{ position: 'absolute', inset: 0, borderRadius: 4, overflow: 'hidden' }}>
            <img src="https://placehold.co/340x400/D4EAF5/2A6496?text=Pure+Oil" alt="Product" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(42,100,150,0.2) 0%, transparent 60%)', mixBlendMode: 'multiply' }} />
          </div>
        </div>

        {/* Text left */}
        <div style={{ position: 'absolute', left: '8%', top: '50%', transform: 'translateY(-50%)', maxWidth: 460, zIndex: 2 }}>
          <p className="section-label" style={{ color: 'rgba(212,234,245,0.8)', margin: '0 0 16px' }}>Made in Pakistan</p>
          <h1 style={{ fontFamily: '"Libre Baskerville", serif', fontSize: '3.2rem', fontWeight: 400, color: '#fff', lineHeight: 1.1, letterSpacing: '-0.03em', margin: '0 0 12px' }}>
            Pure oils.<br /><em>Nothing else.</em>
          </h1>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.9rem', fontWeight: 300, color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, margin: '0 0 32px', maxWidth: 340 }}>
            Nature extracts the best. We deliver it to you — pure hair oils, honestly made, now delivered across Pakistan.
          </p>
          <Link href="/all-oils" className="btn-outline-white">Shop the Collection</Link>
        </div>

        {/* Carousel dots */}
        <div style={{ position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 8, zIndex: 2 }}>
          {[0, 1, 2].map(i => (
            <button
              key={i}
              onClick={() => setDotIndex(i)}
              style={{ width: 6, height: 6, borderRadius: '50%', background: dotIndex === i ? '#fff' : 'rgba(255,255,255,0.5)', border: 'none', cursor: 'pointer', padding: 0, transition: 'background 0.2s' }}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ── SHOP BY COLLECTION ── */}
      <section style={{ padding: '48px 40px 0', maxWidth: 1400, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
          <div>
            <p className="section-label" style={{ margin: '0 0 6px' }}>Explore</p>
            <h2 style={{ fontFamily: '"Libre Baskerville", serif', fontSize: '1.4rem', fontWeight: 400, margin: 0, letterSpacing: '-0.02em' }}>Shop by Collection</h2>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 0, flexWrap: 'wrap', marginBottom: 40 }}>
          {TABS.map(tab => (
            <button
              key={tab}
              className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </section>

      {/* ── FILTERED PRODUCT GRID ── */}
      <section id="shop" style={{ padding: '0 40px 56px', maxWidth: 1400, margin: '0 auto' }}>
        <div className="home-product-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
          {getTabProducts(activeTab).map(p => <ProductCard key={p.id} product={p} />)}
        </div>
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <Link href="/all-oils" className="btn-outline">View All Products</Link>
        </div>
      </section>

      <hr className="divider" />

      {/* ── EDITORIAL 1: Scalp Serum ── */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 480, maxWidth: '100%' }}>
        <div style={{ position: 'relative', overflow: 'hidden', background: '#D4EAF5' }}>
          <img src="https://placehold.co/720x480/5B9EC9/fff?text=Scalp+Ritual" alt="Scalp Ritual" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, transparent 60%, rgba(28,43,58,0.15))' }} />
        </div>
        <div style={{ background: '#1C2B3A', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '64px 72px' }}>
          <p className="section-label" style={{ color: 'rgba(212,234,245,0.7)', margin: '0 0 16px' }}>The Ritual Edit</p>
          <h2 style={{ fontFamily: '"Libre Baskerville", serif', fontSize: '2.2rem', fontWeight: 400, color: '#fff', lineHeight: 1.15, letterSpacing: '-0.03em', margin: '0 0 20px' }}>
            Scalp Serum<br /><em>Oil Treatment</em>
          </h2>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.875rem', fontWeight: 300, color: 'rgba(255,255,255,0.75)', lineHeight: 1.8, margin: '0 0 36px', maxWidth: 360 }}>
            Every drop, cold-pressed and consecrated. Our scalp treatment oils are sourced for efficacy — nothing added, nothing hidden.
          </p>
          <Link href="/scalp" className="btn-outline-white" style={{ alignSelf: 'flex-start' }}>Shop the Edit</Link>
        </div>
      </section>

      {/* ── EDITORIAL 2: Golden Hour ── */}
      <section style={{ position: 'relative', minHeight: 420, overflow: 'hidden', background: '#F7F4EF' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 420 }}>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '64px 72px 64px 10%' }}>
            <p className="section-label" style={{ margin: '0 0 14px', color: '#7D9B77' }}>Seasonal Harvest</p>
            <h2 style={{ fontFamily: '"Libre Baskerville", serif', fontSize: '2.4rem', fontWeight: 400, color: '#1C2B3A', lineHeight: 1.1, letterSpacing: '-0.03em', margin: '0 0 16px' }}>
              Golden Hour<br />Hair Oil
            </h2>
            <p style={{ fontSize: '0.875rem', fontWeight: 300, color: '#6A7F8E', lineHeight: 1.8, margin: '0 0 32px', maxWidth: 340 }}>
              Nature extracts the best. Limited harvest sunflower oil — golden-pressed for brilliant shine and deep conditioning in Pakistan&apos;s climate.
            </p>
            <Link href="/all-oils" className="btn-primary" style={{ alignSelf: 'flex-start' }}>Shop Now</Link>
          </div>
          <div style={{ position: 'relative', overflow: 'hidden', background: '#EEF5FA' }}>
            <img src="https://placehold.co/720x420/F7E8C0/B8860B?text=Golden+Oil" alt="Golden Hour Oil" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to left, transparent 60%, rgba(247,244,239,0.4))' }} />
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* ── NEW ARRIVALS ── */}
      <section style={{ padding: '56px 40px', maxWidth: 1400, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 36 }}>
          <div>
            <p className="section-label" style={{ margin: '0 0 6px' }}>Just Landed</p>
            <h2 style={{ fontFamily: '"Libre Baskerville", serif', fontSize: '1.4rem', fontWeight: 400, margin: 0, letterSpacing: '-0.02em' }}>New Arrivals</h2>
          </div>
          <Link href="/collections/new-arrivals" className="nav-link" style={{ fontSize: '0.72rem' }}>View All</Link>
        </div>
        <div className="home-product-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
          {newArrivals.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      <hr className="divider" />

      {/* ── SHOP BY CATEGORY ── */}
      <section style={{ padding: '56px 40px', maxWidth: 1400, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <p className="section-label" style={{ margin: '0 0 8px' }}>Explore the Range</p>
          <h2 style={{ fontFamily: '"Libre Baskerville", serif', fontSize: '1.4rem', fontWeight: 400, margin: 0, letterSpacing: '-0.02em' }}>Shop by Category</h2>
        </div>
        <div className="home-category-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {CATEGORY_CARDS.map(card => (
            <Link key={card.label} href={card.href} style={{ textDecoration: 'none', display: 'block' }} className="brand-card">
              <div style={{ position: 'relative', overflow: 'hidden', background: card.gradient, padding: '40px 24px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', minHeight: 200 }}>
                <div style={{ position: 'absolute', top: 24, right: 24, width: 48, height: 48, borderRadius: '50%', background: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {card.icon}
                </div>
                <p style={{ fontFamily: '"Libre Baskerville", serif', fontSize: '1.15rem', fontWeight: 700, color: '#fff', margin: '0 0 4px', textAlign: 'center' }}>{card.label}</p>
                <p style={{ fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: card.countColor, margin: 0 }}>{card.count}</p>
              </div>
            </Link>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <Link href="/all-oils" className="btn-outline">View All Oils</Link>
        </div>
      </section>

      {/* ── REWARDS CTA ── */}
      <section style={{ background: '#1C2B3A', padding: '72px 40px' }}>
        <div style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center' }}>
          <p className="section-label" style={{ color: 'rgba(212,234,245,0.7)', margin: '0 0 16px' }}>Membership</p>
          <h2 style={{ fontFamily: '"Libre Baskerville", serif', fontSize: '2rem', fontWeight: 400, color: '#fff', lineHeight: 1.2, letterSpacing: '-0.03em', margin: '0 0 12px' }}>
            Enroll in Oil Rewards<br />for Free Delivery
          </h2>
          <p style={{ fontSize: '0.875rem', fontWeight: 300, color: 'rgba(255,255,255,0.65)', margin: '0 0 36px', lineHeight: 1.7 }}>
            Join our community. Earn points on every purchase, unlock exclusive early access, and get free delivery anywhere in Pakistan.
          </p>
          <div style={{ display: 'flex', gap: 0, maxWidth: 420, margin: '0 auto' }}>
            <input
              type="email"
              placeholder="Your email address"
              style={{ flex: 1, padding: '14px 20px', fontFamily: "'Jost', sans-serif", fontSize: '0.875rem', border: '1px solid rgba(255,255,255,0.25)', background: 'rgba(255,255,255,0.08)', color: '#fff', outline: 'none' }}
            />
            <Link href="/rewards" className="btn-primary" style={{ whiteSpace: 'nowrap', background: '#2A6496', padding: '14px 24px' }}>Join Free</Link>
          </div>
          <div style={{ marginTop: 48, opacity: 0.06 }}>
            <img src="/brand_assets/Untitled_Artwork.png" alt="" style={{ height: 48, filter: 'invert(1)' }} />
          </div>
        </div>
      </section>

    </>
  )
}

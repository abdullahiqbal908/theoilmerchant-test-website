'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { getAllProducts } from '@/lib/products'

const NAV_LINKS = [
  { label: 'Hair Care', href: '/collections/hair-care' },
  { label: 'Essential Oils', href: '/collections/essential-oils' },
  { label: 'Carrier Oils', href: '/collections/carrier-oils' },
  { label: 'All Oils', href: '/all-oils' },
  { label: 'Rituals', href: '/rituals' },
  { label: 'Sale', href: '/collections/sale' },
]

export default function Header() {
  const { cartCount, openCart } = useCart()
  const router = useRouter()

  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [allProducts, setAllProducts] = useState([])
  const searchInputRef = useRef(null)

  // Load products once for search
  useEffect(() => {
    getAllProducts().then(setAllProducts).catch(() => {})
  }, [])

  // Search logic
  useEffect(() => {
    const q = searchQuery.trim().toLowerCase()
    if (!q) { setSearchResults([]); return }
    const results = allProducts.filter(p =>
      p.name.toLowerCase().includes(q) ||
      (p.description && p.description.toLowerCase().includes(q)) ||
      p.category.toLowerCase().includes(q)
    )
    setSearchResults(results)
  }, [searchQuery, allProducts])

  // Focus input when search opens
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 50)
    }
  }, [searchOpen])

  // Close search on ESC
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') {
        setSearchOpen(false)
        setSearchQuery('')
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [])

  const handleSearchSelect = (slug) => {
    setSearchOpen(false)
    setSearchQuery('')
    router.push(`/products/${slug}`)
  }

  return (
    <>
      {/* Announcement bar */}
      <div style={{ background: '#1C2B3A', color: '#fff', textAlign: 'center', padding: '10px 16px', fontFamily: "'Jost', sans-serif", fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500 }}>
        Free delivery across Pakistan on orders Rs. 5,000+&nbsp;·&nbsp;
        <Link href="/all-oils" style={{ color: '#D4EAF5', textDecoration: 'underline' }}>Shop Now</Link>
      </div>

      {/* Header */}
      <header style={{ background: '#fff', borderBottom: '1px solid #E5E9EC', position: 'sticky', top: 0, zIndex: 100 }}>

        {/* Logo row — full width */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px 40px', borderBottom: '1px solid #E5E9EC' }}>
          <Link href="/" style={{ display: 'block' }}>
            <img
              src="/brand_assets/Untitled_Artwork.png"
              alt="The Oil Merchant"
              style={{ height: 'auto', width: '100%', maxWidth: 400, display: 'block' }}
            />
          </Link>
        </div>

        {/* Nav row: search | nav links | icons */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px', maxWidth: 1400, margin: '0 auto', height: 52 }}>

          {/* Search trigger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flex: 1 }}>
            <button
              className="icon-btn"
              aria-label="Search"
              onClick={() => setSearchOpen(s => !s)}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </button>
            <span
              style={{ fontSize: '0.75rem', color: '#6A7F8E', letterSpacing: '0.05em', cursor: 'pointer' }}
              onClick={() => setSearchOpen(s => !s)}
            >
              Search
            </span>
          </div>

          {/* Nav links centred */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: 36 }} id="desktop-nav">
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link"
                style={link.label === 'Sale' ? { color: '#7D9B77' } : {}}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, flex: 1, justifyContent: 'flex-end' }}>
            {/* Mobile hamburger */}
            <button
              className="icon-btn"
              style={{ display: 'none' }}
              id="hamburger-btn"
              aria-label="Menu"
              onClick={() => setMobileMenuOpen(true)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>

            <button className="icon-btn" aria-label="Wishlist">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </button>
            <button className="icon-btn" aria-label="Account">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
            </button>
            <button
              className="icon-btn"
              aria-label="Cart"
              style={{ position: 'relative' }}
              onClick={openCart}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              {cartCount > 0 && (
                <span style={{ position: 'absolute', top: 2, right: 2, background: '#2A6496', color: '#fff', fontSize: '0.55rem', fontWeight: 700, width: 14, height: 14, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Jost', sans-serif" }}>
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Search bar */}
        <div className={`search-bar ${searchOpen ? 'open' : ''}`}>
          <div style={{ maxWidth: 1400, margin: '0 auto', position: 'relative' }}>
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search for an oil, ingredient, or concern..."
              style={{ width: '100%', padding: '12px 40px 12px 16px', fontFamily: "'Jost', sans-serif", fontSize: '0.875rem', border: '1px solid #E5E9EC', outline: 'none', color: '#1C2B3A' }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#6A7F8E' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            )}

            {/* Results dropdown */}
            {searchQuery && (
              <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: '#fff', border: '1px solid #E5E9EC', borderTop: 'none', maxHeight: 320, overflowY: 'auto', zIndex: 200 }}>
                {searchResults.length === 0 ? (
                  <div style={{ padding: '20px 16px', fontSize: '0.8rem', color: '#6A7F8E', textAlign: 'center' }}>
                    No products found for &ldquo;{searchQuery}&rdquo;
                  </div>
                ) : (
                  searchResults.map(product => (
                    <button
                      key={product.id}
                      onClick={() => handleSearchSelect(product.slug)}
                      style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%', padding: '10px 16px', border: 'none', borderBottom: '1px solid #F5F5F5', background: 'none', cursor: 'pointer', textAlign: 'left' }}
                      onMouseEnter={e => e.currentTarget.style.background = '#F9F9F9'}
                      onMouseLeave={e => e.currentTarget.style.background = 'none'}
                    >
                      <img src={product.images[0]} alt={product.name} style={{ width: 44, height: 58, objectFit: 'cover', background: '#EEF5FA' }} />
                      <div>
                        <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: 500, color: '#1C2B3A' }}>{product.name}</p>
                        <p style={{ margin: '2px 0 0', fontSize: '0.72rem', color: '#6A7F8E' }}>{product.category} · PKR {product.price.toLocaleString()}</p>
                      </div>
                    </button>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        {/* Click outside to close search */}
        {searchOpen && (
          <div
            style={{ position: 'fixed', inset: 0, zIndex: 98 }}
            onClick={() => { setSearchOpen(false); setSearchQuery('') }}
          />
        )}

      </header>

      {/* Mobile fullscreen menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', borderBottom: '1px solid #E5E9EC' }}>
          <Link href="/" onClick={() => setMobileMenuOpen(false)}>
            <img src="/brand_assets/Untitled_Artwork.png" alt="The Oil Merchant" style={{ height: 50, width: 'auto' }} />
          </Link>
          <button className="icon-btn" onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          {NAV_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{ display: 'block', fontFamily: "'Libre Baskerville', serif", fontSize: '1.4rem', fontWeight: 400, color: link.label === 'Sale' ? '#7D9B77' : '#1C2B3A', textDecoration: 'none', padding: '14px 0', borderBottom: '1px solid #F0F0F0', letterSpacing: '-0.01em' }}
            >
              {link.label}
            </Link>
          ))}
          <div style={{ marginTop: 32 }}>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)} style={{ display: 'block', fontSize: '0.85rem', color: '#6A7F8E', textDecoration: 'none', padding: '8px 0' }}>About Us</Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)} style={{ display: 'block', fontSize: '0.85rem', color: '#6A7F8E', textDecoration: 'none', padding: '8px 0' }}>Contact</Link>
            <Link href="/faq" onClick={() => setMobileMenuOpen(false)} style={{ display: 'block', fontSize: '0.85rem', color: '#6A7F8E', textDecoration: 'none', padding: '8px 0' }}>FAQs</Link>
          </div>
        </div>
        <div style={{ padding: '20px 24px', borderTop: '1px solid #E5E9EC' }}>
          <button
            className="btn-primary"
            style={{ width: '100%', textAlign: 'center' }}
            onClick={() => { openCart(); setMobileMenuOpen(false) }}
          >
            View Cart {cartCount > 0 ? `(${cartCount})` : ''}
          </button>
        </div>
      </div>

    </>
  )
}

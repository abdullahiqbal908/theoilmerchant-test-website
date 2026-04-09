'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ background: '#111820', padding: '56px 40px 32px' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>

        {/* Footer columns */}
        <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', gap: 40, marginBottom: 48 }}>

          {/* Brand column */}
          <div>
            <img src="/brand_assets/Untitled_Artwork.png" alt="The Oil Merchant" style={{ height: 30, filter: 'invert(1)', opacity: 0.9, marginBottom: 20, display: 'block' }} />
            <p style={{ fontSize: '0.8rem', fontWeight: 300, color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, maxWidth: 240, margin: '0 0 24px' }}>
              From root to ritual — pure oils, honestly made.<br />
              Delivering across Pakistan: Karachi, Lahore, Islamabad &amp; beyond.
            </p>
            <div style={{ display: 'flex', gap: 16 }}>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.5)', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = '#fff'} onMouseOut={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.5)', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = '#fff'} onMouseOut={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.5)', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = '#fff'} onMouseOut={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', margin: '0 0 16px' }}>Shop</h4>
            <Link href="/hair-care" className="footer-link">Hair Oils</Link>
            <Link href="/scalp" className="footer-link">Scalp Treatments</Link>
            <Link href="/body" className="footer-link">Body Oils</Link>
            <Link href="/face" className="footer-link">Face Oils</Link>
            <Link href="/sets" className="footer-link">Gift Sets</Link>
            <Link href="/sale" className="footer-link">Sale</Link>
          </div>

          {/* Categories */}
          <div>
            <h4 style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', margin: '0 0 16px' }}>Categories</h4>
            <Link href="/collections/featured" className="footer-link">Featured</Link>
            <Link href="/collections/essential-oils" className="footer-link">Essential Oils</Link>
            <Link href="/collections/carrier-oils" className="footer-link">Carrier Oils</Link>
            <Link href="/collections/butters-waxes" className="footer-link">Butters &amp; Waxes</Link>
            <Link href="/all-oils" className="footer-link">View All Oils</Link>
          </div>

          {/* About */}
          <div>
            <h4 style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', margin: '0 0 16px' }}>About</h4>
            <Link href="/about" className="footer-link">Our Story</Link>
            <Link href="/ritual" className="footer-link">The Ritual</Link>
            <Link href="/sustainability" className="footer-link">Sustainability</Link>
            <Link href="/blog" className="footer-link">Blog</Link>
            <Link href="/press" className="footer-link">Press</Link>
          </div>

          {/* Help */}
          <div>
            <h4 style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', margin: '0 0 16px' }}>Help</h4>
            <Link href="/track-order" className="footer-link">Track Order</Link>
            <Link href="/returns" className="footer-link">Returns &amp; Exchanges</Link>
            <Link href="/shipping" className="footer-link">Shipping Info</Link>
            <Link href="/faq" className="footer-link">FAQs</Link>
            <Link href="/contact" className="footer-link">Contact Us</Link>
          </div>
        </div>

        {/* Bottom */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)', margin: 0 }}>© 2026 The Oil Merchant Pakistan. All rights reserved.</p>
          <div style={{ display: 'flex', gap: 24 }}>
            <Link href="/privacy" style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'} onMouseOut={e => e.currentTarget.style.color = 'rgba(255,255,255,0.35)'}>Privacy Policy</Link>
            <Link href="/terms" style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'} onMouseOut={e => e.currentTarget.style.color = 'rgba(255,255,255,0.35)'}>Terms of Service</Link>
          </div>
        </div>
      </div>

    </footer>
  )
}

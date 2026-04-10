'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/lib/products'

export default function CartDrawer() {
  const { cartItems, cartTotal, cartCount, removeFromCart, updateQuantity, isCartOpen, closeCart } = useCart()

  // Close on ESC
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') closeCart() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [closeCart])

  // Prevent body scroll when open
  useEffect(() => {
    if (isCartOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [isCartOpen])

  return (
    <>
      {/* Overlay */}
      <div
        className={`cart-drawer-overlay ${isCartOpen ? 'open' : ''}`}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside className={`cart-drawer ${isCartOpen ? 'open' : ''}`} aria-label="Shopping cart">
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', borderBottom: '1px solid #E5E9EC' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <h2 style={{ fontFamily: '"Libre Baskerville", serif', fontSize: '1.1rem', fontWeight: 400, margin: 0 }}>Your Cart</h2>
            {cartCount > 0 && (
              <span style={{ background: '#2A6496', color: '#fff', fontSize: '0.65rem', fontWeight: 700, width: 20, height: 20, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {cartCount}
              </span>
            )}
          </div>
          <button className="icon-btn" onClick={closeCart} aria-label="Close cart">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 24px' }}>
          {cartItems.length === 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '60px 0', textAlign: 'center' }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#6A7F8E" strokeWidth="1" style={{ marginBottom: 20 }}>
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              <p style={{ fontFamily: '"Libre Baskerville", serif', fontSize: '1rem', color: '#1C2B3A', marginBottom: 8 }}>Your cart is empty</p>
              <p style={{ fontSize: '0.8rem', color: '#6A7F8E', marginBottom: 28 }}>Discover our pure oils and start your ritual.</p>
              <Link href="/all-oils" className="btn-primary" onClick={closeCart}>
                Start Shopping
              </Link>
            </div>
          ) : (
            <div style={{ paddingTop: 8 }}>
              {cartItems.map(item => (
                <div key={item.key} style={{ display: 'flex', gap: 16, padding: '16px 0', borderBottom: '1px solid #F0F0F0' }}>
                  {/* Image */}
                  <div style={{ width: 76, height: 100, flexShrink: 0, background: '#EEF5FA', overflow: 'hidden' }}>
                    <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>

                  {/* Details */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                      <p style={{ fontSize: '0.875rem', fontWeight: 500, margin: 0, lineHeight: 1.3 }}>{item.name}</p>
                      <button
                        onClick={() => removeFromCart(item.key)}
                        className="icon-btn"
                        aria-label="Remove item"
                        style={{ flexShrink: 0, marginLeft: 8 }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                      </button>
                    </div>
                    <p style={{ fontSize: '0.7rem', color: '#6A7F8E', margin: '0 0 10px', letterSpacing: '0.05em' }}>{item.size}</p>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      {/* Qty controls */}
                      <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #E5E9EC' }}>
                        <button
                          onClick={() => updateQuantity(item.key, item.quantity - 1)}
                          style={{ width: 28, height: 28, border: 'none', background: 'none', cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1C2B3A' }}
                          aria-label="Decrease quantity"
                        >−</button>
                        <span style={{ width: 28, textAlign: 'center', fontSize: '0.8rem', fontWeight: 500 }}>{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.key, item.quantity + 1)}
                          style={{ width: 28, height: 28, border: 'none', background: 'none', cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1C2B3A' }}
                          aria-label="Increase quantity"
                        >+</button>
                      </div>

                      <p style={{ fontWeight: 600, fontSize: '0.875rem', margin: 0 }}>
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div style={{ padding: '20px 24px', borderTop: '1px solid #E5E9EC', background: '#FAFAFA' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <span style={{ fontSize: '0.8rem', color: '#6A7F8E' }}>Subtotal</span>
              <span style={{ fontWeight: 600, fontSize: '1rem' }}>{formatPrice(cartTotal)}</span>
            </div>
            <p style={{ fontSize: '0.7rem', color: '#6A7F8E', margin: '0 0 16px' }}>
              {cartTotal >= 5000 ? '✓ Free delivery applied' : `Add ${formatPrice(5000 - cartTotal)} more for free delivery`}
            </p>
            <Link
              href="/checkout"
              className="btn-primary"
              style={{ display: 'block', textAlign: 'center', marginBottom: 10 }}
              onClick={closeCart}
            >
              Proceed to Checkout
            </Link>
            <button
              className="btn-outline"
              style={{ width: '100%', textAlign: 'center' }}
              onClick={closeCart}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </aside>
    </>
  )
}

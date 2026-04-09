'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/data/products'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)

  const handleQuickAdd = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product, 1)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <div className="product-card" style={{ position: 'relative' }}>
      <Link href={`/products/${product.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div style={{ position: 'relative', overflow: 'hidden', background: product.bgColor || '#EEF5FA', aspectRatio: '3/4', marginBottom: 14 }}>
          <img
            src={product.images[0]}
            alt={product.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(28,43,58,0.4) 0%, transparent 50%)', mixBlendMode: 'multiply' }} />

          {product.badge && (
            <span style={{
              position: 'absolute', top: 12, left: 12,
              background: product.badge === 'Best Seller' ? '#7D9B77' : '#2A6496',
              color: '#fff', fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.1em',
              textTransform: 'uppercase', padding: '4px 10px'
            }}>
              {product.badge}
            </span>
          )}

          <div className="quick-add" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 12 }}>
            <button
              className="btn-primary"
              style={{ width: '100%', padding: 10, fontSize: '0.65rem', background: added ? '#7D9B77' : '#1C2B3A' }}
              onClick={handleQuickAdd}
            >
              {added ? 'Added!' : 'Quick Add'}
            </button>
          </div>
        </div>
      </Link>

      <Link href={`/products/${product.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <p style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6A7F8E', margin: '0 0 4px' }}>
          {product.subcategory || product.category} · {product.size}
        </p>
        <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.875rem', fontWeight: 400, margin: '0 0 6px', lineHeight: 1.4, color: '#1C2B3A' }}>
          {product.name}
        </p>
        <p style={{ fontSize: '0.875rem', fontWeight: 500, margin: 0, color: '#1C2B3A' }}>
          {formatPrice(product.price)}
        </p>
      </Link>
    </div>
  )
}

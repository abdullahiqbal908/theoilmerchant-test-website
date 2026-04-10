'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { notFound } from 'next/navigation'
import { getProductBySlug, getRelatedProducts, getAllProducts, formatPrice } from '@/lib/products'
import { useCart } from '@/context/CartContext'
import ProductCard from '@/components/ProductCard'
import { trackViewItem, trackAddToCart } from '@/lib/analytics'

function StarRating({ rating }) {
  return (
    <div style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      {[1, 2, 3, 4, 5].map(i => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i <= Math.floor(rating) ? '#C8A96E' : '#E5E9EC'} stroke="none">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ))}
      <span style={{ fontSize: '0.75rem', color: '#6A7F8E', marginLeft: 6 }}>{rating} ({Math.floor(Math.random() * 80 + 20)} reviews)</span>
    </div>
  )
}

export default function ProductPage({ params }) {
  const router = useRouter()
  const { addToCart, openCart } = useCart()

  const [product, setProduct] = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [addedState, setAddedState] = useState('')

  useEffect(() => {
    async function load() {
      const p = await getProductBySlug(params.slug)
      if (!p) { setLoading(false); return }
      setProduct(p)
      trackViewItem(p)

      const rel = await getRelatedProducts(p, 3)
      if (rel.length < 3) {
        const all = await getAllProducts()
        const extra = all.filter(x => x.id !== p.id && !rel.find(r => r.id === x.id))
        setRelated([...rel, ...extra].slice(0, 3))
      } else {
        setRelated(rel)
      }
      setLoading(false)
    }
    load()
  }, [params.slug])

  if (loading) {
    return (
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '80px 40px', textAlign: 'center', color: '#6A7F8E', fontSize: '0.875rem' }}>
        Loading product…
      </div>
    )
  }

  if (!product) return notFound()

  const handleAddToCart = () => {
    addToCart(product, quantity)
    trackAddToCart(product, quantity)
    setAddedState('added')
    openCart()
    setTimeout(() => setAddedState(''), 2000)
  }

  const handleBuyNow = () => {
    addToCart(product, quantity)
    router.push('/checkout')
  }

  const breadcrumb = [
    { label: 'Home', href: '/' },
    { label: product.category, href: `/collections/${product.category.toLowerCase().replace(/\s+/g, '-')}` },
    { label: product.name, href: '#' },
  ]

  return (
    <div style={{ maxWidth: 1400, margin: '0 auto', padding: '40px 40px 80px' }}>

      {/* Breadcrumb */}
      <nav style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 40 }}>
        {breadcrumb.map((crumb, i) => (
          <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {i < breadcrumb.length - 1 ? (
              <Link href={crumb.href} style={{ fontSize: '0.72rem', color: '#6A7F8E', textDecoration: 'none', letterSpacing: '0.05em', textTransform: 'uppercase' }}
                onMouseOver={e => e.currentTarget.style.color = '#2A6496'}
                onMouseOut={e => e.currentTarget.style.color = '#6A7F8E'}
              >{crumb.label}</Link>
            ) : (
              <span style={{ fontSize: '0.72rem', color: '#1C2B3A', letterSpacing: '0.05em', textTransform: 'uppercase', fontWeight: 500 }}>{crumb.label}</span>
            )}
            {i < breadcrumb.length - 1 && (
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#C0C8D0" strokeWidth="2">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            )}
          </span>
        ))}
      </nav>

      {/* Main product grid */}
      <div className="product-detail-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, marginBottom: 80 }}>

        {/* LEFT: Images */}
        <div>
          <div style={{ background: product.bgColor || '#EEF5FA', aspectRatio: '4/5', overflow: 'hidden', marginBottom: 12, position: 'relative' }}>
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            {product.badge && (
              <span style={{ position: 'absolute', top: 16, left: 16, background: product.badge === 'Best Seller' ? '#7D9B77' : '#2A6496', color: '#fff', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '5px 12px' }}>
                {product.badge}
              </span>
            )}
          </div>

          {product.images.length > 1 && (
            <div style={{ display: 'flex', gap: 8 }}>
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  style={{ width: 72, height: 90, overflow: 'hidden', border: selectedImage === i ? '2px solid #2A6496' : '2px solid transparent', padding: 0, cursor: 'pointer', background: '#EEF5FA' }}
                  aria-label={`View image ${i + 1}`}
                >
                  <img src={img} alt={`${product.name} ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT: Product info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          <p className="section-label" style={{ margin: '0 0 10px' }}>
            {product.category} · {product.size}
          </p>
          <h1 style={{ fontFamily: '"Libre Baskerville", serif', fontSize: '2rem', fontWeight: 400, margin: '0 0 14px', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
            {product.name}
          </h1>
          <div style={{ marginBottom: 20 }}>
            <StarRating rating={product.rating} />
          </div>
          <div style={{ marginBottom: 24 }}>
            <span style={{ fontSize: '1.5rem', fontWeight: 600, color: '#1C2B3A' }}>{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span style={{ fontSize: '1rem', color: '#6A7F8E', textDecoration: 'line-through', marginLeft: 12 }}>{formatPrice(product.originalPrice)}</span>
            )}
          </div>
          <p style={{ fontSize: '0.875rem', fontWeight: 300, color: '#4A5568', lineHeight: 1.8, margin: '0 0 28px', maxWidth: 480 }}>
            {product.description}
          </p>

          {/* Quantity */}
          <div style={{ marginBottom: 16 }}>
            <p style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6A7F8E', margin: '0 0 10px' }}>Quantity</p>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #E5E9EC', width: 'fit-content' }}>
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))} style={{ width: 40, height: 40, border: 'none', background: 'none', cursor: 'pointer', fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1C2B3A' }} aria-label="Decrease">−</button>
              <span style={{ width: 40, textAlign: 'center', fontSize: '0.875rem', fontWeight: 500 }}>{quantity}</span>
              <button onClick={() => setQuantity(q => Math.min(10, q + 1))} style={{ width: 40, height: 40, border: 'none', background: 'none', cursor: 'pointer', fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1C2B3A' }} aria-label="Increase">+</button>
            </div>
          </div>

          {/* CTA */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
            <button className="btn-primary" style={{ textAlign: 'center', background: addedState === 'added' ? '#7D9B77' : '#1C2B3A' }} onClick={handleAddToCart} disabled={!product.inStock}>
              {addedState === 'added' ? '✓ Added to Cart' : 'Add to Cart'}
            </button>
            <button className="btn-outline" style={{ textAlign: 'center' }} onClick={handleBuyNow} disabled={!product.inStock}>
              Buy Now
            </button>
          </div>

          {/* Trust badges */}
          <div style={{ display: 'flex', gap: 20, padding: '16px 0', borderTop: '1px solid #F0F0F0', borderBottom: '1px solid #F0F0F0', marginBottom: 28 }}>
            {[
              { icon: '🇵🇰', label: 'Made in Pakistan' },
              { icon: '❄️', label: 'Cold-Pressed' },
              { icon: '🌿', label: '100% Natural' },
            ].map(b => (
              <div key={b.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: '1rem' }}>{b.icon}</span>
                <span style={{ fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.05em', color: '#6A7F8E', textTransform: 'uppercase' }}>{b.label}</span>
              </div>
            ))}
          </div>

          {/* Benefits */}
          {product.benefits && Array.isArray(product.benefits) && (
            <div style={{ marginBottom: 24 }}>
              <p style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1C2B3A', margin: '0 0 12px' }}>Key Benefits</p>
              {product.benefits.map((benefit, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 8 }}>
                  <span style={{ color: '#7D9B77', marginTop: 2, flexShrink: 0 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  </span>
                  <span style={{ fontSize: '0.8rem', color: '#4A5568', lineHeight: 1.6 }}>{benefit}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── How to Use + Ingredients ── */}
      <div className="product-info-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, marginBottom: 72, padding: '40px 0', borderTop: '1px solid #E5E9EC' }}>
        {product.how_to_use && (
          <div>
            <h3 style={{ fontFamily: '"Libre Baskerville", serif', fontSize: '1.1rem', fontWeight: 400, margin: '0 0 16px', letterSpacing: '-0.01em' }}>How to Use</h3>
            <p style={{ fontSize: '0.875rem', fontWeight: 300, color: '#4A5568', lineHeight: 1.8, margin: 0 }}>{product.how_to_use}</p>
          </div>
        )}
        {product.ingredients && (
          <div>
            <h3 style={{ fontFamily: '"Libre Baskerville", serif', fontSize: '1.1rem', fontWeight: 400, margin: '0 0 16px', letterSpacing: '-0.01em' }}>Ingredients</h3>
            <p style={{ fontSize: '0.875rem', fontWeight: 300, color: '#4A5568', lineHeight: 1.8, margin: 0 }}>{product.ingredients}</p>
          </div>
        )}
      </div>

      {/* ── Related Products ── */}
      {related.length > 0 && (
        <div>
          <div style={{ marginBottom: 32 }}>
            <p className="section-label" style={{ margin: '0 0 6px' }}>You May Also Like</p>
            <h2 style={{ fontFamily: '"Libre Baskerville", serif', fontSize: '1.4rem', fontWeight: 400, margin: 0, letterSpacing: '-0.02em' }}>Related Products</h2>
          </div>
          <div className="product-related-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {related.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}
    </div>
  )
}

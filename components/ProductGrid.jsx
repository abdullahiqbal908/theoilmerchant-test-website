'use client'

import { useState } from 'react'
import ProductCard from './ProductCard'

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest' },
  { value: 'best-selling', label: 'Best Selling' },
]

export default function ProductGrid({ products: initialProducts, title, subtitle }) {
  const [sort, setSort] = useState('featured')

  const sorted = [...initialProducts].sort((a, b) => {
    if (sort === 'price-asc') return a.price - b.price
    if (sort === 'price-desc') return b.price - a.price
    if (sort === 'newest') return (a.badge === 'New' ? -1 : 1)
    if (sort === 'best-selling') return (a.badge === 'Best Seller' ? -1 : 1)
    return 0
  })

  return (
    <div style={{ maxWidth: 1400, margin: '0 auto', padding: '40px 40px 80px' }}>
      {/* Page header */}
      <div style={{ marginBottom: 40 }}>
        {subtitle && <p className="section-label" style={{ margin: '0 0 8px' }}>{subtitle}</p>}
        <h1 style={{ fontFamily: '"Libre Baskerville", serif', fontSize: '2rem', fontWeight: 400, margin: '0 0 8px', letterSpacing: '-0.03em' }}>{title}</h1>
        <p style={{ fontSize: '0.8rem', color: '#6A7F8E', margin: 0 }}>{sorted.length} product{sorted.length !== 1 ? 's' : ''}</p>
      </div>

      {/* Filter bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginBottom: 32, paddingBottom: 20, borderBottom: '1px solid #E5E9EC' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <label style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6A7F8E' }} htmlFor="sort-select">
            Sort by
          </label>
          <select
            id="sort-select"
            value={sort}
            onChange={e => setSort(e.target.value)}
            style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.8rem', padding: '8px 28px 8px 12px', border: '1px solid #E5E9EC', color: '#1C2B3A', background: '#fff', cursor: 'pointer', appearance: 'none', backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%236A7F8E' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center' }}
          >
            {SORT_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Product grid */}
      {sorted.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 0' }}>
          <p style={{ fontFamily: '"Libre Baskerville", serif', fontSize: '1.2rem', color: '#6A7F8E', marginBottom: 8 }}>No products found</p>
          <p style={{ fontSize: '0.8rem', color: '#6A7F8E' }}>Check back soon for new arrivals.</p>
        </div>
      ) : (
        <div className="product-main-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
          {sorted.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  )
}

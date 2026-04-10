import { getAllProducts } from '@/lib/products'
import ProductGrid from '@/components/ProductGrid'

export const revalidate = 60

const COLLECTION_META = {
  'featured': { title: 'Featured', subtitle: 'Our Picks', filter: p => p.subcategory === 'Featured' },
  'essential-oils': { title: 'Essential Oils', subtitle: 'Potent & Pure', filter: p => p.category === 'Essential Oils' },
  'carrier-oils': { title: 'Carrier Oils', subtitle: "Nature's Base", filter: p => p.category === 'Carrier Oils' },
  'hair-care': { title: 'Hair Care', subtitle: 'Root to Tip', filter: p => p.category === 'Hair Care' },
  'butters-waxes': { title: 'Butters & Waxes', subtitle: 'Rich & Nourishing', filter: p => p.category === 'Butters & Waxes' },
  'new-arrivals': { title: 'New Arrivals', subtitle: 'Just Landed', filter: p => p.badge === 'New' },
  'scalp': { title: 'Scalp Care', subtitle: 'Scalp Health', filter: p => p.category === 'Scalp' || (p.subcategory && p.subcategory.toLowerCase().includes('scalp')) },
  'body': { title: 'Body Oils', subtitle: 'Head to Toe', filter: p => p.category === 'Body' },
  'face': { title: 'Face Oils', subtitle: 'Skin Nourishment', filter: p => p.category === 'Face' },
  'sets': { title: 'Sets & Bundles', subtitle: 'Gift Ready', filter: p => p.category === 'Sets' },
  'sale': { title: 'Sale', subtitle: 'Special Offers', filter: p => p.originalPrice && p.price < p.originalPrice },
  'all': { title: 'All Products', subtitle: 'Our Full Range', filter: () => true },
}

export function generateStaticParams() {
  return Object.keys(COLLECTION_META).map(category => ({ category }))
}

export async function generateMetadata({ params }) {
  const meta = COLLECTION_META[params.category]
  return {
    title: `${meta?.title || 'Collection'} — The Oil Merchant`,
  }
}

export default async function CollectionPage({ params }) {
  const allProducts = await getAllProducts()
  const meta = COLLECTION_META[params.category]

  if (!meta) {
    // Unknown category — show coming soon
    return (
      <div style={{ maxWidth: 800, margin: '80px auto', padding: '0 40px', textAlign: 'center' }}>
        <p style={{ fontFamily: '"Libre Baskerville", serif', fontSize: '1.6rem', color: '#1C2B3A', marginBottom: 12 }}>
          {params.category.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
        </p>
        <p style={{ fontSize: '0.875rem', color: '#6A7F8E' }}>Coming Soon — check back soon!</p>
      </div>
    )
  }

  const filtered = allProducts.filter(meta.filter)

  return (
    <ProductGrid
      products={filtered}
      title={meta.title}
      subtitle={meta.subtitle}
    />
  )
}

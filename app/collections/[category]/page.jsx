import { notFound } from 'next/navigation'
import ProductGrid from '@/components/ProductGrid'
import { products } from '@/data/products'

const COLLECTION_META = {
  'featured': { title: 'Featured', subtitle: 'Our Picks' },
  'essential-oils': { title: 'Essential Oils', subtitle: 'Potent & Pure' },
  'carrier-oils': { title: 'Carrier Oils', subtitle: 'Nature\'s Base' },
  'hair-care': { title: 'Hair Care', subtitle: 'Root to Tip' },
  'butters-waxes': { title: 'Butters & Waxes', subtitle: 'Rich & Nourishing' },
  'new-arrivals': { title: 'New Arrivals', subtitle: 'Just Landed' },
  'all': { title: 'All Products', subtitle: 'Our Full Range' },
}

function getProductsForCategory(category) {
  if (category === 'featured' || category === 'all') return products
  if (category === 'new-arrivals') return products.filter(p => p.badge === 'New')
  return products.filter(p => {
    const cat = p.category.toLowerCase().replace(/\s+/g, '-')
    const sub = p.subcategory?.toLowerCase().replace(/\s+/g, '-')
    return cat === category || sub === category
  })
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

export default function CollectionPage({ params }) {
  const meta = COLLECTION_META[params.category]
  if (!meta) return notFound()

  const filtered = getProductsForCategory(params.category)

  return (
    <ProductGrid
      products={filtered}
      title={meta.title}
      subtitle={meta.subtitle}
    />
  )
}

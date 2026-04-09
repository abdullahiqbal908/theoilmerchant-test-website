import ProductGrid from '@/components/ProductGrid'
import { products } from '@/data/products'

export const metadata = { title: 'Face Oils — The Oil Merchant' }

export default function FacePage() {
  const filtered = products.filter(p =>
    ['rosehip-oil', 'vitamin-e-oil', 'turmeric-oil'].includes(p.slug)
  )
  return <ProductGrid products={filtered} title="Face Oils" subtitle="Glow from Within" />
}

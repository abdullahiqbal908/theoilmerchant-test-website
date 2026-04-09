import ProductGrid from '@/components/ProductGrid'
import { products } from '@/data/products'

export const metadata = { title: 'Hair Care — The Oil Merchant' }

export default function HairCarePage() {
  const filtered = products.filter(p => p.category === 'Hair Care')
  return <ProductGrid products={filtered} title="Hair Care" subtitle="Root to Tip" />
}

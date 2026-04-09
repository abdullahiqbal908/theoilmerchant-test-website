import ProductGrid from '@/components/ProductGrid'
import { products } from '@/data/products'

export const metadata = { title: 'Scalp Treatments — The Oil Merchant' }

export default function ScalpPage() {
  const filtered = products.filter(p =>
    p.category === 'Hair Care' ||
    p.benefits.some(b => b.toLowerCase().includes('scalp'))
  )
  return <ProductGrid products={filtered} title="Scalp Treatments" subtitle="Nourish the Root" />
}

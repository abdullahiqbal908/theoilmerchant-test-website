import ProductGrid from '@/components/ProductGrid'
import { products } from '@/data/products'

export const metadata = { title: 'Body Oils — The Oil Merchant' }

export default function BodyPage() {
  return <ProductGrid products={products} title="Body Oils" subtitle="Head to Toe" />
}

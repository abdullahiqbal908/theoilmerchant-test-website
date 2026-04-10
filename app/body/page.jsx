import { getAllProducts } from '@/lib/products'
import ProductGrid from '@/components/ProductGrid'

export const metadata = { title: 'Body Oils — The Oil Merchant' }
export const revalidate = 60

export default async function BodyPage() {
  const all = await getAllProducts()
  const products = all.filter(p => p.category === 'Body' || p.category === 'Body Oils')
  return <ProductGrid products={products.length > 0 ? products : all} title="Body Oils" subtitle="Head to Toe" />
}

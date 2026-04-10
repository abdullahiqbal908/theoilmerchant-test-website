import { getAllProducts } from '@/lib/products'
import ProductGrid from '@/components/ProductGrid'

export const metadata = { title: 'Hair Care — The Oil Merchant' }
export const revalidate = 60

export default async function HairCarePage() {
  const all = await getAllProducts()
  const products = all.filter(p => p.category === 'Hair Care')
  return <ProductGrid products={products} title="Hair Care" subtitle="Root to Tip" />
}

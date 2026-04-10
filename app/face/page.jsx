import { getAllProducts } from '@/lib/products'
import ProductGrid from '@/components/ProductGrid'

export const metadata = { title: 'Face Oils — The Oil Merchant' }
export const revalidate = 60

export default async function FacePage() {
  const all = await getAllProducts()
  const products = all.filter(p => p.category === 'Face' || p.category === 'Face Oils' ||
    ['rosehip-oil', 'vitamin-e-oil', 'turmeric-oil'].includes(p.slug))
  return <ProductGrid products={products.length > 0 ? products : all} title="Face Oils" subtitle="Glow from Within" />
}

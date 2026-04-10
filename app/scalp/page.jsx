import { getAllProducts } from '@/lib/products'
import ProductGrid from '@/components/ProductGrid'

export const metadata = { title: 'Scalp Treatments — The Oil Merchant' }
export const revalidate = 60

export default async function ScalpPage() {
  const all = await getAllProducts()
  const products = all.filter(p =>
    p.category === 'Scalp' || p.category === 'Hair Care' ||
    (Array.isArray(p.benefits) && p.benefits.some(b => b.toLowerCase().includes('scalp')))
  )
  return <ProductGrid products={products.length > 0 ? products : all} title="Scalp Treatments" subtitle="Nourish the Root" />
}

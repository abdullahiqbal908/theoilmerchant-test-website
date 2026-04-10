import { getAllProducts } from '@/lib/products'
import ProductGrid from '@/components/ProductGrid'

export const metadata = { title: 'Sale — The Oil Merchant' }
export const revalidate = 60

export default async function SalePage() {
  const all = await getAllProducts()
  const saleProducts = all.filter(p => p.originalPrice && p.price < p.originalPrice)
  return <ProductGrid products={saleProducts.length > 0 ? saleProducts : all} title="Sale" subtitle="Special Offers" />
}

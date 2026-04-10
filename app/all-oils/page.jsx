import { getAllProducts } from '@/lib/products'
import ProductGrid from '@/components/ProductGrid'

export const metadata = {
  title: 'All Oils — The Oil Merchant',
}

export const revalidate = 60

export default async function AllOilsPage() {
  const products = await getAllProducts()
  return <ProductGrid products={products} title="All Oils" subtitle="Our Full Range" />
}

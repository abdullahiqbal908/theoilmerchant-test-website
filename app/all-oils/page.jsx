import ProductGrid from '@/components/ProductGrid'
import { products } from '@/data/products'

export const metadata = {
  title: 'All Oils — The Oil Merchant',
}

export default function AllOilsPage() {
  return <ProductGrid products={products} title="All Oils" subtitle="Our Full Range" />
}

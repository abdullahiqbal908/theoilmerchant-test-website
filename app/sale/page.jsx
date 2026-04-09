import ProductGrid from '@/components/ProductGrid'
import { products } from '@/data/products'

export const metadata = { title: 'Sale — The Oil Merchant' }

export default function SalePage() {
  const saleProducts = products.filter(p => p.originalPrice)
  return <ProductGrid products={saleProducts.length > 0 ? saleProducts : products} title="Sale" subtitle="Special Offers" />
}

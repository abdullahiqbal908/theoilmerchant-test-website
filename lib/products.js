import { supabase } from './supabase'

// Normalize a Supabase product row to match the shape the UI expects
export function normalizeProduct(row) {
  return {
    ...row,
    // UI expects images[] array; Supabase stores image_url string
    images: row.image_url
      ? [row.image_url]
      : ['https://placehold.co/600x800/EEF5FA/2A6496?text=' + encodeURIComponent(row.name || 'Product')],
    // UI expects inStock boolean
    inStock: row.stock_quantity > 0,
    // keep numeric fields as numbers
    price: Number(row.price),
    originalPrice: row.original_price ? Number(row.original_price) : null,
    rating: Number(row.rating) || 4.8,
    reviewCount: Number(row.review_count) || 24,
    // keep bgColor / textColor if stored, else fallback
    bgColor: row.bg_color || '#EEF5FA',
    textColor: row.text_color || '#2A6496',
  }
}

export async function getAllProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .order('id', { ascending: true })

  if (error) throw error
  return (data || []).map(normalizeProduct)
}

export async function getProductBySlug(slug) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single()

  if (error) return null
  return normalizeProduct(data)
}

export async function getProductsByCategory(category) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .ilike('category', category)
    .order('id', { ascending: true })

  if (error) throw error
  return (data || []).map(normalizeProduct)
}

export async function getRelatedProducts(product, limit = 3) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .eq('category', product.category)
    .neq('id', product.id)
    .limit(limit)

  if (error) return []
  return (data || []).map(normalizeProduct)
}

export function formatPrice(amount) {
  return `PKR ${Number(amount).toLocaleString('en-PK')}`
}

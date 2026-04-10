import { NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export async function GET() {
  const supabase = getSupabaseAdmin()
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: true })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ products })
}

export async function POST(request) {
  const body = await request.json()
  const supabase = getSupabaseAdmin()

  const { data, error } = await supabase
    .from('products')
    .insert({
      name: body.name,
      slug: body.slug,
      description: body.description || null,
      price: Number(body.price),
      original_price: body.original_price ? Number(body.original_price) : null,
      category: body.category,
      size: body.size || null,
      stock_quantity: Number(body.stock_quantity) || 50,
      badge: body.badge || null,
      image_url: body.image_url || null,
      is_active: body.is_active !== false,
      rating: 4.8,
      review_count: 24,
    })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ product: data })
}

export async function PATCH(request) {
  const body = await request.json()
  const { id, ...fields } = body
  const supabase = getSupabaseAdmin()

  const update = {}
  if (fields.name !== undefined) update.name = fields.name
  if (fields.slug !== undefined) update.slug = fields.slug
  if (fields.description !== undefined) update.description = fields.description
  if (fields.price !== undefined) update.price = Number(fields.price)
  if (fields.original_price !== undefined) update.original_price = fields.original_price ? Number(fields.original_price) : null
  if (fields.category !== undefined) update.category = fields.category
  if (fields.size !== undefined) update.size = fields.size
  if (fields.stock_quantity !== undefined) update.stock_quantity = Number(fields.stock_quantity)
  if (fields.badge !== undefined) update.badge = fields.badge || null
  if (fields.image_url !== undefined) update.image_url = fields.image_url
  if (fields.is_active !== undefined) update.is_active = fields.is_active

  const { error } = await supabase.from('products').update(update).eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}

export async function DELETE(request) {
  const { id } = await request.json()
  const supabase = getSupabaseAdmin()
  const { error } = await supabase.from('products').delete().eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}

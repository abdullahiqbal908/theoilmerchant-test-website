import { NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'

export async function GET() {
  const supabase = getSupabaseAdmin()

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const firstOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).toISOString()
  const todayISO = today.toISOString()

  const [ordersRes, productsRes] = await Promise.all([
    supabase.from('orders').select('created_at, total, status'),
    supabase.from('products').select('id', { count: 'exact' }).eq('is_active', true),
  ])

  const allOrders = ordersRes.data || []
  const totalOrders = allOrders.length
  const ordersToday = allOrders.filter(o => o.created_at >= todayISO).length
  const monthRevenue = allOrders
    .filter(o => o.created_at >= firstOfMonth)
    .reduce((sum, o) => sum + Number(o.total), 0)
  const activeProducts = productsRes.count ?? 0

  const byStatus = { pending: 0, confirmed: 0, shipped: 0, delivered: 0, cancelled: 0 }
  for (const o of allOrders) {
    if (byStatus[o.status] !== undefined) byStatus[o.status]++
  }

  return NextResponse.json({ totalOrders, ordersToday, monthRevenue, activeProducts, byStatus })
}

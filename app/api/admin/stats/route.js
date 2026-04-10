import { NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'

export async function GET() {
  const supabase = getSupabaseAdmin()

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const firstOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).toISOString()
  const todayISO = today.toISOString()

  const [
    { count: totalOrders },
    { count: ordersToday },
    { data: monthOrders },
    { count: activeProducts },
    { data: statusData },
  ] = await Promise.all([
    supabase.from('orders').select('*', { count: 'exact', head: true }),
    supabase.from('orders').select('*', { count: 'exact', head: true }).gte('created_at', todayISO),
    supabase.from('orders').select('total').gte('created_at', firstOfMonth),
    supabase.from('products').select('*', { count: 'exact', head: true }).eq('is_active', true),
    supabase.from('orders').select('status'),
  ])

  const monthRevenue = (monthOrders || []).reduce((sum, o) => sum + Number(o.total), 0)

  const byStatus = {}
  ;['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'].forEach(s => { byStatus[s] = 0 })
  ;(statusData || []).forEach(o => { if (byStatus[o.status] !== undefined) byStatus[o.status]++ })

  return NextResponse.json({
    totalOrders: totalOrders || 0,
    ordersToday: ordersToday || 0,
    monthRevenue,
    activeProducts: activeProducts || 0,
    byStatus,
  })
}

import { NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'
import { sendShippedEmail } from '@/lib/email'

export const dynamic = 'force-dynamic'

export async function GET() {
  const supabase = getSupabaseAdmin()
  const { data: orders, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ orders })
}

export async function PATCH(request) {
  const { id, status } = await request.json()
  const supabase = getSupabaseAdmin()

  // Fetch the order first (to get email/number for shipped email)
  const { data: order } = await supabase
    .from('orders')
    .select('*')
    .eq('id', id)
    .single()

  const { error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Send shipped email if status changed to shipped
  if (status === 'shipped' && order) {
    try {
      await sendShippedEmail(order)
    } catch (e) {
      console.error('Shipped email error:', e)
    }
  }

  return NextResponse.json({ success: true })
}

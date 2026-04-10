import { NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'
import { sendOrderConfirmation, sendAdminNotification } from '@/lib/email'

export const dynamic = 'force-dynamic'

export async function POST(request) {
  try {
    const body = await request.json()
    const {
      order_number, customer_name, customer_email, customer_phone,
      delivery_address, city, notes, items, subtotal, delivery_fee,
      total, payment_method, status,
    } = body

    // Basic validation
    if (!order_number || !customer_name || !customer_email || !customer_phone || !delivery_address || !city || !items) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const supabase = getSupabaseAdmin()

    // Save order to Supabase
    const { data: order, error } = await supabase
      .from('orders')
      .insert({
        order_number,
        customer_name,
        customer_email,
        customer_phone,
        delivery_address,
        city,
        notes: notes || null,
        items,
        subtotal,
        delivery_fee,
        total,
        payment_method: payment_method || 'Cash on Delivery',
        status: status || 'pending',
      })
      .select()
      .single()

    if (error) {
      console.error('Supabase insert error:', error)
      return NextResponse.json({ error: 'Failed to save order' }, { status: 500 })
    }

    // Send emails (non-blocking — don't fail the order if emails fail)
    try {
      await Promise.all([
        sendOrderConfirmation(order),
        sendAdminNotification(order),
      ])
    } catch (emailError) {
      console.error('Email send error:', emailError)
    }

    return NextResponse.json({ success: true, order_number })
  } catch (err) {
    console.error('Order API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

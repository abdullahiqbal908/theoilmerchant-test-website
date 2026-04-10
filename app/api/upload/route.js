import { NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'
import { getSupabaseAdmin } from '@/lib/supabase'

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
const MAX_SIZE = 5 * 1024 * 1024 // 5MB

export async function POST(request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file')
    const productId = formData.get('productId')

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Validate type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ error: 'Only JPG, PNG and WebP images are allowed' }, { status: 400 })
    }

    // Validate size
    const bytes = await file.arrayBuffer()
    if (bytes.byteLength > MAX_SIZE) {
      return NextResponse.json({ error: 'File size must be under 5MB' }, { status: 400 })
    }

    // Convert to base64
    const buffer = Buffer.from(bytes)
    const base64 = `data:${file.type};base64,${buffer.toString('base64')}`

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(base64, {
      folder: 'theoilmerchant/products',
      transformation: [
        { width: 800, height: 1067, crop: 'fill', gravity: 'center' },
        { quality: 'auto', fetch_format: 'auto' },
      ],
    })

    const url = result.secure_url

    // Save URL to Supabase if productId provided
    if (productId) {
      const supabase = getSupabaseAdmin()
      await supabase
        .from('products')
        .update({ image_url: url })
        .eq('id', productId)
    }

    return NextResponse.json({ url, public_id: result.public_id })
  } catch (err) {
    console.error('Upload error:', err)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}

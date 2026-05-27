import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/adminVerify'

export async function POST(req: NextRequest) {
  const err = await requireAdmin(req)
  if (err) return err

  const supabaseUrl     = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey  = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceRoleKey) {
    return NextResponse.json(
      { error: 'Storage non configuré. Ajoutez NEXT_PUBLIC_SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY dans Vercel.' },
      { status: 503 }
    )
  }

  const formData = await req.formData()
  const file     = formData.get('file') as File | null
  if (!file) return NextResponse.json({ error: 'Aucun fichier' }, { status: 400 })

  const ext      = file.name.split('.').pop()?.toLowerCase() || 'jpg'
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
  const bucket   = 'product-images'

  const buffer   = await file.arrayBuffer()

  // Create bucket if it doesn't exist
  await fetch(`${supabaseUrl}/storage/v1/bucket`, {
    method:  'POST',
    headers: {
      Authorization:  `Bearer ${serviceRoleKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: bucket, name: bucket, public: true }),
  })

  const uploadRes = await fetch(`${supabaseUrl}/storage/v1/object/${bucket}/${fileName}`, {
    method:  'POST',
    headers: {
      Authorization:  `Bearer ${serviceRoleKey}`,
      'Content-Type': file.type || 'image/jpeg',
      'x-upsert':    'true',
    },
    body: buffer,
  })

  if (!uploadRes.ok) {
    const msg = await uploadRes.text()
    return NextResponse.json({ error: `Upload échoué: ${msg}` }, { status: 500 })
  }

  const publicUrl = `${supabaseUrl}/storage/v1/object/public/${bucket}/${fileName}`
  return NextResponse.json({ url: publicUrl })
}

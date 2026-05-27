import { NextRequest, NextResponse } from 'next/server'

async function computeToken(): Promise<string> {
  const secret   = process.env.ADMIN_JWT_SECRET   || 'change-me-admin-secret'
  const password = process.env.ADMIN_PASSWORD      || 'admin123'
  const enc      = new TextEncoder()
  const key      = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
  const sig      = await crypto.subtle.sign('HMAC', key, enc.encode(password))
  return Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, '0')).join('')
}

export async function generateToken(): Promise<string> {
  return computeToken()
}

export async function requireAdmin(req: NextRequest): Promise<NextResponse | null> {
  const token    = req.cookies.get('admin_session')?.value
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const expected = await computeToken()
  if (token !== expected) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  return null
}

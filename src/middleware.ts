import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

async function computeExpectedToken(): Promise<string> {
  const secret   = process.env.ADMIN_JWT_SECRET || 'change-me-admin-secret'
  const password = process.env.ADMIN_PASSWORD   || 'admin123'
  const enc      = new TextEncoder()
  const key      = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
  const sig      = await crypto.subtle.sign('HMAC', key, enc.encode(password))
  return Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, '0')).join('')
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const token = request.cookies.get('admin_session')?.value
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
    const expected = await computeExpectedToken()
    if (token !== expected) {
      const res = NextResponse.redirect(new URL('/admin/login', request.url))
      res.cookies.delete('admin_session')
      return res
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}

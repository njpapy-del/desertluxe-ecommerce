import { NextResponse } from 'next/server'

// Route conservée pour compatibilité. Sur Vercel : sans objet (pas de backend Express séparé).
export const dynamic = 'force-dynamic'

export async function GET() {
  return NextResponse.json(
    { frontend: 'ok', backend: 'vercel_integrated', ts: new Date().toISOString() },
    { status: 200 }
  )
}

import { NextResponse } from 'next/server'

// Conservé pour compatibilité UptimeRobot pendant la migration.
// Sur Vercel : serverless, aucun spin-down — cette route est inerte.
export async function GET() {
  return NextResponse.json(
    { status: 'ok', platform: 'vercel', ts: Date.now() },
    { headers: { 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' } }
  )
}

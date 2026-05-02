/**
 * /api/ping — endpoint léger pour keep-alive
 * Appelé par cron externe (UptimeRobot / cron-job.org) toutes les 10 min
 * Ping aussi le backend Express pour le garder actif
 */
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || ''

export async function GET() {
  const results: Record<string, string> = {
    frontend: 'ok',
    timestamp: new Date().toISOString(),
  }

  // Ping backend Express si configuré
  if (BACKEND_URL) {
    try {
      const res = await fetch(`${BACKEND_URL}/health`, {
        signal: AbortSignal.timeout(8000),
        cache: 'no-store',
      })
      results.backend = res.ok ? 'ok' : `error_${res.status}`
    } catch {
      results.backend = 'unreachable'
    }
  } else {
    results.backend = 'not_configured'
  }

  return NextResponse.json(results, { status: 200 })
}

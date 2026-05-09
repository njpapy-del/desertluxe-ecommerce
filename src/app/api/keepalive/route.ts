import { NextResponse } from 'next/server'

// GET /api/keepalive — pingé toutes les 14 min par UptimeRobot pour éviter
// le spin-down de Render Free (qui déindexe le site sur Google)
export async function GET() {
  return NextResponse.json(
    { status: 'ok', ts: Date.now() },
    {
      headers: {
        'Cache-Control': 'no-store',
        'X-Robots-Tag':  'noindex',
      },
    }
  )
}

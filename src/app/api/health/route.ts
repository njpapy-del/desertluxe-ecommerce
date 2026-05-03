import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  return NextResponse.json(
    {
      status:    'ok',
      service:   'afefluxe-frontend',
      timestamp: new Date().toISOString(),
      version:   process.env.npm_package_version ?? '1.0.0',
      env:       process.env.NODE_ENV,
    },
    { status: 200 }
  )
}

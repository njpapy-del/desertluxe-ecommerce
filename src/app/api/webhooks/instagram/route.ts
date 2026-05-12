import { NextRequest, NextResponse }    from 'next/server'
import { handleIncomingMessage }        from '@/lib/chatbot'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl

  const mode      = searchParams.get('hub.mode')
  const token     = searchParams.get('hub.verify_token')
  const challenge = searchParams.get('hub.challenge')

  if (mode === 'subscribe' && token === process.env.WEBHOOK_VERIFY_TOKEN) {
    return new NextResponse(challenge ?? '', {
      status: 200,
      headers: { 'Content-Type': 'text/plain' },
    })
  }

  return new NextResponse('Forbidden', { status: 403 })
}

export async function POST(req: NextRequest) {
  // Répondre 200 immédiatement — Meta abandonne si réponse > 20 s
  const responsePromise = NextResponse.json({ received: true }, { status: 200 })

  try {
    const body = await req.json()
    console.log('[webhook/instagram] POST', JSON.stringify(body))

    // Traitement asynchrone — ne bloque pas la réponse Meta
    handleIncomingMessage(body).catch(err =>
      console.error('[webhook/instagram] chatbot error', err),
    )
  } catch {
    // payload non-JSON ignoré
  }

  return responsePromise
}

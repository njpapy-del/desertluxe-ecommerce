const GRAPH_API = 'https://graph.facebook.com/v19.0'

export type Platform = 'instagram' | 'messenger'

export async function sendReply(
  recipientId: string,
  text: string,
  platform: Platform = 'messenger',
): Promise<void> {
  const token = process.env.FACEBOOK_PAGE_ACCESS_TOKEN ?? process.env.INSTAGRAM_ACCESS_TOKEN

  if (!token) {
    console.warn('[chatbot/messenger] No page access token configured — reply skipped')
    return
  }

  const endpoint =
    platform === 'instagram'
      ? `${GRAPH_API}/me/messages`
      : `${GRAPH_API}/me/messages`

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      recipient: { id: recipientId },
      message:   { text },
      messaging_type: 'RESPONSE',
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    console.error('[chatbot/messenger] Graph API error', res.status, err)
  }
}

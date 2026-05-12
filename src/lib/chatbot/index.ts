import { detectIntent }     from './intent'
import { generateResponse } from './responses'
import { sendReply }        from './messenger'
import type { Platform }    from './messenger'
import { scheduleAppointment, createOrder, createSupportTicket } from './automation'

interface MessagingEvent {
  sender:    { id: string }
  recipient: { id: string }
  message?:  { text?: string; mid?: string }
  postback?: { payload?: string }
}

interface WebhookEntry {
  id:        string
  messaging?: MessagingEvent[]
  changes?:  unknown[]
}

interface WebhookPayload {
  object: string
  entry:  WebhookEntry[]
}

export async function handleIncomingMessage(payload: WebhookPayload): Promise<void> {
  const platform: Platform =
    payload.object === 'instagram' ? 'instagram' : 'messenger'

  for (const entry of payload.entry ?? []) {
    for (const event of entry.messaging ?? []) {
      const senderId = event.sender?.id
      const text     = event.message?.text?.trim()

      if (!senderId || !text) continue

      console.log(`[chatbot] ${platform} | from=${senderId} | text="${text}"`)

      const intent   = detectIntent(text)
      const response = generateResponse(intent)

      // Répondre via Graph API
      await sendReply(senderId, response, platform)

      // Déclencher automations métier si pertinent
      const now = new Date().toISOString()
      if (intent === 'appointment') {
        await scheduleAppointment({ senderId, platform, requestedAt: now, notes: text })
      } else if (intent === 'order') {
        await createOrder({ senderId, platform, notes: text })
      } else if (intent === 'support') {
        await createSupportTicket({ senderId, platform, issue: text, createdAt: now })
      }
    }
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { MOCK_PRODUCTS } from '@/lib/mockData'

// ─── Ollama configuration ─────────────────────────────────────────────────────
const OLLAMA_URL   = process.env.OLLAMA_URL   || 'http://localhost:11434'
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'qwen2.5:7b'

// ─── Product context for RAG ──────────────────────────────────────────────────
function buildProductContext(): string {
  return MOCK_PRODUCTS.map((p) =>
    `• ${p.name} — ${p.price}€ (${p.category.name}) | Stock: ${p.stock} | Note: ${p.rating}★\n  ${p.description}`
  ).join('\n\n')
}

function buildSystemPrompt(): string {
  return `Tu es Leila, la conseillère IA de DESERTLUXE — une marque de mode luxe inspirée de Dubaï.

Ta personnalité :
- Élégante, chaleureuse et professionnelle
- Experte en sacs à main, accessoires et mode luxe
- Réponds dans la langue du client (français ou anglais)
- Courte et précise (2-4 phrases max sauf si demandé)

Informations boutique :
- Livraison offerte dès 200€
- Express 24-48h à Dubaï, 3-5j international
- Paiement sécurisé : Stripe + WhatsApp
- Retours 30 jours
- Support WhatsApp : ${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+33600000000'}

Catalogue actuel :
${buildProductContext()}

Règles :
- Ne jamais inventer de produits hors catalogue
- Pour des problèmes de commande → WhatsApp
- Quand tu recommandes un produit, mentionne son nom et son prix`
}

interface Message {
  role: 'user' | 'assistant' | 'system'
  content: string
}

// ─── Ollama client ────────────────────────────────────────────────────────────
async function callOllama(messages: Message[]): Promise<string> {
  const response = await fetch(`${OLLAMA_URL}/api/chat`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model:    OLLAMA_MODEL,
      messages,
      stream:   false,
      options: {
        temperature: 0.7,
        top_p:       0.9,
        num_predict: 512,
      },
    }),
    signal: AbortSignal.timeout(30_000),
  })

  if (!response.ok) {
    throw new Error(`Ollama error: ${response.status} ${response.statusText}`)
  }

  const data = await response.json()
  return data.message?.content || data.response || 'Je ne peux pas répondre pour le moment.'
}

// ─── Fallback: simple rule-based response ────────────────────────────────────
function ruleBasedResponse(message: string): string {
  const lower = message.toLowerCase()

  if (lower.includes('livraison') || lower.includes('shipping')) {
    return 'Livraison offerte dès 200€ d\'achat. Express 24-48h à Dubaï, 3-5 jours pour l\'international. 📦'
  }
  if (lower.includes('retour') || lower.includes('return')) {
    return 'Retours gratuits sous 30 jours, sans condition. Contactez-nous sur WhatsApp pour initier un retour. 💼'
  }
  if (lower.includes('paiement') || lower.includes('payment') || lower.includes('payer')) {
    return 'Nous acceptons Stripe (carte internationale), PayPal et les commandes via WhatsApp Business. 🔒'
  }
  if (lower.includes('sac') || lower.includes('bag') || lower.includes('handbag')) {
    const bags = MOCK_PRODUCTS.filter((p) => p.category.slug === 'sacs-a-main')
    const top  = bags.slice(0, 2).map((b) => `${b.name} à ${b.price}€`).join(', ')
    return `Nos best-sellers sacs : ${top}. Consultez la boutique pour voir toute la collection !`
  }
  if (lower.includes('prix') || lower.includes('price') || lower.includes('moins cher') || lower.includes('budget')) {
    const cheapest = [...MOCK_PRODUCTS].sort((a, b) => a.price - b.price)[0]
    return `Notre pièce la plus accessible est le ${cheapest.name} à ${cheapest.price}€. Nous avons des articles dès ${cheapest.price}€ !`
  }
  if (lower.includes('best') || lower.includes('populaire') || lower.includes('recommande')) {
    const best = MOCK_PRODUCTS.filter((p) => p.featured).slice(0, 2).map((p) => `${p.name} (${p.price}€)`).join(' et ')
    return `Nos pièces phares du moment : ${best}. Des créations incontournables de la collection DESERTLUXE !`
  }
  if (lower.includes('whatsapp')) {
    return `Vous pouvez nous contacter ou passer commande directement via WhatsApp au ${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+33600000000'}. Notre équipe répond sous 24h. 💬`
  }
  if (lower.includes('bonjour') || lower.includes('hello') || lower.includes('salut') || lower.includes('hi')) {
    return 'Bonjour ! Bienvenue chez DESERTLUXE. Je suis Leila, votre conseillère. Comment puis-je vous aider à trouver la pièce parfaite ?'
  }

  const random = MOCK_PRODUCTS[Math.floor(Math.random() * MOCK_PRODUCTS.length)]
  return `Je vous suggère de découvrir notre collection. Par exemple, le **${random.name}** à ${random.price}€ est très apprécié de nos clientes. Puis-je vous aider à trouver quelque chose de précis ?`
}

// ─── Route handler ────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const { message, history = [] } = await req.json()

    if (!message?.trim()) {
      return NextResponse.json({ error: 'Message required' }, { status: 400 })
    }

    const systemPrompt = buildSystemPrompt()

    const messages: Message[] = [
      { role: 'system', content: systemPrompt },
      ...history.slice(-8), // keep last 8 turns for context
      { role: 'user', content: message },
    ]

    let reply: string

    try {
      // ── Try Ollama first ───────────────────────────
      reply = await callOllama(messages)
    } catch (ollamaError) {
      console.warn('Ollama unavailable, using rule-based fallback:', ollamaError)

      // ── Try OpenAI if configured ──────────────────
      const OPENAI_KEY = process.env.OPENAI_API_KEY
      if (OPENAI_KEY && !OPENAI_KEY.startsWith('sk-placeholder')) {
        try {
          const { default: OpenAI } = await import('openai')
          const openai = new OpenAI({ apiKey: OPENAI_KEY })
          const res = await openai.chat.completions.create({
            model:       'gpt-3.5-turbo',
            messages:    messages as any,
            max_tokens:  512,
            temperature: 0.7,
          })
          reply = res.choices[0].message.content || ruleBasedResponse(message)
        } catch {
          reply = ruleBasedResponse(message)
        }
      } else {
        // ── Rule-based fallback ────────────────────
        reply = ruleBasedResponse(message)
      }
    }

    // Find related products mentioned in the reply
    const mentionedProducts = MOCK_PRODUCTS.filter(
      (p) => reply.toLowerCase().includes(p.name.toLowerCase().split(' ')[0])
    ).slice(0, 2)

    return NextResponse.json({
      reply,
      products: mentionedProducts.length > 0 ? mentionedProducts : undefined,
      model:    OLLAMA_MODEL,
    })
  } catch (error) {
    console.error('Chat error:', error)
    return NextResponse.json(
      { reply: 'Service momentanément indisponible. Contactez-nous sur WhatsApp.' },
      { status: 200 } // return 200 to avoid error display in UI
    )
  }
}

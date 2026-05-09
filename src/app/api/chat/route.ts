import { NextRequest, NextResponse } from 'next/server'
import { MOCK_PRODUCTS } from '@/lib/mockData'

// ── Environnement ─────────────────────────────────────────────────────────────
const IS_PROD      = process.env.NODE_ENV === 'production'
const OLLAMA_URL   = process.env.OLLAMA_URL   || 'http://localhost:11434'
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'qwen2.5:7b'

// HuggingFace — Qwen 2.5 hébergé cloud (fonctionne en prod sans Ollama)
const HF_TOKEN     = process.env.HF_TOKEN
const HF_MODEL     = process.env.HF_MODEL || 'Qwen/Qwen2.5-7B-Instruct'
const HF_API_URL   = `https://api-inference.huggingface.co/v1/chat/completions`

// ── Prompt système ────────────────────────────────────────────────────────────
function buildProductContext(): string {
  return MOCK_PRODUCTS.map((p) =>
    `• ${p.name} — ${p.price}€ (${p.category.name}) | Stock: ${p.stock} | Note: ${p.rating}★\n  ${p.description}`
  ).join('\n\n')
}

function buildSystemPrompt(): string {
  return `Tu es Leila, la conseillère IA de MA LUXURY — boutique de mode luxe importée de Dubaï et Turquie, livraison en Tunisie.

Personnalité : élégante, chaleureuse, professionnelle. Experte en sacs, robes, jeans, chaussures et bijoux.
Langue : réponds toujours en français. Sois précise et concise (2-4 phrases max).

Boutique MA LUXURY :
- Produits importés directement de Dubaï et Turquie
- Livraison rapide en Tunisie (24-48h)
- Paiement sécurisé, retours 30 jours
- Contact WhatsApp : ${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+21600000000'}

Catalogue actuel :
${buildProductContext()}

Règles absolues :
- Ne jamais inventer de produits hors catalogue
- Pour toute commande ou problème → rediriger vers WhatsApp
- Mentionner nom + prix exact quand tu recommandes`
}

interface Message {
  role: 'user' | 'assistant' | 'system'
  content: string
}

// ── 1. HuggingFace Qwen 2.5 (cloud, prod-ready) ───────────────────────────────
async function callHuggingFace(messages: Message[]): Promise<string> {
  if (!HF_TOKEN) throw new Error('HF_TOKEN non configuré')

  const res = await fetch(HF_API_URL, {
    method:  'POST',
    headers: {
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${HF_TOKEN}`,
    },
    body: JSON.stringify({
      model:       HF_MODEL,
      messages,
      max_tokens:  512,
      temperature: 0.7,
      top_p:       0.9,
      stream:      false,
    }),
    signal: AbortSignal.timeout(25_000), // 25s max
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`HuggingFace ${res.status}: ${err}`)
  }

  const data = await res.json()
  const content = data.choices?.[0]?.message?.content
  if (!content) throw new Error('HuggingFace: réponse vide')
  return content
}

// ── 2. Ollama local (dev uniquement) ─────────────────────────────────────────
async function callOllama(messages: Message[]): Promise<string> {
  const res = await fetch(`${OLLAMA_URL}/api/chat`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model:   OLLAMA_MODEL,
      messages,
      stream:  false,
      options: { temperature: 0.7, top_p: 0.9, num_predict: 512 },
    }),
    signal: AbortSignal.timeout(8_000),
  })
  if (!res.ok) throw new Error(`Ollama ${res.status}`)
  const data = await res.json()
  const content = data.message?.content || data.response
  if (!content) throw new Error('Ollama: réponse vide')
  return content
}

// ── 3. OpenAI (si clé configurée) ────────────────────────────────────────────
async function callOpenAI(messages: Message[]): Promise<string> {
  const key = process.env.OPENAI_API_KEY
  if (!key || key.startsWith('sk-placeholder')) throw new Error('No OpenAI key')
  const { default: OpenAI } = await import('openai')
  const openai = new OpenAI({ apiKey: key })
  const res = await openai.chat.completions.create({
    model:       'gpt-3.5-turbo',
    messages:    messages as any,
    max_tokens:  400,
    temperature: 0.7,
  })
  const content = res.choices[0].message.content
  if (!content) throw new Error('OpenAI: réponse vide')
  return content
}

// ── 4. Règles métier (0ms, toujours disponible) ───────────────────────────────
function ruleBasedResponse(message: string): string {
  const q = message.toLowerCase()

  if (/bonjour|salut|hello|bonsoir|salam|hi\b/.test(q))
    return 'Bonjour et bienvenue chez MA LUXURY ! Je suis Leila, votre conseillère mode. Comment puis-je vous aider aujourd\'hui ?'

  if (/livraison|délai|expédition|recevoir/.test(q))
    return 'Livraison rapide partout en Tunisie sous 24 à 48h. Tous nos produits sont importés directement de Dubaï et Turquie. 📦'

  if (/retour|remboursement|échanger/.test(q))
    return 'Retours acceptés sous 30 jours, sans condition. Contactez-nous sur WhatsApp pour initier votre retour. ✅'

  if (/paiement|payer|règlement/.test(q))
    return 'Paiement sécurisé en ligne ou à la livraison. Commandes aussi via WhatsApp Business. 🔒'

  if (/sac|bag/.test(q)) {
    const items = MOCK_PRODUCTS.filter(p => p.category.slug === 'sacs-a-main').slice(0, 2)
    return `Nos sacs vedettes : ${items.map(p => `${p.name} à ${p.price}€`).join(' et ')}. Voir la boutique pour la collection complète !`
  }

  if (/robe|dress/.test(q)) {
    const items = MOCK_PRODUCTS.filter(p => p.category.slug === 'robes').slice(0, 2)
    return `Robes en vedette : ${items.map(p => `${p.name} à ${p.price}€`).join(' et ')}. Parfaites pour toutes les occasions.`
  }

  if (/jean|denim/.test(q)) {
    const items = MOCK_PRODUCTS.filter(p => p.category.slug === 'jeans').slice(0, 2)
    return `Collection jeans : ${items.map(p => `${p.name} à ${p.price}€`).join(' et ')}. Denim premium importé de Turquie.`
  }

  if (/chaussure|sandale|escarpin|bottine/.test(q)) {
    const items = MOCK_PRODUCTS.filter(p => p.category.slug === 'chaussures').slice(0, 2)
    return `Chaussures du moment : ${items.map(p => `${p.name} à ${p.price}€`).join(' et ')}. Style et confort garantis.`
  }

  if (/bijou|collier|bracelet|\bor\b/.test(q)) {
    const items = MOCK_PRODUCTS.filter(p => p.category.slug === 'bijoux').slice(0, 2)
    return `Bijoux & Or : ${items.map(p => `${p.name} à ${p.price}€`).join(' et ')}. Plaqué or 18 carats, livrés en écrin.`
  }

  if (/whatsapp|contact|appel/.test(q))
    return `Contactez-nous sur WhatsApp : ${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+21600000000'}. Réponse en moins de 24h. 💬`

  if (/prix|budget|moins cher|pas cher/.test(q)) {
    const cheapest = [...MOCK_PRODUCTS].sort((a, b) => a.price - b.price)[0]
    return `Notre pièce la plus accessible : ${cheapest.name} à seulement ${cheapest.price}€. Excellent rapport qualité-prix !`
  }

  const picks = MOCK_PRODUCTS.filter(p => p.featured)
  const pick  = picks[Math.floor(Math.random() * picks.length)]
  return `Je vous suggère notre **${pick.name}** à ${pick.price}€, très apprécié de nos clientes. Puis-je vous aider à trouver quelque chose de précis ?`
}

// ── Handler principal ─────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const { message, history = [] } = await req.json()
    if (!message?.trim()) {
      return NextResponse.json({ error: 'Message requis' }, { status: 400 })
    }

    const messages: Message[] = [
      { role: 'system', content: buildSystemPrompt() },
      ...history.slice(-6),
      { role: 'user', content: message },
    ]

    let reply = ''
    let source = 'rules'

    if (IS_PROD) {
      // PRODUCTION : HuggingFace (Qwen 2.5 cloud) → OpenAI → Règles
      try   { reply = await callHuggingFace(messages); source = 'huggingface' }
      catch (e) {
        console.warn('HuggingFace failed:', e instanceof Error ? e.message : e)
        try   { reply = await callOpenAI(messages); source = 'openai' }
        catch { reply = ruleBasedResponse(message) }
      }
    } else {
      // DEV LOCAL : Ollama → HuggingFace → OpenAI → Règles
      try   { reply = await callOllama(messages); source = 'ollama' }
      catch {
        try   { reply = await callHuggingFace(messages); source = 'huggingface' }
        catch {
          try   { reply = await callOpenAI(messages); source = 'openai' }
          catch { reply = ruleBasedResponse(message) }
        }
      }
    }

    if (!reply) reply = ruleBasedResponse(message)

    const mentioned = MOCK_PRODUCTS.filter(
      p => reply.toLowerCase().includes(p.name.toLowerCase().split(' ')[0])
    ).slice(0, 2)

    return NextResponse.json({
      reply,
      products: mentioned.length ? mentioned : undefined,
      _src:     IS_PROD ? undefined : source, // debug info en local seulement
    })
  } catch (error) {
    console.error('Chat error:', error)
    return NextResponse.json(
      { reply: 'Service momentanément indisponible. Contactez-nous sur WhatsApp.' },
      { status: 200 }
    )
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { MOCK_PRODUCTS } from '@/lib/mockData'

// ── Environnement ─────────────────────────────────────────────────────────────
const IS_PROD      = process.env.NODE_ENV === 'production'
const OLLAMA_URL   = process.env.OLLAMA_URL   || 'http://localhost:11434'
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'llama3.2:3b'

// Groq — Llama 3 cloud, gratuit, ~600 tok/s (remplace Groq)
const GROQ_API_KEY = process.env.GROQ_API_KEY
const GROQ_MODEL   = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile'
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'

// ── Prompt système ────────────────────────────────────────────────────────────
function buildProductContext(): string {
  return MOCK_PRODUCTS.map((p) =>
    `• ${p.name} — ${p.price}€ (${p.category.name}) | Stock: ${p.stock} | Note: ${p.rating}★\n  ${p.description}`
  ).join('\n\n')
}

function buildSystemPrompt(): string {
  return `You are Leila, the AI advisor for MY LUXURY — a luxury fashion boutique importing from Dubai and Turkey, delivering to Tunisia.

Personality: elegant, warm, professional. Expert in bags, dresses, shoes, jewellery, hair oils, and Arabic perfumes.
Language: reply in the same language the customer uses (English or Arabic). Be precise and concise (2-4 sentences max).

STRICT FACTS about MY LUXURY — only state these facts:
- Delivery ONLY within Tunisia, 24-48h. Zero international delivery.
- Free returns within 30 days
- Secure payment online or cash on delivery
- WhatsApp contact: ${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+971522110904'}

STRICTLY FORBIDDEN — never mention or invent:
- Discounts, promotions, promo codes, bundle prices → they do NOT exist
- Delivery outside Tunisia → we do NOT ship internationally
- Delivery times other than 24-48h
- Services not listed above (loyalty programs, partners, etc.)
- Any information not in the catalogue or the facts above

If a customer asks something you don't know or that isn't listed → reply honestly "I don't have that information" and redirect to WhatsApp.

Current catalogue:
${buildProductContext()}

When recommending a product: quote its exact name + its exact price from the catalogue.`
}

interface Message {
  role: 'user' | 'assistant' | 'system'
  content: string
}

// ── 1. Groq — Llama 3.1 cloud, gratuit, ~600 tok/s ───────────────────────────
async function callGroq(messages: Message[]): Promise<string> {
  if (!GROQ_API_KEY) throw new Error('GROQ_API_KEY non configuré')

  const res = await fetch(GROQ_API_URL, {
    method:  'POST',
    headers: {
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model:       GROQ_MODEL,
      messages,
      max_tokens:  512,
      temperature: 0.7,
      top_p:       0.9,
      stream:      false,
    }),
    signal: AbortSignal.timeout(20_000),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Groq ${res.status}: ${err}`)
  }

  const data = await res.json()
  const content = data.choices?.[0]?.message?.content
  if (!content) throw new Error('Groq: réponse vide')
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
    return 'Hello and welcome to MY LUXURY! I\'m Leila, your fashion advisor. How can I help you today? ✨'

  if (/livraison|d[eé]lai|exp[eé]dition|recevoir|delivery|shipping/.test(q))
    return 'Fast delivery throughout Tunisia within 24 to 48 hours. All our products are imported directly from Dubai and Turkey. 📦'

  if (/retour|remboursement|[eé]changer|return|refund/.test(q))
    return 'Returns accepted within 30 days, no questions asked. Contact us on WhatsApp to start your return. ✅'

  if (/paiement|payer|r[eè]glement|payment|pay/.test(q))
    return 'Secure payment online or cash on delivery. Orders also accepted via WhatsApp Business. 🔒'

  if (/sac|bag/.test(q)) {
    const items = MOCK_PRODUCTS.filter(p => p.category.slug === 'sacs-a-main').slice(0, 2)
    return `Our top bags: ${items.map(p => `${p.name} at ${p.price}€`).join(' and ')}. Visit the boutique for the full collection!`
  }

  if (/robe|dress/.test(q)) {
    const items = MOCK_PRODUCTS.filter(p => p.category.slug === 'robes').slice(0, 2)
    return `Featured dresses: ${items.map(p => `${p.name} at ${p.price}€`).join(' and ')}. Perfect for every occasion.`
  }

  if (/huile|cheveux|capillaire|argan|soin|hair|oil/.test(q)) {
    const items = MOCK_PRODUCTS.filter(p => p.category.slug === 'huile-cheveux').slice(0, 2)
    const list = items.length ? items.map(p => `${p.name} at ${p.price}€`).join(' and ') : 'our premium selection'
    return `Our hair oils: ${list}. Enriched with vitamins A, B5, B7, C, D & E — argan, jojoba, castor. Natural care imported from Dubai.`
  }

  if (/parfum|oud|rose|ambre|musc|santal|jasmin|fragrance|ibraq|senteur|perfume/.test(q)) {
    const items = MOCK_PRODUCTS.filter(p => p.category.slug === 'parfums').slice(0, 2)
    const list = items.length ? items.map(p => `${p.name} at ${p.price}€`).join(' and ') : 'our Ibraq selection'
    return `Our Arabic perfumes 75 ml: ${list}. Ibraq Perfumes collection — oud, Taif rose, amber, musk. 10-12h sillage, luxury bottles. Shipped from Saudi Arabia.`
  }

  if (/chaussure|sandale|escarpin|bottine|shoe|sandal|heel/.test(q)) {
    const items = MOCK_PRODUCTS.filter(p => p.category.slug === 'chaussures').slice(0, 2)
    return `Top shoes right now: ${items.map(p => `${p.name} at ${p.price}€`).join(' and ')}. Style and comfort guaranteed.`
  }

  if (/bijou|collier|bracelet|\bor\b|jewel|gold|necklace/.test(q)) {
    const items = MOCK_PRODUCTS.filter(p => p.category.slug === 'bijoux').slice(0, 2)
    return `Jewellery & Gold: ${items.map(p => `${p.name} at ${p.price}€`).join(' and ')}. 18-carat gold-plated, delivered in a gift box.`
  }

  if (/whatsapp|contact|appel|call/.test(q))
    return `Contact us on WhatsApp: ${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+971522110904'}. Response within 24 hours. 💬`

  if (/prix|budget|moins cher|pas cher|price|cheap/.test(q)) {
    const cheapest = [...MOCK_PRODUCTS].sort((a, b) => a.price - b.price)[0]
    return `Our most affordable piece: ${cheapest.name} at only ${cheapest.price}€. Outstanding value!`
  }

  if (/r[eé]duction|promo|remise|discount|code|fid[eé]lit[eé]|group[eé]e|lot|pack/.test(q))
    return `We do not offer promotions or bundle discounts. All our prices are already optimised for the Tunisian market. For any questions, contact us on WhatsApp. 💬`

  if (/livr.*hors|livr.*france|livr.*alg[eé]rie|livr.*maroc|livr.*europe|livr.*international|international.*livr|hors.*tunisie|exp[eé]dition.*internationale/.test(q))
    return `We deliver only within Tunisia, nationwide, within 24 to 48 hours. We do not offer international shipping at this time. 📦`

  if (/bient[oô]t|prochainement|nouveaut[eé].*arrive|futur|soon|upcoming/.test(q))
    return `I don't have information on upcoming arrivals. Follow us or contact us on WhatsApp to stay informed. 💬`

  const picks = MOCK_PRODUCTS.filter(p => p.featured)
  const pick  = picks[Math.floor(Math.random() * picks.length)]
  return `I'd suggest our **${pick.name}** at ${pick.price}€, very popular with our customers. Can I help you find something specific?`
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

    // Règles prioritaires AVANT le LLM — évite toute hallucination sur les sujets clés
    const ruleReply = ruleBasedResponse(message)
    const isDefinitiveRule = /bonjour|salut|hello|bonsoir|salam|\bhi\b|livraison|d[eé]lai|exp[eé]dition|recevoir|delivery|shipping|retour|remboursement|[eé]changer|return|refund|paiement|payer|r[eè]glement|payment|\bpay\b|whatsapp|contact|appel|r[eé]duction|promo|remise|discount|fid[eé]lit[eé]|group[eé]e|livr.{1,10}hors|hors.{1,10}tunisie|international|bient[oô]t|prochainement|soon|upcoming/.test(message.toLowerCase())

    if (isDefinitiveRule) {
      reply  = ruleReply
      source = 'rules'
    } else if (IS_PROD) {
      // PRODUCTION : Groq (Llama 3.3-70B cloud) → OpenAI → Règles
      try   { reply = await callGroq(messages); source = 'groq' }
      catch (e) {
        console.warn('Groq failed:', e instanceof Error ? e.message : e)
        try   { reply = await callOpenAI(messages); source = 'openai' }
        catch { reply = ruleReply }
      }
    } else {
      // DEV LOCAL : Ollama → Groq → OpenAI → Règles
      try   { reply = await callOllama(messages); source = 'ollama' }
      catch {
        try   { reply = await callGroq(messages); source = 'groq' }
        catch {
          try   { reply = await callOpenAI(messages); source = 'openai' }
          catch { reply = ruleReply }
        }
      }
    }

    if (!reply) reply = ruleReply

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
      { reply: 'Service temporarily unavailable. Please contact us on WhatsApp.' },
      { status: 200 }
    )
  }
}

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
  return `Tu es Leila, la conseillère IA de MA LUXURY — boutique de mode luxe importée de Dubaï et Turquie, livraison en Tunisie.

Personnalité : élégante, chaleureuse, professionnelle. Experte en sacs, robes, chaussures, bijoux et huiles capillaires.
Langue : réponds toujours en français. Sois précise et concise (2-4 phrases max).

FAITS STRICTS sur MA LUXURY — tu ne peux affirmer QUE ces faits :
- Livraison UNIQUEMENT en Tunisie, délai 24-48h. Zéro livraison internationale.
- Retours gratuits sous 30 jours
- Paiement sécurisé en ligne ou à la livraison
- Contact WhatsApp : ${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+971522110904'}

INTERDIT ABSOLU — ne jamais mentionner ni inventer :
- Des réductions, promotions, codes promo, prix groupés → ils n'existent PAS
- Des pays de livraison autres que la Tunisie → on ne livre PAS ailleurs
- Des délais autres que 24-48h
- Des services non listés ci-dessus (programme fidélité, partenaires, etc.)
- Toute information absente du catalogue ou des faits ci-dessus

Si une cliente demande quelque chose que tu ne sais pas ou qui n'est pas listé → réponds honnêtement "Je n'ai pas cette information" et redirige vers WhatsApp.

Catalogue actuel :
${buildProductContext()}

Quand tu recommandes un produit : cite son nom exact + son prix exact du catalogue.`
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

  if (/huile|cheveux|capillaire|argan|soin/.test(q)) {
    const items = MOCK_PRODUCTS.filter(p => p.category.slug === 'huile-cheveux').slice(0, 2)
    const list = items.length ? items.map(p => `${p.name} à ${p.price}€`).join(' et ') : 'notre sélection premium'
    return `Nos huiles capillaires : ${list}. Formules enrichies en vitamines A, B5, B7, C, D et E — argan, jojoba, ricin. Soins naturels importés de Dubaï.`
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
    return `Contactez-nous sur WhatsApp : ${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+971522110904'}. Réponse en moins de 24h. 💬`

  if (/prix|budget|moins cher|pas cher/.test(q)) {
    const cheapest = [...MOCK_PRODUCTS].sort((a, b) => a.price - b.price)[0]
    return `Notre pièce la plus accessible : ${cheapest.name} à seulement ${cheapest.price}€. Excellent rapport qualité-prix !`
  }

  if (/réduction|reduction|promo|remise|discount|code|fidélité|fidelite|groupée|groupee|lot|pack/.test(q))
    return `Nous ne proposons pas de promotions ni de réductions groupées pour le moment. Tous nos prix sont déjà optimisés pour le marché tunisien. Pour toute question, contactez-nous sur WhatsApp. 💬`

  if (/livr.*hors|livr.*france|livr.*algérie|livr.*algerie|livr.*maroc|livr.*europe|livr.*international|international.*livr|hors.*tunisie|expédition.*internationale/.test(q))
    return `Nous livrons uniquement en Tunisie, partout sur le territoire, sous 24 à 48h. Nous n'assurons pas de livraison internationale pour le moment. 📦`

  if (/bientôt|prochainement|nouveauté.*arrive|futur/.test(q))
    return `Je n'ai pas d'information sur les prochaines nouveautés. Suivez-nous ou contactez-nous sur WhatsApp pour rester informé. 💬`

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

    // Règles prioritaires AVANT le LLM — évite toute hallucination sur les sujets clés
    const ruleReply = ruleBasedResponse(message)
    const isDefinitiveRule = /bonjour|salut|hello|bonsoir|salam|\bhi\b|livraison|délai|d[eé]lai|expédition|recevoir|retour|remboursement|[eé]changer|paiement|payer|r[eè]glement|whatsapp|contact|appel|r[ée]duction|promo|remise|discount|fid[eé]lit[eé]|groupée|groupee|livr.{1,10}hors|hors.{1,10}tunisie|international|bient[oô]t|prochainement/.test(message.toLowerCase())

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
      { reply: 'Service momentanément indisponible. Contactez-nous sur WhatsApp.' },
      { status: 200 }
    )
  }
}

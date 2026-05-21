import type { Intent } from './intent'

const RESPONSES: Record<Intent, string> = {
  greeting:
    'Bonjour 👋 bienvenue chez MY LUXURY. Comment pouvons-nous vous aider aujourd\'hui ?',

  pricing:
    'Nos offres MY LUXURY sont personnalisées selon vos besoins. Pouvez-vous préciser votre demande ?',

  appointment:
    '📅 Nous serions ravis de planifier un rendez-vous pour vous. Indiquez-nous vos disponibilités et un conseiller MY LUXURY vous contactera très vite.',

  order:
    '🛍️ Pour passer commande ou suivre une livraison, rendez-vous sur notre boutique : https://my-luxury.vercel.app — un conseiller reste disponible pour vous accompagner.',

  support:
    '🛠️ Notre équipe MY LUXURY prend note de votre demande. Un conseiller vous répondra dans les meilleurs délais. Vous pouvez aussi nous joindre sur WhatsApp au +971522110904.',

  default:
    'Merci pour votre message 🙏 un conseiller MY LUXURY vous répondra rapidement ou envoyez un message par WhatsApp au +971522110904.',
}

export function generateResponse(intent: Intent): string {
  return RESPONSES[intent]
}

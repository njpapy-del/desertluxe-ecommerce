export type Intent =
  | 'greeting'
  | 'pricing'
  | 'appointment'
  | 'order'
  | 'support'
  | 'default'

const PATTERNS: { intent: Intent; keywords: string[] }[] = [
  {
    intent: 'greeting',
    keywords: ['bonjour', 'bonsoir', 'salut', 'hello', 'hi', 'salam', 'coucou', 'bjr'],
  },
  {
    intent: 'pricing',
    keywords: ['prix', 'tarif', 'combien', 'coût', 'cout', 'cost', 'price', 'cher'],
  },
  {
    intent: 'appointment',
    keywords: ['rendez-vous', 'rdv', 'réserver', 'réservation', 'reserver', 'appointment', 'disponible', 'quand'],
  },
  {
    intent: 'order',
    keywords: ['commande', 'commander', 'acheter', 'achat', 'livraison', 'order', 'buy'],
  },
  {
    intent: 'support',
    keywords: ['problème', 'probleme', 'aide', 'help', 'erreur', 'retour', 'remboursement', 'remboursor'],
  },
]

export function detectIntent(text: string): Intent {
  const normalized = text.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')

  for (const { intent, keywords } of PATTERNS) {
    if (keywords.some(k => normalized.includes(k))) return intent
  }

  return 'default'
}

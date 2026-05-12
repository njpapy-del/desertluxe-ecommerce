import { MetadataRoute } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://desertluxe-frontend.onrender.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Tous les crawlers : accès complet au contenu public
        userAgent: '*',
        allow:     '/',
        disallow: [
          '/admin',           // dashboard admin
          '/api/',            // endpoints API internes
          '/checkout',        // page de paiement (no-index)
          '/_next/',          // assets Next.js internes
        ],
      },
      {
        // GPTBot (OpenAI) — bloquer pour protéger le contenu luxe
        userAgent: 'GPTBot',
        disallow:  '/',
      },
      {
        // Claude bot (Anthropic)
        userAgent: 'anthropic-ai',
        disallow:  '/',
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host:    BASE_URL,
  }
}

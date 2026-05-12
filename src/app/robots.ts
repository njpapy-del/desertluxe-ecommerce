import { MetadataRoute } from 'next'

// Domaine canonique — hardcodé pour robots.txt (ne doit jamais dépendre d'env mal configuré)
const CANONICAL = 'https://desertluxe-ecommerce.vercel.app'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow:    '/',
        disallow: ['/admin', '/api/', '/checkout'],
      },
      {
        userAgent: 'GPTBot',
        disallow:  '/',
      },
      {
        userAgent: 'anthropic-ai',
        disallow:  '/',
      },
    ],
    sitemap: `${CANONICAL}/sitemap.xml`,
  }
}

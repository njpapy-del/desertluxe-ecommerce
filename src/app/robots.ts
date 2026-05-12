import { MetadataRoute } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://desertluxe-ecommerce.vercel.app'

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
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}

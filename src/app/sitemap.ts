import { MetadataRoute } from 'next'
import { MOCK_PRODUCTS } from '@/lib/mockData'

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://desertluxe-ecommerce.vercel.app'

export const dynamic = 'force-dynamic'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  // ── Pages statiques prioritaires ──────────────────────────────────────────
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url:              BASE_URL,
      lastModified:     now,
      changeFrequency:  'daily',
      priority:         1.0,
    },
    {
      url:              `${BASE_URL}/shop`,
      lastModified:     now,
      changeFrequency:  'daily',
      priority:         0.9,
    },
    {
      url:              `${BASE_URL}/shop?category=sacs-a-main`,
      lastModified:     now,
      changeFrequency:  'weekly',
      priority:         0.8,
    },
    {
      url:              `${BASE_URL}/shop?category=accessoires`,
      lastModified:     now,
      changeFrequency:  'weekly',
      priority:         0.8,
    },
    {
      url:              `${BASE_URL}/shop?category=nouveautes`,
      lastModified:     now,
      changeFrequency:  'daily',
      priority:         0.8,
    },
    {
      url:              `${BASE_URL}/shop?category=best-sellers`,
      lastModified:     now,
      changeFrequency:  'weekly',
      priority:         0.75,
    },
    {
      url:              `${BASE_URL}/about`,
      lastModified:     now,
      changeFrequency:  'monthly',
      priority:         0.5,
    },
  ]

  // ── Pages produits dynamiques ──────────────────────────────────────────────
  const productRoutes: MetadataRoute.Sitemap = MOCK_PRODUCTS.map((product) => ({
    url:             `${BASE_URL}/product/${product.slug}`,
    lastModified:    new Date(product.updatedAt),
    changeFrequency: 'weekly' as const,
    priority:        product.featured ? 0.85 : 0.7,
  }))

  return [...staticRoutes, ...productRoutes]
}

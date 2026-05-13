import { NextResponse }                from 'next/server'
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from '@/lib/mockData'

export const dynamic = 'force-static'

const BASE = 'https://desertluxe-ecommerce.vercel.app'

function urlEntry(
  loc:        string,
  lastmod:    string,
  changefreq: string,
  priority:   string,
) {
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
}

export async function GET() {
  const today = new Date().toISOString().split('T')[0]

  const staticEntries = [
    urlEntry(`${BASE}/`,      today, 'daily',   '1.0'),
    urlEntry(`${BASE}/shop`,  today, 'daily',   '0.9'),
    urlEntry(`${BASE}/about`, today, 'monthly', '0.5'),
  ]

  const categoryEntries = MOCK_CATEGORIES.map(cat =>
    urlEntry(`${BASE}/shop?category=${cat.slug}`, today, 'weekly', '0.8'),
  )

  const productEntries = MOCK_PRODUCTS.map(p =>
    urlEntry(
      `${BASE}/product/${p.slug}`,
      p.updatedAt.split('T')[0],
      'weekly',
      p.featured ? '0.85' : '0.7',
    ),
  )

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...staticEntries,
    ...categoryEntries,
    ...productEntries,
    '</urlset>',
  ].join('\n')

  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type':  'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}

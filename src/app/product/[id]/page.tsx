import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MOCK_PRODUCTS } from '@/lib/mockData'
import ProductClient from './ProductClient'

const BASE_URL = 'https://desertluxe-frontend.onrender.com'

// ── Static params pour pré-rendu de toutes les pages produit ─────────────────
export function generateStaticParams() {
  return MOCK_PRODUCTS.map((p) => ({ id: p.slug }))
}

// ── Metadata dynamique par produit ────────────────────────────────────────────
export async function generateMetadata(
  { params }: { params: { id: string } }
): Promise<Metadata> {
  const product = MOCK_PRODUCTS.find((p) => p.slug === params.id || p.id === params.id)
  if (!product) return { title: 'Produit introuvable | Ma Luxury' }

  const url = `${BASE_URL}/product/${product.slug}`
  const img = product.images[0]

  return {
    title: `${product.name} — ${product.price}€ | Ma Luxury`,
    description: product.description.slice(0, 155),
    alternates: { canonical: url },
    openGraph: {
      type:        'website',
      url,
      title:       `${product.name} | Ma Luxury`,
      description: product.description.slice(0, 155),
      images: [{ url: img, width: 800, height: 800, alt: product.name }],
    },
    twitter: {
      card:        'summary_large_image',
      title:       `${product.name} | Ma Luxury`,
      description: product.description.slice(0, 155),
      images:      [img],
    },
  }
}

// ── Page (Server Component) ───────────────────────────────────────────────────
export default function ProductPage({ params }: { params: { id: string } }) {
  const found = MOCK_PRODUCTS.find((p) => p.slug === params.id || p.id === params.id)
  if (!found) notFound()
  // notFound() throws — `found` is always defined below
  const product = found!

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type':    'Product',
    name:        product.name,
    description: product.description,
    image:       product.images,
    sku:         product.id,
    brand: { '@type': 'Brand', name: 'Ma Luxury' },
    offers: {
      '@type':       'Offer',
      url:           `${BASE_URL}/product/${product.slug}`,
      priceCurrency: 'EUR',
      price:          product.price,
      availability:   product.stock > 0
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      seller: { '@type': 'Organization', name: 'Ma Luxury' },
    },
    ...(product.reviewCount > 0 && {
      aggregateRating: {
        '@type':       'AggregateRating',
        ratingValue:    product.rating,
        reviewCount:    product.reviewCount,
        bestRating:     5,
        worstRating:    1,
      },
    }),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductClient id={params.id} />
    </>
  )
}

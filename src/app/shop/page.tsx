import { Suspense } from 'react'
import ShopContent from './ShopContent'
import { getProducts, getCategories } from '@/lib/dataService'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Boutique',
  description: 'Découvrez toute la collection MY LUXURY — sacs à main, accessoires et articles de luxe.',
}

export default async function ShopPage() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()])

  return (
    <Suspense fallback={<div className="min-h-screen bg-cream-100 animate-pulse" />}>
      <ShopContent initialProducts={products} initialCategories={categories} />
    </Suspense>
  )
}

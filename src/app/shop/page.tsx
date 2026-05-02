import { Suspense } from 'react'
import ShopContent from './ShopContent'

export const metadata = {
  title: 'Boutique',
  description: 'Découvrez toute la collection DESERTLUXE — sacs à main, accessoires et articles de luxe.',
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-cream-100 animate-pulse" />}>
      <ShopContent />
    </Suspense>
  )
}

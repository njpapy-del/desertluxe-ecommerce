import { Suspense } from 'react'
import ShopContent from './ShopContent'

// Forcer le rendu dynamique côté serveur :
// ShopContent utilise useSearchParams() — en mode statique (○) le payload RSC
// pré-calculé ne contient pas les query params, ce qui casse la navigation
// client-side avec un 404. force-dynamic garantit un rendu serveur à chaque requête.
export const dynamic = 'force-dynamic'

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

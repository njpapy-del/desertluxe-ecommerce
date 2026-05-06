import type { Metadata } from 'next'
import AboutContent from './AboutContent'

export const metadata: Metadata = {
  title: "À propos — L'univers MA LUXURY",
  description:
    "Découvrez l'histoire de MA LUXURY, boutique de sacs de luxe importés directement de Dubaï. Qualité premium, élégance authentique, livraison rapide en Tunisie.",
  keywords: [
    'MA LUXURY',
    'à propos MA LUXURY',
    'sacs luxe Tunisie',
    'sacs importés Dubaï',
    'boutique luxe en ligne Tunisie',
    'maroquinerie luxe Dubaï',
  ],
  alternates: {
    canonical: 'https://desertluxe-frontend.onrender.com/about',
  },
  openGraph: {
    title: 'À propos — MA LUXURY',
    description:
      "L'histoire d'une maison tunisienne passionnée par le luxe de Dubaï. Sacs premium, livraison partout en Tunisie.",
    url: 'https://desertluxe-frontend.onrender.com/about',
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Ma Luxury',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'MA LUXURY — À propos',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'À propos — MA LUXURY',
    description: 'Sacs de luxe importés de Dubaï. Livraison en Tunisie.',
    images: ['/og-image.jpg'],
  },
}

export default function AboutPage() {
  return <AboutContent />
}

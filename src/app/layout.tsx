import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Inter, Cormorant_Garamond } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CartDrawer from '@/components/cart/CartDrawer'
import ChatWidget from '@/components/chat/ChatWidget'
import WhatsAppFloat from '@/components/ui/WhatsAppFloat'
import ScrollProgressBar from '@/components/ui/ScrollProgressBar'
import { ErrorBoundary } from '@/components/ui/ErrorBoundary'
import './globals.css'

const playfair = Playfair_Display({
  subsets:  ['latin'],
  variable: '--font-playfair',
  display:  'swap',
})

const inter = Inter({
  subsets:  ['latin'],
  variable: '--font-inter',
  display:  'swap',
})

const cormorant = Cormorant_Garamond({
  subsets:  ['latin'],
  weight:   ['300', '400', '500'],
  variable: '--font-cormorant',
  display:  'swap',
})

const BASE_URL = 'https://desertluxe-frontend.onrender.com'

export const metadata: Metadata = {
  // ── Base URL — résout tous les chemins relatifs (og images, canonical…) ────
  metadataBase: new URL(BASE_URL),

  // ── Titre ──────────────────────────────────────────────────────────────────
  title: {
    default:  'Ma Luxury | Luxury Bags & Fashion Inspired by Dubai Elegance',
    template: '%s | Ma Luxury',
  },

  // ── Description ────────────────────────────────────────────────────────────
  description:
    'Ma Luxury is a luxury fashion brand offering premium handbags and accessories inspired by Dubai elegance, modern luxury and desert aesthetics. Fast worldwide delivery.',

  // ── Mots-clés ──────────────────────────────────────────────────────────────
  keywords: [
    'luxury bags', 'Dubai fashion', 'designer handbags', 'premium accessories',
    'luxury e-commerce', 'Ma Luxury', 'sacs luxe Dubai', 'mode luxe',
    'sacs à main créateur', 'accessoires luxe Tunisie',
  ],

  // ── Auteur / marque ────────────────────────────────────────────────────────
  authors:  [{ name: 'Ma Luxury', url: BASE_URL }],
  creator:  'Ma Luxury',
  publisher:'Ma Luxury',

  // ── Canonical ──────────────────────────────────────────────────────────────
  alternates: {
    canonical: BASE_URL,
  },

  // ── Google Search Console verification ────────────────────────────────────
  verification: {
    google: 'kDG7OC1VAzRGKVctU6suy-U-mjwFD1ubjbnOo-IzHpo',
  },

  // ── Open Graph ─────────────────────────────────────────────────────────────
  openGraph: {
    type:        'website',
    locale:      'fr_FR',
    alternateLocale: ['en_US', 'ar_AE'],
    url:         BASE_URL,
    siteName:    'Ma Luxury',
    title:       'Ma Luxury | Luxury Bags & Fashion Inspired by Dubai Elegance',
    description: 'Ma Luxury is a luxury fashion brand offering premium handbags and accessories inspired by Dubai elegance. Fast worldwide delivery.',
    images: [
      {
        url:    '/og-image.jpg',
        width:  1200,
        height: 630,
        alt:    'Ma Luxury — Luxury Fashion Inspired by Dubai',
      },
    ],
  },

  // ── Twitter / X Card ───────────────────────────────────────────────────────
  twitter: {
    card:        'summary_large_image',
    site:        '@ma-luxury',
    creator:     '@ma-luxury',
    title:       'Ma Luxury | Luxury Bags & Fashion Inspired by Dubai',
    description: 'Premium handbags and accessories inspired by Dubai elegance.',
    images:      ['/og-image.jpg'],
  },

  // ── Indexation robots ──────────────────────────────────────────────────────
  robots: {
    index:               true,
    follow:              true,
    googleBot: {
      index:             true,
      follow:            true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet':       -1,
    },
  },

  // ── App links ──────────────────────────────────────────────────────────────
  applicationName: 'Ma Luxury',
  category:        'shopping',
}

export const viewport: Viewport = {
  themeColor:   '#C9A96E',
  width:        'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      className={`${playfair.variable} ${inter.variable} ${cormorant.variable}`}
    >
      <body>
        {/* Gold scroll progress line */}
        <ScrollProgressBar />

        <Header />
        <ErrorBoundary>
          <main>{children}</main>
        </ErrorBoundary>
        <Footer />
        <CartDrawer />
        <ChatWidget />
        <WhatsAppFloat />

        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              background:    '#1A1A1A',
              color:         '#FAF8F5',
              fontFamily:    'Inter, sans-serif',
              fontSize:      '13px',
              letterSpacing: '0.02em',
              borderRadius:  '0',
              padding:       '12px 18px',
            },
          }}
        />
      </body>
    </html>
  )
}

import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Inter, Cormorant_Garamond } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CartDrawer from '@/components/cart/CartDrawer'
import ChatWidget from '@/components/chat/ChatWidget'
import ScrollProgressBar from '@/components/ui/ScrollProgressBar'
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

export const metadata: Metadata = {
  title: {
    default:  'DESERTLUXE — Luxury Fashion Inspired by Dubai',
    template: '%s | DESERTLUXE',
  },
  description:
    'Sacs a main, accessoires et articles de luxe inspires par Dubai. Livraison mondiale express. Paiement securise.',
  keywords: ['luxury fashion', 'sacs a main luxe', 'Dubai fashion', 'accessoires luxe'],
  authors:  [{ name: 'DESERTLUXE' }],
  creator:  'DESERTLUXE',
  openGraph: {
    type:        'website',
    locale:      'fr_FR',
    siteName:    'DESERTLUXE',
    title:       'DESERTLUXE — Luxury Fashion Inspired by Dubai',
    description: 'Mode luxe inspiree de Dubai. Sacs, accessoires et pieces exception.',
    images:      [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card:    'summary_large_image',
    title:   'DESERTLUXE',
    creator: '@desertluxe',
  },
  robots: { index: true, follow: true },
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
        <main>{children}</main>
        <Footer />
        <CartDrawer />
        <ChatWidget />

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

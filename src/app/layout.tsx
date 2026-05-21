import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Inter, Cormorant_Garamond, Noto_Naskh_Arabic } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CartDrawer from '@/components/cart/CartDrawer'
import ChatWidget from '@/components/chat/ChatWidget'
import WhatsAppFloat from '@/components/ui/WhatsAppFloat'
import InstagramFloat from '@/components/ui/InstagramFloat'
import FacebookFloat from '@/components/ui/FacebookFloat'
import ScrollProgressBar from '@/components/ui/ScrollProgressBar'
import LocaleProvider from '@/components/ui/LocaleProvider'
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
  preload:  false,
})

const notoArabic = Noto_Naskh_Arabic({
  subsets:  ['arabic'],
  weight:   ['400', '500', '600', '700'],
  variable: '--font-arabic',
  display:  'swap',
  preload:  false,
})

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://desertluxe-ecommerce.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default:  'My Luxury | Luxury Bags & Fashion Inspired by Dubai Elegance',
    template: '%s | My Luxury',
  },

  description:
    'My Luxury is a luxury fashion brand offering premium handbags, accessories and Arabian perfumes inspired by Dubai elegance. Fast worldwide delivery.',

  keywords: [
    'luxury bags', 'Dubai fashion', 'designer handbags', 'premium accessories',
    'luxury e-commerce', 'My Luxury', 'Arabian perfumes', 'Ibraq perfumes',
    'luxury Dubai', 'حقائب فاخرة', 'موضة دبي', 'عطور عربية',
  ],

  authors:  [{ name: 'My Luxury', url: BASE_URL }],
  creator:  'My Luxury',
  publisher:'My Luxury',

  alternates: {
    canonical: BASE_URL,
    languages: {
      'en-US': `${BASE_URL}`,
      'ar-AE': `${BASE_URL}`,
    },
  },

  verification: {
    google: 'kDG7OC1VAzRGKVctU6suy-U-mjwFD1ubjbnOo-IzHpo',
  },

  openGraph: {
    type:            'website',
    locale:          'en_US',
    alternateLocale: ['ar_AE'],
    url:             BASE_URL,
    siteName:        'My Luxury',
    title:           'My Luxury | Luxury Bags & Fashion Inspired by Dubai Elegance',
    description:     'My Luxury — premium handbags, accessories and Arabian perfumes inspired by Dubai elegance.',
    images: [
      {
        url:    '/og-image.jpg',
        width:  1200,
        height: 630,
        alt:    'My Luxury — Luxury Fashion Inspired by Dubai',
      },
    ],
  },

  twitter: {
    card:        'summary_large_image',
    site:        '@myluxurydubai',
    creator:     '@myluxurydubai',
    title:       'My Luxury | Luxury Bags & Fashion Inspired by Dubai',
    description: 'Premium handbags, accessories and Arabian perfumes inspired by Dubai elegance.',
    images:      ['/og-image.jpg'],
  },

  robots: {
    index:  true,
    follow: true,
    googleBot: {
      index:               true,
      follow:              true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet':       -1,
    },
  },

  applicationName: 'My Luxury',
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
      lang="en"
      dir="ltr"
      className={`${playfair.variable} ${inter.variable} ${cormorant.variable} ${notoArabic.variable}`}
    >
      <body>
        {/* Applies RTL + lang dynamically when user switches to Arabic */}
        <LocaleProvider />

        <ScrollProgressBar />
        <Header />
        <ErrorBoundary>
          <main>{children}</main>
        </ErrorBoundary>
        <Footer />
        <CartDrawer />
        <ChatWidget />
        <FacebookFloat />
        <InstagramFloat />
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

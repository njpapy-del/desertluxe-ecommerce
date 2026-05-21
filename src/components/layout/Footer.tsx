'use client'

import Link from 'next/link'
import { MessageCircle, Mail, MapPin } from 'lucide-react'
import EyeOfRa from '@/components/ui/EyeOfRa'
import { useLocaleStore } from '@/store/localeStore'

const SocialIcons = {
  Instagram: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
    </svg>
  ),
  Facebook: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  ),
  TikTok: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.75a8.27 8.27 0 0 0 4.83 1.55V6.85a4.85 4.85 0 0 1-1.06-.16z"/>
    </svg>
  ),
  YouTube: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
      <polygon fill="currentColor" stroke="none" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
    </svg>
  ),
}

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+971522110904'

export default function Footer() {
  const { t } = useLocaleStore()
  const f = t.footer

  const guarantees = [
    { icon: '🚚', title: f.guarantee1Title, desc: f.guarantee1Desc },
    { icon: '🇹🇳', title: f.guarantee2Title, desc: f.guarantee2Desc },
    { icon: '🔒', title: f.guarantee3Title, desc: f.guarantee3Desc },
    { icon: '↩️', title: f.guarantee4Title, desc: f.guarantee4Desc },
  ]

  return (
    <footer className="bg-luxury-dark text-cream-300">

      {/* ── Top guarantees strip ──────────────────────────── */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12
                        grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          {guarantees.map((item) => (
            <div key={item.title} className="flex flex-col items-center gap-3">
              <span className="text-3xl">{item.icon}</span>
              <h4 className="font-serif text-base text-white">{item.title}</h4>
              <p className="text-xs text-cream-400 font-sans tracking-wide">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Main ─────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand + founder */}
          <div className="lg:col-span-1">
            <span className="font-serif text-2xl tracking-[0.15em] text-white">
              <span className="inline-flex items-center gap-2">
                <EyeOfRa className="w-6 h-4 text-gold-500 opacity-90" />
                MY <span className="text-gold-500">LUXURY</span>
              </span>
            </span>
            <div className="mt-3 mb-4 pb-4 border-b border-white/10">
              <p className="text-[10px] text-gold-500 tracking-[0.2em] uppercase font-sans">{f.founder}</p>
              <p className="font-serif text-sm text-white italic mt-0.5">Madame Rebbai Afef</p>
            </div>
            <p className="text-xs text-cream-400 font-sans leading-relaxed tracking-wide">
              {f.tagline}
            </p>
            <div className="mt-6 flex gap-3">
              {[
                { Icon: SocialIcons.Instagram, href: '#', label: 'Instagram' },
                { Icon: SocialIcons.Facebook,  href: '#', label: 'Facebook'  },
                { Icon: SocialIcons.TikTok,    href: '#', label: 'TikTok'    },
                { Icon: SocialIcons.YouTube,   href: '#', label: 'YouTube'   },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 border border-white/20 flex items-center justify-center
                             hover:border-gold-500 hover:text-gold-500 transition-colors"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h5 className="text-white text-xs tracking-[0.25em] uppercase font-sans font-medium mb-6">
              {f.boutiqueTitle}
            </h5>
            <ul className="space-y-3">
              {[
                { label: t.nav.bags,        href: '/shop?category=sacs-a-main'  },
                { label: t.nav.accessories, href: '/shop?category=accessoires'  },
                { label: t.nav.newArrivals, href: '/shop?category=nouveautes'   },
                { label: t.home.bestSellers,href: '/shop?category=best-sellers' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs text-cream-400 hover:text-gold-500 transition-colors font-sans tracking-wide"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Informations */}
          <div>
            <h5 className="text-white text-xs tracking-[0.25em] uppercase font-sans font-medium mb-6">
              {f.informationsTitle}
            </h5>
            <ul className="space-y-3">
              {[
                { label: t.nav.about, href: '/about'    },
                { label: f.privacy,   href: '/privacy'  },
                { label: f.terms,     href: '/terms'    },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-xs text-cream-400 hover:text-gold-500 transition-colors font-sans tracking-wide"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h5 className="text-white text-xs tracking-[0.25em] uppercase font-sans font-medium mb-6">
              {f.contactTitle}
            </h5>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold-500 mt-0.5 shrink-0" />
                <span className="text-xs text-cream-400 font-sans leading-relaxed">
                  Dubai Design District (D3)<br />
                  Dubai, UAE
                </span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold-400 mt-0.5 shrink-0" />
                <span className="text-xs text-cream-400 font-sans leading-relaxed">
                  Tunisia — {f.guarantee2Title}<br />
                  Tunis · Sfax · Sousse · Nabeul
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold-500 shrink-0" />
                <a
                  href="mailto:contact@my-luxury.com"
                  className="text-xs text-cream-400 hover:text-gold-500 transition-colors font-sans"
                >
                  contact@my-luxury.com
                </a>
              </li>
            </ul>

            <a
              href={`https://wa.me/${WHATSAPP.replace(/\D/g, '')}?text=${encodeURIComponent('MY LUXURY 👜')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex items-center gap-2 bg-[#25D366] text-white px-4 py-2.5
                         text-xs font-sans font-medium tracking-wider uppercase
                         hover:bg-[#1EBE5D] transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              {f.orderWhatsapp}
            </a>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ────────────────────────────────────── */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5
                        flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-cream-500 font-sans">
            {f.rights}
          </p>
          <div className="flex items-center gap-3">
            {['VISA', 'MC', 'AMEX', 'PayPal', 'Apple Pay'].map((pm) => (
              <span
                key={pm}
                className="text-[9px] border border-white/20 px-2 py-1 text-cream-500 font-sans tracking-wider"
              >
                {pm}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

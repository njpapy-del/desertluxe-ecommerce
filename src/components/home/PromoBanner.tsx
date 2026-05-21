'use client'

import { useState } from 'react'
import { useLocaleStore } from '@/store/localeStore'
import type { Locale } from '@/locales/types'

const ITEMS: Record<Locale, string[]> = {
  en: [
    '✨ MY LUXURY Exclusive Promotions',
    'Free shipping to Tunisia',
    '💎 Dubai Collection 2026',
    'Signature luxury packaging',
    '⭐ 4.9★ — Over 500 satisfied customers',
    '🚀 Shipped within 24h from Dubai',
    '✦ 18-carat gold-plated jewellery',
    '🎁 Gifts & special occasions',
  ],
  ar: [
    '✨ عروض MY LUXURY الحصرية',
    'شحن مجاني إلى تونس',
    '💎 مجموعة دبي 2026',
    'تغليف فاخر مميز',
    '⭐ 4.9★ — أكثر من 500 عميلة راضية',
    '🚀 الشحن خلال 24 ساعة من دبي',
    '✦ مجوهرات مطلية بالذهب 18 قيراط',
    '🎁 هدايا ومناسبات خاصة',
  ],
}

export default function PromoBanner() {
  const [paused, setPaused] = useState(false)
  const { locale } = useLocaleStore()

  const repeated = [...ITEMS[locale], ...ITEMS[locale]]

  return (
    <div
      className="bg-luxury-dark relative overflow-hidden select-none"
      style={{ height: 40 }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Promotional information"
      role="marquee"
    >
      <div className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(to right, transparent, rgba(201,169,110,0.7), transparent)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(to right, transparent, rgba(201,169,110,0.3), transparent)' }} />

      <style>{`
        @keyframes ma-promo-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .ma-promo-track {
          animation: ma-promo-scroll 40s linear infinite;
          will-change: transform;
        }
        .ma-promo-track.paused {
          animation-play-state: paused;
        }
      `}</style>

      <div className={`ma-promo-track${paused ? ' paused' : ''} flex items-center h-full whitespace-nowrap`}>
        {repeated.map((text, i) => (
          <span key={i} className="inline-flex items-center gap-5 px-5">
            <span
              className="text-cream-200/90 font-sans"
              style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase' }}
            >
              {text}
            </span>
            <span className="text-gold-500 opacity-50 text-xs">◆</span>
          </span>
        ))}
      </div>
    </div>
  )
}

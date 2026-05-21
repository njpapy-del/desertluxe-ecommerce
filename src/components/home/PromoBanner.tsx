'use client'

import { useState } from 'react'

const ITEMS = [
  '✨ Promotions exclusives MY LUXURY',
  'Livraison offerte en Tunisie',
  '💎 Collection Dubai 2026',
  'Emballage luxe signature',
  '⭐ 4.9★ — Plus de 500 clientes satisfaites',
  '🚀 Expédition sous 24h depuis Dubaï',
  '✦ Bijoux plaqués or 18 carats',
  '🎁 Cadeaux & occasions spéciales',
]

export default function PromoBanner() {
  const [paused, setPaused] = useState(false)

  // Duplicate for seamless CSS loop (2× = animate -50% = perfect repeat)
  const repeated = [...ITEMS, ...ITEMS]

  return (
    <div
      className="bg-luxury-dark relative overflow-hidden select-none"
      style={{ height: 40 }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Informations promotionnelles"
      role="marquee"
    >
      {/* Gold glow top */}
      <div className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(to right, transparent, rgba(201,169,110,0.7), transparent)' }}
      />
      {/* Gold glow bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(to right, transparent, rgba(201,169,110,0.3), transparent)' }}
      />

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

      <div
        className={`ma-promo-track${paused ? ' paused' : ''} flex items-center h-full whitespace-nowrap`}
      >
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

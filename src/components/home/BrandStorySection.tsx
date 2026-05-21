'use client'

import { useLocaleStore } from '@/store/localeStore'

export default function BrandStorySection() {
  const { t } = useLocaleStore()
  const h = t.home

  return (
    <>
      {/* ── Brand story ──────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="section-tag mb-4">{h.storyTag}</p>
              <h2 className="font-serif text-4xl text-luxury-dark mb-6 leading-tight">
                {h.storyTitle}
                <br />
                <span className="italic text-gold-500">{h.storyTitleGold}</span>
              </h2>
              <div className="gold-divider mb-6" />
              <p className="text-luxury-gray font-sans text-sm leading-relaxed mb-4">
                {h.storyP1}
              </p>
              <p className="text-luxury-gray font-sans text-sm leading-relaxed mb-8">
                {h.storyP2}
              </p>
              <a href="/about" className="btn-luxury-outline text-xs py-3 px-7">
                {h.storyCta}
              </a>
            </div>
            <div className="relative h-80 md:h-[500px] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800&q=80"
                alt="Dubai luxury"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              <div className="absolute -bottom-4 -right-4 w-full h-full border border-gold-500 pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Collection robes ─────────────────────────── */}
      <section className="py-20 bg-luxury-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-gold-400 text-[11px] tracking-[0.35em] uppercase font-sans mb-3">
              {h.dressCollectionTag}
            </p>
            <h2 className="font-serif text-4xl text-white mb-4">
              {h.dressCollectionTitle}
            </h2>
            <div className="w-12 h-px bg-gold-500 mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="group relative overflow-hidden">
              <div className="relative h-[520px] overflow-hidden">
                <img
                  src="/images/robe-luxe.png"
                  alt={h.dressHauteCouture}
                  className="w-full h-full object-cover object-top
                             transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <p className="text-gold-400 text-[10px] tracking-[0.3em] uppercase font-sans mb-2">
                    {h.dressLimitedEdition}
                  </p>
                  <h3 className="font-serif text-2xl text-white mb-3">
                    {h.dressHauteCouture}
                  </h3>
                  <a
                    href="/shop?category=nouveautes"
                    className="inline-flex items-center gap-2 text-[11px] text-white/80
                               tracking-widest uppercase font-sans border-b border-gold-500
                               pb-0.5 hover:text-gold-400 transition-colors"
                  >
                    {h.dressDiscover}
                  </a>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden">
              <div className="relative h-[520px] overflow-hidden">
                <img
                  src="/images/robe-tunis.png"
                  alt={h.dressOriental}
                  className="w-full h-full object-cover object-top
                             transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <p className="text-gold-400 text-[10px] tracking-[0.3em] uppercase font-sans mb-2">
                    {h.dressTunisCollection}
                  </p>
                  <h3 className="font-serif text-2xl text-white mb-3">
                    {h.dressOriental}
                  </h3>
                  <a
                    href="/shop?category=nouveautes"
                    className="inline-flex items-center gap-2 text-[11px] text-white/80
                               tracking-widest uppercase font-sans border-b border-gold-500
                               pb-0.5 hover:text-gold-400 transition-colors"
                  >
                    {h.dressDiscover}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

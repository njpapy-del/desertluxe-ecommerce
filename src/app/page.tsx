import Hero from '@/components/home/Hero'
import Categories from '@/components/home/Categories'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import Newsletter from '@/components/home/Newsletter'
import PromoBanner from '@/components/home/PromoBanner'
import CategoryCarousel from '@/components/home/CategoryCarousel'
import WeeklyPromos from '@/components/home/WeeklyPromos'
import FlashSaleCountdown from '@/components/home/FlashSaleCountdown'
import HairOilVitamins from '@/components/home/HairOilVitamins'
import { MOCK_PRODUCTS } from '@/lib/mockData'

// In production: fetch from DB via Prisma
async function getFeaturedProducts() {
  // try {
  //   const { prisma } = await import('@/lib/prisma')
  //   return prisma.product.findMany({
  //     where: { featured: true, active: true },
  //     include: { category: true },
  //     orderBy: { createdAt: 'desc' },
  //     take: 8,
  //   })
  // } catch {
  return MOCK_PRODUCTS.filter((p) => p.featured)
  // }
}

export default async function HomePage() {
  const featured = await getFeaturedProducts()

  return (
    <>
      {/* ── Animated promo banner ──────────────────────── */}
      <PromoBanner />

      <Hero />
      <Categories />
      <FeaturedProducts products={featured as any} />

      {/* ── Category carousel ──────────────────────────── */}
      <CategoryCarousel />

      {/* ── Hair oil vitamins ──────────────────────────── */}
      <HairOilVitamins />

      {/* ── Weekly dynamic promos ──────────────────────── */}
      <WeeklyPromos />

      {/* ── Flash sale countdown ───────────────────────── */}
      <FlashSaleCountdown />

      {/* ── Trust section ──────────────────────────────── */}
      <section className="py-16 bg-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { emoji: '✈️', title: 'Expédition Dubai',   sub: 'Départ depuis Dubaï, EAU'    },
              { emoji: '🔒', title: 'Paiement 100% sécurisé', sub: 'Stripe + PayPal'         },
              { emoji: '📦', title: 'Emballage Luxe',     sub: 'Boîte MY LUXURY signature'  },
              { emoji: '💬', title: 'Support 7j/7',       sub: 'WhatsApp & chat en direct'    },
            ].map((item) => (
              <div key={item.title} className="flex flex-col items-center gap-2">
                <span className="text-3xl">{item.emoji}</span>
                <h4 className="font-serif text-sm text-luxury-dark">{item.title}</h4>
                <p className="text-[11px] text-luxury-gray font-sans tracking-wide">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Brand story ──────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="section-tag mb-4">Notre Histoire</p>
              <h2 className="font-serif text-4xl text-luxury-dark mb-6 leading-tight">
                L&apos;élégance du désert,
                <br />
                <span className="italic text-gold-500">l&apos;éclat de Dubai</span>
              </h2>
              <div className="gold-divider mb-6" />
              <p className="text-luxury-gray font-sans text-sm leading-relaxed mb-4">
                MY LUXURY est née d&apos;une passion pour la beauté du désert et le raffinement
                de la mode internationale. Chaque pièce de notre collection raconte une histoire
                d&apos;artisanat, de précision et d&apos;élégance intemporelle.
              </p>
              <p className="text-luxury-gray font-sans text-sm leading-relaxed mb-8">
                Inspirés par les dunes dorées, les palaces de Jumeirah et l&apos;architecture
                audacieuse de Dubai, nos créateurs sélectionnent chaque matière avec soin pour
                offrir une expérience luxueuse à chaque femme du monde.
              </p>
              <a href="/about" className="btn-luxury-outline text-xs py-3 px-7">
                Notre univers
              </a>
            </div>
            <div className="relative h-80 md:h-[500px] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800&q=80"
                alt="Dubai luxury"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              {/* Gold frame accent */}
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
              Collection Exclusive
            </p>
            <h2 className="font-serif text-4xl text-white mb-4">
              Robes de Prestige
            </h2>
            <div className="w-12 h-px bg-gold-500 mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Robe de Luxe */}
            <div className="group relative overflow-hidden">
              <div className="relative h-[520px] overflow-hidden">
                <img
                  src="/images/robe-luxe.png"
                  alt="Robe de Luxe MY LUXURY"
                  className="w-full h-full object-cover object-top
                             transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <p className="text-gold-400 text-[10px] tracking-[0.3em] uppercase font-sans mb-2">
                    Édition Limitée
                  </p>
                  <h3 className="font-serif text-2xl text-white mb-3">
                    Robe Haute Couture
                  </h3>
                  <a
                    href="/shop?category=nouveautes"
                    className="inline-flex items-center gap-2 text-[11px] text-white/80
                               tracking-widest uppercase font-sans border-b border-gold-500
                               pb-0.5 hover:text-gold-400 transition-colors"
                  >
                    Découvrir
                  </a>
                </div>
              </div>
            </div>

            {/* Robe Tunis */}
            <div className="group relative overflow-hidden">
              <div className="relative h-[520px] overflow-hidden">
                <img
                  src="/images/robe-tunis.png"
                  alt="Robe Tunisie MY LUXURY"
                  className="w-full h-full object-cover object-top
                             transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <p className="text-gold-400 text-[10px] tracking-[0.3em] uppercase font-sans mb-2">
                    Collection Tunisie
                  </p>
                  <h3 className="font-serif text-2xl text-white mb-3">
                    Robe Élégance Orientale
                  </h3>
                  <a
                    href="/shop?category=nouveautes"
                    className="inline-flex items-center gap-2 text-[11px] text-white/80
                               tracking-widest uppercase font-sans border-b border-gold-500
                               pb-0.5 hover:text-gold-400 transition-colors"
                  >
                    Découvrir
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  )
}

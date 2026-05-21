'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import Fireworks from '@/components/ui/Fireworks'
import { useLocaleStore } from '@/store/localeStore'
import type { Locale } from '@/locales/types'

type CatItem = { name: string; slug: string; image: string; count: string; description: string; badge?: string }

const FEATURED: Record<Locale, CatItem[]> = {
  en: [
    { name: 'Luxury Dresses', slug: 'robes',       image: '/images/robes de luxe.png', count: '24 pieces', description: 'Oriental elegance · Refined cuts · Prestige occasions', badge: 'Best Seller'     },
    { name: 'Luxury Bags',    slug: 'sacs-a-main', image: '/images/SACCPRO.png',          count: '48 pieces', description: 'Premium leather goods · Grained leathers · Imported from Dubai', badge: 'Dubai Collection' },
  ],
  ar: [
    { name: 'فساتين فاخرة', slug: 'robes',       image: '/images/robes de luxe.png', count: '24 قطعة', description: 'أناقة شرقية · تصميمات راقية · مناسبات فاخرة', badge: 'الأكثر مبيعاً' },
    { name: 'حقائب فاخرة',  slug: 'sacs-a-main', image: '/images/SACCPRO.png',          count: '48 قطعة', description: 'مستلزمات جلدية فاخرة · جلود مستوردة من دبي',   badge: 'مجموعة دبي'    },
  ],
}

const CATEGORIES: Record<Locale, CatItem[]> = {
  en: [
    { name: 'Jewellery & Gold',  slug: 'bijoux',       image: '/images/OR44.png',            count: '7 pieces',  description: 'Yellow gold · White gold · 18-carat plated'       },
    { name: 'Shoes',             slug: 'chaussures',   image: '/images/CHAUSS23.png',         count: '12 pieces', description: 'Heels, sandals & premium ankle boots'              },
    { name: 'Summer Sandals',    slug: 'chaussures',   image: '/images/or25689.png',        count: '8 pieces',  description: 'Lightweight sandals · Dubai style · Luxury summer' },
    { name: 'Bags & Shoes',      slug: 'sacs-a-main',  image: '/images/SACCHAUSSURE.png',     count: '20 pieces', description: 'Matching bag + shoe sets'                          },
    { name: 'Hair Oil',          slug: 'huile-cheveux',image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&q=85&fit=crop&auto=format', count: '6 pieces', description: 'Hair care · Argan · Precious oils' },
    { name: 'Arabic Perfumes',   slug: 'parfums',      image: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=600&q=85&fit=crop&auto=format', count: '6 pieces', description: 'Oud · Rose · Amber · Musk · Ibraq Collection' },
  ],
  ar: [
    { name: 'مجوهرات وذهب',   slug: 'bijoux',       image: '/images/OR44.png',            count: '7 قطع',   description: 'ذهب أصفر · ذهب أبيض · مطلي 18 قيراط'              },
    { name: 'أحذية',           slug: 'chaussures',   image: '/images/CHAUSS23.png',         count: '12 قطعة', description: 'كعب عالٍ، صنادل وأحذية مميزة'                       },
    { name: 'صندل الصيف',     slug: 'chaussures',   image: '/images/or25689.png',        count: '8 قطع',   description: 'صنادل خفيفة · أسلوب دبي · صيف فاخر'                },
    { name: 'حقائب وأحذية',   slug: 'sacs-a-main',  image: '/images/SACCHAUSSURE.png',     count: '20 قطعة', description: 'أطقم حقائب وأحذية متناسقة'                          },
    { name: 'زيت الشعر',      slug: 'huile-cheveux',image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&q=85&fit=crop&auto=format', count: '6 قطع', description: 'عناية بالشعر · الأرغان · زيوت نادرة' },
    { name: 'عطور عربية',     slug: 'parfums',      image: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=600&q=85&fit=crop&auto=format', count: '6 قطع', description: 'عود · ورد · عنبر · مسك · مجموعة إبراق' },
  ],
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}

const item = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

function FeaturedCard({ cat, discover }: { cat: CatItem; discover: string }) {
  return (
    <motion.div variants={item}>
      <motion.div
        className="relative overflow-hidden h-[420px] md:h-[520px] cursor-pointer group"
        whileHover={{ scale: 1.01 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <Image src={cat.image} alt={cat.name} fill sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent
                        group-hover:from-black/88 transition-all duration-500" />
        {cat.badge && (
          <div className="absolute top-4 left-4 bg-gold-500 text-white text-[9px]
                          uppercase tracking-[0.25em] font-sans font-medium px-3 py-1.5">
            {cat.badge}
          </div>
        )}
        <div className="absolute inset-0 border border-transparent
                        group-hover:border-gold-500/50 transition-colors duration-300 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 p-7 pointer-events-none">
          <p className="text-[10px] text-gold-400 tracking-[0.3em] uppercase font-sans mb-2">{cat.count}</p>
          <h3 className="font-serif text-2xl md:text-3xl text-white mb-2">{cat.name}</h3>
          <p className="text-cream-300 text-xs font-sans tracking-wide mb-4 opacity-0
                        group-hover:opacity-100 transition-opacity duration-300">
            {cat.description}
          </p>
          <div className="flex items-center gap-2 text-[11px] text-white/90 tracking-widest uppercase font-sans
                          translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            {discover}
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
        <Link href={`/shop?category=${cat.slug}`} className="absolute inset-0 z-20" aria-label={cat.name} />
      </motion.div>
    </motion.div>
  )
}

function CategoryCard({ cat, view }: { cat: CatItem; view: string }) {
  return (
    <motion.div variants={item}>
      <motion.div
        className="relative overflow-hidden h-52 md:h-64 cursor-pointer group"
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <Image src={cat.image} alt={cat.name} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          className="object-cover transition-transform duration-700 group-hover:scale-108" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent
                        group-hover:from-black/85 transition-all duration-500" />
        <div className="absolute inset-0 border border-transparent
                        group-hover:border-gold-500/40 transition-colors duration-300 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 p-4 pointer-events-none">
          <p className="text-[9px] text-gold-400 tracking-[0.25em] uppercase font-sans mb-1">{cat.count}</p>
          <h3 className="font-serif text-base md:text-lg text-white mb-1">{cat.name}</h3>
          <p className="text-cream-300/80 text-[10px] font-sans leading-snug mb-2
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {cat.description}
          </p>
          <div className="flex items-center gap-1.5 text-[10px] text-white/85 tracking-widest uppercase font-sans
                          translate-y-1.5 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            {view}
            <ArrowRight className="w-3 h-3" />
          </div>
        </div>
        <Link href={`/shop?category=${cat.slug}`} className="absolute inset-0 z-20" aria-label={cat.name} />
      </motion.div>
    </motion.div>
  )
}

export default function Categories() {
  const { t, locale } = useLocaleStore()
  const featured   = FEATURED[locale]
  const categories = CATEGORIES[locale]

  return (
    <section className="py-20 bg-cream-100 relative overflow-hidden">
      <Fireworks zIndex={5} intervalMs={4000} maxRockets={2} opacity={0.65} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-14"
        >
          <p className="section-tag mb-3">{t.categories.tag}</p>
          <h2 className="section-title mb-3">{t.categories.title}</h2>
          <p className="text-luxury-light font-sans text-sm max-w-lg mx-auto leading-relaxed">
            {t.categories.subtitle}
          </p>
          <motion.div
            className="h-px bg-gold-500 mx-auto mt-6"
            initial={{ width: 0 }}
            whileInView={{ width: 48 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          />
        </motion.div>

        <motion.div
          variants={container} initial="hidden" whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
        >
          {featured.map((cat) => (
            <FeaturedCard key={cat.slug + cat.name} cat={cat} discover={t.categories.discover} />
          ))}
        </motion.div>

        <motion.div
          variants={container} initial="hidden" whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {categories.map((cat) => (
            <CategoryCard key={cat.slug + cat.name} cat={cat} view={t.categories.view} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link
            href="/shop"
            className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.3em]
                       font-sans font-medium text-luxury-dark border-b border-gold-500
                       pb-0.5 hover:text-gold-500 transition-colors duration-300"
          >
            {t.categories.viewAll}
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>

      </div>
    </section>
  )
}

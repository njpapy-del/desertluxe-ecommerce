'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Sparkles, ArrowRight } from 'lucide-react'
import { useLocaleStore } from '@/store/localeStore'
import type { Locale } from '@/locales/types'

type DayConfig = {
  icon: string
  title: string
  subtitle: string
  category: string
  particles: boolean
}

const DAYS: Record<Locale, DayConfig[]> = {
  en: [
    { icon: '🏰', title: 'Dubai Luxury Week',      subtitle: 'Exclusive weekend — the entire collection in the spotlight',      category: '',             particles: true  },
    { icon: '👜', title: 'Premium Bag Monday',      subtitle: 'Start the week with our signature bags imported from Dubai',       category: 'sacs-a-main',  particles: false },
    { icon: '🧴', title: 'Beauty & Care Tuesday',   subtitle: 'Precious hair oils — argan, natural care imported from Dubai',     category: 'huile-cheveux',particles: true  },
    { icon: '💎', title: 'Jewellery Wednesday',     subtitle: 'Gold brilliance — 18-carat plated jewellery, yellow and white gold',category: 'bijoux',       particles: true  },
    { icon: '👗', title: 'Prestige Dresses',        subtitle: 'Refined oriental elegance for every exceptional occasion',          category: 'robes',        particles: false },
    { icon: '👠', title: 'Fashion Friday',          subtitle: 'Trend shoes & accessories — the must-haves of the week',           category: 'chaussures',   particles: true  },
    { icon: '🌟', title: 'Dubai Luxury Week',      subtitle: 'End of week — enjoy the entire MY LUXURY selection',               category: '',             particles: true  },
  ],
  ar: [
    { icon: '🏰', title: 'أسبوع دبي الفاخر',       subtitle: 'عطلة نهاية الأسبوع الحصرية — المجموعة كاملة في الواجهة',           category: '',             particles: true  },
    { icon: '👜', title: 'إثنين الحقائب الفاخرة',   subtitle: 'ابدأي الأسبوع بحقائبنا الراقية المستوردة من دبي',                  category: 'sacs-a-main',  particles: false },
    { icon: '🧴', title: 'ثلاثاء الجمال والعناية',  subtitle: 'زيوت الشعر النادرة — الأرغان، عناية طبيعية مستوردة من دبي',        category: 'huile-cheveux',particles: true  },
    { icon: '💎', title: 'أربعاء المجوهرات',        subtitle: 'بريق الذهب — مجوهرات مطلية 18 قيراط، ذهب أصفر وأبيض',             category: 'bijoux',       particles: true  },
    { icon: '👗', title: 'فساتين الأناقة',          subtitle: 'أناقة شرقية راقية لكل مناسبة استثنائية',                           category: 'robes',        particles: false },
    { icon: '👠', title: 'جمعة الموضة',             subtitle: 'أحذية وإكسسوارات عصرية — أبرز قطع الأسبوع',                        category: 'chaussures',   particles: true  },
    { icon: '🌟', title: 'أسبوع دبي الفاخر',       subtitle: 'نهاية الأسبوع — استمتعي بكامل تشكيلة MY LUXURY',                   category: '',             particles: true  },
  ],
}

export default function WeeklyPromos() {
  const [cfg, setCfg] = useState<DayConfig | null>(null)
  const { t, locale } = useLocaleStore()

  useEffect(() => {
    setCfg(DAYS[locale][new Date().getDay()])
  }, [locale])

  if (!cfg) return null

  return (
    <section className="relative py-16 bg-luxury-dark overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(201,169,110,0.05), transparent 65%)' }}
      />

      {cfg.particles && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-gold-500"
              style={{ width: 2, height: 2, left: `${8 + i * 12}%`, top: `${15 + (i % 3) * 32}%` }}
              animate={{ y: [0, -28, 0], opacity: [0, 0.55, 0] }}
              transition={{ duration: 3.2 + i * 0.35, repeat: Infinity, delay: i * 0.55, ease: 'easeInOut' }}
            />
          ))}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            animate={{ y: [0, -7, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
            className="text-5xl mb-5"
            aria-hidden="true"
          >
            {cfg.icon}
          </motion.div>

          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-3 h-3 text-gold-400" />
            <p style={{ fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase' }}
              className="text-gold-400 font-sans">
              {t.home.weeklyTag}
            </p>
            <Sparkles className="w-3 h-3 text-gold-400" />
          </div>

          <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
            {cfg.title}
          </h2>

          <motion.div
            className="h-px bg-gold-500 mx-auto my-4"
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          />

          <p className="text-cream-300/65 font-sans font-light max-w-md mx-auto mb-8 leading-relaxed"
            style={{ fontSize: 13 }}>
            {cfg.subtitle}
          </p>

          <Link
            href={cfg.category ? `/shop?category=${cfg.category}` : '/shop'}
            className="inline-flex items-center gap-3 text-gold-400
                       hover:bg-gold-500 hover:text-white transition-all duration-300"
            style={{
              border: '1px solid rgba(201,169,110,0.55)',
              padding: '12px 32px',
              fontSize: 11,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-inter, sans-serif)',
            }}
          >
            {cfg.category ? t.home.weeklyViewSelection : t.home.weeklyViewAll}
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

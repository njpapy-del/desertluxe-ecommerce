'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Sparkles, ArrowRight } from 'lucide-react'

type DayConfig = {
  icon: string
  title: string
  subtitle: string
  category: string
  particles: boolean
}

const DAYS: DayConfig[] = [
  // 0 Sunday
  { icon: '🏰', title: 'Dubai Luxury Week', subtitle: 'Weekend exclusif — toute la collection en vedette', category: '', particles: true },
  // 1 Monday
  { icon: '👜', title: 'Lundi Sac Premium', subtitle: 'Commencez la semaine avec nos sacs signature importés de Dubaï', category: 'sacs-a-main', particles: false },
  // 2 Tuesday
  { icon: '✨', title: 'Mardi Nouveautés', subtitle: 'Nouvelles pièces sélectionnées avec soin pour vous cette semaine', category: 'nouveautes', particles: false },
  // 3 Wednesday
  { icon: '💎', title: 'Mercredi Bijoux', subtitle: "Éclat de l'or — bijoux plaqués 18 carats, or jaune et or blanc", category: 'bijoux', particles: true },
  // 4 Thursday
  { icon: '👗', title: 'Robes de Prestige', subtitle: "Élégance orientale raffinée pour chaque occasion d'exception", category: 'robes', particles: false },
  // 5 Friday
  { icon: '👠', title: 'Vendredi Fashion', subtitle: "Chaussures & accessoires tendance — les incontournables de la semaine", category: 'chaussures', particles: true },
  // 6 Saturday
  { icon: '🌟', title: 'Dubai Luxury Week', subtitle: 'Fin de semaine — profitez de toute la sélection MA LUXURY', category: '', particles: true },
]

export default function WeeklyPromos() {
  const [cfg, setCfg] = useState<DayConfig | null>(null)

  // Defer to client to avoid hydration mismatch (server has no concept of "today")
  useEffect(() => {
    setCfg(DAYS[new Date().getDay()])
  }, [])

  if (!cfg) return null

  return (
    <section className="relative py-16 bg-luxury-dark overflow-hidden">
      {/* Radial gold glow — GPU only, no layout impact */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(201,169,110,0.05), transparent 65%)' }}
      />

      {/* Floating particles for special days */}
      {cfg.particles && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-gold-500"
              style={{
                width: 2,
                height: 2,
                left: `${8 + i * 12}%`,
                top: `${15 + (i % 3) * 32}%`,
              }}
              animate={{ y: [0, -28, 0], opacity: [0, 0.55, 0] }}
              transition={{
                duration: 3.2 + i * 0.35,
                repeat: Infinity,
                delay: i * 0.55,
                ease: 'easeInOut',
              }}
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
          {/* Floating icon */}
          <motion.div
            animate={{ y: [0, -7, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
            className="text-5xl mb-5"
            aria-hidden="true"
          >
            {cfg.icon}
          </motion.div>

          {/* Tag */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-3 h-3 text-gold-400" />
            <p style={{ fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase' }}
              className="text-gold-400 font-sans">
              Sélection de la semaine
            </p>
            <Sparkles className="w-3 h-3 text-gold-400" />
          </div>

          {/* Title */}
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
            {cfg.title}
          </h2>

          {/* Gold divider */}
          <motion.div
            className="h-px bg-gold-500 mx-auto my-4"
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          />

          {/* Subtitle */}
          <p className="text-cream-300/65 font-sans font-light max-w-md mx-auto mb-8 leading-relaxed"
            style={{ fontSize: 13 }}>
            {cfg.subtitle}
          </p>

          {/* CTA */}
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
            {cfg.category ? 'Voir la sélection' : 'Voir toute la boutique'}
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

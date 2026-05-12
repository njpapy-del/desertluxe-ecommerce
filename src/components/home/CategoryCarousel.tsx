'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const SLIDES = [
  {
    name: 'Sacs de Luxe',
    slug: 'sacs-a-main',
    image: '/images/SACCPRO.png',
    tag: 'Collection Dubai',
    accent: 'Maroquinerie premium · Cuirs grainés importés',
    cta: 'Découvrir les sacs',
  },
  {
    name: 'Bijoux & Or',
    slug: 'bijoux',
    image: '/images/or235698.png',
    tag: 'Or 18 carats',
    accent: 'Or jaune & or blanc · Bijoux plaqués premium',
    cta: 'Voir les bijoux',
  },
  {
    name: 'Sandales d\'Été',
    slug: 'chaussures',
    image: '/images/or2566987.png',
    tag: 'Collection Été',
    accent: 'Sandales légères · Style Dubai · Confort & élégance',
    cta: 'Voir les sandales',
  },
  {
    name: 'Sacs & Chaussures',
    slug: 'sacs-a-main',
    image: '/images/SACCHAUSSS.png',
    tag: 'Ensembles Assortis',
    accent: 'Combinés sac + chaussures · Look complet Dubai',
    cta: 'Voir les ensembles',
  },
  {
    name: 'Robes de Luxe',
    slug: 'robes',
    image: '/images/ROBESLUXETURQUE.png',
    tag: 'Édition Limitée',
    accent: 'Coupes orientales raffinées · Occasions prestige',
    cta: 'Voir les robes',
  },
  {
    name: 'Huile de Cheveux',
    slug: 'huile-cheveux',
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=1400&q=80&fit=crop&auto=format',
    tag: 'Soins Capillaires',
    accent: 'Huiles précieuses · Argan · Soin naturel Dubai',
    cta: 'Découvrir les soins',
  },
  {
    name: 'Parfums Arabes',
    slug: 'parfums',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=1400&q=80&fit=crop&auto=format',
    tag: 'Collection Ibraq',
    accent: 'Oud · Rose de Taïf · Ambre · Musc — Péninsule Arabique',
    cta: 'Sentir la collection',
  },
]

const AUTOPLAY_MS = 4500

const variants = {
  enter: (d: number) => ({
    x: d > 0 ? 80 : -80,
    opacity: 0,
    scale: 1.03,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
  },
  exit: (d: number) => ({
    x: d > 0 ? -60 : 60,
    opacity: 0,
    scale: 0.98,
    transition: { duration: 0.5, ease: [0.7, 0, 0.84, 0] },
  }),
}

export default function CategoryCarousel() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const [playing, setPlaying] = useState(true)

  const go = useCallback((dir: 1 | -1) => {
    setDirection(dir)
    setCurrent((c) => (c + dir + SLIDES.length) % SLIDES.length)
  }, [])

  useEffect(() => {
    if (!playing) return
    const id = setInterval(() => go(1), AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [playing, go])

  const slide = SLIDES[current]

  return (
    <section
      className="relative overflow-hidden bg-luxury-dark"
      style={{ height: 'clamp(420px, 65vh, 680px)' }}
      onMouseEnter={() => setPlaying(false)}
      onMouseLeave={() => setPlaying(true)}
      aria-label="Carousel catégories"
    >
      {/* ── Slides ── */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0"
        >
          <Image
            src={slide.image}
            alt={slide.name}
            fill
            priority={current === 0}
            className="object-cover object-center"
            sizes="100vw"
          />
          {/* Gradient overlays */}
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.4) 55%, rgba(0,0,0,0.1) 100%)' }}
          />
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)' }}
          />
        </motion.div>
      </AnimatePresence>

      {/* ── Section label top-center ── */}
      <div className="absolute top-6 left-0 right-0 flex justify-center z-10 pointer-events-none">
        <p style={{ fontSize: 9, letterSpacing: '0.45em', textTransform: 'uppercase' }}
          className="text-white/35 font-sans">
          Nos univers
        </p>
      </div>

      {/* ── Content ── */}
      <div className="relative h-full flex flex-col justify-center px-8 md:px-20 z-10 max-w-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={`txt-${current}`}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.55, delay: 0.15, ease: [0.16, 1, 0.3, 1] } }}
            exit={{ opacity: 0, y: -14, transition: { duration: 0.3 } }}
          >
            <p style={{ fontSize: 10, letterSpacing: '0.42em', textTransform: 'uppercase' }}
              className="text-gold-400 font-sans mb-3">
              {slide.tag}
            </p>
            <h2 className="font-serif text-white leading-tight mb-3"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)' }}>
              {slide.name}
            </h2>
            <p className="text-cream-300/70 font-sans font-light tracking-wide mb-8"
              style={{ fontSize: 13 }}>
              {slide.accent}
            </p>
            <Link
              href={`/shop?category=${slide.slug}`}
              className="inline-flex items-center gap-3 bg-gold-500 text-white
                         hover:bg-gold-600 transition-colors duration-300"
              style={{ padding: '14px 32px', fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase', fontFamily: 'var(--font-inter, sans-serif)', fontWeight: 500 }}
            >
              {slide.cta}
              <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Arrow nav ── */}
      <div className="absolute right-5 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-10">
        {(['prev', 'next'] as const).map((dir) => (
          <motion.button
            key={dir}
            onClick={() => go(dir === 'prev' ? -1 : 1)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-9 h-9 border border-white/25 flex items-center justify-center
                       text-white/60 hover:text-white hover:border-gold-500/70 transition-all duration-200"
            aria-label={dir === 'prev' ? 'Précédent' : 'Suivant'}
          >
            {dir === 'prev'
              ? <ChevronLeft className="w-4 h-4" />
              : <ChevronRight className="w-4 h-4" />}
          </motion.button>
        ))}
      </div>

      {/* ── Progress dots ── */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-10">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i) }}
            className="transition-all duration-400"
            style={{
              height: 2,
              width: i === current ? 32 : 8,
              background: i === current ? '#C9A96E' : 'rgba(255,255,255,0.35)',
              border: 'none',
              cursor: 'pointer',
            }}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* ── Right side thumbnail strip (desktop) ── */}
      <div className="absolute right-16 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-2 z-10">
        {SLIDES.map((s, i) => (
          <motion.button
            key={i}
            onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i) }}
            whileHover={{ scale: 1.05 }}
            className="relative overflow-hidden transition-all duration-300"
            style={{
              width: 56,
              height: 40,
              opacity: i === current ? 1 : 0.45,
              outline: i === current ? '1px solid #C9A96E' : '1px solid transparent',
            }}
            aria-label={s.name}
          >
            <Image src={s.image} alt={s.name} fill className="object-cover" sizes="56px" />
          </motion.button>
        ))}
      </div>
    </section>
  )
}

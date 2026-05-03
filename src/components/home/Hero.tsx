'use client'

import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  AnimatePresence,
} from 'framer-motion'

import { ArrowRight, Sparkles } from 'lucide-react'

// ─── Word-split animation ─────────────────────────────────────────────────────
const TITLE_LINES = ['Luxury Fashion', 'Inspired by', 'Dubai']

function AnimatedTitle() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <div ref={ref} className="overflow-hidden">
      {TITLE_LINES.map((line, lineIdx) => (
        <div key={line} className="overflow-hidden">
          <motion.div
            initial={{ y: '110%', opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{
              duration: 0.85,
              delay:    0.15 + lineIdx * 0.18,
              ease:     [0.16, 1, 0.3, 1],
            }}
          >
            <span
              className={`block font-serif leading-[1.05] ${
                lineIdx === 1
                  ? 'italic text-gold-400'
                  : 'text-white'
              }`}
            >
              {line}
            </span>
          </motion.div>
        </div>
      ))}
    </div>
  )
}

// ─── CTA button with glow + pulse ────────────────────────────────────────────
function GlowButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="relative inline-flex group">
      {/* Outer glow pulse */}
      <motion.span
        className="absolute inset-0 bg-gold-500 blur-xl opacity-0 rounded-sm"
        animate={{
          opacity:  [0, 0.4, 0],
          scale:    [1, 1.15, 1],
        }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.span
        className="relative z-10 flex items-center gap-3 bg-gold-500 text-white
                   px-9 py-4 text-xs tracking-[0.28em] uppercase font-sans font-medium"
        whileHover={{ scale: 1.04, backgroundColor: '#b8913a' }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        {children}
        <motion.span
          animate={{ x: [0, 4, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowRight className="w-4 h-4" />
        </motion.span>
      </motion.span>
    </Link>
  )
}

// ─── Floating stat badge ──────────────────────────────────────────────────────
function FloatingStat({
  value,
  label,
  delay = 0,
}: {
  value: string
  label: string
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="flex flex-col items-center"
    >
      <motion.span
        className="font-serif text-2xl text-white"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 3 + delay, repeat: Infinity, ease: 'easeInOut' }}
      >
        {value}
      </motion.span>
      <span className="text-[10px] text-cream-400 tracking-[0.3em] uppercase font-sans mt-1">
        {label}
      </span>
    </motion.div>
  )
}

// ─── Images qui alternent en fondu ───────────────────────────────────────────
const BG_IMAGES = [
  '/images/hero-dubai.png',
  '/images/fonddubai.png',
]

// ─── Main Hero ────────────────────────────────────────────────────────────────
export default function Hero() {
  const containerRef               = useRef<HTMLDivElement>(null)
  const { scrollY }                = useScroll()

  // Alternance des images toutes les 5 secondes
  const [imgIndex, setImgIndex]    = useState(0)
  useEffect(() => {
    const timer = setInterval(() => {
      setImgIndex((i) => (i + 1) % BG_IMAGES.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  // Parallax: image moves up slower than scroll
  const rawY   = useTransform(scrollY, [0, 700], [0, 180])
  const bgY    = useSpring(rawY, { stiffness: 80, damping: 25 })

  // Fade content out on scroll
  const opacity = useTransform(scrollY, [0, 400], [1, 0])
  const scale   = useTransform(scrollY, [0, 400], [1, 0.97])

  return (
    <section
      ref={containerRef}
      className="relative h-[92vh] min-h-[620px] overflow-hidden"
    >
      {/* ── Background images alternantes avec Ken Burns ─── */}
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{ y: bgY }}
      >
        <AnimatePresence mode="sync">
          <motion.div
            key={imgIndex}
            className="absolute inset-[-8%] bg-cover bg-center"
            style={{ backgroundImage: `url(${BG_IMAGES[imgIndex]})` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, scale: [1, 1.08] }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 1.8, ease: 'easeInOut' },
              scale:   { duration: 10, ease: 'linear' },
            }}
          />
        </AnimatePresence>

        {/* Overlay layers */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Gold shimmer overlay on bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 opacity-30"
          style={{
            background: 'linear-gradient(to top, rgba(201,169,110,0.3), transparent)',
          }}
        />
      </motion.div>

      {/* ── Floating particles ────────────────────────────── */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-gold-400 rounded-full opacity-60"
          style={{
            left:  `${15 + i * 14}%`,
            top:   `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y:       [0, -20, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3 + i * 0.7,
            repeat:   Infinity,
            delay:    i * 0.5,
            ease:     'easeInOut',
          }}
        />
      ))}

      {/* ── Content ───────────────────────────────────────── */}
      <motion.div
        style={{ opacity, scale }}
        className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
                   flex flex-col justify-center will-change-transform"
      >
        <div className="max-w-2xl">

          {/* Tag line */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex items-center gap-3 mb-7"
          >
            <motion.div
              className="h-px bg-gold-500"
              initial={{ width: 0 }}
              animate={{ width: 32 }}
              transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            />
            <Sparkles className="w-3 h-3 text-gold-400" />
            <span className="text-gold-400 text-[11px] tracking-[0.4em] uppercase font-sans">
              Nouvelle Collection 2026
            </span>
          </motion.div>

          {/* Animated title */}
          <div className="text-5xl md:text-6xl lg:text-7xl mb-7">
            <AnimatedTitle />
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75 }}
            className="text-cream-300 text-base font-sans font-light tracking-wide
                       leading-relaxed max-w-lg mb-10"
          >
            Des pièces d&apos;exception façonnées pour la femme moderne.
            Sacs à main, accessoires et articles de luxe aux influences orientales.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex flex-col sm:flex-row items-start gap-4"
          >
            <GlowButton href="/shop">Shop Now</GlowButton>

            <motion.div
              whileHover={{ x: 4 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Link
                href="/shop?category=nouveautes"
                className="inline-flex items-center gap-3 border border-white/50 text-white
                           px-8 py-4 text-xs tracking-[0.25em] uppercase font-sans font-medium
                           hover:border-white hover:bg-white/10 transition-all duration-300"
              >
                Nouveautés
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="mt-16 flex items-center gap-10"
          >
            <FloatingStat value="500+" label="Pièces uniques" delay={1.1} />
            <div className="w-px h-8 bg-white/20" />
            <FloatingStat value="4.9★" label="Note clients"   delay={1.2} />
            <div className="w-px h-8 bg-white/20" />
            <FloatingStat value="50+"  label="Pays livrés"    delay={1.3} />
          </motion.div>
        </div>
      </motion.div>

      {/* ── Scroll indicator ─────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[9px] text-white/50 tracking-[0.4em] uppercase font-sans">
          Découvrir
        </span>
        <motion.div
          className="w-px bg-gradient-to-b from-white/60 to-transparent"
          animate={{ height: [24, 48, 24], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* ── Bottom fade ──────────────────────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 h-24
                      bg-gradient-to-t from-cream-100 to-transparent" />
    </section>
  )
}

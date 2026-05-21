'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { Sparkles, MapPin, ShieldCheck, Star, Package, HeartHandshake } from 'lucide-react'
import EyeOfRa from '@/components/ui/EyeOfRa'
import { useLocaleStore } from '@/store/localeStore'

/* ─── Animation variants ─────────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  }),
}

function Section({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={className}
    >
      {children}
    </motion.section>
  )
}

/* ─── Component ──────────────────────────────────────────────────────── */
export default function AboutContent() {
  const { t } = useLocaleStore()
  const a = t.about

  const engagements = [
    { icon: ShieldCheck,    title: a.eng1Title, text: a.eng1Text },
    { icon: MapPin,         title: a.eng2Title, text: a.eng2Text },
    { icon: HeartHandshake, title: a.eng3Title, text: a.eng3Text },
    { icon: Package,        title: a.eng4Title, text: a.eng4Text },
    { icon: Star,           title: a.eng5Title, text: a.eng5Text },
    { icon: Sparkles,       title: a.eng6Title, text: a.eng6Text },
  ]

  const stats = [
    { value: 'Dubai', label: a.statsLabel1 },
    { value: '100 %', label: a.statsLabel2 },
    { value: '48 h',  label: a.statsLabel3 },
    { value: '7/7',   label: a.statsLabel4 },
  ]

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative bg-luxury-dark text-cream-100 py-28 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gold-500/5 rounded-full blur-3xl" />
        </div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="text-xs uppercase tracking-[0.4em] text-gold-500 font-sans mb-5"
        >
          {a.heroBadge}
        </motion.p>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="font-serif text-4xl md:text-6xl font-light mb-6 tracking-wide"
        >
          <span className="inline-flex items-center gap-3">
            <EyeOfRa className="w-8 h-6 text-gold-500" />
            {a.heroTitle}
          </span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          className="text-cream-300 text-base md:text-lg max-w-xl mx-auto font-sans font-light leading-relaxed whitespace-pre-line"
        >
          {a.heroSubtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase text-cream-400 font-sans">
            {a.heroScroll}
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            className="w-px h-8 bg-gradient-to-b from-gold-500 to-transparent"
          />
        </motion.div>
      </section>

      {/* ── Histoire ─────────────────────────────────────────────────── */}
      <Section className="max-w-6xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <motion.p
              variants={fadeUp}
              custom={0}
              className="text-xs uppercase tracking-[0.3em] text-gold-500 font-sans mb-4"
            >
              {a.originsTag}
            </motion.p>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="font-serif text-3xl md:text-4xl text-luxury-dark font-light mb-8 leading-snug"
            >
              {a.originsTitle}
            </motion.h2>
            <motion.div
              variants={fadeUp}
              custom={2}
              className="space-y-5 text-luxury-light leading-relaxed font-sans text-sm md:text-base"
            >
              <p>
                <strong className="text-luxury-dark font-medium">MY LUXURY</strong>{' '}
                {a.originsP1}
              </p>
              <p>{a.originsP2}</p>
              <p>{a.originsP3}</p>
            </motion.div>
          </div>

          <motion.div
            variants={fadeUp}
            custom={3}
            className="bg-cream-100 border border-cream-300 p-10"
          >
            <div className="grid grid-cols-2 gap-px bg-cream-300">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="bg-cream-100 p-8 text-center flex flex-col gap-2"
                >
                  <span className="font-serif text-2xl md:text-3xl text-gold-500">
                    {s.value}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-luxury-light font-sans">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-8 border-t border-cream-300 text-center">
              <p className="text-xs uppercase tracking-[0.25em] text-luxury-light font-sans mb-1">
                {a.statsFounded}
              </p>
              <p className="font-serif text-4xl text-luxury-dark">2022</p>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* ── Divider ──────────────────────────────────────────────────── */}
      <div className="flex items-center gap-6 max-w-6xl mx-auto px-6">
        <div className="flex-1 h-px bg-cream-300" />
        <EyeOfRa className="w-8 h-6 text-gold-500/50 flex-shrink-0" />
        <div className="flex-1 h-px bg-cream-300" />
      </div>

      {/* ── Engagements ──────────────────────────────────────────────── */}
      <Section className="py-24 px-6 bg-cream-100">
        <div className="max-w-6xl mx-auto">
          <motion.p
            variants={fadeUp}
            custom={0}
            className="text-xs uppercase tracking-[0.3em] text-gold-500 font-sans text-center mb-4"
          >
            {a.engTag}
          </motion.p>
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="font-serif text-3xl md:text-4xl text-luxury-dark font-light text-center mb-16"
          >
            {a.engTitle}
          </motion.h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {engagements.map((item, i) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  custom={i * 0.08 + 2}
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="bg-white border border-cream-300 p-8 group"
                >
                  <div className="w-10 h-10 flex items-center justify-center border border-gold-500/30 text-gold-500 mb-6 group-hover:bg-gold-500 group-hover:text-white transition-colors duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-lg text-luxury-dark mb-3">{item.title}</h3>
                  <p className="text-luxury-light text-sm leading-relaxed font-sans">{item.text}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </Section>

      {/* ── Vision ───────────────────────────────────────────────────── */}
      <Section className="max-w-4xl mx-auto px-6 py-24">
        <motion.p
          variants={fadeUp}
          custom={0}
          className="text-xs uppercase tracking-[0.3em] text-gold-500 font-sans text-center mb-4"
        >
          {a.visionTag}
        </motion.p>
        <motion.h2
          variants={fadeUp}
          custom={1}
          className="font-serif text-3xl md:text-4xl text-luxury-dark font-light text-center mb-12"
        >
          {a.visionTitle}
        </motion.h2>
        <motion.div
          variants={fadeUp}
          custom={2}
          className="space-y-6 text-luxury-light leading-relaxed font-sans text-sm md:text-base text-center max-w-3xl mx-auto"
        >
          <p>
            {a.visionP1.split('MY LUXURY').map((part, i, arr) =>
              i < arr.length - 1
                ? <span key={i}>{part}<strong className="text-luxury-dark font-medium">MY LUXURY</strong></span>
                : <span key={i}>{part}</span>
            )}
          </p>
          <p>{a.visionP2}</p>
          <p>{a.visionP3}</p>
        </motion.div>
      </Section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <Section className="bg-luxury-dark text-cream-100 py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            variants={fadeUp}
            custom={0}
            className="flex justify-center mb-8"
          >
            <EyeOfRa className="w-12 h-8 text-gold-500" />
          </motion.div>
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="font-serif text-3xl md:text-4xl font-light mb-6"
          >
            {a.ctaTitle}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={2}
            className="text-cream-300 font-sans text-sm leading-relaxed mb-10"
          >
            {a.ctaText}
          </motion.p>
          <motion.div
            variants={fadeUp}
            custom={3}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/shop"
                className="inline-block bg-gold-500 text-white px-10 py-4 text-xs uppercase tracking-[0.25em] font-sans font-medium hover:bg-gold-400 transition-colors duration-300"
              >
                {a.ctaShop}
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/"
                className="inline-block border border-cream-300 text-cream-100 px-10 py-4 text-xs uppercase tracking-[0.25em] font-sans font-medium hover:border-gold-500 hover:text-gold-500 transition-colors duration-300"
              >
                {a.ctaHome}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </Section>

    </main>
  )
}

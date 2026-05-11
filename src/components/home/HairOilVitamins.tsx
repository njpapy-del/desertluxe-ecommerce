'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

// ─── Vitamines naturelles utiles pour les cheveux ─────────────────────────
const VITAMINS = [
  {
    code:    'A',
    name:    'Vitamine A',
    alias:   'Rétinol',
    benefit: 'Stimule la croissance capillaire et nourrit le cuir chevelu en profondeur pour des cheveux plus épais.',
    sources: 'Huile de carotte · Beurre de karité · Huile de rose musquée',
    color:   '#e6a23c',
    glow:    'rgba(230,162,60,0.18)',
  },
  {
    code:    'B5',
    name:    'Vitamine B5',
    alias:   'Panthénol',
    benefit: 'Renforce la fibre capillaire de l\'intérieur, réduit la casse et apporte souplesse et brillance.',
    sources: 'Huile d\'avocat · Lécithine naturelle · Huile de germe de blé',
    color:   '#67b86a',
    glow:    'rgba(103,184,106,0.16)',
  },
  {
    code:    'B7',
    name:    'Vitamine B7',
    alias:   'Biotine',
    benefit: 'Renforce la kératine et combat activement la chute des cheveux. Essentielle pour la repousse.',
    sources: 'Huile de ricin · Huile d\'amande douce · Huile de noix',
    color:   '#C9A96E',
    glow:    'rgba(201,169,110,0.20)',
  },
  {
    code:    'C',
    name:    'Vitamine C',
    alias:   'Acide Ascorbique',
    benefit: 'Puissant antioxydant qui stimule la production de collagène et protège les follicules pileux.',
    sources: 'Huile de baobab · Huile d\'argousier · Extrait de grenade',
    color:   '#e8855a',
    glow:    'rgba(232,133,90,0.16)',
  },
  {
    code:    'D',
    name:    'Vitamine D',
    alias:   'Calciférol',
    benefit: 'Active les follicules pileux dormants et régule le cycle de croissance pour une chevelure dense.',
    sources: 'Huile de chanvre · Huile de lin · Huile de sésame',
    color:   '#7ab8d4',
    glow:    'rgba(122,184,212,0.16)',
  },
  {
    code:    'E',
    name:    'Vitamine E',
    alias:   'Tocophérol',
    benefit: 'Hydratation profonde, éclat naturel et protection contre les agressions extérieures. Anti-âge capillaire.',
    sources: 'Huile d\'argan · Huile de jojoba · Huile de noisette',
    color:   '#C9A96E',
    glow:    'rgba(201,169,110,0.22)',
  },
]

// ─── Animations ───────────────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  show:   { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

// ─── Vitamin Card ─────────────────────────────────────────────────────────
function VitaminCard({ v, index }: { v: typeof VITAMINS[0]; index: number }) {
  return (
    <motion.div
      variants={cardVariants}
      className="group relative bg-white/[0.04] border border-white/10
                 hover:border-white/25 transition-all duration-500 p-6 flex flex-col gap-4
                 cursor-default overflow-hidden"
      whileHover={{ y: -4, boxShadow: `0 16px 40px ${v.glow}` }}
      transition={{ type: 'spring', stiffness: 280, damping: 26 }}
    >
      {/* Background glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 30% 20%, ${v.glow}, transparent 65%)` }}
      />

      {/* Vitamin badge */}
      <div className="flex items-start justify-between relative z-10">
        <div
          className="w-12 h-12 flex items-center justify-center font-serif text-xl font-semibold"
          style={{
            color:      v.color,
            border:     `1px solid ${v.color}55`,
            background: `${v.color}12`,
          }}
        >
          {v.code}
        </div>
        {/* Index number — decorative */}
        <span className="font-serif text-[11px] text-white/15 select-none">
          0{index + 1}
        </span>
      </div>

      {/* Name & alias */}
      <div className="relative z-10">
        <h3 className="font-serif text-white text-lg leading-tight mb-0.5">
          {v.name}
        </h3>
        <p style={{ fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: v.color }}
          className="font-sans">
          {v.alias}
        </p>
      </div>

      {/* Divider */}
      <div
        className="h-px w-8 transition-all duration-500 group-hover:w-16"
        style={{ background: v.color, opacity: 0.5 }}
      />

      {/* Benefit text */}
      <p className="text-cream-300/65 font-sans leading-relaxed relative z-10"
        style={{ fontSize: 12 }}>
        {v.benefit}
      </p>

      {/* Sources */}
      <div className="mt-auto relative z-10">
        <p style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase' }}
          className="text-white/30 font-sans mb-1">
          Sources naturelles
        </p>
        <p className="text-white/50 font-sans" style={{ fontSize: 11 }}>
          {v.sources}
        </p>
      </div>
    </motion.div>
  )
}

// ─── Main Section ─────────────────────────────────────────────────────────
export default function HairOilVitamins() {
  return (
    <section className="py-20 bg-luxury-dark relative overflow-hidden">
      {/* Subtle gold radial glow — top center */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(201,169,110,0.07) 0%, transparent 70%)' }}
      />

      {/* Decorative large letter */}
      <div
        className="absolute right-[-2%] top-1/2 -translate-y-1/2 font-serif select-none pointer-events-none"
        style={{ fontSize: 'clamp(180px, 22vw, 280px)', color: 'rgba(255,255,255,0.018)', lineHeight: 1 }}
      >
        V
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Header ── */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Droplet icon */}
          <motion.div
            className="text-4xl mb-5 select-none"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden="true"
          >
            💧
          </motion.div>

          <p style={{ fontSize: 10, letterSpacing: '0.42em', textTransform: 'uppercase' }}
            className="text-gold-400 font-sans mb-4">
            Huile de Cheveux MA LUXURY
          </p>

          <h2 className="font-serif text-white leading-tight mb-4"
            style={{ fontSize: 'clamp(1.8rem, 4.5vw, 3rem)' }}>
            6 vitamines naturelles,
            <br />
            <span className="italic text-gold-400">une chevelure d&apos;exception</span>
          </h2>

          <motion.div
            className="h-px bg-gold-500 mx-auto my-5"
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.25, ease: 'easeOut' }}
          />

          <p className="text-cream-300/60 font-sans font-light max-w-xl mx-auto leading-relaxed"
            style={{ fontSize: 14 }}>
            Notre huile capillaire exclusive concentre les vitamines essentielles
            extraites de plantes rares et d&apos;huiles précieuses,
            pour nourrir, fortifier et sublimer chaque cheveu.
          </p>
        </motion.div>

        {/* ── Vitamins grid ── */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {VITAMINS.map((v, i) => (
            <VitaminCard key={v.code} v={v} index={i} />
          ))}
        </motion.div>

        {/* ── Bottom CTA ── */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.2 }}
        >
          {/* Key benefits pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {[
              '🌿 100% naturel',
              '✨ Sans parabènes',
              '💧 Hydratation 72h',
              '🌸 Testé dermatologiquement',
              '🏆 Formule Dubai premium',
            ].map((tag) => (
              <span
                key={tag}
                className="font-sans text-cream-300/70 border border-white/10"
                style={{ fontSize: 11, padding: '6px 14px', letterSpacing: '0.05em' }}
              >
                {tag}
              </span>
            ))}
          </div>

          <Link
            href="/shop?category=huile-cheveux"
            className="inline-flex items-center gap-3 bg-gold-500 text-white
                       hover:bg-gold-600 transition-colors duration-300"
            style={{
              padding:     '14px 40px',
              fontSize:     11,
              letterSpacing:'0.3em',
              textTransform:'uppercase',
              fontFamily:   'var(--font-inter, sans-serif)',
              fontWeight:   500,
            }}
          >
            Découvrir nos huiles capillaires
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

      </div>
    </section>
  )
}

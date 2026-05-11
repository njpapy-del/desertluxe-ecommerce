'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Leaf } from 'lucide-react'

// ─── Vitamines naturelles ─────────────────────────────────────────────────
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

// ─── Plantes — 12 actives dont 7 originaires d'Inde ─────────────────────
const PLANTS = [
  {
    name:    'Amla',
    latin:   'Emblica officinalis',
    origin:  'Inde',
    flag:    '🇮🇳',
    india:   true,
    icon:    '🫐',
    benefit: 'Superaliment capillaire — concentré exceptionnel de vitamine C naturelle. Fortifie chaque cheveu depuis la racine et prévient le grisonnement prématuré.',
    color:   '#7cb87e',
  },
  {
    name:    'Bhringraj',
    latin:   'Eclipta alba',
    origin:  'Inde',
    flag:    '🇮🇳',
    india:   true,
    icon:    '🌿',
    benefit: 'Surnommé "le roi des herbes capillaires" en Ayurveda. Stimule activement la repousse et réduit la chute de façon naturelle et durable.',
    color:   '#5aab5c',
  },
  {
    name:    'Brahmi',
    latin:   'Bacopa monnieri',
    origin:  'Inde',
    flag:    '🇮🇳',
    india:   true,
    icon:    '🍃',
    benefit: 'Plante sacrée de l\'Ayurveda. Nourrit les racines en profondeur, réduit la chute liée au stress et renforce la fibre capillaire.',
    color:   '#82b87e',
  },
  {
    name:    'Neem',
    latin:   'Azadirachta indica',
    origin:  'Inde',
    flag:    '🇮🇳',
    india:   true,
    icon:    '🌱',
    benefit: 'Antibactérien et antifongique puissant. Purifie le cuir chevelu, élimine les pellicules et crée un environnement idéal pour la repousse.',
    color:   '#6aaf6a',
  },
  {
    name:    'Hibiscus',
    latin:   'Hibiscus rosa-sinensis',
    origin:  'Inde',
    flag:    '🇮🇳',
    india:   true,
    icon:    '🌺',
    benefit: 'Conditionneur naturel extraordinaire. Apporte brillance intense, souplesse et combat efficacement la chute. Fleur emblématique des soins capillaires indiens.',
    color:   '#d4648a',
  },
  {
    name:    'Fenugrec',
    latin:   'Trigonella foenum',
    origin:  'Inde',
    flag:    '🇮🇳',
    india:   true,
    icon:    '🌾',
    benefit: 'Riche en protéines et en lécithine. Renforce les cheveux fragiles, combat la chute et gaine chaque mèche pour un volume naturel et durable.',
    color:   '#c9a84c',
  },
  {
    name:    'Ricin',
    latin:   'Ricinus communis',
    origin:  'Inde',
    flag:    '🇮🇳',
    india:   true,
    icon:    '🫙',
    benefit: 'L\'huile de repousse par excellence, utilisée depuis des millénaires en Inde. Stimule les follicules, épaissit et allonge les cheveux de façon visible.',
    color:   '#a08050',
  },
  {
    name:    'Argan',
    latin:   'Argania spinosa',
    origin:  'Maroc',
    flag:    '🇲🇦',
    india:   false,
    icon:    '✨',
    benefit: 'L\'or liquide du Maroc. Hydratation intense, brillance soyeuse et protection thermique. Répare les pointes abîmées en profondeur.',
    color:   '#C9A96E',
  },
  {
    name:    'Jojoba',
    latin:   'Simmondsia chinensis',
    origin:  'Désert',
    flag:    '🌵',
    india:   false,
    icon:    '💧',
    benefit: 'Sa composition proche du sébum naturel régule la production de graisse du cuir chevelu. Hydrate sans alourdir — idéal pour tous types de cheveux.',
    color:   '#d4b86a',
  },
  {
    name:    'Grenade',
    latin:   'Punica granatum',
    origin:  'Orient',
    flag:    '🌍',
    india:   false,
    icon:    '🍎',
    benefit: 'Antioxydant puissant qui protège les cheveux du stress oxydatif. Révèle la brillance naturelle et prolonge la couleur des cheveux teints.',
    color:   '#c04a6a',
  },
  {
    name:    'Coco',
    latin:   'Cocos nucifera',
    origin:  'Tropical',
    flag:    '🌴',
    india:   false,
    icon:    '🥥',
    benefit: 'Pénètre profondément dans la fibre capillaire pour une nutrition intense depuis l\'intérieur. Protège contre les dommages des protéines et réduit la casse.',
    color:   '#b8906e',
  },
  {
    name:    'Calendula',
    latin:   'Calendula officinalis',
    origin:  'Méditerranée',
    flag:    '🌊',
    india:   false,
    icon:    '🌼',
    benefit: 'Apaisant et anti-inflammatoire naturel. Calme les cuirs chevelus irrités et sensibles, régule la production de sébum et nourrit les cheveux secs.',
    color:   '#e0b040',
  },
]

// ─── Animations ───────────────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  show:   { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
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
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 30% 20%, ${v.glow}, transparent 65%)` }}
      />
      <div className="flex items-start justify-between relative z-10">
        <div
          className="w-12 h-12 flex items-center justify-center font-serif text-xl font-semibold"
          style={{ color: v.color, border: `1px solid ${v.color}55`, background: `${v.color}12` }}
        >
          {v.code}
        </div>
        <span className="font-serif text-[11px] text-white/15 select-none">0{index + 1}</span>
      </div>
      <div className="relative z-10">
        <h3 className="font-serif text-white text-lg leading-tight mb-0.5">{v.name}</h3>
        <p style={{ fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: v.color }}
          className="font-sans">{v.alias}</p>
      </div>
      <div className="h-px w-8 transition-all duration-500 group-hover:w-16"
        style={{ background: v.color, opacity: 0.5 }} />
      <p className="text-cream-300/65 font-sans leading-relaxed relative z-10" style={{ fontSize: 12 }}>
        {v.benefit}
      </p>
      <div className="mt-auto relative z-10">
        <p style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase' }}
          className="text-white/30 font-sans mb-1">Sources naturelles</p>
        <p className="text-white/50 font-sans" style={{ fontSize: 11 }}>{v.sources}</p>
      </div>
    </motion.div>
  )
}

// ─── Plant Card ───────────────────────────────────────────────────────────
function PlantCard({ p }: { p: typeof PLANTS[0] }) {
  return (
    <motion.div
      variants={cardVariants}
      className="group relative overflow-hidden cursor-default"
      style={{
        background: p.india
          ? 'linear-gradient(135deg, rgba(90,171,92,0.08) 0%, rgba(255,255,255,0.03) 100%)'
          : 'rgba(255,255,255,0.03)',
        border: p.india ? `1px solid rgba(90,171,92,0.25)` : '1px solid rgba(255,255,255,0.08)',
      }}
      whileHover={{ y: -3, boxShadow: p.india ? '0 12px 32px rgba(90,171,92,0.12)' : '0 12px 32px rgba(0,0,0,0.2)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 28 }}
    >
      {/* India glow */}
      {p.india && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 20% 0%, rgba(90,171,92,0.12), transparent 60%)' }}
        />
      )}

      <div className="p-5 flex flex-col gap-3 relative z-10">
        {/* Header row */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl select-none" aria-hidden="true">{p.icon}</span>
            <div>
              <h4 className="font-serif text-white leading-none" style={{ fontSize: 15 }}>{p.name}</h4>
              <p className="text-white/30 font-sans italic" style={{ fontSize: 10 }}>{p.latin}</p>
            </div>
          </div>

          {/* Origin badge */}
          <div
            className="flex items-center gap-1 px-2 py-0.5 shrink-0"
            style={{
              background: p.india ? 'rgba(90,171,92,0.15)' : 'rgba(255,255,255,0.06)',
              border: p.india ? '1px solid rgba(90,171,92,0.3)' : '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <span style={{ fontSize: 10 }}>{p.flag}</span>
            <span style={{ fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', color: p.india ? '#7cb87e' : 'rgba(255,255,255,0.4)' }}
              className="font-sans">{p.origin}</span>
          </div>
        </div>

        {/* Colored divider */}
        <div className="h-px" style={{ background: p.color, opacity: 0.3, width: 24 }} />

        {/* Benefit */}
        <p className="text-cream-300/60 font-sans leading-relaxed" style={{ fontSize: 11 }}>
          {p.benefit}
        </p>

        {/* India label */}
        {p.india && (
          <div className="flex items-center gap-1.5 mt-1">
            <Leaf className="w-2.5 h-2.5" style={{ color: '#7cb87e' }} />
            <span style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#7cb87e' }}
              className="font-sans">Ayurveda · Inde</span>
          </div>
        )}
      </div>
    </motion.div>
  )
}

// ─── Main Section ─────────────────────────────────────────────────────────
export default function HairOilVitamins() {
  const indiaCount = PLANTS.filter(p => p.india).length

  return (
    <section className="py-20 bg-luxury-dark relative overflow-hidden">
      {/* Gold radial — top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(201,169,110,0.07) 0%, transparent 70%)' }}
      />
      {/* Decorative letter */}
      <div className="absolute right-[-2%] top-1/2 -translate-y-1/2 font-serif select-none pointer-events-none"
        style={{ fontSize: 'clamp(180px, 22vw, 280px)', color: 'rgba(255,255,255,0.015)', lineHeight: 1 }}>
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
          <motion.div className="text-4xl mb-5 select-none"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden="true">
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

          <motion.div className="h-px bg-gold-500 mx-auto my-5"
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {VITAMINS.map((v, i) => (
            <VitaminCard key={v.code} v={v} index={i} />
          ))}
        </motion.div>

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* ── PLANTES SECTION ────────────────────────────────────────────── */}
        {/* ══════════════════════════════════════════════════════════════════ */}

        {/* Separator */}
        <motion.div
          className="flex items-center gap-6 mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(201,169,110,0.3))' }} />
          <Leaf className="w-4 h-4 text-gold-500 opacity-60" />
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, rgba(201,169,110,0.3))' }} />
        </motion.div>

        {/* Plants header + big counter */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Left — text */}
          <div className="max-w-xl">
            <p style={{ fontSize: 10, letterSpacing: '0.42em', textTransform: 'uppercase' }}
              className="text-gold-400 font-sans mb-3">
              Formule botanique exclusive
            </p>
            <h2 className="font-serif text-white leading-tight mb-4"
              style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)' }}>
              Plus de{' '}
              <span className="text-gold-400">10 plantes précieuses</span>
              <br />
              dont{' '}
              <span style={{ color: '#7cb87e' }}>{indiaCount} plantes d&apos;Inde</span>
            </h2>
            <p className="text-cream-300/55 font-sans font-light leading-relaxed"
              style={{ fontSize: 13 }}>
              Inspirée de l&apos;Ayurveda millénaire et des rituels capillaires indiens,
              notre formule marie les plantes sacrées de l&apos;Inde aux meilleurs actifs
              botaniques du monde entier pour une efficacité prouvée et naturelle.
            </p>
          </div>

          {/* Right — big number */}
          <div className="flex items-center gap-6 shrink-0">
            {/* India counter */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="font-serif leading-none mb-1"
                style={{ fontSize: 'clamp(3.5rem, 8vw, 5.5rem)', color: '#7cb87e' }}>
                {indiaCount}
              </div>
              <p style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#7cb87e', opacity: 0.8 }}
                className="font-sans">Plantes<br />d&apos;Inde</p>
            </motion.div>

            <div className="w-px h-16 bg-white/10" />

            {/* Total counter */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="font-serif text-gold-400 leading-none mb-1"
                style={{ fontSize: 'clamp(3.5rem, 8vw, 5.5rem)' }}>
                {PLANTS.length}+
              </div>
              <p style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase' }}
                className="text-gold-400/70 font-sans">Plantes<br />au total</p>
            </motion.div>
          </div>
        </motion.div>

        {/* India highlight band */}
        <motion.div
          className="mb-8 px-5 py-3 flex items-center gap-3"
          style={{
            background: 'linear-gradient(to right, rgba(90,171,92,0.10), rgba(90,171,92,0.04), transparent)',
            borderLeft: '2px solid rgba(90,171,92,0.5)',
          }}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-lg">🇮🇳</span>
          <p className="text-cream-300/70 font-sans" style={{ fontSize: 12 }}>
            <span style={{ color: '#7cb87e' }} className="font-medium">Huiles de l&apos;Inde — Tradition Ayurvédique</span>
            {' '}· Les plantes indiennes sont utilisées depuis plus de 5 000 ans pour sublimer et fortifier les cheveux.
            Notre formule s&apos;inspire de ces rituels ancestraux pour vous offrir le meilleur de la nature indienne.
          </p>
        </motion.div>

        {/* Plants grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
        >
          {/* India plants first */}
          {PLANTS.filter(p => p.india).map(p => (
            <PlantCard key={p.name} p={p} />
          ))}
          {/* Other plants */}
          {PLANTS.filter(p => !p.india).map(p => (
            <PlantCard key={p.name} p={p} />
          ))}
        </motion.div>

        {/* ── CTA ── */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.2 }}
        >
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {[
              '🌿 100% naturel',
              '✨ Sans parabènes',
              '💧 Hydratation 72h',
              '🌸 Testé dermatologiquement',
              '🏆 Formule Dubai premium',
              '🇮🇳 Inspiré Ayurveda',
            ].map((tag) => (
              <span key={tag}
                className="font-sans text-cream-300/70 border border-white/10"
                style={{ fontSize: 11, padding: '6px 14px', letterSpacing: '0.05em' }}>
                {tag}
              </span>
            ))}
          </div>

          <Link
            href="/shop?category=huile-cheveux"
            className="inline-flex items-center gap-3 bg-gold-500 text-white
                       hover:bg-gold-600 transition-colors duration-300"
            style={{
              padding: '14px 40px',
              fontSize: 11,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-inter, sans-serif)',
              fontWeight: 500,
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

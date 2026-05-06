'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { Sparkles, MapPin, ShieldCheck, Star, Package, HeartHandshake } from 'lucide-react'
import EyeOfRa from '@/components/ui/EyeOfRa'

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

/* ─── Data ───────────────────────────────────────────────────────────── */
const ENGAGEMENTS = [
  {
    icon: ShieldCheck,
    title: 'Authenticité garantie',
    text: "Chaque pièce est inspectée manuellement par notre équipe avant expédition. Matières, coutures, fermoirs — rien n'échappe à notre contrôle qualité.",
  },
  {
    icon: MapPin,
    title: 'Sourcing direct Dubaï',
    text: "Nos acheteurs se rendent régulièrement dans les showrooms premium de Dubaï pour négocier directement les meilleures pièces de la saison.",
  },
  {
    icon: HeartHandshake,
    title: 'Service personnalisé',
    text: "Notre équipe vous accompagne de la sélection jusqu'à la livraison. Besoin d'un conseil ? Nous sommes disponibles 7j/7 par message.",
  },
  {
    icon: Package,
    title: 'Livraison sécurisée',
    text: 'Emballage luxueux, suivi en temps réel, livraison partout en Tunisie sous 24 à 48 heures ouvrées.',
  },
  {
    icon: Star,
    title: 'Sélection premium',
    text: "Moins de 20 % des modèles inspectés à Dubaï rejoignent notre catalogue. Seul le meilleur passe notre sélection.",
  },
  {
    icon: Sparkles,
    title: 'Luxe accessible',
    text: "En sourçant directement sans intermédiaire, nous vous offrons des prix justes pour une qualité qui ne fait aucun compromis.",
  },
]

const STATS = [
  { value: 'Dubaï', label: 'Sourcing exclusif' },
  { value: '100 %', label: 'Contrôle qualité manuel' },
  { value: '48 h', label: 'Livraison max Tunisie' },
  { value: '7/7', label: 'Support client' },
]

/* ─── Component ──────────────────────────────────────────────────────── */
export default function AboutContent() {
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
          Notre histoire
        </motion.p>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="font-serif text-4xl md:text-6xl font-light mb-6 tracking-wide"
        >
          L&apos;univers{' '}
          <span className="inline-flex items-center gap-3">
            <EyeOfRa className="w-8 h-6 text-gold-500" />
            MA <span className="text-gold-500">LUXURY</span>
          </span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          className="text-cream-300 text-base md:text-lg max-w-xl mx-auto font-sans font-light leading-relaxed"
        >
          La maison tunisienne du luxe authentique,<br />
          directement importé des showrooms de Dubaï.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase text-cream-400 font-sans">
            Découvrir
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
              Nos origines
            </motion.p>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="font-serif text-3xl md:text-4xl text-luxury-dark font-light mb-8 leading-snug"
            >
              Née d&apos;une passion pour l&apos;élégance
            </motion.h2>
            <motion.div
              variants={fadeUp}
              custom={2}
              className="space-y-5 text-luxury-light leading-relaxed font-sans text-sm md:text-base"
            >
              <p>
                <strong className="text-luxury-dark font-medium">MA LUXURY</strong> est
                née d&apos;un constat simple : les femmes tunisiennes méritent d&apos;accéder
                aux plus belles créations de la mode mondiale, sans compromis sur la qualité
                ni sur le prix.
              </p>
              <p>
                Fondée par une équipe passionnée de mode et de voyage, notre maison
                s&apos;approvisionne directement dans les showrooms premium de{' '}
                <strong className="text-luxury-dark font-medium">Dubaï</strong> — capitale
                mondiale du luxe — pour vous proposer une sélection rigoureusement choisie
                de sacs, pochettes et accessoires d&apos;exception.
              </p>
              <p>
                Chaque pièce est sélectionnée à la main par nos acheteurs, qui contrôlent
                personnellement la qualité des matières, la finition des coutures et la
                robustesse des fermetures avant tout import vers la Tunisie.
              </p>
            </motion.div>
          </div>

          <motion.div
            variants={fadeUp}
            custom={3}
            className="bg-cream-100 border border-cream-300 p-10"
          >
            <div className="grid grid-cols-2 gap-px bg-cream-300">
              {STATS.map((s) => (
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
                Marque fondée en
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
            Ce qui nous définit
          </motion.p>
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="font-serif text-3xl md:text-4xl text-luxury-dark font-light text-center mb-16"
          >
            Nos engagements
          </motion.h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ENGAGEMENTS.map((item, i) => {
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

      {/* ── Pourquoi nous ────────────────────────────────────────────── */}
      <Section className="max-w-4xl mx-auto px-6 py-24">
        <motion.p
          variants={fadeUp}
          custom={0}
          className="text-xs uppercase tracking-[0.3em] text-gold-500 font-sans text-center mb-4"
        >
          Notre vision
        </motion.p>
        <motion.h2
          variants={fadeUp}
          custom={1}
          className="font-serif text-3xl md:text-4xl text-luxury-dark font-light text-center mb-12"
        >
          Pourquoi choisir MA LUXURY ?
        </motion.h2>
        <motion.div
          variants={fadeUp}
          custom={2}
          className="space-y-6 text-luxury-light leading-relaxed font-sans text-sm md:text-base text-center max-w-3xl mx-auto"
        >
          <p>
            Dans un marché saturé de contrefaçons et de produits de mauvaise qualité,
            <strong className="text-luxury-dark font-medium"> MA LUXURY</strong> s&apos;est
            imposée comme la référence fiable pour toutes les femmes tunisiennes qui souhaitent
            investir dans un accessoire de mode qui dure.
          </p>
          <p>
            Nous croyons que le luxe n&apos;est pas réservé à une élite. Notre mission est
            de démocratiser l&apos;accès aux plus belles pièces de maroquinerie en maintenant
            des standards irréprochables, à des prix accessibles grâce à notre{' '}
            <strong className="text-luxury-dark font-medium">sourcing direct à Dubaï</strong>.
          </p>
          <p>
            Que vous cherchiez un{' '}
            <strong className="text-luxury-dark font-medium">sac cabas pour le bureau</strong>,
            une{' '}
            <strong className="text-luxury-dark font-medium">pochette de soirée élégante</strong>{' '}
            ou un{' '}
            <strong className="text-luxury-dark font-medium">sac à main polyvalent</strong>,
            notre collection renouvelée chaque saison vous offre le choix parfait — livraison
            rapide partout en Tunisie.
          </p>
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
            Prête à trouver votre pièce signature ?
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={2}
            className="text-cream-300 font-sans text-sm leading-relaxed mb-10"
          >
            Explorez notre collection exclusive de sacs importés directement de Dubaï.
            Livraison rapide partout en Tunisie — 24 à 48 heures.
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
                Voir la collection
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/"
                className="inline-block border border-cream-300 text-cream-100 px-10 py-4 text-xs uppercase tracking-[0.25em] font-sans font-medium hover:border-gold-500 hover:text-gold-500 transition-colors duration-300"
              >
                Retour à l&apos;accueil
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </Section>

    </main>
  )
}

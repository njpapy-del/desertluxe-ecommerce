'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import Fireworks from '@/components/ui/Fireworks'

/* ─── Données catégories ────────────────────────────────────────────── */
const FEATURED = [
  {
    name: 'Robes de Luxe',
    slug: 'robes',
    image: '/images/ROBESLUXETURQUE.png',
    count: '24 pièces',
    description: 'Élégance orientale · Coupes raffinées · Occasions prestige',
    badge: 'Best Seller',
  },
  {
    name: 'Sacs de Luxe',
    slug: 'sacs-a-main',
    image: '/images/SACSLUXETURQUE.png',
    count: '48 pièces',
    description: 'Maroquinerie premium · Cuirs grainés · Importés de Dubaï',
    badge: 'Collection Dubaï',
  },
]

const CATEGORIES = [
  {
    name: 'Bijoux & Or',
    slug: 'bijoux',
    image: '/images/OR44.png',
    count: '7 pièces',
    description: 'Or jaune · Or blanc · Plaqué 18 carats',
  },
  {
    name: 'Chaussures',
    slug: 'chaussures',
    image: '/images/CHAUSS23.png',
    count: '12 pièces',
    description: 'Escarpins, sandales & bottines premium',
  },
  {
    name: 'Sandales d\'Été',
    slug: 'chaussures',
    image: '/images/or2566987.png',
    count: '8 pièces',
    description: 'Sandales légères · Style Dubai · Été luxe',
  },
  {
    name: 'Sacs & Chaussures',
    slug: 'sacs-a-main',
    image: '/images/SACCHAUSSURE.png',
    count: '20 pièces',
    description: 'Ensembles sac + chaussures assortis',
  },
  {
    name: 'Huile de Cheveux',
    slug: 'huile-cheveux',
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&q=85&fit=crop&auto=format',
    count: '6 pièces',
    description: 'Soins capillaires · Argan · Huiles précieuses',
  },
]

/* ─── Animations ────────────────────────────────────────────────────── */
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}

const item = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  show: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
}

/* ─── Carte featured (grande) ───────────────────────────────────────── */
function FeaturedCard({ cat }: { cat: typeof FEATURED[0] }) {
  return (
    <motion.div variants={item}>
      <motion.div
        className="relative overflow-hidden h-[420px] md:h-[520px] cursor-pointer group"
        whileHover={{ scale: 1.01 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <Image
          src={cat.image}
          alt={cat.name}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          priority
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent
                        group-hover:from-black/88 transition-all duration-500" />

        {/* Badge */}
        {cat.badge && (
          <div className="absolute top-4 left-4 bg-gold-500 text-white text-[9px]
                          uppercase tracking-[0.25em] font-sans font-medium px-3 py-1.5">
            {cat.badge}
          </div>
        )}

        {/* Gold border */}
        <div className="absolute inset-0 border border-transparent
                        group-hover:border-gold-500/50 transition-colors duration-300
                        pointer-events-none" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-7 pointer-events-none">
          <p className="text-[10px] text-gold-400 tracking-[0.3em] uppercase font-sans mb-2">
            {cat.count}
          </p>
          <h3 className="font-serif text-2xl md:text-3xl text-white mb-2">{cat.name}</h3>
          <p className="text-cream-300 text-xs font-sans tracking-wide mb-4 opacity-0
                        group-hover:opacity-100 transition-opacity duration-300">
            {cat.description}
          </p>
          <div className="flex items-center gap-2 text-[11px] text-white/90
                          tracking-widest uppercase font-sans
                          translate-y-2 opacity-0
                          group-hover:opacity-100 group-hover:translate-y-0
                          transition-all duration-300">
            Découvrir la collection
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        <Link
          href={`/shop?category=${cat.slug}`}
          className="absolute inset-0 z-20"
          aria-label={`Découvrir ${cat.name}`}
        />
      </motion.div>
    </motion.div>
  )
}

/* ─── Carte standard (petite) ───────────────────────────────────────── */
function CategoryCard({ cat }: { cat: typeof CATEGORIES[0] }) {
  return (
    <motion.div variants={item}>
      <motion.div
        className="relative overflow-hidden h-52 md:h-64 cursor-pointer group"
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <Image
          src={cat.image}
          alt={cat.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          className="object-cover transition-transform duration-700 group-hover:scale-108"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent
                        group-hover:from-black/85 transition-all duration-500" />

        <div className="absolute inset-0 border border-transparent
                        group-hover:border-gold-500/40 transition-colors duration-300
                        pointer-events-none" />

        <div className="absolute bottom-0 left-0 right-0 p-4 pointer-events-none">
          <p className="text-[9px] text-gold-400 tracking-[0.25em] uppercase font-sans mb-1">
            {cat.count}
          </p>
          <h3 className="font-serif text-base md:text-lg text-white mb-1">{cat.name}</h3>
          <p className="text-cream-300/80 text-[10px] font-sans leading-snug mb-2
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {cat.description}
          </p>
          <div className="flex items-center gap-1.5 text-[10px] text-white/85
                          tracking-widest uppercase font-sans
                          translate-y-1.5 opacity-0
                          group-hover:opacity-100 group-hover:translate-y-0
                          transition-all duration-300">
            Voir
            <ArrowRight className="w-3 h-3" />
          </div>
        </div>

        <Link
          href={`/shop?category=${cat.slug}`}
          className="absolute inset-0 z-20"
          aria-label={`Découvrir ${cat.name}`}
        />
      </motion.div>
    </motion.div>
  )
}

/* ─── Section principale ────────────────────────────────────────────── */
export default function Categories() {
  return (
    <section className="py-20 bg-cream-100 relative overflow-hidden">
      {/* ── Fireworks — "Explorez nos collections" ─────── */}
      <Fireworks zIndex={5} intervalMs={4000} maxRockets={2} opacity={0.65} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-14"
        >
          <p className="section-tag mb-3">Nos univers</p>
          <h2 className="section-title mb-3">Explorez nos collections</h2>
          <p className="text-luxury-light font-sans text-sm max-w-lg mx-auto leading-relaxed">
            Robes, Bijoux, Chaussures &amp; Sacs — tout importé directement de Dubaï,
            sélectionné pour son style et sa qualité.
          </p>
          <motion.div
            className="h-px bg-gold-500 mx-auto mt-6"
            initial={{ width: 0 }}
            whileInView={{ width: 48 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          />
        </motion.div>

        {/* Featured — 2 grandes cartes */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
        >
          {FEATURED.map((cat) => (
            <FeaturedCard key={cat.slug} cat={cat} />
          ))}
        </motion.div>

        {/* Rubriques — 5 cartes standards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4"
        >
          {CATEGORIES.map((cat) => (
            <CategoryCard key={cat.slug} cat={cat} />
          ))}
        </motion.div>

        {/* Lien boutique complète */}
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
            Voir toute la boutique
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>

      </div>
    </section>
  )
}

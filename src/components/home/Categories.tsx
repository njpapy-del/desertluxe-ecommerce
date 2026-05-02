'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const CATEGORIES = [
  {
    name:     'Sacs à Main',
    slug:     'sacs-a-main',
    image:    'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=700&q=85&fit=crop',
    count:    '48 pièces',
  },
  {
    name:     'Nouvelle Collection',
    slug:     'nouveautes',
    image:    'https://images.unsplash.com/photo-1584917865442-de89be144b2a?w=700&q=85&fit=crop',
    count:    '24 pièces',
  },
  {
    name:     'Accessoires',
    slug:     'accessoires',
    image:    'https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=700&q=85&fit=crop',
    count:    '36 pièces',
  },
  {
    name:     'Best Sellers',
    slug:     'best-sellers',
    image:    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=700&q=85&fit=crop',
    count:    '12 pièces',
  },
]

const container = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 36, scale: 0.97 },
  show:   {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
}

export default function Categories() {
  return (
    <section className="py-20 bg-cream-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <p className="section-tag mb-3">Collections</p>
          <h2 className="section-title mb-4">Nos Univers</h2>
          <motion.div
            className="h-px bg-gold-500 mx-auto"
            initial={{ width: 0 }}
            whileInView={{ width: 48 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          />
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {CATEGORIES.map((cat) => (
            <motion.div key={cat.slug} variants={item}>
              {/*
                Hydration-safe pattern: the outer div handles the layout/animation,
                a full-size invisible <a> sits on top via absolute positioning.
                No <div> nested inside <a>.
              */}
              <motion.div
                className="relative overflow-hidden h-64 md:h-80 lg:h-96 cursor-pointer group"
                whileHover={{ scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                {/* Image */}
                <motion.div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${cat.image})` }}
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/12 to-transparent
                                group-hover:from-black/80 transition-all duration-500" />

                {/* Shine sweep */}
                <div className="shine-overlay" />

                {/* Gold border reveal */}
                <div className="absolute inset-0 border border-transparent
                                group-hover:border-gold-500/40 transition-colors duration-300
                                pointer-events-none" />

                {/* Text content */}
                <div className="absolute bottom-0 left-0 right-0 p-5 pointer-events-none">
                  <p className="text-[10px] text-gold-400 tracking-[0.25em] uppercase font-sans mb-1">
                    {cat.count}
                  </p>
                  <h3 className="font-serif text-xl text-white mb-3">{cat.name}</h3>
                  <div className="flex items-center gap-2 text-[11px] text-white/85
                                  tracking-widest uppercase font-sans
                                  opacity-0 translate-y-2
                                  group-hover:opacity-100 group-hover:translate-y-0
                                  transition-all duration-300">
                    Découvrir
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>

                {/* Full-size accessible link — no block element inside <a> */}
                <Link
                  href={`/shop?category=${cat.slug}`}
                  className="absolute inset-0 z-20"
                  aria-label={`Découvrir ${cat.name}`}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

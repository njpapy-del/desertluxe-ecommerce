'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import ProductCard from '@/components/shop/ProductCard'
import { useLocaleStore } from '@/store/localeStore'
import type { Product } from '@/types'

interface FeaturedProductsProps {
  products: Product[]
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const headerY = useTransform(scrollYProgress, [0, 0.5], [20, 0])
  const { t } = useLocaleStore()

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          style={{ y: headerY }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4"
        >
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="section-tag mb-3">{t.home.featuredTag}</p>
            <h2 className="section-title">{t.home.featuredTitle}</h2>
            <motion.div
              className="h-px bg-gold-500 mt-4"
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.15 }}
          >
            <Link
              href="/shop"
              className="group flex items-center gap-2 text-xs tracking-widest uppercase
                         font-sans text-luxury-dark hover:text-gold-500 transition-colors"
            >
              {t.home.viewAll}
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ArrowRight className="w-4 h-4" />
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Product grid — staggered entrance */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{
                duration: 0.55,
                delay:    idx * 0.09,
                ease:     [0.16, 1, 0.3, 1],
              }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

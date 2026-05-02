'use client'

import { useState, useRef, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ShoppingBag, Heart, Star, Eye } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import type { Product } from '@/types'

interface ProductCardProps {
  product: Product
}

// ── Shine sweep overlay ─────────────────────────────────────────────────────
function ShineEffect({ active }: { active: boolean }) {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none z-10 overflow-hidden"
      aria-hidden="true"
    >
      <motion.div
        className="absolute inset-0"
        initial={{ x: '-120%', skewX: '-20deg' }}
        animate={active ? { x: '220%' } : { x: '-120%' }}
        transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
        style={{
          width: '60%',
          background:
            'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%)',
        }}
      />
    </motion.div>
  )
}

export default function ProductCard({ product }: ProductCardProps) {
  const router   = useRouter()
  const cardRef  = useRef<HTMLDivElement>(null)

  const [imgIdx,   setImgIdx]   = useState(0)
  const [wished,   setWished]   = useState(false)
  const [adding,   setAdding]   = useState(false)
  const [hovered,  setHovered]  = useState(false)

  const { addItem } = useCartStore()

  // ── Magnetic tilt via mouse ──────────────────────────────────────────────
  const mouseX  = useMotionValue(0)
  const mouseY  = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4, 4]), { stiffness: 300, damping: 30 })

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }, [mouseX, mouseY])

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0)
    mouseY.set(0)
    setHovered(false)
    setImgIdx(0)
  }, [mouseX, mouseY])

  const discount = product.comparePrice
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : 0

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setAdding(true)
    addItem(product, 1)
    setTimeout(() => setAdding(false), 1400)
  }

  const handleWish = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setWished((w) => !w)
  }

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    router.push(`/product/${product.slug}`)
  }

  return (
    <motion.div
      ref={cardRef}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => { setHovered(true); if (product.images[1]) setImgIdx(1) }}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -6, boxShadow: '0 20px 60px rgba(0,0,0,0.13)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 28 }}
      className="product-card group will-change-transform bg-white"
    >
      {/* ── Image zone — single <Link>, no nesting ──────── */}
      <div className="relative aspect-[3/4] overflow-hidden bg-cream-200">

        {/* Clickable product image → product page */}
        <Link
          href={`/product/${product.slug}`}
          className="absolute inset-0 z-0"
          tabIndex={-1}
          aria-hidden="true"
        />

        {/* Image with zoom */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ scale: hovered ? 1.06 : 1 }}
          transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Image
            src={product.images[imgIdx] || product.images[0]}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </motion.div>

        {/* Shine */}
        <ShineEffect active={hovered} />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-20 pointer-events-none">
          {discount > 0 && <span className="badge-sale">-{discount}%</span>}
          {product.tags.includes('nouveau') && <span className="badge-new">Nouveau</span>}
          {product.stock <= 3 && product.stock > 0 && (
            <span className="bg-amber-500 text-white text-[10px] tracking-widest uppercase px-2 py-0.5 font-sans">
              Stock limité
            </span>
          )}
        </div>

        {/* Action buttons — plain buttons, no Link nesting */}
        <motion.div
          className="absolute top-3 right-3 flex flex-col gap-2 z-20"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : 10 }}
          transition={{ duration: 0.22 }}
        >
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleWish}
            className="w-8 h-8 bg-white shadow-md flex items-center justify-center"
            aria-label="Ajouter aux favoris"
          >
            <Heart
              className={`w-3.5 h-3.5 transition-colors ${
                wished ? 'fill-red-500 text-red-500' : 'text-luxury-dark'
              }`}
            />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleQuickView}
            className="w-8 h-8 bg-white shadow-md flex items-center justify-center"
            aria-label="Voir le produit"
          >
            <Eye className="w-3.5 h-3.5 text-luxury-dark" />
          </motion.button>
        </motion.div>

        {/* Add to cart — slides up on hover */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 z-20"
          initial={{ y: '100%' }}
          animate={{ y: hovered ? 0 : '100%' }}
          transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            whileTap={{ scale: 0.97 }}
            className={`w-full flex items-center justify-center gap-2 py-3.5
                       text-[11px] tracking-[0.2em] uppercase font-sans font-medium
                       transition-colors duration-200
                       ${adding
                         ? 'bg-gold-500 text-white'
                         : product.stock === 0
                         ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                         : 'bg-luxury-dark text-white hover:bg-gold-500'
                       }`}
          >
            <motion.span animate={adding ? { rotate: 360 } : { rotate: 0 }} transition={{ duration: 0.5 }}>
              <ShoppingBag className="w-3.5 h-3.5" />
            </motion.span>
            {product.stock === 0 ? 'Rupture' : adding ? 'Ajouté ✓' : 'Ajouter au panier'}
          </motion.button>
        </motion.div>
      </div>

      {/* ── Info — clickable via router ──────────────────── */}
      <div
        className="p-4 cursor-pointer"
        onClick={() => router.push(`/product/${product.slug}`)}
      >
        <p className="text-[10px] text-gold-500 tracking-[0.2em] uppercase font-sans mb-1.5">
          {product.category.name}
        </p>

        <h3 className="font-serif text-[15px] text-luxury-dark hover:text-gold-600
                       transition-colors leading-snug line-clamp-2 mb-2">
          {product.name}
        </h3>

        {product.reviewCount > 0 && (
          <div className="flex items-center gap-1.5 mb-2.5">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className={`w-3 h-3 ${
                    s <= Math.round(product.rating)
                      ? 'fill-gold-500 text-gold-500'
                      : 'text-cream-400'
                  }`}
                />
              ))}
            </div>
            <span className="text-[10px] text-luxury-gray font-sans">({product.reviewCount})</span>
          </div>
        )}

        <div className="flex items-center gap-2">
          <span className="font-sans font-semibold text-luxury-dark text-[15px]">
            {product.price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
          </span>
          {product.comparePrice && (
            <span className="font-sans text-xs text-luxury-light line-through">
              {product.comparePrice.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}

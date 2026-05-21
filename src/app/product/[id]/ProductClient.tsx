'use client'

import { useState } from 'react'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Star, ShoppingBag, Heart, Share2, Truck,
  Shield, RotateCcw, MessageCircle, ChevronRight, Minus, Plus,
} from 'lucide-react'
import { MOCK_PRODUCTS } from '@/lib/mockData'
import { useCartStore }   from '@/store/cartStore'
import { useLocaleStore } from '@/store/localeStore'
import { localizeProduct, localizeCategory } from '@/locales/products'
import { fmtPrice }       from '@/lib/priceUtils'
import ProductCard from '@/components/shop/ProductCard'
import toast from 'react-hot-toast'

export default function ProductClient({ id }: { id: string }) {
  const raw = MOCK_PRODUCTS.find((p) => p.slug === id || p.id === id)

  const [activeImg, setActiveImg] = useState(0)
  const [qty, setQty]             = useState(1)
  const [wished, setWished]       = useState(false)
  const { addItem }               = useCartStore()
  const { t, locale, currency }   = useLocaleStore()
  const tp = t.product

  if (!raw) notFound()

  const product  = localizeProduct(raw, locale)
  const category = localizeCategory(raw.category, locale)

  const related = MOCK_PRODUCTS.filter(
    (p) => p.id !== raw.id && p.category.slug === raw.category.slug
  ).slice(0, 4)

  const discount = product.comparePrice && product.comparePrice > 0
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : 0

  const waNumber = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+971522110904').replace(/\D/g, '')
  const whatsappMsg = encodeURIComponent(
    `${tp.orderWhatsApp}: ${product.name} — ${fmtPrice(product.price, currency)}\nhttps://desertluxe-ecommerce.vercel.app/product/${product.slug}`
  )

  const stockText = product.stock > 3
    ? tp.stockAvailable
    : product.stock > 0
      ? tp.stockLimited.replace('{n}', String(product.stock))
      : tp.outOfStock

  return (
    <div className="min-h-screen bg-cream-100">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center gap-2 text-xs font-sans text-luxury-gray">
          <Link href="/" className="hover:text-gold-500">{t.nav.home}</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/shop" className="hover:text-gold-500">{t.nav.shop}</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href={`/shop?category=${raw.category.slug}`} className="hover:text-gold-500">
            {category.name}
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-luxury-dark">{product.name}</span>
        </nav>
      </div>

      {/* Produit */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-16">

          {/* ── Images ─────────────────────────────── */}
          <div className="space-y-4">
            <motion.div
              key={activeImg}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative aspect-square bg-cream-200 overflow-hidden"
            >
              <Image
                src={product.images[activeImg]}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              {discount > 0 && (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 text-[11px] font-sans font-medium">
                  -{discount}%
                </div>
              )}
            </motion.div>

            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`relative w-20 h-20 overflow-hidden border-2 transition-colors ${
                      activeImg === i ? 'border-gold-500' : 'border-transparent hover:border-cream-400'
                    }`}
                  >
                    <Image src={img} alt="" fill className="object-cover" sizes="80px" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Détails ─────────────────────────────── */}
          <div className="flex flex-col">
            <Link
              href={`/shop?category=${raw.category.slug}`}
              className="text-[11px] text-gold-500 tracking-[0.25em] uppercase font-sans mb-3 hover:text-gold-600 transition-colors"
            >
              {category.name}
            </Link>

            <h1 className="font-serif text-3xl md:text-4xl text-luxury-dark leading-tight mb-4">
              {product.name}
            </h1>

            {product.reviewCount > 0 && (
              <div className="flex items-center gap-3 mb-5">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className={`w-4 h-4 ${s <= Math.round(product.rating) ? 'fill-gold-500 text-gold-500' : 'text-cream-400'}`} />
                  ))}
                </div>
                <span className="text-sm text-luxury-gray font-sans">
                  {product.rating} ({product.reviewCount} {tp.reviews})
                </span>
              </div>
            )}

            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-serif text-3xl text-luxury-dark">
                {fmtPrice(product.price, currency)}
              </span>
              {product.comparePrice && product.comparePrice > 0 && (
                <span className="text-lg text-luxury-light line-through font-sans">
                  {fmtPrice(product.comparePrice, currency)}
                </span>
              )}
              {discount > 0 && (
                <span className="text-sm text-red-500 font-sans font-medium">−{discount}%</span>
              )}
            </div>

            <div className="w-12 h-px bg-gold-500 mb-6" />

            <p className="text-luxury-gray font-sans text-sm leading-relaxed mb-8">
              {product.description}
            </p>

            <div className="flex items-center gap-2 mb-6">
              <div className={`w-2 h-2 rounded-full ${
                product.stock > 3 ? 'bg-green-500' : product.stock > 0 ? 'bg-amber-500' : 'bg-red-400'
              }`} />
              <span className="text-xs font-sans text-luxury-gray">{stockText}</span>
            </div>

            {/* Quantité */}
            <div className="flex items-center gap-4 mb-5">
              <span className="text-xs font-sans font-medium tracking-widest uppercase text-luxury-gray">
                {tp.quantity}
              </span>
              <div className="flex items-center border border-cream-400">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-10 h-10 flex items-center justify-center hover:bg-cream-200 transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-10 text-center text-sm font-sans font-medium">{qty}</span>
                <button
                  onClick={() => setQty(Math.min(product.stock, qty + 1))}
                  className="w-10 h-10 flex items-center justify-center hover:bg-cream-200 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-3 mb-8">
              <button
                onClick={() => {
                  addItem(product as any, qty)
                  toast.success(`${product.name} — ${tp.added}`)
                }}
                disabled={product.stock === 0}
                className="w-full flex items-center justify-center gap-2 bg-luxury-dark text-white
                           py-4 text-xs tracking-widest uppercase font-sans font-medium
                           hover:bg-gold-500 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                <ShoppingBag className="w-4 h-4" />
                {product.stock === 0 ? tp.outOfStock : tp.addToCart}
              </button>

              <a
                href={`https://wa.me/${waNumber}?text=${whatsappMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white
                           py-4 text-xs tracking-widest uppercase font-sans font-medium
                           hover:bg-[#1EBE5D] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                {t.footer.whatsappCta}
              </a>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setWished(!wished)
                    toast.success(wished ? tp.wishlist : tp.wishlist)
                  }}
                  className="flex-1 flex items-center justify-center gap-2 border border-cream-400
                             py-3.5 text-xs tracking-widest uppercase font-sans font-medium
                             hover:border-gold-500 hover:text-gold-500 transition-colors"
                >
                  <Heart className={`w-4 h-4 ${wished ? 'fill-red-400 text-red-400' : ''}`} />
                  {tp.wishlist}
                </button>
                <button
                  onClick={() => navigator.share?.({ title: product.name, url: window.location.href })}
                  className="flex-1 flex items-center justify-center gap-2 border border-cream-400
                             py-3.5 text-xs tracking-widest uppercase font-sans font-medium
                             hover:border-gold-500 hover:text-gold-500 transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  {tp.share}
                </button>
              </div>
            </div>

            <div className="space-y-3 border-t border-cream-300 pt-6">
              {[
                { Icon: Truck,     text: tp.delivery      },
                { Icon: RotateCcw, text: tp.returns       },
                { Icon: Shield,    text: tp.securePayment },
              ].map(({ Icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <Icon className="w-4 h-4 text-gold-500 shrink-0" />
                  <span className="text-xs font-sans text-luxury-gray">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Produits similaires */}
        {related.length > 0 && (
          <section className="mt-20">
            <div className="text-center mb-10">
              <p className="text-xs uppercase tracking-[0.3em] text-gold-500 font-sans mb-3">
                {tp.youMightAlsoLike}
              </p>
              <h2 className="font-serif text-3xl text-luxury-dark">{tp.similarProducts}</h2>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p as any} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

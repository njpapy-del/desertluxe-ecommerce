'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { X, ShoppingBag, Minus, Plus, Trash2, ArrowRight, MessageCircle } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, '') || ''

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, total } = useCartStore()

  // Rehydrate Zustand depuis localStorage après le montage client
  useEffect(() => {
    useCartStore.persist.rehydrate()
  }, [])

  const buildWhatsAppMessage = () => {
    const lines = items.map(
      (i) => `- ${i.name} x${i.quantity} = ${(i.price * i.quantity).toFixed(0)}€`
    )
    lines.push(`\nTOTAL: ${total().toFixed(0)}€`)
    lines.push(`\nPayer en ligne: ${process.env.NEXT_PUBLIC_APP_URL}/checkout`)
    return encodeURIComponent(`Bonjour DESERTLUXE!\n\nJe souhaite commander:\n${lines.join('\n')}`)
  }

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50"
            onClick={closeCart}
          />
        )}
      </AnimatePresence>

      {/* Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35 }}
            className="fixed right-0 top-0 bottom-0 w-full sm:w-[420px] bg-white z-50
                       flex flex-col shadow-luxury-lg"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-cream-300">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-gold-500" />
                <h2 className="font-serif text-lg text-luxury-dark">
                  Mon Panier
                </h2>
                {items.length > 0 && (
                  <span className="text-xs text-luxury-gray font-sans">
                    ({items.reduce((s, i) => s + i.quantity, 0)} articles)
                  </span>
                )}
              </div>
              <button onClick={closeCart} className="p-1 hover:text-gold-500 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto py-4 px-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-4">
                  <ShoppingBag className="w-16 h-16 text-cream-400" />
                  <div>
                    <p className="font-serif text-lg text-luxury-dark mb-1">Votre panier est vide</p>
                    <p className="text-sm text-luxury-gray font-sans">
                      Découvrez nos collections exclusives
                    </p>
                  </div>
                  <Link
                    href="/shop"
                    onClick={closeCart}
                    className="btn-luxury text-xs py-2.5 px-6 mt-2"
                  >
                    Voir la boutique
                  </Link>
                </div>
              ) : (
                <ul className="space-y-5">
                  {items.map((item) => (
                    <li key={item.id} className="flex gap-4">
                      {/* Image */}
                      <div className="relative w-20 h-24 shrink-0 bg-cream-200 overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-serif text-sm text-luxury-dark leading-tight mb-1 line-clamp-2">
                          {item.name}
                        </h3>
                        <p className="text-xs text-gold-500 font-sans font-semibold mb-3">
                          {item.price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                        </p>

                        {/* Quantity + Remove */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center border border-cream-300">
                            <button
                              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                              className="w-7 h-7 flex items-center justify-center hover:bg-cream-200 transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center text-xs font-sans font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                              className="w-7 h-7 flex items-center justify-center hover:bg-cream-200 transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.productId)}
                            className="p-1.5 text-luxury-gray hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-cream-300 px-6 py-5 space-y-4">
                {/* Subtotal */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-sans">
                    <span className="text-luxury-gray">Sous-total</span>
                    <span className="font-medium">
                      {total().toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-sans">
                    <span className="text-luxury-gray">Livraison</span>
                    <span className={total() >= 200 ? 'text-green-600' : 'text-luxury-dark'}>
                      {total() >= 200 ? 'Gratuite' : '15,00 €'}
                    </span>
                  </div>
                  {total() < 200 && (
                    <p className="text-[11px] text-gold-500 font-sans">
                      Encore {(200 - total()).toFixed(0)}€ pour la livraison gratuite
                    </p>
                  )}
                  <div className="flex justify-between font-sans font-semibold text-base pt-2 border-t border-cream-300">
                    <span>Total</span>
                    <span>
                      {(total() + (total() >= 200 ? 0 : 15)).toLocaleString('fr-FR', {
                        style: 'currency',
                        currency: 'EUR',
                      })}
                    </span>
                  </div>
                </div>

                {/* CTAs */}
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="flex items-center justify-center gap-2 w-full bg-luxury-dark text-white
                             py-4 text-xs tracking-widest uppercase font-sans font-medium
                             hover:bg-gold-500 transition-colors"
                >
                  Commander <ArrowRight className="w-4 h-4" />
                </Link>

                {WHATSAPP && (
                  <a
                    href={`https://wa.me/${WHATSAPP}?text=${buildWhatsAppMessage()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-[#25D366] text-white
                               py-3.5 text-xs tracking-widest uppercase font-sans font-medium
                               hover:bg-[#1EBE5D] transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Commander sur WhatsApp
                  </a>
                )}
              </div>
            )}
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}

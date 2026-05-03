'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { ShoppingBag, Search, User, Menu, X } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import EyeOfRa from '@/components/ui/EyeOfRa'

const NAV_LINKS = [
  { label: 'Accueil',     href: '/'                           },
  { label: 'Boutique',    href: '/shop'                       },
  { label: 'Nouveautés',  href: '/shop?category=nouveautes'   },
  { label: 'Sacs',        href: '/shop?category=sacs-a-main'  },
  { label: 'Accessoires', href: '/shop?category=accessoires'  },
  { label: 'À propos',    href: '/about'                      },
]

export default function Header() {
  const [scrolled, setScrolled]     = useState(false)
  const [hidden, setHidden]         = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery]           = useState('')
  const [lastY, setLastY]           = useState(0)

  const { itemCount, toggleCart } = useCartStore()
  const { scrollY }               = useScroll()

  // Shrink + hide on scroll down
  useMotionValueEvent(scrollY, 'change', (y) => {
    setScrolled(y > 40)
    setHidden(y > lastY && y > 120)
    setLastY(y)
  })

  return (
    <>
      {/* ── Announcement bar ─────────────────────────────── */}
      <motion.div
        initial={{ y: -40 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="bg-luxury-dark text-cream-200 text-center py-2
                   text-[11px] tracking-[0.2em] uppercase font-sans"
      >
        Livraison offerte dès 200€ · Retours 30 jours · Paiement sécurisé
      </motion.div>

      {/* ── Main header ──────────────────────────────────── */}
      <motion.header
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
        className={`sticky top-0 z-50 w-full transition-all duration-400 ${
          scrolled
            ? 'bg-white/96 backdrop-blur-md shadow-nav py-3'
            : 'bg-cream-100/92 backdrop-blur-sm py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">

            {/* ── Left nav ───────────────────────────────── */}
            <nav className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.slice(0, 3).map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.45 }}
                >
                  <Link href={link.href} className="nav-link pb-1">
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* ── Logo ───────────────────────────────────── */}
            <Link
              href="/"
              className="absolute left-1/2 -translate-x-1/2"
            >
              <motion.div
                className="flex flex-col items-center"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                <motion.span
                  className="font-serif text-2xl md:text-3xl tracking-[0.15em] text-luxury-dark font-medium"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="inline-flex items-center gap-2">
                    <EyeOfRa className="w-6 h-4 text-gold-500 opacity-90" />
                    MA <span className="text-gold-500">LUXURY</span>
                  </span>
                </motion.span>
                <motion.span
                  className="text-[8px] tracking-[0.4em] text-gold-500 uppercase font-sans font-medium -mt-0.5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  Dubai · Luxury Fashion
                </motion.span>
              </motion.div>
            </Link>

            {/* ── Right nav + icons ──────────────────────── */}
            <div className="flex items-center gap-6">
              <nav className="hidden lg:flex items-center gap-8">
                {NAV_LINKS.slice(3).map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 + i * 0.07, duration: 0.45 }}
                  >
                    <Link href={link.href} className="nav-link pb-1">
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Icon buttons */}
              <div className="flex items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.1, color: '#C9A96E' }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSearchOpen(!searchOpen)}
                  className="p-1.5 text-luxury-dark transition-colors"
                >
                  <Search className="w-5 h-5" />
                </motion.button>

                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Link href="/admin" className="hidden md:flex p-1.5 text-luxury-dark hover:text-gold-500 transition-colors">
                    <User className="w-5 h-5" />
                  </Link>
                </motion.div>

                {/* Cart with badge pulse */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleCart}
                  className="relative p-1.5 text-luxury-dark hover:text-gold-500 transition-colors"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <AnimatePresence>
                    {itemCount() > 0 && (
                      <motion.span
                        key={itemCount()}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                        className="absolute -top-1 -right-1 w-4 h-4 bg-gold-500 text-white
                                   text-[9px] rounded-full flex items-center justify-center
                                   font-sans font-bold"
                      >
                        {itemCount()}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>

                {/* Mobile burger */}
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setMobileOpen(!mobileOpen)}
                  className="lg:hidden p-1.5 text-luxury-dark"
                >
                  <AnimatePresence mode="wait">
                    {mobileOpen
                      ? <motion.div key="x"   initial={{ rotate: -90 }} animate={{ rotate: 0 }}><X    className="w-5 h-5" /></motion.div>
                      : <motion.div key="menu" initial={{ rotate:  90 }} animate={{ rotate: 0 }}><Menu className="w-5 h-5" /></motion.div>
                    }
                  </AnimatePresence>
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Search bar ───────────────────────────────── */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="border-t border-cream-300 overflow-hidden"
            >
              <div className="max-w-2xl mx-auto px-4 py-4">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-luxury-light" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Rechercher sacs, accessoires, collections…"
                    className="w-full pl-11 pr-4 py-3 border border-cream-400 bg-white text-sm
                               font-sans placeholder:text-luxury-light focus:border-gold-500
                               focus:ring-1 focus:ring-gold-500 outline-none transition-colors"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && query.trim()) {
                        window.location.href = `/shop?search=${encodeURIComponent(query)}`
                      }
                      if (e.key === 'Escape') setSearchOpen(false)
                    }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* ── Mobile menu ───────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.nav
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.32, ease: [0.25, 0.1, 0.25, 1] }}
              className="fixed left-0 top-0 bottom-0 w-72 bg-white z-50 flex flex-col lg:hidden shadow-luxury-lg"
            >
              <div className="flex items-center justify-between p-5 border-b border-cream-300">
                <span className="font-serif text-xl tracking-wider">
                  <span className="inline-flex items-center gap-2">
                    <EyeOfRa className="w-6 h-4 text-gold-500 opacity-90" />
                    MA <span className="text-gold-500">LUXURY</span>
                  </span>
                </span>
                <motion.button whileTap={{ scale: 0.9 }} onClick={() => setMobileOpen(false)}>
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              <div className="flex-1 overflow-y-auto py-4 px-5">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.35 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="block py-4 border-b border-cream-200 text-sm tracking-widest
                                 uppercase font-sans font-medium text-luxury-dark
                                 hover:text-gold-500 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="p-5 border-t border-cream-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Link
                  href="/admin"
                  className="block text-center py-3 border border-gold-500 text-gold-500
                             text-xs tracking-widest uppercase font-sans font-medium
                             hover:bg-gold-500 hover:text-white transition-colors"
                >
                  Espace Admin
                </Link>
              </motion.div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

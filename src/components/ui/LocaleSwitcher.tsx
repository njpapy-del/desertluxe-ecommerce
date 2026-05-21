'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Globe, Coins } from 'lucide-react'
import { useLocaleStore } from '@/store/localeStore'
import type { Locale, Currency } from '@/locales'

export default function LocaleSwitcher() {
  const { locale, currency, t, setLocale, setCurrency } = useLocaleStore()
  const [open, setOpen] = useState(false)
  const ref             = useRef<HTMLDivElement>(null)

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const languages: { value: Locale; flag: string; label: string }[] = [
    { value: 'en', flag: '🇬🇧', label: 'English' },
    { value: 'ar', flag: '🇦🇪', label: 'العربية' },
  ]

  const currencies: { value: Currency; label: string }[] = [
    { value: 'AED', label: 'AED — درهم' },
    { value: 'TND', label: 'TND — دينار' },
  ]

  const currentLang = languages.find(l => l.value === locale)

  return (
    <div ref={ref} className="relative">
      {/* Trigger button */}
      <motion.button
        onClick={() => setOpen(o => !o)}
        whileHover={{ color: '#C9A96E' }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-1.5 text-luxury-dark text-[11px] tracking-widest
                   uppercase font-sans font-medium transition-colors select-none"
        aria-label="Language and currency"
      >
        <Globe className="w-3.5 h-3.5" />
        <span>{currentLang?.flag}</span>
        <span className="hidden sm:inline">{currency}</span>
        <ChevronDown
          className={`w-3 h-3 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </motion.button>

      {/* Dropdown panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0,  scale: 1    }}
            exit={{   opacity: 0, y: 8,  scale: 0.97 }}
            transition={{ duration: 0.18, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute top-full mt-3 right-0 w-52 bg-white border border-cream-300
                       shadow-luxury z-50 p-4"
          >
            {/* Language */}
            <p className="flex items-center gap-1.5 text-[9px] tracking-[0.2em] uppercase
                          text-luxury-light font-sans mb-2">
              <Globe className="w-3 h-3" />
              {t.language.label}
            </p>
            <div className="flex gap-2 mb-4">
              {languages.map(l => (
                <button
                  key={l.value}
                  onClick={() => { setLocale(l.value); setOpen(false) }}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-[11px]
                              font-sans tracking-wide border transition-all duration-150
                              ${locale === l.value
                                ? 'border-gold-500 bg-gold-50 text-gold-600 font-semibold'
                                : 'border-cream-300 text-luxury-dark hover:border-gold-400'
                              }`}
                >
                  <span>{l.flag}</span>
                  <span>{l.label}</span>
                </button>
              ))}
            </div>

            {/* Divider */}
            <div className="border-t border-cream-200 mb-4" />

            {/* Currency */}
            <p className="flex items-center gap-1.5 text-[9px] tracking-[0.2em] uppercase
                          text-luxury-light font-sans mb-2">
              <Coins className="w-3 h-3" />
              {t.currency.label}
            </p>
            <div className="flex flex-col gap-1.5">
              {currencies.map(c => (
                <button
                  key={c.value}
                  onClick={() => { setCurrency(c.value); setOpen(false) }}
                  className={`w-full text-left px-3 py-2 text-[11px] font-sans tracking-wide
                              border transition-all duration-150
                              ${currency === c.value
                                ? 'border-gold-500 bg-gold-50 text-gold-600 font-semibold'
                                : 'border-cream-300 text-luxury-dark hover:border-gold-400'
                              }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

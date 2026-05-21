'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useLocaleStore } from '@/store/localeStore'

type TimeLeft = { d: string; h: string; m: string; s: string }

function getEndOfWeek(): Date {
  const now = new Date()
  const daysUntilSunday = now.getDay() === 0 ? 7 : 7 - now.getDay()
  const end = new Date(now)
  end.setDate(now.getDate() + daysUntilSunday)
  end.setHours(23, 59, 59, 0)
  return end
}

function pad(n: number) { return String(n).padStart(2, '0') }

function computeTimeLeft(target: Date): TimeLeft {
  const diff = Math.max(0, target.getTime() - Date.now())
  const total = Math.floor(diff / 1000)
  return {
    d: pad(Math.floor(total / 86400)),
    h: pad(Math.floor((total % 86400) / 3600)),
    m: pad(Math.floor((total % 3600) / 60)),
    s: pad(total % 60),
  }
}

function CountUnit({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <motion.div
        key={value}
        initial={{ y: -6, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="flex items-center justify-center font-serif text-white border border-gold-500/25"
        style={{
          width: 'clamp(56px, 8vw, 76px)',
          height: 'clamp(56px, 8vw, 76px)',
          fontSize: 'clamp(1.4rem, 3.5vw, 2rem)',
          background: 'rgba(255,255,255,0.04)',
        }}
      >
        {value}
      </motion.div>
      <span className="text-cream-400/55 font-sans"
        style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase' }}>
        {label}
      </span>
    </div>
  )
}

export default function FlashSaleCountdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null)
  const { t } = useLocaleStore()

  useEffect(() => {
    const target = getEndOfWeek()
    setTimeLeft(computeTimeLeft(target))
    const id = setInterval(() => setTimeLeft(computeTimeLeft(target)), 1000)
    return () => clearInterval(id)
  }, [])

  if (!timeLeft) return null

  return (
    <section className="py-16 bg-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden bg-luxury-dark py-12 px-6 md:px-16 text-center"
        >
          {/* Corner gold accents */}
          {(['tl','tr','bl','br'] as const).map((pos) => (
            <div
              key={pos}
              className="absolute pointer-events-none"
              style={{
                top:    pos.startsWith('t') ? 0 : 'auto',
                bottom: pos.startsWith('b') ? 0 : 'auto',
                left:   pos.endsWith('l')   ? 0 : 'auto',
                right:  pos.endsWith('r')   ? 0 : 'auto',
                width: 44,
                height: 44,
                borderTop:    pos.startsWith('t') ? '1px solid rgba(201,169,110,0.35)' : undefined,
                borderBottom: pos.startsWith('b') ? '1px solid rgba(201,169,110,0.35)' : undefined,
                borderLeft:   pos.endsWith('l')   ? '1px solid rgba(201,169,110,0.35)' : undefined,
                borderRight:  pos.endsWith('r')   ? '1px solid rgba(201,169,110,0.35)' : undefined,
              }}
            />
          ))}

          {/* Subtle radial glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(201,169,110,0.06), transparent 55%)' }}
          />

          {/* ⚡ Flash Sale tag */}
          <p className="text-gold-400 font-sans mb-4"
            style={{ fontSize: 10, letterSpacing: '0.45em', textTransform: 'uppercase' }}>
            ⚡ Flash Sale
          </p>

          <h2 className="font-serif text-white mb-2 leading-tight"
            style={{ fontSize: 'clamp(1.6rem, 4vw, 2.5rem)' }}>
            {t.home.flashTitle}
          </h2>
          <p className="text-cream-300/55 font-sans font-light mb-8 tracking-wide"
            style={{ fontSize: 13 }}>
            {t.home.flashSubtitle}
          </p>

          {/* Countdown */}
          <div className="flex items-center justify-center gap-3 md:gap-5 mb-8">
            <CountUnit value={timeLeft.d} label={t.home.flashDays} />
            <span className="text-gold-500 font-serif pb-6" style={{ fontSize: '1.5rem' }}>:</span>
            <CountUnit value={timeLeft.h} label={t.home.flashHours} />
            <span className="text-gold-500 font-serif pb-6" style={{ fontSize: '1.5rem' }}>:</span>
            <CountUnit value={timeLeft.m} label={t.home.flashMin} />
            <span className="text-gold-500 font-serif pb-6" style={{ fontSize: '1.5rem' }}>:</span>
            <CountUnit value={timeLeft.s} label={t.home.flashSec} />
          </div>

          {/* CTA */}
          <Link
            href="/shop"
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
            {t.home.flashCta}
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

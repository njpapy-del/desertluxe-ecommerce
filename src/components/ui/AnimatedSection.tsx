'use client'

import { motion, Variants } from 'framer-motion'
import { ReactNode } from 'react'

// ── Preset variants ──────────────────────────────────────────────────────────
export const VARIANTS: Record<string, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 40 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    show:   { opacity: 1, transition: { duration: 0.7, ease: 'easeOut' } },
  },
  slideLeft: {
    hidden: { opacity: 0, x: -40 },
    show:   { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
  },
  slideRight: {
    hidden: { opacity: 0, x: 40 },
    show:   { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.92 },
    show:   { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] } },
  },
  stagger: {
    hidden: {},
    show:   { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
  },
  staggerFast: {
    hidden: {},
    show:   { transition: { staggerChildren: 0.06, delayChildren: 0 } },
  },
}

interface AnimatedSectionProps {
  children: ReactNode
  variant?: keyof typeof VARIANTS
  className?: string
  delay?: number
  once?: boolean
  amount?: number
}

export default function AnimatedSection({
  children,
  variant   = 'fadeUp',
  className = '',
  delay     = 0,
  once      = true,
  amount    = 0.15,
}: AnimatedSectionProps) {
  const v = VARIANTS[variant]

  return (
    <motion.div
      variants={v}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      transition={delay ? { delay } : undefined}
      className={className}
    >
      {children}
    </motion.div>
  )
}

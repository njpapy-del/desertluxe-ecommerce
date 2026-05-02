'use client'

import { useScroll, useSpring, motion } from 'framer-motion'

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping:   30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      style={{ scaleX, transformOrigin: '0%' }}
      className="fixed top-0 left-0 right-0 h-[2px] z-[100]
                 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-300
                 will-change-transform"
    />
  )
}

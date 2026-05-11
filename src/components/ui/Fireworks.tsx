'use client'

import { useEffect, useRef } from 'react'

// ─── Luxury gold palette ───────────────────────────────────────────────────
const COLORS = [
  '#C9A96E', // gold-500
  '#E8D5B0', // gold-light / cream
  '#d9a84e', // gold-400
  '#f5e6c0', // warm cream
  '#FFFFFF',  // white sparkles
  '#ffe4a0', // champagne
]

// ─── Particle ─────────────────────────────────────────────────────────────
class Particle {
  x: number; y: number
  vx: number; vy: number
  alpha: number; size: number; color: string
  decay: number
  gravity: number

  constructor(x: number, y: number, color: string, speed?: number) {
    const s = speed ?? (1.2 + Math.random() * 3.5)
    const angle = Math.random() * Math.PI * 2
    this.x = x; this.y = y
    this.vx = Math.cos(angle) * s
    this.vy = Math.sin(angle) * s
    this.alpha = 0.9 + Math.random() * 0.1
    this.size = 1.2 + Math.random() * 2
    this.color = color
    this.decay = 0.013 + Math.random() * 0.012
    this.gravity = 0.04 + Math.random() * 0.02
  }

  update() {
    this.x += this.vx
    this.y += this.vy
    this.vy += this.gravity
    this.vx *= 0.985
    this.alpha -= this.decay
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.alpha <= 0) return
    ctx.save()
    ctx.globalAlpha = this.alpha
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fillStyle = this.color
    ctx.fill()
    ctx.restore()
  }
}

// ─── Rocket ───────────────────────────────────────────────────────────────
class Rocket {
  x: number; y: number
  vx: number; vy: number
  color: string
  exploded = false
  particles: Particle[] = []
  trail: { x: number; y: number; a: number }[] = []
  private targetY: number

  constructor(w: number, h: number) {
    // Launch from bottom, random x in middle 60% of canvas
    this.x = w * (0.2 + Math.random() * 0.6)
    this.y = h
    this.targetY = h * (0.08 + Math.random() * 0.38)
    this.color = COLORS[Math.floor(Math.random() * COLORS.length)]

    // Small random horizontal drift, strong upward velocity
    const speed = 9 + Math.random() * 5
    this.vx = (Math.random() - 0.5) * 1.5
    this.vy = -speed
  }

  private explode() {
    this.exploded = true
    // Main burst — ~90 particles
    const count = 70 + Math.floor(Math.random() * 40)
    for (let i = 0; i < count; i++) {
      this.particles.push(new Particle(this.x, this.y, this.color))
    }
    // Inner white flash
    for (let i = 0; i < 16; i++) {
      this.particles.push(new Particle(this.x, this.y, '#FFFFFF', 0.6 + Math.random() * 1.5))
    }
    // Outer slow sparkles (champagne drip)
    for (let i = 0; i < 14; i++) {
      this.particles.push(new Particle(this.x, this.y, '#ffe4a0', 0.5 + Math.random()))
    }
  }

  update() {
    if (!this.exploded) {
      this.trail.push({ x: this.x, y: this.y, a: 0.55 })
      if (this.trail.length > 14) this.trail.shift()
      this.trail.forEach((t) => { t.a *= 0.82 })

      this.x += this.vx
      this.y += this.vy
      this.vy += 0.18 // gravity slows ascent

      // Explode at apex (velocity reverses or reached target)
      if (this.vy >= 0 || this.y <= this.targetY) {
        this.explode()
      }
    } else {
      this.particles.forEach((p) => p.update())
      this.particles = this.particles.filter((p) => p.alpha > 0)
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (!this.exploded) {
      // Trail dots
      this.trail.forEach((t) => {
        ctx.save()
        ctx.globalAlpha = t.a * 0.45
        ctx.beginPath()
        ctx.arc(t.x, t.y, 1.5, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
        ctx.restore()
      })
      // Rocket head — bright white dot
      ctx.save()
      ctx.globalAlpha = 0.92
      ctx.beginPath()
      ctx.arc(this.x, this.y, 2.5, 0, Math.PI * 2)
      ctx.fillStyle = '#FFFFFF'
      ctx.shadowBlur = 6
      ctx.shadowColor = this.color
      ctx.fill()
      ctx.restore()
    } else {
      this.particles.forEach((p) => p.draw(ctx))
    }
  }

  isDead() {
    return this.exploded && this.particles.length === 0
  }
}

// ─── Props ────────────────────────────────────────────────────────────────
interface FireworksProps {
  /** z-index of the canvas overlay (default 15) */
  zIndex?: number
  /** Interval between launches in ms (default 3200) */
  intervalMs?: number
  /** Max concurrent rockets (default 3) */
  maxRockets?: number
  /** Overall opacity of the canvas (default 0.85) */
  opacity?: number
}

// ─── Component ────────────────────────────────────────────────────────────
export default function Fireworks({
  zIndex      = 15,
  intervalMs  = 3200,
  maxRockets  = 3,
  opacity     = 0.85,
}: FireworksProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rockets   = useRef<Rocket[]>([])
  const rafId     = useRef<number>(0)
  const intId     = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Size canvas to parent
    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      canvas.width  = parent.offsetWidth
      canvas.height = parent.offsetHeight
    }
    resize()
    const ro = new ResizeObserver(resize)
    if (canvas.parentElement) ro.observe(canvas.parentElement)

    // Animation loop
    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      rockets.current.forEach((r) => { r.update(); r.draw(ctx) })
      rockets.current = rockets.current.filter((r) => !r.isDead())
      rafId.current = requestAnimationFrame(loop)
    }
    rafId.current = requestAnimationFrame(loop)

    // Launch rocket every intervalMs
    const launch = () => {
      if (rockets.current.length < maxRockets) {
        rockets.current.push(new Rocket(canvas.width, canvas.height))
      }
    }
    // Two quick launches on mount to start lively
    setTimeout(launch, 400)
    setTimeout(launch, 1400)
    intId.current = setInterval(launch, intervalMs)

    return () => {
      cancelAnimationFrame(rafId.current)
      if (intId.current) clearInterval(intId.current)
      ro.disconnect()
    }
  }, [intervalMs, maxRockets])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position:       'absolute',
        inset:          0,
        width:          '100%',
        height:         '100%',
        pointerEvents:  'none',
        zIndex,
        opacity,
      }}
    />
  )
}

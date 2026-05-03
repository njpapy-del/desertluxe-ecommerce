'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Check } from 'lucide-react'
import toast from 'react-hot-toast'

export default function Newsletter() {
  const [email, setEmail]       = useState('')
  const [loading, setLoading]   = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.includes('@')) return
    setLoading(true)
    try {
      await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      setSubmitted(true)
      toast.success('Bienvenue dans la famille AFEFLUXE!')
    } catch {
      toast.error('Erreur, veuillez réessayer.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Gold gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-luxury-dark via-[#2a2318] to-luxury-dark" />
      <div className="absolute inset-0 opacity-10"
           style={{
             backgroundImage: 'repeating-linear-gradient(45deg, #C9A96E 0, #C9A96E 1px, transparent 0, transparent 50%)',
             backgroundSize: '20px 20px',
           }}
      />

      <div className="relative max-w-2xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center justify-center w-12 h-12 border border-gold-500/40
                          mb-8 mx-auto">
            <Mail className="w-5 h-5 text-gold-500" />
          </div>
          <p className="section-tag text-gold-500 mb-4">Newsletter</p>
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
            Accès Exclusif
          </h2>
          <p className="text-cream-400 font-sans text-sm leading-relaxed mb-10 max-w-md mx-auto">
            Recevez les nouvelles collections en avant-première, les offres privées
            et les inspirations luxe directement depuis Dubaï.
          </p>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.com"
                required
                className="flex-1 px-5 py-3.5 bg-white/10 border border-white/20 text-white
                           placeholder:text-cream-500 text-sm font-sans
                           focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none
                           transition-colors backdrop-blur-sm"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-7 py-3.5 bg-gold-500 text-white text-xs tracking-widest uppercase
                           font-sans font-medium hover:bg-gold-600 transition-colors
                           disabled:opacity-60 whitespace-nowrap"
              >
                {loading ? 'Envoi...' : "S'inscrire"}
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center justify-center gap-3 text-cream-300 font-sans"
            >
              <div className="w-8 h-8 bg-gold-500 rounded-full flex items-center justify-center">
                <Check className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm">Merci ! Vous êtes dans la liste exclusive.</span>
            </motion.div>
          )}

          <p className="mt-5 text-[11px] text-cream-500 font-sans tracking-wide">
            En vous inscrivant, vous acceptez notre politique de confidentialité.
            Désabonnement en un clic.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

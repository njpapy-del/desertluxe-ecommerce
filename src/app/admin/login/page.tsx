'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Lock } from 'lucide-react'

export default function AdminLogin() {
  const router   = useRouter()
  const [pw, setPw]         = useState('')
  const [show, setShow]     = useState(false)
  const [error, setError]   = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/admin/login', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ password: pw }),
    })

    if (res.ok) {
      router.push('/admin')
    } else {
      setError('Mot de passe incorrect')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-luxury-dark flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <span className="font-serif text-3xl tracking-wider text-white">
            MY<span className="text-gold-500">LUXURY</span>
          </span>
          <p className="text-cream-500 text-xs tracking-[0.25em] uppercase font-sans mt-2">
            Admin
          </p>
        </div>

        <div className="bg-white p-8 shadow-xl">
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 bg-gold-500/10 flex items-center justify-center">
              <Lock className="w-6 h-6 text-gold-500" />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-sans font-medium text-luxury-dark tracking-wider uppercase mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <input
                  type={show ? 'text' : 'password'}
                  value={pw}
                  onChange={e => setPw(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full border border-cream-400 px-4 py-3 text-sm font-sans
                             focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none
                             pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-luxury-gray hover:text-luxury-dark transition-colors"
                >
                  {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-xs font-sans text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading || !pw}
              className="w-full bg-gold-500 text-white py-3 text-xs font-sans font-medium
                         tracking-[0.25em] uppercase hover:bg-gold-600 transition-colors
                         disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

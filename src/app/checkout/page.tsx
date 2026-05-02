'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Lock, CreditCard, MessageCircle, ChevronRight, Check } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

type Step = 'info' | 'payment' | 'success'

interface FormData {
  firstName: string; lastName: string; email: string; phone: string
  address: string; city: string; postalCode: string; country: string
}

const COUNTRIES = ['France', 'Tunisie', 'Émirats Arabes Unis', 'Maroc', 'Algérie', 'Belgique', 'Suisse', 'Canada', 'Autre']

export default function CheckoutPage() {
  const { items, total, clearCart } = useCartStore()
  const router = useRouter()

  const [step, setStep]       = useState<Step>('info')
  const [loading, setLoading] = useState(false)
  const [form, setForm]       = useState<FormData>({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', postalCode: '', country: 'France',
  })

  const subtotal  = total()
  const shipping  = subtotal >= 200 ? 0 : 15
  const orderTotal = subtotal + shipping

  const handleField = (k: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [k]: e.target.value }))
  }

  const handleCheckout = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/checkout', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((i) => ({
            productId: i.productId,
            quantity:  i.quantity,
            price:     i.price,
            name:      i.name,
            image:     i.image,
          })),
          shippingAddress: form,
          total: orderTotal,
        }),
      })
      const data = await res.json()
      if (data.url) {
        // Redirect to Stripe
        window.location.href = data.url
      } else {
        setStep('success')
        clearCart()
      }
    } catch {
      toast.error('Erreur lors du paiement. Réessayez.')
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0 && step !== 'success') {
    return (
      <div className="min-h-screen bg-cream-100 flex items-center justify-center">
        <div className="text-center">
          <p className="font-serif text-2xl text-luxury-dark mb-4">Votre panier est vide</p>
          <a href="/shop" className="btn-luxury text-xs py-3 px-8">Continuer vos achats</a>
        </div>
      </div>
    )
  }

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-cream-100 flex items-center justify-center px-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-12 max-w-md w-full text-center shadow-card"
        >
          <div className="w-16 h-16 bg-gold-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-white" />
          </div>
          <h2 className="font-serif text-2xl text-luxury-dark mb-3">Commande confirmée !</h2>
          <p className="text-luxury-gray font-sans text-sm leading-relaxed mb-8">
            Merci {form.firstName} ! Votre commande a été reçue. Vous recevrez une confirmation par email.
          </p>
          <a href="/shop" className="btn-luxury text-xs py-3 px-8">Continuer vos achats</a>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream-100 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="font-serif text-3xl text-luxury-dark mb-1">Finaliser ma commande</h1>
          <div className="flex items-center justify-center gap-2 mt-4">
            <Lock className="w-3.5 h-3.5 text-gold-500" />
            <span className="text-xs text-luxury-gray font-sans tracking-wide">Paiement 100% sécurisé</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr,380px] gap-8">
          {/* ── Form ─────────────────────────────────── */}
          <div className="bg-white p-8 shadow-card">
            <h2 className="font-serif text-xl text-luxury-dark mb-6">Informations de livraison</h2>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { key: 'firstName', label: 'Prénom', type: 'text', placeholder: 'Fatima' },
                { key: 'lastName',  label: 'Nom',    type: 'text', placeholder: 'Mansour' },
              ].map(({ key, label, type, placeholder }) => (
                <div key={key}>
                  <label className="block text-xs font-sans font-medium tracking-widest uppercase
                                    text-luxury-dark mb-2">{label}</label>
                  <input
                    type={type}
                    value={form[key as keyof FormData]}
                    onChange={handleField(key as keyof FormData)}
                    placeholder={placeholder}
                    required
                    className="form-input"
                  />
                </div>
              ))}

              <div>
                <label className="block text-xs font-sans font-medium tracking-widest uppercase text-luxury-dark mb-2">Email</label>
                <input type="email" value={form.email} onChange={handleField('email')} placeholder="email@exemple.com" required className="form-input" />
              </div>
              <div>
                <label className="block text-xs font-sans font-medium tracking-widest uppercase text-luxury-dark mb-2">Téléphone</label>
                <input type="tel" value={form.phone} onChange={handleField('phone')} placeholder="+33 6 00 00 00 00" className="form-input" />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-sans font-medium tracking-widest uppercase text-luxury-dark mb-2">Adresse</label>
                <input type="text" value={form.address} onChange={handleField('address')} placeholder="123 rue de la Paix" required className="form-input" />
              </div>

              <div>
                <label className="block text-xs font-sans font-medium tracking-widest uppercase text-luxury-dark mb-2">Ville</label>
                <input type="text" value={form.city} onChange={handleField('city')} placeholder="Paris" required className="form-input" />
              </div>
              <div>
                <label className="block text-xs font-sans font-medium tracking-widest uppercase text-luxury-dark mb-2">Code postal</label>
                <input type="text" value={form.postalCode} onChange={handleField('postalCode')} placeholder="75001" className="form-input" />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-sans font-medium tracking-widest uppercase text-luxury-dark mb-2">Pays</label>
                <select value={form.country} onChange={handleField('country')} className="form-input">
                  {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            {/* Payment methods */}
            <div className="mt-8 pt-8 border-t border-cream-300">
              <h2 className="font-serif text-xl text-luxury-dark mb-6">Mode de paiement</h2>
              <div className="space-y-3">
                <div className="border-2 border-gold-500 p-4 flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-gold-500" />
                  <div>
                    <p className="font-sans text-sm font-medium text-luxury-dark">Carte bancaire</p>
                    <p className="text-xs text-luxury-gray font-sans">Visa, Mastercard, Amex — via Stripe</p>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={loading || !form.firstName || !form.email || !form.address}
              className="mt-8 w-full flex items-center justify-center gap-2
                         bg-luxury-dark text-white py-4 text-xs tracking-widest uppercase
                         font-sans font-medium hover:bg-gold-500 transition-colors
                         disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Lock className="w-4 h-4" />
              {loading ? 'Redirection...' : `Payer ${orderTotal.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}`}
            </button>
          </div>

          {/* ── Order summary ─────────────────────────── */}
          <div className="space-y-6">
            <div className="bg-white p-6 shadow-card">
              <h3 className="font-serif text-lg text-luxury-dark mb-5">Votre commande</h3>
              <ul className="space-y-4 mb-5">
                {items.map((item) => (
                  <li key={item.id} className="flex gap-3">
                    <div className="relative w-16 h-16 bg-cream-200 shrink-0 overflow-hidden">
                      <Image src={item.image} alt={item.name} fill className="object-cover" sizes="64px" />
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-luxury-dark text-white text-[9px]
                                       rounded-full flex items-center justify-center font-sans font-bold">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-serif text-sm text-luxury-dark line-clamp-2">{item.name}</p>
                      <p className="text-xs text-gold-500 font-sans font-semibold mt-1">
                        {(item.price * item.quantity).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="border-t border-cream-300 pt-4 space-y-2">
                <div className="flex justify-between text-sm font-sans">
                  <span className="text-luxury-gray">Sous-total</span>
                  <span>{subtotal.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</span>
                </div>
                <div className="flex justify-between text-sm font-sans">
                  <span className="text-luxury-gray">Livraison</span>
                  <span className={shipping === 0 ? 'text-green-600' : ''}>
                    {shipping === 0 ? 'Gratuite' : shipping.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                  </span>
                </div>
                <div className="flex justify-between font-sans font-semibold text-base pt-2 border-t border-cream-300">
                  <span>Total</span>
                  <span>{orderTotal.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</span>
                </div>
              </div>
            </div>

            {/* WhatsApp alternative */}
            <a
              href={`https://wa.me/${(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '').replace(/\D/g, '')}?text=${encodeURIComponent(`Bonjour, je souhaite finaliser une commande de ${orderTotal}€.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-[#25D366] text-white py-4
                         text-xs tracking-widest uppercase font-sans font-medium hover:bg-[#1EBE5D] transition-colors shadow-card"
            >
              <MessageCircle className="w-4 h-4" />
              Payer via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

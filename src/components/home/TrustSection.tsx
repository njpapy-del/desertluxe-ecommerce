'use client'

import { useLocaleStore } from '@/store/localeStore'

export default function TrustSection() {
  const { t } = useLocaleStore()
  const h = t.home

  const items = [
    { emoji: '✈️', title: h.trustShippingTitle, sub: h.trustShippingSub },
    { emoji: '🔒', title: h.trustPaymentTitle,  sub: h.trustPaymentSub  },
    { emoji: '📦', title: h.trustPackageTitle,  sub: h.trustPackageSub  },
    { emoji: '💬', title: h.trustSupportTitle,  sub: h.trustSupportSub  },
  ]

  return (
    <section className="py-16 bg-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {items.map((item) => (
            <div key={item.title} className="flex flex-col items-center gap-2">
              <span className="text-3xl">{item.emoji}</span>
              <h4 className="font-serif text-sm text-luxury-dark">{item.title}</h4>
              <p className="text-[11px] text-luxury-gray font-sans tracking-wide">{item.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

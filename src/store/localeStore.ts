import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { locales } from '@/locales'
import type { Locale, Currency, Translations } from '@/locales'

interface LocaleState {
  locale:   Locale
  currency: Currency
  t:        Translations
  setLocale:   (locale: Locale)    => void
  setCurrency: (currency: Currency) => void
}

export const useLocaleStore = create<LocaleState>()(
  persist(
    (set) => ({
      locale:   'en',
      currency: 'AED',
      t:        locales['en'],

      setLocale: (locale) =>
        set({ locale, t: locales[locale] }),

      setCurrency: (currency) =>
        set({ currency }),
    }),
    {
      name:    'my-luxury-locale',
      storage: createJSONStorage(() => localStorage),
      // Only persist locale + currency choice, not the full translations object
      partialize: (state) => ({ locale: state.locale, currency: state.currency }),
      onRehydrateStorage: () => (state) => {
        if (state) state.t = locales[state.locale]
      },
      skipHydration: true,
    }
  )
)

import type { Currency } from '@/locales'

// Exchange rates from EUR (base price unit in mockData)
export const EUR_TO_TND = 3.35
export const EUR_TO_AED = 3.67

export const tnd = (eur: number) => Math.round(eur * EUR_TO_TND)
export const aed = (eur: number) => Math.round(eur * EUR_TO_AED)

export const fmtEur = (price: number) =>
  price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })

export const fmtTnd = (price: number) =>
  `${tnd(price).toLocaleString('fr-FR')} DT`

export const fmtAed = (price: number) =>
  `${aed(price).toLocaleString('en-AE')} AED`

/** Format a EUR base price in the user's chosen currency */
export function fmtPrice(eur: number, currency: Currency): string {
  return currency === 'AED' ? fmtAed(eur) : fmtTnd(eur)
}

/** Format both main + crossed-out compare price */
export function fmtPricePair(
  eur: number,
  compareEur: number | null | undefined,
  currency: Currency,
): { main: string; compare: string | null } {
  return {
    main:    fmtPrice(eur, currency),
    compare: compareEur ? fmtPrice(compareEur, currency) : null,
  }
}

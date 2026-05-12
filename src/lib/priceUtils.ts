// Taux de change : 1 EUR = 3.35 TND (maj. 2026)
export const EUR_TO_TND = 3.35

export const tnd  = (eur: number) => Math.round(eur * EUR_TO_TND)

export const fmtEur = (price: number) =>
  price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })

export const fmtTnd = (price: number) => `${tnd(price)} DT`

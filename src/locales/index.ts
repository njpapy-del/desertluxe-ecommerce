import en from './en'
import ar from './ar'
import type { Locale, Translations } from './types'

export const locales: Record<Locale, Translations> = { en, ar }
export type { Locale, Currency, Translations } from './types'

import type { Locale } from '@/locales'
import { productTranslationsEn, categoryTranslationsEn } from './en'
import { productTranslationsAr, categoryTranslationsAr } from './ar'

export interface ProductTranslation {
  name: string
  description: string
}

export interface CategoryTranslation {
  name: string
  description: string
}

const productTranslations: Record<Locale, Record<string, ProductTranslation>> = {
  en: productTranslationsEn,
  ar: productTranslationsAr,
}

const categoryTranslations: Record<Locale, Record<string, CategoryTranslation>> = {
  en: categoryTranslationsEn,
  ar: categoryTranslationsAr,
}

export function localizeProduct<T extends { slug: string; name: string; description: string }>(
  product: T,
  locale: Locale
): T {
  const t = productTranslations[locale]?.[product.slug]
  if (!t) return product
  return { ...product, name: t.name, description: t.description }
}

export function localizeCategory<T extends { slug: string; name: string; description?: string }>(
  category: T,
  locale: Locale
): T {
  const t = categoryTranslations[locale]?.[category.slug]
  if (!t) return category
  return { ...category, name: t.name, description: t.description ?? category.description }
}

'use client'

import { useEffect } from 'react'
import { useLocaleStore } from '@/store/localeStore'

/**
 * Applies RTL direction and lang attribute to <html> whenever locale changes.
 * Must be rendered inside the <body> in layout.tsx.
 */
export default function LocaleProvider() {
  const { locale } = useLocaleStore()

  useEffect(() => {
    useLocaleStore.persist.rehydrate()
  }, [])

  useEffect(() => {
    const html = document.documentElement
    html.lang = locale
    html.dir  = locale === 'ar' ? 'rtl' : 'ltr'
    if (locale === 'ar') {
      html.classList.add('font-arabic')
    } else {
      html.classList.remove('font-arabic')
    }
  }, [locale])

  return null
}

'use client'

import { useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { SlidersHorizontal, Grid2x2, Grid3x3, X } from 'lucide-react'
import ProductCard from '@/components/shop/ProductCard'
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from '@/lib/mockData'
// fallbacks used when no DB data is passed via props
import { useLocaleStore } from '@/store/localeStore'
import { localizeCategory } from '@/locales/products'
import type { Product, Category } from '@/types'

interface Props {
  initialProducts?:   Product[]
  initialCategories?: Category[]
}

export default function ShopContent({ initialProducts, initialCategories }: Props) {
  const params   = useSearchParams()
  const catSlug  = params.get('category') || ''
  const search   = params.get('search')   || ''
  const { t, locale } = useLocaleStore()

  const allProducts   = initialProducts   ?? (MOCK_PRODUCTS   as unknown as Product[])
  const allCategories = initialCategories ?? (MOCK_CATEGORIES as unknown as Category[])

  const localizedCategories = allCategories.map((c) => localizeCategory(c, locale))
  const s        = t.shop

  const SORT_OPTIONS = [
    { value: 'newest',     label: s.sortNewest   },
    { value: 'price_asc',  label: s.sortPriceAsc  },
    { value: 'price_desc', label: s.sortPriceDesc },
    { value: 'popular',    label: s.sortPopular   },
  ]

  const [sort, setSort]           = useState('newest')
  const [minP, setMinP]           = useState('')
  const [maxP, setMaxP]           = useState('')
  const [gridCols, setGridCols]   = useState<2 | 4>(4)
  const [filterOpen, setFilterOpen] = useState(false)
  const [activeCat, setActiveCat] = useState(catSlug)

  const filtered = useMemo(() => {
    let p = [...allProducts]

    if (activeCat) p = p.filter((x) => x.category.slug === activeCat)
    if (search)    p = p.filter((x) =>
      x.name.toLowerCase().includes(search.toLowerCase()) ||
      x.description.toLowerCase().includes(search.toLowerCase())
    )
    if (minP) p = p.filter((x) => x.price >= +minP)
    if (maxP) p = p.filter((x) => x.price <= +maxP)

    switch (sort) {
      case 'price_asc':  p.sort((a, b) => a.price - b.price);            break
      case 'price_desc': p.sort((a, b) => b.price - a.price);            break
      case 'popular':    p.sort((a, b) => b.reviewCount - a.reviewCount); break
      default:           p.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    }

    return p
  }, [allProducts, activeCat, search, sort, minP, maxP])

  const selectedCategory = localizedCategories.find((c) => c.slug === activeCat)

  return (
    <div className="min-h-screen bg-cream-100">
      {/* ── Page header ──────────────────────────────── */}
      <div className="bg-luxury-dark py-16 text-center">
        <p className="text-gold-400 text-xs tracking-[0.3em] uppercase font-sans mb-3">
          MY LUXURY
        </p>
        <h1 className="font-serif text-4xl text-white mb-2">
          {selectedCategory?.name || s.pageTitle}
        </h1>
        <div className="w-12 h-px bg-gold-500 mx-auto mt-4" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex gap-8">

          {/* ── Sidebar filters (desktop) ─────────────── */}
          <aside className="hidden lg:block w-56 shrink-0">
            <div className="sticky top-24 space-y-8">
              {/* Categories */}
              <div>
                <h3 className="text-xs tracking-[0.25em] uppercase font-sans font-medium
                               text-luxury-dark mb-4">
                  {s.categories}
                </h3>
                <ul className="space-y-2">
                  <li>
                    <button
                      onClick={() => setActiveCat('')}
                      className={`text-sm font-sans w-full text-left py-1.5 transition-colors ${
                        !activeCat ? 'text-gold-500 font-medium' : 'text-luxury-gray hover:text-gold-500'
                      }`}
                    >
                      {s.viewAll} ({allProducts.length})
                    </button>
                  </li>
                  {localizedCategories.map((cat) => (
                    <li key={cat.slug}>
                      <button
                        onClick={() => setActiveCat(cat.slug)}
                        className={`text-sm font-sans w-full text-left py-1.5 transition-colors ${
                          activeCat === cat.slug
                            ? 'text-gold-500 font-medium'
                            : 'text-luxury-gray hover:text-gold-500'
                        }`}
                      >
                        {cat.name} ({allProducts.filter((p) => p.category.slug === cat.slug).length})
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price */}
              <div>
                <h3 className="text-xs tracking-[0.25em] uppercase font-sans font-medium
                               text-luxury-dark mb-4">
                  {s.price} (€)
                </h3>
                <div className="flex gap-2 items-center">
                  <input
                    type="number"
                    placeholder="Min"
                    value={minP}
                    onChange={(e) => setMinP(e.target.value)}
                    className="w-full border border-cream-400 px-2 py-1.5 text-xs font-sans
                               focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none bg-white"
                  />
                  <span className="text-luxury-gray text-xs">–</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={maxP}
                    onChange={(e) => setMaxP(e.target.value)}
                    className="w-full border border-cream-400 px-2 py-1.5 text-xs font-sans
                               focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none bg-white"
                  />
                </div>
              </div>
            </div>
          </aside>

          {/* ── Main ─────────────────────────────────── */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-cream-300">
              <p className="text-sm text-luxury-gray font-sans">
                <span className="font-medium text-luxury-dark">{filtered.length}</span> {s.products}
                {search && (
                  <span> {s.searchFor} «<em>{search}</em>»</span>
                )}
              </p>
              <div className="flex items-center gap-4">
                {/* Sort */}
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="text-xs border border-cream-400 px-3 py-2 font-sans bg-white
                             focus:border-gold-500 outline-none"
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
                {/* Grid toggle */}
                <div className="hidden md:flex gap-1">
                  <button onClick={() => setGridCols(4)} className={`p-1.5 ${gridCols === 4 ? 'text-gold-500' : 'text-luxury-gray'}`}>
                    <Grid3x3 className="w-4 h-4" />
                  </button>
                  <button onClick={() => setGridCols(2)} className={`p-1.5 ${gridCols === 2 ? 'text-gold-500' : 'text-luxury-gray'}`}>
                    <Grid2x2 className="w-4 h-4" />
                  </button>
                </div>
                {/* Mobile filter */}
                <button
                  onClick={() => setFilterOpen(true)}
                  className="lg:hidden flex items-center gap-1.5 text-xs font-sans border
                             border-cream-400 px-3 py-2"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  {s.filters}
                </button>
              </div>
            </div>

            {/* Active filter chips */}
            {(activeCat || minP || maxP) && (
              <div className="flex flex-wrap gap-2 mb-6">
                {activeCat && (
                  <button
                    onClick={() => setActiveCat('')}
                    className="flex items-center gap-1.5 text-[11px] font-sans bg-gold-100
                               text-gold-700 px-2.5 py-1 hover:bg-gold-200 transition-colors"
                  >
                    {selectedCategory?.name}
                    <X className="w-3 h-3" />
                  </button>
                )}
                {(minP || maxP) && (
                  <button
                    onClick={() => { setMinP(''); setMaxP('') }}
                    className="flex items-center gap-1.5 text-[11px] font-sans bg-gold-100
                               text-gold-700 px-2.5 py-1 hover:bg-gold-200 transition-colors"
                  >
                    {minP && `Min: ${minP}€`} {maxP && `Max: ${maxP}€`}
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            )}

            {/* Product grid */}
            {filtered.length > 0 ? (
              <div
                className={`grid gap-4 md:gap-6 ${
                  gridCols === 4
                    ? 'grid-cols-2 lg:grid-cols-4'
                    : 'grid-cols-1 sm:grid-cols-2'
                }`}
              >
                {filtered.map((product, idx) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <ProductCard product={product as any} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="font-serif text-xl text-luxury-dark mb-2">{s.noProducts}</p>
                <p className="text-sm text-luxury-gray font-sans">
                  {s.noProductsHint}{' '}
                  <button onClick={() => { setActiveCat(''); setMinP(''); setMaxP('') }} className="text-gold-500 underline">
                    {s.reset}
                  </button>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

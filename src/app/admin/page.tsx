'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import {
  Package, ShoppingCart, TrendingUp, Users, AlertTriangle,
  Eye, Edit, Trash2, Plus, Search, X, Upload,
  Check, ChevronDown, LogOut, Layers, RefreshCw, ImageIcon,
} from 'lucide-react'

// ── Types ─────────────────────────────────────────────────────────────────────
interface DbCategory {
  id: string; name: string; nameAr?: string; slug: string
  description?: string; descriptionAr?: string; image?: string
  position: number; _count?: { products: number }
}

interface DbProduct {
  id: string; name: string; nameAr?: string; slug: string
  description: string; descriptionAr?: string; price: number
  comparePrice?: number; images: string[]; categoryId: string
  category: DbCategory; stock: number; featured: boolean
  active: boolean; badge?: string; badgeAr?: string
  createdAt: string
}

function slugify(s: string) {
  return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

// ── Image upload widget ───────────────────────────────────────────────────────
function ImageUploader({ value, onChange, label = 'Image' }: {
  value: string; onChange: (url: string) => void; label?: string
}) {
  const inputRef  = useRef<HTMLInputElement>(null)
  const [tab, setTab]     = useState<'upload' | 'url'>('upload')
  const [urlInput, setUrlInput] = useState(value.startsWith('http') ? value : '')
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true); setUploadError('')
    const fd = new FormData(); fd.append('file', file)
    const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
    if (res.ok) { const { url } = await res.json(); onChange(url) }
    else {
      const { error } = await res.json()
      setUploadError(error || 'Upload échoué')
    }
    setUploading(false)
  }

  return (
    <div>
      <p className="text-xs font-sans font-medium text-luxury-dark tracking-wider uppercase mb-2">{label}</p>
      {value && (
        <div className="relative w-24 h-24 mb-3 border border-cream-300 overflow-hidden">
          <Image src={value} alt="preview" fill className="object-cover" sizes="96px" />
          <button onClick={() => onChange('')}
            className="absolute top-1 right-1 bg-black/60 text-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-600 transition-colors">
            <X className="w-3 h-3" />
          </button>
        </div>
      )}
      <div className="flex gap-2 mb-3">
        {(['upload', 'url'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`text-xs px-3 py-1 font-sans transition-colors ${tab === t ? 'bg-gold-500 text-white' : 'bg-cream-200 text-luxury-dark hover:bg-cream-300'}`}>
            {t === 'upload' ? 'Fichier' : 'URL'}
          </button>
        ))}
      </div>
      {tab === 'upload' ? (
        <div>
          <button onClick={() => inputRef.current?.click()}
            className="flex items-center gap-2 border-2 border-dashed border-cream-400 px-4 py-3 text-xs font-sans text-luxury-gray hover:border-gold-500 hover:text-gold-500 transition-colors w-full justify-center">
            {uploading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
            {uploading ? 'Upload en cours...' : 'Choisir un fichier'}
          </button>
          <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
          {uploadError && <p className="text-red-500 text-xs mt-1">{uploadError}</p>}
        </div>
      ) : (
        <div className="flex gap-2">
          <input type="url" value={urlInput} onChange={e => setUrlInput(e.target.value)}
            placeholder="https://..." className="flex-1 border border-cream-400 px-3 py-2 text-xs font-sans focus:border-gold-500 outline-none" />
          <button onClick={() => onChange(urlInput)}
            className="bg-gold-500 text-white px-3 py-2 text-xs hover:bg-gold-600 transition-colors">
            <Check className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  )
}

// ── Multi-image uploader ──────────────────────────────────────────────────────
function MultiImageUploader({ values, onChange }: { values: string[]; onChange: (urls: string[]) => void }) {
  const [urlInput, setUrlInput] = useState('')
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true); setUploadError('')
    const fd = new FormData(); fd.append('file', file)
    const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
    if (res.ok) { const { url } = await res.json(); onChange([...values, url]) }
    else { const { error } = await res.json().catch(() => ({})); setUploadError(error || 'Upload échoué') }
    setUploading(false)
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div>
      <p className="text-xs font-sans font-medium text-luxury-dark tracking-wider uppercase mb-2">Photos</p>
      <div className="flex flex-wrap gap-2 mb-3">
        {values.map((img, i) => (
          <div key={i} className="relative w-20 h-20 border border-cream-300 overflow-hidden">
            <Image src={img} alt="" fill className="object-cover" sizes="80px" />
            <button onClick={() => onChange(values.filter((_, j) => j !== i))}
              className="absolute top-0.5 right-0.5 bg-black/60 text-white rounded-full w-4 h-4 flex items-center justify-center hover:bg-red-600 transition-colors">
              <X className="w-2.5 h-2.5" />
            </button>
          </div>
        ))}
      </div>
      <div className="flex gap-2 mb-2">
        <button onClick={() => inputRef.current?.click()}
          className="flex items-center gap-1 border border-cream-400 px-3 py-1.5 text-xs font-sans text-luxury-gray hover:border-gold-500 hover:text-gold-500 transition-colors">
          {uploading ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Upload className="w-3 h-3" />}
          Fichier
        </button>
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
        <input type="url" value={urlInput} onChange={e => setUrlInput(e.target.value)}
          placeholder="URL image..." className="flex-1 border border-cream-400 px-2 py-1.5 text-xs font-sans focus:border-gold-500 outline-none" />
        <button onClick={() => { if (urlInput) { onChange([...values, urlInput]); setUrlInput('') } }}
          className="bg-gold-500 text-white px-2 py-1.5 text-xs hover:bg-gold-600 transition-colors">
          <Plus className="w-3 h-3" />
        </button>
      </div>
      {uploadError && <p className="text-red-500 text-xs mt-1">{uploadError}</p>}
    </div>
  )
}

// ── Modal shell ───────────────────────────────────────────────────────────────
function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <AnimatePresence>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl">
          <div className="flex items-center justify-between px-6 py-4 border-b border-cream-300 sticky top-0 bg-white z-10">
            <h3 className="font-serif text-lg text-luxury-dark">{title}</h3>
            <button onClick={onClose} className="text-luxury-gray hover:text-luxury-dark transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-6 space-y-5">{children}</div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-sans font-medium text-luxury-dark tracking-wider uppercase mb-2">{label}</label>
      {children}
    </div>
  )
}

const INPUT = 'w-full border border-cream-400 px-3 py-2 text-sm font-sans focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none'
const TEXTAREA = `${INPUT} resize-none`

// ── Category modal ────────────────────────────────────────────────────────────
function CategoryModal({ cat, onSave, onClose }: {
  cat: Partial<DbCategory> | null; onSave: () => void; onClose: () => void
}) {
  const isEdit = !!cat?.id
  const [form, setForm] = useState({
    name: cat?.name || '', nameAr: cat?.nameAr || '',
    slug: cat?.slug || '', description: cat?.description || '',
    descriptionAr: cat?.descriptionAr || '', image: cat?.image || '',
    position: cat?.position ?? 0,
  })
  const [saving, setSaving] = useState(false)
  const [error, setError]   = useState('')

  function set(k: string, v: unknown) {
    setForm(f => ({ ...f, [k]: v }))
    if (k === 'name' && !isEdit) setForm(f => ({ ...f, name: v as string, slug: slugify(v as string) }))
  }

  async function save() {
    setSaving(true); setError('')
    const url    = isEdit ? `/api/admin/categories/${cat!.id}` : '/api/admin/categories'
    const method = isEdit ? 'PUT' : 'POST'
    const res    = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    if (res.ok) { onSave() }
    else { const { error: e } = await res.json(); setError(e || 'Erreur') }
    setSaving(false)
  }

  return (
    <Modal title={isEdit ? 'Modifier la catégorie' : 'Nouvelle catégorie'} onClose={onClose}>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Nom (EN)">
          <input value={form.name} onChange={e => set('name', e.target.value)} className={INPUT} placeholder="Luxury Bags" />
        </Field>
        <Field label="Nom (AR)">
          <input value={form.nameAr} onChange={e => set('nameAr', e.target.value)} className={INPUT} placeholder="حقائب فاخرة" dir="rtl" />
        </Field>
      </div>
      <Field label="Slug (URL)">
        <input value={form.slug} onChange={e => set('slug', e.target.value)} className={INPUT} placeholder="luxury-bags" />
      </Field>
      <Field label="Description (EN)">
        <textarea value={form.description} onChange={e => set('description', e.target.value)} rows={3} className={TEXTAREA} />
      </Field>
      <Field label="Description (AR)">
        <textarea value={form.descriptionAr} onChange={e => set('descriptionAr', e.target.value)} rows={3} className={TEXTAREA} dir="rtl" />
      </Field>
      <ImageUploader value={form.image} onChange={v => set('image', v)} label="Image de la catégorie" />
      <Field label="Position">
        <input type="number" value={form.position} onChange={e => set('position', parseInt(e.target.value))} className={INPUT} />
      </Field>
      {error && <p className="text-red-500 text-xs">{error}</p>}
      <div className="flex gap-3 pt-2">
        <button onClick={save} disabled={saving || !form.name || !form.slug}
          className="flex-1 bg-gold-500 text-white py-2.5 text-xs font-sans font-medium tracking-widest uppercase hover:bg-gold-600 transition-colors disabled:opacity-50">
          {saving ? 'Enregistrement...' : isEdit ? 'Modifier' : 'Créer'}
        </button>
        <button onClick={onClose} className="px-6 border border-cream-400 text-xs font-sans text-luxury-dark hover:border-gold-500 transition-colors">
          Annuler
        </button>
      </div>
    </Modal>
  )
}

// ── Product modal ─────────────────────────────────────────────────────────────
function ProductModal({ product, categories, onSave, onClose }: {
  product: Partial<DbProduct> | null; categories: DbCategory[]
  onSave: () => void; onClose: () => void
}) {
  const isEdit = !!product?.id
  const [form, setForm] = useState({
    name: product?.name || '', nameAr: product?.nameAr || '',
    slug: product?.slug || '', description: product?.description || '',
    descriptionAr: product?.descriptionAr || '',
    price: product?.price?.toString() || '', comparePrice: product?.comparePrice?.toString() || '',
    categoryId: product?.categoryId || categories[0]?.id || '',
    stock: product?.stock?.toString() || '0',
    images: product?.images || [],
    featured: product?.featured ?? false,
    active: product?.active ?? true,
    badge: product?.badge || '', badgeAr: product?.badgeAr || '',
  })
  const [saving, setSaving] = useState(false)
  const [error, setError]   = useState('')

  function set(k: string, v: unknown) {
    setForm(f => ({ ...f, [k]: v }))
    if (k === 'name' && !isEdit) setForm(f => ({ ...f, name: v as string, slug: slugify(v as string) }))
  }

  async function save() {
    setSaving(true); setError('')
    const url    = isEdit ? `/api/admin/products/${product!.id}` : '/api/admin/products'
    const method = isEdit ? 'PUT' : 'POST'
    const res    = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    if (res.ok) { onSave() }
    else { const { error: e } = await res.json(); setError(e || 'Erreur') }
    setSaving(false)
  }

  return (
    <Modal title={isEdit ? 'Modifier le produit' : 'Nouveau produit'} onClose={onClose}>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Nom (EN)">
          <input value={form.name} onChange={e => set('name', e.target.value)} className={INPUT} placeholder="Luxury Bag" />
        </Field>
        <Field label="Nom (AR)">
          <input value={form.nameAr} onChange={e => set('nameAr', e.target.value)} className={INPUT} placeholder="حقيبة فاخرة" dir="rtl" />
        </Field>
      </div>
      <Field label="Slug">
        <input value={form.slug} onChange={e => set('slug', e.target.value)} className={INPUT} />
      </Field>
      <Field label="Description (EN)">
        <textarea value={form.description} onChange={e => set('description', e.target.value)} rows={3} className={TEXTAREA} />
      </Field>
      <Field label="Description (AR)">
        <textarea value={form.descriptionAr} onChange={e => set('descriptionAr', e.target.value)} rows={3} className={TEXTAREA} dir="rtl" />
      </Field>
      <div className="grid grid-cols-3 gap-4">
        <Field label="Prix (€)">
          <input type="number" step="0.01" value={form.price} onChange={e => set('price', e.target.value)} className={INPUT} placeholder="99" />
        </Field>
        <Field label="Prix barré (€)">
          <input type="number" step="0.01" value={form.comparePrice} onChange={e => set('comparePrice', e.target.value)} className={INPUT} placeholder="129" />
        </Field>
        <Field label="Stock">
          <input type="number" value={form.stock} onChange={e => set('stock', e.target.value)} className={INPUT} placeholder="10" />
        </Field>
      </div>
      <Field label="Catégorie">
        <div className="relative">
          <select value={form.categoryId} onChange={e => set('categoryId', e.target.value)}
            className={`${INPUT} appearance-none pr-8`}>
            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-luxury-gray pointer-events-none" />
        </div>
      </Field>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Badge (EN)">
          <input value={form.badge} onChange={e => set('badge', e.target.value)} className={INPUT} placeholder="Best Seller" />
        </Field>
        <Field label="Badge (AR)">
          <input value={form.badgeAr} onChange={e => set('badgeAr', e.target.value)} className={INPUT} placeholder="الأكثر مبيعاً" dir="rtl" />
        </Field>
      </div>
      <MultiImageUploader values={form.images} onChange={v => set('images', v)} />
      <div className="flex gap-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={form.featured} onChange={e => set('featured', e.target.checked)} className="accent-gold-500 w-4 h-4" />
          <span className="text-xs font-sans text-luxury-dark">Mis en avant</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={form.active} onChange={e => set('active', e.target.checked)} className="accent-gold-500 w-4 h-4" />
          <span className="text-xs font-sans text-luxury-dark">Actif (visible sur le site)</span>
        </label>
      </div>
      {error && <p className="text-red-500 text-xs">{error}</p>}
      <div className="flex gap-3 pt-2">
        <button onClick={save} disabled={saving || !form.name || !form.price || !form.categoryId}
          className="flex-1 bg-gold-500 text-white py-2.5 text-xs font-sans font-medium tracking-widest uppercase hover:bg-gold-600 transition-colors disabled:opacity-50">
          {saving ? 'Enregistrement...' : isEdit ? 'Modifier' : 'Créer'}
        </button>
        <button onClick={onClose} className="px-6 border border-cream-400 text-xs font-sans text-luxury-dark hover:border-gold-500 transition-colors">
          Annuler
        </button>
      </div>
    </Modal>
  )
}

// ── Confirm dialog ────────────────────────────────────────────────────────────
function ConfirmDialog({ message, onConfirm, onCancel }: { message: string; onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white p-6 shadow-xl max-w-sm w-full">
        <p className="text-sm font-sans text-luxury-dark mb-6">{message}</p>
        <div className="flex gap-3">
          <button onClick={onConfirm} className="flex-1 bg-red-500 text-white py-2 text-xs font-sans font-medium tracking-widest uppercase hover:bg-red-600 transition-colors">
            Supprimer
          </button>
          <button onClick={onCancel} className="flex-1 border border-cream-400 py-2 text-xs font-sans text-luxury-dark hover:border-gold-500 transition-colors">
            Annuler
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Main admin page ───────────────────────────────────────────────────────────
const MOCK_ORDERS = [
  { id: 'ORD-001', customer: 'Fatima Al-Rashid', total: 478, status: 'DELIVERED',  items: 2, date: '2025-03-15' },
  { id: 'ORD-002', customer: 'Marie Dupont',      total: 289, status: 'SHIPPED',    items: 1, date: '2025-03-16' },
  { id: 'ORD-003', customer: 'Sara Ben Ali',      total: 618, status: 'PROCESSING', items: 3, date: '2025-03-17' },
  { id: 'ORD-004', customer: 'Emma Wilson',       total: 189, status: 'PENDING',    items: 1, date: '2025-03-18' },
  { id: 'ORD-005', customer: 'Nour Mansouri',     total: 938, status: 'CONFIRMED',  items: 4, date: '2025-03-18' },
]

const STATUS_COLORS: Record<string, string> = {
  PENDING:    'bg-yellow-100 text-yellow-700',
  CONFIRMED:  'bg-blue-100 text-blue-700',
  PROCESSING: 'bg-purple-100 text-purple-700',
  SHIPPED:    'bg-indigo-100 text-indigo-700',
  DELIVERED:  'bg-green-100 text-green-700',
  CANCELLED:  'bg-red-100 text-red-700',
}

type Tab = 'dashboard' | 'categories' | 'products' | 'orders'

export default function AdminDashboard() {
  const [tab, setTab]           = useState<Tab>('dashboard')
  const [search, setSearch]     = useState('')
  const [categories, setCategories] = useState<DbCategory[]>([])
  const [products, setProducts]     = useState<DbProduct[]>([])
  const [loading, setLoading]   = useState(false)
  const [seeding, setSeeding]   = useState(false)
  const [dbError, setDbError]   = useState('')

  const [catModal, setCatModal]       = useState<{ open: boolean; cat: Partial<DbCategory> | null }>({ open: false, cat: null })
  const [prodModal, setProdModal]     = useState<{ open: boolean; prod: Partial<DbProduct> | null }>({ open: false, prod: null })
  const [deleteTarget, setDeleteTarget] = useState<{ type: 'cat' | 'prod'; id: string; name: string } | null>(null)

  const fetchCategories = useCallback(async () => {
    const res = await fetch('/api/admin/categories')
    if (res.ok) { setCategories(await res.json()); setDbError('') }
    else { const d = await res.json().catch(() => ({})); setDbError(d.error || `Erreur ${res.status}`) }
  }, [])

  const fetchProducts = useCallback(async () => {
    const res = await fetch('/api/admin/products')
    if (res.ok) { setProducts(await res.json()); setDbError('') }
    else { const d = await res.json().catch(() => ({})); setDbError(d.error || `Erreur ${res.status}`) }
  }, [])

  useEffect(() => {
    setLoading(true)
    Promise.all([fetchCategories(), fetchProducts()]).finally(() => setLoading(false))
  }, [fetchCategories, fetchProducts])

  async function handleDelete() {
    if (!deleteTarget) return
    const url = deleteTarget.type === 'cat'
      ? `/api/admin/categories/${deleteTarget.id}`
      : `/api/admin/products/${deleteTarget.id}`
    await fetch(url, { method: 'DELETE' })
    setDeleteTarget(null)
    if (deleteTarget.type === 'cat') fetchCategories()
    else fetchProducts()
  }

  async function handleSeed() {
    setSeeding(true)
    const res = await fetch('/api/admin/seed', { method: 'POST' })
    const data = await res.json().catch(() => ({}))
    if (res.ok) {
      alert(`✅ ${data.categories} catégories et ${data.products} produits importés depuis mockData.`)
      fetchCategories(); fetchProducts()
    } else {
      alert(`❌ Erreur lors du seed.\n\n${data.error || 'Erreur inconnue'}`)
    }
    setSeeding(false)
  }

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    window.location.href = '/admin/login'
  }

  const NAV = [
    { id: 'dashboard',  label: 'Tableau de bord', icon: TrendingUp  },
    { id: 'categories', label: 'Catégories',       icon: Layers      },
    { id: 'products',   label: 'Produits',         icon: Package     },
    { id: 'orders',     label: 'Commandes',        icon: ShoppingCart },
  ]

  const filteredProducts = products.filter(p =>
    !search || p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-56 bg-luxury-dark text-white flex flex-col shrink-0 h-screen sticky top-0 overflow-y-auto">
        <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between gap-2">
          <div>
            <span className="font-serif text-xl tracking-wider">
              MY<span className="text-gold-500">LUXURY</span>
            </span>
            <p className="text-[10px] text-cream-500 font-sans tracking-[0.2em] uppercase mt-0.5">Admin</p>
          </div>
          <button onClick={logout} title="Déconnexion"
            className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white text-[10px] font-sans font-medium px-2.5 py-1.5 rounded transition-colors shrink-0">
            <LogOut className="w-3 h-3" /> Quitter
          </button>
        </div>

        <nav className="flex-1 py-6">
          {NAV.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setTab(id as Tab)}
              className={`w-full flex items-center gap-3 px-6 py-3 text-xs font-sans font-medium tracking-wider transition-colors ${
                tab === id ? 'bg-gold-500/20 text-gold-400 border-r-2 border-gold-500' : 'text-cream-400 hover:text-white hover:bg-white/5'
              }`}>
              <Icon className="w-4 h-4" />{label}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-white/10">
          <Link href="/" className="block text-xs text-cream-400 hover:text-gold-400 font-sans transition-colors">
            ← Voir le site
          </Link>
        </div>
      </aside>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {dbError && (
          <div className="bg-red-50 border-b border-red-200 px-8 py-3 flex items-start gap-3">
            <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-sans font-semibold text-red-700">Erreur base de données</p>
              <p className="text-xs font-sans text-red-600 mt-0.5 break-all">{dbError}</p>
            </div>
          </div>
        )}
        <div className="p-8">

          {/* ── Dashboard ── */}
          {tab === 'dashboard' && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <h1 className="font-serif text-2xl text-luxury-dark">Tableau de bord</h1>
                <button onClick={handleSeed} disabled={seeding}
                  className="flex items-center gap-2 text-xs border border-cream-400 px-4 py-2 font-sans text-luxury-gray hover:border-gold-500 hover:text-gold-500 transition-colors disabled:opacity-50">
                  <RefreshCw className={`w-3.5 h-3.5 ${seeding ? 'animate-spin' : ''}`} />
                  {seeding ? 'Import...' : 'Importer mockData → DB'}
                </button>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                  { label: 'Catégories',      value: categories.length.toString(), icon: Layers,        change: '' },
                  { label: 'Produits actifs',  value: products.filter(p => p.active).length.toString(), icon: Package, change: '' },
                  { label: 'Commandes',        value: MOCK_ORDERS.length.toString(), icon: ShoppingCart, change: '' },
                  { label: 'Clients',          value: '128',                         icon: Users,        change: '' },
                ].map((s, i) => (
                  <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                    className="bg-white p-5 shadow-card">
                    <s.icon className="w-5 h-5 text-gold-500 mb-3" />
                    <div className="font-serif text-2xl text-luxury-dark">{s.value}</div>
                    <div className="text-xs text-luxury-gray font-sans mt-1">{s.label}</div>
                  </motion.div>
                ))}
              </div>

              {loading && <p className="text-xs text-luxury-gray font-sans">Chargement des données...</p>}

              <div className="bg-amber-50 border border-amber-200 p-4 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-amber-800 font-sans">Base de données</p>
                  <p className="text-xs text-amber-700 font-sans mt-1">
                    {products.length === 0
                      ? 'Aucun produit en DB. Cliquez "Importer mockData → DB" pour peupler la base, ou ajoutez des produits manuellement.'
                      : `${products.length} produits et ${categories.length} catégories dans la base.`}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ── Categories ── */}
          {tab === 'categories' && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <h1 className="font-serif text-2xl text-luxury-dark">
                  Catégories ({categories.length})
                </h1>
                <button onClick={() => setCatModal({ open: true, cat: null })}
                  className="btn-gold text-xs py-2.5 px-5 flex items-center gap-2">
                  <Plus className="w-4 h-4" /> Nouvelle catégorie
                </button>
              </div>

              {loading && <p className="text-xs text-luxury-gray font-sans mb-4">Chargement...</p>}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map(cat => (
                  <motion.div key={cat.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                    className="bg-white shadow-card overflow-hidden group">
                    <div className="relative h-36 bg-cream-200">
                      {cat.image
                        ? <Image src={cat.image} alt={cat.name} fill className="object-cover" sizes="400px" />
                        : <div className="w-full h-full flex items-center justify-center"><ImageIcon className="w-8 h-8 text-cream-400" /></div>
                      }
                    </div>
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-sm font-serif text-luxury-dark">{cat.name}</p>
                          {cat.nameAr && <p className="text-xs text-luxury-gray font-sans mt-0.5" dir="rtl">{cat.nameAr}</p>}
                          <p className="text-[10px] text-gold-500 font-sans mt-1">{cat.slug}</p>
                          {cat._count && (
                            <p className="text-[10px] text-luxury-gray font-sans mt-0.5">{cat._count.products} produits</p>
                          )}
                        </div>
                        <div className="flex gap-1 shrink-0">
                          <button onClick={() => setCatModal({ open: true, cat })}
                            className="p-1.5 hover:text-gold-500 transition-colors text-luxury-gray">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button onClick={() => setDeleteTarget({ type: 'cat', id: cat.id, name: cat.name })}
                            className="p-1.5 hover:text-red-500 transition-colors text-luxury-gray">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* ── Products ── */}
          {tab === 'products' && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <h1 className="font-serif text-2xl text-luxury-dark">Produits ({products.length})</h1>
                <button onClick={() => setProdModal({ open: true, prod: null })}
                  className="btn-gold text-xs py-2.5 px-5 flex items-center gap-2">
                  <Plus className="w-4 h-4" /> Nouveau produit
                </button>
              </div>

              <div className="relative mb-6 max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-luxury-light" />
                <input type="text" placeholder="Rechercher..." value={search} onChange={e => setSearch(e.target.value)}
                  className="pl-9 w-full border border-cream-400 px-3 py-2 text-xs font-sans focus:border-gold-500 outline-none" />
              </div>

              <div className="bg-white shadow-card overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-cream-100">
                    <tr>
                      {['Produit', 'Catégorie', 'Prix', 'Stock', 'Statut', 'Actions'].map(h => (
                        <th key={h} className="px-4 py-3 text-left text-[10px] font-sans font-medium tracking-widest uppercase text-luxury-gray">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-cream-200">
                    {filteredProducts.map(p => (
                      <tr key={p.id} className="hover:bg-cream-50 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="relative w-10 h-10 bg-cream-200 overflow-hidden shrink-0">
                              {p.images[0]
                                ? <Image src={p.images[0]} alt={p.name} fill className="object-cover" sizes="40px" />
                                : <ImageIcon className="w-5 h-5 text-cream-400 m-auto" />}
                            </div>
                            <div>
                              <span className="text-xs font-sans font-medium text-luxury-dark line-clamp-1">{p.name}</span>
                              {p.nameAr && <p className="text-[10px] text-luxury-gray font-sans" dir="rtl">{p.nameAr}</p>}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-xs font-sans text-luxury-gray">{p.category.name}</td>
                        <td className="px-4 py-3 text-xs font-sans font-semibold">{p.price} €</td>
                        <td className="px-4 py-3">
                          <span className={`text-xs font-sans font-medium ${p.stock <= 3 ? 'text-red-500' : 'text-green-600'}`}>{p.stock}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`text-[10px] font-sans px-2 py-0.5 ${p.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                            {p.active ? 'Actif' : 'Inactif'}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            <Link href={`/product/${p.slug}`} target="_blank"
                              className="p-1 hover:text-gold-500 transition-colors text-luxury-gray">
                              <Eye className="w-4 h-4" />
                            </Link>
                            <button onClick={() => setProdModal({ open: true, prod: p })}
                              className="p-1 hover:text-gold-500 transition-colors text-luxury-gray">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button onClick={() => setDeleteTarget({ type: 'prod', id: p.id, name: p.name })}
                              className="p-1 hover:text-red-500 transition-colors text-luxury-gray">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredProducts.length === 0 && (
                      <tr><td colSpan={6} className="px-4 py-8 text-center text-xs font-sans text-luxury-gray">
                        {products.length === 0 ? 'Aucun produit en base. Importez les données ou créez un produit.' : 'Aucun résultat.'}
                      </td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── Orders ── */}
          {tab === 'orders' && (
            <div>
              <h1 className="font-serif text-2xl text-luxury-dark mb-8">Commandes ({MOCK_ORDERS.length})</h1>
              <div className="bg-white shadow-card overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-cream-100">
                    <tr>
                      {['Commande', 'Client', 'Articles', 'Total', 'Statut', 'Date'].map(h => (
                        <th key={h} className="px-4 py-3 text-left text-[10px] font-sans font-medium tracking-widest uppercase text-luxury-gray">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-cream-200">
                    {MOCK_ORDERS.map(o => (
                      <tr key={o.id} className="hover:bg-cream-50 transition-colors">
                        <td className="px-4 py-3 text-xs font-sans font-medium text-luxury-dark">{o.id}</td>
                        <td className="px-4 py-3 text-xs font-sans text-luxury-gray">{o.customer}</td>
                        <td className="px-4 py-3 text-xs font-sans text-center">{o.items}</td>
                        <td className="px-4 py-3 text-xs font-sans font-semibold">{o.total} €</td>
                        <td className="px-4 py-3">
                          <span className={`text-[10px] font-sans font-medium px-2 py-1 rounded-full ${STATUS_COLORS[o.status]}`}>
                            {o.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs font-sans text-luxury-gray">{o.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {catModal.open && (
        <CategoryModal cat={catModal.cat} onClose={() => setCatModal({ open: false, cat: null })}
          onSave={() => { setCatModal({ open: false, cat: null }); fetchCategories() }} />
      )}
      {prodModal.open && (
        <ProductModal product={prodModal.prod} categories={categories}
          onClose={() => setProdModal({ open: false, prod: null })}
          onSave={() => { setProdModal({ open: false, prod: null }); fetchProducts() }} />
      )}
      {deleteTarget && (
        <ConfirmDialog
          message={`Supprimer "${deleteTarget.name}" ? Cette action est irréversible.`}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  )
}

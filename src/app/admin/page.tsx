'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Package, ShoppingCart, TrendingUp, Users,
  AlertTriangle, Eye, Edit, Trash2, Plus, Search,
  DollarSign
} from 'lucide-react'
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from '@/lib/mockData'
import Image from 'next/image'
import Link from 'next/link'

const MOCK_ORDERS = [
  { id: 'ORD-001', customer: 'Fatima Al-Rashid', total: 478, status: 'DELIVERED', items: 2, date: '2024-03-15' },
  { id: 'ORD-002', customer: 'Marie Dupont',      total: 289, status: 'SHIPPED',   items: 1, date: '2024-03-16' },
  { id: 'ORD-003', customer: 'Sara Ben Ali',      total: 618, status: 'PROCESSING', items: 3, date: '2024-03-17' },
  { id: 'ORD-004', customer: 'Emma Wilson',       total: 189, status: 'PENDING',    items: 1, date: '2024-03-18' },
  { id: 'ORD-005', customer: 'Nour Mansouri',     total: 938, status: 'CONFIRMED',  items: 4, date: '2024-03-18' },
]

const STATUS_COLORS: Record<string, string> = {
  PENDING:    'bg-yellow-100 text-yellow-700',
  CONFIRMED:  'bg-blue-100 text-blue-700',
  PROCESSING: 'bg-purple-100 text-purple-700',
  SHIPPED:    'bg-indigo-100 text-indigo-700',
  DELIVERED:  'bg-green-100 text-green-700',
  CANCELLED:  'bg-red-100 text-red-700',
}

const STATUS_FR: Record<string, string> = {
  PENDING:    'En attente',
  CONFIRMED:  'Confirmée',
  PROCESSING: 'En cours',
  SHIPPED:    'Expédiée',
  DELIVERED:  'Livrée',
  CANCELLED:  'Annulée',
}

export default function AdminDashboard() {
  const [tab, setTab] = useState<'dashboard' | 'products' | 'orders'>('dashboard')
  const [search, setSearch] = useState('')

  const stats = [
    { label: 'Revenus ce mois',  value: '12 450 €',  icon: DollarSign,   change: '+18%', up: true  },
    { label: 'Commandes',        value: '47',         icon: ShoppingCart, change: '+12%', up: true  },
    { label: 'Produits actifs',  value: MOCK_PRODUCTS.length.toString(), icon: Package, change: '', up: true },
    { label: 'Clients',          value: '128',        icon: Users,        change: '+8%',  up: true  },
  ]

  const lowStock = MOCK_PRODUCTS.filter((p) => p.stock <= 3)

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* ── Sidebar ──────────────────────────────────── */}
      <aside className="w-56 bg-luxury-dark text-white flex flex-col">
        <div className="p-6 border-b border-white/10">
          <span className="font-serif text-xl tracking-wider">
            DESERT<span className="text-gold-500">LUXE</span>
          </span>
          <p className="text-[10px] text-cream-500 font-sans tracking-[0.2em] uppercase mt-1">
            Admin Panel
          </p>
        </div>

        <nav className="flex-1 py-6">
          {[
            { id: 'dashboard', label: 'Tableau de bord', icon: TrendingUp  },
            { id: 'products',  label: 'Produits',         icon: Package      },
            { id: 'orders',    label: 'Commandes',        icon: ShoppingCart },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id as any)}
              className={`w-full flex items-center gap-3 px-6 py-3 text-xs font-sans font-medium
                         tracking-wider transition-colors ${
                           tab === id
                             ? 'bg-gold-500/20 text-gold-400 border-r-2 border-gold-500'
                             : 'text-cream-400 hover:text-white hover:bg-white/5'
                         }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-white/10">
          <Link href="/" className="text-xs text-cream-500 hover:text-gold-400 font-sans transition-colors">
            ← Voir le site
          </Link>
        </div>
      </aside>

      {/* ── Content ──────────────────────────────────── */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">

          {/* ─ Dashboard ─ */}
          {tab === 'dashboard' && (
            <div>
              <h1 className="font-serif text-2xl text-luxury-dark mb-8">Tableau de bord</h1>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {stats.map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="bg-white p-5 shadow-card"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <s.icon className="w-5 h-5 text-gold-500" />
                      {s.change && (
                        <span className={`text-xs font-sans font-medium ${s.up ? 'text-green-600' : 'text-red-500'}`}>
                          {s.change}
                        </span>
                      )}
                    </div>
                    <div className="font-serif text-2xl text-luxury-dark">{s.value}</div>
                    <div className="text-xs text-luxury-gray font-sans mt-1">{s.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Low stock alert */}
              {lowStock.length > 0 && (
                <div className="bg-amber-50 border border-amber-200 p-4 mb-8 flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-amber-800 font-sans">Stock faible</p>
                    <p className="text-xs text-amber-700 font-sans mt-1">
                      {lowStock.map((p) => `${p.name} (${p.stock} restants)`).join(' · ')}
                    </p>
                  </div>
                </div>
              )}

              {/* Recent orders */}
              <div className="bg-white shadow-card">
                <div className="flex items-center justify-between px-6 py-4 border-b border-cream-300">
                  <h2 className="font-serif text-lg text-luxury-dark">Commandes récentes</h2>
                  <button onClick={() => setTab('orders')} className="text-xs text-gold-500 font-sans hover:underline">
                    Voir tout →
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-cream-100">
                      <tr>
                        {['Commande', 'Client', 'Total', 'Statut', 'Date', ''].map((h) => (
                          <th key={h} className="px-4 py-3 text-left text-[10px] font-sans font-medium
                                                  tracking-widest uppercase text-luxury-gray">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-cream-200">
                      {MOCK_ORDERS.map((order) => (
                        <tr key={order.id} className="hover:bg-cream-50 transition-colors">
                          <td className="px-4 py-3 text-xs font-sans font-medium text-luxury-dark">{order.id}</td>
                          <td className="px-4 py-3 text-xs font-sans text-luxury-gray">{order.customer}</td>
                          <td className="px-4 py-3 text-xs font-sans font-semibold text-luxury-dark">{order.total} €</td>
                          <td className="px-4 py-3">
                            <span className={`text-[10px] font-sans font-medium px-2 py-1 rounded-full ${STATUS_COLORS[order.status]}`}>
                              {STATUS_FR[order.status]}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-xs font-sans text-luxury-gray">{order.date}</td>
                          <td className="px-4 py-3">
                            <button className="p-1 hover:text-gold-500 transition-colors">
                              <Eye className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ─ Products ─ */}
          {tab === 'products' && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <h1 className="font-serif text-2xl text-luxury-dark">Produits ({MOCK_PRODUCTS.length})</h1>
                <button className="btn-gold text-xs py-2.5 px-5 flex items-center gap-2">
                  <Plus className="w-4 h-4" /> Nouveau produit
                </button>
              </div>

              {/* Search */}
              <div className="relative mb-6 max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-luxury-light" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 form-input text-xs"
                />
              </div>

              <div className="bg-white shadow-card overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-cream-100">
                    <tr>
                      {['Produit', 'Catégorie', 'Prix', 'Stock', 'Statut', 'Actions'].map((h) => (
                        <th key={h} className="px-4 py-3 text-left text-[10px] font-sans font-medium tracking-widest uppercase text-luxury-gray">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-cream-200">
                    {MOCK_PRODUCTS
                      .filter((p) => !search || p.name.toLowerCase().includes(search.toLowerCase()))
                      .map((p) => (
                        <tr key={p.id} className="hover:bg-cream-50 transition-colors">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div className="relative w-10 h-10 bg-cream-200 overflow-hidden shrink-0">
                                <Image src={p.images[0]} alt={p.name} fill className="object-cover" sizes="40px" />
                              </div>
                              <span className="text-xs font-sans font-medium text-luxury-dark line-clamp-1">{p.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-xs font-sans text-luxury-gray">{p.category.name}</td>
                          <td className="px-4 py-3 text-xs font-sans font-semibold">{p.price} €</td>
                          <td className="px-4 py-3">
                            <span className={`text-xs font-sans font-medium ${p.stock <= 3 ? 'text-red-500' : 'text-green-600'}`}>
                              {p.stock}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`text-[10px] font-sans px-2 py-0.5 ${p.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                              {p.active ? 'Actif' : 'Inactif'}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <button className="p-1 hover:text-gold-500 transition-colors"><Eye className="w-4 h-4" /></button>
                              <button className="p-1 hover:text-gold-500 transition-colors"><Edit className="w-4 h-4" /></button>
                              <button className="p-1 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ─ Orders ─ */}
          {tab === 'orders' && (
            <div>
              <h1 className="font-serif text-2xl text-luxury-dark mb-8">Commandes ({MOCK_ORDERS.length})</h1>
              <div className="bg-white shadow-card overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-cream-100">
                    <tr>
                      {['Commande', 'Client', 'Articles', 'Total', 'Statut', 'Date', 'Actions'].map((h) => (
                        <th key={h} className="px-4 py-3 text-left text-[10px] font-sans font-medium tracking-widest uppercase text-luxury-gray">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-cream-200">
                    {MOCK_ORDERS.map((order) => (
                      <tr key={order.id} className="hover:bg-cream-50 transition-colors">
                        <td className="px-4 py-3 text-xs font-sans font-medium text-luxury-dark">{order.id}</td>
                        <td className="px-4 py-3 text-xs font-sans text-luxury-gray">{order.customer}</td>
                        <td className="px-4 py-3 text-xs font-sans text-luxury-dark text-center">{order.items}</td>
                        <td className="px-4 py-3 text-xs font-sans font-semibold">{order.total} €</td>
                        <td className="px-4 py-3">
                          <span className={`text-[10px] font-sans font-medium px-2 py-1 rounded-full ${STATUS_COLORS[order.status]}`}>
                            {STATUS_FR[order.status]}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs font-sans text-luxury-gray">{order.date}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <button className="p-1 hover:text-gold-500 transition-colors"><Eye className="w-4 h-4" /></button>
                            <button className="p-1 hover:text-gold-500 transition-colors"><Edit className="w-4 h-4" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

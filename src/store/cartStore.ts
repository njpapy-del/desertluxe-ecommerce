'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { CartItem, CartState, Product } from '@/types'
import toast from 'react-hot-toast'

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product: Product, quantity = 1) => {
        const existing = get().items.find((i) => i.productId === product.id)
        if (existing) {
          set((state) => ({
            items: state.items.map((i) =>
              i.productId === product.id
                ? { ...i, quantity: Math.min(i.quantity + quantity, product.stock) }
                : i
            ),
          }))
          toast.success('Quantité mise à jour')
        } else {
          const item: CartItem = {
            id: `${product.id}-${Date.now()}`,
            productId: product.id,
            name: product.name,
            price: product.price,
            image: product.images[0],
            quantity,
            slug: product.slug,
          }
          set((state) => ({ items: [...state.items, item], isOpen: true }))
          toast.success(`${product.name} ajouté au panier`)
        }
      },

      removeItem: (productId: string) => {
        set((state) => ({
          items: state.items.filter((i) => i.productId !== productId),
        }))
      },

      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId)
          return
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId ? { ...i, quantity } : i
          ),
        }))
      },

      clearCart: () => set({ items: [] }),

      openCart:   () => set({ isOpen: true }),
      closeCart:  () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      total: () =>
        get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),

      itemCount: () =>
        get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    {
      name: 'desertluxe-cart',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

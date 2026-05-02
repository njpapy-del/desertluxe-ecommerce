// ─── Product ──────────────────────────────────────────────────────────────────
export interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  comparePrice?: number
  images: string[]
  category: Category
  categoryId: string
  stock: number
  sku?: string
  tags: string[]
  featured: boolean
  active: boolean
  rating: number
  reviewCount: number
  createdAt: string
  updatedAt: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  image?: string
  position: number
  _count?: { products: number }
}

// ─── Cart ─────────────────────────────────────────────────────────────────────
export interface CartItem {
  id: string
  productId: string
  name: string
  price: number
  image: string
  quantity: number
  slug: string
}

export interface CartState {
  items: CartItem[]
  isOpen: boolean
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
  total: () => number
  itemCount: () => number
}

// ─── Order ────────────────────────────────────────────────────────────────────
export interface ShippingAddress {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  postalCode: string
  country: string
}

export interface Order {
  id: string
  orderNumber: string
  status: OrderStatus
  items: OrderItem[]
  subtotal: number
  shipping: number
  tax: number
  total: number
  currency: string
  shippingAddress: ShippingAddress
  paymentMethod?: string
  createdAt: string
  updatedAt: string
}

export interface OrderItem {
  id: string
  productId: string
  quantity: number
  price: number
  snapshot: {
    name: string
    image: string
    slug: string
  }
}

export type OrderStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED'
  | 'REFUNDED'

// ─── Chat ─────────────────────────────────────────────────────────────────────
export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  createdAt: Date
  products?: Product[]
}

// ─── API ──────────────────────────────────────────────────────────────────────
export interface ApiResponse<T> {
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export interface ProductFilters {
  category?: string
  minPrice?: number
  maxPrice?: number
  sort?: 'newest' | 'price_asc' | 'price_desc' | 'popular'
  search?: string
  featured?: boolean
  page?: number
  pageSize?: number
}

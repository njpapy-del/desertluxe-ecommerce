import { MOCK_PRODUCTS, MOCK_CATEGORIES } from '@/lib/mockData'
import type { Product, Category } from '@/types'

function mapProduct(p: any): Product {
  return {
    id:           p.id,
    name:         p.name,
    slug:         p.slug,
    description:  p.description,
    price:        p.price,
    comparePrice: p.comparePrice ?? undefined,
    images:       p.images,
    category: {
      id:          p.category.id,
      name:        p.category.name,
      slug:        p.category.slug,
      description: p.category.description ?? undefined,
      image:       p.category.image ?? undefined,
      position:    p.category.position,
    },
    categoryId:  p.categoryId,
    stock:       p.stock,
    sku:         p.sku ?? undefined,
    tags:        p.tags ?? [],
    featured:    p.featured,
    active:      p.active,
    rating:      p.rating,
    reviewCount: p.reviewCount,
    createdAt:   p.createdAt instanceof Date ? p.createdAt.toISOString() : p.createdAt,
    updatedAt:   p.updatedAt instanceof Date ? p.updatedAt.toISOString() : p.updatedAt,
  }
}

function mapCategory(c: any): Category {
  return {
    id:          c.id,
    name:        c.name,
    slug:        c.slug,
    description: c.description ?? undefined,
    image:       c.image ?? undefined,
    position:    c.position,
    _count:      c._count,
  }
}

export async function getProducts(): Promise<Product[]> {
  try {
    const { prisma } = await import('@/lib/prisma')
    const rows = await prisma.product.findMany({
      where:   { active: true },
      include: { category: true },
      orderBy: { createdAt: 'desc' },
    })
    if (rows.length === 0) return MOCK_PRODUCTS as unknown as Product[]
    return rows.map(mapProduct)
  } catch {
    return MOCK_PRODUCTS as unknown as Product[]
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    const { prisma } = await import('@/lib/prisma')
    const rows = await prisma.category.findMany({
      orderBy: { position: 'asc' },
      include: { _count: { select: { products: true } } },
    })
    if (rows.length === 0) return MOCK_CATEGORIES as unknown as Category[]
    return rows.map(mapCategory)
  } catch {
    return MOCK_CATEGORIES as unknown as Category[]
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const { prisma } = await import('@/lib/prisma')
    const p = await prisma.product.findUnique({ where: { slug }, include: { category: true } })
    if (!p) return (MOCK_PRODUCTS.find(x => x.slug === slug) as unknown as Product) ?? null
    return mapProduct(p)
  } catch {
    return (MOCK_PRODUCTS.find(x => x.slug === slug) as unknown as Product) ?? null
  }
}

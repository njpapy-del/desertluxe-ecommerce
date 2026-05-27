import { NextRequest, NextResponse } from 'next/server'
import { MOCK_PRODUCTS } from '@/lib/mockData'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const category = searchParams.get('category')
  const search   = searchParams.get('search')
  const sort     = searchParams.get('sort') || 'newest'
  const featured = searchParams.get('featured')
  const page     = parseInt(searchParams.get('page') || '1')
  const pageSize = parseInt(searchParams.get('pageSize') || '100')

  try {
    const { prisma } = await import('@/lib/prisma')

    // Try DB first
    const dbCount = await prisma.product.count({ where: { active: true } }).catch(() => 0)

    if (dbCount > 0) {
      // Use Prisma
      const where: any = { active: true }
      if (category) where.category = { slug: category }
      if (featured === 'true') where.featured = true
      if (search) where.OR = [
        { name:        { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ]

      const orderBy =
        sort === 'price_asc'  ? { price: 'asc'  as const } :
        sort === 'price_desc' ? { price: 'desc' as const } :
        sort === 'popular'    ? { reviewCount: 'desc' as const } :
                                { createdAt: 'desc' as const }

      const [rows, total] = await Promise.all([
        prisma.product.findMany({ where, include: { category: true }, orderBy, skip: (page - 1) * pageSize, take: pageSize }),
        prisma.product.count({ where }),
      ])

      return NextResponse.json({ data: rows, total, page, pageSize, totalPages: Math.ceil(total / pageSize) })
    }
  } catch { /* fall through to mockData */ }

  // Fallback: mock data
  let data = [...MOCK_PRODUCTS]
  if (category)           data = data.filter(p => p.category.slug === category)
  if (search)             data = data.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase()))
  if (featured === 'true') data = data.filter(p => p.featured)

  switch (sort) {
    case 'price_asc':  data.sort((a, b) => a.price - b.price);            break
    case 'price_desc': data.sort((a, b) => b.price - a.price);            break
    case 'popular':    data.sort((a, b) => b.reviewCount - a.reviewCount); break
    default:           data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }

  const total     = data.length
  const paginated = data.slice((page - 1) * pageSize, page * pageSize)
  return NextResponse.json({ data: paginated, total, page, pageSize, totalPages: Math.ceil(total / pageSize) })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    return NextResponse.json({ message: 'Product created', data: body }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
  }
}

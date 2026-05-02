import { NextRequest, NextResponse } from 'next/server'
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from '@/lib/mockData'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const category = searchParams.get('category')
  const search   = searchParams.get('search')
  const sort     = searchParams.get('sort') || 'newest'
  const featured = searchParams.get('featured')
  const page     = parseInt(searchParams.get('page') || '1')
  const pageSize = parseInt(searchParams.get('pageSize') || '20')

  try {
    // ── Try Prisma first ───────────────────────────────
    // const { prisma } = await import('@/lib/prisma')
    // const where = {
    //   active: true,
    //   ...(category ? { category: { slug: category } } : {}),
    //   ...(featured === 'true' ? { featured: true } : {}),
    //   ...(search ? { OR: [{ name: { contains: search, mode: 'insensitive' } }, { description: { contains: search, mode: 'insensitive' } }] } : {}),
    // }
    // const [data, total] = await Promise.all([
    //   prisma.product.findMany({ where, include: { category: true }, orderBy: ..., skip: (page-1)*pageSize, take: pageSize }),
    //   prisma.product.count({ where }),
    // ])

    // ── Fallback: mock data ────────────────────────────
    let data = [...MOCK_PRODUCTS]

    if (category) data = data.filter((p) => p.category.slug === category)
    if (search)   data = data.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
    )
    if (featured === 'true') data = data.filter((p) => p.featured)

    switch (sort) {
      case 'price_asc':  data.sort((a, b) => a.price - b.price);        break
      case 'price_desc': data.sort((a, b) => b.price - a.price);        break
      case 'popular':    data.sort((a, b) => b.reviewCount - a.reviewCount); break
      default:           data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    }

    const total     = data.length
    const paginated = data.slice((page - 1) * pageSize, page * pageSize)

    return NextResponse.json({
      data:       paginated,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    // In production: validate + save to Prisma
    return NextResponse.json({ message: 'Product created', data: body }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
  }
}

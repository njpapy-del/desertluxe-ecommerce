import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/adminVerify'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const err = await requireAdmin(req)
  if (err) return err

  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json(products)
}

export async function POST(req: NextRequest) {
  const err = await requireAdmin(req)
  if (err) return err

  const body = await req.json()
  const {
    name, nameAr, slug, description, descriptionAr,
    price, categoryId, stock, images, featured, active,
    badge, badgeAr, comparePrice,
  } = body

  if (!name || !slug || !description || !price || !categoryId) {
    return NextResponse.json({ error: 'Champs requis manquants' }, { status: 400 })
  }

  const product = await prisma.product.create({
    data: {
      name,
      nameAr:        nameAr        || null,
      slug,
      description,
      descriptionAr: descriptionAr || null,
      price:         parseFloat(price),
      comparePrice:  comparePrice  ? parseFloat(comparePrice) : null,
      categoryId,
      stock:         parseInt(stock) || 0,
      images:        images         || [],
      featured:      featured       ?? false,
      active:        active         ?? true,
      badge:         badge          || null,
      badgeAr:       badgeAr        || null,
      rating:        5.0,
      reviewCount:   0,
    },
    include: { category: true },
  })
  return NextResponse.json(product, { status: 201 })
}

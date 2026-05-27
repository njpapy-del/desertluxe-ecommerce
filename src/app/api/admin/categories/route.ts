import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/adminVerify'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const err = await requireAdmin(req)
  if (err) return err

  const categories = await prisma.category.findMany({
    orderBy: { position: 'asc' },
    include: { _count: { select: { products: true } } },
  })
  return NextResponse.json(categories)
}

export async function POST(req: NextRequest) {
  const err = await requireAdmin(req)
  if (err) return err

  const body = await req.json()
  const { name, nameAr, slug, description, descriptionAr, image, position } = body

  if (!name || !slug) {
    return NextResponse.json({ error: 'name et slug requis' }, { status: 400 })
  }

  const category = await prisma.category.create({
    data: {
      name,
      nameAr:        nameAr        || null,
      slug,
      description:   description   || null,
      descriptionAr: descriptionAr || null,
      image:         image         || null,
      position:      position      ?? 0,
    },
  })
  return NextResponse.json(category, { status: 201 })
}

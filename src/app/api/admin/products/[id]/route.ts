import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/adminVerify'
import { prisma } from '@/lib/prisma'

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const err = await requireAdmin(req)
  if (err) return err

  const body = await req.json()
  const {
    name, nameAr, slug, description, descriptionAr,
    price, categoryId, stock, images, featured, active,
    badge, badgeAr, comparePrice,
  } = body

  const product = await prisma.product.update({
    where: { id: params.id },
    data: {
      name,
      nameAr:        nameAr        ?? null,
      slug,
      description,
      descriptionAr: descriptionAr ?? null,
      price:         parseFloat(price),
      comparePrice:  comparePrice  ? parseFloat(comparePrice) : null,
      categoryId,
      stock:         parseInt(stock) || 0,
      images:        images         || [],
      featured:      featured       ?? false,
      active:        active         ?? true,
      badge:         badge          ?? null,
      badgeAr:       badgeAr        ?? null,
    },
    include: { category: true },
  })
  return NextResponse.json(product)
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const err = await requireAdmin(req)
  if (err) return err

  await prisma.product.delete({ where: { id: params.id } })
  return NextResponse.json({ success: true })
}

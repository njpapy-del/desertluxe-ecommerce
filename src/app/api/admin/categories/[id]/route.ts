import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/adminVerify'
import { prisma } from '@/lib/prisma'

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const err = await requireAdmin(req)
  if (err) return err

  const body = await req.json()
  const { name, nameAr, slug, description, descriptionAr, image, position } = body

  try {
    const category = await prisma.category.update({
      where: { id: params.id },
      data: {
        name,
        nameAr:        nameAr        ?? null,
        slug,
        description:   description   ?? null,
        descriptionAr: descriptionAr ?? null,
        image:         image         ?? null,
        position:      position      ?? 0,
      },
    })
    return NextResponse.json(category)
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Erreur base de données' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const err = await requireAdmin(req)
  if (err) return err

  try {
    await prisma.product.updateMany({
      where: { categoryId: params.id },
      data:  { active: false },
    })
    await prisma.category.delete({ where: { id: params.id } })
    return NextResponse.json({ success: true })
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Erreur base de données' }, { status: 500 })
  }
}

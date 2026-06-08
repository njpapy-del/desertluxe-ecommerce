import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/adminVerify'
import { prisma } from '@/lib/prisma'
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from '@/lib/mockData'

export async function POST(req: NextRequest) {
  const err = await requireAdmin(req)
  if (err) return err

  try {
    // Upsert categories
    for (const cat of MOCK_CATEGORIES) {
      await prisma.category.upsert({
        where:  { slug: cat.slug },
        update: {},
        create: {
          id:          cat.id,
          name:        cat.name,
          slug:        cat.slug,
          description: (cat as any).description || null,
          image:       (cat as any).image       || null,
          position:    cat.position             ?? 0,
        },
      })
    }

    // Upsert products
    let created = 0
    for (const p of MOCK_PRODUCTS) {
      await prisma.product.upsert({
        where:  { slug: p.slug },
        update: {},
        create: {
          id:          p.id,
          name:        p.name,
          slug:        p.slug,
          description: p.description,
          price:       p.price,
          images:      p.images,
          categoryId:  p.categoryId,
          stock:       p.stock,
          featured:    p.featured,
          active:      (p as any).active ?? true,
          rating:      p.rating,
          reviewCount: p.reviewCount,
        },
      })
      created++
    }

    return NextResponse.json({
      success:    true,
      categories: MOCK_CATEGORIES.length,
      products:   created,
    })
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || 'Erreur base de données' },
      { status: 500 }
    )
  }
}

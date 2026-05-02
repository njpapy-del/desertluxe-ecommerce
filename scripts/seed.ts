/**
 * Database seed script — run with: npm run db:seed
 */
import { PrismaClient } from '@prisma/client'
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from '../src/lib/mockData'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding DESERTLUXE database...')

  // Upsert categories
  for (const cat of MOCK_CATEGORIES) {
    await prisma.category.upsert({
      where:  { slug: cat.slug },
      update: { name: cat.name, description: cat.description, image: cat.image, position: cat.position },
      create: { id: cat.id, name: cat.name, slug: cat.slug, description: cat.description, image: cat.image, position: cat.position },
    })
    console.log(`  ✓ Category: ${cat.name}`)
  }

  // Upsert products
  for (const p of MOCK_PRODUCTS) {
    await prisma.product.upsert({
      where:  { slug: p.slug },
      update: {
        name: p.name, description: p.description,
        price: p.price, comparePrice: p.comparePrice,
        images: p.images, stock: p.stock,
        tags: p.tags, featured: p.featured,
        rating: p.rating, reviewCount: p.reviewCount,
      },
      create: {
        id: p.id, name: p.name, slug: p.slug,
        description: p.description, price: p.price,
        comparePrice: p.comparePrice, images: p.images,
        categoryId: p.categoryId, stock: p.stock,
        tags: p.tags, featured: p.featured, active: p.active,
        rating: p.rating, reviewCount: p.reviewCount,
      },
    })
    console.log(`  ✓ Product: ${p.name}`)
  }

  console.log('\n✅ Seed complete! Database ready.')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())

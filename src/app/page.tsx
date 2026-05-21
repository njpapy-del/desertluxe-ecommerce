import Hero from '@/components/home/Hero'
import Categories from '@/components/home/Categories'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import Newsletter from '@/components/home/Newsletter'
import PromoBanner from '@/components/home/PromoBanner'
import CategoryCarousel from '@/components/home/CategoryCarousel'
import WeeklyPromos from '@/components/home/WeeklyPromos'
import FlashSaleCountdown from '@/components/home/FlashSaleCountdown'
import HairOilVitamins from '@/components/home/HairOilVitamins'
import TrustSection from '@/components/home/TrustSection'
import BrandStorySection from '@/components/home/BrandStorySection'
import { MOCK_PRODUCTS } from '@/lib/mockData'

// In production: fetch from DB via Prisma
async function getFeaturedProducts() {
  // try {
  //   const { prisma } = await import('@/lib/prisma')
  //   return prisma.product.findMany({
  //     where: { featured: true, active: true },
  //     include: { category: true },
  //     orderBy: { createdAt: 'desc' },
  //     take: 8,
  //   })
  // } catch {
  return MOCK_PRODUCTS.filter((p) => p.featured)
  // }
}

export default async function HomePage() {
  const featured = await getFeaturedProducts()

  return (
    <>
      {/* ── Animated promo banner ──────────────────────── */}
      <PromoBanner />

      <Hero />
      <Categories />
      <FeaturedProducts products={featured as any} />

      {/* ── Category carousel ──────────────────────────── */}
      <CategoryCarousel />

      {/* ── Hair oil vitamins ──────────────────────────── */}
      <HairOilVitamins />

      {/* ── Weekly dynamic promos ──────────────────────── */}
      <WeeklyPromos />

      {/* ── Flash sale countdown ───────────────────────── */}
      <FlashSaleCountdown />

      <TrustSection />
      <BrandStorySection />

      <Newsletter />
    </>
  )
}

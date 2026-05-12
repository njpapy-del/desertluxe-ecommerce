/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,

  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'cdn.desertluxe.com' },
      { protocol: 'https', hostname: 'uploadthing.com' },
      // Supabase Storage
      { protocol: 'https', hostname: '*.supabase.co' },
      { protocol: 'https', hostname: '*.supabase.in' },
    ],
  },

  experimental: {
    serverActions: {
      allowedOrigins: [
        'localhost:3000',
        'desertluxe-frontend.onrender.com',
        // Vercel — preview deployments + production
        '*.vercel.app',
        'ma-luxury.vercel.app',
      ],
    },
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options',        value: 'SAMEORIGIN'                      },
          { key: 'X-Content-Type-Options', value: 'nosniff'                         },
          { key: 'Referrer-Policy',        value: 'strict-origin-when-cross-origin' },
          { key: 'X-DNS-Prefetch-Control', value: 'on'                              },
        ],
      },
      {
        source: '/images/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/_next/static/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ]
  },
}

module.exports = nextConfig

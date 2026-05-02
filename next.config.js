/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'cdn.desertluxe.com' },
      { protocol: 'https', hostname: 'uploadthing.com' },
    ],
  },

  experimental: {
    serverActions: {
      allowedOrigins: [
        'localhost:3000',
        // Render génère un domaine onrender.com — on accepte tous les sous-domaines
        '*.onrender.com',
      ],
    },
  },

  // ── Headers sécurité production ───────────────────────────────────────────
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options',        value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff'    },
          { key: 'Referrer-Policy',        value: 'strict-origin-when-cross-origin' },
        ],
      },
    ]
  },
}

module.exports = nextConfig

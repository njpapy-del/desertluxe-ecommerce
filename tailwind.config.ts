import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50:  '#fdf9f0',
          100: '#f8efda',
          200: '#f0dbb0',
          300: '#e6c37f',
          400: '#d9a84e',
          500: '#C9A96E',  // primary gold
          600: '#b8913a',
          700: '#9a7430',
          800: '#7d5e29',
          900: '#664e24',
        },
        cream: {
          50:  '#FEFEFE',
          100: '#FAF8F5',  // main bg
          200: '#F5F1EB',
          300: '#EDE7DC',
          400: '#E2D9CC',
          500: '#D4C9B8',
        },
        sand: {
          100: '#F0E8DC',
          200: '#E8D8C4',
          300: '#DCCCB4',
          400: '#C8B59A',
          500: '#B09880',
        },
        luxury: {
          dark:  '#1A1A1A',
          black: '#111111',
          gray:  '#6B6B6B',
          light: '#9E9E9E',
        },
      },
      fontFamily: {
        serif:  ['var(--font-playfair)', 'Playfair Display', 'Georgia', 'serif'],
        sans:   ['var(--font-inter)',     'Inter',            'system-ui',  'sans-serif'],
        display:['var(--font-cormorant)', 'Cormorant Garamond','Georgia',   'serif'],
      },
      backgroundImage: {
        'gradient-luxury': 'linear-gradient(135deg, #C9A96E 0%, #E8D5B0 50%, #C9A96E 100%)',
        'gradient-dark':   'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 100%)',
        'gradient-card':   'linear-gradient(180deg, transparent 60%, rgba(26,26,26,0.08) 100%)',
      },
      boxShadow: {
        'luxury':    '0 4px 24px rgba(201, 169, 110, 0.15)',
        'luxury-lg': '0 8px 40px rgba(201, 169, 110, 0.25)',
        'card':      '0 2px 16px rgba(0, 0, 0, 0.06)',
        'card-hover':'0 8px 32px rgba(0, 0, 0, 0.12)',
        'nav':       '0 1px 0 rgba(0,0,0,0.06)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      animation: {
        'fade-in':      'fadeIn 0.5s ease-in-out',
        'slide-up':     'slideUp 0.4s ease-out',
        'slide-down':   'slideDown 0.3s ease-out',
        'scale-in':     'scaleIn 0.2s ease-out',
        'shimmer':      'shimmer 2s infinite',
        'float':        'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn:   { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp:  { from: { transform: 'translateY(20px)', opacity: '0' }, to: { transform: 'translateY(0)', opacity: '1' } },
        slideDown:{ from: { transform: 'translateY(-10px)', opacity: '0' }, to: { transform: 'translateY(0)', opacity: '1' } },
        scaleIn:  { from: { transform: 'scale(0.95)', opacity: '0' }, to: { transform: 'scale(1)', opacity: '1' } },
        shimmer:  { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        float:    { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
      },
    },
  },
  plugins: [],
}

export default config

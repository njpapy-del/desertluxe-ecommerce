'use strict'

require('dotenv').config()

const express      = require('express')
const cors         = require('cors')
const helmet       = require('helmet')
const compression  = require('compression')
const morgan       = require('morgan')
const rateLimit    = require('express-rate-limit')

const app  = express()
const PORT = process.env.PORT || 10000

// ── Sécurité ──────────────────────────────────────────────────────────────────
app.use(helmet())
app.use(compression())

// ── CORS : autorise le frontend Render + localhost ────────────────────────────
const ALLOWED_ORIGINS = [
  process.env.FRONTEND_URL,
  'http://localhost:3000',
  /\.onrender\.com$/,
].filter(Boolean)

app.use(cors({
  origin: (origin, cb) => {
    if (!origin) return cb(null, true) // curl / Postman
    const allowed = ALLOWED_ORIGINS.some((o) =>
      o instanceof RegExp ? o.test(origin) : o === origin
    )
    cb(allowed ? null : new Error('CORS non autorisé'), allowed)
  },
  credentials: true,
}))

// ── Body parser ───────────────────────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// ── Logs ──────────────────────────────────────────────────────────────────────
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'))

// ── Rate limiting ─────────────────────────────────────────────────────────────
app.use('/api/', rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max:      100,
  message:  { error: 'Trop de requêtes, réessaie dans 15 min.' },
}))

// ── Routes ────────────────────────────────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.json({
    status:    'ok',
    service:   'desertluxe-backend',
    timestamp: new Date().toISOString(),
    env:       process.env.NODE_ENV,
  })
})

// Produits (proxy léger vers la DB)
app.use('/api/products',  require('./routes/products'))
// Commandes
app.use('/api/orders',    require('./routes/orders'))
// Newsletter
app.use('/api/newsletter',require('./routes/newsletter'))

// ── 404 ───────────────────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ error: 'Route introuvable' })
})

// ── Erreurs globales ──────────────────────────────────────────────────────────
app.use((err, _req, res, _next) => {
  const status = err.status || 500
  console.error(`[ERROR] ${err.message}`, err.stack)
  res.status(status).json({
    error:   process.env.NODE_ENV === 'production' ? 'Erreur serveur' : err.message,
  })
})

// ── Démarrage ─────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ DESERTLUXE backend démarré sur port ${PORT} (${process.env.NODE_ENV || 'development'})`)
})

module.exports = app

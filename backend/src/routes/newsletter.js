'use strict'

const { Router } = require('express')
const { Pool }   = require('pg')

const router = Router()
const pool   = new Pool({ connectionString: process.env.DATABASE_URL })

// POST /api/newsletter — inscription
router.post('/', async (req, res, next) => {
  try {
    const { email } = req.body
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Email invalide' })
    }

    await pool.query(
      `INSERT INTO "NewsletterSubscriber" (email, "subscribedAt")
       VALUES ($1, NOW())
       ON CONFLICT (email) DO NOTHING`,
      [email.toLowerCase().trim()]
    )

    res.json({ success: true, message: 'Inscription confirmée.' })
  } catch (err) {
    next(err)
  }
})

module.exports = router

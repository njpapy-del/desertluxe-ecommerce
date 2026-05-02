'use strict'

const { Router } = require('express')
const { Pool }   = require('pg')

const router = Router()
const pool   = new Pool({ connectionString: process.env.DATABASE_URL })

// GET /api/orders/:id — statut commande
router.get('/:id', async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      `SELECT id, status, total, "createdAt"
       FROM "Order" WHERE id = $1 LIMIT 1`,
      [req.params.id]
    )
    if (!rows[0]) return res.status(404).json({ error: 'Commande introuvable' })
    res.json(rows[0])
  } catch (err) {
    next(err)
  }
})

module.exports = router

'use strict'

const { Router } = require('express')
const { Pool }   = require('pg')

const router = Router()
const pool   = new Pool({ connectionString: process.env.DATABASE_URL })

// GET /api/products — liste paginée
router.get('/', async (req, res, next) => {
  try {
    const page     = Math.max(1, parseInt(req.query.page)  || 1)
    const limit    = Math.min(50, parseInt(req.query.limit) || 12)
    const offset   = (page - 1) * limit
    const category = req.query.category || null

    const params = category ? [category, limit, offset] : [limit, offset]
    const where  = category ? 'WHERE c.slug = $1' : ''
    const shift  = category ? 1 : 0

    const { rows } = await pool.query(
      `SELECT p.id, p.name, p.slug, p.price, p."comparePrice",
              p.images, p.stock, p.tags, p.rating, p."reviewCount",
              c.name AS "categoryName", c.slug AS "categorySlug"
       FROM "Product" p
       JOIN "Category" c ON c.id = p."categoryId"
       ${where}
       WHERE p.active = true
       ORDER BY p."createdAt" DESC
       LIMIT $${1 + shift} OFFSET $${2 + shift}`,
      params
    )

    const { rows: [{ count }] } = await pool.query(
      `SELECT COUNT(*) FROM "Product" p JOIN "Category" c ON c.id = p."categoryId"
       ${where} WHERE p.active = true`,
      category ? [category] : []
    )

    res.json({ products: rows, total: parseInt(count), page, limit })
  } catch (err) {
    next(err)
  }
})

// GET /api/products/:slug — détail produit
router.get('/:slug', async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      `SELECT p.*, c.name AS "categoryName", c.slug AS "categorySlug"
       FROM "Product" p
       JOIN "Category" c ON c.id = p."categoryId"
       WHERE p.slug = $1 AND p.active = true
       LIMIT 1`,
      [req.params.slug]
    )
    if (!rows[0]) return res.status(404).json({ error: 'Produit introuvable' })
    res.json(rows[0])
  } catch (err) {
    next(err)
  }
})

module.exports = router

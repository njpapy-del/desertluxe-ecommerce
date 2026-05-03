import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const OrderSchema = z.object({
  items: z.array(z.object({
    productId: z.string(),
    quantity:  z.number().min(1),
    price:     z.number().positive(),
    name:      z.string(),
    image:     z.string(),
  })),
  shippingAddress: z.object({
    firstName:  z.string(),
    lastName:   z.string(),
    email:      z.string().email(),
    phone:      z.string().optional(),
    address:    z.string(),
    city:       z.string(),
    postalCode: z.string().optional(),
    country:    z.string(),
  }),
})

function generateOrderNumber(): string {
  return `DL-${Date.now().toString().slice(-6)}-${Math.random().toString(36).slice(2, 5).toUpperCase()}`
}

export async function POST(req: NextRequest) {
  try {
    const body   = await req.json()
    const parsed = OrderSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
    }

    const { items, shippingAddress } = parsed.data

    const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0)
    const shipping  = subtotal >= 200 ? 0 : 15
    const total     = subtotal + shipping

    // Try to save to DB
    // const { prisma } = await import('@/lib/prisma')
    // const order = await prisma.order.create({ data: { ... } })

    const order = {
      id:             `ord_${Date.now()}`,
      orderNumber:    generateOrderNumber(),
      status:         'PENDING',
      subtotal,
      shipping,
      tax:            0,
      total,
      currency:       'EUR',
      shippingAddress,
      createdAt:      new Date().toISOString(),
    }

    // Send WhatsApp notification to admin
    await notifyAdminWhatsApp(order, items)

    return NextResponse.json({ data: order }, { status: 201 })
  } catch (error) {
    console.error('Order creation error:', error)
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
  }
}

async function notifyAdminWhatsApp(order: any, items: any[]) {
  const WA_TOKEN    = process.env.WHATSAPP_ACCESS_TOKEN
  const WA_PHONE_ID = process.env.WHATSAPP_PHONE_NUMBER_ID
  const ADMIN_PHONE = process.env.WHATSAPP_PHONE_NUMBER

  if (!WA_TOKEN || !WA_PHONE_ID || !ADMIN_PHONE) return

  const itemsList = items.map((i) => `• ${i.name} x${i.quantity} = ${(i.price * i.quantity).toFixed(0)}€`).join('\n')
  const message   = `🛍️ *Nouvelle commande AFEFLUXE!*\n\n📋 *${order.orderNumber}*\n\n${itemsList}\n\n💰 Total: ${order.total}€\n\n👤 ${order.shippingAddress.firstName} ${order.shippingAddress.lastName}\n📧 ${order.shippingAddress.email}`

  try {
    await fetch(`https://graph.facebook.com/v18.0/${WA_PHONE_ID}/messages`, {
      method:  'POST',
      headers: {
        Authorization:  `Bearer ${WA_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to:               ADMIN_PHONE.replace(/\D/g, ''),
        type:             'text',
        text:             { body: message },
      }),
    })
  } catch (e) {
    console.warn('WhatsApp notification failed:', e)
  }
}

export async function GET(req: NextRequest) {
  // In production: auth check + fetch from DB
  return NextResponse.json({ data: [], total: 0 })
}

import { NextRequest, NextResponse } from 'next/server'

interface CheckoutItem {
  productId: string
  quantity:  number
  price:     number
  name:      string
  image:     string
}

export async function POST(req: NextRequest) {
  try {
    const { items, shippingAddress, total } = await req.json()

    const STRIPE_KEY = process.env.STRIPE_SECRET_KEY

    if (!STRIPE_KEY || STRIPE_KEY.startsWith('sk_test_placeholder')) {
      // ── Dev mode: skip Stripe ────────────────────────
      return NextResponse.json({
        success: true,
        orderId: `ORD-${Date.now()}`,
        message: 'Order simulated (no Stripe key configured)',
      })
    }

    // ── Real Stripe checkout ─────────────────────────
    const Stripe     = (await import('stripe')).default
    const stripe     = new Stripe(STRIPE_KEY, { apiVersion: '2023-10-16' })
    const appUrl     = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

    const lineItems = (items as CheckoutItem[]).map((item) => ({
      price_data: {
        currency:     'eur',
        product_data: {
          name:   item.name,
          images: [item.image],
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }))

    // Add shipping if < 200€
    if (total < 200) {
      lineItems.push({
        price_data: {
          currency:     'eur',
          product_data: { name: 'Livraison standard', images: [] },
          unit_amount:  1500,
        },
        quantity: 1,
      })
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items:           lineItems,
      mode:                 'payment',
      success_url:          `${appUrl}/checkout?success=true`,
      cancel_url:           `${appUrl}/checkout?cancelled=true`,
      metadata:             {
        customerEmail: shippingAddress.email,
        customerName:  `${shippingAddress.firstName} ${shippingAddress.lastName}`,
      },
      customer_email: shippingAddress.email,
      shipping_address_collection: {
        allowed_countries: ['FR', 'TN', 'AE', 'MA', 'DZ', 'BE', 'CH', 'CA', 'GB', 'US'],
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json({ error: 'Checkout failed' }, { status: 500 })
  }
}

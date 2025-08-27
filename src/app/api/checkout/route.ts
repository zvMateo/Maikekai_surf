import { NextResponse } from 'next/server'
import { stripe } from '@/services/stripe'

interface RequestItem {
  name: string
  amount: number
  quantity: number
  currency?: string
}

export async function POST(req: Request) {
  const { items, email } = (await req.json()) as {
    items: RequestItem[]
    email?: string
  }

  const line_items = items.map(item => ({
    price_data: {
      currency: item.currency ?? 'usd',
      product_data: { name: item.name },
      unit_amount: item.amount,
    },
    quantity: item.quantity,
  }))

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items,
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cart`,
    customer_email: email,
  })

  return NextResponse.json({ url: session.url })
}

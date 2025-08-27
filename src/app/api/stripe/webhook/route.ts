import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { stripe } from '@/services/stripe'

export async function POST(req: Request) {
  const body = await req.text()
  const headerList = await headers()
  const signature = headerList.get('stripe-signature') ?? ''

  let event
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string,
    )
  } catch (err: any) {
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    // TODO: persist order and booking information
    console.log('Checkout completed', session.id)
  }

  return NextResponse.json({ received: true })
}

import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { stripe } from '@/services/stripe'
import { createClient } from '@/services/supabase/server'
import sgMail from '@sendgrid/mail'
import type Stripe from 'stripe'

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
    const session = event.data.object as Stripe.Checkout.Session

    const supabase = await createClient()

    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: session.metadata?.user_id,
        amount_total: session.amount_total,
        currency: session.currency,
        status: 'paid',
        stripe_session_id: session.id,
      })
      .select()
      .single()

    if (orderError) {
      console.error('Error inserting order:', orderError)
      return new NextResponse('Failed to save order', { status: 500 })
    }

    const { error: bookingError } = await supabase.from('bookings').insert({
      user_id: session.metadata?.user_id,
      product_id: session.metadata?.product_id,
      variant_id: session.metadata?.variant_id,
      start_date: session.metadata?.start_date,
      end_date: session.metadata?.end_date,
      participants: session.metadata?.participants
        ? Number(session.metadata.participants)
        : 1,
      total_price: session.amount_total,
      status: 'confirmed',
    })

    if (bookingError) {
      console.error('Error inserting booking:', bookingError)
      return new NextResponse('Failed to save booking', { status: 500 })
    }

    if (process.env.SENDGRID_API_KEY && session.customer_email) {
      sgMail.setApiKey(process.env.SENDGRID_API_KEY)
      try {
        await sgMail.send({
          to: session.customer_email,
          from: process.env.SENDGRID_FROM_EMAIL as string,
          subject: 'Confirmación de tu compra',
          text: 'Gracias por tu compra. Tu reserva está confirmada.',
        })
      } catch (emailError) {
        console.error('Error sending confirmation email:', emailError)
      }
    }

    console.log('Checkout completed', session.id)
  }

  return NextResponse.json({ received: true })
}

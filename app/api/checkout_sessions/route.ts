import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe';



export async function POST(req:Request) {
  try {
    const headersList = await headers()
    const origin = headersList.get('origin')
    const body = await req.json();
    const products = body.products || [];

    console.log(products)

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: products.map((product: any) => ({
        price_data: {
          currency: "gbp",
          product_data: {
            name: product.name,
            metadata: {
              app_product_id: product.id, 
            },
          },
          
          unit_amount: product.price*100,
        },
        quantity: 1,
        
      })),
      billing_address_collection: 'auto',
      shipping_address_collection: {
        allowed_countries: ['JP', 'GB'],
      },
      mode: 'payment',
      locale:'en',
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?canceled=true`,
    });
    return NextResponse.json({ url: session.url });
  } catch (err:any) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    )
  }
}
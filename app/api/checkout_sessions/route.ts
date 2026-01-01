import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: Request) {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");
    const body = await req.json();
    const products = body.products || [];
    const currency = body.currency.toLowerCase() || "gbp";
    const region = body.region 



    interface Product {
      id: string;
      name: string;
      priceGbp: number;
      priceJpy: number;
      priceEur: number;
      image?: string;
    }

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const userId = user?.id;



//地域に応じて送料が無料になる
let  shippingFee 
if (region==="JP") {
 const  totalAmount = products.map((p:Product)=>p.priceJpy).reduce((acc: any,cur: any)=>acc += cur)

 shippingFee  = (totalAmount >= 80000 ? 0 : 3000) 

 }else if (region==="EU") {
 const  totalAmount = products.map((p:Product)=>p.priceEur).reduce((acc: any,cur: any)=>acc += cur)

shippingFee = ( totalAmount >= 350 ? 0 : 15 *100 )
 }
 else if (region==="UK") {
 const  totalAmount = products.map((p:Product)=>p.priceGbp).reduce((acc: any,cur: any)=>acc += cur)

shippingFee = ( totalAmount >= 200 ? 0 : 8 *100)
 }
 else {
const  totalAmount = products.map((p:Product)=>p.priceGbp).reduce((acc: any,cur: any)=>acc += cur)

shippingFee = (totalAmount >= 400 ? 0 : 20 *100 )
 }


  

    const session = await stripe.checkout.sessions.create({
      line_items: products.map((product: Product) => {
        const price =
          currency === "jpy"
            ? product.priceJpy  
            : currency === "eur"
            ? (product.priceEur * 100)
            : (product.priceGbp * 100);

        return {
          price_data: {
            currency: currency,
            product_data: {
              name: product.name,
            },
            unit_amount: price , 
          },
          quantity: 1,
        };
      }),

       
      billing_address_collection: "auto",
      shipping_address_collection: {
        allowed_countries: [
           // Europe
    "GB", "FR", "DE", "IT", "ES", "NL", "BE", "CH", "SE", "NO", "FI", "IE", "AT", "DK", "PL", "PT", "CZ", "HU",

    // North America
    "US", "CA",

    // Oceania
    "AU", "NZ",

    // East Asia
    "JP", 
        ],
      },
       shipping_options: [
    {
      shipping_rate_data: {
        type: 'fixed_amount',
        fixed_amount: {
          amount: shippingFee ,
          currency: currency,
        },
        display_name: 'Shipping fee',
        // delivery_estimate: {
        //   minimum: {
        //     unit: 'business_day',
        //     value: 5,
        //   },
        //   maximum: {
        //     unit: 'business_day',
        //     value: 7,
        //   },
        // },
      },
    },
   
  ],
      metadata: {
        user_id: userId || null,
        products: JSON.stringify(
          products.map((p: Product) => ({
            id: p.id,
            name: p.name,
            price: 
        currency === "jpy"
          ? p.priceJpy
          : currency === "eur"
          ? p.priceEur
          : p.priceGbp  ,
      currency: currency.toUpperCase()
          }))
        ),
      
      },
      mode: "payment",
      locale: "en",
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?canceled=true`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    );
  }
}

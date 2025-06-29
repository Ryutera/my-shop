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

    console.log(products, "pu");

    interface Product {
      id: string;
      name: string;
      price: number;
      image: string;
    }

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const userId = user?.id;

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: products.map((product: any) => ({
        price_data: {
          currency: "gbp",
          product_data: {
            name: product.name,
          },

          unit_amount: product.price * 100,
        },
        quantity: 1,
      })),
      billing_address_collection: "auto",
      shipping_address_collection: {
        allowed_countries: ["JP", "GB"],
      },
      metadata: {
        user_id: userId || null,
        //メタデータは文字列のみ処理可能
        products: JSON.stringify(
          products.map((p: Product) => ({
            id: p.id,
            name: p.name,
            price: p.price,
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

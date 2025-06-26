import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { markProductAsSold } from "@/app/actions";

export async function POST(req: Request) {
  const body = await req.text(); 
  const sig = req.headers.get("stripe-signature")!;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;
console.log("webhook")
  let event;

  

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed", err);
    return new NextResponse("Webhook Error", { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any;

    const userId = session.metadata.user_id;
    
    const items = JSON.parse(session.metadata.products)
  console.log(items,"あいてむ")



    if (userId) {
        await prisma.order.create({
            data: {
              userId,
              items,
              total: session.amount_total,
              status: "completed",
            },
          });

          await prisma.cartItem.deleteMany({
            where:{
                userId
            }
          })
    }
    Promise.all(items.map((item:any)=> markProductAsSold(item.id)))
    
   
  }

  return new NextResponse("OK", { status: 200 });
}

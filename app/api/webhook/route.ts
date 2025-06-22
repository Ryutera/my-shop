import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.text(); 
  const sig = req.headers.get("stripe-signature")!;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event;

  console.log("aaa")

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed", err);
    return new NextResponse("Webhook Error", { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any;

    const userId = session.metadata.user_id;
    const items = session.metadata.product_ids

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
   
  }

  return new NextResponse("OK", { status: 200 });
}

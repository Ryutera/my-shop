import { stripe } from "@/lib/stripe";
import { CheckCircle, Package, CreditCard } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Stripe from "stripe";
import ClearCartItem from "@/components/ClearCartItem";

interface Props {
  searchParams: Promise<{ session_id?: string }>;
}

export default async function SuccessPage({ searchParams }: Props) {
  const sessionId = (await searchParams).session_id;

  try {
    const session = (await stripe.checkout.sessions.retrieve(sessionId!, {
      expand: ["line_items"],
    })) as Stripe.Checkout.Session;

    const items =
      session.line_items?.data.map((item) => {
        return {
          name: item.description,
          quantity: item.quantity,
          amount: item.amount_total,
          currency: session.currency,
        };
      }) || [];

    const totalAmount = session.amount_total || 0;

    const billingAddress = session.customer_details?.address;

    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
          <div className="container mx-auto max-w-2xl">
          {/* Success Header */}
          <div className="text-center mb-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Payment Completed!
            </h1>
            <p className="text-gray-600">Thank you for your order.</p>
          </div>

          {/* Order Summary */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                Order Summary
              </CardTitle>
              <CardDescription>Session ID: {sessionId}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {items.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <div>
                      <p className="font-medium">{item.name}</p>
                    </div>
                    <Badge variant="secondary">
                      {(item.amount / 100).toFixed(2)}{" "}
                      {item?.currency?.toUpperCase()}
                    </Badge>
                  </div>
                ))}

                <Separator />

                <div className="flex justify-between items-center font-semibold text-lg">
                  <span>Total</span>
                  <span>
                    {(totalAmount / 100).toFixed(2)}{" "}
                    {items[0].currency?.toUpperCase()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Info */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Payment Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div>
                    <p className="text-gray-500">Payment Method</p>
                    <p className="font-medium">
                      {session.payment_method_types?.[0] || "Card"}
                    </p>
                  </div>
                  {session.customer_details?.email && (
                    <div className="col-span-2">
                      <p className="text-gray-500">Email</p>
                      <p className="font-medium">
                        {session.customer_details.email}
                      </p>
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-gray-500">Billing Address</p>
                  <p className="font-medium">{billingAddress?.city}</p>
                  <p className="font-medium">{billingAddress?.line1}</p>
                  <p className="font-medium">{billingAddress?.line2}</p>
                  <p className="font-medium">{billingAddress?.postal_code}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link href="/">Return to Home</Link>
            </Button>
            {/* <Button variant="outline" asChild>
              <Link href="/orders">View Order History</Link>
            </Button> */}
          </div>
        </div>
     {/* Clearcart function need to be used on client component */}
        <ClearCartItem/>
      </div>
    );
  } catch (error) {
    console.error("Error retrieving session:", error);
  }
}

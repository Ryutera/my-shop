import { stripe } from "@/lib/stripe"
import { CheckCircle, Package, CreditCard } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type Stripe from "stripe"
import ClearCartItem from "@/components/ClearCartItem"

interface Props {
  searchParams: Promise<{ session_id?: string }>
}

export default async function SuccessPage({ searchParams }: Props) {
  const sessionId = (await searchParams).session_id

  try {
    const session = (await stripe.checkout.sessions.retrieve(sessionId!, {
      expand: ["line_items"],
    })) as Stripe.Checkout.Session

    const items =
      session.line_items?.data.map((item) => {
        return {
          name: item.description,
          quantity: item.quantity,
          amount: item.amount_total,
          currency: session.currency,
        }
      }) || []

    const totalAmount = session.amount_total || 0
    const billingAddress = session.customer_details?.address

    return (
      <div className="min-h-screen bg-gray-50 py-6 sm:py-12 px-3 sm:px-4">
        <div className="container mx-auto max-w-2xl">
          {/* Success Header */}
          <div className="text-center mb-6 sm:mb-8">
            <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 text-green-500 mx-auto mb-3 sm:mb-4" />
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Payment Completed!</h1>
            <p className="text-sm sm:text-base text-gray-600">Thank you for your order.</p>
          </div>

          {/* Order Summary */}
          <Card className="mb-4 sm:mb-6">
            <CardHeader className="pb-3 sm:pb-6">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <Package className="w-4 h-4 sm:w-5 sm:h-5" />
                Order Summary
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm break-all">Session ID: {sessionId}</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3 sm:space-y-4">
                {items.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-sm sm:text-base break-words">{item.name}</p>
                    </div>
                    <Badge variant="secondary" className="self-start sm:self-auto text-xs sm:text-sm">
                      {(item.amount / 100).toFixed(2)} {item?.currency?.toUpperCase()}
                    </Badge>
                  </div>
                ))}
                <Separator />
                <div className="flex justify-between items-center font-semibold text-base sm:text-lg">
                  <span>Total</span>
                  <span>
                    {(totalAmount / 100).toFixed(2)} {items[0].currency?.toUpperCase()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Info */}
          <Card className="mb-4 sm:mb-6">
            <CardHeader className="pb-3 sm:pb-6">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <CreditCard className="w-4 h-4 sm:w-5 sm:h-5" />
                Payment Information
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="space-y-3">
                  <div>
                    <p className="text-gray-500 text-xs sm:text-sm">Payment Method</p>
                    <p className="font-medium text-sm sm:text-base">{session.payment_method_types?.[0] || "Card"}</p>
                  </div>
                  {session.customer_details?.email && (
                    <div>
                      <p className="text-gray-500 text-xs sm:text-sm">Email</p>
                      <p className="font-medium text-sm sm:text-base break-all">{session.customer_details.email}</p>
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-gray-500 text-xs sm:text-sm">Billing Address</p>
                  <div className="space-y-1">
                    {billingAddress?.city && <p className="font-medium text-sm sm:text-base">{billingAddress.city}</p>}
                    {billingAddress?.line1 && (
                      <p className="font-medium text-sm sm:text-base">{billingAddress.line1}</p>
                    )}
                    {billingAddress?.line2 && (
                      <p className="font-medium text-sm sm:text-base">{billingAddress.line2}</p>
                    )}
                    {billingAddress?.postal_code && (
                      <p className="font-medium text-sm sm:text-base">{billingAddress.postal_code}</p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Button asChild className="w-full sm:w-auto">
              <Link href="/">Return to Home</Link>
            </Button>
            {/* <Button variant="outline" asChild className="w-full sm:w-auto bg-transparent">
              <Link href="/orders">View Order History</Link>
            </Button> */}
          </div>
        </div>

        {/* Clearcart function need to be used on client component */}
        <ClearCartItem />
      </div>
    )
  } catch (error) {
    console.error("Error retrieving session:", error)
  }
}

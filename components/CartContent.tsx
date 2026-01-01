"use client"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { useContext,  useState } from "react"
import NoCartContent from "./NoCartContent"

import Exchange from "./Exchange"
import CurrencyContext from "@/app/context/CurrencyContext"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog"
import CartContentForMobile from "./CartContentForMobile"
import { useProductState } from "@/app/context/UserProductStateProvider"

interface Product {
  sys: any
  id: string
  name: string
  priceGbp: number
  priceJpy: number
  priceEur: number
  thumbnail: any
}

interface ContentProps {
  cartItems?: any
  removeItem?: (id: string) => void
}

const CartContent = (props: ContentProps) => {
const router = useRouter()
const { cartItems } = props
const { currency } = useContext(CurrencyContext) ?? { currency: "GBP" }
const {region} =    useContext(CurrencyContext) ?? { region: "OTHER" }
const { removeCartItem } = useProductState()
const [loading,setLoading] = useState(false)

  const getPayment = async () => {
    try {
      const data = await axios.post("/api/checkout_sessions/", {
        products: cartItems,
        currency: currency,
        region:region
      })

      router.push(data.data.url)
    } catch (error) {
      console.error("Payment error:", error)
    }
  }


const handleRemoveCartItem = async (id: string) => {
setLoading(true)
  try {
    await Promise.resolve(removeCartItem(id))
   
  } catch (e) {
    console.error(e)
   
  } finally {
    setLoading(false)
  }
}


  const totalAmount = cartItems?.reduce((acc: number, curr: Product) => {
    if (currency === "JPY") {
      return (acc += curr.priceJpy)
    }
    if (currency === "EUR") {
      return (acc += curr.priceEur)
    } else {
      return (acc += curr.priceGbp)
    }
  }, 0 || 0)

  if (!cartItems || cartItems.length === 0) {
    return <NoCartContent />
  }

return (

   <div className="relative">
    {loading && (
      <div className="fixed inset-0 z-[60] grid place-items-center bg-white/80 backdrop-blur-sm">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-gray-400 border-solid" />
      </div>
    )}

    <div className={loading ? "pointer-events-none" : ""}>
    <div className="flex flex-col w-full gap-6">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">Your Cart</h2>
        <div className="text-lg text-gray-500">{cartItems.length} items</div>
      </div>


      {/* モバイル表示用 */}
      <CartContentForMobile cartitems={cartItems} currency={currency} totalAmount={totalAmount as number} removeCartItem={handleRemoveCartItem} />
      {/* PC表示用 */}
      <div className="hidden md:block border border-gray-200 rounded-xl overflow-hidden bg-white shadow lg:p-10">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-gray-200">
              <TableHead className="font-semibold text-gray-900 text-lg py-5 lg:pl-12 text-left">Product</TableHead>
              <TableHead className="w-18"></TableHead>
              <TableHead className="font-semibold text-gray-900 text-lg py-5 px-6 text-left">Price</TableHead>
              <TableHead className="w-16 py-5 px-6"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cartItems.map((cartitem: Product, index: number) => (
              <TableRow key={cartitem.id || index} className="border-b border-gray-100 last:border-b-0">
                <TableCell className="text-gray-900 text-lg py-5 px-6 hover:text-blue-500">
                  <div className="flex items-center gap-8">
                    <img
                      src={`${cartitem?.thumbnail?.fields.file.url}?fm=webp&w=800&h=1200&fit=thumb`}
                      alt={cartitem.name}
                      loading="lazy"
                      className="w-[15%] h-[15%] object-cover border border-gray-200 flex-shrink-0 transition-transform duration-200 hover:scale-[1.03]"
                    />
                    <Link href={`/product/${cartitem.id}`}>
                      <p className="text-lg">{cartitem.name}</p>
                    </Link>
                  </div>
                </TableCell>
                <TableCell className="text-gray-900 text-lg py-5 px-6"></TableCell>
                <TableCell className="text-gray-900 text-lg py-5 px-6">
                  <Exchange priceEur={cartitem?.priceEur} priceJpy={cartitem?.priceJpy} priceGbp={cartitem?.priceGbp} />
                </TableCell>
                <TableCell className="py-5 px-6">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-gray-100 text-gray-400 hover:text-gray-600"
                      >
                    <Trash2 className="h-5 w-5" />
                       
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Remove this item from your cart?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This item will be removed from your cart.（このアイテムはカートから削除されます）
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleRemoveCartItem(cartitem.id)}>Continue</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow className="bg-gray-50 border-t border-gray-200">
              <TableCell className="font-semibold text-gray-900 text-lg py-5 lg:pl-14">Total</TableCell>
              <TableCell className="font-semibold text-gray-900 text-lg py-5 px-6"></TableCell>
              <TableCell className="font-bold text-gray-900 text-lg py-5 px-6">
                {currency === "JPY"
                  ? `¥${totalAmount?.toLocaleString("JP")}`
                  : currency === "EUR"
                    ? `€${totalAmount?.toLocaleString("DE")}`
                    : `£${totalAmount?.toLocaleString("GB")}`}
              </TableCell>
              <TableCell className="py-5 px-6"></TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>

      <div className="flex justify-end mt-10">
        <Button
          size="lg"
          onClick={getPayment}
          className="bg-black text-white  px-8 py-3 md:px-10 md:py-6 hover:text-gray-600 hover:bg-white hover:border-2 hover:border-black  transition duration-400 "
          disabled={!cartItems || cartItems.length === 0}
        >
          Checkout
        </Button>
      </div>
    </div>
    </div>
  </div>
)
   

}

export default CartContent

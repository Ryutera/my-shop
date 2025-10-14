"use client"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { removeCartItemFromDB } from "@/app/actions"
import NoCartContent from "./NoCartContent"
import { useCart } from "@/app/context/CartContext"
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
  cartItems?: Product[]
  items?: any[]
  removeItem?: (id: string) => void
  userData?: any
}

const CartContent = (props: ContentProps) => {
  const router = useRouter()
  const { cartItems, items, removeItem, userData } = props
  const [localCartItems, setLocalCartItems] = useState<Product[]>(cartItems || [])
  const { refreshCart } = useCart() // Use the imported useCart hook
  const context = useContext(CurrencyContext)

  const currency = context?.currency

  useEffect(() => {
    if (cartItems) {
      setLocalCartItems(cartItems)
    }
  }, [cartItems])

  // ログイン状態を判定　!!はbooleanに変換するもの
  const isLoggedIn = !!cartItems

  const products = isLoggedIn ? localCartItems : items

  const getPayment = async () => {
    try {
      const data = await axios.post("/api/checkout_sessions/", {
        products: products,
        currency: currency,
      })

      router.push(data.data.url)
    } catch (error) {
      console.error("Payment error:", error)
    }
  }

  const handleRemoveItem = async (product: Product) => {
    if (isLoggedIn) {
      await removeCartItemFromDB(userData.identities[0].id, product.id)
      setLocalCartItems((prev) => prev.filter((item) => item.id !== product.id))
      refreshCart()
    } else {
      removeItem?.(product.id)
    }
  }

  const totalAmount = products?.reduce((acc: number, curr: Product) => {
    if (currency === "JPY") {
      return (acc += curr.priceJpy)
    }
    if (currency === "EUR") {
      return (acc += curr.priceEur)
    } else {
      return (acc += curr.priceGbp)
    }
  }, 0 || 0)

  if (!products || products.length === 0) {
    return <NoCartContent />
  }

  return (
    <div className="flex flex-col w-full gap-6">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">Your Cart</h2>
        <div className="text-lg text-gray-500">{products.length} items</div>
      </div>


{/* モバイル表示用 */}
      <CartContentForMobile products={products} currency={currency} totalAmount={totalAmount} handleRemoveItem={handleRemoveItem}/>

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
            {products.map((product: Product, index: number) => (
              <TableRow key={product.id || index} className="border-b border-gray-100 last:border-b-0">
                <TableCell className="text-gray-900 text-lg py-5 px-6 hover:text-blue-500">
                  <div className="flex items-center gap-8">
                    <img
                      src={`${product.thumbnail.fields.file.url}?fm=webp&w=800&h=1200&fit=thumb`}
                      alt={product.name}
                      loading="lazy"
                      className="w-[15%] h-[15%] object-cover border border-gray-200 flex-shrink-0 transition-transform duration-200 hover:scale-[1.03]"
                    />
                    <Link href={`/product/${product.id}`}>
                      <p className="text-lg">{product.name}</p>
                    </Link>
                  </div>
                </TableCell>
                <TableCell className="text-gray-900 text-lg py-5 px-6"></TableCell>
                <TableCell className="text-gray-900 text-lg py-5 px-6">
                  <Exchange priceEur={product?.priceEur} priceJpy={product?.priceJpy} priceGbp={product?.priceGbp} />
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
                        <AlertDialogAction onClick={() => handleRemoveItem(product)}>Continue</AlertDialogAction>
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
                  ? `¥${totalAmount.toLocaleString("JP")}`
                  : currency === "EUR"
                    ? `€${totalAmount.toLocaleString("DE")}`
                    : `£${totalAmount.toLocaleString("GB")}`}
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
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold"
          disabled={!products || products.length === 0}
        >
          Go to Payment
        </Button>
      </div>
    </div>
  )
}

export default CartContent

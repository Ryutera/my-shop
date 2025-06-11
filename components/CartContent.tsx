"use client"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { useEffect, useState } from "react"
import { removeCartItemFromDB } from "@/app/actions"
import NoCartContent from "./NoCartContent"
import { useCart } from "@/app/context/CartContext"

interface Product {
  sys: any
  id: string
  name: string
  price: number
}

interface ContentProps {
  cartItems?: Product[]
  items?: any[]
  removeItems?: (id: string) => void
  userData?: any
  
}


const CartContent = (props: ContentProps) => {
  const router = useRouter()
  const { cartItems, items, removeItems, userData } = props
  const [localCartItems, setLocalCartItems] = useState<Product[]>(cartItems || []);
  const {refreshCart} = useCart()

  
  useEffect(() => {
    if (cartItems) {
      setLocalCartItems(cartItems);
    }
  }, [cartItems]);

  // ログイン状態を判定　!!はbooleanに変換するもの
  const isLoggedIn = !!cartItems

  const products = isLoggedIn ? localCartItems : items


  const getPayment = async () => {
    try {
      const data = await axios.post("/api/checkout_sessions/", {
        products: products,
      })
      console.log(data.data)
      router.push(data.data.url)
    } catch (error) {
      console.error("Payment error:", error)
    }
  }

  

  const handleRemoveItem = async (product: Product) => {
   
    if (isLoggedIn) {
      // ログイン時：DBから削除
      //userIdとcsmID必要
      if (window.confirm("Do you want to remove this item?")){
        await removeCartItemFromDB(userData.identities[0].id, product.id)
        setLocalCartItems((prev) => prev.filter((item) => item.id !== product.id))
        refreshCart()
      }
     
      
      console.log(product)
    } else {
      // 非ログイン時：ローカル状態から削除
      removeItems?.(product.id)
    }

    
  }

  const totalAmount = products?.reduce((acc: number, cur: Product) => (acc += cur.price), 0) || 0

  if (!products || products.length === 0) {
    return (
      <NoCartContent/>
    )
  }

  return (
    <div className="flex flex-col w-full gap-6">
         <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">Your Cart</h2>
        <div className="text-lg text-gray-500">{products.length} items</div>
      </div>
      <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-gray-200">
              <TableHead className="font-semibold text-gray-900 text-lg py-5 px-6 text-left">Product</TableHead>
              <TableHead className="w-18"></TableHead>
              <TableHead className="font-semibold text-gray-900 text-lg py-5 px-6 text-left">Price</TableHead>
              <TableHead className="w-16 py-5 px-6"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product: Product, index: number) => (
              <TableRow key={product.id || index} className="border-b border-gray-100 last:border-b-0">
                <TableCell className="text-gray-900 text-lg py-5 px-6 hover:text-blue-500">
                  <Link href={`/product/${product.id}`}>{product.name}</Link>
                </TableCell>
                <TableCell className="text-gray-900 text-lg py-5 px-6"></TableCell>
                <TableCell className="text-gray-900 text-lg py-5 px-6">${product?.price.toFixed(2)}</TableCell>
                <TableCell className="py-5 px-6">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-gray-100 text-gray-400 hover:text-gray-600"
                    onClick={() => handleRemoveItem(product)}
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow className="bg-gray-50 border-t border-gray-200">
              <TableCell className="font-semibold text-gray-900 text-lg py-5 px-6">Total</TableCell>
              <TableCell className="font-semibold text-gray-900 text-lg py-5 px-6"></TableCell>
              <TableCell className="font-bold text-gray-900 text-lg py-5 px-6">${totalAmount.toFixed(2)}</TableCell>
              <TableCell className="py-5 px-6"></TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>

      <div className="flex justify-end">
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

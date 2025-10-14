import { Trash2 } from 'lucide-react'
import React from 'react'
import Exchange from './Exchange'
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
import { Button } from './ui/button'
import Link from 'next/link'

interface Product {
  sys: any
  id: string
  name: string
  priceGbp: number
  priceJpy: number
  priceEur: number
  thumbnail: any
}

interface Props{
    products:Product[]
    currency:any
    totalAmount:number
    handleRemoveItem:(product:Product)=>void
}


const CartContentForMobile = ({products,currency,totalAmount, handleRemoveItem}:Props) => {
  return (
   <>
   {/* モバイル用合計 */}
      <div className="md:hidden flex flex-col gap-3">
        {products.map((product: Product, index: number) => (
          <div key={product.id || index} className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
            <div className="flex gap-3">
              {/* 商品画像 */}
              <div className="flex-shrink-0">
                <img
                  src={`${product.thumbnail.fields.file.url}?fm=webp&w=200&h=300&fit=thumb`}
                  alt={product.name}
                  className="w-20 h-20 object-contain rounded bg-gray-50 border border-gray-100"
                />
              </div>

              {/* 商品情報 */}
              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <Link href={`/product/${product.id}`}>
                  <h3 className="text-sm font-medium text-gray-900 hover:text-blue-500 line-clamp-2 mb-1">
                    {product.name}
                  </h3>
                </Link>
                <div className="text-base font-semibold text-gray-900">
                  <Exchange priceEur={product?.priceEur} priceJpy={product?.priceJpy} priceGbp={product?.priceGbp} />
                </div>
              </div>

              {/* 削除ボタン */}
              <div className="flex-shrink-0">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 hover:bg-gray-100 text-gray-400 hover:text-gray-600"
                    >
                      <Trash2 className="h-4 w-4" />
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
              </div>
            </div>
          </div>
        ))}

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-2">
          <div className="flex justify-between items-center">
            <span className="text-base font-semibold text-gray-900">Total</span>
            <span className="text-lg font-bold text-gray-900">
              {currency === "JPY"
                ? `¥${totalAmount.toLocaleString("JP")}`
                : currency === "EUR"
                  ? `€${totalAmount.toLocaleString("DE")}`
                  : `£${totalAmount.toLocaleString("GB")}`}
            </span>
          </div>
        </div>
      </div>
      </>
  )
}

export default CartContentForMobile

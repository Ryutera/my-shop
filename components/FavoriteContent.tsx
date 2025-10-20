"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import { Button } from "./ui/button"
import {ShoppingCartIcon, Trash2 } from "lucide-react"

import NoFavoriteContent from "./NoFavoriteContent"
import Exchange from "./Exchange"
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
interface FavoriteContentProps {
  products: Product[]
}

const FavoriteContent = ({ products }: FavoriteContentProps) => {
  const { addFavorite,addCartItem} = useProductState()

  return products.length !== 0 ? (
    <div className="flex flex-col w-full gap-6">
      <div className="mb-8 flex items-center justify-between flex-col md:flex-row">
        <h2 className="text-2xl font-semibold text-gray-900">Your Favorite Items</h2>
        <div className="text-lg text-gray-500 ">{products.length} items</div>
      </div>


      {/* モバイル表示用 */}
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

                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 hover:bg-gray-100 text-gray-400 hover:text-gray-600"
                  onClick={() => addFavorite(product.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>

              </div>
            </div>
          </div>
        ))}
      </div>



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

                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-gray-100 text-gray-400 hover:text-gray-600"
                   onClick={()=>addCartItem(product.id)}
                    >
                      
                    <ShoppingCartIcon />
                  </Button>


                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-gray-100 text-gray-400 hover:text-gray-600"
                    onClick={() => addFavorite(product.id)}
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>

                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  ) : (
    <NoFavoriteContent />
  )
}

export default FavoriteContent

"use client"
import React, { useEffect, useState } from 'react'
import { useCart } from '../context/CartContext'
import { Product, ProductFields } from '@/lib/types'
import { getProduct } from '../actions'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ShoppingCart, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const Cart = () => {
    const {items,removeItem} = useCart()
    const [products, setProducts] = useState<ProductFields[]>([])

    useEffect(() => {
        const fetchProducts = async () => {
          const results = await Promise.all(
            items.map((id) =>getProduct(id))
          )
          setProducts(results.filter(Boolean)) // null を除外
        }
    
        fetchProducts()
      }, [items])
    
      console.log(products,"プロダクト")
console.log(items,"データ群")

const totalAmount = products.reduce((acc,cur)=>(
  acc += cur.price
),0)



    
  return (
    <div className="max-w-3xl mx-auto p-6 md:p-10">
    <div className="mb-8 flex items-center justify-between">
      <h2 className="text-2xl font-semibold text-gray-900">Your Cart</h2>
      <div className="text-lg text-gray-500">{products.length} items</div>
    </div>
  
    {products.length > 0 ? (
      <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-gray-200">
              <TableHead className="font-semibold text-gray-900 text-lg py-5 px-6 text-left">Product</TableHead>
              <TableHead className="w-18"></TableHead> {/* ← to make gap */}
              <TableHead className="font-semibold text-gray-900 text-lg py-5 px-6 text-left">Price</TableHead>
              <TableHead className="w-16 py-5 px-6"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product, index) => (
              <TableRow key={index} className="border-b border-gray-100 last:border-b-0">
                <Link href={`/product/${items[index]}`}>
                <div>
                <TableCell className="text-gray-900 text-lg py-5 px-6 hover:text-blue-500">{product.name}</TableCell>
                </div>
                </Link>
                <TableCell className="text-gray-900 text-lg py-5 px-6"></TableCell>
                <TableCell className="text-gray-900 text-lg py-5 px-6">${product.price.toFixed(2)}</TableCell>
                <TableCell className="py-5 px-6">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-gray-100 text-gray-400 hover:text-gray-600"
                    onClick={()=>removeItem(items[index])}
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
    ) : (
      <div className="border border-gray-200 rounded-lg bg-white p-16 text-center">
        <div className="flex flex-col items-center justify-center gap-6">
          <div className="bg-gray-50 p-5 rounded-full">
            <ShoppingCart className="h-10 w-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-medium text-gray-900">Your cart is empty</h3>
          <p className="text-gray-500 text-base">Add some products to your cart to see them here.</p>
        </div>
      </div>
    )}
  </div>
  )
}

export default Cart
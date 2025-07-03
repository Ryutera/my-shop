"use client"

import { Table, TableBody, TableCell,TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from 'next/link'
import { Button } from './ui/button'
import { Trash2 } from 'lucide-react'
import { useCart } from "@/app/context/CartContext"
import NoFavoriteContent from "./NoFavoriteContent"


type Props ={
    products:any
}
const FavoriteContent = (props:Props) => {
 const {addFavorite} = useCart()
const {products} = props   


  return (

    products.length!==0? <div className="flex flex-col w-full gap-6">
    <div className="mb-8 flex items-center justify-between">
   <h2 className="text-2xl font-semibold text-gray-900">Your Favorite Items</h2>
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
     
    {products.map((product: any, index: number) => (
      <TableRow key={product.id || index} className="border-b border-gray-100 last:border-b-0">
        <TableCell className="text-gray-900 text-lg py-5 px-6 hover:text-blue-500">
          <Link href={`/product/${product.id}`}>{product.name}</Link>
        </TableCell>
        <TableCell className="text-gray-900 text-lg py-5 px-6"></TableCell>
        <TableCell className="text-gray-900 text-lg py-5 px-6">£{product?.price.toFixed(2)}</TableCell>
        <TableCell className="py-5 px-6">
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
</div>: 
   <NoFavoriteContent/>
  )
}

export default FavoriteContent
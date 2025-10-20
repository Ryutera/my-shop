"use client"

import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { useEffect, useState } from "react"
import { useCart } from "@/app/context/CartContext"



const ShoppingCartIcon = () => {
  const {cartItems} = useCart()
  const count = cartItems.length
  const [mounted,setMounted] = useState(false)

  


  // 読み込みが完了した時にのみバッジを表示する
  useEffect(()=>{setMounted(true)},[])
 

  return (
   

      mounted && count > 0 ? (
         <div className="relative inline-block hover:scale-110 transition-transform duration-200 cursor-pointer">
      <Link href="/cart" aria-label="Open cart ">
        <ShoppingCart className="w-6 h-6 text-gray-700" />
      </Link>
        <span
          className="absolute -top-1.5 -right-1.5 z-10
                     bg-red-400 text-white text-xs font-semibold
                     px-1.5 py-0.5 rounded-full border border-white z-30
                     min-w-[18px] h-[18px] flex items-center justify-center
                     leading-none shadow-sm pointer-events-none"
        >
          {count}
        </span>
         </div>
      ):
      (
        <div className="relative inline-block hover:scale-110 transition-transform duration-200 cursor-pointer">
      <Link href="/cart" aria-label="Open cart ">
        <ShoppingCart className="w-6 h-6 text-gray-700" />
      </Link>
       
         </div>
      )
   
  )
}

export default ShoppingCartIcon

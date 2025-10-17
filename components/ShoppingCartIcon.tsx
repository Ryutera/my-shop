"use client"

import { getCartItemsInDb } from '@/app/actions'
import { useCart } from '@/app/context/CartContext'
import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

interface ShoppingCartIconProps {
  userData?: { id: string }
}

const ShoppingCartIcon = ({ userData }:ShoppingCartIconProps)  => {
  const { items,cartVersion } = useCart()
  const [cartItems , setCartItems] = useState<any[]>([]) 
 const userId = userData?.id

  useEffect(()=>{
const searchCartItems =async() =>{
  if (userId) {
    const cartItemsInDb = await getCartItemsInDb(userId)
    setCartItems(cartItemsInDb)
  }else {
    setCartItems([]) // ログアウト時にバッジを消す
  }
  
}
searchCartItems ()

  },[cartVersion,userId,items])

  return (
   <div className="relative inline-block hover:scale-110 transition-transform duration-200 cursor-pointer">
    <Link href="/cart">
      <ShoppingCart className="w-6 h-6 text-gray-700" />
    </Link>
    
    {/* ログインユーザーの場合 */}
    {userId ? (
       // cartItems.length が 0 より大きい場合にのみ表示
       cartItems.length > 0 && (
         <span className="absolute -top-1.5 -right-1.5 
                        bg-red-500 text-white 
                        text-xs font-semibold 
                        px-1.5 py-0.5
                        rounded-full 
                        border border-white 
                        min-w-[18px] h-[18px] flex items-center justify-center 
                        leading-none 
                        shadow-sm 
                        ">
           {cartItems.length}
         </span>
       )
    ) : (
      // 未ログインユーザー（ローカルストレージなど）の場合
      items.length > 0 && (
        <span className="absolute -top-1.5 -right-1.5 
                       bg-red-500 text-white 
                       text-xs font-semibold 
                       px-1.5 py-0.5 
                       rounded-full 
                       border border-white 
                       min-w-[18px] h-[18px] flex items-center justify-center 
                       leading-none 
                       shadow-sm
                       ">
          {items.length}
        </span>
      )
    )}
</div>
  )
}

export default ShoppingCartIcon

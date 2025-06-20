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
      
      { userId?
       <span className="absolute -top-2 -right-2 bg-red-400 text-white text-xs font-bold px-2 py-0.5 rounded-full">
       {cartItems.length > 0 ? cartItems.length:0 }
     </span>
      :  
      items.length > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-400 text-white text-xs font-bold px-2 py-0.5 rounded-full">
          {items.length}
        </span>
      )}
    </div>
  )
}

export default ShoppingCartIcon

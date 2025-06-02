"use client"
import { useCart } from '@/app/context/cartContext'
import { ShoppingCart } from 'lucide-react'
import React from 'react'

const ShoppingCartIcon = () => {
  const { items } = useCart()

  return (
    <div className="relative inline-block hover:scale-110 transition-transform duration-200 cursor-pointer">
      <ShoppingCart className="w-6 h-6 text-gray-700" />
      
      {items.length > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-400 text-white text-xs font-bold px-2 py-0.5 rounded-full">
          {items.length}
        </span>
      )}
    </div>
  )
}

export default ShoppingCartIcon

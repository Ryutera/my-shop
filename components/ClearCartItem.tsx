"use client"
import { useCart } from '@/app/context/CartContext'
import React, { useEffect } from 'react'

const ClearCartItem = () => {
const {clearCart} = useCart()
    useEffect(()=>{
clearCart()
    },[])

  return null
  
}

export default ClearCartItem
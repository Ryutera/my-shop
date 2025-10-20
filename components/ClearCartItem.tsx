"use client"
import { useCart } from '@/app/context/UserProductStateProvider'
import React, { useEffect } from 'react'

const ClearCartItem = () => {
const {clearCart} = useCart()
    useEffect(()=>{
clearCart()
    },[])

  return null
  
}

export default ClearCartItem
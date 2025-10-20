"use client"

import { useProductState } from '@/app/context/UserProductStateProvider'
import React, { useEffect } from 'react'

const ClearCartItem = () => {
const {clearCart} = useProductState()
    useEffect(()=>{
clearCart()
    },[])

  return null
  
}

export default ClearCartItem
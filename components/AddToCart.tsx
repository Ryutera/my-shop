"use client"
import React, { useState } from 'react'
import { Button } from './ui/button'
import {  useCart } from '@/app/context/CartContext'
import { ProductFields } from '@/lib/types'

interface Type{
  productData:ProductFields,
id:string
}


const AddToCart = (params:Type) => {
  const {  productData,id} = params
const [isAdded, setIsAdded] = useState(false)
const  {addItem,items} = useCart()

console.log(isAdded)


console.log(items)
  

    const addToCart = (id:string) =>{
      setIsAdded((prev:boolean)=> !prev)
      addItem(id)
    }
    
    
  return (
    <div className={`transition transform duration-300 translate-y-1 hover:scale-105 ${isAdded ? 'cursor-not-allowed': `cursor-pointer` } `}>
    <Button className={`w-full `} size="lg" onClick={()=>addToCart(id)} disabled={isAdded}>
     {isAdded? `Already added to Cart - £${productData.price}`:`Add to Cart - £${productData.price}` } 
    </Button>
  </div>
  )
}

export default AddToCart
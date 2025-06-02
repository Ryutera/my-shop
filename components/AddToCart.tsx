"use client"
import React, { useState } from 'react'
import { Button } from './ui/button'
import { Provider, useCart } from '@/app/context/cartContext'
import { Product } from '@/lib/types'


const AddToCart = (params:{productData:any}) => {
  const {productData} = params
const [isAdded, setIsAdded] = useState(false)
const  {addItem,items} = useCart()

console.log(isAdded)


console.log(items)
  

    const addToCart = (productData:Product) =>{
      setIsAdded((prev:boolean)=> !prev)
      addItem(productData)
    }
    
    
  return (
    <div className={`transition transform duration-300 translate-y-1 hover:scale-105 ${isAdded ? 'cursor-not-allowed': `cursor-pointer` } `}>
    <Button className={`w-full `} size="lg" onClick={()=>addToCart(productData)} disabled={isAdded}>
     {isAdded? `Already added to Cart - £${productData.price}`:`Add to Cart - £${productData.price}` } 
    </Button>
  </div>
  )
}

export default AddToCart
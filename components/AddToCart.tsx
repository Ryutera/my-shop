"use client"
import React, { useState } from 'react'
import { Button } from './ui/button'

const AddToCart = (params:{productData:any}) => {
const [isAdded, setIsAdded] = useState(false)
console.log(isAdded)

    const {productData} = params

    const addToCart = () =>{
      setIsAdded((prev:boolean)=> !prev)
    }
    
    
  return (
    <div className={`transition transform duration-300 translate-y-1 hover:scale-105 ${isAdded ? 'cursor-not-allowed': `cursor-pointer` } `}>
    <Button className={`w-full `} size="lg" onClick={addToCart} disabled={isAdded}>
     {isAdded? `Already added to Cart - £${productData.price}`:`Add to Cart - £${productData.price}` } 
    </Button>
  </div>
  )
}

export default AddToCart
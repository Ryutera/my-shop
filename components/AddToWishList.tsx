"use client"
import React from 'react'
import { Button } from './ui/button'
import { Heart } from 'lucide-react'
import { useCart } from '@/app/context/CartContext'

interface Props{
    id:string
}

const AddToWishList = (props:Props) => {
    const {id} = props
    const {favorite,addFavorite} = useCart()
  return (
    <Button
    variant="outline"
    className="w-full transition transform duration-300 translate-y-1 hover:scale-105"
    onClick={()=>addFavorite(id)}
  >
    <Heart className="mr-2 h-4 w-4" 
    color={favorite.find((f)=>f===id) ? "red" : "gray"} />
    Add to Wishlist
  </Button>
  )
}

export default AddToWishList
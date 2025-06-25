"use client"
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Heart } from 'lucide-react'
import { useCart } from '@/app/context/CartContext'
import { isFavoriteInDatabase } from '@/app/actions'

interface Props{
    id:string
    userData: any
}

const AddToWishList = (props:Props) => {
    const {id,userData} = props
    const {favorite,addFavorite} = useCart()
    const [isFavorited, setIsFavorited] = useState<any>(false);
   
    
   
   useEffect(()=>{
    const getFavoriteItemFromDatabase = async(id:string) =>{
        const favoriteItem = await  isFavoriteInDatabase(id,userData)
        
        setIsFavorited(favoriteItem)
    }
    getFavoriteItemFromDatabase(id)
   },[])

   

  return (
    <Button
    variant="outline"
    className="w-full transition transform duration-300 translate-y-1 hover:scale-105"
    onClick={()=>addFavorite(id)}
  >
    <Heart className="mr-2 h-4 w-4" 
    color={ isFavorited? "red" :   favorite.find((f)=>f===id) ? "red" : "gray"} />
    Add to Favoritelist
  </Button>
  )
}

export default AddToWishList
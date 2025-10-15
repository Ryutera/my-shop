"use client"
import { isFavoriteInDatabase } from '@/app/actions'
import { useCart } from '@/app/context/CartContext'
import { Heart } from 'lucide-react'
import { useEffect, useState } from 'react'

interface Props{
    id:string
    data:any
}


const FavoriteButton = (props:Props) => {
    const {id,data} = props
   const {favorite,addFavorite } =useCart()
  




//    useEffect(()=>{
//     const getFavoriteItemFromDatabase = async(id:string) =>{
//         const favoriteItem = await  isFavoriteInDatabase(id,data)

       
//        if (favoriteItem) {
//            addFavorite(favoriteItem?.cmsItemId)
//         }
       
//     }
//     getFavoriteItemFromDatabase(id)
//    },[])

  return (
    <div className="hover:cursor-pointer" onClick={()=>addFavorite(id)}>
        {/* ログイン時にはデータベースの情報に基づいて色を変更する */}
  <Heart   color={ favorite.find((f)=>f===id) ? "red" : "gray" }  />
  </div>
  )
}

export default FavoriteButton
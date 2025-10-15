"use client"

import { useCart } from '@/app/context/CartContext'
import { Heart } from 'lucide-react'

interface Props{
    id:string
   
}


const FavoriteButton = (props:Props) => {
    const {id} = props
   const {favorite,addFavorite } =useCart()
  


  return (
    <div className="hover:cursor-pointer" onClick={()=>addFavorite(id)}>
        {/* ログイン時にはデータベースの情報に基づいて色を変更する */}
  <Heart   color={ favorite.find((f)=>f===id) ? "red" : "gray" }  />
  </div>
  )
}

export default FavoriteButton
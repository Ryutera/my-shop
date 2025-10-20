"use client"


import { useProductState } from '@/app/context/UserProductStateProvider'
import { Heart } from 'lucide-react'

interface Props{
    id:string
   
}


const FavoriteButton = (props:Props) => {
    const {id} = props
   const {favorite,addFavorite } =useProductState()
  


  return (
    <div className="hover:cursor-pointer" onClick={()=>addFavorite(id)}>
        {/* ログイン時にはデータベースの情報に基づいて色を変更する */}
  <Heart  className='y-4 w-4 md:y-5 md:w-5 ' color={ favorite.find((f)=>f===id) ? "red" : "gray" }  />
  </div>
  )
}

export default FavoriteButton
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
  
   
  //  FavoriteButtonでデータベースの情報を元にfavoriteの値を変更するロジックが走っている。これを走らせると多分同じidが重複して登録することで逆に外れてしまう。しかし顧客が何かしらの理由でurlを登録していて直接この/[id]のページに遷移した場合はデータベース情報の参照が行われない？
  //  useEffect(()=>{
  //   const getFavoriteItemFromDatabase = async(id:string) =>{
  //       const favoriteItem = await  isFavoriteInDatabase(id,userData)
  //       if (favoriteItem) {
  //          addFavorite(favoriteItem?.cmsItemId)
  //       }
       
  //   }
  //   getFavoriteItemFromDatabase(id)
  //  },[])



   

  return (
    <Button
    variant="outline"
    className="w-full transition transform duration-300 translate-y-1 hover:scale-105"
    onClick={()=>addFavorite(id)}
  >
    <Heart className="mr-2 h-4 w-4" 
    color={ favorite.find((f)=>f===id) ? "red" : "gray"} />
    Add to Favoritelist
  </Button>
  )
}

export default AddToWishList
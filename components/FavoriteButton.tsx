"use client"
import { Heart } from 'lucide-react'
import React, { useState } from 'react'

const FavoriteButton = () => {
    const [isAdded, setIsAdded] = useState(false)

  return (
    <div className="hover:cursor-pointer" onClick={()=>setIsAdded((prev)=>!prev)}>
  <Heart   color={isAdded ? "red" : "gray"}  />
  </div>
  )
}

export default FavoriteButton
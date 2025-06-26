import Link from 'next/link'
import React from 'react'
import FavoriteButton from './FavoriteButton'
import { createClient } from '@/utils/supabase/server'


const Product = async({cloth}:{cloth:any}) => {
  const supabase = await createClient()
  const { data } =  await  supabase.auth.getUserIdentities()

  return (
    <div className="flex flex-col h-full max-w-sm mx-auto sm:max-w-none sm:mx-0 p-3 sm:p-4">
        
        <Link href={`/product/${cloth.sys.id}`}>
        <div className="transition transform duration-300 hover:-translate-y-2 hover:shadow-2xl shadow-lg hover:scale-105 hover:cursor-pointer mx-2 mb-2">
            <img src={cloth.fields.thumbnail.fields.file.url} alt="" 
           className="w-full aspect-[3/5] sm:aspect-[2/3] object-cover rounded-t-lg"
            />
            </div>
            </Link>
  
            <div className="mt-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0 px-1">
  <p>{cloth.fields.name}</p>
  <div className="flex flex-row gap-2">
  {cloth.fields.isSoldOut?  <p>Sold Out</p> :  <p>£{cloth.fields.price}</p>}


  <FavoriteButton id={cloth.sys.id} data={data}/>

  </div>


  </div>
</div>

  )
}

export default Product
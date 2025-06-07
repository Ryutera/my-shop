import Link from 'next/link'
import React from 'react'
import FavoriteButton from './FavoriteButton'
import { createClient } from '@/utils/supabase/server'


const Product = async({cloth}:{cloth:any}) => {
  const supabase = await createClient()
  const { data } =  await  supabase.auth.getUserIdentities()

  return (
    <div>
        <Link href={`/product/${cloth.sys.id}`}>
    <div className='transition transform duration-300 hover:-translate-y-2 hover:shadow-2xl shadow-lg hover:scale-105 hover:cursor-pointer'>
            <img src={cloth.fields.thumbnail.fields.file.url} alt="" className="h-[400px] "/>
            </div>
            </Link>
  
  <div className="mt-3 justify-between flex"> 
  <p>{cloth.fields.name}</p>
  <div className="flex flex-row gap-2">
  <p>£{cloth.fields.price}</p>

  <FavoriteButton id={cloth.sys.id} data={data}/>

  </div>


  </div>
</div>

  )
}

export default Product
"use client"
import Link from 'next/link'
import FavoriteButton from './FavoriteButton'
import Exchange from './Exchange'
import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'



const Product = ({ cloth }: { cloth: any }) => {
  const supabase = createClient()
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {

    supabase.auth.getUser().then(({ data }) => setUserData(data.user));
  }, [supabase]);

  return (
    <div className="flex flex-col h-full max-w-sm mx-auto sm:max-w-none sm:mx-0 p-1 sm:p-4">

      <Link href={`/product/${cloth.sys.id}`}>

        <div className="overflow-hidden  mx-2 mb-2 shadow-lg transition-transform duration-300 hover:shadow-2xl cursor-pointer">
          <img
            src={`${cloth.fields.thumbnail.fields.file.url}?fm=webp&w=800&h=1200&fit=thumb`}
            alt=""
            loading="lazy"
            className="w-full aspect-[3/5.5] sm:aspect-[2/3] object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      </Link>

      <div className="mt-4 flex flex-col items-center gap-2 sm:justify-between  sm:gap-1 px-1 md:text-[0.8rem] text-[0.7rem] tracking-[0.1em] md:tracking-[0.2em] sm:text-sm sm:text-base">
        <div className='text-center'>
          <p>{cloth.fields.name}</p>
        </div>

        <div className="flex flex-row gap-2 justify-center items-center text-gray-600">
          {cloth.fields.isSoldOut ? <p>Sold Out</p> : <p><Exchange
            priceJpy={cloth.fields.priceJpy}
            priceEur={cloth.fields.priceEur}
            priceGbp={cloth.fields.priceGbp} /></p>}


          <FavoriteButton id={cloth.sys.id} />

        </div>


      </div>
    </div>

  )
}

export default Product

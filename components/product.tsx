import Link from 'next/link'
import React from 'react'

const Product = ({cloth}:{cloth:any}) => {
    
  
  return (
    <div>
        <Link href={`/product/${cloth.sys.id}`}>
    <div className='transition transform duration-300 hover:-translate-y-2 hover:shadow-2xl shadow-lg hover:scale-105 hover:cursor-pointer'>
            <img src={cloth.fields.thumbnail.fields.file.url} alt="" className="h-[400px] "/>
            </div>
            </Link>
  
  <div className="mt-3 justify-between flex"> 
  <p>{cloth.fields.name}</p>
  <p>{cloth.fields.price}</p>
  </div>
</div>

  )
}

export default Product

import { getProduct } from '@/app/actions'

import React from 'react'
   

  
const ProductPage = async ({
    params,
  }: {
    params: Promise<{ id: string }>;
  }) => {

    const {id} = await params

    const productData = await getProduct(id)

    console.log(productData,"出たー")


    if (!productData ) {
        console.log("商品データがない")
        return(
          <div>There is no product</div>
        ) 
      }
      
    
  return (
    <div className="flex flex-row col-2 ">
        <div>
        <img src={productData.thumbnail.fields.file?.url as string} alt="" className="h-[400px] "/>
        </div>
        <div></div>
    </div>
  )
}

export default ProductPage
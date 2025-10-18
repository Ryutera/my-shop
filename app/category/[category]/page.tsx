import { getProductsByCategory } from '@/app/actions'
import ProductsGrid from '@/components/ProductsGrid'
import React from 'react'

const page = async({params}:{params:Promise<{category:string}>}) => {
    const {category} = await params
    const ItemsByCategory = await getProductsByCategory(category)
    if (!ItemsByCategory) {
        <div>該当アイテムがありません</div>
    }
  return (
    <div>
     <ProductsGrid items={ItemsByCategory ?? []} />
    </div>
  )
}

export default page

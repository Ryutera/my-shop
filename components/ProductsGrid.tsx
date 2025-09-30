"use client"
import React, { useContext } from 'react'
import Product from "@/components/product";
import SearchContext from '@/app/context/SearchContext';
import { Entry } from 'contentful';

type ProductsGridProps = { items: Entry<any>[] };

const ProductsGrid = ({ items }: ProductsGridProps) => {

    const { searchedWord } = useContext(SearchContext)
  const filteredItems = searchedWord
  ? items.filter((i) =>
      String(i.fields?.name ?? "").toLowerCase().includes(searchedWord.toLowerCase())
    )
  : items;

    return (
        filteredItems.length === 0? <div>ヒットしません</div>  : 
        <>
            {filteredItems.map((item) => (
                <Product cloth={item} key={item.sys.id} />
            ))}
        </>
    )
}

export default ProductsGrid

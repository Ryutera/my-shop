"use client"
import React, { useContext } from 'react'
import Product from "@/components/product";
import SearchContext from '@/app/context/SearchContext';
import { Entry } from 'contentful';
import NoResults from './NoResults';

type ProductsGridProps = { items: Entry<any>[] };

const ProductsGrid = ({ items }: ProductsGridProps) => {

  const { searchedWord } = useContext(SearchContext)
  const filteredItems = searchedWord
    ? items.filter((i) =>
      String(i.fields?.name ?? "").toLowerCase().includes(searchedWord.toLowerCase())
    )
    : items;

  return (
    filteredItems.length === 0 ?
      <div className="flex justify-center items-center w-full min-h-[50vh]">
        <NoResults word={searchedWord} />
      </div> :
      <>
        <main className="grid grid-cols-2
            lg:grid-cols-3 gap-1 md:gap-6  md:px-4">
          {/* <h2 className="font-medium text-xl mb-4">Next steps</h2>
        {hasEnvVars ? <SignUpUserSteps /> : <ConnectSupabaseSteps />} */}

          {filteredItems.map((item) => (
            <Product cloth={item} key={item.sys.id} />
          ))}
        </main>
      </>
  )
}

export default ProductsGrid

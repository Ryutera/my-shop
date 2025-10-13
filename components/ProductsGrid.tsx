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
    <>
{filteredItems.length === 0 ? (
  <div className="flex justify-center items-center w-full min-h-[50vh]">
    <NoResults word={searchedWord} />
  </div>
) : (
  <section className="mx-auto max-w-6xl px-3 md:px-6">
    <header className="mb-5 md:mb-7 flex items-end justify-between">
      <h2 className="text-xl md:text-2xl px-3 sm:px-10 ">
        NEW ARRIVALS
         <span className="ml-2 text-xs md:text-sm text-gray-500">新着</span>
      </h2>

      <div className="ml-4 h-px flex-1 bg-gradient-to-r from-gray-300/70 to-transparent" />
    </header>

    <main
      className="grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-6"
      aria-label="New arrivals product grid"
    >
      {filteredItems.map((item) => (
        <Product cloth={item} key={item.sys.id} />
      ))}
    </main>
  </section>
)}
</>

  )
}

export default ProductsGrid

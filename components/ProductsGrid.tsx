"use client"
import React, { useContext, useMemo } from 'react'
import Product from "@/components/product";
import SearchContext from '@/app/context/SearchContext';
import { Entry } from 'contentful';
import NoResults from './NoResults';

type ProductsGridProps = {
   items: Entry<any>[]
   label:string

};

const ProductsGrid = ({ items, label }: ProductsGridProps) => {

  const { searchedWord } = useContext(SearchContext)
 

    const filteredItems = useMemo(() => {
  if (!searchedWord) return items;
  const q = searchedWord.toLowerCase();
  return items.filter((i) =>
    String(i.fields?.name ?? "").toLowerCase().includes(q)
  );
}, [items, searchedWord]);

  return (
    <>
{filteredItems.length === 0 ? (
  <div className="flex justify-center items-center w-full min-h-[50vh]">
    <NoResults  />
  </div>
) : (
  <section className="mx-auto max-w-6xl px-3 md:px-6">
    <header className="mb-8 md:mb-10">
  <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 sm:gap-4">
    <h2 className="px-1 sm:px-10 text-lg sm:text-2xl leading-tight tracking-[0.01em] text-center">
      <span className="uppercase ">{label}</span>
      {label === "NEW ARRIVALS" && (
        <span className="ml-1.5 sm:ml-2 text-[11px] sm:text-sm text-gray-500 align-baseline block md:inline pt-2 md">
          新着
        </span>
      )}
    </h2>

    {/* 区切り線はモバイルでは非表示、横幅を圧迫しない */}
    <div className="hidden sm:block ml-4 h-px flex-1 bg-gradient-to-r from-gray-300/70 to-transparent" />
  </div>
</header>

    <div
      className="grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-6 mt-10"
      aria-label={`${label} product grid`}
    >
      {filteredItems.map((item) => (
        <Product cloth={item} key={item.sys.id} />
      ))}
    </div>
  </section>
)}
</>

  )
}

export default ProductsGrid

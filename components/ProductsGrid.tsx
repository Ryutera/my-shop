import Product from "@/components/product";
import { Entry } from 'contentful';

type ProductsGridProps = {
   items: Entry<any>[]
   label:string
};

const ProductsGrid = ({ items,label }: ProductsGridProps) => {



  return (
  <section className="mx-auto max-w-6xl px-3 md:px-6">
    <header className="mb-8 md:mb-10">

  <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 sm:gap-4">
    {label==="New Arrivals"?  
    <h2 className="px-1 sm:px-10 text-lg sm:text-2xl leading-tight tracking-[0.01em] text-center">
      <span className="uppercase ">NEW ARRIVALS</span>
        <span className="ml-1.5 sm:ml-2 text-[11px] sm:text-sm text-gray-500 align-baseline block md:inline pt-2 md">
          新着
        </span>
    </h2>: 
    <h2 className="px-1 sm:px-10 text-lg sm:text-2xl leading-tight tracking-[0.01em] text-center">
      <span>Result for "{label}"</span>
    </h2>
    
    }

    {/* 区切り線はモバイルでは非表示、横幅を圧迫しない */}
    <div className="hidden sm:block ml-4 h-px flex-1 bg-gradient-to-r from-gray-300/70 to-transparent" />
  </div>

</header>

    <div
      className="grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-6 mt-10"
      aria-label={`new arrivals product grid`}
    >
      {items.map((item) => (
        <Product cloth={item} key={item.sys.id} />
      ))}
    </div>
  </section>

  )
}

export default ProductsGrid

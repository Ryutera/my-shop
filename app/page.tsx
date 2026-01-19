

import NoResults from "@/components/NoResults";
import { getProductsFromContentful } from "./actions";
import ProductsGrid from "@/components/ProductsGrid";

export default async function Home() {

  const items = await getProductsFromContentful()

  if (!items) {
    console.log("no clothes data")
  }


  return (
    
    <>
{items.length === 0 ? (
  <div className="flex justify-center items-center w-full min-h-[50vh]">
    <NoResults  />
  </div>
) : (
  <>

   <ProductsGrid items={items} label={"New Arrivals"}/>
   </>
)}
</>

  );
}

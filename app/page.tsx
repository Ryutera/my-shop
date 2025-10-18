

import { getProducts } from "./actions";
import ProductsGrid from "@/components/ProductsGrid";



export default async function Home() {

  const clothes = await getProducts()

  if (!clothes) {
    console.log("no clothes data")
  }


  return (
    <>
   
<ProductsGrid items={clothes ?? []} label={"NEW ARRIVALS"}/>

    </>
  );
}

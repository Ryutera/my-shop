import Product from "@/components/product";
import { getProducts } from "./actions";



export default async function Home() {
  const clothes = await getProducts()
  if (!clothes) {
    console.log("no clothes data")
  }


  return (
    <>
     
     <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 px-2 md:px-4">
        {/* <h2 className="font-medium text-xl mb-4">Next steps</h2>
        {hasEnvVars ? <SignUpUserSteps /> : <ConnectSupabaseSteps />} */}

{clothes.map((cloth) => (
  <Product cloth={cloth} key={cloth.sys.id} />
))}


      </main>
    </>
  );
}

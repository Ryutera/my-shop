import Product from "@/components/product";
import ConnectSupabaseSteps from "@/components/tutorial/connect-supabase-steps";
import SignUpUserSteps from "@/components/tutorial/sign-up-user-steps";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { getProducts } from "./actions";



export default async function Home() {
  const clothes = await getProducts()
  if (!clothes) {
    console.log("no clothes data")
  }
  // console.log(clothes,"ふく")
  return (
    <>
     
      <main className="grid grid-cols-3 gap-6 px-4 ">
        {/* <h2 className="font-medium text-xl mb-4">Next steps</h2>
        {hasEnvVars ? <SignUpUserSteps /> : <ConnectSupabaseSteps />} */}

{clothes.map((cloth) => (
  <Product cloth={cloth} key={cloth.sys.id} />
))}


      </main>
    </>
  );
}

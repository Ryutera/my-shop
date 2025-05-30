import Product from "@/components/product";
import ConnectSupabaseSteps from "@/components/tutorial/connect-supabase-steps";
import SignUpUserSteps from "@/components/tutorial/sign-up-user-steps";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";

export default async function Home() {
  return (
    <>
     
      <main className="grid grid-cols-3 gap-6 px-4 ">
        {/* <h2 className="font-medium text-xl mb-4">Next steps</h2>
        {hasEnvVars ? <SignUpUserSteps /> : <ConnectSupabaseSteps />} */}

<Product/>
<Product/>
<Product/>
<Product/>
<Product/>
<Product/>

      </main>
    </>
  );
}

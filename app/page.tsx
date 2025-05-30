import ConnectSupabaseSteps from "@/components/tutorial/connect-supabase-steps";
import SignUpUserSteps from "@/components/tutorial/sign-up-user-steps";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";

export default async function Home() {
  return (
    <>
     
      <main className="grid grid-cols-3 gap-6 px-4 ">
        {/* <h2 className="font-medium text-xl mb-4">Next steps</h2>
        {hasEnvVars ? <SignUpUserSteps /> : <ConnectSupabaseSteps />} */}
<div>
  <img src="img/C59995E0-C29A-4350-ADF3-D9B375548E94.jpeg" alt="" className="h-[400px] "/>
  <div className="mt-3 justify-between flex"> 
  <p>aaaaaaaaaaaaaa</p>
  <p>100</p>
  </div>
 
</div>
<div>
  <img src="img/C59995E0-C29A-4350-ADF3-D9B375548E94.jpeg" alt="" className="h-[400px]"/>
</div>
<div>
  <img src="img/C59995E0-C29A-4350-ADF3-D9B375548E94.jpeg" alt="" className="h-[400px]"/>
</div>
<div>
  <img src="img/C59995E0-C29A-4350-ADF3-D9B375548E94.jpeg" alt="" className="h-[400px]"/>
</div>
<div>
  <img src="img/C59995E0-C29A-4350-ADF3-D9B375548E94.jpeg" alt="" className="h-[400px]"/>
</div>

      </main>
    </>
  );
}

"use client";
import { signOutAction } from "@/app/actions";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import Link from "next/link";
import ShoppingCartIcon from "./ShoppingCartIcon";
import { useContext, useEffect, useState } from "react";
import CurrencyContext from "@/app/context/CurrencyContext";
import { Search, UserRound, UserRoundCheck } from "lucide-react";
import SearchContext from "@/app/context/SearchContext";



export default function AuthButton({ data, userData }: any) {
 
  const currencycontext = useContext(CurrencyContext)
  const searchcontext = useContext(SearchContext)




  useEffect(() => {
    const currencyMap: Record<string, string> = {
      JP: "JPY",
      GB: "GBP",
      FR: "EUR",
      DE: "EUR",
      IT: "EUR",
      //Add later if needed
    };



    const setCurrencyBasedonIp = async () => {

      const res = await fetch(`https://ipinfo.io/?token=${process.env.NEXT_PUBLIC_IPINFO_TOKEN}`)
      const data = await res.json()
      const currency = currencyMap[data.country] || "GBP"
      currencycontext?.setCurrency(currency)

    }
    setCurrencyBasedonIp()
  }, [])

  // if (!hasEnvVars) {
  //   return (
  //     <>
  //       <div className="flex gap-4 items-center">
  //         <div>
  //           <Badge
  //             variant={"default"}
  //             className="font-normal pointer-events-none"
  //           >
  //             Please update .env.local file with anon key and url
  //           </Badge>
  //         </div>
  //         <div className="flex gap-2">
  //           <Button
  //             asChild
  //             size="sm"
  //             variant={"outline"}
  //             disabled
  //             className="opacity-75 cursor-none pointer-events-none"
  //           >
  //             <Link href="/sign-in">Sign in</Link>
  //           </Button>
  //           <Button
  //             asChild
  //             size="sm"
  //             variant={"default"}
  //             disabled
  //             className="opacity-75 cursor-none pointer-events-none"
  //           >
  //             <Link href="/sign-up">Sign up</Link>
  //           </Button>
  //         </div>
  //       </div>
  //     </>
  //   );
  // }

  return data ? (
    <div className="flex items-center gap-4">

      <button onClick={searchcontext.onClickSearch}>
        <Search />
      </button>

      <ShoppingCartIcon userData={userData} />

      <form action={signOutAction}>

{/* signup時に一瞬userdata.idがnullになるためそれを回避 */}
       <Link href={userData ? `/account/${userData.id}`:"/"}>
          <UserRoundCheck />
        </Link>
      </form>


    </div>
  ) : (
    <div className="flex gap-4 items-center">

       <button onClick={searchcontext.onClickSearch}>
        <Search />
      </button>


      <ShoppingCartIcon />
      {/* <Button asChild size="sm" className="ml-2" variant={"outline"}> */}
      <Link href="/sign-in">
        <UserRound />
      </Link>
      {/* </Button> */}

    </div>

    
  );

  


}

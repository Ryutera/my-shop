"use client";
import { signOutAction } from "@/app/actions";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import ShoppingCartIcon from "./ShoppingCartIcon";
import { useContext, useEffect } from "react";
import CurrencyContext from "@/app/context/CurrencyContext";
import { UserRound, UserRoundCheck } from "lucide-react";



export default function AuthButton({ data, userData }: any) {
const context = useContext(CurrencyContext)

  useEffect(()=>{
    const currencyMap: Record<string, string> = {
      JP: "JPY",
      GB: "GBP",
      FR: "EUR",
      DE: "EUR",
      IT: "EUR",
      //Add later if needed
    };
    

    const setCurrencyBasedonIp =async()=>{
  
      const res = await fetch(`https://ipinfo.io/?token=${process.env.NEXT_PUBLIC_IPINFO_TOKEN}`)
      const data = await res.json()
      const currency = currencyMap[data.country] || "GBP"
      context?.setCurrency(currency)

        }
        setCurrencyBasedonIp()
     },[])
  
  if (!hasEnvVars) {
    return (
      <>
        <div className="flex gap-4 items-center">
          <div>
            <Badge
              variant={"default"}
              className="font-normal pointer-events-none"
            >
              Please update .env.local file with anon key and url
            </Badge>
          </div>
          <div className="flex gap-2">
            <Button
              asChild
              size="sm"
              variant={"outline"}
              disabled
              className="opacity-75 cursor-none pointer-events-none"
            >
              <Link href="/sign-in">Sign in</Link>
            </Button>
            <Button
              asChild
              size="sm"
              variant={"default"}
              disabled
              className="opacity-75 cursor-none pointer-events-none"
            >
              <Link href="/sign-up">Sign up</Link>
            </Button>
          </div>
        </div>
      </>
    );
  }
  return data ? (
    <div className="flex items-center gap-4">
      <ShoppingCartIcon userData={userData} />
   
      <form action={signOutAction}>

        <Link href="/sign-out">
         <UserRoundCheck/>
         </Link>
      </form>
    </div>
  ) : (
    <div className="flex gap-4 items-center">
      <ShoppingCartIcon />
      {/* <Button asChild size="sm" className="ml-2" variant={"outline"}> */}
        <Link href="/sign-in">
        <UserRound/>
        </Link>
      {/* </Button> */}
     
    </div>
  );
}

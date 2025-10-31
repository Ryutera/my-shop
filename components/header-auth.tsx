"use client";

import Link from "next/link";
import ShoppingCartIcon from "./ShoppingCartIcon";
import { useContext } from "react";
import { Heart, Search, UserRound, UserRoundCheck } from "lucide-react";
import SearchContext from "@/app/context/SearchContext";




export default function AuthButton({ data, userData }: any) {

  const searchcontext = useContext(SearchContext)


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

  return (
    <div className="flex items-center gap-4">

      <button onClick={searchcontext.onClickSearch} className="relative inline-block hover:scale-110 transition-transform duration-200 cursor-pointer">
        <Search className="text-gray-700"/>
      </button>

       <Link href="/favorite" className="relative inline-block hover:scale-110 transition-transform duration-200 cursor-pointer">
      <Heart className="w-6 h-6 text-gray-700" />
    </Link>

      <ShoppingCartIcon  />

  
      {data ?
        // signup時に一瞬userdata.idがnullになるためそれを回避

        <Link href={userData ? `/account/${userData.id}` : "/"}>
          <UserRoundCheck />
        </Link>


        :


        // {/* <Button asChild size="sm" className="ml-2" variant={"outline"}> */}
        <Link href="/sign-in">
          <UserRound className="text-gray-700"/>
        </Link>
        /* </Button> */

      }
    </div>


  );




}

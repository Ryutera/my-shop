"use client";

import Link from "next/link";
import ShoppingCartIcon from "./ShoppingCartIcon";
import { useContext } from "react";
import { Heart, Search, UserRound, UserRoundCheck } from "lucide-react";
import SearchContext from "@/app/context/SearchContext";




export default function AuthButton({ data, userData }: any) {

  const context = useContext(SearchContext)
  if (!context) return
  const {onClickSearch} = context

  return (

    <div className="flex items-center gap-4">

      <button onClick={onClickSearch} className="relative inline-block hover:scale-110 transition-transform duration-200 cursor-pointer">
        <Search className="text-gray-700" />
      </button>

      <Link href="/favorite" className="relative inline-block hover:scale-110 transition-transform duration-200 cursor-pointer">
        <Heart className="w-6 h-6 text-gray-700" />
      </Link>

      <ShoppingCartIcon />


      {data ?
        // signup時に一瞬userdata.idがnullになるためそれを回避

        <Link href={userData ? `/account/${userData.id}` : "/"}>
          <UserRoundCheck />
        </Link>
        :
        <Link href="/sign-in">
          <UserRound className="text-gray-700" />
        </Link>


      }
    </div>



  );




}

"use client"


import { usePathname, useRouter } from "next/navigation";

import { createContext, useEffect, useRef, useState } from "react"

const SearchContext = createContext<any>(null);


export const SearchProvider = ({ children }: { children: React.ReactNode }) => {

    const [isClicked, setIsClicked] = useState(false)
    const [searchedWord, setSearchedWord] = useState("")
    const pathname = usePathname()
    const router = useRouter()
     const prevPathnameRef = useRef<string>(pathname)

    const onClickSearch = () => {
        //ホーム画面以外から検索を行っても検索結果が表示されないので検索アイコンを押すと自動で遷移するように設計
        if (pathname !== "/") {
            router.push("/")
        } else {
            setIsClicked((prev) => !prev)
        }

    }

   useEffect(() => {
    const isNavigatingToHome = prevPathnameRef.current !== "/" && pathname === "/"

    if (isNavigatingToHome) {
      setIsClicked(true)
    } else if (pathname !== "/") {
      // ホーム以外のページに遷移したら閉じる
      setIsClicked(false)
    }

    prevPathnameRef.current = pathname
  }, [pathname])

    console.log(isClicked)

    return (
        <SearchContext.Provider value={{ onClickSearch, isClicked, searchedWord, setSearchedWord }}>
            {children}
        </SearchContext.Provider>
    )
}

export default SearchContext
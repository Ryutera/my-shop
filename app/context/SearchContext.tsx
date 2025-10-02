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
     const shouldOpenSearchRef = useRef<boolean>(false)


const onClickSearch = () => {
    // ホーム画面以外から検索を行っても検索結果が表示されないので検索アイコンを押すと自動で遷移するように設計
    if (pathname !== "/") {
      shouldOpenSearchRef.current = true
      router.push("/")
    } else {
      setIsClicked((prev) => !prev)
    }
  }

  useEffect(() => {
    const isNavigatingToHome = prevPathnameRef.current !== "/" && pathname === "/"

    //遷移先が"/" かつ 検索アイコンをクリックした　という条件でホーム遷移後検索バー表示
    if (isNavigatingToHome && shouldOpenSearchRef.current) {
      setIsClicked(true)
      shouldOpenSearchRef.current = false // フラグをリセット
    } else if (pathname !== "/") {
      // ホーム以外のページに遷移したら閉じる
      setIsClicked(false)
    }

    prevPathnameRef.current = pathname
  }, [pathname])


    

    return (
        <SearchContext.Provider value={{ onClickSearch, isClicked, searchedWord, setSearchedWord }}>
            {children}
        </SearchContext.Provider>
    )
}

export default SearchContext
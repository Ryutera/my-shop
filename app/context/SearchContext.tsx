"use client"


import { createContext, useState } from "react"

type SearchContextValue = {
  isSearching: boolean
  onClickSearch: () => void
}

const SearchContext =  createContext<SearchContextValue|null>(null);


export const SearchProvider = ({ children }: { children: React.ReactNode }) => {

    const [isSearching, setIsSearching] = useState(false)

const onClickSearch = () => {

      setIsSearching((prev) => !prev)
    
  }


    return (
        <SearchContext.Provider value={{ onClickSearch, isSearching }}>
            {children}
        </SearchContext.Provider>
    )
}

export default SearchContext
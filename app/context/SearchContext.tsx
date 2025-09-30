"use client"


import { createContext, useState } from "react"

const SearchContext = createContext<any>(null);


export const SearchProvider = ({ children }: { children: React.ReactNode }) => {

    const [isClicked, setIsClicked] = useState(false)
    const [searchedWord, setSearchedWord] = useState("")
    const onClickSearch = () => {
        setIsClicked((prev) => !prev)
    }

    console.log(isClicked)

    return (
        <SearchContext.Provider value={{onClickSearch, isClicked,searchedWord, setSearchedWord}}>
            {children}
        </SearchContext.Provider>
    )
}

export default SearchContext
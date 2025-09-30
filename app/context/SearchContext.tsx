"use client"


import { createContext, useState } from "react"

const SearchContext = createContext<any>(null);

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {

    const [isClicked, setIsClicked] = useState(false)
    const onClickSearch = () => {
        setIsClicked((prev) => !prev)
    }

    console.log(isClicked)

    return (
        <SearchContext.Provider value={{onClickSearch, isClicked}}>
            {children}
        </SearchContext.Provider>
    )
}

export default SearchContext
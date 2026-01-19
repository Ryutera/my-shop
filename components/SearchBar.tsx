"use client"

import SearchContext from '@/app/context/SearchContext'
import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useContext,  useState } from 'react'


const SearchBar = () => {
  
  const router = useRouter()
  const context = useContext(SearchContext)
  if (!context) throw new Error("SearchBar must be used within <SearchProvider>")
  const { isSearching, onClickSearch } = context
  const [searchWords, setSearchWords] = useState("")


  const handleClose = () => {
    onClickSearch()
  }

  const searchItems = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    if (searchWords==="") return 
    router.push(`/search/${searchWords}`)
  }

  return (
    isSearching &&

    <div className="absolute top-20 left-0 w-full bg-gray-100 border-b border-gray-300 shadow-sm p-4 z-50 animate-in slide-in-from-top-4 fade-in duration-300">
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Search products..."
          className="flex  mx-auto w-[80%] rounded px-3 py-2 focus:outline-none bg-white"
          onChange={(e) => setSearchWords(e.target.value)}
          onKeyDown={searchItems}
          value={searchWords}
        />

        <button onClick={handleClose} >
          <X />
        </button>
      </div>
    </div>
  )
}

export default SearchBar

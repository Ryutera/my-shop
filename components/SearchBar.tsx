"use client"
import SearchContext from '@/app/context/SearchContext'
import { X } from 'lucide-react'
import React, { useContext} from 'react'


const SearchBar = () => {
    const context = useContext(SearchContext)
    const { setSearchedWord } = useContext(SearchContext)

    const handleClose = () => {
        context.onClickSearch()
        setSearchedWord("")
    }
   
    return (
        context.isClicked &&

         <div className="absolute top-20 left-0 w-full bg-gray-100 border-b border-gray-300 shadow-sm p-4 z-50 animate-in slide-in-from-top-4 fade-in duration-300">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search products..."
            className="flex  mx-auto w-[80%] border rounded px-3 py-2 focus:outline-none"
            onChange={(e:any)=>context.setSearchedWord(e.target.value)}
            value={context.searchedWord}
          />
          <button onClick={handleClose} >
            <X />
          </button>
        </div>
      </div>
    )
}

export default SearchBar

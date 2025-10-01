import React from 'react'

interface Props {
word:string
}
const NoResults = ({word}:Props )=> {
  return (
    <div className="text-center">
    <div className="text-xl font-medium mb-2">
      Search results for "{word}"
    </div>
    <div className="text-gray-600 mt-10">
      No items found.
    </div>
  </div>
  )
}

export default NoResults

import React from 'react'

interface Props {
word:string
}
const NoResults = ()=> {
  return (
    <div className="text-center">
    
    <div className="text-gray-600 mt-10">
      No items found.
    </div>
  </div>
  )
}

export default NoResults

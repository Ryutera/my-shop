import { signOutAction } from '@/app/actions'
import React from 'react'


const page = async() => {
    
  return (
    <div>
      This page is not available at the moment
      <div>
        <button className='bg-gray-200 p-1 rounded mt-10' onClick={signOutAction}>Logout</button>
      </div>
    </div>
  )
}

export default page

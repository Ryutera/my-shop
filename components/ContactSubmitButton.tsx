"use client"
import React from 'react'
import { useFormStatus } from 'react-dom'


const ContactSubmitButton = () => {

    const {pending} = useFormStatus(

    )
  return (
   <div className='flex justify-center pt-7'>
 <button className={`
 border py-3 px-5 rounded bg-gray-200 hover:bg-gray-700 hover:text-gray-50 transition duration-00
 ${pending && " cursor-not-allowed"  }
 `
 } type="submit" disabled={pending}>{`${pending ?"Processing...	" : "Submit/送信"}`}</button>
</div>
  )
}

export default ContactSubmitButton

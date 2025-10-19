"use client"
import React from 'react'
import { useFormStatus } from 'react-dom'


const ContactSubmitButton = () => {

    const {pending} = useFormStatus(

    )
  return (
   <div className='flex justify-center pt-7'>
 <button className={`
 border py-3 px-5 rounded bg-black text-white hover:bg-white hover:text-black hover:border-2 hover:border-black transition duration-300
 ${pending && " cursor-not-allowed"  }
 `
 } type="submit" disabled={pending}>{`${pending ?"Processing...	" : "Submit/送信"}`}</button>
</div>
  )
}

export default ContactSubmitButton

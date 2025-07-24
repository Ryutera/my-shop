"use client"
import { createContext, ReactNode,  useState } from "react";

type CurrencyContextType= {
    currency: string
    changeToEur: () => void
    changeToGbp: ()=>void
    changeToJpy:  ()=>void
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

import React from 'react'

export const CurrencyProvider  = ({children}:{children:ReactNode}) => {
    const [currency, setCurrency] = useState("GBP")
   

    const changeToJpy=()=>{
       
        setCurrency("JPY")
       
    }
    const changeToEur=()=>{
        setCurrency("EUR")
        
    }
    const changeToGbp=()=>{
        setCurrency("GBP")
       
    }

  return (
    <CurrencyContext.Provider value={{currency,changeToEur,changeToGbp,changeToJpy}}>
       {children}
    </CurrencyContext.Provider>
  )
}

export default CurrencyContext
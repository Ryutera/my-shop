"use client"
import { createContext, ReactNode, useState } from "react";

type CurrencyContextType= {
    currency: string
    setCurrency: React.Dispatch<React.SetStateAction<string>>;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

import React from 'react'

export const CurrencyProvider  = ({children}:{children:ReactNode}) => {
    const [currency, setCurrency] = useState("GBP")

  return (
    <CurrencyContext.Provider value={{currency,setCurrency}}>
       {children}
    </CurrencyContext.Provider>
  )
}


export default CurrencyContext
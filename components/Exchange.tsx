"use client"
import CurrencyContext from '@/app/context/CurrencyContext'
import React, { useContext } from 'react'

interface Props{
    priceJpy:number
    priceEur: number
  priceGbp: number
}

const Exchange = ({ priceJpy, priceEur, priceGbp }:Props) => {
    const context = useContext(CurrencyContext)
  
    if (!context) {
      throw new Error("useCurrency must be used within a CurrencyProvider")
    }
    const currency = context?.currency
   
    
 if (currency==="JPY") {
    return `¥${priceJpy?.toLocaleString('JP')}`
 }if (currency==="EUR") {
     return `€${priceEur?.toLocaleString('DE')}`
 }else{
    return `£${priceGbp.toLocaleString('GB')}`
 }
}

export default Exchange
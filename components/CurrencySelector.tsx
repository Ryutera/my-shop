"use client"
import React, { useContext, useEffect} from 'react'
import { Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue, } from './ui/select'
import CurrencyContext from '@/app/context/CurrencyContext'


const CurrencySelector = () => {
    const context = useContext(CurrencyContext);
    if (!context) {
      throw new Error("CurrencyContext is undefined. Wrap with <CurrencyProvider>");
    }
  
    const { currency,changeToEur,changeToGbp,changeToJpy } = context;
    useEffect(()=>{console.log(currency)},[currency])
    
    const handleChange = (value: string) => {
        switch (value) {
          case "GBP":
            changeToGbp();
            break;
          case "EUR":
            changeToEur();
            break;
          case "JPY":
            changeToJpy();
            break;
          default:
            break;
        }
      };
   
  return (
    <div className="ml-2">
      <Select onValueChange={handleChange}>
      <SelectTrigger className="w-[100px] h-8 px-2 py-1 text-sm">
        <SelectValue placeholder="Currency" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
        <SelectItem value="GBP">GBP</SelectItem>
            <SelectItem value="EUR">EUR</SelectItem>
            <SelectItem value="JPY">JPY</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
    </div>
  )
}

export default CurrencySelector
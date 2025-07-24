import React, { useContext } from 'react'
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
  
  return (
    <div className="ml-2">
      <Select>
      <SelectTrigger className="w-[100px] h-8 px-2 py-1 text-sm">
        <SelectValue placeholder="Currency" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
            
          <SelectItem value="blueberry">GBP</SelectItem>
          
          <SelectItem value="grapes">EUR</SelectItem>
         
          
          <SelectItem value="pineapple">JPY</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
    </div>
  )
}

export default CurrencySelector
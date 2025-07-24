import React from 'react'
import { Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue, } from './ui/select'


const CurrencySelector = () => {
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
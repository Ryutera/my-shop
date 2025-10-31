"use client"
import { createContext, ReactNode, useEffect, useState } from "react";
import React from 'react'



type RegionType = "UK" | "EU" | "JP" | "OTHER";

type CurrencyContextType = {
  currency: string;
  region:RegionType;
  setCurrency: React.Dispatch<React.SetStateAction<string>>;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [currency, setCurrency] = useState("GBP");
  const [region, setRegion] = useState<RegionType>("UK");


  useEffect(() => {
    const currencyMap: Record<string, { currency: string; region: RegionType }> = {
      //UK
      GB: { currency: "GBP", region: "UK" },
      // Europe
      FR: { currency: "EUR", region: "EU" },
      DE: { currency: "EUR", region: "EU" },
      IT: { currency: "EUR", region: "EU" },
      ES: { currency: "EUR", region: "EU" },
      NL: { currency: "EUR", region: "EU" },
      BE: { currency: "EUR", region: "EU" },
      SE: { currency: "EUR", region: "EU" },
      NO: { currency: "EUR", region: "EU" },
      DK: { currency: "EUR", region: "EU" },
      PL: { currency: "EUR", region: "EU" },
      PT: { currency: "EUR", region: "EU" },
      IE: { currency: "EUR", region: "EU" },
      CH: { currency: "EUR", region: "EU" },
      FI: { currency: "EUR", region: "EU" },
      AT: { currency: "EUR", region: "EU" },
      CZ: { currency: "EUR", region: "EU" },
      HU: { currency: "EUR", region: "EU" },
      // Japan
      JP: { currency: "JPY", region: "JP" },
    };


    const setCurrencyBasedonIp = async () => {
      try {
         const res = await fetch(`https://ipinfo.io/?token=${process.env.NEXT_PUBLIC_IPINFO_TOKEN}`)
      const data = await res.json()
      const mapping = currencyMap[data.country] || { currency: "GBP", region: "OTHER" };
      setCurrency(mapping.currency);
      setRegion(mapping.region);


      } catch (error) {
        console.error("Failed to fetch IP info:", error);
         setCurrency("GBP");
      setRegion("OTHER");
      }
     
    }
    setCurrencyBasedonIp()
  }, [])

  return (
    <CurrencyContext.Provider value={{ currency, region, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  )
}


export default CurrencyContext
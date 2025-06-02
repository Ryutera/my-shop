"use client"
import { Product } from "@/lib/types";
import React, { createContext, ReactNode, useContext, useState } from "react";




type CartContextType = {
  items: string[];
  addItem: (id: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const Provider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<string[]>([]);

  const addItem = (id: string) => {
    setItems((prev) => {
      const exists = prev.some((i) => i === id)
      if (exists) return prev 
      return [...prev, id] 
    })
  }

  const removeItem = (id:string)=>{
    setItems((prev)=>{
        return prev.filter((i) => i !== id);
    })
   
  } 

  const clearCart = () => setItems([])

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  )
};

// カスタムフック
export const useCart = () => {
    const context = useContext(CartContext)
    if (context === undefined) {
      throw new Error("useCart must be used within a CartProvider")
    }
    return context
  }
  


export default CartContext;



  

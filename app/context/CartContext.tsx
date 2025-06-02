"use client"
import { Product } from "@/lib/types";
import React, { createContext, ReactNode, useContext, useState } from "react";




type CartContextType = {
  items: Product[];
  addItem: (item: Product) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const Provider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<Product[]>([]);

  const addItem = (item: Product) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prev, item];
    });
  };

  const removeItem = (id:string)=>{
    setItems((prev)=>{
        return prev.filter((i) => i.id !== id);
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



  

"use client";

import React, { createContext, ReactNode, useContext, useState } from "react";
import { addFavoriteToDb, removeFavoriteFromDb } from "../actions";
type CartContextType = {
  items: string[];
  favorite:string[]
  addItem: (id: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  addFavorite:(id:string)=>void

};

interface Props{
  children: ReactNode 
 userData:any
}

const CartContext = createContext<CartContextType | undefined>(undefined);
export const Provider = (props: Props) => {
  const {children,userData} = props
  const [items, setItems] = useState<string[]>([]);
  const [favorite, setFavorite] = useState<string[]>([]);

  
  const addItem = (id: string) => {
    setItems((prev) => {
      const exists = prev.some((i) => i === id);
      if (exists) return prev;
      
      return [...prev, id];
    });
  };

  const removeItem = (id: string) => {
    if (window.confirm("Do you want to remove this item?")) {
      setItems((prev) => {
        return prev.filter((i) => i !== id);
      });
    }
   
  };

  const addFavorite = async(id:string) =>{

    const isAlreadyadded = favorite?.find((f)=> f === id)
    
    if(isAlreadyadded){
     const filteredFavoritelist = favorite.filter((f)=>f !== id)
     setFavorite(filteredFavoritelist)
     if (userData) {
      await removeFavoriteFromDb(id); // ログイン中ならDBからも削除
    }
    }else{
setFavorite((prev)=>[...prev, id])
if (userData) {
  await addFavoriteToDb(id); // ログイン中ならDBに追加
}
    }

  }

  const clearCart = () => setItems([]);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart, favorite, addFavorite }}>
      {children}
    </CartContext.Provider>
  );
};
// Custom hook
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
export default CartContext;

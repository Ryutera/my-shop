"use client";

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { addFavoriteToDb, removeFavoriteFromDb } from "../actions";
type CartContextType = {
  items: string[];
  favorite: string[];
  cartVersion:number
  addItem: (id: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  addFavorite: (id: string) => void;
  refreshCart:()=>void
};

interface Props {
  children: ReactNode;
  userData: any;
}

const CartContext = createContext<CartContextType | undefined>(undefined);
export const Provider = (props: Props) => {
  const { children, userData } = props;
  const [items, setItems] = useState<string[]>([]);
  const [favorite, setFavorite] = useState<string[]>([]);
  //カートの個数を正しく反映するためにuseEffectのトリガーにするためだけどの値
  const [cartVersion, setCartVersion] = useState(0)

  useEffect(() => {
    if (!userData) {
      const storedItems = localStorage.getItem("cart_items");
      if (storedItems) {
        setItems(JSON.parse(storedItems));
      }
  
      const storedFavs = localStorage.getItem("favorite_items");
      if (storedFavs) {
        setFavorite(JSON.parse(storedFavs));
      }
    }
  }, [userData]);
  
  useEffect(() => {
    if (!userData) {
      localStorage.setItem("cart_items", JSON.stringify(items));
    }
  }, [items, userData]);
  
  useEffect(() => {
    if (!userData) {
      localStorage.setItem("favorite_items", JSON.stringify(favorite));
    }
  }, [favorite, userData]);
  

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

  const addFavorite = async (id: string) => {
    const isAlreadyadded = favorite?.find((f) => f === id);

    if (isAlreadyadded) {
      const filteredFavoritelist = favorite.filter((f) => f !== id);
      setFavorite(filteredFavoritelist);
      
      if (userData) {
        await removeFavoriteFromDb(id); // ログイン中ならDBからも削除
      }
    } else {
      setFavorite((prev) => [...prev, id]);
      if (userData) {
        await addFavoriteToDb(id); // ログイン中ならDBに追加
      }
    }
  };

  const clearCart = () => setItems([]);

  const refreshCart = () =>{
    setCartVersion((prev)=>prev+1)
  }

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, clearCart, favorite, addFavorite,refreshCart,cartVersion }}
    >
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

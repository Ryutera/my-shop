"use client"

import { createContext, type ReactNode, useContext, useEffect, useState } from "react"

import { addCartToDb, addFavoriteToDb, getCartItemsInDb, getFavoriteWithUserId, getProductFromContentful, isCartInDatabase, isFavoriteInDatabase, removeCartItemFromDB, removeFavoriteFromDb } from "../actions"
import { ProductFields } from "@/lib/types"

type UserProductStateContextType  = {
  cartItemsId: string[] // Cart items (product IDs)
  favorite: string[] // Favorite items (product IDs)
  cartItems: any[] | ProductFields[]
  userId:string | null
  addItem: (id: string) => void
  removeCartItem: (id: string) => void
  clearCart: () => void
  addFavorite: (id: string) => void
  getCartItems: () => void
}

interface Props {
  children: ReactNode
  userData: any
}

const UserProductStateContext = createContext<UserProductStateContextType | undefined>(undefined)

export const CartProvider = (props: Props) => {
  const { children, userData } = props

  const [cartItemsId, setCartItemsId] = useState<string[]>([])
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [favorite, setFavorite] = useState<string[]>([])
  // Cart version to trigger useEffect in other components when cart changes

  

  const userId = userData?.identities[0].id 

console.log(cartItems, "カートの中身")
console.log(cartItemsId, "カートのid")

  //ログイン時にfavoriteItemsをfavoriteに登録する
  useEffect(() => {
    const getFavoriteItemFromDatabase = async (id: string) => {
      const favoriteItem = await getFavoriteWithUserId(id)


      if (favoriteItem) {

        const favoriteIds = favoriteItem.map(item => item.cmsItemId)

        setFavorite(favoriteIds)
      }

    }
    getFavoriteItemFromDatabase(userId)
  }, [])





  // Load data from localStorage on initial load (non-logged-in users only)
  useEffect(() => {
    if (!userData) {

      const storedItems = localStorage.getItem("cart_items")
      if (storedItems) {
        setCartItemsId(JSON.parse(storedItems))
      }

      const storedFavs = localStorage.getItem("favorite_items")
      if (storedFavs) {
        setFavorite(JSON.parse(storedFavs))
      }
    }
  }, [userData])

  // Save cart items to localStorage when items change (non-logged-in users only)
  useEffect(() => {
    if (!userData) {
      localStorage.setItem("cart_items", JSON.stringify(cartItemsId))
    }
  }, [cartItemsId, userData])

  // Save favorite items to localStorage when favorites change (non-logged-in users only)
  useEffect(() => {
    if (!userData) {
      localStorage.setItem("favorite_items", JSON.stringify(favorite))
    }
  }, [favorite, userData])





  const addItem = async (id: string) => {
 
    if (userData) {
      await addCartToDb(userId, id);
      const results = await  getCartItemsInDb(userId)
      const itemPromises = results.map((result) => getProductFromContentful(result.cmsItemId));
const items = await Promise.all(itemPromises); 


setCartItems(items);
     
    }else{
         setCartItemsId((prev) => {
      const exists = prev.some((i) => i === id)
      if (exists) return prev // Don't add if already exists
      return [...prev, id]
    })
    }
  }



   const removeCartItem = async (id:string) => {
    if (userId) {
      await removeCartItemFromDB(userId, id)

      const DbItems = await getCartItemsInDb(userId);
      const Items = await Promise.all(
        DbItems.map((item) => getProductFromContentful(item.cmsItemId))
      );
      setCartItems(Items);
      

    } else {
       setCartItemsId((prev) => {
      return prev.filter((i) => i !== id)
    })

    }
  }


  const addFavorite = async (id: string) => {
    const isAlreadyadded = favorite?.find((f) => f === id)

    if (isAlreadyadded) {
      // Remove from favorites if already exists
      const filteredFavoritelist = favorite.filter((f) => f !== id)
      setFavorite(filteredFavoritelist)
      if (userData) {
        await removeFavoriteFromDb(id) // Also remove from database if logged in

        const filteredFavoritelist = favorite.filter((f) => f !== id)
        setFavorite(filteredFavoritelist)
      }
    } else {
      // Add to favorites
      setFavorite((prev) => [...prev, id])
      if (userData) {
        await addFavoriteToDb(id) // Also add to database if logged in
      }
    }
  }

  // Clear all cart items
  const clearCart = () => {
    setCartItemsId([])
    if (!userData) {
      localStorage.removeItem("cart_items")
    }
  }



  const getCartItems = async () => {


    // Logged-in users: get items from database
    if (userData) {
      const DbItems = await getCartItemsInDb(userId);
      const Items = await Promise.all(
        DbItems.map((item) => getProductFromContentful(item.cmsItemId))
      );
      setCartItems(Items);
    }
      else  {
  // Non-logged-in users: get items from context
    const results = await Promise.all(cartItemsId.map((id) => getProductFromContentful(id)));
    setCartItems(results.filter(Boolean));
      }
  

    
  }



useEffect(() => {
    const fetchProducts = async () => {
      
      getCartItems() 
    };

    fetchProducts();
}, [cartItemsId, userData])

  

  return (
    <UserProductStateContext.Provider
      value={{ cartItemsId, addItem, removeCartItem, clearCart, favorite, addFavorite,  getCartItems, cartItems, userId  }}
    >
      {children}
    </UserProductStateContext.Provider>
  )
}

/**
 * Custom hook to use cart context
 * Must be used within CartProvider
 */
export const useProductState = () => {
  const context = useContext(UserProductStateContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

export default UserProductStateContext

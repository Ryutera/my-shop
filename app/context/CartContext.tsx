"use client"

import { createContext, type ReactNode, useContext, useEffect, useState } from "react"

import { addCartToDb, addFavoriteToDb, getCartItemsInDb, getFavoriteWithUserId, getProduct, isCartInDatabase, isFavoriteInDatabase, removeFavoriteFromDb } from "../actions"
import { ProductFields } from "@/lib/types"

type CartContextType = {
  cartItemsId: string[] // Cart items (product IDs)
  favorite: string[] // Favorite items (product IDs)
  cartVersion: number // Version number to trigger cart updates
  cartItems: any[] | ProductFields[]
  userId:string | null


  addItem: (id: string) => void
  removeItem: (id: string) => void

  clearCart: () => void
  addFavorite: (id: string) => void
  refreshCart: () => void

  checkIfItemInDatabase: (id: string) => void
  getCartItems: () => void

}



interface Props {
  children: ReactNode
  userData: any
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = (props: Props) => {
  const { children, userData } = props

  const [cartItemsId, setCartItemsId] = useState<string[]>([])
  const [favorite, setFavorite] = useState<string[]>([])
  // Cart version to trigger useEffect in other components when cart changes
  const [cartVersion, setCartVersion] = useState(0)
  const [cartItems, setCartItems] = useState<any[]>([]);

  const userId = userData?.identities[0].id 



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



  const checkIfItemInDatabase = async (id: string) => {
    if (userData) {
      const item = await isCartInDatabase(id, userId);
      
      return item
    } else {
      return
    }

  };

  const addItem = async (id: string) => {
    setCartItemsId((prev) => {
      const exists = prev.some((i) => i === id)
      if (exists) return prev // Don't add if already exists
      return [...prev, id]
    })
    if (userData) {
      await addCartToDb(userId, id);
      refreshCart()
    }
  }


  const removeItem = (id: string) => {

    setCartItemsId((prev) => {
      return prev.filter((i) => i !== id)
    })

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

  // Increment cart version to trigger re-renders in other components
  const refreshCart = () => {
    setCartVersion((prev) => prev + 1)
  }



  const getCartItems = async () => {


    // Logged-in users: get items from database
    if (userData) {
      const DbItems = await getCartItemsInDb(userId);
      const Items = await Promise.all(
        DbItems.map((item) => getProduct(item.cmsItemId))
      );
      setCartItems(Items);
    }else{
      
    // Non-logged-in users: get items from context
    const results = await Promise.all(cartItemsId.map((id) => getProduct(id)));
    setCartItems(results.filter(Boolean));

    }
  }



  useEffect(() => {
    const fetchProducts = async () => {

      getCartItems()


    };

    fetchProducts();
  }, [cartItemsId]);

  

  return (
    <CartContext.Provider
      value={{ cartItemsId, addItem, removeItem, clearCart, favorite, addFavorite, refreshCart, checkIfItemInDatabase, getCartItems, cartVersion, cartItems, userId  }}
    >
      {children}
    </CartContext.Provider>
  )
}

/**
 * Custom hook to use cart context
 * Must be used within CartProvider
 */
export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

export default CartContext

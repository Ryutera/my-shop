"use client"

import { createContext, type ReactNode, useContext, useEffect, useState } from "react"

import { addCartToDb, addFavoriteToDb, getCartItemsInDb, getFavoriteWithUserId, removeCartItemFromDB, removeFavoriteFromDb } from "../actions"


type UserProductStateContextType = {
  cartItemsIds: string[] // Cart items (product IDs)
  favorite: string[] // Favorite items (product IDs)
  userId: string | null
  addCartItem: (id: string) => void
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
//Store cart contents based on login status
  const [cartItemsIds, setCartItemsIds] = useState<string[]>([])

  //Store cmsID basedon login Status
  const [favorite, setFavorite] = useState<string[]>([])
  
  const userId = userData?.identities[0].id


  console.log(cartItemsIds,"カートId")


    // Load data from localStorage on initial load (non-logged-in users only)
    //非ログイン時にカートとお気に入りをローカルデータから追加
  useEffect(() => {
    if (!userData) {

      const storedItems = localStorage.getItem("cart_items")
      if (storedItems) {
        setCartItemsIds(JSON.parse(storedItems))
      }

      const storedFavs = localStorage.getItem("favorite_items")
      if (storedFavs) {
        setFavorite(JSON.parse(storedFavs))
      }
    }
  }, [userData])



  // ----------カートに関する処理---------------

  // Save cart items to localStorage when items change (non-logged-in users only)
  //　非ログイン時にローカルのデータを用いてカートにアイテムを追加
  useEffect(() => {
    if (!userData) {
      localStorage.setItem("cart_items", JSON.stringify(cartItemsIds))
    }
  }, [cartItemsIds, userData])



  const addCartItem = async (id: string) => {

    if (userData) {
      await addCartToDb(userId, id);
      const results = await getCartItemsInDb(userId)
       const ids = results.map((r) => r.cmsItemId);
      setCartItemsIds(ids);

    } else {
      setCartItemsIds((prev) => {
        const exists = prev.some((i) => i === id)
        if (exists) return prev // Don't add if already exists
        return [...prev, id]
      })
    }
  }

  const removeCartItem = async (id: string) => {
    if (userId) {
      await removeCartItemFromDB(userId, id)

      const dbItems = await getCartItemsInDb(userId);
 const ids = dbItems.map((item) => item.cmsItemId);
 

// const items = await getProductsByIds(ids);
      setCartItemsIds(ids);

    } else {
      setCartItemsIds((prev) => {
        return prev.filter((i) => i !== id)
      })

    }
  }


  // Clear all cart items
  const clearCart = () => {
    setCartItemsIds([])
    if (!userData) {
      localStorage.removeItem("cart_items")
    }
  }



const getCartItems = async () => {
  if (userData) {
   
    const dbItems = await getCartItemsInDb(userId);
    const ids = dbItems.map((item) => item.cmsItemId);
    setCartItemsIds(ids);
  } 
};

    useEffect(() => {
    const fetchProducts = async () => {
      getCartItems()
    };
    fetchProducts();
  }, [userId])

// ------------お気に入りに関する処理-------------


  // Save favorite items to localStorage when favorites change (non-logged-in users only)
  useEffect(() => {
    if (!userData) {
      localStorage.setItem("favorite_items", JSON.stringify(favorite))
    }
  }, [favorite, userData])


  // Register favoriteItems to favorites upon login
  // NOTE: we intentionally do not run this effect when userId is falsy. Use userId in the
  // dependency array to avoid calling the DB with an undefined id.
  useEffect(() => {
    if (!userId) {
      return
    }
      const getFavoriteItemFromDatabase = async (userId: string) => {
         try {
      const favoriteItem = await getFavoriteWithUserId(userId)

      if (favoriteItem) {
        const favoriteIds = favoriteItem.map(item => item.cmsItemId)
        setFavorite(favoriteIds)
      }
    } catch (error) {
      console.log(error)
      }
    }
    getFavoriteItemFromDatabase(userId)
  }, [userId])



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



  return (
    <UserProductStateContext.Provider
      value={{ cartItemsIds, addCartItem, removeCartItem, clearCart, favorite, addFavorite, getCartItems, userId }}
    >
      {children}
    </UserProductStateContext.Provider>
  )
}

export const useProductState = () => {
  const context = useContext(UserProductStateContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

export default UserProductStateContext

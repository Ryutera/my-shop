"use client"

import { createContext, type ReactNode, useContext, useEffect, useState } from "react"

import { addCartToDb, addFavoriteToDb, getCartItemsInDb, getFavoriteWithUserId, getProductFromContentful, isCartInDatabase, isFavoriteInDatabase, removeCartItemFromDB, removeFavoriteFromDb } from "../actions"
import { ProductFields } from "@/lib/types"

type UserProductStateContextType = {
  cartItemsIds: string[] // Cart items (product IDs)
  favorite: string[] // Favorite items (product IDs)
  cartItems: any[] | ProductFields[]
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
  const [cartItemsIds, serCartItemsIds] = useState<string[]>([])
  const [cartItems, setCartItems] = useState<any[]>([]);

  const [favorite, setFavorite] = useState<string[]>([])
  
  const userId = userData?.identities[0].id

  console.log(cartItems, "カートの中身")
  console.log(cartItemsIds, "カートのid")

    // Load data from localStorage on initial load (non-logged-in users only)
    //非ログイン時にカートとお気に入りをローカルデータから追加
  useEffect(() => {
    if (!userData) {

      const storedItems = localStorage.getItem("cart_items")
      if (storedItems) {
        serCartItemsIds(JSON.parse(storedItems))
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


  /**
   * addCartItem
   * - If user is logged in: add to DB and refresh `cartItems` from DB.
   * - If not logged in: add the id to `cartItemsIds` (local-only persistence).
   *
   * Note: This function does not perform optimistic UI updates for DB-backed users —
   * it waits for the DB result and then re-fetches.
   */
  const addCartItem = async (id: string) => {

    if (userData) {
      await addCartToDb(userId, id);
      const results = await getCartItemsInDb(userId)
      const itemPromises = results.map((result) => getProductFromContentful(result.cmsItemId));
      const items = await Promise.all(itemPromises);
      setCartItems(items);

    } else {
      serCartItemsIds((prev) => {
        const exists = prev.some((i) => i === id)
        if (exists) return prev // Don't add if already exists
        return [...prev, id]
      })
    }
  }

  const removeCartItem = async (id: string) => {
    if (userId) {
      await removeCartItemFromDB(userId, id)

      const DbItems = await getCartItemsInDb(userId);
      const Items = await Promise.all(
        DbItems.map((item) => getProductFromContentful(item.cmsItemId))
      );
      setCartItems(Items);


    } else {
      serCartItemsIds((prev) => {
        return prev.filter((i) => i !== id)
      })

    }
  }


  // Clear all cart items
  const clearCart = () => {
    serCartItemsIds([])
    if (!userData) {
      localStorage.removeItem("cart_items")
    }
  }


  /**
   * addCartItem
   * - If user is logged in: add to DB and refresh `cartItems` from DB.
   * - If not logged in: add the id to `cartItemsIds` (local-only persistence).
   *
   * Note: This function does not perform optimistic UI updates for DB-backed users —
   * it waits for the DB result and then re-fetches.
   */
  const getCartItems = async () => {
    // Logged-in users: get items from database
    if (userData) {
      const DbItems = await getCartItemsInDb(userId);
      const Items = await Promise.all(
        DbItems.map((item) => getProductFromContentful(item.cmsItemId))
      );
      setCartItems(Items);
    }
    else {
      // Non-logged-in users: get items from context
      const results = await Promise.all(cartItemsIds.map((id) => getProductFromContentful(id)));
      setCartItems(results.filter(Boolean));
    }
  }

    useEffect(() => {
    const fetchProducts = async () => {
      getCartItems()
    };
    fetchProducts();
  }, [cartItemsIds, userData])

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
      value={{ cartItemsIds, addCartItem, removeCartItem, clearCart, favorite, addFavorite, getCartItems, cartItems, userId }}
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

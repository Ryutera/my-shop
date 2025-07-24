"use client"

import { createContext, type ReactNode, useContext, useEffect, useState } from "react"

import { addFavoriteToDb, removeFavoriteFromDb } from "../actions"

type CartContextType = {
  items: string[] // Cart items (product IDs)
  favorite: string[] // Favorite items (product IDs)
  cartVersion: number // Version number to trigger cart updates
  addItem: (id: string) => void
  removeItem: (id: string) => void
  clearCart: () => void
  addFavorite: (id: string) => void
  refreshCart: () => void
}

interface Props {
  children: ReactNode
  userData: any
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = (props: Props) => {
  const { children, userData } = props

  const [items, setItems] = useState<string[]>([])
  const [favorite, setFavorite] = useState<string[]>([])
  // Cart version to trigger useEffect in other components when cart changes
  const [cartVersion, setCartVersion] = useState(0)

  // Load data from localStorage on initial load (non-logged-in users only)
  useEffect(() => {
    if (!userData) {
    
      const storedItems = localStorage.getItem("cart_items")
      if (storedItems) {
        setItems(JSON.parse(storedItems))
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
      localStorage.setItem("cart_items", JSON.stringify(items))
    }
  }, [items, userData])

  // Save favorite items to localStorage when favorites change (non-logged-in users only)
  useEffect(() => {
    if (!userData) {
      localStorage.setItem("favorite_items", JSON.stringify(favorite))
    }
  }, [favorite, userData])


  const addItem = (id: string) => {
    setItems((prev) => {
      const exists = prev.some((i) => i === id)
      if (exists) return prev // Don't add if already exists
      return [...prev, id]
    })
  }

  const removeItem = (id: string) => {
    if (window.confirm("Do you want to remove this item?")) {
      setItems((prev) => {
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
    setItems([])
    if (!userData) {
      localStorage.removeItem("cart_items") 
    }
  }

  // Increment cart version to trigger re-renders in other components
  const refreshCart = () => {
    setCartVersion((prev) => prev + 1)
  }

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, clearCart, favorite, addFavorite, refreshCart, cartVersion }}
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

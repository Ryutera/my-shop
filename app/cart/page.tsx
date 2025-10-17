"use client";
import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { ProductFields } from "@/lib/types";
import { getCartItemsInDb, getProduct } from "../actions";

import CartContent from "@/components/CartContent";
import NoCartContent from "@/components/NoCartContent";
import { createClient } from "@/utils/supabase/client";

const Cart = () => {
  const { items, removeItem } = useCart();
  const [products, setProducts] = useState<ProductFields[]>([]);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [userData, setUserData] = useState<any>(null);
  const [isLoading , setIsloading] = useState(false)


  useEffect(() => {
    const fetchProducts = async () => {
      setIsloading(true)

      const supabase = createClient();
      const { data } = await supabase.auth.getUserIdentities();
      setUserData(data);

      // Non-logged-in users: get items from context
      const results = await Promise.all(items.map((id) => getProduct(id)));
      setProducts(results.filter(Boolean)); 

      // Logged-in users: get items from database
      if (data) {
        const DbItems = await getCartItemsInDb(data.identities[0].id);
        const Items = await Promise.all(
          DbItems.map((item) => getProduct(item.cmsItemId))
        );
        setCartItems(Items);
      }

      setIsloading(false)
    };

    fetchProducts();
  }, [items]);


  


  // Different data to be passed to cartContent depending on login status, display NocartContent when cart is 0
  return (
  <div className="w-full mx-auto max-w-5xl lg:max-w-6xl xl:max-w-7xl p-6 md:p-10">
    {isLoading ? (
      // 🌀 ローディング中
      <div className="flex flex-col items-center justify-center h-[60vh] text-gray-500">
        
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-gray-300 mb-3"></div>
        <p>Loading your cart...</p>
      </div>
    ) : cartItems.length > 0 ? (
      <CartContent cartItems={cartItems} userData={userData} />
    ) : products.length > 0 ? (
      <CartContent items={products} removeItem={removeItem} />
    ) : (
      <NoCartContent />
    )}
  </div>
);

};

export default Cart;

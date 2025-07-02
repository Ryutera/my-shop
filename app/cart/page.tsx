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

  useEffect(() => {
    const fetchProducts = async () => {
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
    };

    fetchProducts();
  }, [items]);

  // Different data to be passed to cartContent depending on login status, display NocartContent when cart is 0
  return (
    <div className="max-w-3xl mx-auto p-6 md:p-10">
      {cartItems.length > 0 ? (
        <CartContent cartItems={cartItems} userData={userData} />
      ) : products.length > 0 ? (
        <CartContent items={products} removeItems={removeItem} />
      ) : (
        <NoCartContent />
      )}
    </div>
  );
};

export default Cart;

"use client";
import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { ProductFields } from "@/lib/types";
import { getCartItemsInDb, getProduct } from "../actions";

import CartContent from "@/components/CartContent";
import { createClient } from "@/utils/supabase/client";
import NoCartContent from "@/components/NoCartContent";

const Cart = () => {
  const { items, removeItem } = useCart();
  const [products, setProducts] = useState<ProductFields[]>([]);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const supabase = await createClient();
      const { data } = await supabase.auth.getUserIdentities();
      setUserData(data);

      const results = await Promise.all(items.map((id) => getProduct(id)));
      setProducts(results.filter(Boolean)); // null を除外

      if (data) {
        const DbItems = await getCartItemsInDb(data.identities[0].id);
        //cartcontentにcntentfulの商品データを送るため(nameとpriceがある)
        const Items = await Promise.all(
          DbItems.map((i) => getProduct(i.cmsItemId))
        );

        setCartItems(Items);
      }
    };

    fetchProducts();
  }, [items]);

  return (
    <div className="max-w-3xl mx-auto p-6 md:p-10">
     

      {cartItems.length > 0 ? (
        <CartContent cartItems={cartItems} userData={userData} />
      ) : products.length > 0 ? (
        <CartContent items={products} removeItems={removeItem} />
      ) : (
        <NoCartContent/>
      )}
    </div>
  );
};

export default Cart;

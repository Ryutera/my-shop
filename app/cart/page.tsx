"use client";
import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { ProductFields } from "@/lib/types";
import { getCartItemsInDb, getProduct } from "../actions";

import { ShoppingCart } from "lucide-react";

import CartContent from "@/components/CartContent";
import { createClient } from "@/utils/supabase/client";

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

  // console.log(products, "プロダクト");
  // console.log(items, "データ群");

  return (
    <div className="max-w-3xl mx-auto p-6 md:p-10">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">Your Cart</h2>
        <div className="text-lg text-gray-500">{products.length} items</div>
      </div>

      {cartItems.length > 0 ? (
        <CartContent cartItems={cartItems} userData={userData} />
      ) : products.length > 0 ? (
        <CartContent items={products} removeItems={removeItem} />
      ) : (
        <div className="border border-gray-200 rounded-lg bg-white p-16 text-center">
          <div className="flex flex-col items-center justify-center gap-6">
            <div className="bg-gray-50 p-5 rounded-full">
              <ShoppingCart className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-900">
              Your cart is empty
            </h3>
            <p className="text-gray-500 text-base">
              Add some products to your cart to see them here.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

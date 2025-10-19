"use client";
import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";


import CartContent from "@/components/CartContent";
import NoCartContent from "@/components/NoCartContent";


const Cart = () => {
  const { cartItemsId, removeItem, getCartItems, cartItems, } = useCart();



  useEffect(() => {
    const fetchProducts = async () => {

      getCartItems()


    };

    fetchProducts();
  }, [cartItemsId]);





  // Different data to be passed to cartContent depending on login status, display NocartContent when cart is 0
  return (
    <div className="w-full mx-auto max-w-5xl lg:max-w-6xl xl:max-w-7xl p-6 md:p-10">
      {cartItems.length > 0 ? (
        <CartContent items={cartItems} removeItem={removeItem} />
      ) :
        <NoCartContent />
      }
    </div>
  );

};

export default Cart;

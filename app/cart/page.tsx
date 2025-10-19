"use client";
import React, { useEffect} from "react";
import { useCart } from "../context/CartContext";


import CartContent from "@/components/CartContent";
import NoCartContent from "@/components/NoCartContent";


const Cart = () => {
  const { cartItemsId, getCartItems, cartItems } = useCart();




  return (
    <div className="w-full mx-auto max-w-5xl lg:max-w-6xl xl:max-w-7xl p-6 md:p-10">
      {cartItems.length > 0 ? (
        <CartContent cartItems={cartItems}  />
      ) :
        <NoCartContent />
      }
    </div>
  );

};

export default Cart;

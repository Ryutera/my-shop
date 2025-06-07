"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useCart } from "@/app/context/CartContext";
import { ProductFields } from "@/lib/types";
import { createClient } from "@/utils/supabase/client";



interface Type {
  productData: ProductFields;
  id: string;
}

const AddToCart = (params: Type) => {
  const { productData, id } = params;

  const { addItem, items } = useCart();

  useEffect(()=>{
   
    const getCurrentUser = async() =>{
      const supabase = await  createClient()
      const user = await supabase.auth.getUser()
      console.log(user,"現在のユーザー")
     
    }
    getCurrentUser ()
    return 
  },[])

  const isAdded = items.some((i) => i === id);

  // console.log(items)
  const Cart = (id: string) => {
    addItem(id);

  };

  return (
    <div
      className={`transition transform duration-300 translate-y-1 hover:scale-105 ${isAdded ? "cursor-not-allowed" : `cursor-pointer`} `}
    >
      <Button
        className={`w-full `}
        size="lg"
        onClick={() => Cart(id)}
        disabled={isAdded}
      >
        {isAdded
          ? `Already added to Cart - £${productData.price}`
          : `Add to Cart - £${productData.price}`}
      </Button>
    </div>
  );
};

export default AddToCart;

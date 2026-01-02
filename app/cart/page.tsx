"use client";




import CartContent from "@/components/CartContent";
import NoCartContent from "@/components/NoCartContent";
import { useProductState } from "../context/UserProductStateProvider";
import { useEffect, useState } from "react";
import { getProductsByIds } from "../actions";
import { ProductFields } from "@/lib/types";


const Cart = () => {
  const { cartItemsIds } = useProductState();
  const [cartItems, setCartItems ] = useState< ProductFields[]>()

  useEffect(()=>{
    const init = async()=>{
  const data = await getProductsByIds(cartItemsIds)
  setCartItems(data)
    }
    init()
  },[cartItemsIds])

  return (
    <div className="w-full md:w-[75%] mx-auto max-w-5xl lg:max-w-6xl xl:max-w-7xl p-6 ">
      {cartItemsIds?.length > 0 ? (
        <CartContent cartItems={cartItems}  />
      ) :
        <NoCartContent />
      }
    </div>
  );

};

export default Cart;

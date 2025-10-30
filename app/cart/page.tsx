"use client";




import CartContent from "@/components/CartContent";
import NoCartContent from "@/components/NoCartContent";
import { useProductState } from "../context/UserProductStateProvider";


const Cart = () => {
  const { cartItems } = useProductState();


console.log(cartItems,"")

  return (
    <div className="w-full md:w-[75%] mx-auto max-w-5xl lg:max-w-6xl xl:max-w-7xl p-6 ">
      {cartItems.length > 0 ? (
        <CartContent cartItems={cartItems}  />
      ) :
        <NoCartContent />
      }
    </div>
  );

};

export default Cart;

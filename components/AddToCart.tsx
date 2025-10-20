"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ProductFields } from "@/lib/types";
import Exchange from "./Exchange";
import { useProductState } from "@/app/context/UserProductStateProvider";

interface AddToCartProps {
  productData: ProductFields;
  id: string;

}

const AddToCart = (props: AddToCartProps) => {
  const { productData, id } = props;
  const [existingCartItem] = useState<any>(null);
  console.log(existingCartItem, "existingcart")
  const { addCartItem, cartItems } = useProductState();
  const [loading, setLoading] = useState(false)

  useEffect(() => {

  }, [cartItems]);



  const isAdded = cartItems.some((i) => i.id === id);


  const handleAddToCart = async (id: string) => {
    setLoading(true)
    try {
      await Promise.resolve(addCartItem(id))
    } finally {
      setLoading(false)
    }


  };


  return (
    <div
      className={`transition  transform duration-300 translate-y-1 hover:scale-105 ${isAdded ? "cursor-not-allowed" : `cursor-pointer`} `}
    >
      <Button
        className={`w-full `}
        size="lg"
        onClick={() => handleAddToCart(id)}
        disabled={!existingCartItem ? isAdded : true}
      >
        {loading ? "Adding..." : isAdded ? (
          <>
            Already added to Cart - <Exchange
              priceEur={productData.priceEur}
              priceJpy={productData.priceJpy}
              priceGbp={productData.priceGbp}
            />
          </>
        ) : (
          <>
            Add to Cart - <Exchange
              priceEur={productData.priceEur}
              priceJpy={productData.priceJpy}
              priceGbp={productData.priceGbp}
            />
          </>
        )}
      </Button>
    </div>
  );
};

export default AddToCart;

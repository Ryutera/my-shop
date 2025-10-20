"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useCart } from "@/app/context/CartContext";
import { ProductFields } from "@/lib/types";
import Exchange from "./Exchange";

interface AddToCartProps {
  productData: ProductFields;
  id: string;

}

const AddToCart = (props: AddToCartProps) => {
  const { productData, id } = props;

  const [existingCartItem, setExistingCartItem] = useState<any>(null);

  console.log(existingCartItem, "existingcart")

  const { addItem, cartItemsId, cartItems,checkIfItemInDatabase } = useCart();

  useEffect(() => {
    const handleDatabasecheck = async () => {
      const result = await checkIfItemInDatabase(id)
      setExistingCartItem(result);
    }

    handleDatabasecheck()

  }, [cartItems]);



  const isAdded = cartItemsId.some((i) => i === id);

  // console.log(items)
  const handleAddToCart = async (id: string) => {
    addItem(id);

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
        {existingCartItem ? (
          <>
            Already added to Cart - <Exchange
              priceEur={productData.priceEur}
              priceJpy={productData.priceJpy}
              priceGbp={productData.priceGbp}
            />
          </>
        ) : isAdded ? (
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

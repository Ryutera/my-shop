"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useCart } from "@/app/context/CartContext";
import { ProductFields } from "@/lib/types";
import { addCartToDb, isCartInDatabase } from "@/app/actions";
import Exchange from "./Exchange";

interface AddToCartProps {
  productData: ProductFields;
  id: string;
  userData: any;
}

const AddToCart = (props: AddToCartProps) => {
  const { productData, id, userData } = props;
  const [existingCartItem, setExistingCartItem] = useState<any>(null);

  const userId = userData?.identities[0].id;

  const { addItem, items,refreshCart } = useCart();

  useEffect(() => {
    const checkIfItemInDatabase = async () => {
      const item = await isCartInDatabase(id, userId);
      setExistingCartItem(item);
    };
    checkIfItemInDatabase();
  }, []);

  const isAdded = items.some((i) => i === id);

  // console.log(items)
  const handleAddToCart  = async (id: string) => {
    addItem(id);
    if (userData) {
      await addCartToDb(userId, id);
      refreshCart()
    }
  };

  console.log(productData,"でた")

  return (
    <div
      className={`transition  transform duration-300 translate-y-1 hover:scale-105 ${isAdded ? "cursor-not-allowed" : `cursor-pointer`} `}
    >
      <Button
        className={`w-full `}
        size="lg"
        onClick={() => handleAddToCart (id)}
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

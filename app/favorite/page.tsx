"use client";
import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useCart } from "../context/CartContext";
import { getFavoriteWithUserId, getProduct } from "../actions";
import FavoriteContent from "@/components/FavoriteContent";

const FavoritePage = () => {
  const { favorite ,userId} = useCart(); // Get favorites from context
  const [products, setProducts] = useState<any>();


  useEffect(() => {
    const fetchFavoriteData = async () => {


      if (userId) {
      
      
        const FavoriteItemsInDb = await getFavoriteWithUserId(userId);

        const results = await Promise.all(
          FavoriteItemsInDb.map((item) => getProduct(item.cmsItemId))
        );
        setProducts(results);
      } else {
        const results = await Promise.all(favorite.map((id) => getProduct(id)));
        console.log(results,"results")
       ;
        setProducts(results);
      }
    };

    fetchFavoriteData();
    
  }, [favorite]);

//Render only when products are loaded to avoid undefined errors
  return !!products && 
     <div className="w-full mx-auto max-w-5xl lg:max-w-6xl xl:max-w-7xl p-6 md:p-10">
  <FavoriteContent products={products} />
  </div>;
};

export default FavoritePage;

"use client";
import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useCart } from "../context/CartContext";
import prisma from "@/lib/prisma";
import { getFavoriteWithUserId, getProduct } from "../actions";
import FavoriteContent from "@/components/FavoriteContent";
import NoFavoriteContent from "@/components/NoFavoriteContent";
import { flushAllTraces } from "next/dist/trace";

const FavoritePage = () => {
  const { favorite } = useCart();
  const [products, setProducts] = useState<any>();
  const [isLoggedIn,setIsLoggedIn] = useState<boolean>(false)
  

  useEffect(() => {
   
  
    const fetchFavoriteData = async () => {
      const supabase = await createClient();
      const { data } = await supabase.auth.getUserIdentities();

      if (data) {
        setIsLoggedIn((prev)=>!prev)
        const userId = data.identities[0].id
        const FavoriteItemsInDb = await  getFavoriteWithUserId(userId)

        const results = await Promise.all(
          FavoriteItemsInDb.map((item) => getProduct(item.cmsItemId))
        );
        setProducts(results);
        console.log(FavoriteItemsInDb, "でた");
      } else {
       
          const results = await Promise.all(favorite.map((id) => getProduct(id)));
          console.log(results.filter(Boolean),"results")
          setProducts(results);
      
       
      }
    };

    fetchFavoriteData();
  }, [favorite]);
 
  return !!products && <FavoriteContent products={products} /> 
};

export default FavoritePage;

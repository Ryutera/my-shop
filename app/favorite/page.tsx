"use client";
import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useCart } from "../context/CartContext";
import { getFavoriteWithUserId, getProduct } from "../actions";
import FavoriteContent from "@/components/FavoriteContent";

const FavoritePage = () => {
  const { favorite } = useCart(); // Get favorites from context
  const [products, setProducts] = useState<any>();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const fetchFavoriteData = async () => {
      const supabase = await createClient();
      const { data } = await supabase.auth.getUserIdentities();

      if (data) {
        // Logged-in user: Get favorites from database
        setIsLoggedIn((prev) => !prev);
        const userId = data.identities[0].id;
        const FavoriteItemsInDb = await getFavoriteWithUserId(userId);

        const results = await Promise.all(
          FavoriteItemsInDb.map((item) => getProduct(item.cmsItemId))
        );
        setProducts(results);
      } else {
        const results = await Promise.all(favorite.map((id) => getProduct(id)));
        console.log(results.filter(Boolean), "results");
        setProducts(results);
      }
    };

    fetchFavoriteData();
    
  }, [favorite]);

//Render only when products are loaded to avoid undefined errors
  return !!products && <FavoriteContent products={products} />;
};

export default FavoritePage;

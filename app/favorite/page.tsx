"use client";
import React, { useEffect, useState } from "react";

import { getFavoriteWithUserId, getProductsByIds, } from "../actions";
import FavoriteContent from "@/components/FavoriteContent";
import { useProductState } from "../context/UserProductStateProvider";

const FavoritePage = () => {
  const { favorite, userId } = useProductState(); 
  const [products, setProducts] = useState<any[]>();

  useEffect(() => {
    const fetchFavoriteData = async () => {
      if (userId) {
        const favoriteItemsInDb = await getFavoriteWithUserId(userId);
    const ids = favoriteItemsInDb.map((f) => f.cmsItemId);

    const items = await getProductsByIds(ids);

    setProducts(items);
      } else {
      const ids = favorite;
const items = await getProductsByIds(ids);
setProducts(items);

      }


    };
    fetchFavoriteData();

  }, [favorite, userId]);


  //Render only when products are loaded to avoid undefined errors
  return products &&
    (<div className="w-full md:w-[75%] mx-auto max-w-5xl lg:max-w-6xl xl:max-w-7xl p-6 ">
      <FavoriteContent products={products} />
    </div>)



};

export default FavoritePage;

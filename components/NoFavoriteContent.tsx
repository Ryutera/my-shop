import { Heart } from "lucide-react";
import React from "react";

const NoFavoriteContent = () => {
  return (
    <>
     <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">Your Favorite Items</h2>
        <div className="text-lg text-gray-500">0 items</div>
        </div>
    <div className="border border-gray-200 rounded-lg bg-white p-16 text-center">
      <div className="flex flex-col items-center justify-center gap-6">
        <div className="bg-gray-50 p-5 rounded-full">
          <Heart className="h-10 w-10 text-gray-400" />
        </div>
        <h3 className="text-xl font-medium text-gray-900">
          There is no favorite items
        </h3>
        <p className="text-gray-500 text-base">
          Add some products to your favorite lists to see them here.
        </p>
      </div>
    </div>
    </>
  );
};

export default NoFavoriteContent;

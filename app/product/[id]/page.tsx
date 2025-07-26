import { getProduct } from "@/app/actions";
import React from "react";

import ProductImeges from "@/components/productImeges";
import { Badge } from "@/components/ui/badge";
import AddToCart from "@/components/AddToCart";
import AddToWishList from "@/components/AddToWishList";
import { createClient } from "@/utils/supabase/server";
import Exchange from "@/components/Exchange";


interface ProductPageProps {
  params: Promise<{ id: string }>;
}


export default async function  ProductPage ({ params }:ProductPageProps) {
  const { id } = await params;
  const productData = await getProduct(id);
  const supabase = await createClient();
  const { data } = await supabase.auth.getUserIdentities();

console.log(productData,"ぷろだくと")
  
  if (!productData) {
    console.log("there are no date");
    return <div>There is no product</div>;
  }

  const formatDescription = (description: string) => {
    return description.split("\n").map((line, index) => {
      if (line.trim() === "") return <br key={index} />;
      return (
        <p key={index} className="mb-2">
          {line}
        </p>
      );
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="md:sticky md:top-24 h-fit">
          <ProductImeges
            thumbnail={productData.thumbnail}
            images={productData.images}
          />
        </div>

        <div>
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-semibold capitalize">
                {productData.name}
              </h1>
            </div>
            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-2xl font-semibold">
                {productData.isSoldOut ? "£0" : <Exchange
                priceJpy ={productData.priceJpy}
                priceGbp ={productData.priceGbp}
                priceEur ={productData.priceEur}
          
                />}
              </span>
              {productData.isSoldOut ? (
                <Badge
                  variant="outline"
                  className="bg-slate-100 text-red-600 border-slate-200"
                >
                  Out of Stock
                </Badge>
              ) : (
                <Badge
                  variant="outline"
                  className="bg-green-50 text-green-600 border-green-200"
                >
                  In Stock
                </Badge>
              )}
            </div>
            {/* Actions */}
            {productData.isSoldOut ? (
              
              <br/>
            ) : (
              <div className="space-y-3">
                <AddToCart productData={productData} id={id} userData={data} />
                <AddToWishList id={id} userData={data} />
              </div>
            )}

            {/* Description */}
            <div>
              <h3 className="font-medium mb-3">Product Details</h3>
              <div className="text-muted-foreground text-sm space-y-1">
                {formatDescription(productData.description)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



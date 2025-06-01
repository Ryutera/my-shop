import { getProduct } from "@/app/actions";
import React from "react";

import ProductImeges from "@/components/productImeges";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import AddToCart from "@/components/AddToCart";

const ProductPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const productData = await getProduct(id);

  console.log(productData);

  if (!productData) {
    console.log("商品データがない");
    return <div>There is no product</div>;
  }

  const formatDescription = (description: string) => {
    return description.split("\n").map((line, index) => {
      if (line.trim() === "") return <br key={index} />
      return (
        <p key={index} className="mb-2">
          {line}
        </p>
      )
    })
  }

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
                ${productData.price}
              </span>
              <Badge
                variant="outline"
                className="bg-green-50 text-green-600 border-green-200"
              >
                In Stock
              </Badge>
            </div>
            {/* Actions */}
            <div className="space-y-3">
             <AddToCart productData={productData}/>
              <Button
                variant="outline"
                className="w-full transition transform duration-300 translate-y-1 hover:scale-105"
              >
                <Heart className="mr-2 h-4 w-4" />
                Add to Wishlist
              </Button>
            </div>
            {/* Description */}
      <div>
        <h3 className="font-medium mb-3">Product Details</h3>
        <div className="text-muted-foreground text-sm space-y-1">{formatDescription(productData.description)}</div>
      </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

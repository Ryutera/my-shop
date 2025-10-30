import { getProductFromContentful } from "@/app/actions";


import ProductImeges from "@/components/productImeges";
import { Badge } from "@/components/ui/badge";
import AddToCart from "@/components/AddToCart";
import AddToWishList from "@/components/AddToWishList";
import Exchange from "@/components/Exchange";
import ProductDescription from "@/components/ProductDescription";



interface ProductPageProps {
  params: Promise<{ id: string }>;
}


export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const productData = await getProductFromContentful(id);


  if (!productData) {
    console.log("there are no date");
    return <div>There is no product</div>;
  }



  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="md:sticky md:top-24 h-fit md:px-5">
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
                  priceJpy={productData.priceJpy}
                  priceGbp={productData.priceGbp}
                  priceEur={productData.priceEur}

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

              <br />
            ) : (
              <div className="space-y-3">
                <AddToCart productData={productData} id={id} />
                <AddToWishList id={id} />
              </div>
            )}

            {/* Description */}
           <ProductDescription  jp={productData.description_jp} en={productData.description_en}/>
          </div>
        </div>
      </div>
    </div>
  );
};



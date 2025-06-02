import { Asset, EntrySkeletonType } from "contentful"

export type ProductFields = {
    name: string
    price: number
    description: string
    thumbnail: Asset
    images: Asset[]
  }
 export type ProductFieldsSkeleton = EntrySkeletonType<ProductFields>


 export type Product = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};


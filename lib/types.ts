import { EntrySkeletonType } from "contentful"

export type ProductFields = {
  
  name: { 'en-US': string }
  price: { 'en-US': number }
  description: { 'en-US': string }
  thumbnail: { 'en-US': any }
  images: { 'en-US': any[] }
  isSoldOut: { 'en-US': boolean }
  }
 export type ProductFieldsSkeleton = EntrySkeletonType<ProductFields>


 export type Product = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};


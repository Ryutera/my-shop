import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel";
import { Asset } from 'contentful';
  type Props = {
    thumbnail: Asset;
    images: Asset[];
  };

const ProductImeges = ({ thumbnail, images }: Props) => {
  return (
    <Carousel>
    <CarouselContent>
      {/* Thumbnail image */}
      <CarouselItem key="thumbnail">
        <div className="flex justify-center">
          <img
            src={`https:${thumbnail.fields.file?.url}`}
            alt=""
            className="h-[400px] object-cover rounded-lg"
          />
        </div>
      </CarouselItem>

      {/* Images */}
      {images.map((image, index) => (
        <CarouselItem key={index}>
          <div className="flex justify-center">
            {image.fields.file?.url && (
              <img
                src={`https:${image.fields.file.url}`}
                alt=""
                className="h-[400px] object-cover rounded-lg"
              />
            )}
          </div>
        </CarouselItem>
      ))}
    </CarouselContent>

   
    <div className="flex justify-center mt-4">
        <CarouselPrevious className="static translate-y-0 mr-2" />
        <CarouselNext className="static translate-y-0 ml-2" />
      </div>
  </Carousel>
  )
}

export default ProductImeges
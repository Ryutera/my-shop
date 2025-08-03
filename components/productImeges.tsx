import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel";
import { Asset } from 'contentful';
import { Dialog ,
  DialogContent,
  DialogTrigger,
  DialogTitle } from './ui/dialog';
  type Props = {
    thumbnail: Asset;
    images: Asset[];
  };

const ProductImeges = ({ thumbnail, images }: Props) => {
  return (
    <>
    <Dialog>
    <DialogTitle className="sr-only">Product Image Gallery</DialogTitle>
  <Carousel>
  <DialogTrigger asChild>
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
    </DialogTrigger>
   
    <div className="flex justify-center mt-4">
        <CarouselPrevious className="static translate-y-0 mr-2" />
        <CarouselNext className="static translate-y-0 ml-2" />
      </div>
  </Carousel>

  <DialogContent className="max-w-[70vw] max-h-[95vh] p-2">
  <Carousel>
    <CarouselContent>
      {/* Thumbnail image */}
      <CarouselItem key="thumbnail">
      <div className="flex justify-center items-center min-h-[70vh]">
          <img
            src={`https:${thumbnail.fields.file?.url}`}
            alt=""
             className="max-h-[80vh] max-w-full object-contain rounded-lg"
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
                className="max-h-[80vh] max-w-full object-contain rounded-lg"
              />
            )}
            
          </div>
          
        </CarouselItem>
        
      ))}
    
    </CarouselContent>

   
    {/* <div className="flex justify-center mt-4"> */}
    <CarouselPrevious className="left-10 bg-black/50 text-white hover:bg-black/70 border-none" />
    <CarouselNext className="right-10 bg-black/50 text-white hover:bg-black/70 border-none" />
      {/* </div> */}
  </Carousel>
     
  </DialogContent>
</Dialog>

  
    </>
  
  )
}

export default ProductImeges
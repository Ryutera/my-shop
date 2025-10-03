"use client";
import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Asset } from "contentful";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogOverlay } from "./ui/dialog";
import { ArrowLeft, ArrowRight } from "lucide-react";
type Props = {
  thumbnail: Asset;
  images: Asset[];
};

const ProductImeges = ({ thumbnail, images }: Props) => {
  const [dialogSlideIndex, setDialogSlideIndex] = useState(-1);
  const [isZoomed, setIsZoomed] = useState(false)
  const [open, setOpen] = useState(false)

  const handleZoomToggle = () => {
    setIsZoomed((prev) => !prev)
  }

  
  
  const handleContentClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setOpen((prev) => !prev)
      setIsZoomed(false)

    }
  }



  return (
    <>
      <Dialog onOpenChange={setOpen} open={open}>
        <DialogTitle className="sr-only">Product Image Gallery</DialogTitle>
        <Carousel>
          <CarouselContent>
            {/* Thumbnail image */}
            <CarouselItem key="thumbnail">
              <div className="flex justify-center ">
                <DialogTrigger asChild>
                  <img
                    src={`https:${thumbnail.fields.file?.url}`}
                    alt=""
                    className="h-[600px] object-cover "
                    onClick={() => setDialogSlideIndex(-1)}
                  />
                </DialogTrigger>
              </div>
            </CarouselItem>

            {/* Images */}
            {images.map((image, index) => (
              <CarouselItem key={index}>
                <div className="flex justify-center" >
                  {image.fields.file?.url && (
                    <DialogTrigger asChild>
                      <img
                        src={`https:${image.fields.file.url}`}
                        alt=""
                        className="h-[600px] object-cover"
                        onClick={() => setDialogSlideIndex(index)}
                      />
                    </DialogTrigger>
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




        <DialogContent className="max-w-[100vw] max-h-[100vh] p-2 bg-black bg-opacity-20 " >

          <div className="grid grid-cols-1 sm:grid-cols-3 items-center" onClick={handleContentClick}>

            <div className="hidden sm:flex items-center  justify-center  ">
              <button onClick={() => setDialogSlideIndex((prev) => prev === -1 ? -1 : prev - 1)}>
                {dialogSlideIndex === -1 ? <></> : <ArrowLeft className="text-white" />}
              </button>
            </div>

            <Carousel>
              <CarouselContent>
                {dialogSlideIndex < 0 ? (
                  <CarouselItem key="thumbnail">
                    <div className={`flex justify-center  items-center min-h-[95vh] ${isZoomed && "scale-150"}`} onClick={handleZoomToggle}>
                      <img
                        src={`https:${thumbnail.fields.file?.url}`}
                        alt=""
                        className={`h-[90vh] max-w-full object-cover   ${isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"}`}
                      />
                    </div>
                  </CarouselItem>
                ) : (
                  <CarouselItem key={dialogSlideIndex}>
                   <div className={`flex justify-center  items-center min-h-[95vh] ${isZoomed && "scale-150"}`} onClick={handleZoomToggle}>
                      {images[dialogSlideIndex]?.fields.file?.url && (
                        <img
                          src={`https:${images[dialogSlideIndex].fields.file.url}`}
                          alt=""
                           className={`h-[90vh] max-w-full object-cover   ${isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"}`}
                        />
                      )}
                    </div>
                  </CarouselItem>
                )}
              </CarouselContent>
            </Carousel>

            <div className="hidden sm:flex items-center  justify-center">
              <button onClick={() => setDialogSlideIndex((prev) => prev === images.length - 1 ? prev : prev + 1)}>
                {dialogSlideIndex === images.length - 1 ? <></> : <ArrowRight className="text-white" />}
              </button>

            </div>
            
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductImeges;

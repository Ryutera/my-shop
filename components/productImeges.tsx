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
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "./ui/dialog";
import { ArrowLeft, ArrowRight } from "lucide-react";
type Props = {
  thumbnail: Asset;
  images: Asset[];
};

const ProductImeges = ({ thumbnail, images }: Props) => {
  const [dialogSlideIndex, setDialogSlideIndex] = useState(-1);

  console.log(dialogSlideIndex, "えーぴーあい");
  console.log(images[dialogSlideIndex], "いめじ");

  return (
    <>
      <Dialog>
        <DialogTitle className="sr-only">Product Image Gallery</DialogTitle>
        <Carousel>
          <CarouselContent>
            {/* Thumbnail image */}
            <CarouselItem key="thumbnail">
              <div className="flex justify-center">
                <DialogTrigger asChild>
                  <img
                    src={`https:${thumbnail.fields.file?.url}`}
                    alt=""
                    className="h-[400px] object-cover rounded-lg"
                    onClick={() => setDialogSlideIndex(-1)}
                  />
                </DialogTrigger>
              </div>
            </CarouselItem>

            {/* Images */}
            {images.map((image, index) => (
              <CarouselItem key={index}>
                <div className="flex justify-center">
                  {image.fields.file?.url && (
                    <DialogTrigger asChild>
                      <img
                        src={`https:${image.fields.file.url}`}
                        alt=""
                        className="h-[400px] object-cover rounded-lg"
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

        <DialogContent className="max-w-[90vw] max-h-[95vh] p-2">
          <div className="grid grid-cols-1 sm:grid-cols-3 items-center">

            <div className="flex items-center  justify-center  ">
              <button onClick={() => setDialogSlideIndex((prev) => prev===-1 ? -1: prev - 1)}>
              {dialogSlideIndex===-1? <></>:   <ArrowLeft/>}
              </button>
            </div>

            <Carousel>
              <CarouselContent>
                {dialogSlideIndex < 0 ? (
                  <CarouselItem key="thumbnail">
                    <div className="flex justify-center items-center min-h-[95vh]">
                      <img
                        src={`https:${thumbnail.fields.file?.url}`}
                        alt=""
                        className="max-h-[90vh] max-w-full object-cover rounded-lg"
                      />
                    </div>
                  </CarouselItem>
                ) : (
                  <CarouselItem key={dialogSlideIndex}>
                    <div className="flex justify-center items-center min-h-[95vh]">
                      {images[dialogSlideIndex]?.fields.file?.url && (
                        <img
                          src={`https:${images[dialogSlideIndex].fields.file.url}`}
                          alt=""
                          className="max-h-[90vh] max-w-full object-cover rounded-lg"
                        />
                      )}
                    </div>
                  </CarouselItem>
                )}
              </CarouselContent>
            </Carousel>
            
            <div className="flex items-center  justify-center">     
              <button onClick={() => setDialogSlideIndex((prev) =>prev===images.length-1? prev:prev+1)}>
                {dialogSlideIndex===images.length-1? <></>:   <ArrowRight/>}
              </button>

            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductImeges;

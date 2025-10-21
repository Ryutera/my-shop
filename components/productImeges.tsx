"use client";
import React, { useEffect, useState } from "react";
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
  const [isZoomed, setIsZoomed] = useState(false)
  const [open, setOpen] = useState(false)

  //パン操作
  const [position, setPosition] = useState({ x: 0, y: 0 })  // 画像の位置
  const [isDragging, setIsDragging] = useState(false)       // ドラッグ中？
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 }) // ドラッグ開始位置

  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // タッチ操作が可能かチェック
    const checkTouch = window.matchMedia("(pointer: coarse)").matches;
    setIsTouchDevice(checkTouch);
  }, []);

  const handleZoomToggle = () => {
    if (isZoomed) {
      // ズームアウト時は位置もリセット
      setIsZoomed(false)
      setPosition({ x: 0, y: 0 })
    } else {
      setIsZoomed(true)
    }
  }



  const handleContentClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setOpen((prev) => !prev)
      setIsZoomed(false)

    }
  }


  const handleMouseDown = (e: React.MouseEvent) => {
    if (isZoomed) {
      e.stopPropagation()
      setIsDragging(true)
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && isZoomed) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      })
    }
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
  }


  const handleMouseUp = () => {
    setIsDragging(false)
  }


  return (
    <>
      <Dialog onOpenChange={setOpen} open={open}>
        <DialogTitle className="sr-only">Product Image Gallery</DialogTitle>
        <Carousel>

          <div className="flex justify-center  items-center">
            {/* unvisible when using mobile device */}
            <CarouselPrevious className="hidden md:block md:static translate-y-0 mr-2" />
          <CarouselContent>
            {/* Thumbnail image */}
            <CarouselItem key="thumbnail">
              <div className="flex justify-center ">
                <DialogTrigger asChild>

                  <img
                    src={`https:${thumbnail.fields.file?.url}`}
                    alt=""
                    className="h-[600px] object-cover"
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
<CarouselNext className="hidden md:block md:static  translate-y-0 ml-2" />
          </div>

         
        
        </Carousel>




        <DialogContent className="max-w-[100vw] max-h-[100dvh] p-2 bg-black bg-opacity-20">

          <div className="grid grid-cols-1 sm:grid-cols-3 items-center" onClick={handleContentClick}>

            <div className="hidden sm:flex items-center  justify-center  ">
              <button onClick={() => setDialogSlideIndex((prev) => prev === -1 ? -1 : prev - 1)}>
                {dialogSlideIndex === -1 ? <></> : <ArrowLeft className="text-white" />}
              </button>
            </div>

            <Carousel className={` duration-500 ${isZoomed && "scale-[1.7]"}`}>
              <CarouselContent >
                {dialogSlideIndex < 0 ? (
                  <CarouselItem key="thumbnail">
                    <div className="flex justify-center  items-center min-h-[95dvh]"
                      onClick={isTouchDevice ? undefined : handleZoomToggle}
                      onMouseDown={handleMouseDown}
                      onMouseMove={handleMouseMove}
                      onMouseUp={handleMouseUp}
                      onMouseLeave={handleMouseLeave}
                    >

                      <img
                        src={`https:${thumbnail.fields.file?.url}`}
                        alt=""
                        className={`h-[95dvh] sm:h-[90dvh] max-w-full object-cover transition-transform 
                          ${isZoomed ? (isDragging ? "cursor-grabbing" : "cursor-grab") : "cursor-zoom-in"
                          }
                         `
                        }

                        style={isZoomed ? {
                          transform: `scale(2.7) translate(${position.x / 2.7}px, ${position.y / 2.7}px)`,
                          transition: isDragging ? 'none' : 'transform 0.5s'
                        } : undefined}



                      />

                    </div>
                  </CarouselItem>
                ) : (
                  <CarouselItem key={dialogSlideIndex}>
                    <div className="flex justify-center  items-center min-h-[95dvh]" onClick={handleZoomToggle}
                      onMouseDown={handleMouseDown}
                      onMouseMove={handleMouseMove}
                      onMouseUp={handleMouseUp}
                      onMouseLeave={handleMouseLeave}>
                      {images[dialogSlideIndex]?.fields.file?.url && (
                        <img
                          src={`https:${images[dialogSlideIndex].fields.file.url}`}
                          alt=""
                          className={`h-[95dvh] sm:h-[90dvh] max-w-full object-cover   ${isZoomed ? (isDragging ? "cursor-grabbing" : "cursor-grab") : "cursor-zoom-in"
                            }`}


                          style={isZoomed ? {
                            transform: `scale(2.7) translate(${position.x / 2.7}px, ${position.y / 2.7}px)`,
                            transition: isDragging ? 'none' : 'transform 0.5s'
                          } : undefined}


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

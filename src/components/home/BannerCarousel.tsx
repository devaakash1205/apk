"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"

const banners = [
    { src: "https://picsum.photos/600/300?q=3", alt: "Special Offer 1", data_ai_hint: "travel promotion" },
    { src: "https://picsum.photos/600/300?q=4", alt: "Special Offer 2", data_ai_hint: "movie ticket" },
    { src: "https://picsum.photos/600/300?q=5", alt: "Special Offer 3", data_ai_hint: "investment ad" },
]

export function BannerCarousel() {
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {banners.map((banner, index) => (
          <CarouselItem key={index}>
            <Card className="overflow-hidden">
              <CardContent className="flex aspect-video items-center justify-center p-0">
                <Image src={banner.src} alt={banner.alt} width={600} height={300} className="w-full h-full object-cover" data-ai-hint={banner.data_ai_hint} />
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2" />
      <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2" />
    </Carousel>
  )
}

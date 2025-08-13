"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { CarouselWithProducts } from "@/app/types/CarouselWithProducts";
import ProductCard from "@/components/cardProduct";
import { useIsMobile } from "@/hooks/use-mobile";
import { Star } from "lucide-react";
import { product } from "@/app/types/product";
import slugify from "slugify";
import { useTheme } from "next-themes";
import { useEffect } from "react";

export default function CarouselWithProduct({
  products,
}: {
  products: product[];
}) {
  const carousels: CarouselWithProducts[] = [
    {
      title: "PROMOTIONS",
      id: 1,
    },
    {
      title: "RELEASES",
      id: 2,
    },
  ];

  const IsMobile = useIsMobile();

  const { theme } = useTheme();

  if (IsMobile) {
    products = products.slice(0, 3);
  }
  let iconColor;
  useEffect(() => {
    iconColor = theme === "light" ? "hsl(240 11% 13.9%)" : "white";
  }, []);

  return (
    <>
      {carousels.map((carousel) => (
        <div key={carousel.id} className="w-full mb-8 z-1">
          <div className="m-auto bg-[var(--background)] w-full flex flex-col max-w-7xl mx-auto justify-center z-1 rounded-lg">
            <h1 className="flex flex-row w-full font-bold text-lg px-1 mx-0 text-primary rounded p-2 border-l-8 border-primary">
              <Star fill={iconColor} className="white mr-2" />
              {carousel.title}
            </h1>
            <Carousel
              orientation={`${IsMobile ? "vertical" : "horizontal"}`}
              opts={{
                active: IsMobile ? false : true,
              }}
              className="m-auto w-full justify-center h-full"
            >
              <CarouselContent className="py-4 gap-6 md:gap-1 px-4">
                {products.map((product: product) => (
                  <CarouselItem
                    key={product.id}
                    className="sm:basis-1/3 md:basis-1/2 lg:basis-1/3 xl:basis-1/4 flex max-w-fit"
                  >
                    <ProductCard
                      product={product}
                      productLink={`product/${product.id}/${slugify(
                        product.title
                      )}`}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>

              <CarouselNext variant="secondary" className="hidden md:flex" />
              <CarouselPrevious
                variant="secondary"
                className="hidden md:flex"
              />
            </Carousel>
          </div>
        </div>
      ))}
    </>
  );
}

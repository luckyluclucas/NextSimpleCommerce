"use client";
import { product, image } from "@/app/types/product";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { ShoppingCartIcon, Truck } from "lucide-react";
import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { UseEmblaCarouselType } from "embla-carousel-react";
import useCart from "@/hooks/useCart";
import ShippingCalculatorInput from "@/components/shippingCalculatorInput";
import { RiTruckFill } from "react-icons/ri";

export default function ProductPage({ product }: { product: product }) {
  const mainImage = product.images.find((img) => img.isMain);
  const secondaryImages: image[] = product.images;

  const [activedImage, setActivedImage] = useState(mainImage.imageUrl);
  const { addToCart } = useCart();

  const [emblaRef, emblaApi] = useEmblaCarousel();
  const canScrollnext = emblaApi?.canScrollNext;
  return (
    <main className="w-full p-2 md:p-0 mt-[120px]">
      <div className="grid grid-rows-[120px_minmax(600px,1fr)_100px] h-[700px] w-full max-w-[1280px] mx-auto font-[family-name:var(--font-geist-sans)]">
        {product.isInPromotion ? (
          <h1 className="w-full h-[60px] px-1 text-4xl/4 font-bold content-center m-auto">
            {product.title}
          </h1>
        ) : (
          ""
        )}
        <div className="w-full h-full min-h-0 grid grid-rows md:grid-cols-2">
          <div className="col-span-1 w-auto h-full flex content-center flex-col rounded-xl px-2">
            <Image
              width={512}
              height={512}
              src={activedImage}
              alt=""
              className="justify-self-center m-auto mb-4 w-full h-full rounded-xl"
            ></Image>
            <div className="mt-auto my-2 h-fit">
              <Carousel
                opts={{
                  watchDrag: true,
                  dragFree: false,
                  containScroll: "trimSnaps",
                  align: "start",
                }}
                orientation={"horizontal"}
                className="md:p-1 h-full"
              >
                <CarouselContent className="gap-2">
                  {secondaryImages.map((img, i) => (
                    <CarouselItem
                      key={i}
                      className={`${
                        img.imageUrl === activedImage
                          ? "border-primary border-3 rounded bg-primary"
                          : ""
                      } dark:text-white rounded max-w-fit max-h-fit border-2 m-0 p-0 justify-center sm:basis-1/5`}
                    >
                      <Image
                        onClick={() => (
                          setActivedImage(img.imageUrl),
                          console.log(activedImage)
                        )}
                        className={`rounded justify-center ${
                          img.imageUrl === activedImage ? "" : ""
                        }`}
                        width={60}
                        height={40}
                        src={img.imageUrl}
                        alt={img.altText}
                      ></Image>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          </div>
          <div className="col-span-1 w-auto h-full flex flex-col">
            {product.isInPromotion ? (
              <div className="rounded-lg grid grid-rows-2 bg-primary dark:bg-secondary h-40 text-lg font-medium p-4 text-white">
                <div className="grid grid-cols-2 content-center">
                  <div className="">Promotion</div>
                  <div className="justify-self-end">
                    It will be finished in 3 days
                  </div>
                </div>

                <div className="grid grid-cols-3 content-center">
                  <span>DESCONTO DE 5%</span>
                  <Separator
                    orientation="vertical"
                    className="mx-auto h-[120px]"
                  />
                  <span className="justify-self-end">em estoque</span>
                </div>
              </div>
            ) : (
              <div className="rounded-lg text-black dark:bg-secondary my-2 md:h-40 text-lg font-medium dark:text-white">
                <h1 className="w-full px-1 text-2xl md:text-4xl font-bold m-auto">
                  {product.title}
                </h1>
              </div>
            )}
            <div className="p-2">
              <div className="py-2 gap-2 text-sm hidden lg:flex text-nowrap">
                <span className="text-gray-600 dark:text-zinc-400 ">
                  {" "}
                  Vendido por seller e entregue por sender{" "}
                </span>
                <b className="text-[#1f9050]">Em estoque</b>
                <Link
                  href="/product"
                  className="justify-self-end ml-auto font-semibold text-primary"
                >
                  Mais ofertas
                </Link>
              </div>
              <div className="py-2 gap-1 flex text-nowrap whitespace-nowrap">
                <Truck color="#1f9050" />
                <b className="text-[#1f9050] text-base mx-1">Frete grátis</b>
                <span className="text-sm content-center text-gray-600 dark:text-zinc-400 ">
                  {" "}
                  - consulte dinsponibilidade
                </span>
              </div>
              <div className="py-2">
                <div className="flex gap-1">
                  <span className="font-bold text-3xl md:text-5xl line-clamp-none text-primary">
                    R$
                    {product.price}
                  </span>
                  <div className="hidden lg:flex justify-end content-center gap-2 ml-auto items-center align-center">
                    <Link href={`/carrinho`} className="cursor-pointer">
                      <Button
                        size="lg"
                        className="text-xl h-14 cursor-pointer dark:text-white font-bold dark:bg-chart-2"
                      >
                        Comprar
                      </Button>
                    </Link>

                    <Button
                      onClick={() => addToCart(product)}
                      className="h-14 cursor-pointer dark:bg-chart-2/80"
                    >
                      <ShoppingCartIcon
                        size={24}
                        className="!size-12 cursor-pointer dark:text-white"
                      />
                    </Button>
                  </div>
                </div>
                <span className="p-2 line-clamp-1 text-sm text-gray-500 dark:text-zinc-400 ">
                  A vista no PIX
                </span>
                <span className="p-2 line-clamp-2 text-sm text-gray-500 dark:text-zinc-400 ">
                  ou em até{" "}
                  <b className="">
                    10x de R$ {(parseInt(product.price) * 1.2) / 10}
                  </b>
                </span>
              </div>
            </div>{" "}
            <div className="md:hidden flex justify-center flex-col w-full gap-2">
              <Link
                href={`/carrinho`}
                className="cursor-pointer content-center justify-center mx-auto"
              >
                <Button
                  size="lg"
                  className="text-lg h-8 mx-auto w-[90vw] cursor-pointer dark:text-white font-bold dark:bg-chart-2"
                >
                  Comprar
                </Button>
              </Link>

              <Button
                onClick={() => addToCart(product)}
                className="h-8 mx-auto w-[90vw] cursor-pointer dark:text-white justify-around font-semibold dark:bg-chart-2/80"
              >
                {" "}
                adicionar ao carrinho
                <ShoppingCartIcon
                  size={24}
                  className="!size-6 cursor-pointer dark:text-white"
                />
              </Button>
            </div>
            <div className="flex w-full flex-col items-end">
              <div className="items-center">
                <p className="flex-1 items-center flex flex-row gap-2 my-1 content-center text-start w-full max-w-48 text-nowrap">
                  <RiTruckFill size={20} color="primary" /> Calcular Frete{" "}
                </p>
                <ShippingCalculatorInput />
              </div>
            </div>
            <div className="mt-auto my-2">
              <h1>related products</h1>
              <div className="h-[100px] border-2 border-border"></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

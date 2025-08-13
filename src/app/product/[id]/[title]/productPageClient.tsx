"use client";
import { product, image } from "@/app/types/product";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { ShoppingCartIcon, Truck } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import useCart from "@/hooks/useCart";
import ShippingCalculatorInput from "@/components/shippingCalculatorInput";
import { RiTruckFill } from "react-icons/ri";
import Decimal from "decimal.js";
import { ProductDetails } from "@/components/productDetails";

export default function ProductPage({ product }: { product: product }) {
  const mockProduct = {
    id: 1,
    name: product.typeDetails.brand + " " + product.typeDetails.model_name,
    type: "mouse" as const,
    description: product.description,
    mouseDetails: {
      sensor: product.typeDetails.sensor,
      dpi: 16000,
      wireless: product.typeDetails.wireless,
      weight: product.typeDetails.weight + " gramas",
      dimensions: "12cm x 6cm x 4cm",
      compatibility: "Windows, macOS, Linux",
    },
    landingContent: (
      <div>
        <p>
          O <strong>Mouse Gamer Pro</strong> foi desenvolvido para quem exige
          desempenho e precisão. Com um design ergonômico, ele garante conforto
          durante horas de uso.
        </p>
        <img
          src="https://via.placeholder.com/800x400"
          alt="Imagem do produto"
          className="rounded-lg my-4"
        />
        <p>
          Equipado com o mais avançado sensor óptico, oferece rastreamento de
          alta precisão e personalização completa de DPI.
        </p>
      </div>
    ),
  };
  const mainImage = product.images.find((img) => img.isMain);
  const secondaryImages: image[] = product.images;

  const [activedImage, setActivedImage] = useState(mainImage?.imageUrl);
  const { addToCart } = useCart();

  const [carouselOneApi, setCarouselOneApi] = useState<CarouselApi>();
  const [carouselTwoApi, setCarouselTwoApi] = useState<CarouselApi>();

  const syncCarousels = useCallback(
    (mainApi: CarouselApi, secondaryApi: CarouselApi) => {
      if (!mainApi || !secondaryApi) return;
    },
    []
  );

  useEffect(() => {
    if (!carouselOneApi || !carouselTwoApi) return;

    carouselOneApi.on("select", () => {
      syncCarousels(carouselOneApi, carouselTwoApi);
      const currentIndex = carouselOneApi.selectedScrollSnap();
      setActivedImage(secondaryImages[currentIndex].imageUrl);
    });
    carouselTwoApi.on("select", () =>
      syncCarousels(carouselTwoApi, carouselOneApi)
    );

    return () => {
      carouselOneApi.off("select", () =>
        syncCarousels(carouselOneApi, carouselTwoApi)
      );
      carouselTwoApi.off("select", () =>
        syncCarousels(carouselTwoApi, carouselOneApi)
      );
    };
  }, [carouselOneApi, carouselTwoApi, syncCarousels]);

  return (
    <main className="w-full flex flex-col min-h-screen  md:p-0 mt-[120px] mb-8 max-w-7xl mx-auto">
      <div className="flex-grow ">
        <div className="grid mb-4 max-w-[1280px] mx-auto px-1 md:px-4 w-full font-[family-name:var(--font-geist-sans)]">
          {product.isInPromotion ? (
            <h1 className="w-full h-[60px] px-1 text-4xl/4 font-bold content-center m-auto">
              {product.title}
            </h1>
          ) : (
            ""
          )}
          <div className="w-full h-full min-h-0 grid grid-rows md:grid-cols-2">
            <div className="">
              <Carousel
                setApi={setCarouselOneApi}
                opts={{
                  watchDrag: true,
                  dragFree: false,
                  containScroll: "trimSnaps",
                  align: "center",
                }}
                orientation={"horizontal"}
                className="w-full"
              >
                <CarouselContent className="flex sm:gap-2">
                  {secondaryImages.map((img, i) => (
                    <CarouselItem
                      key={i}
                      className={`${
                        img.imageUrl === activedImage ? "" : ""
                      } flex items-center justify-center rounded-lg`}
                    >
                      <div className="relative md:hidden w-full aspect-square rounded-lg">
                        <Image
                          className="flex pl-4  md:hidden object-contain object-center md:object-left rounded-lg"
                          fill
                          src={img.imageUrl}
                          alt={img.altText}
                        ></Image>
                      </div>

                      <div className="hidden md:block relative md:w-[340px] lg:w-[480px] xl:h-[600px] xl:w-[600px] aspect-square">
                        <Image
                          className="md:py-0 md:pl-0 object-cover object-center md:object-left rounded-lg"
                          fill
                          src={img.imageUrl}
                          alt={img.altText}
                        ></Image>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
              <div className="sm:pr-8 sm:pl-4 mt-4">
                <Carousel
                  setApi={setCarouselTwoApi}
                  opts={{
                    watchDrag: true,
                    dragFree: false,
                    containScroll: "trimSnaps",
                    align: "start",
                  }}
                  orientation={"horizontal"}
                  className="p-1 h-full"
                >
                  <CarouselContent className="gap-2">
                    {secondaryImages.map((img, i) => (
                      <CarouselItem
                        key={i}
                        className={`${
                          img.imageUrl === activedImage
                            ? "border-primary border-3 rounded bg-primary"
                            : ""
                        } dark:text-white rounded max-w-fit max-h-fit border-2 m-0 p-0 justify-center basis-1/4 sm:basis-1/6`}
                      >
                        <Image
                          onClick={() => {
                            setActivedImage(img.imageUrl);
                            if (carouselOneApi) {
                              carouselOneApi.scrollTo(i, true);
                            }
                          }}
                          className={`rounded justify-center ${
                            img.imageUrl === activedImage ? "" : ""
                          } rounded object-contain`}
                          width={50}
                          height={50}
                          src={img.imageUrl}
                          alt={img.altText}
                        ></Image>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              </div>
            </div>
            <div className="col-span-1 w-auto max-h-[500px] h-full lg:max-h-screen flex flex-col">
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
                  <b className="text-green-800">Em estoque</b>
                  <Link
                    href="/product"
                    className="justify-self-end ml-auto font-semibold text-primary"
                  >
                    Mais ofertas
                  </Link>
                </div>
                <div className="py-2 gap-1 flex text-nowrap whitespace-nowrap">
                  <Truck color="#1f9050" />
                  <b className="text-green-800 text-base mx-1">Frete grátis</b>
                  <span className="text-sm content-center text-gray-600 dark:text-zinc-400 ">
                    {" "}
                    - consulte dinsponibilidade
                  </span>
                </div>
                <div className="py-2">
                  <div className="flex gap-1">
                    <span className="font-bold text-3xl md:text-5xl line-clamp-none text-green-400">
                      R$
                      {new Decimal(product.price).toFixed(2)}
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
                  <div className="hidden md:flex flex-col lg:hidden content-center gap-2 w-full items-center align-center">
                    <Link href={`/carrinho`} className="cursor-pointer w-full">
                      <Button
                        size="lg"
                        className="text-xl h-12 w-full cursor-pointer dark:text-white font-bold dark:bg-chart-2"
                      >
                        Comprar
                      </Button>
                    </Link>

                    <Button
                      onClick={() => addToCart(product)}
                      className="h-12 cursor-pointer dark:bg-chart-2/80 w-full"
                    >
                      <ShoppingCartIcon
                        size={24}
                        className="!size-12 cursor-pointer dark:text-white"
                      />
                    </Button>
                  </div>
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
                  className="h-8 mx-auto w-[90vw] cursor-pointer dark:text-white flex justify-center font-semibold dark:bg-chart-2/80"
                >
                  {" "}
                  Adicionar ao carrinho
                  <ShoppingCartIcon
                    size={24}
                    className="!size-6 cursor-pointer dark:text-white"
                  />
                </Button>
              </div>
              <div className="flex w-full flex-col md:items-end items-center">
                <div className="flex text-sm md:text-base md:flex-col gap-1 my-4 md:items-start items-center mx-4">
                  <p className="items-center flex flex-row my-1 content-center text-start w-48 gap-2 mr-2 text-nowrap">
                    <RiTruckFill size={20} color="primary" /> Calcular frete{" "}
                  </p>
                  <ShippingCalculatorInput />
                </div>
              </div>
              <div className="mt-auto">
                <h1>related products</h1>
                <div className="h-[90px] border-2 border-border"></div>
              </div>
            </div>
          </div>
        </div>
        <ProductDetails product={mockProduct} />
      </div>
    </main>
  );
}

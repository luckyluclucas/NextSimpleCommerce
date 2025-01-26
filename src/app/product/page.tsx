import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Link from "next/link";
import { Star } from "lucide-react";
import { product } from "../types/product";
import ProductCard from "@/components/cardProduct";
import { CarouselWithProducts } from "../types/CarouselWithProducts";

async function getProducts(): Promise<product[]> {
  try {
    const res = await fetch(process.env.URL + '/api/products'); // Requisição para a API Route (mesmo projeto)
    if (!res.ok) {
      // Tratar erros de requisição. Importante para evitar erros silenciosos.
      console.error(`Erro ao buscar produtos: ${res.status} ${res.statusText}`);
      return []; // ou lançar um erro: throw new Error('Erro ao buscar produtos');
    }
    const products: product[] = await res.json();
    return products;
  } catch (error) {
    console.error("Erro na requisição:", error);
    return []; // ou lançar um erro
  }
}



export default async function Home() {

  const products = await getProducts();

  const carousels: CarouselWithProducts[] = [
    {

      id: 1,
    },
    {

      id: 2,

    },
    {

      id: 3,
    }
  ]

  return (
    <div className="p-0 m-0 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-0 row-start-2 items-center sm:items-start z-0">
        <div className="absolute inset-0">
          <AspectRatio ratio={16 / 9} className="border-b-2 bg-neutral-50 border-primary">

          </AspectRatio>
        </div>
        <div className="flex w-full flex-col p-0 mx-auto mt-24">{carousels.map((carousel) => (
          <div key={carousel.id} className="w-full z-[1]">
            <div className="m-auto w-full flex flex-col px-4 max-w-7xl mx-auto justify-center z-[1] rounded-lg">
              {carousel.title ?
                <h1 className="flex flex-row font-bold text-lg p-2 text-white bg-primary rounded-lg">
                  <Star fill="white" className="white mx-2" />
                  {carousel.title}
                </h1> : ""}
              <div className="m-auto w-full grid grid-cols-5 justify-center h-full">

                {products.slice(0, 5).map((product) => (

                  <div key={product.id} className="sm:basis-1/3 py-1 mx-1 md:basis-1/3 lg:basis-1/5 justify-center items-center aspect-square rounded-xl">

                    <ProductCard product={product} productLink={`product/${product.id}`} />


                  </div>

                ))}

              </div>

            </div>
          </div>

        ))}
        </div>
      </main>
    </div>
  );
}

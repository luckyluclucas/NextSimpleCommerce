import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Link from "next/link";
import { Star } from "lucide-react";
import { product } from "./types/product";
import ProductCard from "@/components/cardProduct";
import { CarouselWithProducts } from "./types/CarouselWithProducts";

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
      title: "OFERTAS DO DIA",
      id: 1,
    },
    {
      title: "DESTAQUES EM TECNOLOGIA",
      id: 2,

    },
    {
      title: "NOVIDADES",
      id: 3,
    }
  ]

  return (
    <div className="p-0 m-0 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start z-0">
        <div className="absolute h-[80vh] inset-0">
          <AspectRatio ratio={16 / 9} className="h-[80vh] border-b-2 bg-neutral-50 border-primary">

          </AspectRatio>
        </div>{carousels.map((carousel) => (
          <div key={carousel.id} className="w-full z-[1] md:h-[80vh]">
            <div className="m-auto w-full flex flex-col p-4 max-w-7xl mx-auto justify-center my-28 z-[1] rounded-lg">
              <h1 className="flex flex-row font-bold text-lg p-2 text-white bg-primary rounded-lg">
                <Star fill="white" className="white mx-2" />
                {carousel.title}
              </h1>
              <Carousel opts={{
                align: "start",
                loop: true,
              }} className="m-auto w-full justify-center h-full">
                <CarouselContent className="m-auto gap-1 py-4">
                  {products.map((product) => (

                    <CarouselItem key={product.id} className="sm:basis-1/3 md:basis-1/4 lg:basis-1/6 flex justify-center items-center aspect-square rounded-xl">
                      <Link className="m-0" href="/">
                        <ProductCard product={product} />
                      </Link>
                    </CarouselItem>

                  ))}
                </ CarouselContent>

              </Carousel>

            </div>
          </div>

        ))}
      </main>
    </div>
  );
}

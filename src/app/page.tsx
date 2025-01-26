import Image from "next/image"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import Link from "next/link"
import ProductCard from "@/components/cardProduct"
import { product } from "./types/product"
import { CarouselWithProducts } from "./types/CarouselWithProducts"
import { Star } from "lucide-react"

async function GetProducts(): Promise<product[]> {
    try {
        const data = await fetch(process.env.URL + "/api/products")
        const products: product[] = await data.json()
        return products
    } catch (error) {
        console.log("a error has ocurred while trying to fetch de products data")
        console.log(error)
        return []
    }
}

const carousels: CarouselWithProducts[] = [
    {
        title: "promotions",
        id: 1
    },
    {
        title: "releases",
        id: 2
    }
]

export default async function Home() {

    const products = await GetProducts()

    return (
        <div className="flex flex-col p-0 m-0">

            <div className="w-full h-[400px] absolute flex mt-14">
                <Image src="https://images.unsplash.com/photo-1491166617655-0723a0999cfc?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bmljZXxlbnwwfHwwfHx8MA%3D%3D"
                    fill={true}
                    alt="hahaah">
                </Image >

            </div>
            <div className="flex flex-col mt-96">
                {carousels.map((carousel) => (
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
            </div>


        </div >
    );
}
"use client"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel"
import { CarouselWithProducts } from "@/app/types/CarouselWithProducts"
import ProductCard from "@/components/cardProduct"
import { useIsMobile } from "@/hooks/use-mobile"
import { Star } from "lucide-react"
import { product } from "@/app/types/product"
import slugify from "slugify"
import { useTheme } from "next-themes"

export default function CarouselWithProduct({ products }: { products: product[] }) {

    const carousels: CarouselWithProducts[] = [
        {
            title: "PROMOTIONS",
            id: 1
        },
        {
            title: "RELEASES",
            id: 2
        }
    ]

    const IsMobile = useIsMobile()

    const { setTheme, theme } = useTheme()

    if (IsMobile) {
        products = products.slice(0, 3)
    }

    const iconColor = theme === 'light' ? 'hsl(346.8, 77.2%, 49.8%)' : 'white'


    return (<>
        {carousels.map((carousel) => (
            <div key={carousel.id} className="w-full mb-8 z-1">
                <div className="m-auto bg-[var(--background)] w-full flex flex-col max-w-7xl mx-auto justify-center z-1 rounded-lg">
                    <h1 className="flex flex-row w-full font-bold text-lg px-1 mx-0 text-primary rounded p-2 border-l-8 border-primary">
                        <Star fill={iconColor} className="white mr-2" />
                        {carousel.title}
                    </h1>
                    <Carousel orientation={`${IsMobile ? 'vertical' : 'horizontal'}`} opts={{
                        active: IsMobile ? false : true,

                    }} className="m-auto w-full justify-center h-full">
                        <CarouselContent className="m-auto ml[-4px] py-4">
                            {products.map((product: product) => (

                                <CarouselItem key={product.id} className="sm:basis-1/3 pl-1 md:basis-1/4 lg:basis-1/6 flex justify-center items-center aspect-square rounded-xl">

                                    <ProductCard product={product} productLink={`product/${product.id}/${slugify(product.title)}`} />

                                </CarouselItem>

                            ))}
                        </ CarouselContent>

                        <CarouselNext variant="secondary" className="hidden md:flex" />
                        <CarouselPrevious variant="secondary" className="hidden md:flex" />

                    </Carousel>
                </div>
            </div>

        ))}</>)
}
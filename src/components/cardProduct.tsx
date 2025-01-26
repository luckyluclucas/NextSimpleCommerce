"use client"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { ShoppingCart } from "lucide-react"
import { product } from "@/app/types/product"
import Link from "next/link"

interface ProductCardProps {
    product: product;
    productLink: string;
}



const ProductCard: React.FC<ProductCardProps> = ({ product, productLink }) => {


    return (<Link href={productLink}>
        <Card className="aspec-[3/4] hover:bg-secondary flex-col flex hover:z-10 transition-all duration-500 ease-in-out justify-center rounded-lg">

            <CardContent className="m-0">

                <Image
                    className="sm:w-full h-full p-2 object-cover rounded-lg aspect-square"
                    src={product.imageSrc}
                    width={1280}
                    height={2080}
                    alt="image"
                />

            </CardContent>
            <CardHeader className="p-3">
                <CardTitle className="text-base h-[3em] font-semibold line-clamp-3">{product.title}</CardTitle>
                <span className="text-sm mt-4 text-gray-600"><s>R$ {product.price}</s></span>
                <span className="text-xl mt-0 text-primary font-semibold rounded py-1 bg-white justify-start mr-auto">R$ {product.price}</span>
                <span className="line-clamp-1 mt-0 p-0 text-sm text-gray-500">A vista no PIX</span>
                <span className="line-clamp-1 mt-0 text-sm text-gray-500">ou em até <b className="">10x de R$ {(parseInt(product.price) * 1.2) / 10}</b></span>

                <Button onClick={() => { console.log("didn' got redirected") }} className="mt-4"><ShoppingCart />Comprar</Button>
            </CardHeader>

        </Card>
    </Link>

    )
}

export default ProductCard;
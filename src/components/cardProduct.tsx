"use client";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";
import { product } from "@/app/types/product";
import Link from "next/link";
import useCart from "@/hooks/useCart";
import { useEffect } from "react";
import Decimal from "decimal.js";

interface ProductCardProps {
  product: product;
  productLink: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, productLink }) => {
  const { addToCart, cart } = useCart();
  const mainImage = product.images.find((image) => image.isMain);
  return (
    <Card className="h-content aspect-[3/4] mb-6 p-0 m-0 hover:scale-101 bg-[var(--background)] flex-col flex hover:z-10 transition-all duration-500 ease-in-out justify-center rounded-lg">
      <Link href={productLink}>
        <CardContent className="m-0 p-0 w-[285px]">
          <Image
            className="sm:w-full h-full p-1 object-cover rounded-lg aspect-square"
            src={mainImage.imageUrl}
            width={285}
            height={285}
            alt="image"
          />
        </CardContent>

        <CardHeader className="p-1 m-0">
          <CardTitle className="text-base font-semibold line-clamp-3 h-[3em]">
            {product.title}
          </CardTitle>
          <span className="text-sm mt-0 text-gray-600 dark:text-zinc-400">
            <s>R$ {Decimal(product.price).toFixed(2)}</s>
          </span>
          <span className="text-xl m-0 text-primary font-semibold rounded py-0 bg-[var(--background)] justify-start mr-auto">
            R$ {Decimal(product.price).toFixed(2)}
          </span>
          <span className="line-clamp-1 mt-0 p-0 text-sm dark:text-zinc-400 text-gray-500">
            A vista no PIX
          </span>
          <span className="line-clamp-1 mt-0 text-sm dark:text-zinc-400 text-gray-500">
            ou em até{" "}
            <b className="">
              10x de R$ {Decimal((product.price * 1.2) / 10).toFixed(2)}
            </b>
          </span>
        </CardHeader>
      </Link>
      <div className="mx-1 mb-1">
        <Button
          onClick={() => {}}
          className="cursor-pointer w-full  bg-primary hover:bg-primary/70 dark:text-black dark:hover:text-accent"
        >
          Comprar
        </Button>
        <Button
          onClick={() => {
            addToCart(product);
          }}
          className="cursor-pointer w-full text-sm text-black my-1 bg-transparent dark:text-white hover:bg-primary/70  dark:hover:text-accent"
        >
          <ShoppingCart />
          Adicionar ao Carrinho
        </Button>
      </div>
    </Card>
  );
};

export default ProductCard;

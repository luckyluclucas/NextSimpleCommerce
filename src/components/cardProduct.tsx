"use client";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";
import { product } from "@/app/types/product";
import Link from "next/link";
import useCart from "@/hooks/useCart";
import { useEffect } from "react";

interface ProductCardProps {
  product: product;
  productLink: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, productLink }) => {
  const { addToCart, cart } = useCart();

  useEffect(() => {
  }, [cart]);

  return (
    <Card className="aspec-[3/4] mb-12 hover:scale-101 bg-[var(--background)] flex-col flex hover:z-10 transition-all duration-500 ease-in-out justify-center rounded-lg">
      <Link href={productLink}>
        <CardContent className="m-0">
          <Image
            className="sm:w-full h-full p-2 object-cover rounded-lg aspect-square"
            src={product.imageSrc}
            width={1280}
            height={2080}
            alt="image"
          />
        </CardContent>

        <CardHeader className="p-1">
          <CardTitle className="text-base h-[3em] font-semibold line-clamp-3">
            {product.title}
          </CardTitle>
          <span className="text-sm mt-4 text-gray-600 dark:text-zinc-400">
            <s>R$ {product.price}</s>
          </span>
          <span className="text-xl mt-0 text-primary font-semibold rounded py-1 bg-[var(--background)] justify-start mr-auto">
            R$ {product.price}
          </span>
          <span className="line-clamp-1 mt-0 p-0 text-sm dark:text-zinc-400 text-gray-500">
            A vista no PIX
          </span>
          <span className="line-clamp-1 mt-0 text-sm dark:text-zinc-400 text-gray-500">
            ou em até{" "}
            <b className="">10x de R$ {(parseInt(product.price) * 1.2) / 10}</b>
          </span>
        </CardHeader>
      </Link>
      <div className="m-1">
        <Button
          onClick={() => {
            addToCart(product);
          }}
          className="cursor-pointer w-full h-full bg-primary hover:bg-primary/70 dark:text-black dark:hover:text-accent"
        >
          <ShoppingCart />
          Comprar
        </Button>
      </div>
    </Card>
  );
};

export default ProductCard;

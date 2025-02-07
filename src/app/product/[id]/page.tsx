import { product } from "@/app/types/product"
import { NextResponse } from "next/server";
import ProductCard from "@/components/cardProduct";
import Image from "next/image";
import { Separator } from "@radix-ui/react-separator";
import { Button } from "@/components/ui/button";
import { ShoppingCartIcon } from "lucide-react";
import Link from "next/link";

async function GetProductData<product>(id: number): Promise<product | undefined> {
    try {
        const response = await fetch(`${process.env.URL}/api/products/${id}`)
        if (!response.ok) {
            console.error(`Erro ao buscar o produto: ${response.statusText}`);
            return undefined
        }

        const product: product = await response.json();
        return product;
    } catch (error) {
        console.error("error at fetching product:", error)
        return undefined
    }
}

export default async function productPage({ params }: {

    params: { id: string }
}) {

    const id = parseInt((await params).id);

    if (isNaN(id)) {
        return NextResponse.json({ error: "it's not a id" }, { status: 400 })
    }
    const ProductData: product = (await GetProductData(id)) ?? {
        id: 0,
        title: "Produto não encontrado",
        description: "Este produto não está disponível.",
        imageSrc: "/placeholder.jpg",
        price: "0",
    };



    return (
        <main className="w-full mx-auto mt-[160px]">
            <div className="grid grid-rows-[60px_minmax(600px,1fr)_100px] h-[700px] w-full max-w-[1280px] mx-auto font-[family-name:var(--font-geist-sans)]">
                <h1 className="w-full h-[60px] text-xl font-bold content-center 1 m-auto leading-none">{ProductData.title}</h1>
                <div className="w-full h-full min-h-0 grid grid-cols-2">
                    <div className="col-span-1 w-auto h-full flex content-center flex-col">
                        <Image width={512} height={312} src={ProductData.imageSrc} alt="" className="justify-self-center m-auto"></Image>
                        <div className="w-full mt-auto border-2 border-primary flex content-end items-end justify-end h-[100px]"></div>
                    </div>

                    <div className="col-span-1 w-auto h-full flex flex-col">
                        <div className="rounded-lg1 grid grid-rows-2 rounded bg-primary h-40 text-lg font-medium p-4 text-white">
                            <div className="grid grid-cols-2 content-center">
                                <div className="">
                                    Promotion
                                </div>
                                <div className="justify-self-end">
                                    It'll be finished in 3 days
                                </div>
                            </div>

                            <div className="grid grid-cols-3 content-center">
                                <span>DESCONTO DE 5%</span>
                                <Separator className="w-[1px]  mx-auto bg-white" />
                                <span className="justify-self-end">em estoque</span>
                            </div>

                        </div>
                        <div className="p-2">
                            <div className="p-2 gap-2 text-sm flex">
                                <span> Vendido por seller e entregue por sender </span>
                                <b>Em estoque</b>
                                <a className="justify-self-end ml-auto font-semibold"> Mais ofertas</a>
                            </div>
                            <div className="p-2 gap-2 flex">
                                <span className="text-base font-semibold">Frete grátis</span>
                                <span className="text-sm content-center"> - consulte dinsponibilidade</span>
                            </div>
                            <div className="p-2">
                                <div className="flex gap-1">
                                    <span className="font-bold text-5xl text-primary">R$ {ProductData.price}</span>
                                    <div className="justify-end content-center gap-2 ml-auto items-center align-center flex">
                                        <Link href={`/carrinho`} className="cursor-pointer">
                                            <Button size="xlg" className="cursor-pointer">Comprar</Button>
                                        </Link>

                                        <Button size="lg" className="h-14 cursor-pointer">
                                            <ShoppingCartIcon size={24} className="!size-12 cursor-pointer" />
                                        </Button>

                                    </div>

                                </div>
                                <span className="p-2 line-clamp-1 text-sm text-gray-500">A vista no PIX</span>
                                <span className="p-2 line-clamp-1 text-sm text-gray-500">ou em até <b className="">10x de R$ {(parseInt(ProductData.price) * 1.2) / 10}</b></span>
                            </div>
                        </div>
                        <div className="mt-auto">
                            <h1>related products</h1>
                            <div className="h-[100px] border-2 border-primary">
                            </div>
                        </div>
                    </div>

                </div>
            </div >
        </main>
    )
}
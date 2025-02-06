import { product } from "@/app/types/product"
import { NextResponse } from "next/server";
import ProductCard from "@/components/cardProduct";
import Image from "next/image";

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
                <h1 className="w-full h-[60px] text-xl font-bold content-center 1 bg-blue-100 m-auto leading-none">{ProductData.title}</h1>
                <div className="w-full h-full min-h-0 grid grid-cols-2">
                    <div className="col-span-1 w-auto h-full bg-red-400 content-center">
                        <Image width={512} height={312} src={ProductData.imageSrc} alt="" className="1 mx-auto border-primary border-21"></Image>
                    </div>

                    <div className="col-span-1 w-auto h-full grid grid-cols-1 grid-rows-3 bg-red-100">
                        <div className="bg-blue-200 rounded-lg1 grid grid-rows-2">
                            <div className="grid grid-cols-2">
                                <div>
                                    finish in x: days
                                </div>
                            </div>
                            <div className="grid grid-cols-2">
                                <span>DESCONTO DE 5%</span>
                                <span className="justify-self-end">em estoque</span>
                            </div>

                        </div>
                        <div className="bg-blue-300">{ProductData.price}</div>
                        <div className="bg-blue-400">related products</div>
                    </div>

                </div>
            </div >
        </main>
    )
}
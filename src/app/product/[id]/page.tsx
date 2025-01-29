import { product } from "@/app/types/product"
import { NextResponse } from "next/server";

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
        <div className="h-screen flex bg-blue-500 m-0 font-[family-name:var(--font-geist-sans)]">
            { }
            <div className="mt-24">
                <h1 className="bg-blue-700 text-white">{ProductData.id}</h1>
            </div>
        </div >
    )
}
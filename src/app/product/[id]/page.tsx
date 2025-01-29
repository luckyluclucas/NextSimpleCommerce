import { product } from "@/app/types/product"

async function GetProductData(id: string) {
    try {
        const data = await fetch(`${process.env.URL}/produtos/${id}`)
        const product: product = await data.json()
        return product
    } catch (error) {
        console.log(error)
        console.log('failed at fetching data')
    }
}

export default async function productPage({ params }: {

    params: Promise<{ id: string }>
}) {
    const id = (await params).id;
    return (
        <div className="h-screen flex bg-blue-500 m-0 font-[family-name:var(--font-geist-sans)]">
            { }
            <div className="mt-24">
                <h1 className="bg-blue-700 text-white">{id}</h1>
            </div>
        </div >
    )
}
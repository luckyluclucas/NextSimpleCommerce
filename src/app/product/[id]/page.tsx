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

export default async function productPage() {
    const productData = await GetProductData()
    return (
        <div>
            kakak
        </div>
    )
}
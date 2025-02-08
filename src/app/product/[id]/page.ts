
import { redirect } from "next/navigation"
import { product } from "@/app/types/product"
import slugify from 'slugify'

const getProductTitle = async (id: number) => {
    try {
        const res: product = await fetch(`${process.env.URL}/api/products/${id}`).then((res) => res.json())
        return res
    } catch (error) {
        return console.log(error)
    }
}

export default async function updateURLwithTitle({ params }: { params: { id: number } }) {

    const { id } = await params
    const p: product = await getProductTitle(id)
    const titleURL = slugify(p.title)
    redirect(`${id}/${titleURL}`)
}
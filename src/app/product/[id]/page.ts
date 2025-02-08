
import { notFound, redirect } from "next/navigation"
import { product } from "@/app/types/product"
import slugify from 'slugify'

const getProductTitle = async (id: number) => {
    try {
        const res = await fetch(`${process.env.URL}/api/products/${id}`)
        if (!res.ok) {
            console.log('id does not exist')
            return undefined
        }

        const product = await res.json()
        return product
    } catch (error) {
        console.log(error)
        return undefined
    }
}

export default async function updateURLwithTitle({ params }: { params: { id: number } }) {

    const { id } = await params
    const p: product = await getProductTitle(id)
    if (p) {
        const titleURL = slugify(p.title)
        redirect(`/product/${id}/${titleURL}`)
    } else {
        console.log('id does not exist')
        notFound()
    }

}
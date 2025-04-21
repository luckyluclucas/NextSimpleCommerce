import { NextResponse } from "next/server";
import { getProductData } from "@/app/database/db";
import { product } from "@/app/types/product";

export async function GET() {
    const products: product[] = await getProductData()
    return NextResponse.json(products, { status: 200 })
}

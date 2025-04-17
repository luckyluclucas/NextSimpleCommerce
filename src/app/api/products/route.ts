import { NextResponse } from "next/server";
import { getProductData } from "@/database/getProductData";

export async function GET() {
    const products = getProductData()
    return NextResponse.json(products, { status: 200 })
}

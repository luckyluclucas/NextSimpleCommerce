import { NextResponse } from "next/server";
import { getProductData } from "@/app/database/getProductData";

export async function GET() {
    const products = getProductData()
    return NextResponse.json(products, { status: 200 })
}

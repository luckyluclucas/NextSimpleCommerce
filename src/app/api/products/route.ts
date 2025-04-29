import { NextResponse } from "next/server";
import { getAllProducts } from "@/app/database/db";
import { product } from "@/app/types/product";

export async function GET() {
  const products: product[] = await getAllProducts();
  return NextResponse.json(products, { status: 200 });
}

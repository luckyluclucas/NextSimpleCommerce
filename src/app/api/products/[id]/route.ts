"use server";
import { NextRequest, NextResponse } from "next/server";
import { getProductById } from "@/app/database/db";
import { product } from "@/app/types/product";

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{
      id: number;
    }>;
  },
) {
  const { id } = await params;
  if (isNaN(id)) {
    NextResponse.json({ error: "id inválido" }, { status: 400 });
  }
  const productId = await id;
  if (isNaN(productId)) {
    NextResponse.json({ error: "id inválido" }, { status: 400 });
  }

  const products: product[] = await getProductById(id);
  
  const productData = products.find((p) => p.id == id);

  if (!productData) {
    return NextResponse.json(
      { error: "produto não econtrado" },
      { status: 404 },
    );
  }

  return NextResponse.json(productData, { status: 200 });
}

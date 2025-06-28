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
      id: string;
    }>;
  }
) {
  const { id } = await params;
  if (isNaN(parseInt(id))) {
    NextResponse.json({ error: "id inválido" }, { status: 400 });
  }
  const productId = await parseInt(id);
  if (isNaN(productId)) {
    NextResponse.json({ error: "id inválido" }, { status: 400 });
  }

  const product = await getProductById(id);

  if (!product) {
    return NextResponse.json(
      { error: "produto não econtrado" },
      { status: 404 }
    );
  } else {
    const productData: product = product;
    return NextResponse.json(productData, { status: 200 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { getProductData } from "@/app/database/getProductData";

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
  const products = getProductData();
  const productData = products.find((p) => p.id == id);

  if (!productData) {
    return NextResponse.json(
      { error: "produto não econtrado" },
      { status: 404 },
    );
  }

  return NextResponse.json(productData, { status: 200 });
}

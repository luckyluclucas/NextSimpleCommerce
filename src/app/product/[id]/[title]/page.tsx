import { product } from "@/app/types/product";
import { NextResponse } from "next/server";
import slugify from "slugify";
import { redirect } from "next/navigation";
import { getProductById } from "@/app/database/db";
import { image } from "@/app/types/product";
import ProductPage from "./productPageClient";

export default async function productPage({
  params,
}: {
  params: Promise<{ id: string; title: string }>;
}) {
  const { id } = await params;

  if (isNaN(parseInt(id))) {
    return NextResponse.json({ error: "it's not a id" }, { status: 400 });
  }
  const ProductData: product = await getProductById(id);

  const { title } = await params;
  const mainImage = ProductData.images.find((img) => img.isMain);
  const secondaryImages: image[] = ProductData.images.filter(
    (img) => !img.isMain
  );
  const correctTitle = slugify(ProductData.title);

  if (title !== correctTitle) {
    return redirect(`/product/${ProductData.id}/${slugify(correctTitle)}`);
  }

  return <ProductPage product={ProductData} />;
}

import { product } from "@/app/types/product";
import { NextResponse } from "next/server";
import slugify from "slugify";
import { redirect } from "next/navigation";
import { getProductById } from "@/app/database/db";
import { image } from "@/app/types/product";
import ProductPage from "./productPageClient";
import { notFound } from "next/navigation";

export default async function productPage({
  params,
}: {
  params: Promise<{ id: string; title: string }>;
}) {
  const { id } = await params;

  if (isNaN(parseInt(id))) {
    return NextResponse.json({ error: "it's not a id" }, { status: 400 });
  }
  const productData: product | undefined = await getProductById(id);
  if (!productData) {
    return notFound();
  }
  const { title } = await params;
  const mainImage = productData.images.find((img) => img.isMain);
  const secondaryImages: image[] = productData.images.filter(
    (img) => !img.isMain
  );
  const correctTitle = slugify(productData.title);

  if (title !== correctTitle) {
    return redirect(`/product/${productData.id}/${slugify(correctTitle)}`);
  }

  return <ProductPage product={productData} />;
}

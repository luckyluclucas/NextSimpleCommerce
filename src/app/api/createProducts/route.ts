import "server-only";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import path from "path";
import { writeFile } from "fs/promises";
import { z } from "zod";
import { CreateProduct } from "@/app/database/productsMethods";
import { description } from "@/components/chart-area-interactive";
import { Decimal } from "decimal.js";

const productSchema = z.object({
  title: z.string(),
  price: z.coerce.number(),
  stock: z.coerce.number(),
  description: z.string(),
});

const image = z.object({
  imageUrl: z.string(),
  altText: z.string(),
  isMain: z.boolean(),
});

type image = {
  imageUrl: string;
  altText: string;
  isMain: boolean;
};
export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session || session.user?.role !== "admin" || request.method !== "POST") {
    return NextResponse.json({ message: "Not Found" }, { status: 404 });
  }

  const data = await request.formData();
  const productData = {
    title: data.get("title") as string,
    price: data.get("price") as string,
    stock: data.get("stock") as string,
    description: data.get("description") as string,
  };

  const resolver = productSchema.safeParse(productData);
  if (!resolver.success) {
    console.log(productData);
    console.log(resolver.error.format());
    return NextResponse.json(
      { errors: resolver.error.format() },
      { status: 400 }
    );
  }

  let i = 0;
  let imagesUrls: image[] = [];
  while (true) {
    const file = data.get(`file_${i}`) as File;
    const altText = data.get(`altText_${i}`) as string;
    const isMain = data.get(`isMain_${i}`) === "true" ? true : false;

    if (!file || !(file instanceof File)) {
      break;
    }
    const buffer = Buffer.from(await file.arrayBuffer());

    const filename = file.name.replaceAll(" ", "_");
    const imagePath = `/assets/${filename}`;

    try {
      await writeFile(
        path.join(process.cwd() + "/public/assets/" + filename),
        buffer
      );

      imagesUrls.push({
        imageUrl: imagePath,
        altText: altText,
        isMain: isMain,
      });

      i++;
    } catch (error) {
      console.log(
        "error ocurred while trying to write the image file, see the server logs for more details",
        error
      );
      return NextResponse.json({ message: "failed" }, { status: 500 });
    }
  }
  const product = {
    title: productData.title,
    price: new Decimal(productData.price).toDecimalPlaces(4).toFixed(4),
    stock: parseInt(productData.stock),
    description: productData.description,
  };

  try {
    await CreateProduct(product, imagesUrls);
    return NextResponse.json(
      { message: "product created with success" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "error while trying to create the product on database" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.redirect(new URL("/createProducts", request.url));
}

"use server";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import ProductCard from "@/components/cardProduct";
import slugify from "slugify";
import "../globals.css";
import { getProductData, getTotalNumberOfProducts } from "@/app/database/db";
import { product } from "../types/product";
import { redirect } from "next/navigation";
import ProductsPagination from "@/components/Pagination";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { page } = await searchParams;
  const params = Object.values(await searchParams);

  if (
    (params.length > 0 && page === undefined) ||
    (page !== undefined && params.length > 1) ||
    (page !== undefined && Array.isArray(page)) ||
    (page !== undefined && isNaN(Number(page))) ||
    (page !== undefined && !Number.isInteger(Number(page)))
  ) {
    return redirect("/product");
  }

  let products: product[];

  if (page === undefined && params.length == 0) {
    products = await getProductData(0, 10);
  } else {
    let n = parseInt(page);
    products = await getProductData(n, 10);
  }

  const totalNumberOfProducts = await getTotalNumberOfProducts();

  return (
    <div className="p-0 my-0 mx-auto flex flex-col h-full font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-1 row-start-2 h-full items-center sm:items-start z-0">
        <div className="flex w-full flex-col p-0 mx-auto mt-12">
          <ProductsPagination
            totalNumberOfPages={totalNumberOfProducts - 20}
          ></ProductsPagination>
          <div className="w-full z-1 mt-1">
            <div className="m-auto w-full flex flex-col px-4 max-w-7xl mx-auto justify-center z-1 rounded-lg">
              <div className="m-auto w-full flex flex-col md:grid md:grid-cols-3 lg:grid-cols-5 justify-center">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="mx-1 my-0 h-content justify-center items-center aspect-square rounded-xl"
                  >
                    <ProductCard
                      product={product}
                      productLink={`/product/${product.id}/${slugify(product.title)}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <ProductsPagination
          totalNumberOfPages={totalNumberOfProducts - 20}
        ></ProductsPagination>
      </main>
    </div>
  );
}

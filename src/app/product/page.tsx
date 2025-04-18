import { AspectRatio } from "@/components/ui/aspect-ratio";
import ProductCard from "@/components/cardProduct";
import slugify from "slugify";
import "../globals.css";
import { getProductData } from "@/app/database/getProductData";

export default function ProductsPage() {
  const products = getProductData();

  return (
    <div className="p-0 mx-auto font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-0 row-start-2 items-center sm:items-start z-0">
        <div className="absolute inset-0">
          <AspectRatio
            ratio={16 / 9}
            className="bg-[var(--background)]"
          ></AspectRatio>
        </div>
        <div className="flex w-full flex-col p-0 mx-auto mt-24">
          <div className="w-full z-1">
            <div className="m-auto w-full flex flex-col px-4 max-w-7xl mx-auto justify-center z-1 rounded-lg">
              <div className="m-auto w-full flex flex-col md:grid md:grid-cols-3 lg:grid-cols-5 justify-center h-full">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="sm:basis-1/3 py-1 mx-1 md:basis-1/3 lg:basis-1/5 justify-center items-center aspect-square rounded-xl"
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
      </main>
    </div>
  );
}

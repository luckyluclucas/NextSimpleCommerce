import { product } from "@/app/types/product";
import { NextResponse } from "next/server";
import Image from "next/image";
import { Separator } from "@radix-ui/react-separator";
import { Button } from "@/components/ui/button";
import { ShoppingCartIcon, Truck } from "lucide-react";
import Link from "next/link";
import slugify from "slugify";
import { redirect } from "next/navigation";

async function GetProductData<product>(
  id: number,
): Promise<product | undefined> {
  try {
    const response = await fetch(`${process.env.URL}/api/products/${id}`);
    if (!response.ok) {
      console.error(`Erro ao buscar o produto: ${response.statusText}`);
      return undefined;
    }

    const product: product = await response.json();
    return product;
  } catch (error) {
    console.error("error at fetching product:", error);
    return undefined;
  }
}

export default async function productPage({
  params,
}: {
  params: Promise<{ id: number; title: string }>
}) {
  const { id } = await params;

  if (isNaN(id)) {
    return NextResponse.json({ error: "it's not a id" }, { status: 400 });
  }
  const ProductData: product = (await GetProductData(id)) ?? {
    id: 0,
    title: "Produto não encontrado",
    description: "Este produto não está disponível.",
    image: "/placeholder.jpg",
    price: "0",
  };

  const { title } = await params;

  const correctTitle = slugify(ProductData.title);

  if (title !== correctTitle) {
    return redirect(`/product/${ProductData.id}/${slugify(correctTitle)}`);
  }

  return (
    <main className="w-full p-2 md:p-0 x-auto mt-[160px]">
      <div className="grid grid-rows-[120px_minmax(600px,1fr)_100px] h-[700px] w-full max-w-[1280px] mx-auto font-[family-name:var(--font-geist-sans)]">
        <h1 className="w-full h-[60px] px-1 text-xl font-bold content-center m-auto leading-none">
          {ProductData.title}
        </h1>
        <div className="w-full h-full min-h-0 grid grid-rows md:grid-cols-2">
          <div className="col-span-1 w-auto h-full flex content-center flex-col">
            <Image
              width={512}
              height={312}
              src={ProductData.image}
              alt=""
              className="justify-self-center m-auto"
            ></Image>
            <div className="w-full mt-auto border-2 border-border my-2 flex content-end items-end justify-end h-[100px]"></div>
          </div>

          <div className="col-span-1 w-auto h-full flex flex-col">
            <div className="rounded-lg grid grid-rows-2 rounded bg-primary dark:bg-secondary h-40 text-lg font-medium p-4 text-white">
              <div className="grid grid-cols-2 content-center">
                <div className="">Promotion</div>
                <div className="justify-self-end">
                  It will be finished in 3 days
                </div>
              </div>

              <div className="grid grid-cols-3 content-center">
                <span>DESCONTO DE 5%</span>
                <Separator className="w-[1px]  mx-auto bg-white" />
                <span className="justify-self-end">em estoque</span>
              </div>
            </div>
            <div className="p-2">
              <div className="py-2 gap-2 text-sm hidden lg:flex text-nowrap">
                <span className="text-gray-600 dark:text-zinc-400 ">
                  {" "}
                  Vendido por seller e entregue por sender{" "}
                </span>
                <b className="text-[#1f9050]">Em estoque</b>
                <Link
                  href="/product"
                  className="justify-self-end ml-auto font-semibold text-primary"
                >
                  Mais ofertas
                </Link>
              </div>
              <div className="py-2 gap-1 flex text-nowrap whitespace-nowrap">
                <Truck color="#1f9050" />
                <b className="text-[#1f9050] text-base mx-1">Frete grátis</b>
                <span className="text-sm content-center text-gray-600 dark:text-zinc-400 ">
                  {" "}
                  - consulte dinsponibilidade
                </span>
              </div>
              <div className="py-2">
                <div className="flex gap-1">
                  <span className="font-bold text-5xl line-clamp-none text-primary">
                    R$
                    {ProductData.price}
                  </span>
                  <div className="hidden lg:flex justify-end content-center gap-2 ml-auto items-center align-center">
                    <Link href={`/carrinho`} className="cursor-pointer">
                      <Button
                        size="xlg"
                        className="text-xl cursor-pointer dark:bg-secondary"
                      >
                        Comprar
                      </Button>
                    </Link>

                    <Button className="h-14 cursor-pointer dark:bg-secondary">
                      <ShoppingCartIcon
                        size={24}
                        className="!size-12 cursor-pointer"
                      />
                    </Button>
                  </div>
                </div>
                <span className="p-2 line-clamp-1 text-sm text-gray-500 dark:text-zinc-400 ">
                  A vista no PIX
                </span>
                <span className="p-2 line-clamp-1 text-sm text-gray-500 dark:text-zinc-400 ">
                  ou em até{" "}
                  <b className="">
                    10x de R$ {(parseInt(ProductData.price) * 1.2) / 10}
                  </b>
                </span>
              </div>
            </div>
            <div className="mt-auto my-2">
              <h1>related products</h1>
              <div className="h-[100px] border-2 border-border"></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

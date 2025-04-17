import Image from "next/image";
import { product } from "./types/product";
import CarouselWithProduct from "@/components/CarouselWithProducts";
import { getProductData } from "@/database/getProductData";

export const revalidate = 60;

export default async function Home() {
  const data: product[] = await getProductData();

  return (
    <div className="flex flex-col m-0 w-full">
      <div className="w-full h-[400px] absolute flex mt-14">
        <Image
          src="https://images.unsplash.com/photo-1491166617655-0723a0999cfc?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bmljZXxlbnwwfHwwfHx8MA%3D%3D"
          fill={true}
          alt="hahaah"
        ></Image>
      </div>
      <div className="flex flex-col p-4 z-10 mt-[466px]">
        <CarouselWithProduct products={data} />
      </div>
    </div>
  );
}

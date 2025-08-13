"use server";
import { auth } from "@/auth";
import { notFound } from "next/navigation";
import CreateProductForm from "./clientSideFormCreateProduct/createProductForm";
import { getCategories, getProductTypes } from "@/app/database/productsMethods";
import { get } from "http";

export default async function Page() {
  const session = await auth();

  if (!session || session.user?.role !== "admin") {
    return notFound();
  }

  if (session.user.role === "admin") {
    const categories: string[] = await getCategories();
    const productTypes: string[] = await getProductTypes();

    return (
      <CreateProductForm
        productCategories={categories}
        productTypes={productTypes}
      ></CreateProductForm>
    );
  }
}

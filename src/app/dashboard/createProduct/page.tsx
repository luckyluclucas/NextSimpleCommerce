"use server";
import { auth } from "@/auth";
import { notFound } from "next/navigation";
import CreateProductForm from "./clientSideFormCreateProduct/createProductForm";

export default async function Page() {
  const session = await auth();

  if (!session || session.user?.role !== "admin") {
    return notFound();
  }

  return <CreateProductForm></CreateProductForm>;
}

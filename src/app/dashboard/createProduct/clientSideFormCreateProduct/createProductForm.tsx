"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UndoDot } from "lucide-react";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import ImageUploaderCustom from "@/components/image-upload-form";

export default function CreateProductForm() {
  const CreateProductSchema = z.object({
    title: z.string().nonempty({ message: "The title can not be empty" }),
    price: z.coerce.number({
      message: "the price shoud be a number, not words ou invalid characteres",
    }),
    stock: z.coerce.number({
      message: "the price shoud be a number, not words ou invalid characteres",
    }),
    description: z
      .string()
      .nonempty({ message: "The product need's a description" }),
    images: z.array(
      z.object({
        file: z.any(),
        altText: z.string().optional(),
        isMain: z.boolean().optional(),
        previewUrl: z.string().optional(),
      })
    ),
  });

  const createProductForm = useForm<z.infer<typeof CreateProductSchema>>({
    resolver: zodResolver(CreateProductSchema),
    defaultValues: {
      title: "",
      price: "",
      stock: "",
      description: "",
      images: [],
    },
  });

  const onSubmit = async (formData: z.infer<typeof CreateProductSchema>) => {
    const isValid = createProductForm.trigger();
    if (!isValid) {
      return;
    }

    const data = new FormData();

    data.append("title", formData.title);
    data.append("price", formData.price);
    data.append("stock", formData.stock);
    data.append("description", formData.description);

    if (!formData.images) {
      return;
    }
    formData.images.map((image, i) => {
      data.append(`file_${i}`, image.file);
      data.append(`isMain_${i}`, image.isMain ? "true" : "false");
      data.append(`altText_${i}`, image.altText || "");
    });

    const response = await fetch("/api/createProducts", {
      method: "POST",
      body: data,
    });

    if (response.status === 500) {
      console.log("erro no upload, status 500");
    } else {
      console.log("upload bem sucedido");
    }
  };
  return (
    <div className="mt-24 bg-[var(--foreground)] w-full max-w-[580px] mx-auto px-4 my-8 justify-center items-center content-center rounded">
      <div className="flex flex-col space-y-2 text-center mb-4">
        <h1 className="text-2xl font-semibold tracking-tight">
          Create the product
        </h1>
      </div>
      <Form {...createProductForm}>
        <form
          onSubmit={createProductForm.handleSubmit(onSubmit)}
          className="flex flex-col gap-1"
        >
          <FormField
            control={createProductForm.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <div className="w-full flex flex-row gap-2 justify-between items-center">
                  <FormLabel className="">Title</FormLabel>
                  <FormMessage className="bg-[var(--color-destructive)] text-gray-100 p-1 rounded" />
                </div>
                <FormControl>
                  <Input
                    className="h-12 text-3xl"
                    placeholder="Title"
                    {...field}
                  />
                </FormControl>
                <FormDescription></FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={createProductForm.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <div className="w-full flex flex-row gap-2 justify-between items-center">
                  <FormLabel className="">Price</FormLabel>
                  <FormMessage className="bg-[var(--color-destructive)] text-gray-100 p-1 rounded" />
                </div>
                <FormControl>
                  <Input className="max-w-28 h-8" placeholder="" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={createProductForm.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <div className="w-full flex flex-row gap-2 justify-between items-center">
                  <FormLabel className="">Stock</FormLabel>
                  <FormMessage className="bg-[var(--color-destructive)] text-gray-100 p-1 rounded" />
                </div>
                <FormControl>
                  <Input
                    className="max-w-18 h-6 text-sm"
                    placeholder=""
                    {...field}
                  />
                </FormControl>
                <FormDescription></FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={createProductForm.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <div className="w-full flex flex-row gap-2 justify-between items-center">
                  <FormLabel className="">Description</FormLabel>
                  <FormMessage className="bg-[var(--color-destructive)] text-gray-100 p-1 rounded" />
                </div>
                <FormControl>
                  <Textarea
                    className="min-h-32"
                    placeholder="Description"
                    {...field}
                  />
                </FormControl>
                <FormDescription></FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={createProductForm.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <div className="w-full flex flex-row gap-2 justify-between items-center">
                  <FormLabel className="">Main image</FormLabel>
                  <FormMessage className="bg-[var(--color-destructive)] text-gray-100 p-1 rounded" />
                </div>
                <FormControl>
                  <ImageUploaderCustom onChange={field.onChange} />
                </FormControl>
                <FormDescription></FormDescription>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full sm:w-100 mx-auto dark:bg-[var(--bakcground)] text-white hover:bg-accent/70 bg-primary dark:text-white hover:shadow-[0_0_3px_3px_rgba(225,29,72,0.45)] dark:hover:shadow-[0_0_3px_3px_rgba(255,255,255,0.45)] border h-[40px] justify-start dark:border-border dark:hover:bg-none dark:border-2 rounded transition-all duration-200 ease-linear justify-center"
          >
            Create the New Product
          </Button>
        </form>
      </Form>
      <div className="flex flex-col mt-4">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or return to
            </span>
          </div>
        </div>
      </div>{" "}
    </div>
  );
}

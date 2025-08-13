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
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UndoDot } from "lucide-react";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import ImageUploaderCustom from "@/components/image-upload-form";
import Decimal from "decimal.js";
import { useState, useEffect } from "react";
import { ProductTypeSelector } from "@/components/productTypeSelector";
import { ProductCategoriesSelector } from "@/components/productCategorySelector";
import { unescape } from "querystring";

export default function CreateProductForm({
  productCategories,
  productTypes,
}: {
  productCategories: string[];
  productTypes: string[];
}) {
  const [productType, setProductType] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const mouseDetailsSchema = z.object({
    brand: z.string().nonempty(),
    model_name: z.string().nonempty(),
    switches: z.string().nonempty(),
    mcu: z.string().nonempty(),
    sensor: z.string().nonempty(),
    weight: z.coerce
      .number()
      .refine((val) => val !== 0, "O valor não pode ser zero") // opcional
      .refine((val) => val > 0, "O valor deve ser positivo"),
    wireless: z.boolean(),
    pollingrate: z.coerce
      .number()
      .refine((val) => val !== 0, "O valor não pode ser zero") // opcional
      .refine((val) => val > 0, "O valor deve ser positivo"),
  });

  const keyboardDetailsSchema = z.object({
    brand: z.string().nonempty(),
    model_name: z.string().nonempty(),
    switches: z.string().nonempty(),
    layout: z.string().nonempty(),
    language: z.string().nonempty(),
    isMagnetic: z.boolean(),
    isMechanical: z.boolean(),
    wireless: z.boolean(),
    pollingrate: z.coerce.number().optional(),
  });

  const baseProductSchema = z.object({
    title: z.string().nonempty({ message: "The title can not be empty" }),
    price: z.string({
      message: "the price should be a number, not words or invalid characters",
    }),
    stock: z.coerce.number({
      message: "stock should be a number",
    }),
    description: z
      .string()
      .nonempty({ message: "The product needs a description" }),
    images: z.array(
      z.object({
        file: z.any(),
        altText: z.string().optional(),
        isMain: z.boolean().optional(),
        previewUrl: z.string().optional(),
      })
    ),
    width: z.coerce.number(),
    height: z.coerce.number(),
    length: z.coerce.number(),
    weight: z.coerce.number(),
    categories: z.array(z.string()),
    type: z.string(),
  });

  const mouseSchema = baseProductSchema.extend({
    type: z.literal("mouse"),
    mouseDetails: mouseDetailsSchema,
    keyboardDetails: z.undefined().optional(),
  });

  // Schema para keyboard
  const keyboardSchema = baseProductSchema.extend({
    type: z.literal("keyboard"),
    keyboardDetails: keyboardDetailsSchema,
    mouseDetails: z.undefined().optional(),
  });

  const CreateProductSchema = z.discriminatedUnion("type", [
    mouseSchema,
    keyboardSchema,
    z.object({
      type: z.literal(""),
      mouseDetails: z.undefined(),
      keyboardDetails: z.undefined(),
    }),
  ]);

  const createProductForm = useForm<z.infer<typeof CreateProductSchema>>({
    resolver: zodResolver(CreateProductSchema),
    defaultValues: {
      title: "",
      price: "999.99",
      stock: "",
      description: "",
      images: [],
      width: "",
      height: "",
      length: "",
      weight: "",
      categories: [],
      type: "",
    },
  });

  const selectedType = useWatch({
    control: createProductForm.control,
    name: "type",
  });

  useEffect(() => {
    // Pega os valores atuais para manter os demais campos intactos
    const currentValues = createProductForm.getValues();

    if (selectedType === "mouse") {
      createProductForm.reset({
        ...currentValues,
        type: "mouse",
        mouseDetails: {
          brand: "",
          model_name: "",
          switches: "",
          mcu: "",
          sensor: "",
          weight: 0,
          wireless: false,
          pollingrate: 0,
        },
        keyboardDetails: undefined,
      });
    } else if (selectedType === "keyboard") {
      createProductForm.reset({
        ...currentValues,
        type: "keyboard",
        keyboardDetails: {
          brand: "",
          model_name: "",
          switches: "",
          layout: "",
          language: "",
          isMagnetic: false,
          isMechanical: false,
          wireless: false,
          pollingrate: 0,
        },
        mouseDetails: undefined,
      });
    } else {
      // Nenhum tipo selecionado: limpa ambos os detalhes e o tipo
      createProductForm.reset({
        ...currentValues,
        type: "",
        mouseDetails: undefined,
        keyboardDetails: undefined,
      });
    }
  }, [selectedType]);

  function renderConditionalFields() {
    if (selectedType === "mouse") {
      console.log("mouse type selected");
      return (
        <>
          <FormField
            control={createProductForm.control}
            name="mouseDetails.brand"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mouse Brand</FormLabel>
                <FormControl>
                  <Input placeholder="Brand" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={createProductForm.control}
            name="mouseDetails.model_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Model Name</FormLabel>
                <FormControl>
                  <Input placeholder="Model Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={createProductForm.control}
            name="mouseDetails.switches"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Switches</FormLabel>
                <FormControl>
                  <Input placeholder="Switches" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={createProductForm.control}
            name="mouseDetails.mcu"
            render={({ field }) => (
              <FormItem>
                <FormLabel>MCU</FormLabel>
                <FormControl>
                  <Input placeholder="MCU" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={createProductForm.control}
            name="mouseDetails.sensor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sensor</FormLabel>
                <FormControl>
                  <Input placeholder="Sensor" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={createProductForm.control}
            name="mouseDetails.weight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Weight</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Weight" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={createProductForm.control}
            name="mouseDetails.wireless"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-2">
                <FormLabel>Wireless</FormLabel>
                <FormControl>
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={createProductForm.control}
            name="mouseDetails.pollingrate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Polling Rate</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Polling Rate" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      );
    }

    if (selectedType === "keyboard") {
      return (
        <>
          <FormField
            control={createProductForm.control}
            name="keyboardDetails.brand"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Keyboard Brand</FormLabel>
                <FormControl>
                  <Input placeholder="Brand" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={createProductForm.control}
            name="keyboardDetails.model_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Model Name</FormLabel>
                <FormControl>
                  <Input placeholder="Model Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={createProductForm.control}
            name="keyboardDetails.switches"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Switches</FormLabel>
                <FormControl>
                  <Input placeholder="Switches" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={createProductForm.control}
            name="keyboardDetails.layout"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Layout</FormLabel>
                <FormControl>
                  <Input placeholder="Layout" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={createProductForm.control}
            name="keyboardDetails.language"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Language</FormLabel>
                <FormControl>
                  <Input placeholder="Language" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={createProductForm.control}
            name="keyboardDetails.isMagnetic"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-2">
                <FormLabel>Is Magnetic</FormLabel>
                <FormControl>
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={createProductForm.control}
            name="keyboardDetails.isMechanical"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-2">
                <FormLabel>Is Mechanical</FormLabel>
                <FormControl>
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={createProductForm.control}
            name="keyboardDetails.wireless"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-2">
                <FormLabel>Wireless</FormLabel>
                <FormControl>
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={createProductForm.control}
            name="keyboardDetails.pollingrate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Polling Rate</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Polling Rate" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      );
    }

    return null;
  }

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
    data.append("width", formData.width);
    data.append("height", formData.height);
    data.append("length", formData.length);
    data.append("weight", formData.weight);
    data.append("type", formData.type);
    formData.categories.forEach((category) => {
      data.append("categories[]", category);
    });

    if (!formData.images) {
      return;
    }
    formData.images.map((image, i) => {
      data.append(`file_${i}`, image.file);
      data.append(`isMain_${i}`, image.isMain ? "true" : "false");
      data.append(`altText_${i}`, image.altText || "");
    });

    if (formData.type === "mouse" && formData.mouseDetails) {
      data.append("typeDetails", JSON.stringify(formData.mouseDetails));
    }

    if (formData.type === "keyboard" && formData.keyboardDetails) {
      data.append("typeDetails", JSON.stringify(formData.keyboardDetails));
    }
    console.table(Array.from(data.entries()));

    const response = await fetch("/api/createProducts", {
      method: "POST",
      body: data,
    });
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
                  <Input
                    className="max-w-28 h-8"
                    placeholder="R$ 9.999,99"
                    {...field}
                  />
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
                    placeholder="0"
                    {...field}
                  />
                </FormControl>
                <FormDescription></FormDescription>
              </FormItem>
            )}
          />
          <div className="flex flex-row gap-2">
            <FormField
              control={createProductForm.control}
              name="width"
              render={({ field }) => (
                <FormItem>
                  <div className="w-full flex flex-row gap-2 justify-between items-center">
                    <FormLabel className="">Width</FormLabel>
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
              name="height"
              render={({ field }) => (
                <FormItem>
                  <div className="w-full flex flex-row gap-2 justify-between items-center">
                    <FormLabel className="">Height</FormLabel>
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
              name="length"
              render={({ field }) => (
                <FormItem>
                  <div className="w-full flex flex-row gap-2 justify-between items-center">
                    <FormLabel className="">Length</FormLabel>
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
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <div className="w-full flex flex-row gap-2 justify-between items-center">
                    <FormLabel className="">Weight</FormLabel>
                    <FormMessage className="bg-[var(--color-destructive)] text-gray-100 p-1 rounded" />
                  </div>
                  <FormControl>
                    <Input className="max-w-28 h-8" placeholder="" {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                </FormItem>
              )}
            />
          </div>
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
          <FormField
            control={createProductForm.control}
            name="categories"
            render={({ field }) => (
              <FormItem>
                <div className="w-full flex flex-row gap-2 justify-between items-center">
                  <FormLabel className="">Select Product Categories</FormLabel>
                  <FormMessage className="bg-[var(--color-destructive)] text-gray-100 p-1 rounded" />
                </div>
                <FormControl>
                  <ProductCategoriesSelector
                    categories={productCategories}
                    selectedCategories={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormDescription></FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={createProductForm.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <div className="w-full flex flex-row gap-2 justify-between items-center">
                  <FormLabel className="">Type of Product</FormLabel>
                  <FormMessage className="bg-[var(--color-destructive)] text-gray-100 p-1 rounded" />
                </div>
                <FormControl>
                  <ProductTypeSelector
                    value={field.value}
                    onChange={field.onChange}
                    productTypes={productTypes}
                  />
                </FormControl>
                <FormDescription></FormDescription>
              </FormItem>
            )}
          />{" "}
          {renderConditionalFields()}
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

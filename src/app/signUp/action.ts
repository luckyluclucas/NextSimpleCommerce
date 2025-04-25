"use server";
import { formSchema } from "./formSchema";
import z from "zod";

export default async function HandleSignUp(
  prevState: { message: string },
  formData: FormData,
) {
  const userData = {
    username: formData.get("username") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const parsedResult = formSchema.safeParse(userData);
  console.log("sucessfully get data", parsedResult);
  return { message: "sucessfully submited" };
}

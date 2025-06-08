"use server";
import { formSchema } from "./formSchema";
import z from "zod";
import { CreateUser } from "../database/usersMethods";

export default async function HandleSignUp(
  prevState: { message: string },
  formData: FormData
) {
  const userData = {
    username: formData.get("username") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const parsedResult = formSchema.safeParse(userData);

  if (!parsedResult.success) {
    const error = parsedResult.error.issues.reduce((acc, errors) => {
      if (errors.path) {
        acc[errors.path[0]] = errors.message;
      }

      return acc;
    }, {} as Record<string, string>);

    //console.log(parsedResult.error.issues);
    console.log(error);
    return { message: error, success: false };
  }

  try {
    const user = await CreateUser(parsedResult.data);
    return { message: "successfuly created user", success: true };
  } catch (error) {
    console.log("CreateUser failed ", error);
    return {
      error: true,
      message: "error while creating user, please verify your credentials",
      success: false,
    };
  }
}

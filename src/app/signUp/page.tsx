"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import { useActionState, useRef } from "react";
import HandleSignUp from "./action";
import { startTransition } from "react";
import { formSchema } from "./formSchema";
import { UndoDot, ArrowRight } from "lucide-react";
import { useEffect } from "react";

export default function SignUp() {
  const { data: session } = useSession();

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const [state, handleSignUpFormAction, isPending] = useActionState(
    HandleSignUp,
    { message: "" },
  );

  useEffect(() => {
    if (state.message) {
      Object.entries(state.message).forEach(([field, message]) => {
        form.setError(field as keyof z.infer<typeof formSchema>, { message });
      });
    }
    if (state.success) {
      router.push("/signIn");
    }

    if (!state.success && state.error) {
      form.setError("username", { type: "server", message: state.message });
      console.log(state.message);
    }
  }, [state, form]);

  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = form.handleSubmit(() => {
    formRef.current?.requestSubmit();
  });

  const { status } = useSession();
  if (status === "loading") {
    return null;
  }

  if (session) {
    return router.push("/");
  } else {
    return (
      <div className="mt-24 bg-[var(--foreground)] w-full max-w-[580px] mx-auto px-4 my-8 justify-center items-center content-center rounded">
        <div className="flex flex-col space-y-2 text-center mb-4">
          <h1 className="text-2xl font-semibold tracking-tight">
            Create your Account
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter an username, email and a password below to create your account
          </p>
        </div>
        <Form {...form}>
          <form
            ref={formRef}
            className="flex flex-col gap-1"
            action={handleSignUpFormAction}
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <div className="w-full flex flex-row gap-2 justify-between items-center">
                    <FormLabel className="">Username</FormLabel>
                    <FormMessage className="bg-[var(--color-destructive)] text-gray-100 p-1 rounded" />
                  </div>
                  <FormControl>
                    <Input placeholder="Username" {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <div className="w-full flex flex-row gap-2 justify-between items-center">
                    <FormLabel className="">Email</FormLabel>
                    <FormMessage className="bg-[var(--color-destructive)] text-gray-100 p-1 rounded" />
                  </div>
                  <FormControl>
                    <Input className="" placeholder="Email" {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="w-full flex flex-row gap-2 justify-between items-center">
                    <FormLabel className="">Password</FormLabel>
                    <FormMessage className="bg-[var(--color-destructive)] text-gray-100 p-1 rounded" />
                  </div>
                  <FormControl>
                    <Input
                      className=""
                      placeholder="Password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
                </FormItem>
              )}
            />

            <Button
              type="button"
              onClick={onSubmit}
              className="w-full sm:w-100 mx-auto dark:bg-[var(--bakcground)] text-white hover:bg-accent/70 bg-primary dark:text-white hover:shadow-[0_0_3px_3px_rgba(225,29,72,0.45)] dark:hover:shadow-[0_0_3px_3px_rgba(255,255,255,0.45)] border h-[40px] justify-start dark:border-border dark:hover:bg-none dark:border-2 rounded transition-all duration-200 ease-linear justify-center"
            >
              <ArrowRight className="mr-4" /> Create Account
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
        <div className="mx-auto justify-center flex">
          <Link href="/signIn">
            <Button
              onClick={() => router.push("/signIn")}
              type="submit"
              className="dark:text-black w-60 bg-white mx-auto text-black hover:shadow-[0_0_3px_3px_rgba(225,29,72,0.45)] dark:hover:shadow-[0_0_3px_3px_rgba(255,255,255,0.45)]  hover:bg-white border h-[40px] dark:border-border dark:hover:bg-none dark:border-2 rounded transition-all duration-200 ease-linear mt-2"
            >
              <UndoDot className="mr-6"></UndoDot>
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}

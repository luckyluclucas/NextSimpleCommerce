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
import { handleProviderSignIn } from "./action";
import { useSession, signIn } from "next-auth/react";
import GoogleButton from "react-google-button";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const formSchema = z.object({
  username: z
    .string()
    .min(6, "at least 6 chars dude")
    .max(40, "it's a password, not a wikipedia text"),
  password: z
    .string()
    .min(12, "dawg ya password should have at least 12 chars"),
});

export default function SignInPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const { data: session, update, status } = useSession();
  const router = useRouter();

  const { theme } = useTheme();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  useEffect(() => {
    if (status === "authenticated") {
      return router.replace("/");
    }
  });
  if (status === "loading" || session) {
    return null;
  }

  const providerMap = [{ id: "google", name: "Google" }];

  const onSubmit = async (data: { username: string; password: string }) => {
    await signIn("credentials", data);
  };
  return (
    <div className="mt-24 bg-[var(--foreground)] w-full max-w-[580px] mx-auto px-4 my-8 justify-center items-center content-center rounded">
      <div className="flex flex-col space-y-2 text-center mb-4">
        <h1 className="text-2xl font-semibold tracking-tight">
          Sign In or Create your Account
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your username and password below to sign in
        </p>
      </div>
      <Form {...form}>
        <form
          ref={formRef}
          onSubmit={form.handleSubmit(async (data) => await onSubmit(data))}
          className="flex flex-col gap-1"
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
            className="mx-auto w-full sm:w-100 dark:bg-[var(--bakcground)] text-white hover:bg-accent/70 bg-primary dark:text-white hover:shadow-[0_0_3px_3px_rgba(225,29,72,0.45)] dark:hover:shadow-[0_0_3px_3px_rgba(255,255,255,0.45)] border h-[40px] justify-start dark:border-border dark:hover:bg-none dark:border-2 rounded transition-all duration-200 ease-linear justify-center"
            onClick={form.handleSubmit(onSubmit)}
          >
            {" "}
            Sign In
          </Button>
        </form>
      </Form>
      <div className="mx-auto justify-center flex">
        <Link href="/signUp">
          <Button className="w-60 bg-white/60 mx-auto text-black dark:text-black hover:shadow-[0_0_3px_3px_rgba(225,29,72,0.45)] dark:hover:shadow-[0_0_3px_3px_rgba(255,255,255,0.45)]  hover:bg-white border h-[40px] dark:border-border dark:hover:bg-none dark:border-2 rounded transition-all duration-200 ease-linear mt-2">
            Create account
          </Button>
        </Link>
      </div>
      <div className="flex flex-col mt-4">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        {Object.values(providerMap).map((provider) => (
          <form
            key={provider.id}
            action={handleProviderSignIn}
            className="mt-3 mx-auto"
          >
            <GoogleButton
              disabled={false}
              onClick={handleProviderSignIn}
              type={`${theme === "light" ? "light" : "dark"}`}
            >
              1
            </GoogleButton>
          </form>
        ))}
      </div>
    </div>
  );
}

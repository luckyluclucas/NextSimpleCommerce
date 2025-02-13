"use client"
import { Button } from "@/components/ui/button"
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import handleSignIn from "./action"
import { providerMap } from "@/auth"
import { handleProviderSignIn } from "./action"
import { useSession } from "next-auth/react"

const formSchema = z.object({
    username: z.string().min(6).max(40),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(12),
    confirm: z.string().min(12),
}).refine((data) => data.password === data.confirm, { message: "password does not match" })


const onSubmit = (values: z.infer<typeof formSchema>) => {
    handleSignIn(values)
    console.log(values)
}



export default function SignInPage() {

    const { data: session } = useSession()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",

        }
    })

    if (session) {
        return (
            <>
                <main className="mt-24 w-full max-w-[1280px] bg-[var(--background)] mx-auto justify-between flex flex-cols">
                    <h1 className="w-full text-4xl font-semibold">You are already logged in {session.user?.name}</h1>
                    <Button className="dark:text-black ">Log out</Button>
                </main>

            </>)
    }


    return (
        <div className="mt-24 bg-[var(--foreground)] w-full max-w-[280px] mx-auto px-2 justify-center items-center content-center">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <div className="w-full flex flex-row gap-2 justify-between items-center">
                                    <FormLabel>Username</FormLabel>
                                    <FormMessage className="bg-[var(--color-destructive)] text-gray-100 p-1 rounded" />
                                </div>
                                <FormControl>
                                    <Input placeholder="Username" {...field} />
                                </FormControl>
                                <FormDescription></FormDescription>
                            </FormItem>
                        )} />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <div className="w-full flex flex-row gap-2 justify-between items-center">
                                    <FormLabel>Email</FormLabel>
                                    <FormMessage className="bg-[var(--color-destructive)] text-gray-100 p-1 rounded" />
                                </div>
                                <FormControl>
                                    <Input placeholder="Email" {...field} />
                                </FormControl>
                                <FormDescription></FormDescription>

                            </FormItem>
                        )} />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <div className="w-full flex flex-row gap-2 justify-between items-center">
                                    <FormLabel>Password</FormLabel>
                                    <FormMessage className="bg-[var(--color-destructive)] text-gray-100 p-1 rounded" />
                                </div>
                                <FormControl>
                                    <Input placeholder="Password" {...field} />
                                </FormControl>
                                <FormDescription></FormDescription>

                            </FormItem>
                        )} />
                    <Button type="submit" className="dark:bg-[var(--foreground)] justify-start w-60 dark:border-border dark:hover:bg-primary dark:border-2 rounded dark:hover:text-black transition-colors duration-200 ease-linear dark:text-whit"> Sign In with email and password</Button>
                </form>
            </Form>
            {Object.values(providerMap).map((provider) => (
                <form key={provider.id}
                    action={handleProviderSignIn}
                    className="mt-4"
                >
                    <Button type="submit" className="dark:bg-[var(--foreground)] justify-start w-60 dark:hover:bg-primary dark:border-border dark:border-2 rounded dark:hover:text-black transition-colors duration-200 ease-linear dark:text-white">
                        Sign in with {provider.name}
                    </Button>
                </form>
            ))
            }
        </div >
    )
}
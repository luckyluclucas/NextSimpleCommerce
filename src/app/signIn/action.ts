"use server"
import { signIn } from "@/auth"
import { redirect } from "next/navigation"
import { AuthError } from "next-auth"

const SIGNIN_ERROR_URL = process.env.URL

export default async function handleSignIn(formData: { username: string, password: string }) {

  try {
    await signIn("credentials", formData)
  } catch (error) {
    if (error instanceof AuthError) {
      return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`)
    }
    throw error
  }
}

export async function handleProviderSignIn() {
  try {
    await signIn("google", {
      redirectTo: "/"
    })
  } catch (error) {
    // Signin can fail for a number of reasons, such as the user
    // not existing, or the user not having the correct role.
    // In some cases, you may want to redirect to a custom error
    if (error instanceof AuthError) {
      return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`)
    }

    // Otherwise if a redirects happens Next.js can handle it
    // so you can just re-thrown the error and let Next.js handle it.
    // Docs:
    // https://nextjs.org/docs/app/api-reference/functions/redirect#server-component
    throw error
  }
}

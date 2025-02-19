import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import type { Provider } from "next-auth/providers"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [Google

    ],

    pages: {
        signIn: "/signIn"
    }
})

const providers: Provider[] = [
    Google,
]

export const providerMap = providers.map((provider) => {
    if (typeof provider === "function") {
        const providerData = provider()
        return { id: providerData.id, name: providerData.name }
    } else {
        return { id: provider.id, name: provider.name }
    }
}).filter((provider) => provider.id !== "credentials")
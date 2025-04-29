export const runtime = "nodejs";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import type { Provider } from "next-auth/providers";
import PostgresAdapter from "@auth/pg-adapter";
import pool from "./app/database/pool";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PostgresAdapter(pool),
  session: { strategy: "jwt" },
  providers: [
    Google,
    Credentials({
      credentials: {
        username: { label: "username" },
        password: { label: "password", type: "password" },
      },
    }),
  ],

  pages: {
    signIn: "/signIn",
  },
  trustHost: true,
});

const providers: Provider[] = [Google];

export const providerMap = providers
  .map((provider) => {
    if (typeof provider === "function") {
      const providerData = provider();
      return { id: providerData.id, name: providerData.name };
    } else {
      return { id: provider.id, name: provider.name };
    }
  })
  .filter((provider) => provider.id !== "credentials");
console.log(providerMap)

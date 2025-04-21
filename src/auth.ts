export const runtime = 'nodejs';
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import type { Provider } from "next-auth/providers";
import PostgresAdapter from "@auth/pg-adapter"
import pool from "./app/database/pool";
import { getProductData } from "./app/database/db";

getProductData()

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PostgresAdapter(pool),
  session: {strategy: "jwt"},
  providers: [Google],

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

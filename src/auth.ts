export const runtime = "nodejs";
import NextAuth, { CredentialsSignin } from "next-auth";
import Google from "next-auth/providers/google";
import type { Provider } from "next-auth/providers";
import PostgresAdapter from "@auth/pg-adapter";
import pool from "./app/database/pool";
import Credentials from "next-auth/providers/credentials";
import { AuthenticateUser } from "./app/database/usersMethods";
import { updateUserImage } from "./app/database/usersMethods";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PostgresAdapter(pool),
  session: { strategy: "jwt" },
  providers: [
    Google({ allowDangerousEmailAccountLinking: true }),
    Credentials({
      credentials: {
        username: { type: "email" },
        password: { type: "password" },
      },

      authorize: async (credentials) => {
        class InvalidCredentialsError extends CredentialsSignin {
          code = "invalid credentials";
        }
        let user = null;
        const email = credentials.username;
        const password = credentials.password;
        user = await AuthenticateUser(email as string, password as string);

        if (!user) {
          console.log("Invalid credentials");
          throw new InvalidCredentialsError();
        }
        console.log(user);
        return user;
      },
    }),
  ],

  events: {
    async linkAccount({ user, account, profile }) {
      if (account.provider !== "credentials") {
        if (!user.image && profile.image) {
          updateUserImage(user.id, profile.image);
        }
      }
    },
  },

  callbacks: {
    async jwt({ token, user }) {
      return token;
    },

    async session({ token, session, user }) {
      return session;
    },
  },

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

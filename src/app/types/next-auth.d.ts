// types/next-auth.d.ts
import type { DefaultUser } from "next-auth"; // import fora do bloco

declare module "next-auth" {
  interface User extends DefaultUser {
    role?: string;
  }
}

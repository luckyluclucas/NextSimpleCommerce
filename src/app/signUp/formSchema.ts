import z from "zod";

export const formSchema = z.object({
  username: z
    .string()
    .min(6, "ya username should have at least 6 chars")
    .max(40),
  email: z.string().email("man, that's not an email"),
  password: z.string().min(12, "password shoud have at least 12 chars"),
});

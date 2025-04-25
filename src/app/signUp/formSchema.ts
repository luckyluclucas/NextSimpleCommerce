import z from "zod";

export const formSchema = z.object({
  username: z.string().min(6).max(40),
  email: z.string().min(5).email(),
  password: z.string().min(12),
});

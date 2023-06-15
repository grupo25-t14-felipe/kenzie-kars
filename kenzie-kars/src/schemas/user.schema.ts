import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("deve ser um email valido"),
  password: z.string().nonempty("senha é obrigatoria")
});

export type loginData = z.infer<typeof loginSchema>;

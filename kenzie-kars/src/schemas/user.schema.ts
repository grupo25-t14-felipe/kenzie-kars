import { z } from "zod";

export const loginSchema = z
  .object({
    email: z.string().email("deve ser um email valido").nonempty("email é obrigatorio"),
    password: z.string().nonempty("senha é obrigatoria")
  })
  .refine((data) => data.email === data.password, {
    message: "LULULALALA",
    path: ["confirmData"]
  });
export type loginData = z.infer<typeof loginSchema>;

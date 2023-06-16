import { z } from "zod";

export const userSchema = z.object({
  name: z.string().nonempty("Campo obrigatório!"),
  cpf: z.string().nonempty("Campo obrigatório!"),
  email: z.string().nonempty("Campo obrigatório!"),
  password: z.string().nonempty("Campo obrigatório!"),
  confirm: z.string().nonempty("Campo obrigatório!"),
  telephone: z.string().nonempty("Campo obrigatório!"),
  date_of_birth: z.string().nonempty("Campo obrigatório!"),
  description: z.string(),
}).refine((data) => data.password === data.confirm, {
  message: "As senhas não são iguais!",
  path: ["confirm"],
});

export type UserData = z.infer<typeof userSchema>;

export const loginSchema = z.object({
  email: z.string().email("deve ser um email valido"),
  password: z.string().nonempty("senha é obrigatoria")
});

export type loginData = z.infer<typeof loginSchema>;

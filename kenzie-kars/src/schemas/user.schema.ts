import { z } from "zod";
import { createAnnouncementSchema } from "./announcement.schema";

const userRequestSchema = z.object({
  name: z.string().nonempty("Campo obrigatório!"),
  cpf: z.string().nonempty("Campo obrigatório!"),
  email: z.string().nonempty("Campo obrigatório!"),
  password: z.string().nonempty("Campo obrigatório!"),
  confirm: z.string().nonempty("Campo obrigatório!"),
  telephone: z.string().nonempty("Campo obrigatório!"),
  date_of_birth: z.string().nonempty("Campo obrigatório!"),
  description: z.string()
});

export const userSchema = userRequestSchema.refine((data) => data.password === data.confirm, {
  message: "As senhas não são iguais!",
  path: ["confirm"]
});

export const loginSchema = z.object({
  email: z.string().email("deve ser um email valido"),
  password: z.string().nonempty("senha é obrigatoria")
});

export const userUpdateSchema = z
  .object({
    name: z.string(),
    cpf: z.string(),
    email: z.string(),
    telephone: z.string(),
    date_of_birth: z.string(),
    description: z.string()
  })
  .partial();

export const userResponseSchema = userRequestSchema
  .omit({
    password: true,
    confirm: true
  })
  .extend({
    id: z.string(),
    buyer: z.boolean(),
    announcement: createAnnouncementSchema.array()
  });

export const sendEmailResetPasswordSchema = z.object({
  email: z.string().email("Deve ser um email valido")
});

export const resetPasswordSchema = loginSchema
  .omit({
    email: true
  })
  .extend({
    passwordConfirm: z.string().min(1, "A confirmação de senha é obrigatoria")
  })
  .refine(({ password, passwordConfirm }) => password === passwordConfirm, {
    message: "As senhas precisam corresponder",
    path: ["confirm"]
  });

export type UserData = z.infer<typeof userSchema>;
export type loginData = z.infer<typeof loginSchema>;
export type iUserUpdate = z.infer<typeof userUpdateSchema>;
export type iUserResponse = z.infer<typeof userResponseSchema>;
export type SendEmailResetPasswordData = z.infer<typeof sendEmailResetPasswordSchema>;
export type ResetPasswordData = z.infer<typeof resetPasswordSchema>;

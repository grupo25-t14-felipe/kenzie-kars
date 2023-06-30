import { z } from "zod";

const createAddressSchema = z.object({
  cep: z.string(), 
  state: z.string(), 
  city: z.string(), 
  street: z.string(),
  number: z.string(), 
  complement: z.string().optional()
})

const AddressResponseSchema = z.object({
  id: z.string(), 
  cep: z.string(), 
  state: z.string(), 
  city: z.string(), 
  street: z.string(),
  number: z.string(), 
  complement: z.string()
})

const UpdateAddressSchema = AddressResponseSchema.omit({
  id: true
}).partial()

export type iAddressResponse = z.infer<typeof AddressResponseSchema>;
export type iAddressUpdateRequest = z.infer<typeof UpdateAddressSchema>;

export {
  createAddressSchema,
  AddressResponseSchema,
  UpdateAddressSchema
}

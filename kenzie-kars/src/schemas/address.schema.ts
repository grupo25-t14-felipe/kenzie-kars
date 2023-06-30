import { z } from "zod";

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
  AddressResponseSchema,
  UpdateAddressSchema
}

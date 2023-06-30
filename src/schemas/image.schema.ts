import { z } from 'zod';

export const imageResponseSchema = z.object({
  id: z.string(),
  link: z.string()
})

export type iImageResponse = z.infer<typeof imageResponseSchema>

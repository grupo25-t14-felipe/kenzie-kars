import { z } from "zod";
import { imageResponseSchema } from "./image.schema";

const announcementSchema = z.object({
  brand: z.string(),
  model: z.string(),
  year: z.string(),
  fuel: z.string(),
  mileage: z.string(),
  color: z.string(),
  price_table_fipe: z.string(),
  price: z.string(),
  description: z.string(),
  published: z.boolean(),
  cover_image: z.string(),
  image: imageResponseSchema.array().optional()
});

export const createAnnouncementSchema = announcementSchema.extend({
  id: z.string(),
  createdAt: z.string()
});

const updateAnnouncementSchema = z.object({
  brand: z.string().optional(),
  model: z.string().optional(),
  year: z.string().optional(),
  fuel: z.string().optional(),
  mileage: z.string().optional(),
  color: z.string().optional(),
  price_table_fipe: z.string().optional(),
  price: z.string().optional(),
  description: z.string().optional(),
  published: z.boolean().optional(),
  cover_image: z.string().optional()
});

const updateAnnouncementSchemaReturn = updateAnnouncementSchema.extend({
  id: z.string().optional(),
  createdAt: z.string().optional()
});

const returnAnnouncementSchemaAll = createAnnouncementSchema.array();

const userSchema = z.object({
  name: z.string(),
  cpf: z.string(),
  email: z.string(),
  password: z.string(),
  telephone: z.string(),
  date_of_birth: z.string(),
  description: z.string(),
  buyer: z.boolean()
});

const createUserSchema = userSchema
  .extend({
    id: z.string(),
    createdAt: z.string()
  })
  .omit({
    password: true
  });

  const commentSchema = z.object({
    description: z.string(),
  });
  
  const createCommentSchema = commentSchema.extend({
    id: z.string(),
    createdAt: z.date(),
    user: createUserSchema
  });

const UserAnnouncementsSchema = createUserSchema.extend({
  announcement: returnAnnouncementSchemaAll
});


const returnAnnouncementSchema = createAnnouncementSchema.extend({
  user: createUserSchema,
  comment: createCommentSchema.array()
});

export const UpdateeAnnouncementSchema = z.object({
  mileage: z.string(),
  color: z.string(),
  price: z.string(),
  description: z.string(),
  cover_image: z.string(),
  image: imageResponseSchema.partial().array()
}).partial()

export type iUserAnnouncements = z.infer<typeof UserAnnouncementsSchema>;
export type iAllAnnouncements = z.infer<typeof returnAnnouncementSchemaAll>;
export type iAnnouncement = z.infer<typeof returnAnnouncementSchema>;
export type iUpdateAnnouncementRequest = z.infer<typeof UpdateeAnnouncementSchema>;
export type iComment = z.infer<typeof commentSchema>;

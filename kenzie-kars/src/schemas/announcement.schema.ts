import { z } from "zod";

const announcementSchema = z.object({
  brand: z.string(),
  model: z.string(),
  year: z.string(),
  fuel: z.number(),
  mileage: z.number(),
  color: z.string(),
  price_table_fipe: z.string(),
  price: z.string(),
  description: z.string(),
  published: z.boolean(),
  cover_image: z.string()
});

const createAnnouncementSchema = announcementSchema.extend({
  id: z.string(),
  createdAt: z.string()
});

const updateAnnouncementSchema = z.object({
  brand: z.string().optional(),
  model: z.string().optional(),
  year: z.string().optional(),
  fuel: z.number().optional(),
  mileage: z.number().optional(),
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

const UserAnnouncementsSchema = createUserSchema.extend({
  announcement: returnAnnouncementSchemaAll
});

const returnAnnouncementSchema = createAnnouncementSchema.extend({
  user: createUserSchema
});

export type iUserAnnouncements = z.infer<typeof UserAnnouncementsSchema>;
export type iAllAnnouncements = z.infer<typeof returnAnnouncementSchemaAll>;
export type iAnnouncement = z.infer<typeof returnAnnouncementSchema>;



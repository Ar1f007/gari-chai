import { z } from 'zod';

const imageSchema = z.object({
  thumbnailUrl: z.string().url(),
  originalUrl: z.string().url(),
});

export const carPartSchema = z.object({
  _id: z.string(),
  name: z.string(),
  slug: z.string(),
  price: z.number(),
  discount: z.number(),
  stock: z.number(),
  status: z.boolean(),
  warranty: z.string().optional(),
  manufacturer: z.string().optional(),
  posterImage: imageSchema,
  imageUrls: z
    .array(
      z.object({
        key: z.string(),
        url: z.object({
          thumbnailUrl: z.string().url(),
          originalUrl: z.string().url(),
        }),
      }),
    )
    .optional(),
  videos: z.array(z.string()).optional(),
  isVerified: z.boolean(),
  description: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
  metaData: z.record(z.string().min(1), z.any()).optional().default({}),
});

export type TCarPartSchema = z.infer<typeof carPartSchema>;

export const carPartQuerySchema = z.object({
  name: z.string(),
  limit: z.string(),
  page: z.string(),
  price: z.string(),
});

export type TCarPartQuerySchema = z.infer<typeof carPartQuerySchema>;

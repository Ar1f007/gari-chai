import { z } from 'zod';

const imageSchema = z.object({
  thumbnailUrl: z.string().url().optional(),
  originalUrl: z.string().url(),
});

/**
 * Single Brands schema shape - coming from server
 * EG: Brand name: Toyota and is properties
 */
export const brandSchema = z.object({
  _id: z.string(),
  name: z.string(),
  slug: z.string(),
  image: imageSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
});

/**
 * Single Brand Model schema shape - coming from server
 * Eg. Brand Toyota, model Nexon and its type
 */
export const brandModelSchema = z.object({
  _id: z.string(),
  name: z.string(),
  carCollectionCount: z.number(),
  brand: z.string(),
  upcoming: z.boolean(),
  slug: z.string(),
  image: imageSchema.optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const carBodyStylesSchema = z.object({
  _id: z.string(),
  name: z.string(),
  slug: z.string(),
  image: z.optional(imageSchema),
  createdAt: z.string(),
  updatedAt: z.string(),
});

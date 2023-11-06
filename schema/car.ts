import { z } from 'zod';

export const carSchema = z.object({
  _id: z.string(),
  name: z.string(),
  slug: z.string(),
  year: z.number(),
  registrationYear: z.number(),
  description: z.string().optional(),
  brand: z.object({ slug: z.string(), name: z.string() }),
  modelNumber: z.number(),
  engine: z.object({
    type: z.string(),
    displacement: z.number().optional(),
    horsePower: z.number().optional(),
    torque: z.number().optional(),
  }),
  transmission: z.string(),
  bodyStyle: z.string(),
  fuel: z.object({
    type: z.string(),
    economy: z.object({ city: z.number().optional(), highway: z.number().optional() }).optional(),
  }),
  acceleration: z
    .object({ zeroTo60: z.number().optional(), topSpeed: z.number().optional() })
    .optional(),
  safetyFeatures: z.string().optional(),
  infotainmentSystem: z.string().optional(),
  mileage: z.number(),
  posterImage: z.object({
    originalUrl: z.string().url(),
    thumbnailUrl: z.string().url(),
  }),
  imageUrls: z.array(z.string()).optional(),
  color: z.string(),
  baseInteriorColor: z.string(),
  numberOfDoors: z.number(),
  price: z.number(),
  tags: z.array(z.object({ value: z.string(), label: z.string(), _id: z.string() })).optional(),

  publishedAt: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type TCarSchema = z.infer<typeof carSchema>;

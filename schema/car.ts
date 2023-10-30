import { z } from 'zod';

export const carSchema = z.object({
  _id: z.string(),
  slug: z.string(),
  name: z.string(),

  year: z.number(),
  registrationYear: z.number(),
  description: z.string().optional(),
  brand: z.object({
    name: z.string(),
    slug: z.string(),
  }),
  modelNumber: z.number(),

  mileage: z.number(),
  imageUrls: z.array(z.string().url()).optional(),
  posterImage: z.object({
    originalUrl: z.string().url(),
    thumbnailUrl: z.string().url(),
  }),
  color: z.string(),
  baseInteriorColor: z.string(),
  numberOfDoors: z.number(),

  engine: z.object({
    type: z.string(),
    displacement: z.number(),
    horsePower: z.number(),
    torque: z.number(),
  }),

  transmission: z.string(),
  bodyStyle: z.string(),
  fuel: z.object({
    type: z.string(),
    economy: z.object({
      city: z.number(),
      highway: z.number(),
    }),
  }),
  acceleration: z.object({
    zeroTo60: z.number(),
    topSpeed: z.number(),
  }),
  safetyFeatures: z.string(),
  infotainmentSystem: z.string(),

  createdAt: z.string(),
  updatedAt: z.string(),
});

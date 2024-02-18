import { z } from 'zod';
import { imageSchema } from './common';
import { carSchema } from './car';

export const carCampaignSchema = z.object({
  _id: z.string(),

  title: z.string(),

  tagline: z.string().optional(),

  description: z.string().optional(),

  startDate: z.string(),

  endDate: z.string(),

  isActive: z.boolean(),

  posterImage: imageSchema,

  metaData: z.record(z.string().min(1), z.unknown()).optional().default({}),

  newCars: z.array(carSchema),

  usedCars: z.array(z.any()),

  sort: z.number().optional(),

  link: z.string().optional(),
});

export type TCarCampaign = z.infer<typeof carCampaignSchema>;

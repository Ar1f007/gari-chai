import { z } from 'zod';
import { imageSchema, minMaxPriceSchema } from './common';
import { carSchema } from './car';
import { userBasicInfoAPIResponseSchema } from './user';

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

  newCars: z.array(
    z.object({
      car: carSchema,
      campaignPrice: minMaxPriceSchema,
    }),
  ),

  usedCars: z.array(
    // z.object({
    //   car: any,
    //   campaignPrice: minMaxPriceSchema,
    // })
    // TODO: FIX IT
    z.any(),
  ),

  sort: z.number().optional(),

  link: z.string().optional(),

  // TODO: FIX IT
  createdBy: userBasicInfoAPIResponseSchema.optional(),
});

export type TCarCampaign = z.infer<typeof carCampaignSchema>;

import { z } from 'zod';

export const sliderSchema = z.object({
  _id: z.string(),
  title: z.string().optional(),
  showTitle: z.boolean(),
  link: z.string(),
  imgUrl: z.string().url(),
  type: z.enum(['desktop', 'mobile']),
  status: z.enum(['active', 'hidden']),
  sort: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type TSlider = z.infer<typeof sliderSchema>;

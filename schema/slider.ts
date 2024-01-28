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

  isSponsored: z.boolean().default(false).optional(),
  metadata: z.record(z.string().min(1), z.any()).optional().default({}),
  sliderStyle: z
    .object({
      textColor: z.string().default(''),
      bgColor: z.string().default(''),
    })
    .optional(),
});

export type TSlider = z.infer<typeof sliderSchema>;

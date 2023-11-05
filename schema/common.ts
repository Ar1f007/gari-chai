import { homePageSectionNameEnum } from '@/lib/constants';
import { z } from 'zod';
import { carSchema } from './car';

export const homeSettingApiSchemaSingleInstance = z.object({
  _id: z.string(),
  sectionName: homePageSectionNameEnum,
  content: carSchema,
  tags: z.array(z.string()),
  sort: z.number(),
  contentId: z.string(),
});

export type THomeSettingApiSchemaSingleInstance = z.infer<
  typeof homeSettingApiSchemaSingleInstance
>;

export type TCarsByTagName = { name: string; items: THomeSettingApiSchemaSingleInstance[] };

/**
 * Single Brands schema shape - coming from server
 */
export const brandSchema = z.object({
  _id: z.string(),
  name: z.string(),
  createdAt: z.string(),
  slug: z.string(),
  image: z.object({
    thumbnailUrl: z.string().url().optional(),
    originalUrl: z.string().url(),
  }),
});

/**
 * Single Brand response from `Home Setting table`
 */
export const homeSettingApiBrandSchemaSingleInstance = z.object({
  _id: z.string(),
  sectionName: z.string(),
  sort: z.number(),
  content: brandSchema,
  tags: z.array(z.string()),
  contentId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type THomeSettingApiBrandSchemaSingleInstance = z.infer<
  typeof homeSettingApiBrandSchemaSingleInstance
>;
/**
 * End Brands schema - Home page
 */

import { z } from 'zod';

import { homePageSectionNameEnum } from '@/lib/constants';
import { carSchema } from './car';
import { brandSchema } from './brand-and-model';

export const imageSchema = z.object({
  thumbnailUrl: z.string().url().optional(),
  originalUrl: z.string().url(),
});

export const numberOrNull = z.union([z.number(), z.null()]);

export const numberOrNaN = z.union([z.number(), z.nan()]);

export const singleSpecificationSchema = z.object({
  name: z.string().min(1, 'name is required'),
  value: z.union([z.string().min(1, 'value is required'), z.boolean()]),
  valueType: z.enum(['boolean', 'text']),
});

export const isNumberRequiredErrMsg = {
  invalid_type_error: 'required a number',
};

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

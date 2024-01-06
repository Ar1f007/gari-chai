import { z } from 'zod';

import { homePageSectionNameEnum } from '@/lib/constants';
import { carSchema } from './car';
import { brandSchema } from './brand-and-model';

export const imageSchema = z.object({
  thumbnailUrl: z.string().url(),
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

const queryParamSchema = z.optional(
  z.string().refine((val) => {
    if (val) {
      return val.length >= 1;
    }
    return true;
  }),
);

export const searchParamsSchema = z
  .object({
    query: queryParamSchema,
    car: queryParamSchema, // type of the car: 'new' | 'used'
    budget: queryParamSchema,
    bodyType: queryParamSchema,
    brand: queryParamSchema,
    model: queryParamSchema,
    city: queryParamSchema, // city to search, default: 'all'
    scope: queryParamSchema, // search scope 'global' | 'new' | 'used',
    launchedAt: queryParamSchema, // future | past , future means upcoming cars, past means already launched
  })
  .refine(({ scope, query }) => {
    // make sure if scope value is global, then a query string is provided
    if (scope?.length && scope === 'global' && !query?.length) {
      return false;
    }
    return true;
  });

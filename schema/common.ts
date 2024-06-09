import { z } from 'zod';
import { isValidPhoneNumber, parsePhoneNumber } from 'libphonenumber-js';

import { homePageSectionNameEnum } from '@/lib/constants';
import { carSchema } from './car';
import { brandSchema } from './brand-and-model';
import { carPartSchema } from './car-part';

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

export const homeSettingCommonSchema = z.object({
  _id: z.string(),
  sectionName: homePageSectionNameEnum,
  tags: z.array(z.string()),
  sort: z.number(),
  contentId: z.string(),

  createdAt: z.string(),
  updatedAt: z.string(),
});

export const homeSettingApiSchemaSingleInstance = homeSettingCommonSchema.merge(
  z.object({
    content: carSchema,
  }),
);

export type THomeSettingApiSchemaSingleInstance = z.infer<
  typeof homeSettingApiSchemaSingleInstance
>;

export type TCarsByTagName = { name: string; items: THomeSettingApiSchemaSingleInstance[] };

/**
 * Single Brand response from `Home Setting table`
 */
export const homeBrandSchemaSingleInstance = homeSettingCommonSchema.merge(
  z.object({
    content: brandSchema,
  }),
);

export type THomeBrandSchema = z.infer<typeof homeBrandSchemaSingleInstance>;
/**
 * End Brands schema - Home page
 */

/**
 * Single Car Part response from `Home Setting table`
 */
export const homeCarPartSchemaSingleInstance = homeSettingCommonSchema.merge(
  z.object({
    content: carPartSchema,
  }),
);

export type THomeCarPartSchema = z.infer<typeof homeCarPartSchemaSingleInstance>;
/**
 * End Car Part schema - Home page
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
    launchedAt: queryParamSchema, // future | past , future means upcoming cars, past means already launched,
    seats: z.union([z.string(), z.array(z.string())]).optional(),
  })
  .refine(({ scope, query }) => {
    // make sure if scope value is global, then a query string is provided
    if (scope?.length && scope === 'global' && !query?.length) {
      return false;
    }
    return true;
  });

export const phoneNumberSchema = z
  .string()
  .min(1, 'Phone number is required')
  .refine((val) => isValidPhoneNumber(val, 'BD'), {
    message: 'Please enter a valid Bangladeshi phone number',
  });

export const formatPhoneNumberSchemaAsBangladeshi = phoneNumberSchema.transform(
  (phoneNumber) => parsePhoneNumber(phoneNumber, 'BD').number,
);

export const minMaxPriceSchema = z
  .object({
    min: z.coerce.number({ ...isNumberRequiredErrMsg }),
    max: z.coerce.number({ ...isNumberRequiredErrMsg }),
  })
  .refine(
    (val) => {
      // do not allow any negative value
      if (val.min < 0 || val.max < 0) {
        return false;
      }

      // allowing the same value because sometime user do not want to give two different price and that time the price can be both same
      if (val.min == val.max) {
        return true;
      }

      if (val.min > val.max) {
        return false;
      }

      return true;
    },
    { message: 'Min value for price can not be greater than max value' },
  );

export type TMinMaxPriceSchema = z.infer<typeof minMaxPriceSchema>;

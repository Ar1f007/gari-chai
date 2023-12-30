import { z } from 'zod';
import { brandModelSchema, brandSchema, carBodyStylesSchema } from './brand-and-model';

const singleSpecificationSchema = z.object({
  name: z.string().min(1, 'name is required'),
  value: z.union([z.string(), z.boolean()]),
  valueType: z.object({
    value: z.enum(['boolean', 'text']),
    label: z.string(),
  }),
});

const groupSpecificationSchema = z.object({
  groupName: z.string(),
  values: z.array(singleSpecificationSchema),
});

export const carSchema = z.object({
  _id: z.string(),

  name: z.string(),

  slug: z.string(),

  description: z.string().optional(),

  brand: z.object({
    value: z.union([z.string(), brandSchema, z.null()]),
    label: z.string(),
  }),

  brandModel: z.object({
    value: z.union([z.string(), brandModelSchema, z.null()]),
    label: z.string(),
  }),

  transmission: z.string(),

  bodyStyle: z.object({
    value: z.union([z.string(), carBodyStylesSchema, z.null()]),
    label: z.string(),
  }),

  fuel: z.object({
    typeInfo: z.object({
      value: z.object({
        type: z.string(),
        fullForm: z.string(),
      }),
      label: z.string(),
    }),
  }),

  posterImage: z.object({
    originalUrl: z.string().url(),
    thumbnailUrl: z.string().url().optional(),
  }),

  imageUrls: z.array(z.string()),

  videoUrls: z
    .array(
      z.object({
        thumbnailUrl: z.string().url().optional(),
        url: z.string().url(),
      }),
    )
    .default([]),

  colors: z
    .array(
      z.object({
        name: z.string(),
        imageUrls: z.array(z.string().url()).optional(),
      }),
    )
    .default([]),

  numOfDoors: z.number(),

  price: z.object({
    min: z.number(),
    max: z.number(),
    isNegotiable: z.boolean(),
  }),

  tags: z.array(z.object({ value: z.string(), label: z.string() })),

  specificationsByGroup: z.array(groupSpecificationSchema),

  additionalSpecifications: z.array(singleSpecificationSchema),

  carType: z.enum(['new', 'used']),

  launchedAt: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),

  status: z.enum(['available', 'sold', 'reserved']),
  soldAt: z.string().optional(),
  cities: z.array(
    z.object({
      value: z.string(),
      label: z.string(),
    }),
  ),
});

export type TCarSchema = z.infer<typeof carSchema>;

export type TGroupSpecification = z.infer<typeof groupSpecificationSchema>;

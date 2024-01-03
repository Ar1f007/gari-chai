import { z } from 'zod';
import { brandModelSchema, brandSchema, carBodyStylesSchema } from './brand-and-model';

const imageSchema = z.object({
  thumbnailUrl: z.string().url(),
  originalUrl: z.string().url(),
});

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

  brand: z.object({
    value: z.union([z.string(), brandSchema, z.null()]),
    label: z.string(),
  }),

  brandModel: z.object({
    value: z.union([z.string(), brandModelSchema, z.null()]),
    label: z.string(),
  }),

  bodyStyle: z.object({
    value: z.union([z.string(), carBodyStylesSchema, z.null()]),
    label: z.string(),
  }),

  tags: z.array(z.object({ value: z.string(), label: z.string() })),

  transmission: z.string(),

  numOfDoors: z.number(),

  seatingCapacity: z.number(),

  fuel: z.object({
    typeInfo: z.object({
      value: z.object({
        type: z.string(),
        fullForm: z.string(),
      }),
      label: z.string(),
    }),
  }),

  colors: z
    .array(
      z.object({
        name: z.string(),
        imageUrls: z.array(
          z.object({
            key: z.string(),
            url: imageSchema,
          }),
        ),
      }),
    )
    .default([]),

  price: z.object({
    min: z.number(),
    max: z.number(),
    isNegotiable: z.boolean(),
  }),

  specificationsByGroup: z.array(groupSpecificationSchema),

  additionalSpecifications: z.array(singleSpecificationSchema),

  posterImage: z.object({
    originalUrl: z.string().url(),
    thumbnailUrl: z.string().url(),
  }),

  imageUrls: z.array(imageSchema),

  videos: z
    .array(
      z.object({
        thumbnailImage: z.optional(imageSchema),
        link: z.string().url(),
      }),
    )
    .optional()
    .default([]),

  carType: z.enum(['new', 'used']),

  description: z.string().optional(),

  cities: z.array(
    z.object({
      value: z.string(),
      label: z.string(),
    }),
  ),

  launchedAt: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),

  status: z.enum(['available', 'sold', 'reserved']),
  soldAt: z.string().optional(),
});

export type TCarSchema = z.infer<typeof carSchema>;

export type TGroupSpecification = z.infer<typeof groupSpecificationSchema>;

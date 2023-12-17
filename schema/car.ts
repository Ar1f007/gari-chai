import { z } from 'zod';
import { brandModelSchema, brandSchema, carBodyTypeSchema } from './brand-and-model';

const numberOrNull = z.union([z.number(), z.null()]);

const singleSpecificationSchema = z.object({
  name: z.string().min(1, 'name is required'),
  value: z.union([z.string(), z.boolean()]),
  valueType: z.enum(['boolean', 'text']),
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
    id: z.union([z.string(), brandSchema, z.null()]),
    name: z.string(),
  }),

  brandModel: z.object({
    id: z.union([z.string(), brandModelSchema, z.null()]),
    name: z.string(),
  }),

  colors: z
    .array(
      z.object({
        name: z.string(),
        imageUrls: z.array(z.string().url()).optional(),
      }),
    )
    .default([]),

  engine: z.object({
    type: z.string(),
    numOfCylinders: numberOrNull,
    horsePower: numberOrNull,
    torque: numberOrNull,
  }),

  transmission: z.string(),

  bodyStyle: z.object({
    id: z.union([z.string(), carBodyTypeSchema, z.null()]),
    name: z.string(),
  }),

  fuel: z.object({
    typeInfo: z.object({
      type: z.string(),
      fullForm: z.string(),
    }),
    economy: z.object({ city: numberOrNull, highway: numberOrNull }),
  }),

  acceleration: z.object({
    zeroTo60: numberOrNull,
    topSpeed: numberOrNull,
  }),

  posterImage: z.object({
    originalUrl: z.string().url(),
    thumbnailUrl: z.string().url(),
  }),

  imageUrls: z.array(z.string()).optional(),

  numOfDoors: z.number(),

  price: z.object({
    min: z.number(),
    max: z.number(),
    isNegotiable: z.boolean(),
  }),

  tags: z.array(z.object({ value: z.string(), label: z.string(), _id: z.string() })).optional(),

  specificationsByGroup: z.array(groupSpecificationSchema),

  additionalSpecifications: z.array(singleSpecificationSchema),

  carType: z.enum(['new', 'used']),

  videoUrls: z
    .array(
      z.object({
        thumbnailUrl: z.string().url().optional(),
        url: z.string().url(),
      }),
    )
    .optional()
    .default([]),

  launchedAt: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type TCarSchema = z.infer<typeof carSchema>;

export type TGroupSpecification = z.infer<typeof groupSpecificationSchema>;

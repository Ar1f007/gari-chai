import { z } from 'zod';

export const reviewSchema = z.object({
  title: z
    .string()
    .min(1, 'Please enter a heading')
    .min(10, 'Heading should be at least 10 characters long'),

  review: z
    .string()
    .min(1, 'Please type your review')
    .min(50, 'Review should be at least 50 characters long'),

  rating: z
    .string()
    .min(1, 'Please add your rating')
    .refine((val) => !!Number(val), { message: 'Rating should be a number' })
    .refine((val) => +val >= 1 && +val <= 5, { message: 'Rating should be between 1 and 5' }),
});

// this schema is used when adding a review
export const addReviewPayloadSchema = reviewSchema.extend({
  carId: z.string().min(1, 'Car id is required'),
  userId: z.string().min(1, 'User id is required'),
});

// this is the shape of review getting from api
const reviewBody = z.object({
  _id: z.string(),
  title: z.string(),
  review: z.string(),
  rating: z.number(),
  userId: z.string(),
  carId: z.string(),
  isFeatured: z.boolean().optional(),
  helpfulCount: z.number().optional(),
  unhelpfulCount: z.number().optional(),
  tags: z.array(z.string()).optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

const reviewBodyWithUserBasicInfo = reviewBody.extend({
  userInfo: z.object({
    _id: z.string(),
    name: z.string(),
    image: z.string().optional(),
  }),
});

export const reviewsWithStatsSchema = z.object({
  averageRating: z.number().default(0),
  totalReviews: z.number().default(0),
  reviews: z.array(reviewBodyWithUserBasicInfo).default([]),
});

export type ReviewFormInputs = z.infer<typeof reviewSchema>;
export type AddReviewPayload = z.infer<typeof addReviewPayloadSchema>;
export type ReviewWithStats = z.infer<typeof reviewsWithStatsSchema>;
export type ReviewBody = z.infer<typeof reviewBodyWithUserBasicInfo>;

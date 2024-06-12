import { z } from 'zod';
import { userBasicInfoAPIResponseSchema } from './user';

export const reviewSchema = z.object({
  reviewType: z.string().min(1),

  title: z
    .string()
    .min(1, 'Please enter a heading')
    .max(60, 'Too long (max 60 characters allowed)'),

  review: z.string().min(1, 'Please type your review'),

  rating: z.coerce.number().min(1, 'Please give a rating'),
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

  status: z.enum(['pending', 'approved', 'discard']),
  reviewType: z.string(),
  discardReason: z.string(),
});

const userInfo = userBasicInfoAPIResponseSchema.pick({
  firstName: true,
  lastName: true,
  profilePicture: true,
});
const reviewBodyWithUserBasicInfo = reviewBody.extend({
  userInfo,
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

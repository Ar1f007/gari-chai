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

export type ReviewFormInputs = z.infer<typeof reviewSchema>;
export type AddReviewPayload = z.infer<typeof addReviewPayloadSchema>;

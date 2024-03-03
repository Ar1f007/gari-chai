import {
  AddReviewPayload,
  ReviewBody,
  addReviewPayloadSchema,
  reviewsWithStatsSchema,
} from '@/schema/review';
import { apiFetch } from '../apiFetch';
import { endpoints } from '../endpoints';
import { ReqMethod } from '../serviceHelper';
import { ZodError } from 'zod';

export const reviewsService = {
  addReview: async function (payload: AddReviewPayload) {
    try {
      const parsedPayload = addReviewPayloadSchema.parse(payload);

      const data = {
        ...parsedPayload,
        rating: +parsedPayload.rating,
      };

      return apiFetch(endpoints.api.reviews.baseUrl, {
        method: ReqMethod.POST,
        body: data,
      });
    } catch (error) {
      if (error instanceof ZodError) {
        return error;
      }

      return null;
    }
  },
  getReviewsWithStats: async function ({ carId }: { carId: string }) {
    try {
      const url = endpoints.api.reviews.baseUrl + '/' + carId;
      const res = await apiFetch(url, {
        method: ReqMethod.GET,
        next: {
          revalidate: 0, // TODO
          // revalidate: 30 * 60, // every 30 mins
        },
      });

      if (res.status === 'success') {
        const parsedData = reviewsWithStatsSchema.safeParse(res.data);

        if (parsedData.success) {
          return parsedData.data;
        }
      }

      return null;
    } catch (error) {
      return null;
    }
  },

  getUserReviews: async function ({ userId }: { userId: string }) {
    const url = endpoints.api.reviews.userReviews + '/' + userId;

    return apiFetch<ReviewBody[]>(url, {
      method: ReqMethod.GET,
      cache: 'no-store',
    });
  },

  deleteReview: async function ({ reviewId }: { reviewId: string }) {
    const url = endpoints.api.reviews.baseUrl + '/' + reviewId;

    return apiFetch<ReviewBody[]>(url, {
      method: ReqMethod.DELETE,
    });
  },
};

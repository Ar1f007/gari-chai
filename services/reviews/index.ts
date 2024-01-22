import { AddReviewPayload, addReviewPayloadSchema, reviewsWithStatsSchema } from '@/schema/review';
import { apiFetch } from '../apiFetch';
import { endpoints } from '../endpoints';
import { ReqMethod } from '../serviceHelper';
import { ZodError } from 'zod';

export const reviews = {
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
          revalidate: 30 * 60, // every 30 mins
        },
      });

      if (res.status === 'success') {
        const parsedData = reviewsWithStatsSchema.safeParse(res.data);

        if (parsedData.success) {
          return parsedData.data;
        }
        console.error('ERROR REVIEW_WITH_STATS API');
      }

      return null;
    } catch (error) {
      return null;
    }
  },
};

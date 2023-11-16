import { AddReviewPayload, addReviewPayloadSchema } from '@/schema/review';
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
  getReviews: async function ({ carId }: { carId: string }) {
    try {
      const url = endpoints.api.reviews.baseUrl + '/' + carId;
      return apiFetch(url, {
        method: ReqMethod.GET,
      });
    } catch (error) {
      return null;
    }
  },
};

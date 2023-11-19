import { TCarSchema } from '@/schema/car';
import { CommentCreationPayload, commentSchema } from '@/schema/comment';

import { apiFetch } from '../apiFetch';
import { endpoints } from '../endpoints';
import { ReqMethod } from '../serviceHelper';
import { z } from 'zod';

export const commentService = {
  async getComments(payload: { carId: TCarSchema['_id'] }) {
    const url = endpoints.api.comments.baseUrl + '/' + payload.carId;

    try {
      const res = await apiFetch(url, {
        method: ReqMethod.GET,
        next: {
          tags: [payload.carId],
          revalidate: 30 * 60, // revalidate every 30 mins
        },
      });

      if (res.status === 'success') {
        const parsedData = z.array(commentSchema).safeParse(res.data);

        if (parsedData.success) {
          return parsedData.data;
        } else {
          return 'Failed to fetch comments';
        }
      }

      return res.message;
    } catch (error) {
      return null;
    }
  },

  addComment(payload: CommentCreationPayload) {
    try {
      const url = endpoints.api.comments.baseUrl;

      return apiFetch(url, {
        method: ReqMethod.POST,
        body: payload,
      });
    } catch (e) {
      return null;
    }
  },
};

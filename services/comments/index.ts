import { TCarSchema } from '@/schema/car';
import { CommentCreationPayload, commentSchema } from '@/schema/comment';

import { apiFetch } from '../apiFetch';
import { endpoints } from '../endpoints';
import { ReqMethod } from '../serviceHelper';

export const commentService = {
  async getComments(payload: { carId: TCarSchema['_id'] }) {
    const url = endpoints.api.comments.baseUrl + '/' + payload.carId;

    try {
      const res = await apiFetch(url, {
        method: ReqMethod.GET,
        next: {
          tags: [payload.carId],
          revalidate: 0, // revalidate every 30 mins
        },
      });

      if (res.status === 'success') {
        const parsedData = commentSchema.safeParse(res.data);
        if (parsedData.success) {
          return parsedData.data;
        } else {
          return {
            message: 'Failed to fetch comments',
          };
        }
      }

      return res;
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

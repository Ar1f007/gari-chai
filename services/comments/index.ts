import { TCarSchema } from '@/schema/car';
import { CommentCreationPayload, commentSchema, CommentUpdatePayload } from '@/schema/comment';

import { apiFetch } from '../apiFetch';
import { endpoints } from '../endpoints';
import { ReqMethod } from '../serviceHelper';
import { z } from 'zod';
import { generateTagNameForComments } from '@/util/generate-tag-name';

export const commentService = {
  async getComments(payload: { carId: TCarSchema['_id'] }) {
    const url = endpoints.api.comments.baseUrl + '/' + payload.carId;

    try {
      const res = await apiFetch(url, {
        method: ReqMethod.GET,
        next: {
          tags: [generateTagNameForComments(payload.carId)],
          revalidate: 0, // revalidate every 2 hours
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

  editComment(payload: CommentUpdatePayload) {
    const url = endpoints.api.comments.baseUrl + '/' + payload.commentId;

    try {
      return apiFetch(url, {
        method: ReqMethod.PATCH,
        body: payload,
      });
    } catch (error) {
      return null;
    }
  },

  deleteComment(commentId: string) {
    const url = endpoints.api.comments.baseUrl + '/' + commentId;

    try {
      return apiFetch(url, {
        method: ReqMethod.DELETE,
      });
    } catch (error) {
      return null;
    }
  },
};

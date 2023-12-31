import { z } from 'zod';

// used when form is being submitted
export const commentFormSchema = z.object({
  content: z.string().min(1, 'Please enter a comment before submitting'),
});

// when api call is made to backend to create a comment
export const commentCreationPayloadSchema = z.object({
  user: z.string(),
  car: z.string(),
  isChild: z.union([z.boolean(), z.null()]),
  content: z.string(),
  parentId: z.string().optional(),
});

const commentUpdatePayloadSchema = z.object({
  commentId: z.string(),
  commentBody: z.object({
    content: z.string(),
  }),
});

// comment body that is coming from server
export const commentSchemaWithoutChild = z.object({
  _id: z.string(),
  content: z.string(),
  user: z.object({
    _id: z.string(),
    name: z.string(),
    image: z.string().or(z.undefined()),
  }),
  car: z.string(),
  likes: z.number(),
  dislikes: z.number(),
  visibility: z.object({
    isApproved: z.boolean(),
    isFlagged: z.boolean(),
  }),
  depth: z.number(),
  reports: z.number(),
  parentId: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

type Comment = z.infer<typeof commentSchemaWithoutChild> & {
  children: Comment[];
};

export const commentSchema: z.ZodType<Comment> = commentSchemaWithoutChild.extend({
  children: z.lazy(() => z.array(commentSchema)),
});

export type CommentInputs = z.infer<typeof commentFormSchema>;

export type CommentCreationPayload = z.infer<typeof commentCreationPayloadSchema>;

export type CommentBody = z.infer<typeof commentSchema>;

export type CommentUpdatePayload = z.infer<typeof commentUpdatePayloadSchema>;

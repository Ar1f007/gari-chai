import { z } from 'zod';

// used when form is being submitted
export const commentFormSchema = z.object({
  content: z.string().min(1, 'Please enter a comment before submitting'),
});

// when api call is made to create comment
export const commentCreationPayloadSchema = z.object({
  user: z.string(),
  car: z.string(),
  isChild: z.union([z.boolean(), z.null()]),
  content: z.string(),
  parentId: z.string().optional(),
});

// comment body that is coming from server
export const commentSchema = z.object({
  _id: z.string(),
  content: z.string(),
  children: z.array(z.string()).default([]),
  user: z.string(),
  car: z.string(),
  likes: z.number().default(0),
  dislikes: z.number().default(0),
  visibility: z.object({
    isApproved: z.boolean().default(true),
    isFlagged: z.boolean().default(false),
  }),
  depth: z.number().default(0),
  reports: z.number().default(0),
  parentId: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type CommentInputs = z.infer<typeof commentFormSchema>;
export type CommentCreationPayload = z.infer<typeof commentCreationPayloadSchema>;

export type CommentBody = z.infer<typeof commentSchema>;

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

export type CommentInputs = z.infer<typeof commentFormSchema>;
export type CommentCreationPayload = z.infer<typeof commentCreationPayloadSchema>;

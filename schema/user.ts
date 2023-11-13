import { z } from 'zod';

export const userAPIResponseSchema = z.object({
  _id: z.string(),
  name: z.string(),
  phoneNumber: z.string().default(''),
  emails: z.array(z.string()).optional(),
  role: z.array(z.string()),
  isVerified: z.boolean(),
  isAccountActive: z.boolean(),
  image: z.string().url().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type TAuthUser = z.infer<typeof userAPIResponseSchema>;

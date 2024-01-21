import { z } from 'zod';

const socialProvider = z.object({
  name: z.string(),
  id: z.string(),
  token: z.string(),
  email: z.string().email(),
  username: z.string(),
});

const userLocal = z.object({
  email: z.string().optional(),
  phone: z.string().optional(),
});

const UserRoleEnum = z.enum(['admin', 'editor', 'moderator', 'super-admin', 'support', 'user']);

export const userBasicInfoAPIResponseSchema = z.object({
  _id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  local: userLocal,
  social: z.object({ providers: z.array(socialProvider) }),
  role: z.array(UserRoleEnum).default(['user']),
  isVerified: z.boolean(),
  isAccountActive: z.boolean(),
  isBanned: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
  profilePicture: z.string(),
});

export type TAuthBasicUserInfo = z.infer<typeof userBasicInfoAPIResponseSchema>;

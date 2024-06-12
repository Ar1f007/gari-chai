import { z } from 'zod';

import { phoneNumberSchema } from './common';

/**
 * SIGNUP SCHEMA
 */

const isStrongPassword = (value: string): boolean => {
  // Strong password criteria: Minimum 8 characters, at least one lowercase letter, one uppercase letter, and one digit
  const regex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;
  return regex.test(value);
};

export const signupUserBasicInfo = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
});

export const signupPasswordSchema = z.object({
  password: z
    .string()
    .min(1, 'Password is required')
    .refine((value) => isStrongPassword(value), {
      message:
        'Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, and one digit',
    }),
});

export const signupWithEmailRequiredInfo = z.object({
  email: z.string().min(1, 'Email is required').email(),
});

export const signupWithPhoneRequiredInfo = z.object({
  phone: phoneNumberSchema,
});

export const signupWithEmailSchema = signupUserBasicInfo
  .merge(signupWithEmailRequiredInfo)
  .merge(signupPasswordSchema);

export const signupWithPhoneSchema = signupUserBasicInfo
  .merge(signupWithPhoneRequiredInfo)
  .merge(signupPasswordSchema);

export type SignupWithEmailSchema = z.infer<typeof signupWithEmailSchema>;
export type SignupWithPhoneSchema = z.infer<typeof signupWithPhoneSchema>;

export type AuthenticationMethods = 'email' | 'phone';

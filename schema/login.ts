import { z } from 'zod';

import { isValidPhoneNumber, parsePhoneNumber } from 'libphonenumber-js';
import { phoneNumberSchema } from './common';

// export const loginSchema = z.object({
//   phoneNumber: z
//     .string()
//     .min(1, 'Phone number is required')
//     .refine((val) => isValidPhoneNumber(val, 'BD'), {
//       message: 'Invalid Bangladeshi phone number format',
//     })
//     .transform((phoneNumber) => parsePhoneNumber(phoneNumber, 'BD').number),

//   password: z.string().min(1, 'Password is required'),
// });

// export type LoginInputs = z.infer<typeof loginSchema>;

/**
 * LOGIN SCHEMA
 */
export const loginWithEmailSchema = z.object({
  email: z.string().min(1, 'Email is required').email(),
  password: z.string().min(1, 'Password is required'),
});

export const loginWithPhoneSchema = z.object({
  phone: phoneNumberSchema,
  password: z.string().min(1, 'Password is required'),
});

export const loginSchema = z.object({
  username: z.string().min(1, 'Please enter your email or phone number'),
  password: z.string().min(1, 'Password is required'),
});

export type LoginWithEmailSchema = z.infer<typeof loginWithEmailSchema>;
export type LoginWithPhoneSchema = z.infer<typeof loginWithPhoneSchema>;

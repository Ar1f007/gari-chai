import { z } from 'zod';

import { isValidPhoneNumber, parsePhoneNumber } from 'libphonenumber-js';

export const registerSchema = z.object({
  name: z.string().min(1, 'Name is required').min(3, 'Name should be at least 3 characters long'),

  phoneNumber: z
    .string()
    .min(1, 'Please add your phone number')
    .refine((val) => isValidPhoneNumber(val, 'BD'), {
      message: 'Invalid Bangladeshi phone number format',
    })
    .transform((phoneNumber) => parsePhoneNumber(phoneNumber, 'BD').number),

  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password should be at least 6 characters long'),
});

export type RegisterInputs = z.infer<typeof registerSchema>;

/**
 * SIGNUP SCHEMA
 */

export const phoneNumberSchema = z
  .string()
  .min(1, 'Phone number is required')
  .refine((val) => isValidPhoneNumber(val, 'BD'), {
    message: 'Please enter a valid Bangladeshi phone number',
  })
  .transform((phoneNumber) => parsePhoneNumber(phoneNumber, 'BD').number);

const isStrongPassword = (value: string): boolean => {
  // Strong password criteria: at least 8 characters, one lowercase letter, one uppercase letter, one digit, and one special character
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#]).{8,}$/;
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
        'Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one digit, and one special character',
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

export type SignupMethods = 'email' | 'phone';

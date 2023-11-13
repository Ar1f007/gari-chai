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

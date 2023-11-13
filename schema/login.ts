import { z } from 'zod';

import { isValidPhoneNumber, parsePhoneNumber } from 'libphonenumber-js';

export const loginSchema = z.object({
  phoneNumber: z
    .string()
    .min(1, 'Phone number is required')
    .refine((val) => isValidPhoneNumber(val, 'BD'), {
      message: 'Invalid Bangladeshi phone number format',
    })
    .transform((phoneNumber) => parsePhoneNumber(phoneNumber, 'BD').number),

  password: z.string().min(1, 'Password is required'),
});

export type LoginInputs = z.infer<typeof loginSchema>;

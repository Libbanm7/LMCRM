import { z } from 'zod';

const optionalText = (max: number) =>
  z.string().trim().max(max, `Must be at most ${max} characters`).default('');

export const businessProfileSchema = z.object({
  businessName: z
    .string()
    .trim()
    .min(1, 'Business name is required')
    .max(120, 'Business name must be at most 120 characters'),
  address: z
    .string()
    .trim()
    .min(1, 'Address is required')
    .max(300, 'Address must be at most 300 characters'),
  email: z.string().trim().toLowerCase().email('Enter a valid email address'),
  phone: optionalText(30),
  vatNumber: z
    .string()
    .trim()
    .regex(/^([A-Za-z0-9 ]{5,20})?$/, 'Enter a valid VAT number or leave it blank')
    .default(''),
  paymentDetails: optionalText(500),
});

export type BusinessProfileInput = z.infer<typeof businessProfileSchema>;
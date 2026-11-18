import { describe, it, expect } from 'vitest';
import { businessProfileSchema } from './business-profile';

const valid = {
  businessName: 'Example Haulage',
  address: '1 Example Street, Bristol',
  email: 'Hello@Example.com',
};

describe('businessProfileSchema', () => {
  it('accepts the minimum required fields and fills optional ones', () => {
    const result = businessProfileSchema.parse(valid);
    expect(result.phone).toBe('');
    expect(result.vatNumber).toBe('');
    expect(result.paymentDetails).toBe('');
  });

  it('lowercases and trims the email', () => {
    const result = businessProfileSchema.parse({ ...valid, email: '  Hello@Example.com ' });
    expect(result.email).toBe('hello@example.com');
  });

  it('rejects a missing business name', () => {
    expect(businessProfileSchema.safeParse({ ...valid, businessName: '  ' }).success).toBe(false);
  });

  it('rejects an invalid email', () => {
    expect(businessProfileSchema.safeParse({ ...valid, email: 'not-an-email' }).success).toBe(false);
  });

  it('allows a blank VAT number but rejects nonsense', () => {
    expect(businessProfileSchema.safeParse({ ...valid, vatNumber: '' }).success).toBe(true);
    expect(businessProfileSchema.safeParse({ ...valid, vatNumber: '!!' }).success).toBe(false);
  });
});
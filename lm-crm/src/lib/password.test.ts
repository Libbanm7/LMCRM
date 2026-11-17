import { describe, it, expect } from 'vitest';
import { hashPassword, verifyPassword } from './password';

describe('password hashing', () => {
  it('never returns the plain text password', async () => {
    const hash = await hashPassword('correct-horse-battery');
    expect(hash).not.toContain('correct-horse-battery');
  });

  it('verifies the right password and rejects the wrong one', async () => {
    const hash = await hashPassword('correct-horse-battery');
    expect(await verifyPassword('correct-horse-battery', hash)).toBe(true);
    expect(await verifyPassword('wrong-password', hash)).toBe(false);
  });
});
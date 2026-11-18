import { describe, it, expect, vi } from 'vitest';

vi.mock('@/lib/require-user', () => ({
  requireUserId: vi.fn().mockResolvedValue(null),
}));
vi.mock('@/lib/db', () => ({ connectDb: vi.fn() }));

import { GET, PUT } from './route';

describe('/api/profile without a session', () => {
  it('GET returns 401', async () => {
    const res = await GET();
    expect(res.status).toBe(401);
  });

  it('PUT returns 401', async () => {
    const res = await PUT(
      new Request('http://localhost/api/profile', {
        method: 'PUT',
        body: JSON.stringify({}),
      }),
    );
    expect(res.status).toBe(401);
  });
});
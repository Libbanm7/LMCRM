import { NextResponse } from 'next/server';
import { connectDb } from '@/lib/db';
import { User } from '@/models/user';
import { hashPassword } from '@/lib/password';
import { registerSchema } from '@/lib/validation/auth';

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = registerSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0].message },
      { status: 400 },
    );
  }

  const { email, password } = parsed.data;
  await connectDb();

  try {
    await User.create({ email, passwordHash: await hashPassword(password) });
  } catch (error) {
    if ((error as { code?: number }).code === 11000) {
      return NextResponse.json(
        { error: 'An account with that email already exists' },
        { status: 409 },
      );
    }
    throw error;
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
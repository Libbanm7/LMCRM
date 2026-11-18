import { NextResponse } from 'next/server';
import { connectDb } from '@/lib/db';
import { requireUserId } from '@/lib/require-user';
import { BusinessProfile } from '@/models/businessProfile';
import { businessProfileSchema } from '@/lib/validation/business-profile';

const unauthorised = () =>
  NextResponse.json({ error: 'Unauthorised' }, { status: 401 });

export async function GET() {
  const userId = await requireUserId();
  if (!userId) return unauthorised();

  await connectDb();
  const profile = await BusinessProfile.findOne({ userId }).lean();

  return NextResponse.json({ profile });
}

export async function PUT(request: Request) {
  const userId = await requireUserId();
  if (!userId) return unauthorised();

  const body = await request.json().catch(() => null);
  const parsed = businessProfileSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0].message },
      { status: 400 },
    );
  }

  await connectDb();
  const profile = await BusinessProfile.findOneAndUpdate(
    { userId },
    { $set: parsed.data },
    { upsert: true, new: true, runValidators: true, setDefaultsOnInsert: true },
  ).lean();

  return NextResponse.json({ profile });
}
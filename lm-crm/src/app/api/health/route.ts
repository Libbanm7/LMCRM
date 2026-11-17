import { NextResponse } from 'next/server';
import { connectDb } from '@/src/lib/db';

export async function GET() {
  try {
    await connectDb();
    return NextResponse.json({ status: 'ok' });
  } catch {
    return NextResponse.json({ status: 'error' }, { status: 500 });
  }
}
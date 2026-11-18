import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { connectDb } from '@/lib/db';
import { BusinessProfile } from '@/models/businessProfile';
import ProfileForm from './ProfileForm';

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user) redirect('/login');

  await connectDb();
  const profile = await BusinessProfile.findOne({
    userId: session.user.id,
  }).lean();

  return (
    <main className="mx-auto max-w-xl p-6">
      <h1 className="mb-4 text-2xl font-semibold">Business profile</h1>
      <p className="mb-6 text-sm text-gray-600">
        These details appear on your invoices.
      </p>
      <ProfileForm
        initial={{
          businessName: profile?.businessName ?? '',
          address: profile?.address ?? '',
          email: profile?.email ?? '',
          phone: profile?.phone ?? '',
          vatNumber: profile?.vatNumber ?? '',
          paymentDetails: profile?.paymentDetails ?? '',
        }}
      />
    </main>
  );
}
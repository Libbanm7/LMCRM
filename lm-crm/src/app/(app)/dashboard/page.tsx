import { auth, signOut } from '@/src/auth';

export default async function DashboardPage() {
  const session = await auth();

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p className="mt-2">Signed in as {session?.user?.email}</p>
      <form
        action={async () => {
          'use server';
          await signOut({ redirectTo: '/login' });
        }}
      >
        <button className="mt-4 rounded border px-3 py-1">Log out</button>
      </form>
    </main>
  );
}
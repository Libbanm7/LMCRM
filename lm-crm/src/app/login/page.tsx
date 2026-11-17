'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import { loginAction } from './actions';

export default function LoginPage() {
  const [error, formAction, pending] = useActionState(loginAction, undefined);

  return (
    <main className="mx-auto max-w-sm p-6">
      <h1 className="mb-4 text-2xl font-semibold">Log in</h1>
      <form action={formAction} className="space-y-3">
        <input name="email" type="email" required placeholder="Email" className="w-full rounded border p-2" />
        <input name="password" type="password" required placeholder="Password" className="w-full rounded border p-2" />
        {error && (
          <p role="alert" className="text-sm text-red-600">
            {error}
          </p>
        )}
        <button disabled={pending} className="w-full rounded bg-black p-2 text-white">
          {pending ? 'Logging in...' : 'Log in'}
        </button>
      </form>
      <p className="mt-4 text-sm">
        No account?{' '}
        <Link href="/register" className="underline">
          Register
        </Link>
      </p>
    </main>
  );
}
'use client';

import { useState } from 'react';

type Values = {
  businessName: string;
  address: string;
  email: string;
  phone: string;
  vatNumber: string;
  paymentDetails: string;
};

export default function ProfileForm({ initial }: { initial: Values }) {
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setError(null);
    setSaved(false);
    setPending(true);

    const res = await fetch('/api/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(form)),
    });

    setPending(false);

    if (!res.ok) {
      const data = await res.json().catch(() => null);
      setError(data?.error ?? 'Something went wrong');
      return;
    }

    setSaved(true);
  }

  const field = 'w-full rounded border p-2';

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <input name="businessName" required defaultValue={initial.businessName} placeholder="Business name" className={field} />
      <textarea name="address" required rows={3} defaultValue={initial.address} placeholder="Address" className={field} />
      <input name="email" type="email" required defaultValue={initial.email} placeholder="Contact email" className={field} />
      <input name="phone" defaultValue={initial.phone} placeholder="Phone (optional)" className={field} />
      <input name="vatNumber" defaultValue={initial.vatNumber} placeholder="VAT number (optional)" className={field} />
      <textarea name="paymentDetails" rows={4} defaultValue={initial.paymentDetails} placeholder="Payment details shown on invoices, for example account name, sort code and account number" className={field} />

      {error && (
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
      )}
      {saved && <p className="text-sm text-green-700">Profile saved</p>}

      <button disabled={pending} className="rounded bg-black px-4 py-2 text-white">
        {pending ? 'Saving...' : 'Save profile'}
      </button>
    </form>
  );
}
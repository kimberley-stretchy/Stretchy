'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

function CardForm({ hasCard, onSuccess }: { hasCard: boolean; onSuccess: () => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);
    setError(null);

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setError(submitError.message ?? 'Card error');
      setLoading(false);
      return;
    }

    const { setupIntent, error: confirmError } = await stripe.confirmSetup({
      elements,
      redirect: 'if_required',
    });

    if (confirmError) {
      setError(confirmError.message ?? 'Setup failed');
      setLoading(false);
      return;
    }

    if (setupIntent?.id) {
      await fetch('/api/billing/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ setupIntentId: setupIntent.id }),
      });
    }

    setLoading(false);
    onSuccess();
  };

  return (
    <form onSubmit={submit}>
      <div style={{ background: '#FFFFFF', borderRadius: 20, padding: 24, border: '1.5px solid rgba(26,26,26,0.08)', marginBottom: 16 }}>
        <PaymentElement />
      </div>
      {error && (
        <div style={{ background: '#FEE', borderRadius: 12, padding: '12px 16px', marginBottom: 16, fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, color: '#C00' }}>
          {error}
        </div>
      )}
      <button
        type="submit"
        disabled={loading || !stripe}
        style={{
          width: '100%',
          padding: '18px 0',
          borderRadius: 9999,
          border: 'none',
          background: loading || !stripe ? 'rgba(26,26,26,0.2)' : '#1A1A1A',
          color: '#F5EDE3',
          fontFamily: "'Space Grotesk', system-ui, sans-serif",
          fontWeight: 700,
          fontSize: 16,
          cursor: loading || !stripe ? 'not-allowed' : 'pointer',
        }}
      >
        {loading ? 'Saving card…' : hasCard ? 'Update card' : 'Save card →'}
      </button>
    </form>
  );
}

export function BillingForm({ hasCard }: { hasCard: boolean }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get('next') ?? '/home';
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [stripePromise, setStripePromise] = useState<ReturnType<typeof loadStripe> | null>(null);

  useEffect(() => {
    fetch('/api/billing/setup-intent', { method: 'POST' })
      .then((r) => r.json())
      .then(({ clientSecret, publishableKey }) => {
        setClientSecret(clientSecret);
        setStripePromise(loadStripe(publishableKey));
      });
  }, []);

  const onSuccess = () => router.push(next);

  if (!clientSecret || !stripePromise) {
    return (
      <div style={{ textAlign: 'center', padding: 40, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#888', letterSpacing: '0.1em' }}>
        LOADING…
      </div>
    );
  }

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: {
          theme: 'stripe',
          variables: {
            colorPrimary: '#A535C7',
            colorBackground: '#ffffff',
            colorText: '#1A1A1A',
            colorDanger: '#df1b41',
            fontFamily: 'Space Grotesk, system-ui, sans-serif',
            borderRadius: '12px',
          },
        },
      }}
    >
      <CardForm hasCard={hasCard} onSuccess={onSuccess} />
    </Elements>
  );
}

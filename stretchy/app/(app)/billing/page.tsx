import { createClient } from '@/lib/supabase-server';
import { BillingForm } from './BillingForm';
import Link from 'next/link';

export default async function BillingPage() {
  const supabase = await createClient();
  const { data: attendee } = await (await supabase)
    .from('attendees')
    .select('stripe_pm_id')
    .single()
    .then(async (r) => {
      const { data: { user } } = await supabase.auth.getUser();
      return supabase.from('attendees').select('stripe_pm_id').eq('auth_user_id', user!.id).single();
    });

  const hasCard = !!attendee?.stripe_pm_id;

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', padding: '56px 16px' }}>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', color: '#A535C7', marginBottom: 8 }}>
        PAYMENT
      </div>
      <h1 style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontWeight: 700, fontSize: 28, letterSpacing: '-0.025em', margin: '0 0 8px', color: '#1A1A1A' }}>
        {hasCard ? 'Your card' : 'Add your card'}
      </h1>
      <p style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: 15, color: '#666', margin: '0 0 32px', lineHeight: 1.5 }}>
        {hasCard
          ? 'Your card is saved. You can update it below.'
          : "Required to hold a spot. You're only charged if a session confirms within the 36hr timeframe."}
      </p>

      {hasCard && (
        <div style={{ background: '#7A8330', color: '#F5EDE3', borderRadius: 20, padding: '16px 20px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 22 }}>✓</span>
          <div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', marginBottom: 2 }}>CARD SAVED</div>
            <div style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: 14, opacity: 0.85 }}>You're set — you can hold sessions.</div>
          </div>
        </div>
      )}

      <BillingForm hasCard={hasCard} />

      {!hasCard && (
        <Link
          href="/home"
          style={{
            display: 'block',
            textAlign: 'center',
            marginTop: 16,
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
            fontSize: 14,
            color: 'rgba(26,26,26,0.45)',
            textDecoration: 'none',
          }}
        >
          Skip for now → browse sessions
        </Link>
      )}
    </div>
  );
}

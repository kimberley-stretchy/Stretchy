import { createClient } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function HostPayoutPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: host } = await supabase
    .from('hosts')
    .select('id, name')
    .eq('auth_user_id', user.id)
    .single();
  if (!host) redirect('/host');

  const { data: sessions } = await supabase
    .from('sessions')
    .select('id, title, starts_at, host_target, host_paid_at, state')
    .eq('host_id', host.id)
    .in('state', ['confirmed', 'completed'])
    .order('starts_at', { ascending: false })
    .limit(30);

  const paid = sessions?.filter((s) => s.host_paid_at) ?? [];
  const pending = sessions?.filter((s) => !s.host_paid_at) ?? [];
  const pendingTotal = pending.reduce((sum, s) => sum + (s.host_target ?? 0), 0);
  const paidTotal = paid.reduce((sum, s) => sum + (s.host_target ?? 0), 0);

  return (
    <div style={{ background: '#F5EDE3', minHeight: '100dvh', fontFamily: "'Space Grotesk', system-ui, sans-serif", paddingBottom: 100 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '54px 22px 0' }}>
        <Link href="/host" style={{ width: 40, height: 40, borderRadius: 999, background: 'rgba(26,26,26,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1A1A1A', textDecoration: 'none', fontSize: 16 }}>←</Link>
        <div style={{ padding: '7px 14px', borderRadius: 999, background: '#1A1A1A', fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', color: '#F5EDE3' }}>PAYOUT</div>
        <div style={{ width: 40 }} />
      </div>

      <div style={{ padding: '28px 24px 0' }}>
        <h1 style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontWeight: 700, fontSize: 52, lineHeight: 0.92, letterSpacing: '-0.02em', margin: 0, whiteSpace: 'pre-line' }}>
          {"What you've\nearned."}
        </h1>
      </div>

      <div style={{ padding: '24px 14px 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {/* Pending */}
        <div style={{ background: '#FFD166', borderRadius: 28, padding: 24, color: '#1A1A1A' }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', marginBottom: 8 }}>PENDING PAYOUT</div>
          <div style={{ fontFamily: "'Bagel Fat One', system-ui, cursive", fontSize: 64, lineHeight: 1, marginBottom: 8 }}>${pendingTotal}</div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'rgba(26,26,26,0.6)', letterSpacing: '0.06em' }}>Stretchy pays out within 3 business days of each session.</div>
        </div>

        {/* Paid out */}
        <div style={{ background: '#4CAF82', borderRadius: 28, padding: 24, color: '#F5EDE3' }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', marginBottom: 8 }}>TOTAL PAID OUT</div>
          <div style={{ fontFamily: "'Bagel Fat One', system-ui, cursive", fontSize: 64, lineHeight: 1 }}>${paidTotal}</div>
        </div>

        {/* Session list */}
        {sessions && sessions.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', color: 'rgba(26,26,26,0.5)', padding: '8px 4px 0' }}>SESSION BREAKDOWN</div>
            {sessions.map((s) => {
              const date = new Date(s.starts_at).toLocaleDateString('en-NZ', { weekday: 'short', day: 'numeric', month: 'short' });
              return (
                <div key={s.id} style={{ background: '#FFFFFF', borderRadius: 20, padding: '16px 18px', border: '1.5px solid rgba(26,26,26,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.title}</div>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'rgba(26,26,26,0.45)', letterSpacing: '0.06em' }}>{date}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                    <div style={{ background: '#FFD166', color: '#1A1A1A', borderRadius: 999, padding: '6px 12px', fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 700 }}>${s.host_target}</div>
                    <div style={{ background: s.host_paid_at ? '#4CAF82' : '#FF6B35', color: '#F5EDE3', borderRadius: 999, padding: '6px 10px', fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700, letterSpacing: '0.06em' }}>
                      {s.host_paid_at ? 'PAID' : 'PENDING'}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {!sessions?.length && (
          <div style={{ background: '#FFFFFF', borderRadius: 20, padding: 32, border: '1.5px solid rgba(26,26,26,0.08)', textAlign: 'center' }}>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'rgba(26,26,26,0.4)', letterSpacing: '0.1em', margin: 0 }}>NO CONFIRMED SESSIONS YET</p>
          </div>
        )}
      </div>

      <div style={{ padding: '20px 24px 0', textAlign: 'center' }}>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'rgba(26,26,26,0.4)', letterSpacing: '0.06em', lineHeight: 1.6 }}>
          Your target is always paid in full. Stretchy's $20+GST fee is covered by attendees, not deducted from your earnings.
        </p>
      </div>
    </div>
  );
}

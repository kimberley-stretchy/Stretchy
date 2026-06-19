import { createClient } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { AppMenuButton } from '@/components/app/AppMenuButton';

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
    .select('id, title, starts_at, host_target, host_paid_at, state, min_attendees, max_attendees')
    .eq('host_id', host.id)
    .in('state', ['confirmed', 'completed'])
    .order('starts_at', { ascending: false })
    .limit(30);

  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const monthLabel = now.toLocaleDateString('en-NZ', { month: 'short', year: '2-digit' }).replace(' ', ' \'');

  const allSessions = sessions ?? [];
  const thisMonth = allSessions.filter((s) => new Date(s.starts_at) >= monthStart);
  const pending = allSessions.filter((s) => !s.host_paid_at);
  const paid = allSessions.filter((s) => s.host_paid_at);

  const thisMonthTotal = thisMonth.reduce((sum, s) => sum + (s.host_target ?? 0), 0);
  const pendingTotal = pending.reduce((sum, s) => sum + (s.host_target ?? 0), 0);
  const paidTotal = paid.reduce((sum, s) => sum + (s.host_target ?? 0), 0);

  return (
    <div style={{ background: '#F5EDE3', minHeight: '100dvh', fontFamily: "'Space Grotesk', system-ui, sans-serif", paddingBottom: 100 }}>
      {/* Top bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '54px 22px 0' }}>
        <Link href="/host" style={{
          width: 40, height: 40, borderRadius: 999, background: 'rgba(26,26,26,0.08)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#1A1A1A', textDecoration: 'none', fontSize: 16,
        }}>←</Link>
        <div style={{
          padding: '7px 14px', borderRadius: 999, background: '#FFFFFF',
          border: '1.5px solid rgba(26,26,26,0.10)',
          fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, letterSpacing: '0.14em',
        }}>
          PAYOUT · {monthLabel.toUpperCase()}
        </div>
        <AppMenuButton />
      </div>

      {/* Heading */}
      <div style={{ padding: '16px 22px 20px' }}>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.20em', color: 'rgba(26,26,26,0.5)', margin: '0 0 10px' }}>
          PAYS MONDAY · WITHIN 3 BUSINESS DAYS
        </p>
        <h1 style={{ fontWeight: 700, fontSize: 52, lineHeight: 0.9, letterSpacing: '-0.03em', margin: 0 }}>
          This month,<br />you earned.
        </h1>
      </div>

      {/* Big yellow total */}
      <div style={{ margin: '0 14px', padding: 28, borderRadius: 32, background: '#FFD166', color: '#1A1A1A' }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, letterSpacing: '0.16em' }}>
          NET TO YOU
        </span>
        <div style={{ display: 'flex', alignItems: 'baseline', marginTop: 8 }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 36, fontWeight: 700 }}>$</span>
          <span style={{ fontFamily: "'Bagel Fat One', system-ui, sans-serif", fontSize: 108, lineHeight: 0.85, letterSpacing: '-0.04em' }}>
            {thisMonthTotal}
          </span>
        </div>
        <div style={{ display: 'flex', gap: 18, marginTop: 16, fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}>
          <span><strong>{thisMonth.length}</strong> sessions</span>
          <span><strong>{pending.length}</strong> pending</span>
        </div>
      </div>

      <div style={{ padding: '24px 14px 0', display: 'flex', flexDirection: 'column', gap: 10 }}>

        {/* Pending */}
        {pendingTotal > 0 && (
          <div style={{ background: '#FF6B35', borderRadius: 24, padding: 20, color: '#F5EDE3' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700, letterSpacing: '0.18em' }}>PENDING</div>
            <div style={{ fontFamily: "'Bagel Fat One', system-ui, sans-serif", fontSize: 48, lineHeight: 0.9, marginTop: 6 }}>
              ${pendingTotal}
            </div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, marginTop: 6, opacity: 0.8 }}>
              {pending.length} session{pending.length !== 1 ? 's' : ''} · pays within 3 business days
            </div>
          </div>
        )}

        {/* All-time paid */}
        {paidTotal > 0 && (
          <div style={{ background: '#4CAF82', borderRadius: 24, padding: 20, color: '#F5EDE3' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700, letterSpacing: '0.18em' }}>TOTAL PAID OUT</div>
            <div style={{ fontFamily: "'Bagel Fat One', system-ui, sans-serif", fontSize: 48, lineHeight: 0.9, marginTop: 6 }}>
              ${paidTotal}
            </div>
          </div>
        )}

        {/* Breakdown */}
        {allSessions.length > 0 && (
          <>
            <div style={{ padding: '8px 4px 0', fontFamily: "'Space Grotesk', system-ui, sans-serif", fontWeight: 700, fontSize: 22, letterSpacing: '-0.01em' }}>
              Breakdown
            </div>
            <div style={{ borderRadius: 28, background: '#FFFFFF', border: '1.5px solid rgba(26,26,26,0.08)', overflow: 'hidden' }}>
              {allSessions.map((s, i) => {
                const date = new Date(s.starts_at).toLocaleDateString('en-NZ', { weekday: 'short', day: 'numeric', month: 'short' });
                return (
                  <div key={s.id} style={{
                    padding: '16px 18px',
                    borderBottom: i < allSessions.length - 1 ? '1px solid rgba(26,26,26,0.08)' : 'none',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10,
                  }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {s.title}
                      </div>
                      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'rgba(26,26,26,0.45)', letterSpacing: '0.06em' }}>
                        {date}
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                      <div style={{
                        background: '#FFD166', color: '#1A1A1A', borderRadius: 999, padding: '5px 10px',
                        fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 700,
                      }}>
                        ${s.host_target}
                      </div>
                      <div style={{
                        background: s.host_paid_at ? '#4CAF82' : '#FF6B35',
                        color: '#F5EDE3', borderRadius: 999, padding: '5px 10px',
                        fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700, letterSpacing: '0.06em',
                      }}>
                        {s.host_paid_at ? 'PAID' : 'PENDING'}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {!allSessions.length && (
          <div style={{ background: '#FFFFFF', borderRadius: 24, padding: 40, border: '1.5px solid rgba(26,26,26,0.08)', textAlign: 'center' }}>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'rgba(26,26,26,0.4)', letterSpacing: '0.1em', margin: 0 }}>
              NO CONFIRMED SESSIONS YET
            </p>
            <p style={{ fontSize: 13, color: 'rgba(26,26,26,0.5)', marginTop: 8, lineHeight: 1.4 }}>
              Payouts show up here after your first confirmed session.
            </p>
          </div>
        )}

        {/* Fee transparency */}
        <div style={{
          padding: 18, borderRadius: 24, background: '#F5EDE3',
          border: '1.5px dashed rgba(26,26,26,0.20)',
        }}>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'rgba(26,26,26,0.45)', letterSpacing: '0.06em', lineHeight: 1.6, margin: 0 }}>
            YOUR TARGET IS ALWAYS PAID IN FULL. THE $20+GST STRETCHY FEE IS COVERED BY ATTENDEES — NOTHING IS DEDUCTED FROM YOUR EARNINGS.
          </p>
        </div>
      </div>
    </div>
  );
}

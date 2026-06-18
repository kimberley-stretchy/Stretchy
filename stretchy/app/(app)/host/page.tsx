import { createClient } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { SMark } from '@/components/ui/SMark';
import { MOVEMENT_TYPES } from '@/lib/brand';

const FEE = 23; // $20 + 15% GST

function calcPrice(target: number, attendees: number) {
  return Math.round((target + FEE) / Math.max(attendees, 1));
}

export default async function HostDashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: host } = await supabase
    .from('hosts')
    .select('*')
    .eq('auth_user_id', user.id)
    .single();

  if (!host) redirect('/host/apply');

  const { data: sessions } = await supabase
    .from('sessions')
    .select('*, holds(count)')
    .eq('host_id', host.id)
    .order('starts_at', { ascending: false })
    .limit(20);

  const firstName = host.name?.split(' ')[0] ?? host.name;
  const liveSessions = sessions?.filter((s) => s.state === 'open' || s.state === 'confirmed') ?? [];
  const confirmedSessions = sessions?.filter((s) => s.state === 'confirmed') ?? [];

  // Compute sample stats (real totals would come from a view/aggregate)
  const totalHolds = sessions?.reduce((sum, s) => sum + (s.holds?.[0]?.count ?? 0), 0) ?? 0;

  return (
    <div style={{ background: '#F5EDE3', minHeight: '100dvh', fontFamily: "'Space Grotesk', system-ui, sans-serif", paddingBottom: 120 }}>
      {/* Top bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '54px 22px 0' }}>
        <SMark size={32} color="#1A1A1A" />
        <div style={{
          padding: '7px 14px', borderRadius: 999,
          background: '#FFFFFF', border: '1.5px solid rgba(26,26,26,0.10)',
          fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, letterSpacing: '0.14em',
        }}>HOST DASHBOARD</div>
        <div style={{
          width: 40, height: 40, borderRadius: 999, background: '#FFD166',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'Space Grotesk', system-ui, sans-serif", fontWeight: 700, color: '#1A1A1A', fontSize: 16,
        }}>{firstName?.[0]?.toUpperCase()}</div>
      </div>

      {/* Welcome card — pink/blue */}
      <div style={{ margin: '14px 14px 0', padding: 20, borderRadius: 28, background: '#B5DDE9', color: '#1A1A1A' }}>
        <h1 style={{
          fontFamily: "'Space Grotesk', system-ui, sans-serif",
          fontWeight: 700, fontSize: 36, lineHeight: 0.95, margin: 0, letterSpacing: '-0.02em',
        }}>
          Kia ora,<br />{firstName}.
        </h1>
        <div style={{ marginTop: 12, fontSize: 13, lineHeight: 1.4, color: 'rgba(26,26,26,0.7)' }}>
          {host.movement_type} · {host.region} · <strong>{sessions?.length ?? 0} sessions</strong>
        </div>
      </div>

      {/* Stats grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 10, padding: '14px 14px 0' }}>
        <div style={{ background: '#FFD166', color: '#1A1A1A', padding: 18, borderRadius: 24 }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700, letterSpacing: '0.14em' }}>SESSIONS</span>
          <div style={{ display: 'flex', alignItems: 'baseline', marginTop: 6 }}>
            <span style={{ fontFamily: "'Bagel Fat One', system-ui, sans-serif", fontWeight: 400, fontSize: 48, lineHeight: 0.85, letterSpacing: '-0.03em' }}>
              {sessions?.length ?? 0}
            </span>
          </div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, marginTop: 4, opacity: 0.7 }}>total hosted</div>
        </div>
        <div style={{ background: '#FFFFFF', padding: 18, borderRadius: 24, border: '1.5px solid rgba(26,26,26,0.08)' }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', color: 'rgba(26,26,26,0.55)' }}>TOTAL HOLDS</span>
          <div style={{ fontFamily: "'Bagel Fat One', system-ui, sans-serif", fontSize: 36, lineHeight: 0.9, marginTop: 6, letterSpacing: '-0.02em' }}>
            {totalHolds}
          </div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'rgba(26,26,26,0.55)', marginTop: 4 }}>spots held</div>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, padding: '10px 14px 0' }}>
        <div style={{ background: '#FFFFFF', padding: 14, borderRadius: 20, border: '1.5px solid rgba(26,26,26,0.08)' }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'rgba(26,26,26,0.55)', letterSpacing: '0.14em' }}>LIVE NOW</span>
          <div style={{ fontFamily: "'Bagel Fat One', system-ui, sans-serif", fontSize: 26, lineHeight: 0.95, marginTop: 4 }}>{liveSessions.length}</div>
        </div>
        <div style={{ background: '#FFFFFF', padding: 14, borderRadius: 20, border: '1.5px solid rgba(26,26,26,0.08)' }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'rgba(26,26,26,0.55)', letterSpacing: '0.14em' }}>CONFIRMED</span>
          <div style={{ fontFamily: "'Bagel Fat One', system-ui, sans-serif", fontSize: 26, lineHeight: 0.95, marginTop: 4 }}>{confirmedSessions.length}</div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding: '16px 14px 0' }}>
        <Link href="/host/sessions/new" style={{ textDecoration: 'none' }}>
          <div style={{
            background: '#1A1A1A', color: '#F5EDE3', borderRadius: 9999,
            padding: '20px 28px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'Space Grotesk', system-ui, sans-serif", fontWeight: 700, fontSize: 17,
          }}>
            + Add a Stretchy session
          </div>
        </Link>
      </div>

      {/* Live sessions */}
      {liveSessions.length > 0 && (
        <>
          <div style={{ padding: '28px 22px 8px' }}>
            <h3 style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: 22, margin: 0, fontWeight: 700 }}>Live sessions</h3>
          </div>

          {liveSessions.map((session) => {
            const holdCount = session.holds?.[0]?.count ?? 0;
            const movement = MOVEMENT_TYPES.find((m) => m.id === session.movement_type);
            const date = new Date(session.starts_at);
            const dayStr = date.toLocaleDateString('en-NZ', { weekday: 'short' }).toUpperCase();
            const timeStr = date.toLocaleTimeString('en-NZ', { hour: 'numeric', minute: '2-digit', hour12: true }).toUpperCase();
            const isConfirmed = session.state === 'confirmed';
            const startPrice = calcPrice(session.host_target, session.min_attendees);
            const currentPrice = calcPrice(session.host_target, Math.max(holdCount, 1));

            return (
              <div key={session.id} style={{ margin: '0 14px 14px', padding: 20, borderRadius: 28, background: '#FFFFFF', border: '1.5px solid rgba(26,26,26,0.08)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: isConfirmed ? '#2E7A52' : '#FF6B35', letterSpacing: '0.14em', fontWeight: 700 }}>
                      ● {isConfirmed ? 'CONFIRMED' : 'LIVE'} · {dayStr} {timeStr}
                    </span>
                    <h4 style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: 20, margin: '6px 0 4px', fontWeight: 700 }}>{session.title}</h4>
                    <div style={{ fontSize: 12, color: 'rgba(26,26,26,0.55)' }}>
                      {holdCount} of {session.min_attendees} min held
                      {holdCount > session.min_attendees ? ' · still room' : ` · ${session.min_attendees - holdCount} more needed`}
                    </div>
                  </div>
                  <SMark size={40} color={isConfirmed ? '#4CAF82' : '#FF6B35'} />
                </div>

                {/* HOW YOUR PRICE WORKS formula */}
                <div style={{ marginTop: 18, padding: 16, borderRadius: 18, background: '#F5EDE3' }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'rgba(26,26,26,0.55)', letterSpacing: '0.14em', marginBottom: 10 }}>
                    HOW YOUR PRICE WORKS
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}>
                    <span style={{ background: '#FFD166', color: '#1A1A1A', padding: '6px 10px', borderRadius: 10, fontWeight: 700 }}>
                      TARGET ${session.host_target}
                    </span>
                    <span style={{ fontSize: 16, color: 'rgba(26,26,26,0.4)' }}>+</span>
                    <span style={{ background: '#FFFFFF', color: 'rgba(26,26,26,0.55)', padding: '6px 10px', borderRadius: 10, fontWeight: 700, border: '1.5px solid rgba(26,26,26,0.10)' }}>
                      FEE $20+GST
                    </span>
                    <span style={{ fontSize: 16, color: 'rgba(26,26,26,0.4)' }}>÷</span>
                    <span style={{ background: '#FFFFFF', color: '#1A1A1A', padding: '6px 10px', borderRadius: 10, fontWeight: 700, border: '1.5px solid rgba(26,26,26,0.10)' }}>
                      {session.min_attendees} SPOTS
                    </span>
                    <span style={{ fontSize: 16, color: 'rgba(26,26,26,0.4)' }}>=</span>
                    <span style={{ background: '#FFD166', color: '#1A1A1A', padding: '6px 10px', borderRadius: 10, fontWeight: 700 }}>
                      ${startPrice}/SPOT
                    </span>
                  </div>
                  <p style={{ margin: '12px 0 0', fontSize: 11, color: 'rgba(26,26,26,0.55)', lineHeight: 1.4 }}>
                    The $20+GST Stretchy fee never changes. Only the per-spot price moves with the room.
                  </p>
                </div>

                {/* Target confirmation */}
                {holdCount >= session.min_attendees && (
                  <div style={{
                    marginTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '10px 12px', borderRadius: 14,
                    background: '#E6F5EC', border: '1.5px solid #4CAF82',
                  }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#2E7A52', letterSpacing: '0.10em', fontWeight: 700 }}>
                      YOU'LL HIT YOUR TARGET
                    </span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#1A1A1A' }}>
                      {holdCount} × ${currentPrice}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </>
      )}

      {/* Empty state */}
      {liveSessions.length === 0 && (
        <div style={{ margin: '24px 14px 0', padding: 32, borderRadius: 28, background: '#FFFFFF', border: '1.5px solid rgba(26,26,26,0.08)', textAlign: 'center' }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>🎯</div>
          <p style={{ fontSize: 15, color: '#666', margin: 0, lineHeight: 1.5 }}>
            No live sessions yet.<br />Create your first!
          </p>
        </div>
      )}

      {/* Quick links — Inbox + Payout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, padding: '14px 14px 0' }}>
        <Link href="/host/inbox" style={{ textDecoration: 'none' }}>
          <div style={{ background: '#A535C7', color: '#F5EDE3', padding: '18px 16px', borderRadius: 24 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700, letterSpacing: '0.14em' }}>INBOX</div>
            <div style={{ fontFamily: "'Bagel Fat One', system-ui, sans-serif", fontSize: 26, lineHeight: 0.95, marginTop: 6 }}>✉</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, marginTop: 4, opacity: 0.7 }}>notifications →</div>
          </div>
        </Link>
        <Link href="/host/payout" style={{ textDecoration: 'none' }}>
          <div style={{ background: '#FFD166', color: '#1A1A1A', padding: '18px 16px', borderRadius: 24 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700, letterSpacing: '0.14em' }}>PAYOUT</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 2, marginTop: 6 }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, fontWeight: 700 }}>$</span>
              <span style={{ fontFamily: "'Bagel Fat One', system-ui, sans-serif", fontSize: 30, lineHeight: 0.9 }}>
                {confirmedSessions.reduce((sum, s) => sum + (s.host_target ?? 0), 0)}
              </span>
            </div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, marginTop: 4, opacity: 0.7 }}>pending →</div>
          </div>
        </Link>
      </div>
    </div>
  );
}

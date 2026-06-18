import { createClient } from '@/lib/supabase-server';
import Link from 'next/link';
import { MOVEMENT_TYPES } from '@/lib/brand';

const STRETCHY_FEE = 20;

function calcPrice(target: number, attendees: number) {
  return Math.round((target + STRETCHY_FEE) / Math.max(attendees, 1));
}

export default async function HeldPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: holds } = await supabase
    .from('holds')
    .select(`
      id,
      state,
      created_at,
      session:sessions(
        id, title, movement_type, starts_at, location_name,
        host_target, min_attendees, max_attendees, state,
        holds(count)
      )
    `)
    .eq('user_id', user!.id)
    .in('state', ['active', 'confirmed', 'cancelled'])
    .order('created_at', { ascending: false });

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 16px' }}>
      <div style={{ padding: '56px 0 8px' }}>
        <h1
          style={{
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
            fontWeight: 700,
            fontSize: 28,
            letterSpacing: '-0.02em',
            margin: 0,
            color: '#1A1A1A',
          }}
        >
          My holds
        </h1>
      </div>

      {/* Gate notice */}
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          color: '#7A8330',
          letterSpacing: '0.06em',
          marginBottom: 24,
        }}
      >
        No charge until confirmed within the 36hr timeframe.
      </div>

      {!holds?.length ? (
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: 24,
            padding: 40,
            textAlign: 'center',
            border: '1.5px solid rgba(26,26,26,0.08)',
          }}
        >
          <div style={{ fontSize: 40, marginBottom: 12 }}>🎟️</div>
          <p style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: 16, color: '#666', margin: 0, lineHeight: 1.5 }}>
            No active holds yet.<br />Browse sessions to place a hold.
          </p>
          <Link
            href="/sessions"
            style={{
              display: 'inline-block',
              marginTop: 20,
              padding: '14px 28px',
              background: '#1A1A1A',
              color: '#F5EDE3',
              borderRadius: 9999,
              fontFamily: "'Space Grotesk', system-ui, sans-serif",
              fontWeight: 700,
              fontSize: 15,
              textDecoration: 'none',
            }}
          >
            Browse sessions
          </Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {holds.map((hold) => {
            const s = hold.session as any;
            if (!s) return null;
            const movement = MOVEMENT_TYPES.find((m) => m.id === s.movement_type);
            const holdCount = s.holds?.[0]?.count ?? s.min_attendees;
            const price = calcPrice(s.host_target, Math.max(holdCount, s.min_attendees));
            const date = new Date(s.starts_at);
            const dayLabel = date.toLocaleDateString('en-NZ', { weekday: 'short', day: 'numeric', month: 'short' });
            const timeLabel = date.toLocaleTimeString('en-NZ', { hour: 'numeric', minute: '2-digit', hour12: true });
            const gateTime = new Date(date.getTime() - 36 * 60 * 60 * 1000);
            const gateLabel = gateTime.toLocaleDateString('en-NZ', { weekday: 'short', day: 'numeric', month: 'short' });
            const isConfirmed = s.state === 'confirmed';
            const isCancelled = s.state === 'cancelled';

            return (
              <Link key={hold.id} href={`/sessions/${s.id}`} style={{ textDecoration: 'none' }}>
                <div
                  style={{
                    background: '#FFFFFF',
                    borderRadius: 24,
                    padding: 20,
                    border: `1.5px solid ${isConfirmed ? '#7A8330' : isCancelled ? 'rgba(26,26,26,0.08)' : 'rgba(26,26,26,0.08)'}`,
                    borderLeft: isConfirmed ? '4px solid #7A8330' : undefined,
                  }}
                >
                  {/* Confirmed banner */}
                  {isConfirmed && (
                    <div
                      style={{
                        background: '#7A8330',
                        color: '#F5EDE3',
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: '0.14em',
                        padding: '6px 12px',
                        borderRadius: 12,
                        marginBottom: 14,
                        display: 'inline-block',
                      }}
                    >
                      ✓ CONFIRMED
                    </div>
                  )}

                  {/* Cancelled banner */}
                  {isCancelled && (
                    <div
                      style={{
                        background: 'rgba(26,26,26,0.06)',
                        color: '#999',
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: '0.14em',
                        padding: '6px 12px',
                        borderRadius: 12,
                        marginBottom: 14,
                        display: 'inline-block',
                      }}
                    >
                      CANCELLED
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 14,
                        background: movement?.color ?? '#7A8330',
                        color: '#F5EDE3',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 22,
                        flexShrink: 0,
                        opacity: isCancelled ? 0.4 : 1,
                      }}
                    >
                      {movement?.emoji ?? '🧘'}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontFamily: "'Space Grotesk', system-ui, sans-serif",
                          fontWeight: 700,
                          fontSize: 16,
                          color: isCancelled ? '#999' : '#1A1A1A',
                          marginBottom: 4,
                          letterSpacing: '-0.01em',
                        }}
                      >
                        {s.title}
                      </div>
                      <div
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: 11,
                          color: '#888',
                          letterSpacing: '0.06em',
                          marginBottom: 12,
                        }}
                      >
                        {dayLabel} · {timeLabel} · {s.location_name}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div>
                          <span
                            style={{
                              fontFamily: "'Bagel Fat One', system-ui, sans-serif",
                              fontWeight: 400,
                              fontSize: isConfirmed ? 24 : 20,
                              color: isCancelled ? '#CCC' : '#FFD166',
                            }}
                          >
                            ${price}
                          </span>
                          {isConfirmed && (
                            <span
                              style={{
                                fontFamily: "'JetBrains Mono', monospace",
                                fontSize: 10,
                                color: '#7A8330',
                                letterSpacing: '0.06em',
                                marginLeft: 8,
                              }}
                            >
                              FINAL PRICE
                            </span>
                          )}
                        </div>
                        {!isConfirmed && !isCancelled && (
                          <div
                            style={{
                              fontFamily: "'JetBrains Mono', monospace",
                              fontSize: 10,
                              fontWeight: 700,
                              letterSpacing: '0.12em',
                              padding: '4px 10px',
                              borderRadius: 9999,
                              background: 'rgba(26,26,26,0.06)',
                              color: '#666',
                            }}
                          >
                            GATE {gateLabel}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

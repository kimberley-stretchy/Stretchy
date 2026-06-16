import { createClient } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { MOVEMENT_TYPES } from '@/lib/brand';

const STRETCHY_FEE = 20;

function calcPrice(target: number, attendees: number) {
  return Math.round((target + STRETCHY_FEE) / Math.max(attendees, 1));
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

  return (
    <div style={{ background: '#F5EDE3', minHeight: '100dvh' }}>
      <div style={{ maxWidth: 600, margin: '0 auto', padding: '56px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
          <div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.16em',
                color: '#A535C7',
                marginBottom: 4,
              }}
            >
              HOST DASHBOARD
            </div>
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
              {host.name}
            </h1>
          </div>
          <Link
            href="/host/sessions/new"
            style={{
              background: '#A535C7',
              color: '#F5EDE3',
              borderRadius: 9999,
              padding: '12px 20px',
              textDecoration: 'none',
              fontFamily: "'Space Grotesk', system-ui, sans-serif",
              fontWeight: 700,
              fontSize: 14,
            }}
          >
            + New session
          </Link>
        </div>

        {!sessions?.length ? (
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: 24,
              padding: 40,
              textAlign: 'center',
              border: '1.5px solid rgba(26,26,26,0.08)',
            }}
          >
            <div style={{ fontSize: 40, marginBottom: 12 }}>🎯</div>
            <p style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: 16, color: '#666', margin: '0 0 20px', lineHeight: 1.5 }}>
              No sessions yet. Create your first!
            </p>
            <Link
              href="/host/sessions/new"
              style={{
                display: 'inline-block',
                padding: '14px 28px',
                background: '#A535C7',
                color: '#F5EDE3',
                borderRadius: 9999,
                fontFamily: "'Space Grotesk', system-ui, sans-serif",
                fontWeight: 700,
                fontSize: 15,
                textDecoration: 'none',
              }}
            >
              Create session →
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {sessions.map((session) => {
              const holdCount = session.holds?.[0]?.count ?? 0;
              const price = calcPrice(session.host_target, Math.max(holdCount, session.min_attendees));
              const movement = MOVEMENT_TYPES.find((m) => m.id === session.movement_type);
              const date = new Date(session.starts_at);
              const label = date.toLocaleDateString('en-NZ', { weekday: 'short', day: 'numeric', month: 'short' });
              const time = date.toLocaleTimeString('en-NZ', { hour: 'numeric', minute: '2-digit', hour12: true });

              const stateColors: Record<string, string> = {
                open: '#7A8330',
                confirmed: '#2C8FE0',
                cancelled: '#999',
                completed: '#CCC',
              };

              return (
                <div
                  key={session.id}
                  style={{
                    background: '#FFFFFF',
                    borderRadius: 20,
                    padding: 20,
                    border: '1.5px solid rgba(26,26,26,0.08)',
                  }}
                >
                  <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 12,
                        background: movement?.color ?? '#7A8330',
                        color: '#F5EDE3',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 20,
                        flexShrink: 0,
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
                          color: '#1A1A1A',
                          marginBottom: 4,
                        }}
                      >
                        {session.title}
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
                        {label} · {time} · {session.location_name}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div>
                          <span
                            style={{
                              fontFamily: "'Space Grotesk', system-ui, sans-serif",
                              fontWeight: 700,
                              fontSize: 20,
                              color: '#FFD166',
                            }}
                          >
                            ${price}
                          </span>
                          <span
                            style={{
                              fontFamily: "'JetBrains Mono', monospace",
                              fontSize: 11,
                              color: '#999',
                              marginLeft: 8,
                              letterSpacing: '0.06em',
                            }}
                          >
                            {holdCount}/{session.min_attendees} min
                          </span>
                        </div>
                        <span
                          style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: 10,
                            fontWeight: 700,
                            letterSpacing: '0.12em',
                            padding: '4px 10px',
                            borderRadius: 9999,
                            background: `${stateColors[session.state] ?? '#999'}20`,
                            color: stateColors[session.state] ?? '#999',
                          }}
                        >
                          {session.state.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div style={{ marginTop: 24, textAlign: 'center' }}>
          <Link
            href="/home"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.1em',
              color: '#666',
              textDecoration: 'none',
            }}
          >
            ← BACK TO HOME
          </Link>
        </div>
      </div>
    </div>
  );
}

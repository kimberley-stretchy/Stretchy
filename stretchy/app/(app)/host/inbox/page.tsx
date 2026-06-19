import { createClient } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { AppMenuButton } from '@/components/app/AppMenuButton';

type NotifType = 'going_ahead' | 'cancelled' | 'floor_not_met' | 'rate_it' | 'payout' | string;

const TYPE_CONFIG: Record<string, { color: string; label: string; tab: string }> = {
  going_ahead:   { color: '#4CAF82',  label: 'CONFIRMED',    tab: 'POSITIVE' },
  cancelled:     { color: '#1A1A1A',  label: 'CANCELLED',    tab: 'UPDATES' },
  floor_not_met: { color: '#FF6B35',  label: 'NEEDS ACTION', tab: 'NEEDS ACTION' },
  rate_it:       { color: '#7A8330',  label: 'RATE IT',      tab: 'NEEDS ACTION' },
  payout:        { color: '#FFD166',  label: 'PAYOUT',       tab: 'PAYOUTS' },
};

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString('en-NZ', { day: 'numeric', month: 'short' });
}

export default async function HostInboxPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: host } = await supabase
    .from('hosts')
    .select('id')
    .eq('auth_user_id', user.id)
    .single();
  if (!host) redirect('/host');

  const { data: notifications } = await supabase
    .from('notifications')
    .select('id, type, session_id, title, body, is_read, created_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(50);

  const unreadCount = notifications?.filter((n) => !n.is_read).length ?? 0;

  return (
    <div style={{ background: '#F5EDE3', minHeight: '100dvh', fontFamily: "'Space Grotesk', system-ui, sans-serif", paddingBottom: 80 }}>
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
          HOST INBOX{unreadCount > 0 ? ` · ${unreadCount} NEW` : ''}
        </div>
        <AppMenuButton />
      </div>

      {/* Heading */}
      <div style={{ padding: '16px 22px 18px' }}>
        <h1 style={{ fontWeight: 700, fontSize: 56, lineHeight: 0.9, letterSpacing: '-0.03em', margin: 0 }}>
          The desk.
        </h1>
      </div>

      {/* Filter chips */}
      <div style={{ display: 'flex', gap: 8, padding: '0 22px 16px', overflowX: 'auto' }}>
        {['ALL', 'NEEDS ACTION', 'POSITIVE', 'PAYOUTS', 'UPDATES'].map((f, i) => (
          <span key={f} style={{
            padding: '8px 14px', borderRadius: 999, whiteSpace: 'nowrap',
            background: i === 0 ? '#1A1A1A' : '#FFFFFF',
            color: i === 0 ? '#F5EDE3' : '#1A1A1A',
            border: i === 0 ? 'none' : '1.5px solid rgba(26,26,26,0.14)',
            fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, letterSpacing: '0.10em',
            cursor: 'pointer',
          }}>{f}</span>
        ))}
      </div>

      {/* Notifications */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '0 14px' }}>
        {!notifications?.length ? (
          <div style={{
            background: '#FFFFFF', borderRadius: 28, padding: 40, border: '1.5px solid rgba(26,26,26,0.08)',
            textAlign: 'center',
          }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'rgba(26,26,26,0.4)', letterSpacing: '0.12em' }}>
              ALL QUIET ·✌️
            </div>
            <p style={{ marginTop: 8, color: 'rgba(26,26,26,0.5)', fontSize: 14 }}>
              Notifications show up here when sessions get holds, confirm, or need attention.
            </p>
          </div>
        ) : notifications.map((n) => {
          const config = TYPE_CONFIG[n.type as NotifType] ?? { color: '#2C8FE0', label: n.type.toUpperCase().replace(/_/g, ' '), tab: 'UPDATES' };
          const isAction = config.tab === 'NEEDS ACTION';
          return (
            <div key={n.id} style={{
              background: '#FFFFFF', borderRadius: 20,
              border: isAction ? `1.5px solid ${config.color}` : '1.5px solid rgba(26,26,26,0.08)',
              padding: '16px 18px',
              display: 'flex', alignItems: 'stretch', gap: 14,
            }}>
              <div style={{ width: 4, borderRadius: 4, background: config.color, flexShrink: 0, alignSelf: 'stretch', minHeight: 40 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700,
                  letterSpacing: '0.16em', color: config.color, marginBottom: 4,
                }}>{config.label}</div>
                <div style={{ fontWeight: 700, fontSize: 15, color: '#1A1A1A', marginBottom: 2 }}>
                  {n.title ?? 'Notification'}
                </div>
                {n.body && (
                  <div style={{ fontSize: 13, color: 'rgba(26,26,26,0.6)', lineHeight: 1.4, marginBottom: 6 }}>
                    {n.body}
                  </div>
                )}
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'rgba(26,26,26,0.4)', letterSpacing: '0.04em' }}>
                  {timeAgo(n.created_at)}
                </div>
                {isAction && n.session_id && (
                  <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                    <Link href={`/host/floor-not-met?id=${n.session_id}`} style={{
                      flex: 1, padding: '10px 0', borderRadius: 9999, background: '#1A1A1A',
                      color: '#F5EDE3', fontFamily: "'Space Grotesk', system-ui, sans-serif",
                      fontWeight: 700, fontSize: 13, textDecoration: 'none', textAlign: 'center',
                    }}>Open</Link>
                    <button style={{
                      flex: 1, padding: '10px 0', borderRadius: 9999, background: 'transparent',
                      border: '1.5px solid rgba(26,26,26,0.20)',
                      fontFamily: "'Space Grotesk', system-ui, sans-serif",
                      fontWeight: 700, fontSize: 13, cursor: 'pointer', color: '#1A1A1A',
                    }}>Share</button>
                  </div>
                )}
              </div>
              {!n.is_read && (
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: config.color, flexShrink: 0, alignSelf: 'center' }} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

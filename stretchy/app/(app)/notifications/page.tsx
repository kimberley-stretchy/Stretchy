import { createClient } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { SMark } from '@/components/ui/SMark';

type NotificationType = 'going_ahead' | 'cancelled' | 'rate_it' | 'floor_not_met';

interface Notification {
  id: string;
  type: NotificationType;
  session_id: string | null;
  title: string | null;
  body: string | null;
  is_read: boolean;
  created_at: string;
}

const TYPE_COLOR: Record<NotificationType, string> = {
  going_ahead: '#2C8FE0',
  cancelled: '#1A1A1A',
  rate_it: '#7A8330',
  floor_not_met: '#FF6B35',
};

const TYPE_LABEL: Record<NotificationType, string> = {
  going_ahead: 'GOING AHEAD',
  cancelled: 'CANCELLED',
  rate_it: 'RATE IT',
  floor_not_met: 'FLOOR NOT MET',
};

function notifLink(n: Notification): string {
  if (n.type === 'going_ahead') return '/home';
  if (n.type === 'cancelled') return '/cancelled';
  if (n.type === 'rate_it') return n.session_id ? `/rate?sessionId=${n.session_id}` : '/home';
  return '/home';
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString('en-NZ', { day: 'numeric', month: 'short' });
}

export default async function NotificationsPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: notifications } = await supabase
    .from('notifications')
    .select('id, type, session_id, title, body, is_read, created_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(50);

  return (
    <div style={{
      minHeight: '100dvh',
      background: '#F5EDE3',
      color: '#1A1A1A',
      fontFamily: "'Space Grotesk', system-ui, sans-serif",
      paddingBottom: 80,
    }}>
      {/* Top bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '54px 22px 0',
      }}>
        <Link
          href="/home"
          style={{
            width: 40, height: 40, borderRadius: 999,
            border: 'none', background: 'rgba(26,26,26,0.08)',
            color: '#1A1A1A', fontSize: 16,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            textDecoration: 'none',
          }}
        >
          ←
        </Link>
        <div style={{
          padding: '7px 14px',
          borderRadius: 999,
          background: '#FFFFFF',
          border: '1.5px solid rgba(26,26,26,0.10)',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11, fontWeight: 700, letterSpacing: '0.14em',
        }}>
          NOTIFICATIONS
        </div>
        <div style={{ width: 40 }} />
      </div>

      {/* Hero */}
      <div style={{ padding: '28px 24px 0' }}>
        <h1 style={{
          fontFamily: "'Space Grotesk', system-ui, sans-serif",
          fontWeight: 700,
          fontSize: 56,
          lineHeight: 0.92,
          letterSpacing: '-0.03em',
          margin: 0,
          color: '#1A1A1A',
          whiteSpace: 'pre-line',
        }}>
          {"What's\nhappened."}
        </h1>
      </div>

      {/* Notification list */}
      <div style={{ padding: '28px 14px 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {!notifications?.length ? (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '60px 0',
            gap: 16,
          }}>
            <SMark size={48} color="rgba(26,26,26,0.2)" />
            <p style={{
              fontFamily: "'Space Grotesk', system-ui, sans-serif",
              fontWeight: 700,
              fontSize: 22,
              color: 'rgba(26,26,26,0.35)',
              margin: 0,
            }}>
              All clear.
            </p>
          </div>
        ) : (
          notifications.map((n: Notification) => {
            const color = TYPE_COLOR[n.type] ?? '#1A1A1A';
            const label = TYPE_LABEL[n.type] ?? n.type.toUpperCase();
            const title = n.title ?? 'Session';
            const subtitle = n.body ?? (n.type === 'cancelled' ? 'Released' : '');
            const href = notifLink(n);

            return (
              <Link
                key={n.id}
                href={href}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div style={{
                  background: '#FFFFFF',
                  borderRadius: 20,
                  border: '1.5px solid rgba(26,26,26,0.08)',
                  padding: 18,
                  display: 'flex',
                  alignItems: 'stretch',
                  gap: 14,
                  position: 'relative',
                }}>
                  {/* Left colored border */}
                  <div style={{
                    width: 4,
                    borderRadius: 4,
                    background: color,
                    flexShrink: 0,
                    minHeight: '100%',
                    alignSelf: 'stretch',
                  }} />

                  {/* Content */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 10, fontWeight: 700,
                      letterSpacing: '0.16em',
                      color: color,
                      marginBottom: 4,
                    }}>
                      {label}
                    </div>
                    <div style={{
                      fontFamily: "'Space Grotesk', system-ui, sans-serif",
                      fontWeight: 700,
                      fontSize: 17,
                      letterSpacing: '-0.01em',
                      color: '#1A1A1A',
                      marginBottom: 2,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}>
                      {title}
                    </div>
                    <div style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 11,
                      color: 'rgba(26,26,26,0.5)',
                      letterSpacing: '0.04em',
                    }}>
                      {subtitle} · {timeAgo(n.created_at)}
                    </div>
                  </div>

                  {/* Unread dot */}
                  {!n.is_read && (
                    <div style={{
                      width: 8, height: 8,
                      borderRadius: '50%',
                      background: color,
                      flexShrink: 0,
                      alignSelf: 'center',
                    }} />
                  )}
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}

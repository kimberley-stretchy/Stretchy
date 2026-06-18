import { createClient } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { SMark } from '@/components/ui/SMark';

type NotifType = 'going_ahead' | 'cancelled' | 'floor_not_met' | 'rate_it' | string;

const TYPE_COLOR: Record<string, string> = {
  going_ahead: '#4CAF82',
  cancelled: '#1A1A1A',
  floor_not_met: '#FF6B35',
  rate_it: '#7A8330',
};

const TYPE_LABEL: Record<string, string> = {
  going_ahead: 'GOING AHEAD',
  cancelled: 'CANCELLED',
  floor_not_met: 'FLOOR NOT MET',
  rate_it: 'RATE IT',
};

function timeAgo(dateStr: string) {
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

  return (
    <div style={{ minHeight: '100dvh', background: '#A535C7', color: '#F5EDE3', fontFamily: "'Space Grotesk', system-ui, sans-serif", paddingBottom: 80 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '54px 22px 0' }}>
        <Link href="/host" style={{ width: 40, height: 40, borderRadius: 999, background: 'rgba(245,237,227,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F5EDE3', textDecoration: 'none', fontSize: 16 }}>←</Link>
        <div style={{ padding: '7px 14px', borderRadius: 999, background: 'rgba(245,237,227,0.15)', fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, letterSpacing: '0.14em' }}>HOST INBOX</div>
        <div style={{ width: 40 }} />
      </div>

      <div style={{ padding: '28px 24px 0' }}>
        <h1 style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontWeight: 700, fontSize: 64, lineHeight: 0.92, letterSpacing: '-0.03em', margin: 0, whiteSpace: 'pre-line' }}>
          {'Your\ninbox.'}
        </h1>
      </div>

      <div style={{ padding: '28px 14px 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {!notifications?.length ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 0', gap: 16 }}>
            <SMark size={48} color="rgba(245,237,227,0.25)" />
            <p style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontWeight: 700, fontSize: 22, color: 'rgba(245,237,227,0.5)', margin: 0 }}>All quiet.</p>
          </div>
        ) : notifications.map((n) => {
          const color = TYPE_COLOR[n.type as NotifType] ?? '#2C8FE0';
          const label = TYPE_LABEL[n.type as NotifType] ?? n.type.toUpperCase().replace(/_/g, ' ');
          return (
            <div key={n.id} style={{ background: '#FFFFFF', borderRadius: 20, border: '1.5px solid rgba(26,26,26,0.08)', padding: 18, display: 'flex', alignItems: 'stretch', gap: 14 }}>
              <div style={{ width: 4, borderRadius: 4, background: color, flexShrink: 0, alignSelf: 'stretch', minHeight: 40 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', color, marginBottom: 4 }}>{label}</div>
                <div style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontWeight: 700, fontSize: 16, color: '#1A1A1A', marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{n.title ?? 'Notification'}</div>
                {n.body && <div style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: 13, color: 'rgba(26,26,26,0.6)', lineHeight: 1.4, marginBottom: 4 }}>{n.body}</div>}
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'rgba(26,26,26,0.4)', letterSpacing: '0.04em' }}>{timeAgo(n.created_at)}</div>
              </div>
              {!n.is_read && <div style={{ width: 8, height: 8, borderRadius: '50%', background: color, flexShrink: 0, alignSelf: 'center' }} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

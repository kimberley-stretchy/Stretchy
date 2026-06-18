import { createClient } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { SMark } from '@/components/ui/SMark';

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function initials(name: string | null): string {
  if (!name) return '?';
  return name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
}

export default async function ManageSessionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: host } = await supabase
    .from('hosts')
    .select('id')
    .eq('auth_user_id', user.id)
    .single();

  if (!host) redirect('/host');

  const { data: session } = await supabase
    .from('sessions')
    .select('*')
    .eq('id', id)
    .eq('host_id', host.id)
    .single();

  if (!session) redirect('/host');

  const { data: holds } = await supabase
    .from('holds')
    .select('*, attendee:attendees(name, email)')
    .eq('session_id', id)
    .eq('state', 'active')
    .order('created_at');

  const holdList = holds ?? [];
  const holdCount = holdList.length;
  const spotsLeft = Math.max(0, (session.max_attendees ?? session.min_attendees) - holdCount);
  const isConfirmed = session.state === 'confirmed';

  const dateObj = new Date(session.starts_at);
  const dateStr = dateObj.toLocaleDateString('en-NZ', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
  const timeStr = dateObj.toLocaleTimeString('en-NZ', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <div
      style={{
        background: '#F5EDE3',
        minHeight: '100dvh',
        fontFamily: "'Space Grotesk', system-ui, sans-serif",
        color: '#1A1A1A',
        paddingBottom: 120,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '54px 22px 0',
        }}
      >
        <Link href="/host" style={{ color: '#1A1A1A', textDecoration: 'none', fontSize: 22, lineHeight: 1 }}>
          ←
        </Link>
        <div
          style={{
            flex: 1,
            textAlign: 'center',
            fontWeight: 700,
            fontSize: 16,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            margin: '0 12px',
          }}
        >
          {session.title}
        </div>
        <SMark size={32} color="#1A1A1A" />
      </div>

      <div
        style={{
          margin: '24px 16px 0',
          background: '#FFFFFF',
          borderRadius: 28,
          padding: 22,
          border: '1.5px solid rgba(26,26,26,0.08)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <div
            style={{
              display: 'inline-block',
              background: isConfirmed ? '#4CAF82' : '#FF6B35',
              color: '#FFFFFF',
              borderRadius: 999,
              padding: '4px 12px',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.12em',
            }}
          >
            {isConfirmed ? 'CONFIRMED' : 'OPEN'}
          </div>
        </div>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 13,
            color: 'rgba(26,26,26,0.65)',
            letterSpacing: '0.04em',
            marginBottom: 8,
          }}
        >
          {dateStr} · {timeStr}
        </div>
        <div
          style={{
            fontWeight: 700,
            fontSize: 16,
          }}
        >
          {holdCount} attending · {spotsLeft} spots left
        </div>
      </div>

      <div
        style={{
          margin: '12px 16px 0',
          background: '#2C8FE0',
          borderRadius: 18,
          padding: '12px 18px',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.10em',
            color: '#FFFFFF',
            textTransform: 'uppercase',
          }}
        >
          HOW TO STRETCHY
        </div>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            color: 'rgba(255,255,255,0.75)',
            letterSpacing: '0.04em',
          }}
        >
          Price locks 2h before · charges happen automatically
        </div>
      </div>

      <div style={{ padding: '28px 22px 12px' }}>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.18em',
            color: 'rgba(26,26,26,0.5)',
          }}
        >
          ROSTER
        </div>
      </div>

      <div
        style={{
          margin: '0 16px',
          background: '#FFFFFF',
          borderRadius: 24,
          border: '1.5px solid rgba(26,26,26,0.08)',
          overflow: 'hidden',
        }}
      >
        {holdList.length === 0 ? (
          <div
            style={{
              padding: 32,
              textAlign: 'center',
              color: 'rgba(26,26,26,0.45)',
              fontSize: 14,
              fontFamily: "'JetBrains Mono', monospace",
              letterSpacing: '0.06em',
            }}
          >
            NO HOLDS YET
          </div>
        ) : (
          holdList.map((hold, i) => {
            const attendeeName = (hold.attendee as { name: string | null } | null)?.name ?? null;
            const displayName = attendeeName ?? 'Anonymous';
            const isConfirmedHold = hold.state === 'confirmed';

            return (
              <div
                key={hold.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  padding: '16px 20px',
                  borderBottom: i < holdList.length - 1 ? '1px solid rgba(26,26,26,0.07)' : 'none',
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: '#2C8FE0',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 13,
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {initials(attendeeName)}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 2 }}>{displayName}</div>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 11,
                      color: 'rgba(26,26,26,0.5)',
                      letterSpacing: '0.04em',
                    }}
                  >
                    held {timeAgo(hold.created_at)}
                  </div>
                </div>
                <div
                  style={{
                    background: isConfirmedHold ? '#4CAF82' : '#2C8FE0',
                    color: '#FFFFFF',
                    borderRadius: 999,
                    padding: '4px 10px',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    flexShrink: 0,
                  }}
                >
                  {isConfirmedHold ? 'CONFIRMED' : 'HOLDING'}
                </div>
              </div>
            );
          })
        )}
      </div>

      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          background: '#FFD166',
          padding: '18px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: "'Space Grotesk', system-ui, sans-serif",
          fontWeight: 700,
          fontSize: 16,
          color: '#1A1A1A',
          cursor: 'pointer',
          borderTop: '1.5px solid rgba(26,26,26,0.08)',
        }}
      >
        Share to fill {spotsLeft} more spots →
      </div>
    </div>
  );
}

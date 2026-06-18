import { createClient } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';
import { AppMenuButton } from '@/components/app/AppMenuButton';
import Link from 'next/link';
import { NotificationToggles } from './NotificationToggles';

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: attendee } = await supabase
    .from('attendees')
    .select('name, email, stripe_pm_id, notification_email, notification_push')
    .eq('auth_user_id', user.id)
    .single();

  const { data: holds } = await supabase
    .from('holds')
    .select('*, session:sessions(title, starts_at, host_target, min_attendees)')
    .eq('user_id', user.id)
    .eq('state', 'active')
    .order('created_at', { ascending: false })
    .limit(10);

  const { count: confirmedCount } = await supabase
    .from('holds')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', user.id)
    .eq('state', 'confirmed');

  const { count: totalCount } = await supabase
    .from('holds')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', user.id);

  const displayName = attendee?.name ?? user.email ?? 'You';
  const displayEmail = attendee?.email ?? user.email ?? '';
  const firstLetter = (displayName[0] ?? '?').toUpperCase();
  const hasPm = !!attendee?.stripe_pm_id;

  const cardStyle: React.CSSProperties = {
    background: '#FFFFFF',
    borderRadius: 20,
    padding: '18px 20px',
    border: '1.5px solid rgba(26,26,26,0.08)',
  };

  const rowStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 0',
    borderBottom: '1px solid rgba(26,26,26,0.07)',
  };

  return (
    <div style={{
      minHeight: '100dvh',
      background: '#F5EDE3',
      color: '#1A1A1A',
      fontFamily: "'Space Grotesk', system-ui, sans-serif",
      paddingBottom: 100,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', padding: '54px 22px 0' }}>
        <AppMenuButton size={28} />
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <span style={{
            background: '#1A1A1A', color: '#F5EDE3',
            borderRadius: 9999, padding: '8px 18px',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11, fontWeight: 700, letterSpacing: '0.16em',
          }}>
            PROFILE
          </span>
        </div>
        <div style={{ width: 28 }} />
      </div>

      <div style={{ padding: '32px 24px 0', display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{
          width: 48, height: 48, borderRadius: 9999,
          background: '#2C8FE0', color: '#F5EDE3',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'Space Grotesk', system-ui, sans-serif",
          fontWeight: 700, fontSize: 20, flexShrink: 0,
        }}>
          {firstLetter}
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 18, letterSpacing: '-0.01em' }}>
            {displayName}
          </div>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11, color: 'rgba(26,26,26,0.5)',
            letterSpacing: '0.04em', marginTop: 2,
          }}>
            {displayEmail}
          </div>
        </div>
      </div>

      <div style={{ padding: '24px 14px 0', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
        <div style={{ ...cardStyle, padding: '16px 12px', textAlign: 'center' }}>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 9, fontWeight: 700, letterSpacing: '0.14em',
            color: 'rgba(26,26,26,0.5)', marginBottom: 8,
          }}>
            SESSIONS
          </div>
          <div style={{
            fontFamily: "'Bagel Fat One', system-ui, cursive",
            fontSize: 28, color: '#1A1A1A',
          }}>
            {totalCount ?? 0}
          </div>
        </div>
        <div style={{ ...cardStyle, padding: '16px 12px', textAlign: 'center' }}>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 9, fontWeight: 700, letterSpacing: '0.14em',
            color: 'rgba(26,26,26,0.5)', marginBottom: 8,
          }}>
            CONFIRMED
          </div>
          <div style={{
            fontFamily: "'Bagel Fat One', system-ui, cursive",
            fontSize: 28, color: '#1A1A1A',
          }}>
            {confirmedCount ?? 0}
          </div>
        </div>
        <div style={{ ...cardStyle, padding: '16px 12px', textAlign: 'center' }}>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 9, fontWeight: 700, letterSpacing: '0.14em',
            color: 'rgba(26,26,26,0.5)', marginBottom: 8,
          }}>
            SAVED
          </div>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10, fontWeight: 700,
            color: hasPm ? '#4CAF82' : 'rgba(26,26,26,0.4)',
            marginTop: 6,
          }}>
            {hasPm ? 'Card saved' : 'No card'}
          </div>
        </div>
      </div>

      {holds && holds.length > 0 && (
        <div style={{ padding: '28px 14px 0' }}>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11, fontWeight: 700, letterSpacing: '0.16em',
            color: 'rgba(26,26,26,0.5)', marginBottom: 12,
          }}>
            UPCOMING HOLDS
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {holds.map((hold) => {
              const s = hold.session as any;
              if (!s) return null;
              const date = new Date(s.starts_at);
              const dateLabel = date.toLocaleDateString('en-NZ', { weekday: 'short', day: 'numeric', month: 'short' });
              const timeLabel = date.toLocaleTimeString('en-NZ', { hour: 'numeric', minute: '2-digit', hour12: true });
              const STRETCHY_FEE = 20;
              const price = Math.round((s.host_target + STRETCHY_FEE) / Math.max(s.min_attendees, 1));

              return (
                <div
                  key={hold.id}
                  style={{
                    background: '#FFFFFF',
                    borderRadius: 20,
                    padding: '16px 18px',
                    borderLeft: '4px solid #FFD166',
                    border: '1.5px solid rgba(26,26,26,0.08)',
                    borderLeftColor: '#FFD166',
                    borderLeftWidth: 4,
                  }}
                >
                  <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>
                    {s.title}
                  </div>
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10, color: 'rgba(26,26,26,0.5)',
                    letterSpacing: '0.06em',
                  }}>
                    {dateLabel} · {timeLabel} · up to ${price}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div style={{ padding: '28px 14px 0' }}>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11, fontWeight: 700, letterSpacing: '0.16em',
          color: 'rgba(26,26,26,0.5)', marginBottom: 12,
        }}>
          SETTINGS
        </div>
        <div style={{ ...cardStyle, padding: 0, overflow: 'hidden' }}>
          <Link
            href="/billing"
            style={{
              ...rowStyle,
              margin: '0 20px',
              textDecoration: 'none', color: '#1A1A1A',
              fontWeight: 600, fontSize: 15,
            }}
          >
            <span>Payment method</span>
            <span style={{ opacity: 0.35, fontSize: 16 }}>→</span>
          </Link>

          <NotificationToggles
            notificationEmail={attendee?.notification_email ?? true}
            notificationPush={attendee?.notification_push ?? true}
          />
        </div>
      </div>

      <div style={{ padding: '12px 14px 0' }}>
        <SignOutButton />
      </div>
    </div>
  );
}

function SignOutButton() {
  return (
    <form action="/api/auth/signout" method="post">
      <button
        type="submit"
        style={{
          width: '100%',
          padding: '16px 0',
          borderRadius: 9999,
          border: '1.5px solid rgba(26,26,26,0.18)',
          background: 'transparent',
          fontFamily: "'Space Grotesk', system-ui, sans-serif",
          fontWeight: 600,
          fontSize: 15,
          color: 'rgba(26,26,26,0.55)',
          cursor: 'pointer',
        }}
      >
        Sign out
      </button>
    </form>
  );
}

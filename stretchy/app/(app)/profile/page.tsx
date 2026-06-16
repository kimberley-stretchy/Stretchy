import { createClient } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';
import { SMark } from '@/components/ui/SMark';
import Link from 'next/link';

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  const { data: host } = await supabase
    .from('hosts')
    .select('id')
    .eq('user_id', user.id)
    .single();

  const { data: holdStats } = await supabase
    .from('holds')
    .select('state', { count: 'exact' })
    .eq('user_id', user.id);

  const totalSessions = holdStats?.length ?? 0;

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 16px' }}>
      <div style={{ padding: '56px 0 32px', textAlign: 'center' }}>
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: 24,
            background: '#7A8330',
            color: '#F5EDE3',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
            fontWeight: 700,
            fontSize: 32,
            margin: '0 auto 16px',
          }}
        >
          {profile?.display_name?.[0] ?? user.email?.[0]?.toUpperCase() ?? '?'}
        </div>
        <h1
          style={{
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
            fontWeight: 700,
            fontSize: 24,
            letterSpacing: '-0.02em',
            margin: '0 0 4px',
            color: '#1A1A1A',
          }}
        >
          {profile?.display_name ?? 'Your name'}
        </h1>
        <p style={{ margin: 0, fontSize: 14, color: '#888', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.04em' }}>
          {user.email}
        </p>
      </div>

      <div
        style={{
          background: '#FFD166',
          borderRadius: 20,
          padding: '20px 24px',
          marginBottom: 16,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.16em',
              color: 'rgba(26,26,26,0.6)',
              marginBottom: 4,
            }}
          >
            SESSIONS HELD
          </div>
          <div
            style={{
              fontFamily: "'Space Grotesk', system-ui, sans-serif",
              fontWeight: 700,
              fontSize: 32,
              letterSpacing: '-0.02em',
              color: '#1A1A1A',
            }}
          >
            {totalSessions}
          </div>
        </div>
        <SMark size={40} color="#1A1A1A" />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
        {host ? (
          <Link
            href="/host"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: '#A535C7',
              color: '#F5EDE3',
              borderRadius: 18,
              padding: '18px 20px',
              textDecoration: 'none',
              fontFamily: "'Space Grotesk', system-ui, sans-serif",
              fontWeight: 700,
              fontSize: 16,
            }}
          >
            <span>Host dashboard 🎯</span>
            <span style={{ opacity: 0.6 }}>→</span>
          </Link>
        ) : (
          <Link
            href="/host/apply"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: '#FFFFFF',
              color: '#1A1A1A',
              borderRadius: 18,
              padding: '18px 20px',
              textDecoration: 'none',
              fontFamily: "'Space Grotesk', system-ui, sans-serif",
              fontWeight: 700,
              fontSize: 16,
              border: '1.5px solid rgba(26,26,26,0.08)',
            }}
          >
            <span>Apply to host 🎯</span>
            <span style={{ opacity: 0.4 }}>→</span>
          </Link>
        )}

        <Link
          href="/notifications"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: '#FFFFFF',
            color: '#1A1A1A',
            borderRadius: 18,
            padding: '18px 20px',
            textDecoration: 'none',
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
            fontWeight: 600,
            fontSize: 15,
            border: '1.5px solid rgba(26,26,26,0.08)',
          }}
        >
          <span>Notifications</span>
          <span style={{ opacity: 0.4 }}>→</span>
        </Link>
      </div>

      <form action="/api/auth/signout" method="post">
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '16px 0',
            borderRadius: 9999,
            border: '1.5px solid rgba(26,26,26,0.2)',
            background: 'transparent',
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
            fontWeight: 600,
            fontSize: 15,
            color: '#666',
            cursor: 'pointer',
          }}
        >
          Sign out
        </button>
      </form>
    </div>
  );
}

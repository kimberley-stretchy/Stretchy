import { createClient } from '@/lib/supabase-server';
import { SMark } from '@/components/ui/SMark';
import { SessionCard } from '@/components/app/SessionCard';
import { MOVEMENT_TYPES } from '@/lib/brand';
import Link from 'next/link';

export default async function HomePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from('attendees')
    .select('name')
    .eq('auth_user_id', user!.id)
    .single();

  const now = new Date().toISOString();
  const { data: sessions } = await supabase
    .from('sessions')
    .select('*, host:hosts(name, avatar_url), holds(count)')
    .eq('state', 'open')
    .gte('starts_at', now)
    .order('starts_at', { ascending: true })
    .limit(10);

  const { count: holdCount } = await supabase
    .from('holds')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', user!.id)
    .eq('state', 'active');

  const firstName = profile?.name?.split(' ')[0] ?? 'there';
  const greeting = getGreeting();
  const activeHolds = holdCount ?? 0;

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 16px' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '56px 0 24px',
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.16em',
              color: '#7A8330',
              marginBottom: 4,
            }}
          >
            {greeting}
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
            {firstName} 👋
          </h1>
        </div>
        <SMark size={36} color="#7A8330" />
      </div>

      {/* My holds quick-access card */}
      {activeHolds > 0 && (
        <Link href="/held" style={{ textDecoration: 'none', display: 'block', marginBottom: 20 }}>
          <div
            style={{
              background: '#FFD166',
              borderRadius: 24,
              padding: '16px 20px',
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
                  letterSpacing: '0.14em',
                  color: '#1A1A1A',
                  opacity: 0.6,
                  marginBottom: 2,
                }}
              >
                MY HOLDS
              </div>
              <div
                style={{
                  fontFamily: "'Space Grotesk', system-ui, sans-serif",
                  fontWeight: 700,
                  fontSize: 16,
                  color: '#1A1A1A',
                }}
              >
                You have {activeHolds} active hold{activeHolds !== 1 ? 's' : ''}
              </div>
            </div>
            <span style={{ fontSize: 20, color: '#1A1A1A' }}>→</span>
          </div>
        </Link>
      )}

      {/* Movement filter chips */}
      <div
        style={{
          display: 'flex',
          gap: 8,
          overflowX: 'auto',
          paddingBottom: 4,
          marginBottom: 16,
          scrollbarWidth: 'none',
        }}
      >
        <Link
          href="/sessions"
          style={{
            textDecoration: 'none',
            flexShrink: 0,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.1em',
            color: '#F5EDE3',
            background: '#1A1A1A',
            padding: '6px 14px',
            borderRadius: 9999,
          }}
        >
          ALL
        </Link>
        {MOVEMENT_TYPES.map((m) => (
          <Link
            key={m.id}
            href={`/sessions?type=${m.id}`}
            style={{
              textDecoration: 'none',
              flexShrink: 0,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.1em',
              color: m.color,
              background: `${m.color}18`,
              padding: '6px 14px',
              borderRadius: 9999,
            }}
          >
            {m.label.toUpperCase()}
          </Link>
        ))}
      </div>

      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.16em',
          color: '#1A1A1A',
          opacity: 0.4,
          marginBottom: 14,
        }}
      >
        UPCOMING SESSIONS
      </div>

      {sessions && sessions.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {sessions.map((session) => (
            <SessionCard key={session.id} session={session} />
          ))}
        </div>
      ) : (
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: 24,
            padding: 40,
            textAlign: 'center',
            border: '1.5px solid rgba(26,26,26,0.08)',
          }}
        >
          <div style={{ fontSize: 40, marginBottom: 12 }}>🌿</div>
          <p
            style={{
              fontFamily: "'Space Grotesk', system-ui, sans-serif",
              fontSize: 16,
              color: '#666',
              margin: 0,
              lineHeight: 1.5,
            }}
          >
            No sessions yet — we're warming up.<br />Auckland goes live Q3 2026.
          </p>
        </div>
      )}

      {/* Browse all sessions link */}
      <div style={{ marginTop: 24, marginBottom: 40, textAlign: 'center' }}>
        <Link
          href="/sessions"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '0.1em',
            color: '#1A1A1A',
            textDecoration: 'none',
            opacity: 0.5,
          }}
        >
          Browse all sessions →
        </Link>
      </div>
    </div>
  );
}

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'GOOD MORNING';
  if (h < 17) return 'GOOD AFTERNOON';
  return 'GOOD EVENING';
}

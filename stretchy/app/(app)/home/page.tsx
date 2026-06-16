import { createClient } from '@/lib/supabase-server';
import { SMark } from '@/components/ui/SMark';
import { SessionCard } from '@/components/app/SessionCard';

export default async function HomePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from('profiles')
    .select('display_name')
    .eq('id', user!.id)
    .single();

  const now = new Date().toISOString();
  const { data: sessions } = await supabase
    .from('sessions')
    .select('*, host:hosts(display_name, avatar_url), holds(count)')
    .eq('state', 'open')
    .gte('starts_at', now)
    .order('starts_at', { ascending: true })
    .limit(10);

  const firstName = profile?.display_name?.split(' ')[0] ?? 'there';
  const greeting = getGreeting();

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
    </div>
  );
}

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'GOOD MORNING';
  if (h < 17) return 'GOOD AFTERNOON';
  return 'GOOD EVENING';
}

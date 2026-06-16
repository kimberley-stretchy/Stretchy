import { createClient } from '@/lib/supabase-server';
import { SessionCard } from '@/components/app/SessionCard';
import { MOVEMENT_TYPES } from '@/lib/brand';

export default async function SessionsPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const { type } = await searchParams;
  const supabase = await createClient();

  const now = new Date().toISOString();
  let query = supabase
    .from('sessions')
    .select('*, host:hosts(name, avatar_url), holds(count)')
    .eq('state', 'open')
    .gte('starts_at', now)
    .order('starts_at', { ascending: true })
    .limit(30);

  if (type) query = query.eq('movement_type', type);

  const { data: sessions } = await query;

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 16px' }}>
      <div style={{ padding: '56px 0 24px' }}>
        <h1
          style={{
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
            fontWeight: 700,
            fontSize: 28,
            letterSpacing: '-0.02em',
            margin: '0 0 20px',
            color: '#1A1A1A',
          }}
        >
          Sessions
        </h1>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <a
            href="/sessions"
            style={{
              padding: '8px 16px',
              borderRadius: 9999,
              background: !type ? '#1A1A1A' : 'rgba(26,26,26,0.08)',
              color: !type ? '#F5EDE3' : '#1A1A1A',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.1em',
              textDecoration: 'none',
            }}
          >
            ALL
          </a>
          {MOVEMENT_TYPES.map((m) => (
            <a
              key={m.id}
              href={`/sessions?type=${m.id}`}
              style={{
                padding: '8px 16px',
                borderRadius: 9999,
                background: type === m.id ? m.color : 'rgba(26,26,26,0.08)',
                color: type === m.id ? '#F5EDE3' : '#1A1A1A',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.1em',
                textDecoration: 'none',
              }}
            >
              {m.emoji} {m.label.toUpperCase()}
            </a>
          ))}
        </div>
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
          <p style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: 16, color: '#666', margin: 0, lineHeight: 1.5 }}>
            No {type ? MOVEMENT_TYPES.find((m) => m.id === type)?.label : ''} sessions open yet.
          </p>
        </div>
      )}
    </div>
  );
}

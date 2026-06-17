import { createClient } from '@/lib/supabase-server';
import { SessionCard } from '@/components/app/SessionCard';
import { SMark } from '@/components/ui/SMark';
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
  const selectedMovement = MOVEMENT_TYPES.find((m) => m.id === type);

  return (
    <div style={{ background: '#F5EDE3', minHeight: '100dvh', fontFamily: "'Space Grotesk', system-ui, sans-serif", paddingBottom: 120 }}>
      {/* Top bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '54px 22px 0' }}>
        <SMark size={32} color="#1A1A1A" />
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', color: 'rgba(26,26,26,0.5)' }}>
          THIS WEEK
        </span>
        <div style={{ width: 32 }} />
      </div>

      {/* Header */}
      <div style={{ padding: '12px 22px 18px' }}>
        <h1 style={{
          fontFamily: "'Space Grotesk', system-ui, sans-serif",
          fontWeight: 700, fontSize: 56, lineHeight: 0.9,
          letterSpacing: '-0.02em', margin: 0, color: '#1A1A1A',
        }}>
          Pick your<br />stretch.
        </h1>
        <p style={{ margin: '14px 0 0', fontSize: 14, color: 'rgba(26,26,26,0.55)' }}>
          {sessions?.length ?? 0} session{sessions?.length !== 1 ? 's' : ''} in your area
          {selectedMovement ? ` · ${selectedMovement.label}` : ''}.
        </p>
      </div>

      {/* Filter chips */}
      <div style={{ display: 'flex', gap: 8, padding: '0 22px 16px', overflowX: 'auto', scrollbarWidth: 'none' }}>
        <a
          href="/sessions"
          style={{
            padding: '8px 14px', borderRadius: 999, whiteSpace: 'nowrap',
            background: !type ? '#1A1A1A' : '#FFFFFF',
            color: !type ? '#F5EDE3' : '#1A1A1A',
            border: !type ? 'none' : '1.5px solid rgba(26,26,26,0.10)',
            fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: 13, fontWeight: 600,
            textDecoration: 'none',
          }}
        >All</a>
        {MOVEMENT_TYPES.map((m) => (
          <a
            key={m.id}
            href={`/sessions?type=${m.id}`}
            style={{
              padding: '8px 14px', borderRadius: 999, whiteSpace: 'nowrap',
              background: type === m.id ? m.color : '#FFFFFF',
              color: type === m.id ? '#F5EDE3' : '#1A1A1A',
              border: type === m.id ? 'none' : '1.5px solid rgba(26,26,26,0.10)',
              fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: 13, fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            {m.emoji} {m.label}
          </a>
        ))}
      </div>

      {/* Session cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '0 14px' }}>
        {sessions && sessions.length > 0 ? (
          sessions.map((session) => (
            <SessionCard key={session.id} session={session} />
          ))
        ) : (
          <div style={{
            background: '#FFFFFF', borderRadius: 28, padding: 40,
            textAlign: 'center', border: '1.5px solid rgba(26,26,26,0.08)', margin: '0 0 14px',
          }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🌿</div>
            <p style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: 16, color: '#666', margin: 0, lineHeight: 1.5 }}>
              No {selectedMovement ? selectedMovement.label.toLowerCase() : ''} sessions open yet.<br />
              Auckland goes live Q3 2026.
            </p>
          </div>
        )}
      </div>

      {/* Map CTA */}
      <div style={{ padding: '14px 14px 0' }}>
        <button style={{
          width: '100%', padding: '16px 24px', borderRadius: 9999,
          border: '1.5px solid rgba(26,26,26,0.2)', background: 'transparent',
          fontFamily: "'Space Grotesk', system-ui, sans-serif", fontWeight: 600, fontSize: 14,
          color: '#1A1A1A', cursor: 'pointer',
        }}>
          ◎ View map of all sessions
        </button>
      </div>
    </div>
  );
}

import { createClient } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { SMark } from '@/components/ui/SMark';
import { FloorNotMetActions } from './FloorNotMetActions';

export default async function FloorNotMetPage({
  searchParams,
}: {
  searchParams: Promise<{ sessionId?: string }>;
}) {
  const { sessionId } = await searchParams;
  if (!sessionId) redirect('/host');

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
    .eq('id', sessionId)
    .single();

  if (!session || session.host_id !== host.id) redirect('/host');

  const { count: holdCount } = await supabase
    .from('holds')
    .select('*', { count: 'exact', head: true })
    .eq('session_id', sessionId)
    .eq('state', 'active');

  const holds = holdCount ?? 0;
  const needed = Math.max(0, session.min_attendees - holds);
  const currentPrice = Math.round((session.host_target + 23) / Math.max(holds, 1));

  return (
    <div
      style={{
        background: '#FF6B35',
        minHeight: '100dvh',
        fontFamily: "'Space Grotesk', system-ui, sans-serif",
        color: '#F5EDE3',
        paddingBottom: 48,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '54px 22px 0' }}>
        <SMark size={32} color="#F5EDE3" />
        <div
          style={{
            padding: '7px 14px',
            borderRadius: 999,
            background: 'rgba(245,237,227,0.10)',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.14em',
            color: '#F5EDE3',
          }}
        >
          FLOOR NOT MET
        </div>
        <div style={{ width: 32 }} />
      </div>

      <div style={{ padding: '48px 22px 0' }}>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.2em',
            color: 'rgba(245,237,227,0.70)',
            marginBottom: 16,
          }}
        >
          SESSION IN 36H
        </div>
        <h1
          style={{
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
            fontWeight: 700,
            fontSize: 80,
            lineHeight: 0.9,
            margin: '0 0 24px',
            letterSpacing: '-0.03em',
            whiteSpace: 'pre-line',
          }}
        >
          {`Floor\nnot met.`}
        </h1>
        <p
          style={{
            fontSize: 17,
            lineHeight: 1.5,
            color: 'rgba(245,237,227,0.85)',
            margin: 0,
          }}
        >
          {needed} more needed. Session cancels in 36 hours unless the floor is hit.
        </p>
      </div>

      <div
        style={{
          margin: '32px 16px 0',
          background: '#FFFFFF',
          borderRadius: 28,
          padding: 24,
          border: '1.5px solid rgba(26,26,26,0.08)',
          color: '#1A1A1A',
        }}
      >
        <div
          style={{
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
            fontWeight: 700,
            fontSize: 20,
            marginBottom: 4,
          }}
        >
          {session.title}
        </div>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            color: 'rgba(26,26,26,0.55)',
            letterSpacing: '0.06em',
            marginBottom: 20,
          }}
        >
          {holds} of {session.min_attendees} minimum held
        </div>
        <div
          style={{
            display: 'inline-block',
            background: '#FFD166',
            color: '#1A1A1A',
            borderRadius: 14,
            padding: '10px 18px',
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 700,
            fontSize: 14,
            letterSpacing: '0.06em',
          }}
        >
          ${currentPrice}/SPOT NOW
        </div>
      </div>

      <div style={{ padding: '20px 16px 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <FloorNotMetActions sessionId={sessionId} />

        <div
          style={{
            background: '#FFFFFF',
            borderRadius: 24,
            padding: '20px 20px 20px',
            border: '1.5px solid rgba(26,26,26,0.08)',
            color: '#1A1A1A',
          }}
        >
          <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 4 }}>Lower the floor</div>
          <p style={{ margin: '0 0 16px', fontSize: 14, color: 'rgba(26,26,26,0.65)', lineHeight: 1.5 }}>
            Reduce your minimum spots to make it happen.
          </p>
          <Link
            href={`/host/sessions/${sessionId}/edit`}
            style={{
              display: 'inline-block',
              background: '#1A1A1A',
              color: '#F5EDE3',
              borderRadius: 999,
              padding: '12px 24px',
              fontFamily: "'Space Grotesk', system-ui, sans-serif",
              fontWeight: 700,
              fontSize: 14,
              textDecoration: 'none',
            }}
          >
            Adjust minimum →
          </Link>
        </div>
      </div>

      <div
        style={{
          margin: '28px 16px 0',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          color: 'rgba(245,237,227,0.55)',
          lineHeight: 1.6,
          letterSpacing: '0.04em',
        }}
      >
        If floor isn't hit by 36h before session time, all holds are automatically released.
      </div>
    </div>
  );
}

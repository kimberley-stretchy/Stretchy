import { createClient } from '@/lib/supabase-server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SMark } from '@/components/ui/SMark';
import { MOVEMENT_TYPES } from '@/lib/brand';

interface Props {
  searchParams: Promise<{ sessionId?: string }>;
}

export default async function SocialStretchPage({ searchParams }: Props) {
  const { sessionId } = await searchParams;
  if (!sessionId) notFound();

  const supabase = await createClient();
  const { data: session } = await supabase
    .from('sessions')
    .select('*, host:hosts(name, avatar_url)')
    .eq('id', sessionId)
    .single();

  if (!session) notFound();

  const movement = MOVEMENT_TYPES.find((m) => m.id === session.movement_type);
  const date = new Date(session.starts_at);
  const dayStr = date.toLocaleDateString('en-NZ', { weekday: 'long', day: 'numeric', month: 'long' });

  return (
    <div style={{ background: '#F5EDE3', minHeight: '100dvh', fontFamily: "'Space Grotesk', system-ui, sans-serif", paddingBottom: 120 }}>
      {/* Top bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '54px 22px 0' }}>
        <Link href="/home" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <SMark size={32} color="#1A1A1A" />
        </Link>
        <div style={{ padding: '7px 14px', borderRadius: 999, background: '#2C8FE0', fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', color: '#F5EDE3' }}>
          SOCIAL STRETCH 🤙
        </div>
        <div style={{ width: 32 }} />
      </div>

      {/* Hero */}
      <div style={{ padding: '20px 22px 8px' }}>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.20em', color: 'rgba(26,26,26,0.55)', margin: 0 }}>
          AFTER {session.title.toUpperCase()}
        </p>
        <h1 style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontWeight: 700, fontSize: 56, lineHeight: 0.92, letterSpacing: '-0.03em', margin: '10px 0 0', color: '#1A1A1A' }}>
          The hang<br />after.
        </h1>
        <p style={{ margin: '14px 0 0', fontSize: 15, color: 'rgba(26,26,26,0.6)', lineHeight: 1.4 }}>
          {dayStr} · post-session
        </p>
      </div>

      {/* Social Stretch venue card */}
      {session.social_stretch_venue ? (
        <div style={{ margin: '20px 14px 0', padding: 22, borderRadius: 28, background: '#2C8FE0', color: '#F5EDE3' }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, letterSpacing: '0.16em' }}>WHERE WE'RE HEADED</span>
          <h2 style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontWeight: 700, fontSize: 28, lineHeight: 1.0, letterSpacing: '-0.02em', margin: '10px 0 8px' }}>
            {session.social_stretch_venue}
          </h2>
          {session.social_stretch_note && (
            <p style={{ margin: 0, fontSize: 14, opacity: 0.85, lineHeight: 1.4 }}>{session.social_stretch_note}</p>
          )}
        </div>
      ) : (
        <div style={{ margin: '20px 14px 0', padding: 22, borderRadius: 28, background: '#FFFFFF', border: '1.5px solid rgba(26,26,26,0.08)', textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🤙</div>
          <p style={{ margin: 0, fontSize: 15, color: '#666' }}>Details from {session.host?.name?.split(' ')[0] ?? 'your host'} on the day.</p>
        </div>
      )}

      {/* Host card */}
      <div style={{ margin: '14px 14px 0', padding: 18, borderRadius: 28, background: '#FFFFFF', border: '1.5px solid rgba(26,26,26,0.08)', display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ width: 52, height: 52, borderRadius: 999, background: '#2C8FE0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Space Grotesk', system-ui, sans-serif", fontWeight: 700, color: '#F5EDE3', fontSize: 20, flexShrink: 0 }}>
          {session.host?.name?.[0] ?? 'H'}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', color: 'rgba(26,26,26,0.55)', marginBottom: 2 }}>YOUR HOST</div>
          <div style={{ fontWeight: 700, fontSize: 16 }}>{session.host?.name}</div>
        </div>
      </div>

      {/* Mates row placeholder */}
      <div style={{ padding: '24px 22px 8px' }}>
        <h3 style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontWeight: 700, fontSize: 20, margin: 0 }}>Who's coming</h3>
      </div>
      <div style={{ margin: '0 14px', padding: 18, borderRadius: 24, background: '#FFFFFF', border: '1.5px solid rgba(26,26,26,0.08)' }}>
        <div style={{ display: 'flex', gap: -8 }}>
          {['A', 'B', 'C', 'D'].map((l, i) => (
            <div key={i} style={{ width: 40, height: 40, borderRadius: 999, background: movement?.color ?? '#7A8330', border: '2px solid #F5EDE3', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F5EDE3', fontWeight: 700, fontSize: 14, marginLeft: i > 0 ? -10 : 0 }}>{l}</div>
          ))}
        </div>
        <p style={{ margin: '10px 0 0', fontSize: 13, color: 'rgba(26,26,26,0.55)' }}>Your mates from the session</p>
      </div>

      {/* Rate It CTA */}
      <div style={{ padding: '20px 14px 0' }}>
        <Link href={`/rate?sessionId=${sessionId}`} style={{ textDecoration: 'none' }}>
          <div style={{ background: '#FFD166', color: '#1A1A1A', borderRadius: 9999, padding: '20px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: "'Space Grotesk', system-ui, sans-serif", fontWeight: 700, fontSize: 17 }}>
            <span>Rate today's session</span>
            <span>★ →</span>
          </div>
        </Link>
      </div>

      <div style={{ padding: '12px 14px 0' }}>
        <Link href="/home" style={{ textDecoration: 'none' }}>
          <div style={{ background: 'transparent', color: '#1A1A1A', borderRadius: 9999, padding: '18px 28px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1.5px solid rgba(26,26,26,0.2)', fontFamily: "'Space Grotesk', system-ui, sans-serif", fontWeight: 600, fontSize: 15 }}>
            Back to home
          </div>
        </Link>
      </div>
    </div>
  );
}

import { createClient } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';
import { SMark } from '@/components/ui/SMark';
import Link from 'next/link';

export default async function CancelledPage({
  searchParams,
}: {
  searchParams: Promise<{ sessionId?: string }>;
}) {
  const { sessionId } = await searchParams;
  if (!sessionId) redirect('/home');

  const supabase = await createClient();

  const { data: session } = await supabase
    .from('sessions')
    .select('id, title, starts_at')
    .eq('id', sessionId)
    .single();

  if (!session) redirect('/home');

  const date = new Date(session.starts_at);
  const dateLabel = date.toLocaleDateString('en-NZ', { weekday: 'long', day: 'numeric', month: 'long' });

  return (
    <div style={{
      minHeight: '100dvh',
      background: '#F5EDE3',
      color: '#1A1A1A',
      fontFamily: "'Space Grotesk', system-ui, sans-serif",
      paddingBottom: 60,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', padding: '54px 22px 0' }}>
        <Link
          href="/home"
          style={{
            width: 40, height: 40, borderRadius: 999,
            border: 'none', background: 'rgba(26,26,26,0.08)',
            color: '#1A1A1A', fontSize: 16,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            textDecoration: 'none',
          }}
        >
          ←
        </Link>
      </div>

      <div style={{ padding: '36px 24px 0', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 20 }}>
        <SMark size={88} color="#A8D5E2" />

        <div>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11, fontWeight: 700, letterSpacing: '0.20em',
            color: 'rgba(26,26,26,0.55)', margin: 0,
          }}>
            SESSION UPDATE
          </p>
          <h1 style={{
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
            fontWeight: 700, fontSize: 72, lineHeight: 0.92,
            letterSpacing: '-0.03em', margin: '10px 0 0',
            whiteSpace: 'pre-line',
          }}>
            {"Didn't\nhappen."}
          </h1>
          <p style={{ margin: '16px 0 0', fontSize: 16, opacity: 0.7, lineHeight: 1.5, maxWidth: 320 }}>
            The minimum wasn&apos;t hit. All holds released — no one&apos;s been charged.
          </p>
        </div>
      </div>

      <div style={{ padding: '28px 14px 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{
          background: '#FFFFFF',
          borderRadius: 24, padding: 20,
          border: '1.5px solid rgba(26,26,26,0.08)',
        }}>
          <div style={{
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
            fontWeight: 700, fontSize: 18,
            letterSpacing: '-0.01em', marginBottom: 6,
          }}>
            {session.title}
          </div>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11, color: 'rgba(26,26,26,0.5)',
            letterSpacing: '0.06em', marginBottom: 14,
          }}>
            {dateLabel}
          </div>
          <div style={{
            fontFamily: "'Bagel Fat One', system-ui, cursive",
            fontSize: 32, color: '#4CAF82',
          }}>
            $0 — no charge
          </div>
        </div>

        <div style={{
          background: '#FF6B35',
          borderRadius: 24, padding: 20,
          color: '#F5EDE3',
        }}>
          <p style={{ margin: 0, fontSize: 14, fontWeight: 600, lineHeight: 1.5 }}>
            Your card was never charged. Nothing to do.
          </p>
        </div>

        <Link
          href="/sessions"
          style={{
            display: 'block', width: '100%',
            padding: '18px 24px', borderRadius: 9999,
            border: 'none', background: '#1A1A1A',
            color: '#F5EDE3',
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
            fontWeight: 700, fontSize: 15,
            textAlign: 'center', textDecoration: 'none',
            boxSizing: 'border-box',
          }}
        >
          Browse other sessions →
        </Link>

        <Link
          href="/sessions"
          style={{
            display: 'block', width: '100%',
            padding: '18px 24px', borderRadius: 9999,
            border: '1.5px solid rgba(26,26,26,0.18)',
            background: 'transparent',
            color: '#1A1A1A',
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
            fontWeight: 700, fontSize: 15,
            textAlign: 'center', textDecoration: 'none',
            boxSizing: 'border-box',
          }}
        >
          Float this to the community →
        </Link>
      </div>
    </div>
  );
}

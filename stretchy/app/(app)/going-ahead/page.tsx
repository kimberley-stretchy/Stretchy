import { createClient } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

const STRETCHY_FEE = 20;

function calcPrice(target: number, attendees: number) {
  return Math.round((target + STRETCHY_FEE) / Math.max(attendees, 1));
}

export default async function GoingAheadPage({
  searchParams,
}: {
  searchParams: Promise<{ holdId?: string }>;
}) {
  const { holdId } = await searchParams;
  if (!holdId) redirect('/home');

  const supabase = await createClient();

  const { data: hold } = await supabase
    .from('holds')
    .select('*, session:sessions(id, title, starts_at, host_target, min_attendees, location_name, social_stretch_venue, holds(count))')
    .eq('id', holdId)
    .single();

  if (!hold || !hold.session) redirect('/home');

  const s = hold.session as any;
  const date = new Date(s.starts_at);
  const dayLabel = date.toLocaleDateString('en-NZ', { weekday: 'long', day: 'numeric', month: 'short' }).toUpperCase();
  const timeLabel = date.toLocaleTimeString('en-NZ', { hour: 'numeric', minute: '2-digit', hour12: true }).toUpperCase();
  const holdCount = s.holds?.[0]?.count ?? s.min_attendees;
  const price = calcPrice(s.host_target, Math.max(holdCount, s.min_attendees));

  return (
    <div style={{
      minHeight: '100dvh',
      background: '#2C8FE0',
      color: '#F5EDE3',
      fontFamily: "'Space Grotesk', system-ui, sans-serif",
      paddingBottom: 60,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '54px 22px 0' }}>
        <div style={{ flex: 1 }} />
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11, fontWeight: 700, letterSpacing: '0.18em',
          color: 'rgba(245,237,227,0.75)',
        }}>
          NOTIFICATION · 36H BEFORE
        </span>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <Link
            href="/home"
            style={{
              width: 40, height: 40, borderRadius: 999,
              background: 'rgba(245,237,227,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#F5EDE3', textDecoration: 'none', fontSize: 18, fontWeight: 400,
            }}
          >
            ×
          </Link>
        </div>
      </div>

      <div style={{ padding: '32px 24px 0' }}>
        <h1 style={{
          fontFamily: "'Space Grotesk', system-ui, sans-serif",
          fontWeight: 700,
          fontSize: 90,
          lineHeight: 0.92,
          letterSpacing: '-0.03em',
          margin: 0,
          color: '#F5EDE3',
          whiteSpace: 'pre-line',
        }}>
          {'Going\nahead.'}
        </h1>
        <p style={{ margin: '18px 0 0', fontSize: 16, opacity: 0.85, lineHeight: 1.4 }}>
          Minimum hit. Your session&apos;s happening.
        </p>
      </div>

      <div style={{ padding: '28px 14px 0' }}>
        <div style={{
          background: '#FFFFFF',
          borderRadius: 32,
          padding: 24,
          boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
          color: '#1A1A1A',
        }}>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11, fontWeight: 700, letterSpacing: '0.14em',
            color: '#4CAF82',
            marginBottom: 12,
          }}>
            ● CONFIRMED · {dayLabel} {timeLabel}
          </div>

          <h2 style={{
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
            fontWeight: 700, fontSize: 30,
            letterSpacing: '-0.02em', margin: '0 0 6px',
            color: '#1A1A1A',
          }}>
            {s.title}
          </h2>

          <p style={{
            margin: '0 0 20px',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12, color: 'rgba(26,26,26,0.5)', letterSpacing: '0.06em',
          }}>
            {s.location_name}
          </p>

          <div style={{
            background: '#FFD166',
            borderRadius: 20,
            padding: '18px 20px',
          }}>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10, fontWeight: 700, letterSpacing: '0.18em',
              color: 'rgba(26,26,26,0.6)', marginBottom: 6,
            }}>
              CURRENT PRICE
            </div>
            <div style={{
              fontFamily: "'Bagel Fat One', system-ui, cursive",
              fontSize: 56,
              color: '#1A1A1A',
              lineHeight: 1,
              marginBottom: 6,
            }}>
              ${price}
            </div>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10, color: 'rgba(26,26,26,0.55)', letterSpacing: '0.08em',
            }}>
              May still drop until 2h before
            </div>
          </div>

          <p style={{ margin: '16px 0 0', fontSize: 13, color: 'rgba(26,26,26,0.65)', lineHeight: 1.5 }}>
            People can still join up to 2 hours before, so your price may keep dropping.
          </p>
        </div>
      </div>

      <div style={{ padding: '16px 14px 0' }}>
        <button style={{
          width: '100%', padding: '18px 24px', borderRadius: 9999,
          border: 'none', background: '#F5EDE3', color: '#1A1A1A',
          fontFamily: "'Space Grotesk', system-ui, sans-serif",
          fontWeight: 700, fontSize: 15, cursor: 'pointer',
        }}>
          ＋ Bring a mate — drop the price again
        </button>
      </div>

      {s.social_stretch_venue && (
        <div style={{ padding: '12px 14px 0' }}>
          <div style={{
            background: '#F5EDE3',
            borderRadius: 24, padding: 20,
            color: '#1A1A1A',
          }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>🤙</div>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5, fontWeight: 600 }}>
              heading to {s.social_stretch_venue} after. Come along.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

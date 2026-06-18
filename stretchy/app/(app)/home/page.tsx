import { createClient } from '@/lib/supabase-server';
import { SMark } from '@/components/ui/SMark';
import Link from 'next/link';

const HOW_TO_STRETCHY = [
  { lead: 'A host lists a session.', body: 'They set a minimum to make it viable, a max capacity and a price target. Price starts at its max.' },
  { lead: 'Hold your spot.', body: 'No charge yet. You see the most you\'d ever pay and how many people are needed to go ahead.' },
  { lead: 'The more who hold, the lower the price.', body: 'Every new hold splits the cost. Price drops live. Tell a mate, tell a random, invite a date.' },
  { lead: '36hr timeframe — go or no go.', body: 'Minimum met? Confirmed, and you\'re locked in. If not, all holds are released. No charge.' },
  { lead: 'Drops till 2 hours out, then doors close.', body: 'More people can still join and push the price down. At 2 hours out your card is charged at the final price.' },
  { lead: 'Show up. Move. Social stretch.', body: '✌️', celebrate: true },
];

export default async function HomePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from('attendees')
    .select('name')
    .eq('auth_user_id', user!.id)
    .single();

  const { count: holdCount } = await supabase
    .from('holds')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', user!.id)
    .eq('state', 'active');

  const activeHolds = holdCount ?? 0;
  const firstName = profile?.name?.split(' ')[0];

  return (
    <div style={{ background: '#7A8330', color: '#F5EDE3', minHeight: '100dvh', fontFamily: "'Space Grotesk', system-ui, sans-serif", paddingBottom: 100, position: 'relative', overflow: 'hidden' }}>
      {/* Top bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '54px 22px 0' }}>
        <SMark size={36} color="#F5EDE3" />
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', color: '#F5EDE3', opacity: 0.7 }}>
          AUCKLAND · THIS WEEK
        </span>
        {firstName && (
          <div style={{
            width: 36, height: 36, borderRadius: 999,
            background: 'rgba(245,237,227,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
            fontWeight: 700, fontSize: 14, color: '#F5EDE3',
          }}>
            {firstName[0].toUpperCase()}
          </div>
        )}
      </div>

      {/* Giant S — hero branded moment */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 24px 0' }}>
        <SMark size={180} color="#F5EDE3" />
      </div>

      {/* Hero copy */}
      <div style={{ padding: '24px 24px 28px', textAlign: 'center' }}>
        <h1 style={{
          fontFamily: "'Space Grotesk', system-ui, sans-serif",
          fontWeight: 700, fontSize: 60, lineHeight: 0.92,
          letterSpacing: '-0.03em', margin: 0, color: '#F5EDE3',
        }}>
          A social<br />movement.
        </h1>
        <p style={{ margin: '18px auto 0', fontSize: 16, lineHeight: 1.4, color: '#F5EDE3', opacity: 0.92, maxWidth: 320 }}>
          The larger the group gets, the better value for all. Join us.
        </p>
      </div>

      {/* CTA stack */}
      <div style={{ padding: '8px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <Link href="/sessions" style={{ textDecoration: 'none' }}>
          <div style={{
            background: '#F5EDE3', color: '#1A1A1A', borderRadius: 9999,
            padding: '22px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            height: 72,
          }}>
            <span style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: 22, letterSpacing: '-0.01em', fontWeight: 700 }}>See this week</span>
            <span style={{ fontSize: 22 }}>→</span>
          </div>
        </Link>

        {activeHolds > 0 ? (
          <Link href="/held" style={{ textDecoration: 'none' }}>
            <div style={{
              background: '#FFD166', color: '#1A1A1A', borderRadius: 9999,
              padding: '20px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              height: 64,
            }}>
              <span style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: 18, fontWeight: 700 }}>
                My holds ({activeHolds})
              </span>
              <span style={{ fontSize: 18 }}>→</span>
            </div>
          </Link>
        ) : (
          <Link href="/host/apply" style={{ textDecoration: 'none' }}>
            <div style={{
              background: '#1A1A1A', color: '#F5EDE3', borderRadius: 9999,
              padding: '20px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              height: 64,
            }}>
              <span style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: 18, fontWeight: 700 }}>Host a Stretchy</span>
              <span style={{ fontSize: 18 }}>→</span>
            </div>
          </Link>
        )}

        <Link href="/sessions" style={{ textDecoration: 'none' }}>
          <div style={{
            background: 'transparent', color: '#F5EDE3', borderRadius: 9999,
            padding: '20px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            border: '1.5px solid rgba(245,237,227,0.35)', height: 64,
          }}>
            <span style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: 18, fontWeight: 700 }}>Suggest a Stretchy</span>
            <span style={{ fontSize: 18 }}>→</span>
          </div>
        </Link>

        <Link href="/suggest" style={{ textDecoration: 'none', display: 'flex', justifyContent: 'center' }}>
          <span style={{
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
            fontSize: 14,
            color: '#F5EDE3',
            opacity: 0.7,
            padding: '8px 16px',
          }}>
            Suggest a session →
          </span>
        </Link>
      </div>

      {/* HOW TO STRETCHY yellow card */}
      <div style={{ padding: '36px 14px 0' }}>
        <div style={{ padding: 24, borderRadius: 32, background: '#FFD166', color: '#1A1A1A' }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, letterSpacing: '0.16em' }}>
            HOW TO STRETCHY
          </span>
          <h3 style={{
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
            fontWeight: 700, fontSize: 30, lineHeight: 0.95,
            letterSpacing: '-0.01em', margin: '10px 0 16px',
          }}>
            The more who join,<br />the less you pay.
          </h3>
          <ol style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {HOW_TO_STRETCHY.map((step, i) => (
              <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{
                  width: 24, height: 24, borderRadius: 999,
                  background: step.celebrate ? '#2C8FE0' : '#1A1A1A',
                  color: step.celebrate ? '#F5EDE3' : '#FFD166',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, flexShrink: 0, marginTop: 1,
                }}>{i + 1}</span>
                <span style={{ fontSize: 13, lineHeight: 1.45 }}>
                  <strong>{step.lead}</strong>
                  {step.body && step.body !== '✌️' ? ' ' + step.body : ''}
                  {step.body === '✌️' && <span style={{ marginLeft: 6, fontSize: 16 }}>✌️</span>}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

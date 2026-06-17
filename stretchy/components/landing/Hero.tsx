import { SMark } from '@/components/ui/SMark';

function HeroPhone() {
  const filled = 5;
  const total = 8;

  return (
    <div style={{
      width: 270,
      borderRadius: 48,
      background: '#111',
      padding: 4,
      boxShadow: '0 40px 90px rgba(0,0,0,0.55)',
      flexShrink: 0,
    }}>
      <div style={{
        borderRadius: 44,
        background: '#F2EDE6',
        overflow: 'hidden',
        position: 'relative',
      }}>
        {/* Status bar */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '12px 20px 6px',
        }}>
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, fontWeight: 700, color: '#1A1A1A' }}>9:41</span>
          <div style={{ width: 56, height: 18, borderRadius: 9, background: '#111' }} />
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, fontWeight: 700, color: '#1A1A1A' }}>▲▲▲</span>
        </div>

        {/* Nav bar */}
        <div style={{ display: 'flex', alignItems: 'center', padding: '4px 14px 8px', gap: 8 }}>
          <SMark size={18} color="#1A1A1A" />
          <div style={{ width: 26, height: 26, borderRadius: 13, background: 'rgba(26,26,26,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10 }}>←</div>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <div style={{ background: '#E8F5EE', color: '#2E7A52', padding: '3px 8px', borderRadius: 999, fontFamily: "'JetBrains Mono',monospace", fontSize: 7.5, fontWeight: 700, letterSpacing: '0.08em' }}>✓ VETTED HOST</div>
          </div>
          <div style={{ width: 26, height: 26, borderRadius: 13, background: 'rgba(26,26,26,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11 }}>♡</div>
        </div>

        {/* Pills */}
        <div style={{ display: 'flex', gap: 6, padding: '0 14px 10px', flexWrap: 'wrap' }}>
          {[
            { label: 'SUN AM · 9:00', bg: '#E2EBF5', color: '#2A3FE0' },
            { label: '60 MIN', bg: '#EEEEF0', color: '#555' },
            { label: 'YOGA', bg: '#F2E6FF', color: '#A535C7' },
          ].map(({ label, bg, color }) => (
            <span key={label} style={{ background: bg, color, borderRadius: 999, padding: '3px 8px', fontFamily: "'JetBrains Mono',monospace", fontSize: 7.5, fontWeight: 700, letterSpacing: '0.06em' }}>{label}</span>
          ))}
        </div>

        {/* Title */}
        <div style={{ padding: '0 14px 2px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 22, lineHeight: 1.1, letterSpacing: '-0.02em', margin: 0, color: '#1A1A1A' }}>
            Sunday Slow<br />Flow
          </h2>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: '#A535C7', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 16, flexShrink: 0, marginTop: 2 }}>Y</div>
        </div>
        <div style={{ padding: '3px 14px 10px', fontFamily: "'JetBrains Mono',monospace", fontSize: 8, color: '#888', letterSpacing: '0.04em' }}>with Tāne Ratima · Grey Lynn</div>

        {/* Card */}
        <div style={{ margin: '0 10px 10px', background: '#fff', borderRadius: 20, padding: '12px 14px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
          {/* Attendee dots */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
            <div style={{ display: 'flex', gap: 3 }}>
              {Array.from({ length: total }).map((_, i) => (
                <div key={i} style={{
                  width: 18, height: 18, borderRadius: 9,
                  background: i < filled ? '#2C8FE0' : '#DDD',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 9,
                }}>
                  <span style={{ color: i < filled ? '#fff' : '#aaa' }}>♟</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <div style={{ width: 6, height: 6, borderRadius: 3, background: '#FF4D00' }} />
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 7.5, fontWeight: 700, color: '#FF4D00', letterSpacing: '0.08em' }}>LIVE</span>
            </div>
          </div>

          {/* Needs more */}
          <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 10, color: '#1A1A1A', marginBottom: 8, letterSpacing: '-0.01em' }}>
            3 MORE ATTENDEES TO CONFIRM SESSION
          </div>

          {/* Price tile */}
          <div style={{ background: '#FFD166', borderRadius: 14, padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, fontSize: 14, color: '#1A1A1A' }}>$</span>
              <span style={{ fontFamily: "'Bagel Fat One','Arial Black',sans-serif", fontSize: 44, lineHeight: 0.9, color: '#1A1A1A', letterSpacing: '-0.03em' }}>28</span>
            </div>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 7.5, fontWeight: 700, letterSpacing: '0.10em', textAlign: 'right', lineHeight: 1.4, color: '#1A1A1A' }}>STARTING<br />PRICE</span>
          </div>

          {/* Description */}
          <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 9, lineHeight: 1.5, color: '#444', margin: '0 0 8px' }}>
            The most you'll pay is <strong>$28</strong>. The more who join, the less <em>everyone</em> pays.
          </p>

          {/* Chart label */}
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 7, fontWeight: 700, letterSpacing: '0.10em', color: '#888', marginBottom: 4 }}>
            LIVE PRICE – DROPS AS THE ROOM FILLS
          </div>

          {/* SVG curve chart */}
          <div style={{ position: 'relative', marginBottom: 4 }}>
            <svg viewBox="0 0 220 50" width="100%" height="40" style={{ display: 'block', overflow: 'visible' }}>
              {/* Dashed future path */}
              <path d="M 60 22 Q 120 22 180 40" stroke="#CCC" strokeWidth="1.5" fill="none" strokeDasharray="3 3" />
              {/* Solid past path */}
              <path d="M 0 8 L 60 22" stroke="#1A1A1A" strokeWidth="2" fill="none" />
              {/* Dot */}
              <circle cx="60" cy="22" r="5" fill="#FF6B35" />
              {/* NOW label */}
              <text x="62" y="16" fontFamily="'JetBrains Mono',monospace" fontSize="7" fontWeight="700" fill="#1A1A1A">NOW · $28</text>
              {/* $28 MAX label */}
              <text x="0" y="7" fontFamily="'JetBrains Mono',monospace" fontSize="7" fill="#888">$28 MAX</text>
              {/* X axis labels */}
              <text x="38" y="50" fontFamily="'JetBrains Mono',monospace" fontSize="6.5" fill="#888" textAnchor="middle">8</text>
              <text x="38" y="57" fontFamily="'JetBrains Mono',monospace" fontSize="6" fill="#888" textAnchor="middle">MIN</text>
              <text x="120" y="50" fontFamily="'JetBrains Mono',monospace" fontSize="6.5" fill="#888" textAnchor="middle">12</text>
              <text x="180" y="50" fontFamily="'JetBrains Mono',monospace" fontSize="6.5" fill="#888" textAnchor="middle">$14 FLOOR</text>
              <text x="180" y="57" fontFamily="'JetBrains Mono',monospace" fontSize="6" fill="#888" textAnchor="middle">FULL</text>
            </svg>
          </div>

          {/* Price table */}
          <div style={{ display: 'flex', borderTop: '1px solid #F0F0F0', paddingTop: 8, gap: 0 }}>
            {[
              { label: 'IF 8 JOIN', price: '$28', highlight: false },
              { label: 'IF 12 JOIN', price: '$18', highlight: false },
              { label: 'IF 16 JOIN', price: '$14', highlight: true },
            ].map(({ label, price, highlight }) => (
              <div key={label} style={{ flex: 1, textAlign: 'center' }}>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 6.5, fontWeight: 700, color: '#888', letterSpacing: '0.06em', marginBottom: 3 }}>{label}</div>
                <div style={{
                  fontFamily: "'Space Grotesk',sans-serif",
                  fontWeight: 700,
                  fontSize: 13,
                  color: highlight ? '#fff' : '#1A1A1A',
                  background: highlight ? '#FFD166' : 'transparent',
                  borderRadius: highlight ? 999 : 0,
                  padding: highlight ? '1px 8px' : '0',
                  display: 'inline-block',
                }}>
                  {price}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <div style={{ background: '#7A8330', color: '#F5EDE3', position: 'relative', overflow: 'hidden' }}>
      {/* Ghost S */}
      <div style={{ position: 'absolute', right: -120, top: -40, opacity: 0.07, pointerEvents: 'none' }}>
        <SMark size={560} color="#F5EDE3" />
      </div>

      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '64px 24px 56px', position: 'relative' }}>
        <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 48, alignItems: 'center' }}>
          {/* Left */}
          <div>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12, fontWeight: 700, letterSpacing: '0.20em',
              color: '#F5EDE3', opacity: 0.8, marginBottom: 22,
            }}>
              AUCKLAND, AOTEAROA · EST. 2026
            </div>
            <h1 style={{
              fontFamily: "'Space Grotesk', system-ui, sans-serif",
              fontWeight: 700, fontSize: 'clamp(48px, 7vw, 92px)',
              lineHeight: 0.92, letterSpacing: '-0.03em', margin: 0,
            }}>
              A social<br />movement.
            </h1>
            <p style={{ margin: '26px 0 0', fontSize: 19, lineHeight: 1.5, maxWidth: 480, opacity: 0.95 }}>
              Community movement classes where{' '}
              <strong>the price drops as more people join.</strong>{' '}
              The more who move together, the better value for everyone. Plus the beloved
              &ldquo;Social Stretch&rdquo; after.
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
              <a href="#waitlist">
                <button style={btnSecondary}>Join the waitlist →</button>
              </a>
              <a href="/home">
                <button style={btnGhost}>Explore the app</button>
              </a>
            </div>
            <p style={{ margin: '26px 0 0', fontSize: 14, opacity: 0.7, maxWidth: 420, lineHeight: 1.5 }}>
              Yoga, pilates, HIIT, breathwork, run clubs — with a pricing model that rewards community.
            </p>
          </div>

          {/* Right — phone mockup */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <HeroPhone />
          </div>
        </div>
      </div>
    </div>
  );
}

const btnSecondary: React.CSSProperties = {
  background: '#F5EDE3', color: '#1A1A1A', border: 'none',
  borderRadius: 9999, padding: '20px 28px', fontSize: 17,
  fontFamily: "'Space Grotesk', system-ui, sans-serif",
  fontWeight: 600, cursor: 'pointer',
  display: 'inline-flex', alignItems: 'center', gap: 8,
};

const btnGhost: React.CSSProperties = {
  background: 'transparent', color: '#F5EDE3',
  border: '1.5px solid rgba(245,237,227,0.35)',
  borderRadius: 9999, padding: '20px 28px', fontSize: 17,
  fontFamily: "'Space Grotesk', system-ui, sans-serif",
  fontWeight: 600, cursor: 'pointer',
};

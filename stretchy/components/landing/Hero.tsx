import { SMark } from '@/components/ui/SMark';

export function Hero() {
  return (
    <div style={{ background: '#7A8330', color: '#F5EDE3', position: 'relative', overflow: 'hidden' }}>
      {/* Ghost S */}
      <div style={{ position: 'absolute', right: -120, top: -40, opacity: 0.07, pointerEvents: 'none' }}>
        <SMark size={560} color="#F5EDE3" />
      </div>

      <div
        style={{
          maxWidth: 1180,
          margin: '0 auto',
          padding: '64px 24px 56px',
          position: 'relative',
        }}
      >
        <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'center' }}>
          {/* Left */}
          <div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: '0.20em',
                color: '#F5EDE3',
                opacity: 0.8,
                marginBottom: 22,
              }}
            >
              AUCKLAND, AOTEAROA · EST. 2026
            </div>
            <h1
              style={{
                fontFamily: "'Space Grotesk', system-ui, sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(48px, 7vw, 92px)',
                lineHeight: 0.92,
                letterSpacing: '-0.03em',
                margin: 0,
              }}
            >
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
              <a href="#explore">
                <button style={btnGhost}>Explore the app</button>
              </a>
            </div>
            <p style={{ margin: '26px 0 0', fontSize: 14, opacity: 0.7, maxWidth: 420, lineHeight: 1.5 }}>
              Yoga, pilates, HIIT, breathwork, run clubs — with a pricing model that rewards community.
            </p>
          </div>

          {/* Right — price-drop phone mockup */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div
              style={{
                width: 260,
                background: '#F5EDE3',
                borderRadius: 36,
                padding: 24,
                boxShadow: '0 30px 80px rgba(0,0,0,0.45)',
                color: '#1A1A1A',
              }}
            >
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: '0.16em',
                  color: '#FF6B35',
                  marginBottom: 6,
                }}
              >
                ● LIVE · DROPS AS THE ROOM FILLS
              </div>
              <div
                style={{
                  fontFamily: "'Space Grotesk', system-ui, sans-serif",
                  fontWeight: 700,
                  fontSize: 20,
                  marginBottom: 16,
                }}
              >
                Sunday Slow Flow
              </div>
              <div
                style={{
                  background: '#FFD166',
                  borderRadius: 18,
                  padding: '16px 20px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 14,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontWeight: 700,
                      fontSize: 22,
                    }}
                  >
                    $
                  </span>
                  <span
                    style={{
                      fontFamily: "'Bagel Fat One', 'Arial Black', sans-serif",
                      fontSize: 72,
                      lineHeight: 0.85,
                      letterSpacing: '-0.04em',
                    }}
                  >
                    28
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: '0.14em',
                    textAlign: 'right',
                    lineHeight: 1.3,
                  }}
                >
                  STARTING<br />PRICE
                </span>
              </div>
              <div style={{ fontSize: 13, lineHeight: 1.45, color: '#1A1A1A', marginBottom: 14 }}>
                5 of 8 holding. <strong>3 more needed to confirm.</strong>
                <br />The more who join, the less everyone pays.
              </div>
              {/* Mini price ladder */}
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1.5px dashed rgba(26,26,26,0.15)', paddingTop: 12 }}>
                {[['IF 8', '$28'], ['IF 12', '$18'], ['IF 16', '$14']].map(([label, price]) => (
                  <div key={label} style={{ textAlign: 'center' }}>
                    <div
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 9,
                        color: 'rgba(26,26,26,0.5)',
                        letterSpacing: '0.10em',
                        fontWeight: 700,
                      }}
                    >
                      {label}
                    </div>
                    <div
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontWeight: 700,
                        fontSize: 13,
                        marginTop: 3,
                      }}
                    >
                      {price}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const btnSecondary: React.CSSProperties = {
  background: '#F5EDE3',
  color: '#1A1A1A',
  border: 'none',
  borderRadius: 9999,
  padding: '20px 28px',
  fontSize: 17,
  fontFamily: "'Space Grotesk', system-ui, sans-serif",
  fontWeight: 600,
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
};

const btnGhost: React.CSSProperties = {
  background: 'transparent',
  color: '#F5EDE3',
  border: '1.5px solid rgba(245,237,227,0.35)',
  borderRadius: 9999,
  padding: '20px 28px',
  fontSize: 17,
  fontFamily: "'Space Grotesk', system-ui, sans-serif",
  fontWeight: 600,
  cursor: 'pointer',
};

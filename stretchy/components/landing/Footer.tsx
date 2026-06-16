import { SMark } from '@/components/ui/SMark';

export function Footer() {
  return (
    <div style={{ background: '#FFD166', color: '#1A1A1A' }}>
      <div
        style={{
          maxWidth: 1180,
          margin: '0 auto',
          padding: '56px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 32,
          alignItems: 'flex-start',
        }}
      >
        <div style={{ maxWidth: 300 }}>
          <div style={{ marginBottom: 12 }}>
            <SMark size={30} color="#1A1A1A" />
          </div>
          <p style={{ margin: '0 0 14px', fontSize: 14, opacity: 0.7, lineHeight: 1.5 }}>
            A social movement. Built in Aotearoa 🌿
          </p>
          <a href="mailto:kimberley@stretchyyoga.co.nz" style={footLink}>
            kimberley@stretchyyoga.co.nz
          </a>
        </div>

        <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap', fontSize: 14 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '0.16em',
                opacity: 0.5,
                marginBottom: 2,
              }}
            >
              EXPLORE
            </div>
            <a href="#how" style={footLink}>How it works</a>
            <a href="#hosts" style={footLink}>For hosts</a>
            <a href="#waitlist" style={footLink}>Join waitlist</a>
            <a href="/login" style={footLink}>Log in</a>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '0.16em',
                opacity: 0.5,
                marginBottom: 2,
              }}
            >
              FOLLOW THE BUILD
            </div>
            <a href="https://www.caike.club/" target="_blank" rel="noopener noreferrer" style={footLink}>caike.club ↗</a>
            <a href="https://www.instagram.com/caike.club/" target="_blank" rel="noopener noreferrer" style={footLink}>@caike.club ↗</a>
            <a href="https://instagram.com/stretchy.yoga" target="_blank" rel="noopener noreferrer" style={footLink}>@stretchy.yoga ↗</a>
          </div>
        </div>
      </div>

      <div style={{ borderTop: '1px solid rgba(26,26,26,0.15)' }}>
        <div
          style={{
            maxWidth: 1180,
            margin: '0 auto',
            padding: '20px 24px',
            display: 'flex',
            justifyContent: 'space-between',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            letterSpacing: '0.10em',
            color: 'rgba(26,26,26,0.6)',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <span>© 2026 STRETCHY · AOTEAROA NEW ZEALAND</span>
          <span>MOVE TOGETHER · BETTER VALUE FOR ALL</span>
        </div>
      </div>
    </div>
  );
}

const footLink: React.CSSProperties = {
  color: '#1A1A1A',
  opacity: 0.7,
  textDecoration: 'none',
  cursor: 'pointer',
  fontFamily: "'Space Grotesk', system-ui, sans-serif",
};

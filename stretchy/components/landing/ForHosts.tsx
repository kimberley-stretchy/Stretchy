const hostCards = [
  ['🎯', 'Earn your target', "Set your revenue goal and the minimum attendees needed. You know what you're earning before you host."],
  ['🧾', 'Transparent formula', '(Target + $20 + GST fee) ÷ people = per-person price. Shown to you and your attendees.'],
  ['🔐', 'Vetted once, active 6 months', 'One application, one vetting. Run as many sessions as you like. Change your schedule any time.'],
  ['🤙', 'Be part of a movement', 'Expand your community and impact. We list your classes to everyone in the area.'],
  ['🥂', 'Host a Social Stretch', 'The juicy bit after. Banter, community, new and old friends. Hosted by you.'],
  ['❤️', 'Fundraising sessions', 'Your target could be a charity target. We lower our fee for fundraisers. Move for a cause.'],
];

export function ForHosts() {
  return (
    <div id="hosts" style={{ background: '#A535C7', color: '#F5EDE3' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '96px 24px' }}>
        <div style={eyebrow}>
          <span style={{ width: 22, height: 2, background: '#F5EDE3', display: 'inline-block' }} />
          FOR HOSTS
        </div>
        <h2
          style={{
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(34px, 5vw, 56px)',
            lineHeight: 0.98,
            letterSpacing: '-0.025em',
            margin: '0 0 20px',
            maxWidth: 760,
          }}
        >
          Set your target.<br />We handle the rest.
        </h2>
        <p style={{ margin: '0 0 48px', fontSize: 18, lineHeight: 1.55, maxWidth: 560, opacity: 0.9 }}>
          You set your target. Stretchy handles pricing, payments, notifications and payouts. You just run a great session.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
          {hostCards.map(([icon, title, body], i) => (
            <div
              key={i}
              style={{
                background: 'rgba(245,237,227,0.08)',
                borderRadius: 26,
                padding: 28,
                border: '1px solid rgba(245,237,227,0.14)',
              }}
            >
              <div style={{ fontSize: 28, marginBottom: 14 }}>{icon}</div>
              <h3
                style={{
                  fontFamily: "'Space Grotesk', system-ui, sans-serif",
                  fontWeight: 700,
                  fontSize: 19,
                  letterSpacing: '-0.01em',
                  margin: '0 0 8px',
                }}
              >
                {title}
              </h3>
              <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.5, opacity: 0.82 }}>{body}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 36 }}>
          <a href="#waitlist">
            <button
              style={{
                background: '#F5EDE3',
                color: '#1A1A1A',
                border: 'none',
                borderRadius: 9999,
                padding: '20px 28px',
                fontSize: 17,
                fontFamily: "'Space Grotesk', system-ui, sans-serif",
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Apply to be a host →
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}

const eyebrow: React.CSSProperties = {
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: '0.22em',
  textTransform: 'uppercase',
  color: '#F5EDE3',
  marginBottom: 18,
  display: 'inline-flex',
  alignItems: 'center',
  gap: 10,
};

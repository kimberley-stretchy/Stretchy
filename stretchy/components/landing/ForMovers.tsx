const cards = [
  { icon: '💸', title: 'The value exchange works for you', body: 'The more who join, the better value everyone\'s session. The people you meet — or friends you bring — literally become the discount.' },
  { icon: '📍', title: 'Local sessions, real venues', body: 'Parks, studios, rooftops, community halls. Not a big chain. Vetted hosts, local to you.' },
  { icon: '🤝', title: 'The Social Stretch', body: 'Every session ends with an optional hang. Coffee, matcha, wine — whatever the vibe. The best bit.' },
  { icon: '🛡️', title: 'You always know your max', body: 'Hold with no charge upfront. Once the minimum holds, the price only drops. Your card is touched only when it\'s confirmed.' },
];

export function ForMovers() {
  return (
    <div id="movers" style={{ padding: '96px 0' }}>
      <div style={eyebrow}>
        <span style={{ width: 22, height: 2, background: '#7A8330', display: 'inline-block' }} />
        FOR MOVERS
      </div>
      <h2
        style={{
          fontFamily: "'Space Grotesk', system-ui, sans-serif",
          fontWeight: 700,
          fontSize: 'clamp(34px, 5vw, 56px)',
          lineHeight: 0.98,
          letterSpacing: '-0.025em',
          margin: '0 0 48px',
          maxWidth: 760,
        }}
      >
        Move more. Pay less.<br />Meet people.
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
        {cards.map((card, i) => (
          <div
            key={i}
            style={{
              background: '#FFFFFF',
              color: '#1A1A1A',
              borderRadius: 26,
              padding: 28,
              border: '1.5px solid rgba(26,26,26,0.08)',
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                background: '#7A8330',
                color: '#F5EDE3',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 24,
                marginBottom: 18,
              }}
            >
              {card.icon}
            </div>
            <h3
              style={{
                fontFamily: "'Space Grotesk', system-ui, sans-serif",
                fontWeight: 700,
                fontSize: 20,
                letterSpacing: '-0.01em',
                margin: '0 0 10px',
              }}
            >
              {card.title}
            </h3>
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55, color: '#666' }}>{card.body}</p>
          </div>
        ))}
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
  color: '#7A8330',
  marginBottom: 18,
  display: 'inline-flex',
  alignItems: 'center',
  gap: 10,
};

export function Story() {
  return (
    <div style={{ padding: '96px 0' }}>
      <div style={{ maxWidth: 760 }}>
        <div style={eyebrow}>
          <span style={{ width: 22, height: 2, background: '#7A8330', display: 'inline-block' }} />
          THE BACKSTORY
        </div>
        <h2
          style={{
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(32px, 4.5vw, 50px)',
            lineHeight: 1.0,
            letterSpacing: '-0.025em',
            margin: '0 0 28px',
          }}
        >
          Started with yoga.<br />Became something bigger.
        </h2>
        <div style={{ fontSize: 17, lineHeight: 1.65, color: '#444', display: 'flex', flexDirection: 'column', gap: 18 }}>
          <p style={{ margin: 0 }}>
            Stretchy started as a social yoga community in Auckland in 2024 — taking the run-club idea and applying it to yoga, to stretch bodies, minds and social circles. Weekly all-level classes followed by a &ldquo;social stretch&rdquo; — coffees, matchas, wine, beer, banter.
          </p>
          <p style={{ margin: 0 }}>
            Stretchy 1.0 was well loved but labour intensive. Some sessions barely broke even, others earned hundreds. There had to be a better, fairer way to move together — for all.
          </p>
          <p style={{ margin: 0 }}>
            Now Stretchy is evolving into a community movement platform. Yoga is one format. The model works for anything — pilates, HIIT, breathwork, sound baths, run clubs, dance. If people want to do it together, and the economics should reward group effort, Stretchy is the infrastructure.
          </p>
        </div>
        <p
          style={{
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
            fontWeight: 700,
            fontSize: 22,
            letterSpacing: '-0.01em',
            margin: '32px 0 0',
            color: '#7A8330',
          }}
        >
          Stretching bodies, minds and social circles.
        </p>
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

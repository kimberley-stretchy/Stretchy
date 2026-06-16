const STEPS = [
  ['A host lists a session.', 'Yoga, pilates, HIIT, sound bath — whatever. They set a minimum number to make it viable, a max capacity, and a price target.'],
  ['Hold your spot.', "Find a session near you and hold your place. Nothing's charged. You can see the maximum you'd ever pay and the number of people needed to go ahead — it only goes down from there."],
  ['The more who hold, the lower the price.', "Every new hold splits the cost. Price drops in real time. Tell your mates, tell a random, invite a date — you're literally saving each other money."],
  ['36 hours out: is it happening?', "If the minimum is met, the session is confirmed and you're locked in. This is the max you'll pay. If not, all holds are released. No charge, no stress."],
  ['Price can still drop until 2 hours out.', "More people can still join after confirmation, pushing the price down further. At 2 hours out, your card is charged at the final price and we know exactly who's in the room."],
  ['Show up. Move. Social Stretch.', 'Turn up, move with people, then head to the Social Stretch nearby.'],
];

export function HowItWorks() {
  return (
    <div id="how" style={{ background: '#A535C7', color: '#F5EDE3' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '96px 24px' }}>
        <div style={eyebrow}>
          <span style={{ width: 22, height: 2, background: '#F5EDE3', display: 'inline-block' }} />
          HOW IT WORKS
        </div>
        <h2
          style={{
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(34px, 5vw, 56px)',
            lineHeight: 0.98,
            letterSpacing: '-0.025em',
            margin: '0 0 48px',
            maxWidth: 700,
          }}
        >
          Six steps. That's it.
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
          {STEPS.map(([title, body], i) => {
            const isLast = i === STEPS.length - 1;
            return (
              <div
                key={i}
                style={{
                  background: isLast ? '#FFD166' : '#FFFFFF',
                  color: '#1A1A1A',
                  borderRadius: 26,
                  padding: 26,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                }}
              >
                <div
                  style={{
                    fontFamily: "'Bagel Fat One', 'Arial Black', sans-serif",
                    fontSize: 40,
                    lineHeight: 0.85,
                    color: isLast ? '#1A1A1A' : '#A535C7',
                    letterSpacing: '-0.03em',
                  }}
                >
                  0{i + 1}
                </div>
                <h3
                  style={{
                    fontFamily: "'Space Grotesk', system-ui, sans-serif",
                    fontWeight: 700,
                    fontSize: 19,
                    lineHeight: 1.1,
                    letterSpacing: '-0.01em',
                    margin: 0,
                  }}
                >
                  {title}
                </h3>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5, color: isLast ? 'rgba(26,26,26,0.8)' : '#666' }}>{body}</p>
              </div>
            );
          })}
        </div>

        <div
          style={{
            marginTop: 28,
            padding: '22px 26px',
            borderRadius: 22,
            background: 'rgba(245,237,227,0.08)',
            border: '1px solid rgba(245,237,227,0.18)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: 16,
          }}
        >
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.16em',
              color: '#FFD166',
              whiteSpace: 'nowrap',
              paddingTop: 3,
            }}
          >
            ONE THING TO KNOW
          </span>
          <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55, color: 'rgba(245,237,227,0.85)' }}>
            If you're locked in at 36 hours and can't make it, you will be charged. Commit with confidence, pals.
          </p>
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

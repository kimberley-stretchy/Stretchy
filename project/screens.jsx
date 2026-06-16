// Stretchy — six screens of the social pricing flow.
// Cream-first surfaces, S-mark as static brand icon, wordmark reserved for Home.

const T = STRETCHY;

const SAMPLE = {
  detail: {
    name: 'Sunday Slow Flow',
    type: 'yoga',
    host: 'Tāne Ratima',
    hostHandle: '@tane.moves',
    hood: 'Grey Lynn',
    day: 'SUN', when: '9:00 AM', duration: '60 MIN',
    venue: 'The Auckland Yoga Room',
    address: '12 Williamson Ave, Grey Lynn',
    access: 'Side door · plenty of street parking · BYO mat or hire $3',
    start: 28, floor: 14, current: 28,
    held: 5, min: 8,
    socialStretch: 'Little Bird Café next door',
    sessionsHosted: 47, rating: 4.9,
  },
  thisWeek: [
    { day: 'WED', date: '27 MAY', when: '7:00 PM', name: 'Herne Bay Breath', host: 'Alex K.',   hood: 'Herne Bay',    type: 'breath',  held: 6, min: 6,  price: 19, state: 'confirmed' },
    { day: 'THU', date: '28 MAY', when: '6:30 AM', name: 'Ponsonby Pilates', host: 'Jess M.',   hood: 'Ponsonby',     type: 'pilates', held: 3, min: 10, price: 30, state: 'open' },
    { day: 'FRI', date: '29 MAY', when: '8:00 PM', name: 'K Rd Sound Bath',  host: 'Rua O.',    hood: 'Karangahape',  type: 'sound',   held: 5, min: 8,  price: 42, state: 'filling' },
    { day: 'SAT', date: '30 MAY', when: '7:00 AM', name: 'Pt Chev Sunrise',  host: 'Marlee F.', hood: 'Pt Chevalier', type: 'flow',    held: 9, min: 10, price: 23, state: 'almostFull' },
    { day: 'SUN', date: '31 MAY', when: '9:00 AM', name: 'Sunday Slow Flow', host: 'Tāne R.',   hood: 'Grey Lynn',    type: 'yoga',    held: 5, min: 8,  price: 28, state: 'open' },
  ],
};

// The "How to Stretchy" explainer — used on Home and Place Held.
const HOW_TO_STRETCHY = [
  {
    lead: 'A host lists a session.',
    body: 'They set a minimum to make it viable, a max capacity and a price target. Price starts at its max.',
  },
  {
    lead: 'Hold your spot.',
    body: 'No charge yet. You see the most you’d ever pay and how many people are needed to go ahead.',
  },
  {
    lead: 'The more who hold, the lower the price.',
    body: 'Every new hold splits the cost. Price drops live. Tell a mate, tell a random, invite a date.',
  },
  {
    lead: '36 hours out — go or no go.',
    body: 'Minimum met? Confirmed, and you’re locked in. If not, all holds are released. No charge.',
  },
  {
    lead: 'Drops till 2 hours out, then doors close.',
    body: 'More people can still join and push the price down. At 2 hours out your card is charged at the final price.',
  },
  {
    lead: 'Show up. Move. Social stretch.',
    body: '✌️',
    celebrate: true,
  },
];

// Hairline divider used in light surfaces
const HAIRLINE = '1.5px solid rgba(26,26,26,0.10)';
const CARD_BORDER = '1.5px solid rgba(26,26,26,0.08)';

// ════════════════════════════════════════════════════════════════
// 03 — SESSION DETAIL (the hero)
// ════════════════════════════════════════════════════════════════
function ScreenSessionDetail() {
  const s = SAMPLE.detail;
  const fillRatio = s.held / s.min;

  return (
    <div data-screen-label="03 Session Detail" style={{
      background: T.cream, color: T.black, minHeight: '100%',
      fontFamily: T.body, paddingBottom: 120,
    }}>
      {/* top bar — S top-left + back, vetted center, fav right */}
      <TopBar
        backable
        center={
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px',
            borderRadius: 999, background: '#E6F5EC', color: '#2E7A52',
            fontFamily: T.mono, fontSize: 10, fontWeight: 700, letterSpacing: '0.12em',
          }}>✓ VETTED HOST</div>
        }
        right={
          <button style={{
            width: 40, height: 40, borderRadius: 999, border: 'none',
            background: 'rgba(26,26,26,0.06)', color: T.black, fontSize: 16,
          }}>♡</button>
        }
      />

      {/* title block */}
      <div style={{ padding: '8px 22px 18px' }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
          <span style={{ background: T.pink, color: T.black, padding: '5px 11px', borderRadius: 999, fontFamily: T.mono, fontSize: 10, fontWeight: 700, letterSpacing: '0.14em' }}>{s.day} · {s.when}</span>
          <span style={{ background: 'rgba(26,26,26,0.06)', color: T.black, padding: '5px 11px', borderRadius: 999, fontFamily: T.mono, fontSize: 10, fontWeight: 700, letterSpacing: '0.14em' }}>{s.duration}</span>
          <span style={{ background: MOVEMENT[s.type].color + '22', color: MOVEMENT[s.type].color, padding: '5px 11px', borderRadius: 999, fontFamily: T.mono, fontSize: 10, fontWeight: 700, letterSpacing: '0.14em' }}>
            {MOVEMENT[s.type].label}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
          <h1 style={{
            fontFamily: T.title, fontWeight: 700, fontSize: 44, lineHeight: 0.95,
            letterSpacing: '-0.02em', margin: 0, flex: 1}}>{s.name}</h1>
          <MovementTile type={s.type} size={52} style={{ marginTop: 4 }} />
        </div>
        <p style={{ margin: '12px 0 0', fontSize: 14, color: T.textDim }}>
          with {s.host} · {s.hood}
        </p>
      </div>

      {/* THE PRICING ENGINE — hero card */}
      <div style={{ margin: '0 14px', padding: 22, borderRadius: 32, background: '#FFFFFF', border: CARD_BORDER }}>
        {/* 1. Progress — lead with what's needed to confirm */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <ProgressPips held={s.held} total={s.min} size={16}
            color={STRETCHY.hotPink} dimColor="rgba(26,26,26,0.14)" />
          <span style={{ fontFamily: T.mono, fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', color: T.orange }}>● LIVE</span>
        </div>
        <p style={{
          margin: '0 0 18px', fontFamily: T.body, fontWeight: 700,
          fontSize: 18, lineHeight: 1.2, color: T.black, letterSpacing: '-0.01em',
        }}>
          {s.min - s.held} MORE ATTENDEES TO CONFIRM SESSION
        </p>

        {/* 2. Price tile + headline copy */}
        <div style={{
          background: T.yellow, borderRadius: 24, padding: '20px 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14,
        }}>
          <div style={{ display: 'flex', alignItems: 'baseline' }}>
            <span style={{ fontFamily: T.mono, fontWeight: 700, fontSize: 32, color: T.black }}>$</span>
            <span style={{ fontFamily: T.display, fontWeight: 400, fontSize: 96, lineHeight: 0.85, color: T.black, letterSpacing: '-0.04em' }}>{s.start}</span>
          </div>
          <span style={{ fontFamily: T.mono, fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', color: T.black, textAlign: 'right', lineHeight: 1.3 }}>
            STARTING<br/>PRICE
          </span>
        </div>
        <p style={{ margin: '0 0 22px', fontSize: 14, lineHeight: 1.45, color: T.black }}>
          The most you'll pay is <strong>${s.start}</strong>. The more who join,
          the less <em>everyone</em> pays.
        </p>

        {/* 3. Combined sliding scale — current position + downward projection */}
        <div style={{ padding: '4px 0 0' }}>
          <span style={{ fontFamily: T.mono, fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', color: T.textDim }}>
            LIVE PRICE — DROPS AS THE ROOM FILLS
          </span>
          <div style={{ marginTop: 10 }}>
            <PricingScale start={s.start} floor={s.floor} minSpots={s.min} currentSpots={s.held} maxCapacity={16} total={220} />
          </div>
        </div>
      </div>

      {/* HOLD CTA */}
      <div style={{ padding: '22px 14px 8px' }}>
        <PillButton variant="primary" style={{ width: '100%' }}>
          Hold my place — no charge yet
        </PillButton>
        <p style={{ margin: '12px 14px 0', fontSize: 12, lineHeight: 1.4, color: T.textDim, textAlign: 'center' }}>
          You only pay if it goes ahead — and only at the final, lowest price.
        </p>
        <button style={{
          marginTop: 14, width: '100%', padding: '14px 20px', borderRadius: 999,
          border: '1.5px dashed rgba(26,26,26,0.25)', background: 'transparent',
          color: T.black, fontFamily: T.body, fontSize: 14,
        }}>+ Notes for the host (injuries, anything relevant)</button>
      </div>

      {/* WHERE */}
      <div style={{ padding: '22px 22px 8px' }}>
        <h3 style={{ fontFamily: T.title, fontSize: 22, margin: 0, fontWeight: 700, letterSpacing: '-0.01em' }}>Where</h3>
      </div>
      <div style={{ margin: '0 14px', padding: 20, borderRadius: 28, background: '#FFFFFF', border: CARD_BORDER }}>
        <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 4 }}>{s.venue}</div>
        <div style={{ fontSize: 13, color: T.textDim, marginBottom: 10 }}>{s.address}</div>
        <div style={{ fontSize: 12, color: T.black, marginBottom: 14, lineHeight: 1.4 }}>{s.access}</div>
        {/* faux map */}
        <div style={{
          height: 110, borderRadius: 18, background: '#EFE7DA',
          backgroundImage: `repeating-linear-gradient(45deg, rgba(26,26,26,0.05) 0 2px, transparent 2px 14px), repeating-linear-gradient(-45deg, rgba(26,26,26,0.05) 0 2px, transparent 2px 22px)`,
          position: 'relative', marginBottom: 12, overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', left: '52%', top: '46%', transform: 'translate(-50%,-50%)' }}>
            <div style={{ width: 30, height: 30, borderRadius: '50% 50% 50% 0', background: T.hotPink, transform: 'rotate(-45deg)', boxShadow: '0 6px 20px rgba(255,77,158,0.5)' }} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <PillButton variant="dark" size="sm" style={{ flex: 1 }}>↗ Directions</PillButton>
          <PillButton variant="ghostDark" size="sm" style={{ flex: 1 }}>Copy address</PillButton>
        </div>
      </div>

      {/* HOST */}
      <div style={{ padding: '24px 14px 0' }}>
        <div style={{
          padding: 18, borderRadius: 28, background: '#FFFFFF', border: CARD_BORDER,
          display: 'flex', alignItems: 'center', gap: 14,
        }}>
          <div style={{
            width: 52, height: 52, borderRadius: 999,
            background: T.hotPink,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: T.display, color: T.cream, fontSize: 22,
          }}>T</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 600, fontSize: 15 }}>{s.host}</div>
            <div style={{ fontSize: 12, color: T.textDim }}>
              {s.sessionsHosted} sessions · ★ {s.rating}
            </div>
          </div>
          <PillButton variant="pink" size="sm">+ Follow</PillButton>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// 02 — THIS WEEK
// ════════════════════════════════════════════════════════════════
function ScreenThisWeek() {
  return (
    <div data-screen-label="02 This Week" style={{
      background: T.cream, color: T.black, minHeight: '100%', fontFamily: T.body, paddingBottom: 120,
    }}>
      <StretchyNav dark={false} />

      <div style={{ padding: '12px 22px 18px' }}>
        <h1 style={{
          fontFamily: T.title, fontWeight: 700, fontSize: 56, lineHeight: 0.9,
          letterSpacing: '-0.02em', margin: 0}}>
          Pick your<br/>stretch.
        </h1>
        <p style={{ margin: '14px 0 0', fontSize: 14, color: T.textDim }}>
          5 sessions in your suburbs this week.
        </p>
      </div>

      {/* filter chips */}
      <div style={{ display: 'flex', gap: 8, padding: '0 22px 16px', overflow: 'auto' }}>
        {['All', 'Grey Lynn', 'Pt Chev', 'Ponsonby', 'K Rd', 'Yoga', 'Pilates'].map((c, i) => (
          <span key={c} style={{
            padding: '8px 14px', borderRadius: 999, whiteSpace: 'nowrap',
            background: i === 0 ? T.black : '#FFFFFF',
            color: i === 0 ? T.cream : T.black,
            border: i === 0 ? 'none' : HAIRLINE,
            fontFamily: T.body, fontSize: 12, fontWeight: 600,
          }}>{c}</span>
        ))}
      </div>

      {/* cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '0 14px' }}>
        {SAMPLE.thisWeek.map((s, i) => <SessionCard key={i} session={s} />)}
      </div>

      {/* map cta */}
      <div style={{ padding: 14, marginTop: 14 }}>
        <PillButton variant="ghostDark" style={{ width: '100%' }}>
          ◎ View map of all sessions
        </PillButton>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// 01 — HOME (the only screen with the full wordmark)
// ════════════════════════════════════════════════════════════════
function ScreenHome() {
  return (
    <div data-screen-label="01 Home" style={{
      background: T.olive, color: T.cream, minHeight: '100%', fontFamily: T.body, position: 'relative', overflow: 'hidden', paddingBottom: 100,
    }}>
      <StretchyNav dark />

      {/* Large S hero — branded landing moment */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '20px 24px 0' }}>
        <SMark size={180} color={T.cream} />
      </div>

      {/* hero */}
      <div style={{ padding: '24px 24px 28px', position: 'relative', textAlign: 'center' }}>
        <p style={{ fontFamily: T.mono, fontSize: 11, letterSpacing: '0.20em', color: T.cream, opacity: 0.85, margin: 0, fontWeight: 700 }}>
          AUCKLAND · THIS WEEK
        </p>
        <h1 style={{
          fontFamily: T.title, fontWeight: 700, fontSize: 60, lineHeight: 0.92,
          letterSpacing: '-0.03em', margin: '12px 0 0',
          color: T.cream}}>
          A social<br/>movement.
        </h1>
        <p style={{ margin: '18px auto 0', fontSize: 16, lineHeight: 1.4, color: T.cream, opacity: 0.92, maxWidth: 320 }}>
          The larger the group gets, the better value for all. Join us.
        </p>
      </div>

      {/* CTA stack */}
      <div style={{ padding: '8px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <PillButton variant="secondary" style={{ width: '100%', justifyContent: 'space-between', padding: '24px 28px', height: 72 }}>
          <span style={{ fontFamily: T.title, fontSize: 22, letterSpacing: '-0.01em', fontWeight: 700 }}>See this week</span>
          <span style={{ fontSize: 22 }}>→</span>
        </PillButton>
        <PillButton variant="dark" style={{ width: '100%', justifyContent: 'space-between', padding: '20px 28px', height: 64 }}>
          <span style={{ fontFamily: T.title, fontSize: 18, letterSpacing: '-0.01em', fontWeight: 700 }}>Host a Stretchy</span>
          <span style={{ fontSize: 18 }}>→</span>
        </PillButton>
        <PillButton variant="ghost" style={{ width: '100%', justifyContent: 'space-between', padding: '20px 28px', height: 64 }}>
          <span style={{ fontFamily: T.title, fontSize: 18, letterSpacing: '-0.01em', fontWeight: 700 }}>Suggest a Stretchy</span>
          <span style={{ fontSize: 18 }}>→</span>
        </PillButton>
      </div>

      {/* HOW TO STRETCHY teaser */}
      <div style={{ padding: '36px 14px 0' }}>
        <div style={{ padding: 24, borderRadius: 32, background: T.yellow, color: T.black }}>
          <span style={{ fontFamily: T.mono, fontSize: 11, fontWeight: 700, letterSpacing: '0.16em' }}>
            HOW TO STRETCHY
          </span>
          <h3 style={{
            fontFamily: T.title, fontWeight: 700, fontSize: 30, lineHeight: 0.95,
            letterSpacing: '-0.01em', margin: '10px 0 16px'}}>
            The more who join,<br/>the less you pay.
          </h3>
          <ol style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {HOW_TO_STRETCHY.map((step, i) => (
              <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{
                  width: 24, height: 24, borderRadius: 999,
                  background: step.celebrate ? T.hotPink : T.black,
                  color: step.celebrate ? T.cream : T.yellow,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: T.mono, fontSize: 11, fontWeight: 700, flexShrink: 0, marginTop: 1,
                }}>{i + 1}</span>
                <span style={{ fontSize: 13, lineHeight: 1.45 }}>
                  <strong>{step.lead}</strong>{step.body && step.body !== '✌️' ? ' ' + step.body : ''}
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

// ════════════════════════════════════════════════════════════════
// 04 — PLACE HELD
// ════════════════════════════════════════════════════════════════
function ScreenPlaceHeld() {
  const s = SAMPLE.detail;
  return (
    <div data-screen-label="04 Place Held" style={{
      background: T.cream, color: T.black, minHeight: '100%', fontFamily: T.body, paddingBottom: 120,
    }}>
      {/* top bar */}
      <TopBar
        backable
        center={<MenuPill dark={false}>RECEIPT</MenuPill>}
      />

      {/* hero — calm hold confirmation */}
      <div style={{ padding: '12px 22px 8px', position: 'relative' }}>
        <SMark size={88} color={T.hold} style={{ marginBottom: 12 }} />
        <p style={{ fontFamily: T.mono, fontSize: 11, letterSpacing: '0.20em', margin: 0, color: T.textDim }}>
          YOUR HOLD
        </p>
        <h1 style={{
          fontFamily: T.title, fontWeight: 700, fontSize: 72, lineHeight: 0.88,
          letterSpacing: '-0.03em', margin: '8px 0 0'}}>
          Place<br/>held.
        </h1>
      </div>

      {/* session summary card */}
      <div style={{ margin: '20px 14px 0', padding: 20, borderRadius: 28, background: '#FFFFFF', border: CARD_BORDER }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
          <div style={{ minWidth: 0, flex: 1 }}>
            <span style={{ fontFamily: T.mono, fontSize: 11, color: T.textDim, letterSpacing: '0.12em' }}>{s.day} · {s.when}</span>
            <h3 style={{ fontFamily: T.title, fontSize: 26, margin: '6px 0 4px', fontWeight: 700}}>{s.name}</h3>
            <div style={{ fontSize: 13, color: T.textDim }}>{s.host} · {s.hood}</div>
          </div>
          <PricePill value={s.start} state="open" size="sm" />
        </div>
        <div style={{
          marginTop: 14, padding: 12, borderRadius: 14,
          background: '#EEF7FA', border: `1.5px solid ${T.hold}`,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <span style={{ fontSize: 12, color: T.black }}>No charge yet — cancel free until 36h out.</span>
          <span style={{ fontFamily: T.mono, fontSize: 11, color: '#3F7B8E', letterSpacing: '0.08em', fontWeight: 700 }}>● HOLDING</span>
        </div>
      </div>

      {/* YELLOW "How to Stretchy" card */}
      <div style={{ margin: '14px 14px 0', padding: 22, borderRadius: 28, background: T.yellow, color: T.black }}>
        <span style={{ fontFamily: T.mono, fontSize: 11, fontWeight: 700, letterSpacing: '0.16em' }}>HOW TO STRETCHY</span>
        <ol style={{ margin: '14px 0 0', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {HOW_TO_STRETCHY.map((step, i) => (
            <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <span style={{
                width: 26, height: 26, borderRadius: 999,
                background: step.celebrate ? T.hotPink : T.black,
                color: step.celebrate ? T.cream : T.yellow,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: T.mono, fontSize: 12, fontWeight: 700, flexShrink: 0, marginTop: 2,
              }}>{i + 1}</span>
              <span style={{ fontSize: 14, lineHeight: 1.45 }}>
                <strong>{step.lead}</strong>{step.body && step.body !== '✌️' ? ' ' + step.body : ''}
                {step.body === '✌️' && <span style={{ marginLeft: 6, fontSize: 18 }}>✌️</span>}
              </span>
            </li>
          ))}
        </ol>
      </div>

      {/* Bring a mate */}
      <div style={{ margin: '14px 14px 0', padding: 20, borderRadius: 28, background: '#FFFFFF', border: CARD_BORDER }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 48, height: 48, borderRadius: 16,
            background: T.hotPink,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: T.display, color: T.cream, fontSize: 22,
          }}>+</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 600, fontSize: 15 }}>Want it cheaper for everyone?</div>
            <div style={{ fontSize: 12, color: T.textDim }}>Share — each mate drops the price.</div>
          </div>
        </div>
        <PillButton variant="dark" size="md" style={{ width: '100%', marginTop: 14 }}>
          + Bring a mate · live price $28
        </PillButton>
      </div>

      {/* SOCIAL STRETCH teaser — hot pink moment */}
      <div style={{ margin: '14px 14px 0', padding: 20, borderRadius: 28, background: T.hotPink, color: T.cream, position: 'relative', overflow: 'hidden' }}>
        <span style={{ fontFamily: T.mono, fontSize: 11, fontWeight: 700, letterSpacing: '0.16em' }}>SOCIAL STRETCH 🤙</span>
        <p style={{ margin: '10px 0 0', fontSize: 15, lineHeight: 1.4, fontWeight: 500, maxWidth: 260 }}>
          {s.host.split(' ')[0]} is planning a Social Stretch after at
          <strong> {s.socialStretch}</strong> — coffee, a cold one, good company.
        </p>
        <p style={{ margin: '8px 0 0', fontSize: 12, opacity: 0.85 }}>Details on session day.</p>
      </div>

      {/* calendar */}
      <div style={{ display: 'flex', gap: 8, padding: '20px 14px 0' }}>
        <PillButton variant="ghostDark" size="md" style={{ flex: 1 }}>＋ Google Cal</PillButton>
        <PillButton variant="ghostDark" size="md" style={{ flex: 1 }}>＋ Apple Cal</PillButton>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// A4 — GOING AHEAD (36hr confirmation full-screen push)
// Hot-pink moment — no black, but still a big colour shift.
// ════════════════════════════════════════════════════════════════
function ScreenGoingAhead() {
  const s = SAMPLE.detail;
  return (
    <div data-screen-label="A4 Going Ahead" style={{
      background: T.hotPink, color: T.cream, minHeight: '100%',
      fontFamily: T.body, paddingBottom: 100, position: 'relative', overflow: 'hidden',
    }}>
      {/* top */}
      <TopBar
        dark
        center={
          <span style={{ fontFamily: T.mono, fontSize: 11, letterSpacing: '0.20em', fontWeight: 700 }}>
            NOTIFICATION · 36H BEFORE
          </span>
        }
        right={
          <button style={{ width: 32, height: 32, border: 'none', background: 'rgba(245,237,227,0.22)', color: T.cream, borderRadius: 999, fontSize: 14 }}>✕</button>
        }
      />

      {/* MASSIVE headline */}
      <div style={{ padding: '32px 22px 8px', position: 'relative' }}>
        <h1 style={{
          fontFamily: T.title, fontWeight: 700, fontSize: 96, lineHeight: 0.92,
          letterSpacing: '-0.04em', margin: 0,
        }}>
          Going<br/>ahead.
        </h1>
        <p style={{ margin: '20px 0 0', fontSize: 18, lineHeight: 1.3, fontWeight: 500, maxWidth: 320 }}>
          Minimum hit. Your session's happening.
        </p>
      </div>

      {/* session card — cream surface, not black */}
      <div style={{ margin: '32px 14px 0', padding: 22, borderRadius: 32, background: T.cream, color: T.black, position: 'relative', boxShadow: '0 10px 40px rgba(0,0,0,0.10)' }}>
        <span style={{ fontFamily: T.mono, fontSize: 11, color: '#2E7A52', letterSpacing: '0.14em', fontWeight: 700 }}>● CONFIRMED · {s.day} {s.when}</span>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginTop: 8 }}>
          <h3 style={{ fontFamily: T.title, fontWeight: 700, fontSize: 32, lineHeight: 0.95, margin: 0, letterSpacing: '-0.02em', flex: 1 }}>
            {s.name}
          </h3>
          <SMark size={42} color={T.black} />
        </div>
        <div style={{ fontSize: 13, color: T.textDim, marginTop: 4 }}>{s.host} · {s.hood}</div>

        {/* CURRENT PRICE — large yellow tile */}
        <div style={{ marginTop: 22, padding: 20, borderRadius: 24, background: T.yellow }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
            <span style={{ fontFamily: T.mono, fontSize: 11, color: T.black, letterSpacing: '0.14em', fontWeight: 700 }}>CURRENT PRICE</span>
            <span style={{ fontFamily: T.mono, fontSize: 11, color: T.black, fontWeight: 700, letterSpacing: '0.12em' }}>● MAY STILL FALL</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
            <span style={{ fontFamily: T.mono, fontSize: 36, color: T.black, fontWeight: 700 }}>$</span>
            <span style={{ fontFamily: T.display, fontSize: 110, lineHeight: 0.82, color: T.black, letterSpacing: '-0.04em', fontWeight: 400 }}>23</span>
          </div>
          <p style={{ margin: '6px 0 0', fontSize: 12, color: T.black, opacity: 0.75 }}>
            Was $28 · You're saving $5 so far.
          </p>
        </div>

        <p style={{ margin: '18px 0 0', fontSize: 13, lineHeight: 1.4, color: T.black }}>
          People can still join up to <strong>2 hours before</strong>, so your price may keep dropping.
          Price locks 2 hours before — that's when you're charged.
        </p>
      </div>

      {/* Bring a mate CTA */}
      <div style={{ padding: '20px 14px 4px', position: 'relative' }}>
        <PillButton variant="secondary" style={{ width: '100%' }}>
          + Bring a mate — drop the price again
        </PillButton>
      </div>

      {/* social stretch tail */}
      <div style={{ margin: '14px 14px 0', padding: 16, borderRadius: 24, background: T.cream, color: T.black, display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 24 }}>🤙</span>
        <div style={{ fontSize: 13, lineHeight: 1.35 }}>
          <strong>{s.host.split(' ')[0]}</strong> is heading to <strong>{s.socialStretch}</strong> after. Come along.
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// 09 — HOST DASHBOARD
// ════════════════════════════════════════════════════════════════
function ScreenHostDashboard() {
  return (
    <div data-screen-label="09 Host Dashboard" style={{
      background: T.cream, color: T.black, minHeight: '100%', fontFamily: T.body, paddingBottom: 100,
    }}>
      {/* top */}
      <TopBar
        center={<MenuPill dark={false}>HOST DASHBOARD</MenuPill>}
        right={
          <div style={{
            width: 40, height: 40, borderRadius: 999,
            background: T.yellow,
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: T.display, color: T.black, fontSize: 16,
          }}>T</div>
        }
      />

      {/* welcome */}
      <div style={{ margin: '8px 14px 0', padding: 20, borderRadius: 28, background: T.pink, color: T.black }}>
        <h1 style={{ fontFamily: T.title, fontWeight: 700, fontSize: 36, lineHeight: 0.95, margin: 0, letterSpacing: '-0.02em' }}>
          Kia ora,<br/>Tāne.
        </h1>
        <div style={{ marginTop: 12, fontSize: 13, lineHeight: 1.4 }}>
          Yoga · Grey Lynn + Pt Chev · <strong>4 sessions this month</strong>
        </div>
      </div>

      {/* stats — yellow money tile */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 10, padding: '14px 14px 0' }}>
        <div style={{ background: T.yellow, color: T.black, padding: 18, borderRadius: 24 }}>
          <span style={{ fontFamily: T.mono, fontSize: 10, fontWeight: 700, letterSpacing: '0.14em' }}>THIS MONTH</span>
          <div style={{ display: 'flex', alignItems: 'baseline', marginTop: 6 }}>
            <span style={{ fontFamily: T.mono, fontSize: 16, fontWeight: 700 }}>$</span>
            <span style={{ fontFamily: T.display, fontSize: 48, lineHeight: 0.85, fontWeight: 400, letterSpacing: '-0.03em' }}>847</span>
          </div>
          <div style={{ fontFamily: T.mono, fontSize: 11, marginTop: 4 }}>+ $245 vs last</div>
        </div>
        <div style={{ background: '#FFFFFF', padding: 18, borderRadius: 24, border: CARD_BORDER }}>
          <span style={{ fontFamily: T.mono, fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', color: T.textDim }}>AVG ROOM</span>
          <div style={{ fontFamily: T.display, fontSize: 36, lineHeight: 0.9, marginTop: 6, letterSpacing: '-0.02em' }}>9.2</div>
          <div style={{ fontFamily: T.mono, fontSize: 11, color: T.textDim, marginTop: 4 }}>mates / session</div>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, padding: '10px 14px 0' }}>
        <div style={{ background: '#FFFFFF', padding: 14, borderRadius: 20, border: CARD_BORDER }}>
          <span style={{ fontFamily: T.mono, fontSize: 10, color: T.textDim, letterSpacing: '0.14em' }}>MATES HOSTED</span>
          <div style={{ fontFamily: T.display, fontSize: 26, lineHeight: 0.95, marginTop: 4 }}>147</div>
        </div>
        <div style={{ background: '#FFFFFF', padding: 14, borderRadius: 20, border: CARD_BORDER }}>
          <span style={{ fontFamily: T.mono, fontSize: 10, color: T.textDim, letterSpacing: '0.14em' }}>REPEAT %</span>
          <div style={{ fontFamily: T.display, fontSize: 26, lineHeight: 0.95, marginTop: 4 }}>68<span style={{ fontSize: 18, opacity: 0.6 }}>%</span></div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding: '16px 14px 0' }}>
        <PillButton variant="primary" style={{ width: '100%' }}>
          + Add a Stretchy session
        </PillButton>
      </div>

      {/* Live session — pricing formula */}
      <div style={{ padding: '24px 22px 8px' }}>
        <h3 style={{ fontFamily: T.title, fontSize: 22, margin: 0, fontWeight: 700}}>Live sessions</h3>
      </div>
      <div style={{ margin: '0 14px', padding: 20, borderRadius: 28, background: '#FFFFFF', border: CARD_BORDER, position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
          <div style={{ minWidth: 0, flex: 1 }}>
            <span style={{ fontFamily: T.mono, fontSize: 10, color: '#2E7A52', letterSpacing: '0.14em', fontWeight: 700 }}>● CONFIRMED · SUN 9:00</span>
            <h4 style={{ fontFamily: T.title, fontSize: 22, margin: '6px 0 4px', fontWeight: 700}}>Sunday Slow Flow</h4>
            <div style={{ fontSize: 12, color: T.textDim }}>9 of 8 held · still room for 3 more</div>
          </div>
          <SMark size={42} color={T.green} />
        </div>

        {/* the formula */}
        <div style={{ marginTop: 18, padding: 16, borderRadius: 18, background: T.cream }}>
          <div style={{ fontFamily: T.mono, fontSize: 10, color: T.textDim, letterSpacing: '0.14em', marginBottom: 10 }}>
            HOW YOUR PRICE WORKS
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', fontFamily: T.mono, fontSize: 12 }}>
            <span style={{ background: T.yellow, color: T.black, padding: '6px 10px', borderRadius: 10, fontWeight: 700 }}>
              TARGET $200
            </span>
            <span style={{ fontSize: 16, color: T.textDim }}>+</span>
            <span style={{ background: '#FFFFFF', color: T.textDim, padding: '6px 10px', borderRadius: 10, fontWeight: 700, border: HAIRLINE }}>
              FEE $20 + GST
            </span>
            <span style={{ fontSize: 16, color: T.textDim }}>÷</span>
            <span style={{ background: '#FFFFFF', color: T.black, padding: '6px 10px', borderRadius: 10, fontWeight: 700, border: HAIRLINE }}>
              8 SPOTS
            </span>
            <span style={{ fontSize: 16, color: T.textDim }}>=</span>
            <span style={{ background: T.yellow, color: T.black, padding: '6px 10px', borderRadius: 10, fontWeight: 700 }}>
              $28 / SPOT
            </span>
          </div>
          <p style={{ margin: '12px 0 0', fontSize: 11, color: T.textDim, lineHeight: 1.4 }}>
            The $20 + GST Stretchy fee never changes. Only the per-spot price moves with the room.
          </p>
        </div>

        <div style={{ marginTop: 14 }}>
          <PricingCurve start={28} floor={14} current={19} w={320} h={90} dark={false} />
        </div>

        <div style={{
          marginTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '10px 12px', borderRadius: 14,
          background: '#E6F5EC', border: `1.5px solid ${T.green}`,
        }}>
          <span style={{ fontFamily: T.mono, fontSize: 11, color: '#2E7A52', letterSpacing: '0.10em', fontWeight: 700 }}>YOU'LL HIT YOUR TARGET</span>
          <span style={{ fontFamily: T.mono, fontSize: 11, color: T.black }}>9 × $19 + 1 = $200</span>
        </div>
      </div>

      {/* payout pending */}
      <div style={{ margin: '14px 14px 0', padding: 18, borderRadius: 24, background: T.yellow, color: T.black, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <span style={{ fontFamily: T.mono, fontSize: 10, fontWeight: 700, letterSpacing: '0.14em' }}>PAYS MONDAY</span>
          <div style={{ display: 'flex', alignItems: 'baseline', marginTop: 4 }}>
            <span style={{ fontFamily: T.mono, fontSize: 14, fontWeight: 700 }}>$</span>
            <span style={{ fontFamily: T.display, fontSize: 38, lineHeight: 0.9, fontWeight: 400, letterSpacing: '-0.02em' }}>431</span>
          </div>
          <span style={{ fontSize: 11, fontFamily: T.mono }}>2 sessions · statement →</span>
        </div>
        <SMark size={56} color={T.black} />
      </div>
    </div>
  );
}

Object.assign(window, {
  ScreenSessionDetail, ScreenThisWeek, ScreenHome,
  ScreenPlaceHeld, ScreenGoingAhead, ScreenHostDashboard,
});

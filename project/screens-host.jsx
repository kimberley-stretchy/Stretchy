// Stretchy — host-side screens (06 apply, 07 add session, H1 manage,
// 08 floor not met, H3 host inbox, H2 monthly payout).

const TH = STRETCHY;
const H_CARD = '1.5px solid rgba(26,26,26,0.08)';
const H_HAIR = '1.5px solid rgba(26,26,26,0.10)';

// ════════════════════════════════════════════════════════════════
// 06 — APPLY (Host Application)
// ════════════════════════════════════════════════════════════════
function ScreenApply() {
  return (
    <div data-screen-label="06 Apply" style={{
      background: TH.cream, color: TH.black, minHeight: '100%',
      fontFamily: TH.body, paddingBottom: 100,
    }}>
      <TopBar backable center={<MenuPill dark={false}>HOST APPLICATION</MenuPill>} />

      <div style={{ padding: '12px 22px 18px' }}>
        <h1 style={{
          fontFamily: TH.title, fontWeight: 700, fontSize: 56, lineHeight: 0.9,
          letterSpacing: '-0.03em', margin: 0}}>
          Host a<br/>Stretchy.
        </h1>
      </div>

      {/* Intro pink card */}
      <div style={{ margin: '0 14px', padding: 20, borderRadius: 28, background: TH.pink, color: TH.black }}>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.45 }}>
          A Stretchy movement led by locals. <strong>Vetted once. Active for 6 months.</strong> Change your sessions any time.
        </p>
        <div style={{ display: 'flex', gap: 14, marginTop: 12, flexWrap: 'wrap' }}>
          {['Set your own target', 'No platform %', 'Cancel any session'].map((s, i) => (
            <span key={i} style={{ fontFamily: TH.mono, fontSize: 11, fontWeight: 700, letterSpacing: '0.08em' }}>✓ {s}</span>
          ))}
        </div>
      </div>

      <div style={{ padding: '24px 14px 0', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* NZ */}
        <FormField label="ARE YOU BASED IN NEW ZEALAND?">
          <div style={{ display: 'flex', gap: 8 }}>
            <span style={{ flex: 1, textAlign: 'center', padding: '14px', borderRadius: 14, background: TH.black, color: TH.cream, fontFamily: TH.body, fontWeight: 700 }}>YES</span>
            <span style={{ flex: 1, textAlign: 'center', padding: '14px', borderRadius: 14, background: '#FFFFFF', border: H_HAIR, color: TH.black, fontFamily: TH.body, fontWeight: 700 }}>NO — waitlist</span>
          </div>
        </FormField>

        {/* Why you're perfect */}
        <FormField label="WHY YOU'RE PERFECT" multiline
          value="I've taught vinyasa in Grey Lynn for 4 years. I want yoga to feel less like a class and more like a meet-up." />

        {/* Practice */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 10 }}>
          <FormField label="I TEACH" value="Vinyasa · Slow Flow" />
          <FormField label="YEARS ACTIVE" value="4" />
        </div>

        {/* Neighbourhoods */}
        <FormField label="WHERE YOU'LL HOST">
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {[['Grey Lynn', true], ['Pt Chev', true], ['Herne Bay', false], ['Ponsonby', false]].map(([n, sel], i) => (
              <Chip key={i} selected={sel} color={TH.purple}>{n}</Chip>
            ))}
            <Chip>+ Add</Chip>
          </div>
        </FormField>

        {/* Credentials */}
        <FormField label="CREDENTIALS (RECOMMENDED, NOT REQUIRED)">
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {[['Certified', true], ['First aid', true], ['Other', false]].map(([n, sel], i) => (
              <Chip key={i} selected={sel} color={TH.olive}>{n}</Chip>
            ))}
          </div>
        </FormField>

        {/* Where mates find you */}
        <FormField label="WHERE MATES FIND YOU (ALL OPTIONAL)">
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {['Instagram', 'TikTok', 'Website', 'Substack'].map((n, i) => (
              <Chip key={i} selected={i === 0} color={TH.hotPink}>{n}</Chip>
            ))}
          </div>
        </FormField>

        {/* Social Stretch */}
        <div style={{ padding: 16, borderRadius: 20, background: '#FFFFFF', border: H_CARD }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontFamily: TH.mono, fontSize: 10, fontWeight: 700, letterSpacing: '0.16em' }}>WILL YOU ADD A SOCIAL STRETCH?</div>
              <div style={{ fontSize: 12, color: TH.textDim, marginTop: 4 }}>Coffee, beer, booch after the class.</div>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              <Chip selected color={TH.hotPink}>YES</Chip>
              <Chip>NO</Chip>
            </div>
          </div>
          <div style={{ marginTop: 12 }}>
            <FormField label="VENUE PARTNER" value="Little Bird Café, Grey Lynn" />
          </div>
        </div>

        {/* How often */}
        <FormField label="HOW OFTEN?">
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {[['Multiple/week', false], ['Weekly', true], ['Fortnightly', false], ['Monthly', false], ['Events only', false]].map(([n, sel], i) => (
              <Chip key={i} selected={sel} color={TH.royal}>{n}</Chip>
            ))}
          </div>
        </FormField>

        {/* T&C */}
        <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: 14, borderRadius: 16, background: '#FFFFFF', border: H_CARD, fontSize: 13, lineHeight: 1.4 }}>
          <div style={{ width: 22, height: 22, borderRadius: 6, background: TH.yellow, color: TH.black, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✓</div>
          <span>I agree to the <strong>Stretchy host terms</strong>. Or — <span style={{ color: TH.hotPink, fontWeight: 700 }}>Chat to Stretchy</span> first.</span>
        </label>
      </div>

      <div style={{ padding: '20px 14px 0' }}>
        <PillButton variant="primary" style={{ width: '100%' }}>Apply · we'll vet within 5 days</PillButton>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// 07 — ADD A SESSION (Step 4 — The Numbers, the most interesting step)
// ════════════════════════════════════════════════════════════════
function ScreenAddSession() {
  const target = 200, fee = 23; // 20 + 15% GST
  const minSpots = 8;
  const start = Math.round((target + fee) / minSpots);
  const floor = Math.round((target + fee) / 16);

  return (
    <div data-screen-label="07 Add a Session" style={{
      background: TH.cream, color: TH.black, minHeight: '100%',
      fontFamily: TH.body, paddingBottom: 100,
    }}>
      <TopBar
        backable
        center={
          <div style={{ display: 'flex', gap: 6 }}>
            {[1,2,3,4].map(n => (
              <div key={n} style={{
                width: 24, height: 6, borderRadius: 999,
                background: n <= 4 ? TH.black : 'rgba(26,26,26,0.14)',
              }} />
            ))}
          </div>
        }
        right={<span style={{ fontFamily: TH.mono, fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: TH.textDim }}>SAVE</span>}
      />

      <div style={{ padding: '12px 22px 18px' }}>
        <p style={{ fontFamily: TH.mono, fontSize: 11, letterSpacing: '0.20em', color: TH.textDim, margin: 0 }}>
          STEP 4 OF 4 · THE NUMBERS
        </p>
        <h1 style={{
          fontFamily: TH.title, fontWeight: 700, fontSize: 52, lineHeight: 0.9,
          letterSpacing: '-0.03em', margin: '12px 0 0'}}>
          Set your<br/>target.
        </h1>
      </div>

      {/* market reference */}
      <div style={{ margin: '0 14px', padding: 16, borderRadius: 20, background: TH.pink, color: TH.black, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        <span style={{ fontSize: 22 }}>💡</span>
        <div style={{ fontSize: 13, lineHeight: 1.4 }}>
          For a 60-min casual vinyasa in Auckland, fair market is <strong>$25–35</strong>. With your target & min, you'd start at <strong>${start}</strong>.
        </div>
      </div>

      {/* target slider */}
      <div style={{ margin: '14px 14px 0', padding: 22, borderRadius: 28, background: '#FFFFFF', border: H_CARD }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
          <span style={{ fontFamily: TH.mono, fontSize: 11, fontWeight: 700, letterSpacing: '0.16em' }}>YOUR TARGET</span>
          <span style={{ fontFamily: TH.mono, fontSize: 11, color: TH.textDim }}>$50 — $10,000</span>
        </div>
        <div style={{
          background: TH.yellow, padding: '14px 20px', borderRadius: 18, marginBottom: 14,
          display: 'flex', alignItems: 'baseline', gap: 4,
        }}>
          <span style={{ fontFamily: TH.mono, fontSize: 26, fontWeight: 700, color: TH.black }}>$</span>
          <span style={{ fontFamily: TH.display, fontSize: 64, lineHeight: 0.85, color: TH.black, letterSpacing: '-0.04em' }}>{target}</span>
          <span style={{ fontFamily: TH.mono, fontSize: 13, color: TH.black, marginLeft: 8 }}>per session</span>
        </div>
        {/* slider */}
        <div style={{ height: 8, borderRadius: 999, background: 'rgba(26,26,26,0.10)', position: 'relative', marginBottom: 8 }}>
          <div style={{ width: '32%', height: '100%', borderRadius: 999, background: TH.black }} />
          <div style={{ position: 'absolute', left: '32%', top: -8, width: 24, height: 24, borderRadius: 999, background: TH.cream, border: `3px solid ${TH.black}`, transform: 'translateX(-50%)' }} />
        </div>
        <p style={{ margin: '6px 0 0', fontSize: 12, lineHeight: 1.4, color: TH.textDim }}>
          Cover your venue, your time, your costs. The $20 + GST Stretchy fee is added on top.
        </p>
      </div>

      {/* min spots */}
      <div style={{ margin: '14px 14px 0', padding: 22, borderRadius: 28, background: '#FFFFFF', border: H_CARD }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
          <span style={{ fontFamily: TH.mono, fontSize: 11, fontWeight: 700, letterSpacing: '0.16em' }}>MINIMUM SPOTS TO RUN</span>
          <span style={{ fontFamily: TH.display, fontSize: 36, lineHeight: 1, color: TH.black, letterSpacing: '-0.02em' }}>{minSpots}</span>
        </div>
        <div style={{ height: 8, borderRadius: 999, background: 'rgba(26,26,26,0.10)', position: 'relative', marginBottom: 8 }}>
          <div style={{ width: '50%', height: '100%', borderRadius: 999, background: TH.black }} />
          <div style={{ position: 'absolute', left: '50%', top: -8, width: 24, height: 24, borderRadius: 999, background: TH.cream, border: `3px solid ${TH.black}`, transform: 'translateX(-50%)' }} />
        </div>
        <p style={{ margin: '6px 0 0', fontSize: 12, lineHeight: 1.4, color: TH.textDim }}>
          The smallest group that makes it worth running. Below this — no one's charged.
        </p>
      </div>

      {/* Live price preview table */}
      <div style={{ margin: '14px 14px 0', padding: 20, borderRadius: 28, background: TH.black, color: TH.cream }}>
        <span style={{ fontFamily: TH.mono, fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', color: TH.yellow }}>LIVE PRICE PREVIEW</span>
        <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 0 }}>
          {[
            [minSpots, start, 'STARTING PRICE'],
            [12, Math.round((target + fee) / 12), ''],
            [16, floor, 'FLOOR PRICE'],
          ].map(([spots, price, label], i) => (
            <div key={i} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '14px 0', borderBottom: i < 2 ? '1px solid rgba(245,237,227,0.10)' : 'none',
            }}>
              <div>
                <div style={{ fontFamily: TH.mono, fontSize: 12, fontWeight: 700 }}>{spots} SPOTS</div>
                {label && <div style={{ fontFamily: TH.mono, fontSize: 10, color: TH.yellow, marginTop: 2, letterSpacing: '0.12em' }}>{label}</div>}
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline' }}>
                <span style={{ fontFamily: TH.mono, fontSize: 14, fontWeight: 700, color: TH.yellow }}>$</span>
                <span style={{ fontFamily: TH.display, fontSize: 32, lineHeight: 0.85, color: TH.yellow, letterSpacing: '-0.02em' }}>{price}</span>
              </div>
            </div>
          ))}
        </div>
        <p style={{ margin: '14px 0 0', fontSize: 12, lineHeight: 1.4, color: TH.textDimDark }}>
          At minimum, you hit your <strong style={{ color: TH.cream }}>${target}</strong> target. Every extra person is a better deal for the room — you still take home ${target}.
        </p>
      </div>

      <div style={{ padding: '20px 14px 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <PillButton variant="primary" style={{ width: '100%' }}>Post session · go to dashboard</PillButton>
        <PillButton variant="ghostDark" style={{ width: '100%' }}>Not right? Set your own price</PillButton>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// H1 — MANAGE SESSION (roster, check-in)
// ════════════════════════════════════════════════════════════════
function ScreenManageSession() {
  const roster = [
    { name: 'Marlee F.', tag: 'NEW THIS MONTH', sessions: 27, checked: true, color: TH.purple },
    { name: 'Kit P.',   tag: 'REGULAR · 6 IN A ROW', sessions: 18, checked: true, color: TH.sky },
    { name: 'Sam W.',   tag: '⚠ pregnancy — modifications', sessions: 4, checked: false, color: TH.olive, alert: true },
    { name: 'Jess M.',  tag: 'FIRST STRETCHY 🎉', sessions: 1, checked: false, color: TH.hotPink },
    { name: 'Ari T.',   tag: 'REGULAR', sessions: 12, checked: false, color: TH.royal },
    { name: 'Lena B.',  tag: 'REGULAR', sessions: 9, checked: false, color: TH.orange },
    { name: 'Theo R.',  tag: 'NEW MATE', sessions: 2, checked: false, color: TH.red },
    { name: 'Pip C.',   tag: '⚠ knee — gentle', sessions: 5, checked: false, color: TH.green, alert: true },
    { name: 'Olive K.', tag: 'NEW MATE', sessions: 1, checked: false, color: TH.purple },
  ];
  return (
    <div data-screen-label="H1 Manage Session" style={{
      background: TH.cream, color: TH.black, minHeight: '100%',
      fontFamily: TH.body, paddingBottom: 100,
    }}>
      <TopBar backable center={<MenuPill dark={false}>MANAGE</MenuPill>} />

      {/* Header */}
      <div style={{ padding: '12px 22px 18px' }}>
        <p style={{ fontFamily: TH.mono, fontSize: 11, letterSpacing: '0.20em', color: TH.green, fontWeight: 700, margin: 0 }}>
          ● CONFIRMED · SUN 31 · 9:00 AM
        </p>
        <h1 style={{
          fontFamily: TH.title, fontWeight: 700, fontSize: 48, lineHeight: 0.9,
          letterSpacing: '-0.03em', margin: '10px 0 0'}}>
          Who's coming.
        </h1>
      </div>

      {/* Live stats */}
      <div style={{ margin: '0 14px', padding: 20, borderRadius: 28, background: '#FFFFFF', border: H_CARD }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontFamily: TH.mono, fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', color: TH.textDim }}>ROSTER</span>
            <div style={{ marginTop: 4, fontFamily: TH.display, fontSize: 36, lineHeight: 0.9, letterSpacing: '-0.02em' }}>
              9 <span style={{ color: TH.textDim }}>/ 8 min</span>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontFamily: TH.mono, fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', color: TH.textDim }}>CURRENT PRICE</span>
            <div style={{ marginTop: 4, display: 'flex', alignItems: 'baseline', justifyContent: 'flex-end' }}>
              <span style={{ fontFamily: TH.mono, fontSize: 16, fontWeight: 700, color: TH.black }}>$</span>
              <span style={{ fontFamily: TH.display, fontSize: 36, lineHeight: 0.9, letterSpacing: '-0.02em' }}>19</span>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
          <PillButton variant="dark" size="sm" style={{ flex: 1 }}>✉ Message all</PillButton>
          <PillButton variant="ghostDark" size="sm" style={{ flex: 1 }}>↗ Share</PillButton>
        </div>
      </div>

      {/* Run of show */}
      <div style={{ margin: '14px 14px 0', padding: 18, borderRadius: 24, background: TH.yellow, color: TH.black }}>
        <span style={{ fontFamily: TH.mono, fontSize: 10, fontWeight: 700, letterSpacing: '0.16em' }}>RUN OF SHOW</span>
        <div style={{ marginTop: 10, fontFamily: TH.body, fontSize: 14, lineHeight: 1.5 }}>
          <strong>8:45</strong> doors · <strong>9:00</strong> sharp start · <strong>10:00</strong> close · <strong>~10:15</strong> Social Stretch at Little Bird
        </div>
      </div>

      {/* Roster */}
      <div style={{ padding: '24px 22px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <h3 style={{ fontFamily: TH.title, fontSize: 22, margin: 0, fontWeight: 700}}>Check in</h3>
        <span style={{ fontFamily: TH.mono, fontSize: 11, color: TH.textDim, letterSpacing: '0.08em' }}>2 / 9 IN</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '0 14px' }}>
        {roster.map((r, i) => (
          <div key={i} style={{
            padding: '14px 16px', borderRadius: 20, background: '#FFFFFF',
            border: r.alert ? `1.5px solid ${TH.orange}` : H_CARD,
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: 999, background: r.color, color: '#FFFFFF',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: TH.display, fontSize: 16, flexShrink: 0,
            }}>{r.name[0]}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{r.name}</div>
              <div style={{ fontFamily: TH.mono, fontSize: 10, color: r.alert ? TH.orange : TH.textDim, marginTop: 3, letterSpacing: '0.06em' }}>
                {r.tag}
              </div>
            </div>
            <span style={{ fontFamily: TH.mono, fontSize: 11, fontWeight: 700, color: TH.textDim, marginRight: 4 }}>{r.sessions}</span>
            <div style={{
              width: 32, height: 32, borderRadius: 10,
              background: r.checked ? TH.green : 'transparent',
              border: r.checked ? 'none' : `1.5px solid rgba(26,26,26,0.30)`,
              color: TH.cream, fontSize: 18,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>{r.checked ? '✓' : ''}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// 08 — FLOOR NOT MET (orange state — 3 options)
// ════════════════════════════════════════════════════════════════
function ScreenFloorNotMet() {
  return (
    <div data-screen-label="08 Floor Not Met" style={{
      background: TH.cream, color: TH.black, minHeight: '100%',
      fontFamily: TH.body, paddingBottom: 100,
    }}>
      <TopBar backable center={<MenuPill dark={false}>HEADS UP</MenuPill>} />

      {/* Orange hero */}
      <div style={{ margin: '8px 14px 0', padding: 22, borderRadius: 32, background: TH.orange, color: TH.cream, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: -10, top: -10, opacity: 0.15 }}>
          <SMark size={160} color={TH.cream} />
        </div>
        <span style={{ fontFamily: TH.mono, fontSize: 11, fontWeight: 700, letterSpacing: '0.18em' }}>36H CHECK · SHORT OF FLOOR</span>
        <h1 style={{
          fontFamily: TH.title, fontWeight: 700, fontSize: 56, lineHeight: 0.9,
          letterSpacing: '-0.03em', margin: '10px 0 0'}}>
          Short of<br/>the floor.
        </h1>
        <div style={{ marginTop: 18, display: 'flex', gap: 24, alignItems: 'baseline' }}>
          <div>
            <div style={{ fontFamily: TH.mono, fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', opacity: 0.8 }}>YOU NEED</div>
            <div style={{ fontFamily: TH.display, fontSize: 56, lineHeight: 0.85, letterSpacing: '-0.03em' }}>8</div>
          </div>
          <div>
            <div style={{ fontFamily: TH.mono, fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', opacity: 0.8 }}>YOU'VE GOT</div>
            <div style={{ fontFamily: TH.display, fontSize: 56, lineHeight: 0.85, letterSpacing: '-0.03em' }}>5</div>
          </div>
          <div style={{ flex: 1 }} />
        </div>
        <div style={{ marginTop: 14, padding: '10px 14px', borderRadius: 14, background: 'rgba(26,26,26,0.20)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontFamily: TH.mono, fontSize: 11, fontWeight: 700, letterSpacing: '0.10em' }}>LOCKS IN</span>
          <span style={{ fontFamily: TH.mono, fontSize: 18, fontWeight: 700 }}>02:47:11</span>
        </div>
      </div>

      <div style={{ padding: '22px 22px 8px' }}>
        <h3 style={{ fontFamily: TH.title, fontSize: 22, margin: 0, fontWeight: 700}}>Your moves</h3>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '0 14px' }}>
        {/* Option 1 — Share */}
        <div style={{ padding: 18, borderRadius: 24, background: TH.hotPink, color: TH.cream }}>
          <span style={{ fontFamily: TH.mono, fontSize: 10, fontWeight: 700, letterSpacing: '0.16em' }}>OPTION 1 · FASTEST</span>
          <h4 style={{ fontFamily: TH.title, fontSize: 24, margin: '6px 0 6px', fontWeight: 700, letterSpacing: '-0.02em' }}>Share it.</h4>
          <p style={{ margin: '0 0 12px', fontSize: 13, lineHeight: 1.4, opacity: 0.9 }}>
            Send the link. Tell three mates. 3 more holds = your session's on, locked at $28 or better.
          </p>
          <div style={{ display: 'flex', gap: 8 }}>
            <PillButton variant="secondary" size="sm" style={{ flex: 1 }}>↗ Share link</PillButton>
            <PillButton variant="ghost" size="sm" style={{ flex: 1 }}>Copy</PillButton>
          </div>
        </div>

        {/* Option 2 — Lower */}
        <div style={{ padding: 18, borderRadius: 24, background: TH.yellow, color: TH.black }}>
          <span style={{ fontFamily: TH.mono, fontSize: 10, fontWeight: 700, letterSpacing: '0.16em' }}>OPTION 2 · ADJUST</span>
          <h4 style={{ fontFamily: TH.title, fontSize: 24, margin: '6px 0 6px', fontWeight: 700, letterSpacing: '-0.02em' }}>Lower the floor.</h4>
          <p style={{ margin: '0 0 12px', fontSize: 13, lineHeight: 1.4 }}>
            Drop the minimum or your target. Existing holders keep their price or better.
          </p>
          <div style={{ background: TH.black, color: TH.cream, padding: '10px 14px', borderRadius: 12, marginBottom: 10 }}>
            <div style={{ fontFamily: TH.mono, fontSize: 11, fontWeight: 700, letterSpacing: '0.10em', color: TH.yellow }}>NEW MINIMUM</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 4 }}>
              <span style={{ fontFamily: TH.display, fontSize: 28, lineHeight: 0.9, letterSpacing: '-0.02em' }}>5</span>
              <span style={{ fontFamily: TH.mono, fontSize: 12 }}>spots · $44 start price</span>
            </div>
          </div>
          <PillButton variant="dark" size="sm" style={{ width: '100%' }}>Apply lower floor</PillButton>
        </div>

        {/* Option 3 — Cancel */}
        <div style={{ padding: 18, borderRadius: 24, background: '#FFFFFF', border: H_CARD }}>
          <span style={{ fontFamily: TH.mono, fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', color: TH.textDim }}>OPTION 3 · CALL IT</span>
          <h4 style={{ fontFamily: TH.title, fontSize: 24, margin: '6px 0 6px', fontWeight: 700, letterSpacing: '-0.02em' }}>Cancel.</h4>
          <p style={{ margin: '0 0 12px', fontSize: 13, lineHeight: 1.4, color: TH.textDim }}>
            Holds released. Nothing charged. Slot freed up for next week.
          </p>
          <PillButton variant="ghostDark" size="sm" style={{ width: '100%' }}>Cancel session</PillButton>
        </div>

        <p style={{ margin: '4px 14px 0', fontSize: 12, color: TH.textDim, textAlign: 'center', lineHeight: 1.45 }}>
          Do nothing? Auto-cancels at lock-in. Everyone notified. No one charged. Doesn't count against your slots.
        </p>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// H3 — HOST INBOX
// ════════════════════════════════════════════════════════════════
function ScreenHostInbox() {
  return (
    <div data-screen-label="H3 Host Inbox" style={{
      background: TH.cream, color: TH.black, minHeight: '100%',
      fontFamily: TH.body, paddingBottom: 100,
    }}>
      <TopBar backable center={<MenuPill dark={false}>HOST INBOX · 3 NEW</MenuPill>} />

      <div style={{ padding: '12px 22px 18px' }}>
        <h1 style={{
          fontFamily: TH.title, fontWeight: 700, fontSize: 56, lineHeight: 0.9,
          letterSpacing: '-0.03em', margin: 0}}>
          The desk.
        </h1>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 22px 16px', overflow: 'auto' }}>
        {['ALL', 'NEEDS ACTION', 'POSITIVE', 'PAYOUTS', 'UPDATES'].map((f, i) => (
          <span key={f} style={{
            padding: '8px 14px', borderRadius: 999, whiteSpace: 'nowrap',
            background: i === 0 ? TH.black : '#FFFFFF',
            color: i === 0 ? TH.cream : TH.black,
            border: i === 0 ? 'none' : H_HAIR,
            fontFamily: TH.mono, fontSize: 11, fontWeight: 700, letterSpacing: '0.10em',
          }}>{f}</span>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '0 14px' }}>
        <NotificationCard kind="action" unread
          title="Sat Sunrise — short of floor"
          body="5 of 8 held. 3 more to go. Locks in 2h 47m."
          time="Just now"
        >
          <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
            <PillButton variant="secondary" size="sm">Open</PillButton>
            <PillButton variant="ghost" size="sm">Share</PillButton>
          </div>
        </NotificationCard>

        <NotificationCard kind="confirmed" unread
          title="Sunday Slow Flow — confirmed at $28"
          body="9 of 8 held. Target hit. Locks in 22 hours."
          time="2h ago"
        />

        <NotificationCard kind="payout" unread
          title="Payout incoming · $431"
          body="Pays Monday into ANZ ··2847. 2 sessions this week."
          time="6h ago"
        />

        <NotificationCard kind="social"
          title='Community vote: "Sunset HIIT at the viaduct"'
          body="47 mates want it. Matches your range. Want to take it on?"
          time="Yesterday"
        />

        <NotificationCard kind="update"
          title="Kit P. just held their 6th Slow Flow in a row"
          time="Yesterday"
        />

        <NotificationCard kind="confirmed"
          title="Vetting renewed for another 6 months"
          body="No action needed. Carry on."
          time="3 days ago"
        />
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// H2 — MONTHLY PAYOUT
// ════════════════════════════════════════════════════════════════
function ScreenPayout() {
  const sessions = [
    { name: 'Sunday Slow Flow', spots: 11, perSpot: 21, take: 200, fee: 23 },
    { name: 'Pt Chev Sunrise',  spots: 9,  perSpot: 25, take: 200, fee: 23 },
    { name: 'Sunday Slow Flow', spots: 8,  perSpot: 28, take: 200, fee: 23 },
    { name: 'Pt Chev Sunrise',  spots: 12, perSpot: 19, take: 200, fee: 23 },
  ];
  const totalTake = sessions.reduce((a, s) => a + s.take, 0);
  return (
    <div data-screen-label="H2 Monthly Payout" style={{
      background: TH.cream, color: TH.black, minHeight: '100%',
      fontFamily: TH.body, paddingBottom: 100,
    }}>
      <TopBar
        backable
        center={<MenuPill dark={false}>PAYOUT · MAY '26</MenuPill>}
        right={
          <button style={{
            width: 40, height: 40, borderRadius: 999, border: 'none',
            background: 'rgba(26,26,26,0.06)', color: TH.black, fontSize: 14,
          }}>⤓</button>
        }
      />

      <div style={{ padding: '12px 22px 18px' }}>
        <p style={{ fontFamily: TH.mono, fontSize: 11, letterSpacing: '0.20em', color: TH.textDim, margin: 0 }}>
          PAYS MONDAY · ANZ ··2847
        </p>
        <h1 style={{
          fontFamily: TH.title, fontWeight: 700, fontSize: 52, lineHeight: 0.9,
          letterSpacing: '-0.03em', margin: '10px 0 0'}}>
          This month,<br/>you earned.
        </h1>
      </div>

      {/* Big yellow total */}
      <div style={{ margin: '0 14px', padding: 28, borderRadius: 32, background: TH.yellow, color: TH.black }}>
        <span style={{ fontFamily: TH.mono, fontSize: 11, fontWeight: 700, letterSpacing: '0.16em' }}>NET TO YOU</span>
        <div style={{ display: 'flex', alignItems: 'baseline', marginTop: 8 }}>
          <span style={{ fontFamily: TH.mono, fontSize: 36, fontWeight: 700, color: TH.black }}>$</span>
          <span style={{ fontFamily: TH.display, fontSize: 120, lineHeight: 0.82, color: TH.black, letterSpacing: '-0.04em' }}>{totalTake}</span>
        </div>
        <div style={{ display: 'flex', gap: 18, marginTop: 16, fontFamily: TH.mono, fontSize: 12 }}>
          <span><strong>{sessions.length}</strong> sessions</span>
          <span><strong>{sessions.reduce((a,s)=>a+s.spots,0)}</strong> spots filled</span>
          <span><strong>+23%</strong> vs last</span>
        </div>
      </div>

      {/* Breakdown */}
      <div style={{ padding: '24px 22px 8px' }}>
        <h3 style={{ fontFamily: TH.title, fontSize: 22, margin: 0, fontWeight: 700}}>Breakdown</h3>
      </div>
      <div style={{ margin: '0 14px', padding: '0', borderRadius: 28, background: '#FFFFFF', border: H_CARD, overflow: 'hidden' }}>
        {sessions.map((s, i) => (
          <div key={i} style={{
            padding: '16px 18px',
            borderBottom: i < sessions.length - 1 ? '1px solid rgba(26,26,26,0.08)' : 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10,
          }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{s.name}</div>
              <div style={{ fontFamily: TH.mono, fontSize: 11, color: TH.textDim, marginTop: 4 }}>
                {s.spots} SPOTS × ${s.perSpot}/SPOT
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: TH.mono, fontSize: 16, fontWeight: 700 }}>${s.take}</div>
              <div style={{ fontFamily: TH.mono, fontSize: 10, color: TH.textDim, marginTop: 2 }}>fee ${s.fee}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Fee transparency note */}
      <div style={{ margin: '14px 14px 0', padding: 18, borderRadius: 24, background: TH.cream, border: `1.5px dashed rgba(26,26,26,0.20)`, display: 'flex', gap: 12 }}>
        <span style={{ fontSize: 22 }}>💯</span>
        <div style={{ fontSize: 13, lineHeight: 1.4 }}>
          <strong>$20 + GST per session</strong>, never a percentage. Total fees this month: <strong>${sessions.length * 23}</strong>.
        </div>
      </div>

      <div style={{ padding: '20px 14px 0', display: 'flex', gap: 10 }}>
        <PillButton variant="ghostDark" size="md" style={{ flex: 1 }}>Edit bank</PillButton>
        <PillButton variant="dark" size="md" style={{ flex: 1 }}>⤓ Download statement</PillButton>
      </div>
    </div>
  );
}

Object.assign(window, {
  ScreenApply, ScreenAddSession, ScreenManageSession,
  ScreenFloorNotMet, ScreenHostInbox, ScreenPayout,
});

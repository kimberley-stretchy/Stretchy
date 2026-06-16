// Stretchy — additional attendee screens (A0 onboarding, 05 social stretch,
// A6 rate it, A7 notifications, A8 suggest, A9 profile).

const TA = STRETCHY;
const CARD_B = '1.5px solid rgba(26,26,26,0.08)';
const HAIR = '1.5px solid rgba(26,26,26,0.10)';

// ════════════════════════════════════════════════════════════════
// A0 — ONBOARDING (signup → preferences → payment → land on Home)
// Shown here as a single tall flow with all four steps visible.
// ════════════════════════════════════════════════════════════════
function ScreenOnboarding() {
  const step = 3; // currently on step 3 of 4
  return (
    <div data-screen-label="A0 Onboarding" style={{
      background: TA.cream, color: TA.black, minHeight: '100%',
      fontFamily: TA.body, paddingBottom: 100,
    }}>
      <TopBar
        backable
        center={
          <div style={{ display: 'flex', gap: 6 }}>
            {[1,2,3,4].map(n => (
              <div key={n} style={{
                width: 28, height: 6, borderRadius: 999,
                background: n <= step ? TA.black : 'rgba(26,26,26,0.14)',
              }} />
            ))}
          </div>
        }
        right={<span style={{ fontFamily: TA.mono, fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: TA.textDim }}>SKIP</span>}
      />

      {/* hero */}
      <div style={{ padding: '20px 24px 24px' }}>
        <p style={{ fontFamily: TA.mono, fontSize: 11, letterSpacing: '0.20em', color: TA.textDim, margin: 0 }}>
          STEP {step} OF 4 · PAYMENT
        </p>
        <h1 style={{
          fontFamily: TA.title, fontWeight: 700, fontSize: 56, lineHeight: 0.9,
          letterSpacing: '-0.03em', margin: '12px 0 0'}}>
          Card on file.<br/>Nothing charged yet.
        </h1>
        <p style={{ margin: '16px 0 0', fontSize: 15, lineHeight: 1.4, color: TA.black }}>
          We hold your card so you can hold a place in one tap.
          You're only charged when your session is locked in — 2 hours before.
        </p>
      </div>

      {/* Card capture */}
      <div style={{ margin: '0 14px', padding: 20, borderRadius: 28, background: '#FFFFFF', border: CARD_B }}>
        <FormField label="CARD NUMBER" hint="4242 4242 4242 4242" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 14 }}>
          <FormField label="EXPIRY" hint="MM / YY" />
          <FormField label="CVC" hint="123" />
        </div>
        <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 10, padding: 12, borderRadius: 14, background: TA.cream }}>
          <span style={{ fontSize: 18 }}>🔒</span>
          <div style={{ fontSize: 12, lineHeight: 1.35, color: TA.textDim }}>
            <strong style={{ color: TA.black }}>Powered by Stripe.</strong>{' '}
            We never see your card. Holds are pre-authorisations only.
          </div>
        </div>
      </div>

      {/* Disclaimer A */}
      <div style={{ margin: '14px 14px 0', padding: 18, borderRadius: 24, background: TA.yellow, color: TA.black }}>
        <span style={{ fontFamily: TA.mono, fontSize: 10, fontWeight: 700, letterSpacing: '0.16em' }}>BEFORE YOU HOLD</span>
        <ul style={{ margin: '10px 0 0', padding: '0 0 0 18px', fontSize: 13, lineHeight: 1.5 }}>
          <li>Holding a place is free. You only pay if the session goes ahead.</li>
          <li>From 36 hours out, holds become locked-in bookings. No cancellations.</li>
          <li>Price locks 2 hours before — that's when your card is charged.</li>
        </ul>
      </div>

      <div style={{ padding: '20px 14px 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <PillButton variant="primary" style={{ width: '100%' }}>I agree · finish setup</PillButton>
        <PillButton variant="ghostDark" style={{ width: '100%' }}>Use Apple Pay / Google Pay instead</PillButton>
      </div>

      {/* previous step summary */}
      <div style={{ padding: '24px 22px 0' }}>
        <span style={{ fontFamily: TA.mono, fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', color: TA.textDim }}>EARLIER</span>
        <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            ['1', 'You', 'Marlee · marlee@email.com', true],
            ['2', 'Where you stretch', 'Grey Lynn · Pt Chev · Ponsonby', true],
            ['3', 'How to reach you', 'Push + SMS', true],
          ].map(([n, l, v, done]) => (
            <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', borderRadius: 16, background: '#FFFFFF', border: CARD_B }}>
              <span style={{
                width: 24, height: 24, borderRadius: 999, background: TA.green, color: '#FFFFFF',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: TA.mono, fontSize: 12, fontWeight: 700,
              }}>✓</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 700 }}>{l}</div>
                <div style={{ fontSize: 12, color: TA.textDim }}>{v}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// 05 — SOCIAL STRETCH (post-session community + tips)
// ════════════════════════════════════════════════════════════════
function ScreenSocialStretch() {
  return (
    <div data-screen-label="05 Social Stretch" style={{
      background: TA.cream, color: TA.black, minHeight: '100%',
      fontFamily: TA.body, paddingBottom: 100,
    }}>
      <TopBar backable center={<MenuPill dark={false}>JUST FINISHED</MenuPill>} />

      <div style={{ padding: '12px 22px 18px' }}>
        <p style={{ fontFamily: TA.mono, fontSize: 11, letterSpacing: '0.20em', color: TA.textDim, margin: 0 }}>
          SUNDAY SLOW FLOW · 60 MIN · DONE
        </p>
        <h1 style={{
          fontFamily: TA.title, fontWeight: 700, fontSize: 72, lineHeight: 0.92,
          letterSpacing: '-0.03em', margin: '10px 0 0'}}>
          Social<br/>stretch?
        </h1>
      </div>

      {/* host-arranged venue card */}
      <div style={{ margin: '0 14px', padding: 22, borderRadius: 28, background: TA.hotPink, color: TA.cream, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: -20, top: -10, opacity: 0.22 }}>
          <SMark size={160} color={TA.cream} />
        </div>
        <span style={{ fontFamily: TA.mono, fontSize: 11, fontWeight: 700, letterSpacing: '0.16em' }}>HOST IS HEADING TO</span>
        <h3 style={{ fontFamily: TA.title, fontSize: 36, margin: '8px 0 4px', fontWeight: 700, letterSpacing: '-0.02em' }}>
          Little Bird Café
        </h3>
        <div style={{ fontSize: 13, opacity: 0.85, marginBottom: 14 }}>Next door · pay your own way · open till 4pm</div>
        <div style={{ display: 'flex', gap: 8 }}>
          <PillButton variant="secondary" size="sm" style={{ flex: 1 }}>↗ Follow along</PillButton>
          <PillButton variant="ghost" size="sm" style={{ flex: 1 }}>Maybe next time</PillButton>
        </div>
      </div>

      {/* Say hi to someone new */}
      <div style={{ margin: '14px 14px 0', padding: 18, borderRadius: 24, background: '#FFFFFF', border: CARD_B }}>
        <span style={{ fontFamily: TA.mono, fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', color: TA.purple }}>SAY HI ✨</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 10 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 999,
            background: TA.sky,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: TA.display, color: TA.cream, fontSize: 24,
          }}>K</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 700, fontSize: 16 }}>Kit · Grey Lynn</div>
            <div style={{ fontSize: 12, color: TA.textDim }}>2nd Stretchy · into pilates too</div>
          </div>
          <PillButton variant="dark" size="sm">👋 Wave</PillButton>
        </div>
      </div>

      {/* Your Stretchy mates this month */}
      <div style={{ margin: '14px 14px 0', padding: 18, borderRadius: 24, background: '#FFFFFF', border: CARD_B }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <span style={{ fontFamily: TA.mono, fontSize: 11, fontWeight: 700, letterSpacing: '0.16em' }}>
            YOUR STRETCHY MATES THIS MONTH
          </span>
          <span style={{ fontFamily: TA.mono, fontSize: 14, fontWeight: 700, color: TA.hotPink }}>14</span>
        </div>
        <div style={{ display: 'flex', gap: -4 }}>
          {['K','S','M','A','J','R','T','L','P'].map((l, i) => {
            const colors = [TA.sky, TA.purple, TA.olive, TA.orange, TA.red, TA.royal, TA.hotPink, TA.green, TA.pink];
            return (
              <div key={i} style={{
                width: 36, height: 36, borderRadius: 999,
                background: colors[i % colors.length], color: '#FFFFFF',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: TA.display, fontSize: 14, marginLeft: i === 0 ? 0 : -8,
                border: `2px solid #FFFFFF`,
              }}>{l}</div>
            );
          })}
          <div style={{
            width: 36, height: 36, borderRadius: 999, background: TA.cream,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: TA.mono, fontSize: 11, fontWeight: 700, marginLeft: -8,
            border: `2px solid #FFFFFF`,
          }}>+5</div>
        </div>
      </div>

      {/* Tip the host / buy someone a coffee */}
      <div style={{ margin: '14px 14px 0', padding: 22, borderRadius: 28, background: TA.yellow, color: TA.black }}>
        <span style={{ fontFamily: TA.mono, fontSize: 11, fontWeight: 700, letterSpacing: '0.16em' }}>BUY SOMEONE A COFFEE ☕</span>
        <h3 style={{ fontFamily: TA.title, fontSize: 28, margin: '8px 0 12px', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 0.95 }}>
          Pay it<br/>forward.
        </h3>
        <p style={{ margin: '0 0 14px', fontSize: 13, lineHeight: 1.4 }}>
          Tip Tāne or shout a new mate a flat white at Little Bird.
        </p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {[['Tip Tāne $5', true], ['Tip $10', false], ['Tip $20', false]].map(([l, primary], i) => (
            <PillButton key={i} variant={primary ? 'dark' : 'ghostDark'} size="sm">{l}</PillButton>
          ))}
          <PillButton variant="ghostDark" size="sm">Custom</PillButton>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// A6 — RATE IT (5-S rating + vibe chips + photo)
// ════════════════════════════════════════════════════════════════
function ScreenRateIt() {
  return (
    <div data-screen-label="A6 Rate It" style={{
      background: TA.cream, color: TA.black, minHeight: '100%',
      fontFamily: TA.body, paddingBottom: 100,
    }}>
      <TopBar
        backable
        center={<MenuPill dark={false}>RATE THIS</MenuPill>}
        right={<span style={{ fontFamily: TA.mono, fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: TA.textDim }}>SKIP</span>}
      />

      <div style={{ padding: '12px 22px 18px' }}>
        <p style={{ fontFamily: TA.mono, fontSize: 11, letterSpacing: '0.20em', color: TA.textDim, margin: 0 }}>
          SUNDAY 9AM · GREY LYNN · TĀNE
        </p>
        <h1 style={{
          fontFamily: TA.title, fontWeight: 700, fontSize: 56, lineHeight: 0.9,
          letterSpacing: '-0.03em', margin: '12px 0 0'}}>
          How was<br/>Slow Flow?
        </h1>
      </div>

      {/* The S rating */}
      <div style={{ margin: '0 14px', padding: 22, borderRadius: 28, background: '#FFFFFF', border: CARD_B }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <span style={{ fontFamily: TA.mono, fontSize: 11, fontWeight: 700, letterSpacing: '0.16em' }}>TAP TO RATE</span>
          <span style={{ fontFamily: TA.mono, fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: TA.hotPink }}>SSSS — LOVED IT</span>
        </div>
        <SRating rated={4} size={56} />
      </div>

      {/* Vibe chips */}
      <div style={{ padding: '22px 22px 12px' }}>
        <h3 style={{ fontFamily: TA.title, fontSize: 22, margin: 0, fontWeight: 700, letterSpacing: '-0.01em' }}>
          What was the vibe?
        </h3>
      </div>
      <div style={{ padding: '0 14px', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {[
          ['Strong flow', true],
          ['Welcoming', true],
          ['Great music', false],
          ['Good cues', true],
          ['Punctual', false],
          ['Felt the connection', true],
          ['Loved the Social Stretch', true],
          ['Other', false],
        ].map(([label, selected], i) => (
          <Chip key={i} selected={selected} color={TA.hotPink}>{label}</Chip>
        ))}
      </div>

      {/* Note */}
      <div style={{ padding: '24px 14px 0' }}>
        <FormField label="A NOTE FOR TĀNE (OPTIONAL)" hint="Stays between you & them" multiline value="Loved the music today. Felt safe trying the headstand for the first time." />
      </div>

      {/* Photo slots */}
      <div style={{ padding: '14px 14px 0' }}>
        <span style={{ fontFamily: TA.mono, fontSize: 10, fontWeight: 700, letterSpacing: '0.16em' }}>ADD A PHOTO OR VIDEO (OPTIONAL)</span>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginTop: 10 }}>
          {[0,1,2].map(i => (
            <div key={i} style={{
              aspectRatio: '1', borderRadius: 18, background: '#FFFFFF',
              border: '1.5px dashed rgba(26,26,26,0.25)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: TA.textDim, fontFamily: TA.mono, fontSize: 11,
            }}>＋</div>
          ))}
        </div>
        <label style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 12, fontSize: 12, color: TA.textDim }}>
          <div style={{ width: 18, height: 18, borderRadius: 5, border: `1.5px solid ${TA.black}` }} />
          OK to use my photo / video in Stretchy social
        </label>
      </div>

      <div style={{ padding: '20px 14px 0' }}>
        <PillButton variant="primary" style={{ width: '100%' }}>Send rating</PillButton>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// A7 — NOTIFICATIONS
// ════════════════════════════════════════════════════════════════
function ScreenNotifications() {
  const filters = ['ALL', 'UNREAD', 'ACTION', 'CONFIRMED', 'UPDATES'];
  return (
    <div data-screen-label="A7 Notifications" style={{
      background: TA.cream, color: TA.black, minHeight: '100%',
      fontFamily: TA.body, paddingBottom: 100,
    }}>
      <TopBar backable center={<MenuPill dark={false}>INBOX · 4 NEW</MenuPill>} />

      <div style={{ padding: '12px 22px 18px' }}>
        <h1 style={{
          fontFamily: TA.title, fontWeight: 700, fontSize: 56, lineHeight: 0.9,
          letterSpacing: '-0.03em', margin: 0}}>
          What's<br/>moving.
        </h1>
      </div>

      {/* filter chips */}
      <div style={{ display: 'flex', gap: 8, padding: '0 22px 16px', overflow: 'auto' }}>
        {filters.map((f, i) => (
          <span key={f} style={{
            padding: '8px 14px', borderRadius: 999, whiteSpace: 'nowrap',
            background: i === 0 ? TA.black : '#FFFFFF',
            color: i === 0 ? TA.cream : TA.black,
            border: i === 0 ? 'none' : HAIR,
            fontFamily: TA.mono, fontSize: 11, fontWeight: 700, letterSpacing: '0.10em',
          }}>{f}</span>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '0 14px' }}>
        <NotificationCard kind="dropping" unread
          title="Sunday Slow Flow just hit minimum"
          body="Price is dropping live — every new mate brings it down. $24 now, was $28."
          time="2m ago"
        >
          <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
            <PillButton variant="dark" size="sm">+ Bring a mate</PillButton>
            <PillButton variant="ghostDark" size="sm">View</PillButton>
          </div>
        </NotificationCard>

        <NotificationCard kind="almostFull" unread
          title="⚡ Pt Chev Sunrise — last 2 spots"
          body="9 of 10 held. Share to drop the price further before doors close."
          time="14m ago"
        />

        <NotificationCard kind="confirmed" unread
          title="Herne Bay Breath — going ahead"
          body="Locked in at $19. Wed 7pm. Add to calendar →"
          time="1h ago"
        />

        <NotificationCard kind="action" unread
          title="Rate Saturday's Slow Flow"
          body="Took 30 seconds last time."
          time="3h ago"
        />

        <NotificationCard kind="update"
          title="Price dropped on Herne Bay Breath"
          body="$23 → $19. You're saving $9 vs the start."
          time="Yesterday"
        />

        <NotificationCard kind="update"
          title="New session near you: K Rd Sound Bath"
          body="Fri 8pm · Rua O. · from $42"
          time="Yesterday"
        />
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// A8 — SUGGEST A STRETCHY
// ════════════════════════════════════════════════════════════════
function ScreenSuggest() {
  const suggestions = [
    { name: 'Sunset HIIT at the viaduct', type: 'hiit', votes: 47, hot: true },
    { name: 'Te Atatū Sunday yoga', type: 'yoga', votes: 32, hot: true },
    { name: 'Run-then-stretch club, Ponsonby', type: 'run', votes: 28, hot: false },
    { name: 'Lunch pilates in the CBD', type: 'pilates', votes: 19, hot: false },
    { name: 'Cold plunge + sound bath', type: 'sound', votes: 14, hot: false },
  ];
  return (
    <div data-screen-label="A8 Suggest" style={{
      background: TA.cream, color: TA.black, minHeight: '100%',
      fontFamily: TA.body, paddingBottom: 100,
    }}>
      <TopBar backable center={<MenuPill dark={false}>SUGGEST</MenuPill>} />

      <div style={{ padding: '12px 22px 18px' }}>
        <h1 style={{
          fontFamily: TA.title, fontWeight: 700, fontSize: 56, lineHeight: 0.9,
          letterSpacing: '-0.03em', margin: 0}}>
          Float a<br/>Stretchy.
        </h1>
        <p style={{ margin: '14px 0 0', fontSize: 14, color: TA.textDim, maxWidth: 320 }}>
          Toss a session idea into the wild. Hosts watch this list — popular ones get picked up.
        </p>
      </div>

      {/* Suggest your own */}
      <div style={{ margin: '0 14px', padding: 20, borderRadius: 28, background: TA.purple, color: TA.cream }}>
        <span style={{ fontFamily: TA.mono, fontSize: 11, fontWeight: 700, letterSpacing: '0.16em' }}>YOUR SUGGESTION</span>
        <h3 style={{ fontFamily: TA.title, fontSize: 26, margin: '8px 0 14px', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 0.95 }}>
          What do you<br/>wish existed?
        </h3>
        <div style={{ display: 'grid', gap: 10 }}>
          <FormField label="TYPE">
            <div style={{
              background: 'rgba(245,237,227,0.18)', color: TA.cream, borderRadius: 14,
              padding: '12px 16px', fontFamily: TA.body, fontSize: 14, fontWeight: 600,
              display: 'flex', justifyContent: 'space-between',
            }}><span>Sunset HIIT</span><span>▾</span></div>
          </FormField>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <FormField label="WHEN">
              <div style={{ background: 'rgba(245,237,227,0.18)', color: TA.cream, borderRadius: 14, padding: '12px 16px', fontFamily: TA.body, fontSize: 14 }}>
                Sun 6pm
              </div>
            </FormField>
            <FormField label="WHERE">
              <div style={{ background: 'rgba(245,237,227,0.18)', color: TA.cream, borderRadius: 14, padding: '12px 16px', fontFamily: TA.body, fontSize: 14 }}>
                Viaduct
              </div>
            </FormField>
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, marginTop: 4 }}>
            <div style={{ width: 18, height: 18, borderRadius: 5, background: TA.yellow, color: TA.black, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>✓</div>
            Let me know if this Stretchy happens
          </label>
          <PillButton variant="secondary" style={{ width: '100%', marginTop: 6 }}>Float it</PillButton>
        </div>
      </div>

      {/* Community list */}
      <div style={{ padding: '24px 22px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <h3 style={{ fontFamily: TA.title, fontSize: 22, margin: 0, fontWeight: 700}}>What the community wants</h3>
        <span style={{ fontFamily: TA.mono, fontSize: 11, color: TA.textDim, letterSpacing: '0.08em' }}>{suggestions.length} LIVE</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '0 14px' }}>
        {suggestions.map((s, i) => {
          const m = MOVEMENT[s.type];
          return (
            <div key={i} style={{
              padding: 16, borderRadius: 20, background: '#FFFFFF', border: CARD_B,
              display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <MovementTile type={s.type} size={44} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 14, lineHeight: 1.2 }}>{s.name}</div>
                <div style={{ fontFamily: TA.mono, fontSize: 11, color: TA.textDim, marginTop: 4, letterSpacing: '0.08em' }}>
                  {m.label} {s.hot && <span style={{ color: TA.hotPink, marginLeft: 6 }}>● HOT</span>}
                </div>
              </div>
              <button style={{
                display: 'flex', alignItems: 'center', gap: 4,
                padding: '8px 12px', borderRadius: 999, border: `1.5px solid ${i < 2 ? TA.hotPink : 'rgba(26,26,26,0.18)'}`,
                background: i < 2 ? TA.hotPink + '15' : 'transparent',
                color: i < 2 ? TA.hotPink : TA.black,
                fontFamily: TA.mono, fontSize: 12, fontWeight: 700,
              }}>
                {i < 2 ? '✓' : '+'} {s.votes}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// A9 — PROFILE
// ════════════════════════════════════════════════════════════════
function ScreenProfile() {
  return (
    <div data-screen-label="A9 Profile" style={{
      background: TA.cream, color: TA.black, minHeight: '100%',
      fontFamily: TA.body, paddingBottom: 100,
    }}>
      <TopBar
        backable
        center={<MenuPill dark={false}>PROFILE</MenuPill>}
        right={
          <button style={{
            width: 40, height: 40, borderRadius: 999, border: 'none',
            background: 'rgba(26,26,26,0.06)', color: TA.black, fontSize: 16,
          }}>⚙</button>
        }
      />

      {/* identity */}
      <div style={{ padding: '8px 22px 0', display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{
          width: 80, height: 80, borderRadius: 999,
          background: TA.hotPink,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: TA.display, color: TA.cream, fontSize: 36,
        }}>M</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h1 style={{ fontFamily: TA.title, fontSize: 32, margin: 0, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 0.95 }}>
            Marlee F.
          </h1>
          <div style={{ fontSize: 13, color: TA.textDim, marginTop: 4 }}>Grey Lynn · joined Feb '26</div>
        </div>
      </div>

      {/* stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, padding: '20px 14px 0' }}>
        <div style={{ background: '#FFFFFF', padding: 18, borderRadius: 24, border: CARD_B }}>
          <span style={{ fontFamily: TA.mono, fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', color: TA.textDim }}>SESSIONS</span>
          <div style={{ fontFamily: TA.display, fontSize: 48, lineHeight: 0.85, marginTop: 4, letterSpacing: '-0.03em' }}>27</div>
        </div>
        <div style={{ background: TA.purple, color: TA.cream, padding: 18, borderRadius: 24 }}>
          <span style={{ fontFamily: TA.mono, fontSize: 10, fontWeight: 700, letterSpacing: '0.14em' }}>MATES MET</span>
          <div style={{ fontFamily: TA.display, fontSize: 48, lineHeight: 0.85, marginTop: 4, letterSpacing: '-0.03em' }}>41</div>
        </div>
      </div>

      {/* upcoming with split */}
      <div style={{ padding: '22px 22px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <h3 style={{ fontFamily: TA.title, fontSize: 22, margin: 0, fontWeight: 700}}>Upcoming</h3>
        <div style={{ display: 'flex', gap: 6 }}>
          <span style={{ padding: '6px 12px', borderRadius: 999, background: TA.black, color: TA.cream, fontFamily: TA.mono, fontSize: 11, fontWeight: 700, letterSpacing: '0.10em' }}>HELD · 2</span>
          <span style={{ padding: '6px 12px', borderRadius: 999, background: TA.green, color: TA.cream, fontFamily: TA.mono, fontSize: 11, fontWeight: 700, letterSpacing: '0.10em' }}>CONFIRMED · 1</span>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '0 14px' }}>
        {/* HELD */}
        <div style={{ padding: 16, borderRadius: 24, background: '#FFFFFF', border: CARD_B, display: 'flex', alignItems: 'center', gap: 12 }}>
          <MovementTile type="yoga" size={44} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 700, fontSize: 15 }}>Sunday Slow Flow</div>
            <div style={{ fontSize: 12, color: TA.textDim }}>SUN 31 · 9:00 · Grey Lynn</div>
          </div>
          <span style={{ fontFamily: TA.mono, fontSize: 11, padding: '6px 10px', borderRadius: 999, background: TA.hold + '40', color: '#3F7B8E', fontWeight: 700, letterSpacing: '0.08em' }}>● HOLD</span>
        </div>
        <div style={{ padding: 16, borderRadius: 24, background: '#FFFFFF', border: CARD_B, display: 'flex', alignItems: 'center', gap: 12 }}>
          <MovementTile type="pilates" size={44} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 700, fontSize: 15 }}>Ponsonby Pilates</div>
            <div style={{ fontSize: 12, color: TA.textDim }}>THU 28 · 6:30 · Ponsonby</div>
          </div>
          <span style={{ fontFamily: TA.mono, fontSize: 11, padding: '6px 10px', borderRadius: 999, background: TA.hold + '40', color: '#3F7B8E', fontWeight: 700, letterSpacing: '0.08em' }}>● HOLD</span>
        </div>
        {/* CONFIRMED */}
        <div style={{ padding: 16, borderRadius: 24, background: '#FFFFFF', border: `2px solid ${TA.green}`, display: 'flex', alignItems: 'center', gap: 12 }}>
          <MovementTile type="breath" size={44} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 700, fontSize: 15 }}>Herne Bay Breath</div>
            <div style={{ fontSize: 12, color: TA.textDim }}>WED 27 · 7:00 PM · $19 locked</div>
          </div>
          <span style={{ fontFamily: TA.mono, fontSize: 11, padding: '6px 10px', borderRadius: 999, background: TA.green, color: TA.cream, fontWeight: 700, letterSpacing: '0.08em' }}>● GOING</span>
        </div>
      </div>

      {/* settings list */}
      <div style={{ padding: '24px 14px 0' }}>
        <div style={{ background: '#FFFFFF', borderRadius: 24, border: CARD_B, overflow: 'hidden' }}>
          {['Payment method', 'Notifications', 'Neighbourhoods', 'Help & FAQs', 'Sign out'].map((l, i, arr) => (
            <div key={i} style={{
              padding: '16px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              borderBottom: i < arr.length - 1 ? '1px solid rgba(26,26,26,0.06)' : 'none',
              fontSize: 14, fontWeight: 600,
            }}>
              <span>{l}</span>
              <span style={{ color: TA.textDim }}>›</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, {
  ScreenOnboarding, ScreenSocialStretch, ScreenRateIt,
  ScreenNotifications, ScreenSuggest, ScreenProfile,
});

// Stretchy — auth + onboarding intro screens.
// A0a Welcome (bold green), A0b Sign Up, A0c Preferences,
// Login Attendee (bold yellow), Login Host (bold purple).
// Get-in screens have no S in the top bar — the large S IS the first branded moment.

const TX = STRETCHY;
const X_CARD = '1.5px solid rgba(26,26,26,0.08)';
const X_HAIR = '1.5px solid rgba(26,26,26,0.10)';

// ════════════════════════════════════════════════════════════════
// A0a — WELCOME / LAND ON STRETCHY (bold olive green)
// ════════════════════════════════════════════════════════════════
function ScreenWelcome() {
  return (
    <div data-screen-label="A0a Welcome" style={{
      background: TX.olive, color: TX.cream, minHeight: '100%',
      fontFamily: TX.body, paddingBottom: 80, position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ height: 6 }} />

      {/* Huge S — first branded moment */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '36px 24px 0' }}>
        <SMark size={180} color={TX.cream} />
      </div>

      <div style={{ padding: '28px 24px 0', textAlign: 'center' }}>
        <h1 style={{
          fontFamily: TX.title, fontWeight: 700, fontSize: 60, lineHeight: 0.92,
          letterSpacing: '-0.03em', margin: 0,
        }}>
          A social<br/>movement.
        </h1>
        <p style={{ margin: '18px auto 0', fontSize: 16, lineHeight: 1.4, color: TX.cream, opacity: 0.92, maxWidth: 320 }}>
          The larger the group gets, the better value for all. Join us.
        </p>
      </div>

      {/* CTAs */}
      <div style={{ padding: '40px 14px 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <PillButton variant="secondary" style={{
          width: '100%', justifyContent: 'space-between',
          padding: '22px 28px', height: 70,
        }}>
          <span style={{ fontFamily: TX.body, fontSize: 17, fontWeight: 700 }}>I'm new — sign up</span>
          <span style={{ fontSize: 20 }}>→</span>
        </PillButton>
        <PillButton variant="dark" style={{
          width: '100%', justifyContent: 'space-between',
          padding: '20px 28px', height: 62,
        }}>
          <span style={{ fontFamily: TX.body, fontSize: 16, fontWeight: 700 }}>I have an account — log in</span>
          <span style={{ fontSize: 18 }}>→</span>
        </PillButton>
      </div>

      {/* footer */}
      <div style={{ padding: '32px 24px 0', textAlign: 'center', fontFamily: TX.mono, fontSize: 11, color: TX.cream, opacity: 0.7, letterSpacing: '0.10em' }}>
        AUCKLAND · 187 SESSIONS THIS MONTH · 1,847 MATES
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// A0b — SIGN UP (name + email/phone + socials)
// ════════════════════════════════════════════════════════════════
function ScreenSignup() {
  return (
    <div data-screen-label="A0b Sign Up" style={{
      background: TX.cream, color: TX.black, minHeight: '100%',
      fontFamily: TX.body, paddingBottom: 100,
    }}>
      <TopBar
        backable
        center={
          <div style={{ display: 'flex', gap: 6 }}>
            {[1,2,3,4].map(n => (
              <div key={n} style={{
                width: 28, height: 6, borderRadius: 999,
                background: n <= 1 ? TX.black : 'rgba(26,26,26,0.14)',
              }} />
            ))}
          </div>
        }
      />

      <div style={{ padding: '20px 24px 24px' }}>
        <p style={{ fontFamily: TX.mono, fontSize: 11, letterSpacing: '0.20em', color: TX.textDim, margin: 0 }}>
          STEP 1 OF 4 · YOU
        </p>
        <h1 style={{
          fontFamily: TX.title, fontWeight: 700, fontSize: 44, lineHeight: 0.95,
          letterSpacing: '-0.02em', margin: '12px 0 0',
        }}>
          What should we<br/>call you?
        </h1>
      </div>

      <div style={{ padding: '0 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <PillButton variant="dark" style={{ width: '100%', height: 56 }}>
          <span style={{ marginRight: 10, fontSize: 17 }}></span> Continue with Apple
        </PillButton>
        <PillButton variant="ghostDark" style={{ width: '100%', height: 56 }}>
          <span style={{ marginRight: 10, fontSize: 16 }}>G</span> Continue with Google
        </PillButton>
      </div>

      <div style={{
        display: 'flex', alignItems: 'center', gap: 14, margin: '22px 28px',
        fontFamily: TX.mono, fontSize: 11, color: TX.textDim, letterSpacing: '0.14em',
      }}>
        <div style={{ flex: 1, height: 1, background: 'rgba(26,26,26,0.15)' }} />
        <span>OR</span>
        <div style={{ flex: 1, height: 1, background: 'rgba(26,26,26,0.15)' }} />
      </div>

      <div style={{ padding: '0 14px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <FormField label="YOUR NAME" value="Marlee Fisher" />
        <FormField label="EMAIL" value="marlee@email.co.nz" />
        <FormField label="OR MOBILE (FOR SMS NUDGES)" hint="+64 …" />
      </div>

      <p style={{ margin: '20px 24px 0', fontSize: 12, color: TX.textDim, lineHeight: 1.4 }}>
        By continuing you agree to the <strong style={{ color: TX.black }}>Stretchy terms</strong>. We'll never share your details with hosts beyond first name.
      </p>

      <div style={{ padding: '20px 14px 0' }}>
        <PillButton variant="primary" style={{ width: '100%' }}>Continue →</PillButton>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// A0c — PREFERENCES (neighbourhoods + notifications, one screen)
// ════════════════════════════════════════════════════════════════
function ScreenPreferences() {
  const hoods = [
    ['Grey Lynn', true], ['Pt Chev', true], ['Ponsonby', false], ['Herne Bay', false],
    ['Mt Eden', false], ['Karangahape', true], ['Westmere', false], ['Kingsland', false],
    ['CBD', false], ['Devonport', false], ['Takapuna', false],
  ];
  const types = [
    ['Yoga', 'yoga', true], ['Pilates', 'pilates', true], ['Breath', 'breath', false],
    ['Sound', 'sound', true], ['HIIT', 'hiit', false], ['Run', 'run', false],
  ];

  return (
    <div data-screen-label="A0c Preferences" style={{
      background: TX.cream, color: TX.black, minHeight: '100%',
      fontFamily: TX.body, paddingBottom: 100,
    }}>
      <TopBar
        backable
        center={
          <div style={{ display: 'flex', gap: 6 }}>
            {[1,2,3,4].map(n => (
              <div key={n} style={{
                width: 28, height: 6, borderRadius: 999,
                background: n <= 2 ? TX.black : 'rgba(26,26,26,0.14)',
              }} />
            ))}
          </div>
        }
        right={<span style={{ fontFamily: TX.mono, fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: TX.textDim }}>SKIP</span>}
      />

      <div style={{ padding: '20px 24px 18px' }}>
        <p style={{ fontFamily: TX.mono, fontSize: 11, letterSpacing: '0.20em', color: TX.textDim, margin: 0 }}>
          STEP 2 OF 4 · WHERE & WHAT
        </p>
        <h1 style={{
          fontFamily: TX.title, fontWeight: 700, fontSize: 44, lineHeight: 0.95,
          letterSpacing: '-0.02em', margin: '12px 0 0',
        }}>
          Tune your<br/>weekly drop.
        </h1>
        <p style={{ margin: '12px 0 0', fontSize: 14, color: TX.textDim }}>
          We'll only show what's in your suburbs and the formats you love. Skip if you want everything.
        </p>
      </div>

      <div style={{ padding: '0 22px' }}>
        <h3 style={{ fontFamily: TX.title, fontWeight: 700, fontSize: 18, margin: 0 }}>Neighbourhoods</h3>
      </div>
      <div style={{ padding: '12px 14px 0', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {hoods.map(([n, sel], i) => (
          <Chip key={i} selected={sel} color={TX.hotPink}>{n}</Chip>
        ))}
      </div>

      <div style={{ padding: '24px 22px 0' }}>
        <h3 style={{ fontFamily: TX.title, fontWeight: 700, fontSize: 18, margin: 0 }}>Movement</h3>
      </div>
      <div style={{ padding: '12px 14px 0', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {types.map(([label, type, sel], i) => {
          const m = MOVEMENT[type];
          return (
            <Chip key={i} selected={sel} color={m.color}>{label}</Chip>
          );
        })}
      </div>

      <div style={{ padding: '24px 22px 0' }}>
        <h3 style={{ fontFamily: TX.title, fontWeight: 700, fontSize: 18, margin: 0 }}>How to reach you</h3>
      </div>
      <div style={{ margin: '12px 14px 0', borderRadius: 24, background: '#FFFFFF', border: X_CARD, overflow: 'hidden' }}>
        {[
          ['Push notifications', 'Price drops, confirmations, locks', true],
          ['SMS (text)', 'For the can\'t-miss-this stuff', true],
          ['Email', 'Weekly digest, receipts', false],
        ].map(([title, sub, on], i, arr) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px',
            borderBottom: i < arr.length - 1 ? '1px solid rgba(26,26,26,0.06)' : 'none',
          }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{title}</div>
              <div style={{ fontSize: 12, color: TX.textDim, marginTop: 2 }}>{sub}</div>
            </div>
            <div style={{
              width: 44, height: 26, borderRadius: 999,
              background: on ? TX.hotPink : 'rgba(26,26,26,0.18)',
              position: 'relative',
            }}>
              <div style={{
                position: 'absolute', top: 3, left: on ? 21 : 3,
                width: 20, height: 20, borderRadius: 999, background: '#FFFFFF',
                transition: 'left .15s',
              }} />
            </div>
          </div>
        ))}
      </div>

      <div style={{ padding: '20px 14px 0' }}>
        <PillButton variant="primary" style={{ width: '100%' }}>Continue → payment</PillButton>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// Shared Login layout with a bold colour wash + role tabs.
// Attendee → yellow. Host → purple.
// ════════════════════════════════════════════════════════════════
function LoginScreen({ role = 'attendee' }) {
  const isHost = role === 'host';
  const bg = isHost ? TX.purple : TX.yellow;
  const fg = isHost ? TX.cream : TX.black;
  const tagline = isHost ? 'Run your room.' : 'Hold your place.';
  const subline = isHost
    ? 'Your roster, your target, your payouts.'
    : 'Your sessions, your mates, your price.';

  // muted overlay colours that work on the bold bg
  const cardBg = isHost ? 'rgba(245,237,227,0.10)' : 'rgba(26,26,26,0.08)';
  const tabActiveBg = isHost ? TX.cream : TX.black;
  const tabActiveFg = isHost ? TX.black : TX.cream;
  const inputBg = isHost ? 'rgba(245,237,227,0.12)' : 'rgba(255,255,255,0.55)';
  const inputBorder = isHost ? 'rgba(245,237,227,0.30)' : 'rgba(26,26,26,0.18)';

  return (
    <div data-screen-label={isHost ? 'Login · Host' : 'Login · Attendee'} style={{
      background: bg, color: fg, minHeight: '100%',
      fontFamily: TX.body, paddingBottom: 100, position: 'relative', overflow: 'hidden',
    }}>
      {/* No S in top bar — the bold wash IS the brand here */}
      <TopBar
        left={
          <button style={{
            width: 36, height: 36, borderRadius: 999, border: 'none',
            background: cardBg, color: fg, fontSize: 16, cursor: 'pointer',
          }}>←</button>
        }
        center={
          <span style={{
            fontFamily: TX.mono, fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', color: fg, opacity: 0.85,
          }}>LOG IN</span>
        }
        right={<div style={{ width: 36 }} />}
      />

      {/* Role tabs */}
      <div style={{ padding: '12px 14px 0' }}>
        <div style={{
          display: 'flex', padding: 4, borderRadius: 999, background: cardBg,
          border: `1.5px solid ${inputBorder}`, gap: 4,
        }}>
          <button style={{
            flex: 1, padding: '12px 16px', borderRadius: 999, border: 'none',
            background: !isHost ? tabActiveBg : 'transparent',
            color: !isHost ? tabActiveFg : fg,
            fontFamily: TX.body, fontSize: 13, fontWeight: 700, letterSpacing: '0.04em',
            cursor: 'pointer', opacity: !isHost ? 1 : 0.8,
          }}>
            I'M HERE TO MOVE
          </button>
          <button style={{
            flex: 1, padding: '12px 16px', borderRadius: 999, border: 'none',
            background: isHost ? tabActiveBg : 'transparent',
            color: isHost ? tabActiveFg : fg,
            fontFamily: TX.body, fontSize: 13, fontWeight: 700, letterSpacing: '0.04em',
            cursor: 'pointer', opacity: isHost ? 1 : 0.8,
          }}>
            I'M HOSTING
          </button>
        </div>
        <p style={{ margin: '10px 8px 0', fontSize: 11, color: fg, opacity: 0.75, textAlign: 'center', lineHeight: 1.4 }}>
          Some people are both. Either log-in unlocks the same account.
        </p>
      </div>

      {/* hero */}
      <div style={{ padding: '32px 24px 0' }}>
        <p style={{ fontFamily: TX.mono, fontSize: 11, letterSpacing: '0.20em', color: fg, opacity: 0.75, margin: 0 }}>
          WELCOME BACK
        </p>
        <h1 style={{
          fontFamily: TX.title, fontWeight: 700, fontSize: 52, lineHeight: 0.95,
          letterSpacing: '-0.02em', margin: '10px 0 0',
        }}>
          {tagline}
        </h1>
        <p style={{ margin: '12px 0 0', fontSize: 15, color: fg, opacity: 0.85, maxWidth: 320 }}>
          {subline}
        </p>
      </div>

      {/* social auth */}
      <div style={{ padding: '24px 14px 0', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <PillButton variant="dark" style={{ width: '100%', height: 56 }}>
          <span style={{ marginRight: 10, fontSize: 17 }}></span> Continue with Apple
        </PillButton>
        <PillButton variant="secondary" style={{ width: '100%', height: 56 }}>
          <span style={{ marginRight: 10, fontSize: 16 }}>G</span> Continue with Google
        </PillButton>
      </div>

      <div style={{
        display: 'flex', alignItems: 'center', gap: 14, margin: '22px 28px',
        fontFamily: TX.mono, fontSize: 11, color: fg, opacity: 0.7, letterSpacing: '0.14em',
      }}>
        <div style={{ flex: 1, height: 1, background: fg, opacity: 0.3 }} />
        <span>OR EMAIL</span>
        <div style={{ flex: 1, height: 1, background: fg, opacity: 0.3 }} />
      </div>

      {/* email form on coloured bg */}
      <div style={{ padding: '0 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label style={{ fontFamily: TX.mono, fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', color: fg, opacity: 0.85 }}>EMAIL</label>
          <div style={{
            background: inputBg, color: fg, border: `1.5px solid ${inputBorder}`,
            borderRadius: 16, padding: '12px 16px',
            fontFamily: TX.body, fontSize: 14, opacity: 0.8,
          }}>
            you@email.co.nz
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label style={{ fontFamily: TX.mono, fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', color: fg, opacity: 0.85 }}>OR MOBILE</label>
          <div style={{
            background: inputBg, color: fg, border: `1.5px solid ${inputBorder}`,
            borderRadius: 16, padding: '12px 16px',
            fontFamily: TX.body, fontSize: 14, opacity: 0.6,
          }}>
            +64 …
          </div>
        </div>
      </div>

      <div style={{ padding: '20px 14px 0' }}>
        <PillButton variant={isHost ? 'secondary' : 'dark'} style={{ width: '100%' }}>
          Send me a magic link
        </PillButton>
        <p style={{ margin: '14px 14px 0', fontSize: 12, color: fg, opacity: 0.75, textAlign: 'center', lineHeight: 1.4 }}>
          No password to remember. Tap the link — you're in.
        </p>
      </div>

      {isHost && (
        <div style={{ margin: '24px 14px 0', padding: 16, borderRadius: 20, background: TX.cream, color: TX.black, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
          <div style={{ fontSize: 13 }}>Not vetted yet? <strong>Apply to host →</strong></div>
          <span style={{ fontSize: 18 }}>→</span>
        </div>
      )}
    </div>
  );
}

function ScreenLoginAttendee() { return <LoginScreen role="attendee" />; }
function ScreenLoginHost()     { return <LoginScreen role="host" />; }

Object.assign(window, {
  ScreenWelcome, ScreenSignup, ScreenPreferences,
  ScreenLoginAttendee, ScreenLoginHost,
});

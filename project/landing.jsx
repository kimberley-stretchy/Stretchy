// Stretchy — marketing landing page.
// Reuses the real app screen components (ScreenHome, ScreenSessionDetail, …)
// inside live phone frames so the page doubles as a front-end for exploring the app.

const L = STRETCHY;
const { useState: useS, useRef: useR, useEffect: useE } = React;

// ─────────────────────────────────────────────────────────────
// Shared layout helpers
// ─────────────────────────────────────────────────────────────
const MAXW = 1180;

function Section({ id, bg = L.cream, fg = L.black, children, style = {} }) {
  return (
    <section id={id} style={{ background: bg, color: fg, padding: '0', ...style }}>
      <div style={{ maxWidth: MAXW, margin: '0 auto', padding: '0 24px' }}>
        {children}
      </div>
    </section>
  );
}

function Eyebrow({ children, color = L.olive }) {
  return (
    <div style={{
      fontFamily: L.mono, fontSize: 12, fontWeight: 700, letterSpacing: '0.22em',
      textTransform: 'uppercase', color, marginBottom: 18,
      display: 'inline-flex', alignItems: 'center', gap: 10,
    }}>
      <span style={{ width: 22, height: 2, background: color, display: 'inline-block' }} />
      {children}
    </div>
  );
}

// A scaled live phone — renders a real app screen inside the iOS bezel.
function LivePhone({ screen, scale = 0.62, menuOpen = false, menuTab = 'attendee' }) {
  const W = 402, H = 874;
  return (
    <div style={{ width: W * scale, height: H * scale, flexShrink: 0 }}>
      <div style={{ width: W, height: H, transform: `scale(${scale})`, transformOrigin: 'top left' }}>
        <IOSDevice width={W} height={H} dark={false}>
          <MenuProvider initialOpen={menuOpen}>
            <div style={{ position: 'relative', minHeight: '100%', paddingTop: 54 }}>
              {screen}
              <MenuOverlay defaultTab={menuTab} />
            </div>
          </MenuProvider>
        </IOSDevice>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// EXPLORE THE APP — when embedded in the flow this switches to the
// design-canvas view; standalone it follows the link to the flow file.
// ─────────────────────────────────────────────────────────────
function goExplore(e) {
  if (typeof window !== 'undefined' && window.__stretchyOnExplore) {
    e.preventDefault();
    window.__stretchyOnExplore();
  }
}

// ─────────────────────────────────────────────────────────────
// NAV
// ─────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useS(false);
  useE(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: scrolled ? 'rgba(245,237,227,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(10px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(26,26,26,0.08)' : '1px solid transparent',
      transition: 'all .25s ease',
    }}>
      <div style={{
        maxWidth: MAXW, margin: '0 auto', padding: '14px 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <SMark size={32} color={L.olive} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <a href="#how" style={navLink}>How it works</a>
          <a href="Stretchy Flow.html" onClick={goExplore} style={navLink}>Explore the app</a>
          <a href="#waitlist">
            <PillButton variant="dark" size="sm">Join the waitlist</PillButton>
          </a>
        </div>
      </div>
    </div>
  );
}
const navLink = {
  fontFamily: STRETCHY.body, fontSize: 14, fontWeight: 600, color: STRETCHY.black,
  textDecoration: 'none', padding: '8px 12px', display: 'inline-block',
};

// ─────────────────────────────────────────────────────────────
// HERO — olive, big headline, floating live phones
// ─────────────────────────────────────────────────────────────
function Hero() {
  return (
    <div style={{ background: L.olive, color: L.cream, position: 'relative', overflow: 'hidden' }}>
      {/* giant ghost S */}
      <div style={{ position: 'absolute', right: -120, top: -40, opacity: 0.07, pointerEvents: 'none' }}>
        <SMark size={560} color={L.cream} />
      </div>

      <div style={{ maxWidth: MAXW, margin: '0 auto', padding: '64px 24px 56px', position: 'relative' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 40, alignItems: 'center' }} className="hero-grid">
          {/* left */}
          <div>
            <div style={{
              fontFamily: L.mono, fontSize: 12, fontWeight: 700, letterSpacing: '0.20em',
              color: L.cream, opacity: 0.8, marginBottom: 22,
            }}>
              AUCKLAND, AOTEAROA · EST. 2026
            </div>
            <h1 style={{
              fontFamily: L.title, fontWeight: 700, fontSize: 'clamp(48px, 7vw, 92px)',
              lineHeight: 0.92, letterSpacing: '-0.03em', margin: 0,
            }}>
              A social<br/>movement.
            </h1>
            <p style={{ margin: '26px 0 0', fontSize: 19, lineHeight: 1.5, maxWidth: 480, opacity: 0.95 }}>
              Community movement classes where <strong>the price drops as more people join.</strong> The more who move together, the better value for everyone. Plus the beloved “Social Stretch” after.
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
              <a href="#waitlist"><PillButton variant="secondary" size="lg">Join the waitlist →</PillButton></a>
              <a href="Stretchy Flow.html" onClick={goExplore}><PillButton variant="ghost" size="lg">Explore the app</PillButton></a>
            </div>
            <p style={{ margin: '26px 0 0', fontSize: 14, opacity: 0.7, maxWidth: 420, lineHeight: 1.5 }}>
              Yoga, pilates, HIIT, breathwork, run clubs — with a pricing model that rewards community.
            </p>
          </div>

          {/* right — a screenshot of the Sunday Slow Flow session: the price dropping as the room fills */}
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="hero-phones">
            <img
              src="assets/sunday-slow-flow.png"
              alt="Sunday Slow Flow session in the Stretchy app — the price drops as more people hold a spot"
              style={{ width: 252, height: 'auto', display: 'block', filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.42))' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// PRICING MECHANIC — interactive movement maths
// ─────────────────────────────────────────────────────────────
function Slider({ label, value, min, max, step = 1, onChange, suffix = '', minLabel, maxLabel }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div style={{ marginBottom: 26 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
        <span style={{ fontFamily: L.mono, fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', color: L.black }}>{label}</span>
        <span style={{ fontFamily: L.title, fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em' }}>{value}{suffix}</span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{
          width: '100%', WebkitAppearance: 'none', appearance: 'none',
          height: 8, borderRadius: 999, outline: 'none',
          background: `linear-gradient(90deg, ${L.olive} 0% ${pct}%, rgba(26,26,26,0.10) ${pct}% 100%)`,
        }}
        className="stretchy-range"
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontFamily: L.mono, fontSize: 10, color: L.textDim, letterSpacing: '0.08em' }}>
        <span>{minLabel}</span><span>{maxLabel}</span>
      </div>
    </div>
  );
}

function PricingMechanic() {
  const [target, setTarget] = useS(250);
  const [minSpots, setMinSpots] = useS(8);
  const [people, setPeople] = useS(8);
  const FEE = 23;
  const perPerson = Math.round((target + FEE) / Math.max(people, 1));
  const startPrice = Math.round((target + FEE) / Math.max(minSpots, 1));
  const confirmed = people >= minSpots;

  // keep people >= a sensible floor relative to min when min changes
  useE(() => { if (people < 3) setPeople(3); }, [people]);

  return (
    <div style={{ padding: '96px 0' }}>
      <div style={{ textAlign: 'center', marginBottom: 12 }}>
        <Eyebrow color={L.olive}>The pricing mechanic</Eyebrow>
      </div>
      <h2 style={{
        fontFamily: L.title, fontWeight: 700, fontSize: 'clamp(34px, 5vw, 56px)',
        lineHeight: 0.98, letterSpacing: '-0.025em', textAlign: 'center', margin: '0 auto 18px', maxWidth: 820,
      }}>
        The more who join, the better value exchange for all.
      </h2>
      <p style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 48px', fontSize: 17, lineHeight: 1.55, color: '#555' }}>
        The host sets their revenue target. Add the flat Stretchy fee of NZD $20 + GST. Split it across everyone who holds a spot. Fair, transparent, good for all.
      </p>

      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0,
        background: '#FFFFFF', borderRadius: 32, overflow: 'hidden',
        border: '1.5px solid rgba(26,26,26,0.08)', boxShadow: '0 30px 60px rgba(26,26,26,0.06)',
      }} className="mechanic-grid">
        {/* controls */}
        <div style={{ padding: 36 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 28,
            fontFamily: L.mono, fontSize: 11, fontWeight: 700, letterSpacing: '0.14em',
            background: L.olive, color: L.cream, padding: '6px 12px', borderRadius: 999,
          }}>● INTERACTIVE — DRAG IT</div>
          <Slider label="HOST REVENUE TARGET" value={target} min={50} max={400} step={5}
            onChange={setTarget} suffix="" minLabel="$50" maxLabel="$400" />
          <Slider label="MINIMUM SPOTS TO GO AHEAD" value={minSpots} min={3} max={20}
            onChange={(v) => { setMinSpots(v); if (people < v) setPeople(v); }} suffix=" people" minLabel="3" maxLabel="20" />
          <Slider label="PEOPLE HOLDING A SPOT" value={people} min={3} max={50}
            onChange={setPeople} suffix=" people" minLabel="3" maxLabel="50" />
        </div>

        {/* readout */}
        <div style={{ padding: 36, background: confirmed ? L.olive : '#2A2A2A', color: L.cream, display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontFamily: L.mono, fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', opacity: 0.8 }}>
            {confirmed ? '● GOING AHEAD' : '○ NEEDS ' + (minSpots - people) + ' MORE TO CONFIRM'}
          </div>

          {/* formula */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', margin: '28px 0', fontFamily: L.mono, fontSize: 13 }}>
            <span style={{ background: L.yellow, color: L.black, padding: '6px 11px', borderRadius: 10, fontWeight: 700 }}>${target} target</span>
            <span style={{ opacity: 0.7, fontSize: 16 }}>+</span>
            <span style={{ background: 'rgba(245,237,227,0.16)', padding: '6px 11px', borderRadius: 10, fontWeight: 700 }}>$20 + GST</span>
            <span style={{ opacity: 0.7, fontSize: 16 }}>÷</span>
            <span style={{ background: 'rgba(245,237,227,0.16)', padding: '6px 11px', borderRadius: 10, fontWeight: 700 }}>{people} people</span>
          </div>

          <div style={{ marginTop: 'auto' }}>
            <div style={{ fontFamily: L.mono, fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', opacity: 0.8, marginBottom: 6 }}>EACH PERSON PAYS</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
              <span style={{ fontFamily: L.mono, fontSize: 34, fontWeight: 700, color: L.yellow }}>$</span>
              <span style={{ fontFamily: L.display, fontSize: 'clamp(72px, 9vw, 110px)', lineHeight: 0.82, color: L.yellow, letterSpacing: '-0.04em' }}>{perPerson}</span>
            </div>
            <p style={{ margin: '14px 0 0', fontSize: 13, lineHeight: 1.5, opacity: 0.9 }}>
              Started at <strong style={{ color: L.cream }}>${startPrice}</strong> when the minimum holds. Host always earns <strong style={{ color: L.cream }}>${target}</strong>. Stretchy always gets a flat <strong style={{ color: L.cream }}>$20 + GST</strong>. Everyone else? The more who join, the better the value exchange for all.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// HOW IT WORKS — six steps
// ─────────────────────────────────────────────────────────────
const STEPS = [
  ['A host lists a session.', 'Yoga, pilates, HIIT, sound bath — whatever. They set a minimum number to make it viable, a max capacity, and a price target.'],
  ['Hold your spot.', 'Find a session near you and hold your place. Nothing’s charged. You can see the maximum you’d ever pay and the number of people needed to go ahead — it only goes down from there.'],
  ['The more who hold, the lower the price.', 'Every new hold splits the cost. Price drops in real time. Tell your mates, tell a random, invite a date — you’re literally saving each other money.'],
  ['36 hours out: is it happening?', 'If the minimum is met, the session is confirmed and you’re locked in. This is the max you’ll pay. If not, all holds are released. No charge, no stress.'],
  ['Price can still drop until 2 hours out.', 'More people can still join after confirmation, pushing the price down further. At 2 hours out, your card is charged at the final price and we know exactly who’s in the room.'],
  ['Show up. Move. Social Stretch.', 'Turn up, move with people, then head to the Social Stretch nearby.'],
];

function HowItWorks() {
  return (
    <div id="how" style={{ background: L.purple, color: L.cream }}>
      <div style={{ maxWidth: MAXW, margin: '0 auto', padding: '96px 24px' }}>
        <Eyebrow color={L.cream}>How it works</Eyebrow>
        <h2 style={{
          fontFamily: L.title, fontWeight: 700, fontSize: 'clamp(34px, 5vw, 56px)',
          lineHeight: 0.98, letterSpacing: '-0.025em', margin: '0 0 48px', maxWidth: 700,
        }}>
          Six steps. That’s it.
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
          {STEPS.map(([title, body], i) => {
            const hot = i === STEPS.length - 1;
            return (
            <div key={i} style={{
              background: hot ? L.yellow : '#FFFFFF', color: L.black,
              borderRadius: 26, padding: 26, border: 'none',
              display: 'flex', flexDirection: 'column', gap: 12,
            }}>
              <div style={{ fontFamily: L.display, fontSize: 40, lineHeight: 0.85, color: hot ? L.black : L.purple, letterSpacing: '-0.03em' }}>
                0{i + 1}
              </div>
              <h3 style={{ fontFamily: L.title, fontWeight: 700, fontSize: 19, lineHeight: 1.1, letterSpacing: '-0.01em', margin: 0 }}>{title}</h3>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5, color: hot ? 'rgba(26,26,26,0.8)' : '#666' }}>{body}</p>
            </div>
          );})}
        </div>

        {/* The one commitment moment, stated plainly. */}
        <div style={{
          marginTop: 28, padding: '22px 26px', borderRadius: 22,
          background: 'rgba(245,237,227,0.08)', border: '1px solid rgba(245,237,227,0.18)',
          display: 'flex', alignItems: 'flex-start', gap: 16,
        }}>
          <span style={{ fontFamily: L.mono, fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', color: L.yellow, whiteSpace: 'nowrap', paddingTop: 3 }}>ONE THING TO KNOW</span>
          <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55, color: 'rgba(245,237,227,0.85)' }}>
            If you’re locked in at 36 hours and can’t make it, you will be charged. Commit with confidence, pals.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// EXPLORE THE APP — live device switcher (the wireframes)
// ─────────────────────────────────────────────────────────────
const EXPLORE_SCREENS = [
  { id: 'home',    label: 'Home',          tab: 'attendee', make: () => <ScreenHome /> },
  { id: 'browse',  label: 'This Week',     tab: 'attendee', make: () => <ScreenThisWeek /> },
  { id: 'detail',  label: 'Session + Price', tab: 'attendee', make: () => <ScreenSessionDetail /> },
  { id: 'held',    label: 'Place Held',    tab: 'attendee', make: () => <ScreenPlaceHeld /> },
  { id: 'going',   label: 'Going Ahead',   tab: 'attendee', make: () => <ScreenGoingAhead /> },
  { id: 'social',  label: 'Social Stretch', tab: 'attendee', make: () => <ScreenSocialStretch /> },
  { id: 'rate',    label: 'Rate It',       tab: 'attendee', make: () => <ScreenRateIt /> },
  { id: 'dash',    label: 'Host Dashboard', tab: 'host', make: () => <ScreenHostDashboard /> },
  { id: 'add',     label: 'Add a Session', tab: 'host', make: () => <ScreenAddSession /> },
  { id: 'payout',  label: 'Host Payout',   tab: 'host', make: () => <ScreenPayout /> },
];

function ExploreApp() {
  const [active, setActive] = useS('detail');
  const cur = EXPLORE_SCREENS.find(s => s.id === active);
  return (
    <div id="explore" style={{ background: L.olive, color: L.cream }}>
      <div style={{ maxWidth: MAXW, margin: '0 auto', padding: '96px 24px' }}>
        <div style={{ textAlign: 'center' }}>
          <Eyebrow color={L.yellow}>Explore the app</Eyebrow>
        </div>
        <h2 style={{
          fontFamily: L.title, fontWeight: 700, fontSize: 'clamp(34px, 5vw, 56px)',
          lineHeight: 0.98, letterSpacing: '-0.025em', textAlign: 'center', margin: '0 auto 16px', maxWidth: 720,
        }}>
          A real look inside.
        </h2>
        <p style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto 44px', fontSize: 17, lineHeight: 1.55, color: 'rgba(245,237,227,0.7)' }}>
          This is the actual interface — tap through the screens. Scroll inside any phone, open the menu from the S.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 48, alignItems: 'center' }} className="explore-grid">
          {/* screen picker */}
          <div>
            <div style={{ fontFamily: L.mono, fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', color: L.yellow, marginBottom: 14 }}>
              FOR MOVERS
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
              {EXPLORE_SCREENS.filter(s => s.tab === 'attendee').map(s => (
                <ExploreChip key={s.id} s={s} active={active} setActive={setActive} />
              ))}
            </div>
            <div style={{ fontFamily: L.mono, fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', color: L.yellow, marginBottom: 14 }}>
              FOR HOSTS
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {EXPLORE_SCREENS.filter(s => s.tab === 'host').map(s => (
                <ExploreChip key={s.id} s={s} active={active} setActive={setActive} />
              ))}
            </div>

            <div style={{ marginTop: 36, padding: 20, borderRadius: 22, background: 'rgba(245,237,227,0.06)', border: '1px solid rgba(245,237,227,0.12)' }}>
              <div style={{ fontFamily: L.title, fontWeight: 700, fontSize: 18, marginBottom: 6 }}>Now showing: {cur.label}</div>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5, color: 'rgba(245,237,227,0.7)' }}>
                Every screen here is the live front-end — not a picture. Drag, scroll and tap to feel the real thing.
              </p>
            </div>
          </div>

          {/* the phone */}
          <div style={{ display: 'flex', justifyContent: 'center', filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.5))' }}>
            <LivePhone key={active} screen={cur.make()} scale={0.74} menuTab={cur.tab} />
          </div>
        </div>
      </div>
    </div>
  );
}

function ExploreChip({ s, active, setActive }) {
  const on = active === s.id;
  return (
    <button onClick={() => setActive(s.id)} style={{
      padding: '10px 16px', borderRadius: 999, cursor: 'pointer',
      border: on ? 'none' : '1.5px solid rgba(245,237,227,0.25)',
      background: on ? L.yellow : 'transparent',
      color: on ? L.black : L.cream,
      fontFamily: L.body, fontSize: 14, fontWeight: 600,
      transition: 'all .15s',
    }}>{s.label}</button>
  );
}

// ─────────────────────────────────────────────────────────────
// VALUE — for movers / for hosts
// ─────────────────────────────────────────────────────────────
function ValueCard({ icon, title, body, bg = '#FFFFFF', fg = STRETCHY.black }) {
  return (
    <div style={{ background: bg, color: fg, borderRadius: 26, padding: 28, border: '1.5px solid rgba(26,26,26,0.08)' }}>
      <div style={{
        width: 52, height: 52, borderRadius: 14, background: STRETCHY.olive, color: STRETCHY.cream,
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, marginBottom: 18,
      }}>{icon}</div>
      <h3 style={{ fontFamily: STRETCHY.title, fontWeight: 700, fontSize: 20, letterSpacing: '-0.01em', margin: '0 0 10px' }}>{title}</h3>
      <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55, color: fg === STRETCHY.black ? '#666' : 'rgba(245,237,227,0.78)' }}>{body}</p>
    </div>
  );
}

function ForMovers() {
  return (
    <div id="movers" style={{ padding: '96px 0' }}>
      <Eyebrow color={L.olive}>For movers</Eyebrow>
      <h2 style={{
        fontFamily: L.title, fontWeight: 700, fontSize: 'clamp(34px, 5vw, 56px)',
        lineHeight: 0.98, letterSpacing: '-0.025em', margin: '0 0 48px', maxWidth: 760,
      }}>
        Move more. Pay less.<br/>Meet people.
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
        <ValueCard icon="💸" title="The value exchange works for you" body="The more who join, the better value everyone’s session. The people you meet — or friends you bring — literally become the discount." />
        <ValueCard icon="📍" title="Local sessions, real venues" body="Parks, studios, rooftops, community halls. Not a big chain. Vetted hosts, local to you." />
        <ValueCard icon="🤝" title="The Social Stretch" body="Every session ends with an optional hang. Coffee, matcha, wine — whatever the vibe. The best bit." />
        <ValueCard icon="🛡️" title="You always know your max" body="Hold with no charge upfront. Once the minimum holds, the price only drops. Your card is touched only when it’s confirmed." />
      </div>
    </div>
  );
}

function ForHosts() {
  return (
    <div id="hosts" style={{ background: L.purple, color: L.cream }}>
      <div style={{ maxWidth: MAXW, margin: '0 auto', padding: '96px 24px' }}>
        <Eyebrow color={L.cream}>For hosts</Eyebrow>
        <h2 style={{
          fontFamily: L.title, fontWeight: 700, fontSize: 'clamp(34px, 5vw, 56px)',
          lineHeight: 0.98, letterSpacing: '-0.025em', margin: '0 0 20px', maxWidth: 760,
        }}>
          Set your target.<br/>We handle the rest.
        </h2>
        <p style={{ margin: '0 0 48px', fontSize: 18, lineHeight: 1.55, maxWidth: 560, opacity: 0.9 }}>
          You set your target. Stretchy handles pricing, payments, notifications and payouts. You just run a great session.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
          {[
            ['🎯', 'Earn your target', 'Set your revenue goal and the minimum attendees needed. You know what you’re earning before you host.'],
            ['🧾', 'Transparent formula', '(Target + $20 + GST fee) ÷ people = per-person price. Shown to you and your attendees.'],
            ['🔐', 'Vetted once, active 6 months', 'One application, one vetting. Run as many sessions as you like. Change your schedule any time.'],
            ['🤙', 'Be part of a movement', 'Expand your community and impact. We list your classes to everyone in the area.'],
            ['🥂', 'Host a Social Stretch', 'The juicy bit after. Banter, community, new and old friends. Hosted by you.'],
            ['❤️', 'Fundraising sessions', 'Your target could be a charity target. We lower our fee for fundraisers. Move for a cause.'],
          ].map(([icon, title, body], i) => (
            <div key={i} style={{ background: 'rgba(245,237,227,0.08)', borderRadius: 26, padding: 28, border: '1px solid rgba(245,237,227,0.14)' }}>
              <div style={{ fontSize: 28, marginBottom: 14 }}>{icon}</div>
              <h3 style={{ fontFamily: L.title, fontWeight: 700, fontSize: 19, letterSpacing: '-0.01em', margin: '0 0 8px' }}>{title}</h3>
              <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.5, opacity: 0.82 }}>{body}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 36 }}>
          <a href="#waitlist"><PillButton variant="secondary" size="lg">Apply to be a host →</PillButton></a>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// WAITLIST
// ─────────────────────────────────────────────────────────────
function Waitlist() {
  const [role, setRole] = useS('move');
  const [email, setEmail] = useS('');
  const [suburb, setSuburb] = useS('');
  const [done, setDone] = useS(false);

  const submit = () => {
    if (!email.trim()) return;
    try {
      const list = JSON.parse(localStorage.getItem('stretchy_waitlist') || '[]');
      list.push({ role, email, suburb, at: Date.now() });
      localStorage.setItem('stretchy_waitlist', JSON.stringify(list));
    } catch (e) {}
    setDone(true);
  };

  return (
    <div id="waitlist" style={{ background: L.yellow, color: L.black }}>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '96px 24px', textAlign: 'center' }}>
        <SMark size={72} color={L.black} style={{ marginBottom: 22 }} />
        <Eyebrow color={L.black}>Get early access</Eyebrow>
        <h2 style={{
          fontFamily: L.title, fontWeight: 700, fontSize: 'clamp(38px, 6vw, 64px)',
          lineHeight: 0.95, letterSpacing: '-0.03em', margin: '0 auto 18px',
        }}>
          Move together. Pay less. Better value exchange for all.
        </h2>
        <p style={{ margin: '0 auto 40px', fontSize: 18, lineHeight: 1.5, maxWidth: 540 }}>
          Auckland goes live Q3 2026 — more cities coming. Tell us where you are and you’ll be first to know when Stretchy heads your way. The highlight of your week, every week.
        </p>

        {done ? (
          <div style={{ background: L.black, color: L.cream, borderRadius: 28, padding: 40 }}>
            <SMark size={64} color={L.yellow} style={{ marginBottom: 18 }} />
            <h3 style={{ fontFamily: L.title, fontWeight: 700, fontSize: 28, margin: '0 0 10px', letterSpacing: '-0.02em' }}>You’re on the list.</h3>
            <p style={{ margin: 0, fontSize: 16, opacity: 0.85, lineHeight: 1.5 }}>
              We’ll be in touch as {role === 'host' ? 'a host' : role === 'both' ? 'a host & mover' : 'a mover'}{suburb ? ` in ${suburb}` : ''}. Tell a mate — the more who join, the better it gets.
            </p>
          </div>
        ) : (
          <div style={{ background: '#FFFFFF', borderRadius: 28, padding: 32, textAlign: 'left', boxShadow: '0 30px 60px rgba(26,26,26,0.10)' }}>
            <div style={{ fontFamily: L.mono, fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', color: '#666', marginBottom: 12 }}>I WANT TO</div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 22 }}>
              {[['move', 'Move 🧘'], ['host', 'Host 🎯'], ['both', 'Both 🤙']].map(([key, label]) => (
                <button key={key} onClick={() => setRole(key)} style={{
                  flex: 1, padding: '14px', borderRadius: 16, cursor: 'pointer',
                  border: role === key ? 'none' : '1.5px solid rgba(26,26,26,0.16)',
                  background: role === key ? L.black : 'transparent',
                  color: role === key ? L.cream : L.black,
                  fontFamily: L.body, fontSize: 15, fontWeight: 700,
                }}>{label}</button>
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.co.nz" style={inputStyle} />
              <input value={suburb} onChange={(e) => setSuburb(e.target.value)} placeholder="Your suburb or city" style={inputStyle} />
              <PillButton variant="dark" style={{ width: '100%', marginTop: 6 }} onClick={submit}>Put me on the list →</PillButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
const inputStyle = {
  width: '100%', padding: '15px 18px', borderRadius: 14,
  border: '1.5px solid rgba(26,26,26,0.16)', background: '#FFF8F4',
  fontFamily: STRETCHY.body, fontSize: 16, color: STRETCHY.black, outline: 'none',
  boxSizing: 'border-box',
};

// ─────────────────────────────────────────────────────────────
// STORY + FOOTER
// ─────────────────────────────────────────────────────────────
function Story() {
  return (
    <div style={{ padding: '96px 0' }}>
      <div style={{ maxWidth: 760 }}>
        <Eyebrow color={L.olive}>The backstory</Eyebrow>
        <h2 style={{
          fontFamily: L.title, fontWeight: 700, fontSize: 'clamp(32px, 4.5vw, 50px)',
          lineHeight: 1.0, letterSpacing: '-0.025em', margin: '0 0 28px',
        }}>
          Started with yoga.<br/>Became something bigger.
        </h2>
        <div style={{ fontSize: 17, lineHeight: 1.65, color: '#444', display: 'flex', flexDirection: 'column', gap: 18 }}>
          <p style={{ margin: 0 }}>Stretchy started as a social yoga community in Auckland in 2024 — taking the run-club idea and applying it to yoga, to stretch bodies, minds and social circles. Weekly all-level classes followed by a "social stretch" — coffees, matchas, wine, beer, banter.</p>
          <p style={{ margin: 0 }}>Stretchy 1.0 was well loved but labour intensive. Some sessions barely broke even, others earned hundreds. There had to be a better, fairer way to move together — for all.</p>
          <p style={{ margin: 0 }}>Now Stretchy is evolving into a community movement platform. Yoga is one format. The model works for anything — pilates, HIIT, breathwork, sound baths, run clubs, dance. If people want to do it together, and the economics should reward group effort, Stretchy is the infrastructure.</p>
        </div>
        <p style={{ fontFamily: L.title, fontWeight: 700, fontSize: 22, letterSpacing: '-0.01em', margin: '32px 0 0', color: L.olive }}>
          Stretching bodies, minds and social circles.
        </p>
      </div>
    </div>
  );
}

function FinalCTA() {
  return (
    <div style={{ background: L.olive, color: L.cream, textAlign: 'center' }}>
      <div style={{ maxWidth: MAXW, margin: '0 auto', padding: '96px 24px' }}>
        <SMark size={88} color={L.cream} style={{ marginBottom: 28 }} />
        <h2 style={{
          fontFamily: L.title, fontWeight: 700, fontSize: 'clamp(40px, 6vw, 72px)',
          lineHeight: 0.95, letterSpacing: '-0.03em', margin: '0 auto 22px', maxWidth: 720,
        }}>
          Move together. Pay less.<br/>Meet people.
        </h2>
        <p style={{ fontSize: 19, opacity: 0.9, margin: '0 auto 34px' }}>The highlight of your week, every week.</p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#waitlist"><PillButton variant="secondary" size="lg">Join the waitlist →</PillButton></a>
          <a href="Stretchy Flow.html" onClick={goExplore}><PillButton variant="ghost" size="lg">Explore the app</PillButton></a>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div style={{ background: L.yellow, color: L.black }}>
      <div style={{ maxWidth: MAXW, margin: '0 auto', padding: '56px 24px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 32, alignItems: 'flex-start' }}>
        <div style={{ maxWidth: 300 }}>
          <div style={{ marginBottom: 12 }}>
            <SMark size={30} color={L.black} />
          </div>
          <p style={{ margin: '0 0 14px', fontSize: 14, opacity: 0.7, lineHeight: 1.5 }}>A social movement. Built in Aotearoa 🌿</p>
          <a href="mailto:kimberley@stretchyyoga.co.nz" style={{ ...footLink, fontFamily: L.mono, fontSize: 13, letterSpacing: '0.04em' }}>kimberley@stretchyyoga.co.nz</a>
        </div>
        <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap', fontSize: 14 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ fontFamily: L.mono, fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', opacity: 0.5, marginBottom: 2 }}>EXPLORE</div>
            <a href="#how" style={footLink}>How it works</a>
            <a href="Stretchy Flow.html" onClick={goExplore} style={footLink}>Explore the app</a>
            <a href="#hosts" style={footLink}>For hosts</a>
            <a href="#waitlist" style={footLink}>Join waitlist</a>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ fontFamily: L.mono, fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', opacity: 0.5, marginBottom: 2 }}>FOLLOW THE BUILD</div>
            <a href="https://www.caike.club/" target="_blank" rel="noopener" style={footLink}>caike.club ↗</a>
            <a href="https://www.instagram.com/caike.club/" target="_blank" rel="noopener" style={footLink}>@caike.club ↗</a>
            <a href="https://instagram.com/stretchy.yoga" target="_blank" rel="noopener" style={footLink}>@stretchy.yoga ↗</a>
          </div>
        </div>
      </div>
      <div style={{ borderTop: '1px solid rgba(26,26,26,0.15)' }}>
        <div style={{ maxWidth: MAXW, margin: '0 auto', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', fontFamily: L.mono, fontSize: 11, letterSpacing: '0.10em', color: 'rgba(26,26,26,0.6)', flexWrap: 'wrap', gap: 12 }}>
          <span>© 2026 STRETCHY · AOTEAROA NEW ZEALAND</span>
          <span>MOVE TOGETHER · BETTER VALUE FOR ALL</span>
        </div>
      </div>
    </div>
  );
}
const footLink = { color: STRETCHY.black, opacity: 0.7, textDecoration: 'none', cursor: 'pointer' };

// ─────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────
function Landing() {
  return (
    <div style={{ background: L.cream }}>
      <Nav />
      <Hero />
      <Section><PricingMechanic /></Section>
      <HowItWorks />
      <Section><ForMovers /></Section>
      <ForHosts />
      <Section><Story /></Section>
      <Waitlist />
      <Footer />
    </div>
  );
}

Object.assign(window, { Landing });

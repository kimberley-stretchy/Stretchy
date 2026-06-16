// Stretchy — shared visual primitives.
// Tokens, S-mark morph, pill buttons, price pill, session card, pricing curve.

const STRETCHY = {
  // Surfaces
  black: '#1A1A1A',
  cream: '#F5EDE3',
  darkCard: '#2A2A2A',
  lightCard: '#FFF8F4',

  // Brand palette — pink swapped for blue throughout per direction.
  pink: '#B5DDE9',        // soft accent (was #F5C2C8)
  hotPink: '#2C8FE0',     // bold accent / CTAs (was #FF4D9E)
  yellow: '#FFD166',      // prices / money — sacred
  orange: '#FF6B35',      // scarcity, sunrise
  red: '#E63946',         // alerts / "filling fast" accent
  purple: '#A535C7',      // yoga
  royal: '#2A3FE0',       // pilates / deep
  sky: '#4FB8E0',         // sound bath / breath / soft accents
  olive: '#7A8330',       // breath / grounded
  green: '#4CAF82',       // confirmed state
  hold: '#A8D5E2',        // holding (pre-confirmation)

  textDim: '#888',
  textDimDark: 'rgba(245,237,227,0.55)',

  // Bagel Fat One reserved for HERO headlines and big PRICE/STAT numbers.
  display: '"Bagel Fat One", "Arial Black", sans-serif',
  // Space Grotesk for everything else — bold for titles, regular for body.
  body: '"Space Grotesk", -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
  title: '"Space Grotesk", -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
  mono: '"JetBrains Mono", "SF Mono", ui-monospace, monospace',
};

// Movement type metadata — colour-codes session cards & filter chips.
const MOVEMENT = {
  yoga:    { color: '#A535C7', label: 'YOGA',    initial: 'Y' },
  pilates: { color: '#2A3FE0', label: 'PILATES', initial: 'P' },
  breath:  { color: '#7A8330', label: 'BREATH',  initial: 'B' },
  sound:   { color: '#4FB8E0', label: 'SOUND',   initial: '♪' },
  flow:    { color: '#FF6B35', label: 'FLOW',    initial: '⟡' },
  run:     { color: '#E63946', label: 'RUN',     initial: 'R' },
  hiit:    { color: '#FF4D9E', label: 'HIIT',    initial: '⚡' },
};

// ─────────────────────────────────────────────────────────────
// SMark — the Stretchy logomark used as a static brand icon.
// (Previously morphed with fillRatio; now stays as the iconic shape.)
// ─────────────────────────────────────────────────────────────
function SMark({ size = 64, color = STRETCHY.black, style = {} }) {
  const M = window.S_MARK || { w: 220, h: 257, path: '' };
  return (
    <div style={{ width: size, height: size, display: 'inline-block', color, ...style }}>
      <svg viewBox={`0 0 ${M.w} ${M.h}`} width="100%" height="100%" preserveAspectRatio="xMidYMid meet" style={{ display: 'block' }}>
        <path d={M.path} fill="currentColor" />
      </svg>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Wordmark — inline SVG traced from the brand PNG.
// ─────────────────────────────────────────────────────────────
function Wordmark({ height = 22, color = STRETCHY.pink, style = {} }) {
  const W = window.WORDMARK || { w: 600, h: 58, path: '' };
  return (
    <div style={{ height, color, display: 'inline-block', lineHeight: 0, ...style }}>
      <svg viewBox={`0 0 ${W.w} ${W.h}`} height={height} preserveAspectRatio="xMidYMid meet" style={{ display: 'block' }}>
        <path d={W.path} fill="currentColor" />
      </svg>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// PillButton — fully rounded, large hit target.
// variant: primary (hot-pink) | secondary (cream-on-dark) | ghost | dark
// ─────────────────────────────────────────────────────────────
function PillButton({ children, variant = 'primary', size = 'lg', style = {}, onClick }) {
  const variants = {
    primary:   { bg: STRETCHY.hotPink, fg: STRETCHY.cream, border: 'none' },
    secondary: { bg: STRETCHY.cream,   fg: STRETCHY.black, border: 'none' },
    ghost:     { bg: 'transparent',    fg: STRETCHY.cream, border: `1.5px solid rgba(245,237,227,0.35)` },
    ghostDark: { bg: 'transparent',    fg: STRETCHY.black, border: `1.5px solid rgba(26,26,26,0.18)` },
    dark:      { bg: STRETCHY.black,   fg: STRETCHY.cream, border: 'none' },
    pink:      { bg: STRETCHY.pink,    fg: STRETCHY.black, border: 'none' },
  }[variant];
  const sizes = {
    lg: { padding: '20px 28px', fontSize: 17, height: 60 },
    md: { padding: '14px 22px', fontSize: 15, height: 48 },
    sm: { padding: '10px 16px', fontSize: 13, height: 36 },
  }[size];
  return (
    <button onClick={onClick} style={{
      ...sizes,
      background: variants.bg, color: variants.fg, border: variants.border,
      borderRadius: 999, fontFamily: STRETCHY.body, fontWeight: 600,
      letterSpacing: '-0.01em', cursor: 'pointer',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
      transition: 'transform .12s ease',
      ...style,
    }}>{children}</button>
  );
}

// ─────────────────────────────────────────────────────────────
// PricePill — yellow, always.
// state: open | filling | almostFull | confirmed | cancelled
// ─────────────────────────────────────────────────────────────
function PricePill({ value, state = 'open', size = 'md' }) {
  const palette = {
    open:       { bg: STRETCHY.yellow,    fg: STRETCHY.black, hint: null },
    filling:    { bg: STRETCHY.yellow,    fg: STRETCHY.black, hint: 'FILLING' },
    almostFull: { bg: STRETCHY.hotPink,   fg: STRETCHY.cream, hint: '⚡ ALMOST FULL' },
    confirmed:  { bg: STRETCHY.green,     fg: STRETCHY.black, hint: 'GOING AHEAD' },
    cancelled:  { bg: '#444',             fg: STRETCHY.cream, hint: 'CANCELLED' },
  }[state];
  const sizes = {
    sm: { padding: '6px 12px', fs: 14 },
    md: { padding: '8px 16px', fs: 18 },
    lg: { padding: '14px 24px', fs: 32 },
  }[size];
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'baseline', gap: 4,
      background: palette.bg, color: palette.fg,
      borderRadius: 999, padding: sizes.padding,
      fontFamily: STRETCHY.mono, fontWeight: 700, fontSize: sizes.fs,
      letterSpacing: '-0.02em',
    }}>
      <span style={{ fontSize: sizes.fs * 0.6, opacity: 0.7, fontWeight: 600 }}>$</span>
      {value}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MovementTile — colour-coded category tag, sits where the S used to.
// Use either an initial or a host photo placeholder.
// ─────────────────────────────────────────────────────────────
function MovementTile({ type = 'yoga', size = 48, style = {} }) {
  const m = MOVEMENT[type] || MOVEMENT.yoga;
  return (
    <div style={{
      width: size, height: size, borderRadius: size * 0.32,
      background: m.color, color: '#FFFFFF',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: STRETCHY.display, fontSize: size * 0.42, fontWeight: 400,
      letterSpacing: '-0.02em', lineHeight: 1,
      ...style,
    }}>
      {m.initial}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SRating — 5 S-marks as a rating control (A6 Rate It).
// rated: number of S's currently lit (0..5)
// ─────────────────────────────────────────────────────────────
function SRating({ rated = 0, size = 56, color = STRETCHY.hotPink, dim = 'rgba(26,26,26,0.14)' }) {
  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
      {[0, 1, 2, 3, 4].map((i) => (
        <SMark key={i} size={size} color={i < rated ? color : dim} />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// NotificationCard — used in A7 / H3 inboxes.
// ─────────────────────────────────────────────────────────────
function NotificationCard({ kind = 'update', title, body, time, accent, unread = false, children }) {
  const palettes = {
    dropping:   { tag: '⚡ DROPPING',   bg: STRETCHY.yellow,  fg: STRETCHY.black, border: STRETCHY.yellow },
    confirmed:  { tag: '● CONFIRMED',   bg: '#E6F5EC',         fg: '#2E7A52',       border: '#9CD9B8' },
    action:     { tag: '◉ ACTION',      bg: STRETCHY.hotPink, fg: STRETCHY.cream, border: STRETCHY.hotPink },
    update:     { tag: '↘ UPDATE',      bg: '#FFFFFF',         fg: STRETCHY.black, border: 'rgba(26,26,26,0.10)' },
    almostFull: { tag: '⚡ ALMOST FULL', bg: STRETCHY.hotPink, fg: STRETCHY.cream, border: STRETCHY.hotPink },
    social:     { tag: '🤙 SOCIAL',     bg: STRETCHY.pink,    fg: STRETCHY.black, border: STRETCHY.pink },
    payout:     { tag: '$ PAYOUT',      bg: STRETCHY.yellow,  fg: STRETCHY.black, border: STRETCHY.yellow },
  };
  const p = palettes[kind] || palettes.update;

  return (
    <div style={{
      background: p.bg, color: p.fg, borderRadius: 24, padding: 16,
      border: `1.5px solid ${p.border}`,
      display: 'flex', flexDirection: 'column', gap: 8, position: 'relative',
    }}>
      {unread && (
        <div style={{
          position: 'absolute', top: 16, right: 16,
          width: 10, height: 10, borderRadius: 999, background: STRETCHY.hotPink,
        }} />
      )}
      <span style={{
        fontFamily: STRETCHY.mono, fontSize: 10, fontWeight: 700, letterSpacing: '0.16em',
        color: accent || p.fg,
      }}>{p.tag}</span>
      <div style={{
        fontFamily: STRETCHY.body, fontWeight: 700, fontSize: 16, letterSpacing: '-0.01em', lineHeight: 1.25,
      }}>{title}</div>
      {body && (
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.4, opacity: 0.85 }}>{body}</p>
      )}
      {children}
      {time && (
        <div style={{ fontFamily: STRETCHY.mono, fontSize: 11, opacity: 0.7, letterSpacing: '0.06em' }}>{time}</div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// FormField — labelled wireframe-y input cell used on Apply / Add a Session.
// ─────────────────────────────────────────────────────────────
function FormField({ label, hint, value, multiline = false, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label style={{
        fontFamily: STRETCHY.mono, fontSize: 10, fontWeight: 700, letterSpacing: '0.16em',
        color: STRETCHY.black,
      }}>{label}</label>
      {children || (
        <div style={{
          background: '#FFFFFF', color: STRETCHY.black,
          border: '1.5px solid rgba(26,26,26,0.14)',
          borderRadius: 16, padding: multiline ? '14px 16px' : '12px 16px',
          minHeight: multiline ? 72 : undefined,
          fontFamily: STRETCHY.body, fontSize: 14,
        }}>
          {value || <span style={{ color: STRETCHY.textDim }}>{hint}</span>}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Chip — selectable text chip
// ─────────────────────────────────────────────────────────────
function Chip({ children, selected = false, color = STRETCHY.black, style = {} }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '9px 14px', borderRadius: 999, whiteSpace: 'nowrap',
      fontFamily: STRETCHY.body, fontSize: 13, fontWeight: 600,
      background: selected ? color : 'transparent',
      color: selected ? STRETCHY.cream : STRETCHY.black,
      border: selected ? 'none' : `1.5px solid rgba(26,26,26,0.18)`,
      ...style,
    }}>{children}</span>
  );
}

// ─────────────────────────────────────────────────────────────
// Menu drawer — overall navigation, toggled by tapping the S logo or MENU pill.
// Lives in each Phone via MenuProvider/MenuOverlay.
// ─────────────────────────────────────────────────────────────
const MenuCtx = React.createContext(null);

function MenuProvider({ children, initialOpen = false }) {
  const [open, setOpen] = React.useState(initialOpen);
  return (
    <MenuCtx.Provider value={{ open, setOpen }}>{children}</MenuCtx.Provider>
  );
}

function useMenu() {
  return React.useContext(MenuCtx) || { open: false, setOpen: () => {} };
}

const MENU_ITEMS = [
  { kind: 'group', label: 'YOU' },
  { id: 'profile',  code: 'A9', name: 'Profile & account',     icon: '👤' },
  { id: 'switch',   code: '⇄',  name: 'Switch to Host view',    icon: '⇄', highlight: true },
  { kind: 'group', label: 'DO STUFF' },
  { id: 'pick',     code: '02', name: 'Pick your stretch',     icon: '🌿' },
  { id: 'float',    code: 'A8', name: 'Float a Stretchy',      icon: '💭' },
  { id: 'apply',    code: '06', name: 'Apply to be a host',    icon: '✦' },
  { kind: 'group', label: 'STRETCHY HQ' },
  { id: 'contact',  code: '✉',  name: 'Contact Stretchy',       icon: '✉' },
  { id: 'signout',  code: '↗',  name: 'Sign out',              icon: '↗', danger: true },
];

function MenuOverlay({ defaultTab = 'attendee', currentId = null }) {
  const { open, setOpen } = useMenu();
  if (!open) return null;

  return (
    <div
      onClick={() => setOpen(false)}
      style={{
        position: 'absolute', inset: 0, zIndex: 100,
        background: 'rgba(0,0,0,0.45)',
        animation: 'menuFadeIn 0.18s ease',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'absolute', top: 56, left: 12, right: 12,
          background: STRETCHY.cream, color: STRETCHY.black,
          borderRadius: 24, padding: '14px 0 16px',
          maxHeight: 'calc(100% - 80px)', display: 'flex', flexDirection: 'column',
          boxShadow: '0 16px 48px rgba(0,0,0,0.30), 0 2px 6px rgba(0,0,0,0.10)',
          animation: 'menuSlideUp 0.22s cubic-bezier(.34,1.56,.36,1)',
          transformOrigin: 'top left',
        }}
      >
        {/* tip arrow pointing up to the S */}
        <div style={{
          position: 'absolute', top: -8, left: 22,
          width: 16, height: 16, background: STRETCHY.cream,
          transform: 'rotate(45deg)', borderRadius: 3,
          boxShadow: '-2px -2px 4px rgba(0,0,0,0.05)',
        }} />

        {/* identity card */}
        <div style={{ padding: '0 14px 8px' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: 12, borderRadius: 18, background: '#FFFFFF',
            border: '1.5px solid rgba(26,26,26,0.08)',
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: 999, background: STRETCHY.olive,
              color: STRETCHY.cream, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: STRETCHY.title, fontWeight: 700, fontSize: 16,
            }}>M</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: 14 }}>Marlee Fisher</div>
              <div style={{ fontSize: 11, color: STRETCHY.textDim }}>Grey Lynn · attendee</div>
            </div>
            <span style={{
              fontFamily: STRETCHY.mono, fontSize: 9, fontWeight: 700, letterSpacing: '0.10em',
              padding: '4px 8px', borderRadius: 999,
              background: STRETCHY.yellow, color: STRETCHY.black,
            }}>27 SESH</span>
          </div>
        </div>

        {/* action list */}
        <div style={{ overflow: 'auto', padding: '4px 6px 6px' }}>
          {MENU_ITEMS.map((it, i) => {
            if (it.kind === 'group') {
              return (
                <div key={i} style={{
                  padding: '12px 12px 4px', fontFamily: STRETCHY.mono,
                  fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', color: STRETCHY.textDim,
                }}>{it.label}</div>
              );
            }
            return (
              <button
                key={it.id}
                onClick={() => setOpen(false)}
                style={{
                  width: '100%', padding: '11px 12px', borderRadius: 14,
                  border: 'none', textAlign: 'left',
                  background: it.highlight ? STRETCHY.purple : 'transparent',
                  color: it.highlight ? STRETCHY.cream : (it.danger ? '#A33' : STRETCHY.black),
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 12,
                  fontFamily: STRETCHY.body, fontSize: 15, fontWeight: 600,
                }}
              >
                <span style={{
                  width: 28, height: 28, borderRadius: 8,
                  background: it.highlight ? 'rgba(245,237,227,0.20)' : 'rgba(26,26,26,0.06)',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 14,
                }}>{it.icon}</span>
                <span style={{ flex: 1 }}>{it.name}</span>
                <span style={{ opacity: 0.5 }}>›</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Pip row using the S-mark as a static brand icon for filled spots
function ProgressPips({ held, total, color = STRETCHY.hotPink, dimColor = 'rgba(26,26,26,0.18)', size = 14 }) {
  return (
    <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
      {Array.from({ length: total }).map((_, i) => (
        <SMark key={i} size={size} color={i < held ? color : dimColor} />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// PricingScale — combines current live position + downward price
// projection into a single chart. Replaces the old curve+simulate split.
// ─────────────────────────────────────────────────────────────
function PricingScale({ start, floor, minSpots, currentSpots, maxCapacity, total = 220 }) {
  const w = 320, h = 170;
  const padL = 14, padR = 14, padT = 28, padB = 46;
  const innerW = w - padL - padR;
  const innerH = h - padT - padB;

  // x: attendee count → pixel
  const xRange = maxCapacity - 1;
  const xAt = (n) => padL + ((n - 1) / xRange) * innerW;
  // y: price → pixel (inverted)
  const yAt = (p) => padT + (1 - (p - floor) / (start - floor)) * innerH;
  // price at attendee count
  const priceAt = (n) => n < minSpots ? start : Math.max(floor, Math.round(total / n));

  // Build the curve path: flat at $start from 1→min, then curve from min→max
  const segments = [];
  segments.push(`M ${xAt(1)} ${yAt(start)}`);
  segments.push(`L ${xAt(minSpots)} ${yAt(start)}`);
  for (let n = minSpots; n <= maxCapacity; n++) {
    segments.push(`L ${xAt(n)} ${yAt(priceAt(n))}`);
  }
  const path = segments.join(' ');

  // Current position
  const curX = xAt(currentSpots);
  const curY = yAt(priceAt(currentSpots));

  // Milestone markers
  const milestones = [
    { n: minSpots, label: 'MIN', color: STRETCHY.black },
    { n: Math.round((minSpots + maxCapacity) / 2), label: '', color: STRETCHY.black },
    { n: maxCapacity, label: 'FULL', color: STRETCHY.black },
  ];

  return (
    <div style={{ fontFamily: STRETCHY.body }}>
      <svg viewBox={`0 0 ${w} ${h}`} width="100%" style={{ display: 'block' }}>
        {/* y-axis price labels */}
        <text x={padL} y={padT - 8} fontFamily={STRETCHY.mono} fontSize="10" fontWeight="700" fill={STRETCHY.black} letterSpacing="0.06em">${start} MAX</text>
        <text x={w - padR} y={padT + innerH + 14} textAnchor="end" fontFamily={STRETCHY.mono} fontSize="10" fontWeight="700" fill={STRETCHY.textDim} letterSpacing="0.06em">${floor} FLOOR</text>

        {/* baseline grid */}
        <line x1={padL} y1={padT + innerH} x2={w - padR} y2={padT + innerH} stroke="rgba(26,26,26,0.10)" strokeDasharray="2 4" />

        {/* solid past+now curve, dashed future curve */}
        {/* split path at current position */}
        <defs>
          <clipPath id="past-clip">
            <rect x="0" y="0" width={curX} height={h} />
          </clipPath>
          <clipPath id="future-clip">
            <rect x={curX} y="0" width={w} height={h} />
          </clipPath>
        </defs>
        <path d={path} stroke={STRETCHY.black} strokeWidth="2.5" fill="none" strokeLinecap="round" clipPath="url(#past-clip)" />
        <path d={path} stroke={STRETCHY.black} strokeOpacity="0.35" strokeWidth="2.5" strokeDasharray="4 5" fill="none" strokeLinecap="round" clipPath="url(#future-clip)" />

        {/* milestone vertical ticks */}
        {milestones.map((m) => (
          <g key={m.n}>
            <line x1={xAt(m.n)} y1={padT + innerH} x2={xAt(m.n)} y2={padT + innerH + 4} stroke="rgba(26,26,26,0.35)" strokeWidth="1.5" />
            <text x={xAt(m.n)} y={padT + innerH + 16} textAnchor="middle" fontFamily={STRETCHY.mono} fontSize="9" fontWeight="600" fill={STRETCHY.textDim}>
              {m.n}
            </text>
            {m.label && (
              <text x={xAt(m.n)} y={padT + innerH + 28} textAnchor="middle" fontFamily={STRETCHY.mono} fontSize="9" fontWeight="700" fill={m.color} letterSpacing="0.08em">
                {m.label}
              </text>
            )}
          </g>
        ))}

        {/* current live dot */}
        <circle cx={curX} cy={curY} r="14" fill="none" stroke={STRETCHY.orange} strokeOpacity="0.35" strokeWidth="1.5">
          <animate attributeName="r" values="9;20;9" dur="2.4s" repeatCount="indefinite" />
          <animate attributeName="stroke-opacity" values="0.5;0;0.5" dur="2.4s" repeatCount="indefinite" />
        </circle>
        <circle cx={curX} cy={curY} r="9" fill={STRETCHY.orange} stroke={STRETCHY.cream} strokeWidth="3" />
        <text x={curX} y={curY - 18} textAnchor="middle" fontFamily={STRETCHY.mono} fontSize="11" fontWeight="700" fill={STRETCHY.black}>
          NOW · ${priceAt(currentSpots)}
        </text>
      </svg>

      {/* future price ladder */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', gap: 8,
        marginTop: 4, padding: '12px 4px 0', borderTop: '1.5px dashed rgba(26,26,26,0.15)',
      }}>
        {[minSpots, Math.round((minSpots + maxCapacity) / 2), maxCapacity].map((n) => {
          const p = priceAt(n);
          const isFloor = n === maxCapacity;
          return (
            <div key={n} style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ fontFamily: STRETCHY.mono, fontSize: 10, color: STRETCHY.textDim, letterSpacing: '0.10em', fontWeight: 700 }}>
                IF {n} JOIN
              </div>
              <div style={{
                display: 'inline-flex', alignItems: 'baseline', marginTop: 4,
                padding: '4px 10px', borderRadius: 999,
                background: isFloor ? STRETCHY.yellow : 'transparent',
                color: STRETCHY.black, fontFamily: STRETCHY.mono, fontWeight: 700, fontSize: 14,
              }}>
                <span style={{ fontSize: 10, opacity: 0.6 }}>$</span>{p}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
function PricingCurve({ start = 28, floor = 14, current = 23, w = 320, h = 110, dark = true }) {
  // Anchor curve: y = start at x=0 (min spots), y = floor at x=w (capacity).
  // Position dot by interpolating between start and current.
  const pad = 12;
  const innerW = w - pad * 2;
  const innerH = h - pad * 2;
  const yFromPrice = (p) => pad + innerH * (1 - (start - p) / (start - floor));
  const xFromPrice = (p) => pad + innerW * ((start - p) / (start - floor));
  const path = `M ${pad} ${pad}
    C ${pad + innerW * 0.35} ${pad + innerH * 0.05},
      ${pad + innerW * 0.55} ${pad + innerH * 0.7},
      ${pad + innerW} ${pad + innerH}`;
  const cx = xFromPrice(current);
  const cy = yFromPrice(current);
  const stroke = dark ? 'rgba(245,237,227,0.85)' : STRETCHY.black;
  const grid = dark ? 'rgba(245,237,227,0.10)' : 'rgba(26,26,26,0.10)';
  const labelColor = dark ? STRETCHY.textDimDark : STRETCHY.textDim;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" style={{ display: 'block' }}>
      {/* grid */}
      <line x1={pad} y1={pad} x2={w - pad} y2={pad} stroke={grid} strokeDasharray="2 4" />
      <line x1={pad} y1={h - pad} x2={w - pad} y2={h - pad} stroke={grid} strokeDasharray="2 4" />
      {/* curve */}
      <path d={path} stroke={stroke} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* end labels */}
      <text x={pad} y={pad - 4} fontFamily={STRETCHY.mono} fontSize="11" fill={labelColor}>FROM ${start}</text>
      <text x={w - pad} y={h - pad + 14} textAnchor="end" fontFamily={STRETCHY.mono} fontSize="11" fill={labelColor}>FLOOR ${floor}</text>
      {/* live dot */}
      <circle cx={cx} cy={cy} r="9" fill={STRETCHY.orange} stroke={dark ? STRETCHY.black : STRETCHY.cream} strokeWidth="3" />
      <circle cx={cx} cy={cy} r="14" fill="none" stroke={STRETCHY.orange} strokeOpacity="0.35" strokeWidth="1.5">
        <animate attributeName="r" values="9;18;9" dur="2.4s" repeatCount="indefinite" />
        <animate attributeName="stroke-opacity" values="0.5;0;0.5" dur="2.4s" repeatCount="indefinite" />
      </circle>
      <text x={cx} y={cy - 18} textAnchor="middle" fontFamily={STRETCHY.mono} fontSize="12" fontWeight="700" fill={dark ? STRETCHY.yellow : STRETCHY.black}>NOW ${current}</text>
    </svg>
  );
}

// SessionCard — used on This Week. Movement-type tile replaces the S.
function SessionCard({ session, dark = false }) {
  const { day, date, name, host, hood, held, min, price, state = 'open', when, type = 'yoga' } = session;
  const fillRatio = Math.min(1, held / min);
  const needsMore = Math.max(0, min - held);
  const m = MOVEMENT[type] || MOVEMENT.yoga;
  const accent =
    state === 'almostFull' ? STRETCHY.hotPink :
    state === 'confirmed'  ? STRETCHY.green :
                             m.color;

  const pillBase = {
    display: 'inline-flex', alignItems: 'center',
    padding: '7px 13px', borderRadius: 999,
    fontFamily: STRETCHY.mono, fontSize: 12, fontWeight: 700, letterSpacing: '0.08em',
  };

  return (
    <div style={{
      background: '#FFFFFF', color: STRETCHY.black, borderRadius: 28, padding: 18,
      display: 'flex', flexDirection: 'column', gap: 14,
      border: state === 'confirmed'  ? `2px solid ${STRETCHY.green}` :
              state === 'almostFull' ? `2px solid ${STRETCHY.hotPink}` :
                                       `1.5px solid rgba(26,26,26,0.10)`,
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1, minWidth: 0 }}>
          {/* date + time + type — larger, easier to scan */}
          <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ ...pillBase, background: STRETCHY.black, color: STRETCHY.cream }}>
              {day} {date}
            </span>
            <span style={{ ...pillBase, background: 'rgba(26,26,26,0.06)', color: STRETCHY.black }}>
              {when}
            </span>
            <span style={{ ...pillBase, background: m.color, color: '#FFFFFF' }}>
              {m.label}
            </span>
          </div>

          {/* Session name — Space Grotesk for legibility at card scale */}
          <h3 style={{
            fontFamily: STRETCHY.body, fontWeight: 700,
            fontSize: 24, lineHeight: 1.05, letterSpacing: '-0.02em', margin: 0,
          }}>{name}</h3>
          <div style={{ fontFamily: STRETCHY.body, fontSize: 13, color: STRETCHY.textDim }}>
            {host} · {hood}
          </div>
        </div>
        <div style={{ flexShrink: 0 }}>
          <MovementTile type={type} size={48} />
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0 }}>
          <ProgressPips held={held} total={min} size={12}
            color={accent}
            dimColor="rgba(26,26,26,0.14)"
          />
          <span style={{ fontFamily: STRETCHY.mono, fontSize: 11, color: STRETCHY.textDim, letterSpacing: '0.04em' }}>
            {state === 'confirmed'  ? `${held} HELD · GOING AHEAD` :
             state === 'almostFull' ? `⚡ ${needsMore || 'last'} ${needsMore === 1 ? 'spot' : 'spots'} left` :
                                       `${held}/${min} HELD · NEEDS ${needsMore} TO GO`}
          </span>
        </div>
        <PricePill value={price} state={state} size="sm" />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Section divider with optional label
// ─────────────────────────────────────────────────────────────
function MenuPill({ children, dark = true }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '8px 14px', borderRadius: 999,
      background: dark ? 'rgba(245,237,227,0.10)' : 'rgba(26,26,26,0.06)',
      color: dark ? STRETCHY.cream : STRETCHY.black,
      fontFamily: STRETCHY.mono, fontSize: 11, fontWeight: 600, letterSpacing: '0.16em',
    }}>{children}</div>
  );
}

// TopBar — standard chrome for every screen.
// S logomark sits top-left as the persistent brand anchor (like the host view).
// Tapping the S opens the global menu drawer.
// Pass a custom `left`, `center`, or `right` to override defaults.
function TopBar({ left, center, right, dark = false, backable = false, noBrand = false }) {
  const fg = dark ? STRETCHY.cream : STRETCHY.black;
  const bg = dark ? 'rgba(245,237,227,0.10)' : 'rgba(26,26,26,0.06)';
  const menu = useMenu();

  const defaultLeft = noBrand ? null : (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <button
        onClick={() => menu.setOpen(true)}
        aria-label="Open menu"
        style={{
          width: 36, height: 36, border: 'none', background: 'transparent',
          padding: 0, cursor: 'pointer', color: fg,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        <SMark size={28} color={fg} />
      </button>
      {backable && (
        <button style={{
          width: 36, height: 36, borderRadius: 999, border: 'none',
          background: bg, color: fg, fontSize: 16, cursor: 'pointer',
        }}>←</button>
      )}
    </div>
  );
  const defaultRight = (
    <div style={{
      width: 40, height: 40, borderRadius: 999, background: bg,
      display: 'flex', alignItems: 'center', justifyContent: 'center', color: fg,
      position: 'relative',
    }}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9zm4 13a2 2 0 004 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <div style={{ position: 'absolute', top: 8, right: 9, width: 8, height: 8, background: STRETCHY.hotPink, borderRadius: 999 }} />
    </div>
  );

  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '14px 20px', gap: 12,
    }}>
      <div style={{ flexShrink: 0 }}>{left !== undefined ? left : defaultLeft}</div>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', minWidth: 0 }}>{center}</div>
      <div style={{ flexShrink: 0 }}>{right || defaultRight}</div>
    </div>
  );
}

// Legacy alias kept so screens.jsx keeps working. Center pill is now clickable → menu.
function StretchyNav({ dark = false, showWordmark = false, center }) {
  const menu = useMenu();
  return <TopBar dark={dark} center={
    center ?? (
      <button onClick={() => menu.setOpen(true)} style={{
        border: 'none', background: 'transparent', padding: 0, cursor: 'pointer',
      }}>
        <MenuPill dark={dark}>≡ &nbsp;MENU</MenuPill>
      </button>
    )
  } />;
}

Object.assign(window, {
  STRETCHY, MOVEMENT, SMark, Wordmark, PillButton, PricePill,
  ProgressPips, PricingCurve, PricingScale, SessionCard, MovementTile,
  MenuPill, StretchyNav, TopBar,
  SRating, NotificationCard, FormField, Chip,
  MenuProvider, MenuOverlay, useMenu,
});

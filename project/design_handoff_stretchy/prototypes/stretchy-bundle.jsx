// ===== Stretchy bundled app (auto-concatenated; edit the source .jsx files, not this) =====

// ─────────── ios-frame.jsx ───────────


// iOS.jsx — Simplified iOS 26 (Liquid Glass) device frame
// Based on the iOS 26 UI Kit + Figma status bar spec. No assets, no deps.
// Exports: IOSDevice, IOSStatusBar, IOSNavBar, IOSGlassPill, IOSList, IOSListRow, IOSKeyboard

// ─────────────────────────────────────────────────────────────
// Status bar
// ─────────────────────────────────────────────────────────────
function IOSStatusBar({ dark = false, time = '9:41' }) {
  const c = dark ? '#fff' : '#000';
  return (
    <div style={{
      display: 'flex', gap: 154, alignItems: 'center', justifyContent: 'center',
      padding: '21px 24px 19px', boxSizing: 'border-box',
      position: 'relative', zIndex: 20, width: '100%',
    }}>
      <div style={{ flex: 1, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 1.5 }}>
        <span style={{
          fontFamily: '-apple-system, "SF Pro", system-ui', fontWeight: 590,
          fontSize: 17, lineHeight: '22px', color: c,
        }}>{time}</span>
      </div>
      <div style={{ flex: 1, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, paddingTop: 1, paddingRight: 1 }}>
        <svg width="19" height="12" viewBox="0 0 19 12">
          <rect x="0" y="7.5" width="3.2" height="4.5" rx="0.7" fill={c}/>
          <rect x="4.8" y="5" width="3.2" height="7" rx="0.7" fill={c}/>
          <rect x="9.6" y="2.5" width="3.2" height="9.5" rx="0.7" fill={c}/>
          <rect x="14.4" y="0" width="3.2" height="12" rx="0.7" fill={c}/>
        </svg>
        <svg width="17" height="12" viewBox="0 0 17 12">
          <path d="M8.5 3.2C10.8 3.2 12.9 4.1 14.4 5.6L15.5 4.5C13.7 2.7 11.2 1.5 8.5 1.5C5.8 1.5 3.3 2.7 1.5 4.5L2.6 5.6C4.1 4.1 6.2 3.2 8.5 3.2Z" fill={c}/>
          <path d="M8.5 6.8C9.9 6.8 11.1 7.3 12 8.2L13.1 7.1C11.8 5.9 10.2 5.1 8.5 5.1C6.8 5.1 5.2 5.9 3.9 7.1L5 8.2C5.9 7.3 7.1 6.8 8.5 6.8Z" fill={c}/>
          <circle cx="8.5" cy="10.5" r="1.5" fill={c}/>
        </svg>
        <svg width="27" height="13" viewBox="0 0 27 13">
          <rect x="0.5" y="0.5" width="23" height="12" rx="3.5" stroke={c} strokeOpacity="0.35" fill="none"/>
          <rect x="2" y="2" width="20" height="9" rx="2" fill={c}/>
          <path d="M25 4.5V8.5C25.8 8.2 26.5 7.2 26.5 6.5C26.5 5.8 25.8 4.8 25 4.5Z" fill={c} fillOpacity="0.4"/>
        </svg>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Liquid glass pill — blur + tint + shine
// ─────────────────────────────────────────────────────────────
function IOSGlassPill({ children, dark = false, style = {} }) {
  return (
    <div style={{
      height: 44, minWidth: 44, borderRadius: 9999,
      position: 'relative', overflow: 'hidden',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: dark
        ? '0 2px 6px rgba(0,0,0,0.35), 0 6px 16px rgba(0,0,0,0.2)'
        : '0 1px 3px rgba(0,0,0,0.07), 0 3px 10px rgba(0,0,0,0.06)',
      ...style,
    }}>
      {/* blur + tint */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: 9999,
        backdropFilter: 'blur(12px) saturate(180%)',
        WebkitBackdropFilter: 'blur(12px) saturate(180%)',
        background: dark ? 'rgba(120,120,128,0.28)' : 'rgba(255,255,255,0.5)',
      }} />
      {/* shine */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: 9999,
        boxShadow: dark
          ? 'inset 1.5px 1.5px 1px rgba(255,255,255,0.15), inset -1px -1px 1px rgba(255,255,255,0.08)'
          : 'inset 1.5px 1.5px 1px rgba(255,255,255,0.7), inset -1px -1px 1px rgba(255,255,255,0.4)',
        border: dark ? '0.5px solid rgba(255,255,255,0.15)' : '0.5px solid rgba(0,0,0,0.06)',
      }} />
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', padding: '0 4px' }}>
        {children}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Navigation bar — glass pills + large title
// ─────────────────────────────────────────────────────────────
function IOSNavBar({ title = 'Title', dark = false, trailingIcon = true }) {
  const muted = dark ? 'rgba(255,255,255,0.6)' : '#404040';
  const text = dark ? '#fff' : '#000';
  const pillIcon = (content) => (
    <IOSGlassPill dark={dark}>
      <div style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {content}
      </div>
    </IOSGlassPill>
  );
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: 10,
      paddingTop: 62, paddingBottom: 10, position: 'relative', zIndex: 5,
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 16px',
      }}>
        {/* back chevron */}
        {pillIcon(
          <svg width="12" height="20" viewBox="0 0 12 20" fill="none" style={{ marginLeft: -1 }}>
            <path d="M10 2L2 10l8 8" stroke={muted} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
        {/* trailing ellipsis */}
        {trailingIcon && pillIcon(
          <svg width="22" height="6" viewBox="0 0 22 6">
            <circle cx="3" cy="3" r="2.5" fill={muted}/>
            <circle cx="11" cy="3" r="2.5" fill={muted}/>
            <circle cx="19" cy="3" r="2.5" fill={muted}/>
          </svg>
        )}
      </div>
      {/* large title */}
      <div style={{
        padding: '0 16px',
        fontFamily: '-apple-system, system-ui',
        fontSize: 34, fontWeight: 700, lineHeight: '41px',
        color: text, letterSpacing: 0.4,
      }}>{title}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Grouped list (inset card, r:26) + row (52px)
// ─────────────────────────────────────────────────────────────
function IOSListRow({ title, detail, icon, chevron = true, isLast = false, dark = false }) {
  const text = dark ? '#fff' : '#000';
  const sec = dark ? 'rgba(235,235,245,0.6)' : 'rgba(60,60,67,0.6)';
  const ter = dark ? 'rgba(235,235,245,0.3)' : 'rgba(60,60,67,0.3)';
  const sep = dark ? 'rgba(84,84,88,0.65)' : 'rgba(60,60,67,0.12)';
  return (
    <div style={{
      display: 'flex', alignItems: 'center', minHeight: 52,
      padding: '0 16px', position: 'relative',
      fontFamily: '-apple-system, system-ui', fontSize: 17,
      letterSpacing: -0.43,
    }}>
      {icon && (
        <div style={{
          width: 30, height: 30, borderRadius: 7, background: icon,
          marginRight: 12, flexShrink: 0,
        }} />
      )}
      <div style={{ flex: 1, color: text }}>{title}</div>
      {detail && <span style={{ color: sec, marginRight: 6 }}>{detail}</span>}
      {chevron && (
        <svg width="8" height="14" viewBox="0 0 8 14" style={{ flexShrink: 0 }}>
          <path d="M1 1l6 6-6 6" stroke={ter} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
      {!isLast && (
        <div style={{
          position: 'absolute', bottom: 0, right: 0,
          left: icon ? 58 : 16, height: 0.5, background: sep,
        }} />
      )}
    </div>
  );
}

function IOSList({ header, children, dark = false }) {
  const hc = dark ? 'rgba(235,235,245,0.6)' : 'rgba(60,60,67,0.6)';
  const bg = dark ? '#1C1C1E' : '#fff';
  return (
    <div>
      {header && (
        <div style={{
          fontFamily: '-apple-system, system-ui', fontSize: 13,
          color: hc, textTransform: 'uppercase',
          padding: '8px 36px 6px', letterSpacing: -0.08,
        }}>{header}</div>
      )}
      <div style={{
        background: bg, borderRadius: 26,
        margin: '0 16px', overflow: 'hidden',
      }}>{children}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Device frame
// ─────────────────────────────────────────────────────────────
function IOSDevice({
  children, width = 402, height = 874, dark = false,
  title, keyboard = false,
}) {
  return (
    <div style={{
      width, height, borderRadius: 48, overflow: 'hidden',
      position: 'relative', background: dark ? '#000' : '#F2F2F7',
      boxShadow: '0 40px 80px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.12)',
      fontFamily: '-apple-system, system-ui, sans-serif',
      WebkitFontSmoothing: 'antialiased',
    }}>
      {/* dynamic island */}
      <div style={{
        position: 'absolute', top: 11, left: '50%', transform: 'translateX(-50%)',
        width: 126, height: 37, borderRadius: 24, background: '#000', zIndex: 50,
      }} />
      {/* status bar (absolute) */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10 }}>
        <IOSStatusBar dark={dark} />
      </div>
      {/* nav + content */}
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {title !== undefined && <IOSNavBar title={title} dark={dark} />}
        <div style={{ flex: 1, overflow: 'auto' }}>{children}</div>
        {keyboard && <IOSKeyboard dark={dark} />}
      </div>
      {/* home indicator — always on top */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 60,
        height: 34, display: 'flex', justifyContent: 'center', alignItems: 'flex-end',
        paddingBottom: 8, pointerEvents: 'none',
      }}>
        <div style={{
          width: 139, height: 5, borderRadius: 100,
          background: dark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.25)',
        }} />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Keyboard — iOS 26 liquid glass
// ─────────────────────────────────────────────────────────────
function IOSKeyboard({ dark = false }) {
  const glyph = dark ? 'rgba(255,255,255,0.7)' : '#595959';
  const sugg = dark ? 'rgba(255,255,255,0.6)' : '#333';
  const keyBg = dark ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.85)';

  // special-key icons
  const icons = {
    shift: <svg width="19" height="17" viewBox="0 0 19 17"><path d="M9.5 1L1 9.5h4.5V16h8V9.5H18L9.5 1z" fill={glyph}/></svg>,
    del: <svg width="23" height="17" viewBox="0 0 23 17"><path d="M7 1h13a2 2 0 012 2v11a2 2 0 01-2 2H7l-6-7.5L7 1z" fill="none" stroke={glyph} strokeWidth="1.6" strokeLinejoin="round"/><path d="M10 5l7 7M17 5l-7 7" stroke={glyph} strokeWidth="1.6" strokeLinecap="round"/></svg>,
    ret: <svg width="20" height="14" viewBox="0 0 20 14"><path d="M18 1v6H4m0 0l4-4M4 7l4 4" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  };

  const key = (content, { w, flex, ret, fs = 25, k } = {}) => (
    <div key={k} style={{
      height: 42, borderRadius: 8.5,
      flex: flex ? 1 : undefined, width: w, minWidth: 0,
      background: ret ? '#08f' : keyBg,
      boxShadow: '0 1px 0 rgba(0,0,0,0.075)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: '-apple-system, "SF Compact", system-ui',
      fontSize: fs, fontWeight: 458, color: ret ? '#fff' : glyph,
    }}>{content}</div>
  );

  const row = (keys, pad = 0) => (
    <div style={{ display: 'flex', gap: 6.5, justifyContent: 'center', padding: `0 ${pad}px` }}>
      {keys.map(l => key(l, { flex: true, k: l }))}
    </div>
  );

  return (
    <div style={{
      position: 'relative', zIndex: 15, borderRadius: 27, overflow: 'hidden',
      padding: '11px 0 2px',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      boxShadow: dark
        ? '0 -2px 20px rgba(0,0,0,0.09)'
        : '0 -1px 6px rgba(0,0,0,0.018), 0 -3px 20px rgba(0,0,0,0.012)',
    }}>
      {/* liquid glass bg — same recipe as nav pills */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: 27,
        backdropFilter: 'blur(12px) saturate(180%)',
        WebkitBackdropFilter: 'blur(12px) saturate(180%)',
        background: dark ? 'rgba(120,120,128,0.14)' : 'rgba(255,255,255,0.25)',
      }} />
      <div style={{
        position: 'absolute', inset: 0, borderRadius: 27,
        boxShadow: dark
          ? 'inset 1.5px 1.5px 1px rgba(255,255,255,0.15)'
          : 'inset 1.5px 1.5px 1px rgba(255,255,255,0.7), inset -1px -1px 1px rgba(255,255,255,0.4)',
        border: dark ? '0.5px solid rgba(255,255,255,0.15)' : '0.5px solid rgba(0,0,0,0.06)',
        pointerEvents: 'none',
      }} />

      {/* autocorrect bar */}
      <div style={{
        display: 'flex', gap: 20, alignItems: 'center',
        padding: '8px 22px 13px', width: '100%', boxSizing: 'border-box',
        position: 'relative',
      }}>
        {['"The"', 'the', 'to'].map((w, i) => (
          <React.Fragment key={i}>
            {i > 0 && <div style={{ width: 1, height: 25, background: '#ccc', opacity: 0.3 }} />}
            <div style={{
              flex: 1, textAlign: 'center',
              fontFamily: '-apple-system, system-ui', fontSize: 17,
              color: sugg, letterSpacing: -0.43, lineHeight: '22px',
            }}>{w}</div>
          </React.Fragment>
        ))}
      </div>

      {/* key layout */}
      <div style={{
        display: 'flex', flexDirection: 'column', gap: 13,
        padding: '0 6.5px', width: '100%', boxSizing: 'border-box',
        position: 'relative',
      }}>
        {row(['q','w','e','r','t','y','u','i','o','p'])}
        {row(['a','s','d','f','g','h','j','k','l'], 20)}
        <div style={{ display: 'flex', gap: 14.25, alignItems: 'center' }}>
          {key(icons.shift, { w: 45, k: 'shift' })}
          <div style={{ display: 'flex', gap: 6.5, flex: 1 }}>
            {['z','x','c','v','b','n','m'].map(l => key(l, { flex: true, k: l }))}
          </div>
          {key(icons.del, { w: 45, k: 'del' })}
        </div>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          {key('ABC', { w: 92.25, fs: 18, k: 'abc' })}
          {key('', { flex: true, k: 'space' })}
          {key(icons.ret, { w: 92.25, ret: true, k: 'ret' })}
        </div>
      </div>

      {/* bottom spacer (emoji+mic area, icons omitted) */}
      <div style={{ height: 56, width: '100%', position: 'relative' }} />
    </div>
  );
}

Object.assign(window, {
  IOSDevice, IOSStatusBar, IOSNavBar, IOSGlassPill, IOSList, IOSListRow, IOSKeyboard,
});


// ─────────── components.jsx ───────────

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


// ─────────── screens.jsx ───────────

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


// ─────────── screens-attendee.jsx ───────────

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


// ─────────── screens-host.jsx ───────────

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


// ─────────── screens-admin.jsx ───────────

// Stretchy — Admin / Stretchy HQ screens on mobile (ADM-01..ADM-08).
// Same brand system; denser layout, status-led, data-first.

const TAD = STRETCHY;
const AD_CARD = '1.5px solid rgba(26,26,26,0.08)';
const AD_HAIR = '1.5px solid rgba(26,26,26,0.10)';

// Small status pill helper used across admin screens.
function StatusPill({ children, color = TAD.black, bg }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: '4px 9px', borderRadius: 999,
      background: bg || (color + '22'), color,
      fontFamily: TAD.mono, fontSize: 10, fontWeight: 700, letterSpacing: '0.10em',
    }}>{children}</span>
  );
}

// Admin nav — same TopBar but with an HQ pill in center and admin badge top-right
function AdminTopBar({ centerLabel, right }) {
  return (
    <TopBar
      backable
      center={
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '6px 12px', borderRadius: 999, background: TAD.black, color: TAD.cream,
          fontFamily: TAD.mono, fontSize: 10, fontWeight: 700, letterSpacing: '0.14em',
        }}>
          <span style={{ width: 6, height: 6, borderRadius: 999, background: TAD.hotPink }} />
          STRETCHY HQ · {centerLabel}
        </div>
      }
      right={right}
    />
  );
}

// ════════════════════════════════════════════════════════════════
// ADM-01 — VETTING QUEUE (host applications)
// ════════════════════════════════════════════════════════════════
function ScreenAdmVetting() {
  const apps = [
    { name: 'Tāne Ratima',   teaches: 'Vinyasa · Slow Flow', hood: 'Grey Lynn',   years: 4,  status: 'IN REVIEW',   color: TAD.yellow,  fg: TAD.black, hot: true },
    { name: 'Rua Ohia',       teaches: 'Sound Bath',          hood: 'Karangahape', years: 7,  status: 'PENDING',     color: TAD.pink,    fg: TAD.black },
    { name: 'Marlee Fisher',  teaches: 'Sunrise Yoga',        hood: 'Pt Chev',     years: 9,  status: 'MORE INFO',   color: TAD.orange,  fg: TAD.cream },
    { name: 'Alex Kim',       teaches: 'Breath · HIIT',       hood: 'Herne Bay',   years: 3,  status: 'APPROVED',    color: TAD.green,   fg: TAD.cream },
    { name: 'Jess Mendez',    teaches: 'Pilates',             hood: 'Ponsonby',    years: 6,  status: 'DECLINED',    color: '#6E6E6E',   fg: TAD.cream },
    { name: 'Pip Carter',     teaches: 'Run + Stretch',       hood: 'Mt Eden',     years: 5,  status: 'PENDING',     color: TAD.pink,    fg: TAD.black },
  ];

  return (
    <div data-screen-label="ADM-01 Vetting Queue" style={{
      background: TAD.cream, color: TAD.black, minHeight: '100%',
      fontFamily: TAD.body, paddingBottom: 100,
    }}>
      <AdminTopBar centerLabel="VETTING"
        right={
          <button style={{ width: 40, height: 40, borderRadius: 999, border: 'none', background: 'rgba(26,26,26,0.06)', color: TAD.black, fontSize: 16 }}>⌕</button>
        } />

      <div style={{ padding: '12px 22px 18px' }}>
        <p style={{ fontFamily: TAD.mono, fontSize: 11, letterSpacing: '0.20em', color: TAD.textDim, margin: 0 }}>
          6 IN QUEUE · OLDEST 4 DAYS
        </p>
        <h1 style={{
          fontFamily: TAD.title, fontWeight: 700, fontSize: 56, lineHeight: 0.9,
          letterSpacing: '-0.03em', margin: '10px 0 0'}}>
          Vetting<br/>queue.
        </h1>
      </div>

      {/* counts */}
      <div style={{ display: 'flex', gap: 8, padding: '0 14px 16px' }}>
        {[
          ['PENDING', 2, TAD.pink, TAD.black],
          ['IN REVIEW', 1, TAD.yellow, TAD.black],
          ['MORE INFO', 1, TAD.orange, TAD.cream],
          ['APPROVED', 1, TAD.green, TAD.cream],
          ['DECLINED', 1, '#6E6E6E', TAD.cream],
        ].map(([l, n, bg, fg]) => (
          <div key={l} style={{ flex: 1, padding: '10px 6px', borderRadius: 16, background: bg, color: fg, textAlign: 'center' }}>
            <div style={{ fontFamily: TAD.display, fontSize: 22, lineHeight: 0.9, letterSpacing: '-0.02em' }}>{n}</div>
            <div style={{ fontFamily: TAD.mono, fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', marginTop: 2 }}>{l}</div>
          </div>
        ))}
      </div>

      {/* filter chips */}
      <div style={{ display: 'flex', gap: 8, padding: '0 22px 14px', overflow: 'auto' }}>
        {['ALL', 'NEEDS YOU', 'PENDING', 'IN REVIEW', 'MORE INFO'].map((f, i) => (
          <span key={f} style={{
            padding: '8px 14px', borderRadius: 999, whiteSpace: 'nowrap',
            background: i === 0 ? TAD.black : '#FFFFFF',
            color: i === 0 ? TAD.cream : TAD.black,
            border: i === 0 ? 'none' : AD_HAIR,
            fontFamily: TAD.mono, fontSize: 11, fontWeight: 700, letterSpacing: '0.10em',
          }}>{f}</span>
        ))}
      </div>

      {/* applicant cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '0 14px' }}>
        {apps.map((a, i) => (
          <div key={i} style={{
            padding: 16, borderRadius: 24, background: '#FFFFFF', border: a.hot ? `2px solid ${TAD.yellow}` : AD_CARD,
            display: 'flex', flexDirection: 'column', gap: 12,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1, minWidth: 0 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 999,
                  background: TAD.hotPink,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: TAD.display, color: TAD.cream, fontSize: 18, flexShrink: 0,
                }}>{a.name[0]}</div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{a.name}</div>
                  <div style={{ fontSize: 12, color: TAD.textDim }}>{a.teaches} · {a.hood} · {a.years}y</div>
                </div>
              </div>
              <StatusPill color={a.fg} bg={a.color}>{a.status}</StatusPill>
            </div>
            {(a.status === 'IN REVIEW' || a.status === 'PENDING') && (
              <div style={{ display: 'flex', gap: 6 }}>
                <PillButton variant="primary" size="sm" style={{ flex: 1 }}>✓ Approve</PillButton>
                <PillButton variant="ghostDark" size="sm">📞 Call</PillButton>
                <PillButton variant="ghostDark" size="sm">⌫</PillButton>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// ADM-02 — LIVE PLATFORM VIEW
// ════════════════════════════════════════════════════════════════
function ScreenAdmLive() {
  const sessions = [
    { name: 'Sunday Slow Flow', host: 'Tāne',   when: 'Sun 9:00', holds: '9/8',   price: 19, status: 'CONFIRMED', color: TAD.green },
    { name: 'Pt Chev Sunrise',  host: 'Marlee', when: 'Sat 7:00', holds: '9/10',  price: 23, status: 'ALMOST FULL', color: TAD.hotPink, hot: true },
    { name: 'K Rd Sound Bath',  host: 'Rua',    when: 'Fri 8:00', holds: '5/8',   price: 42, status: 'FILLING',    color: TAD.orange },
    { name: 'Mt Eden Pilates',  host: 'Jess',   when: 'Thu 6:30', holds: '3/10',  price: 30, status: 'HOLDING',    color: TAD.pink },
    { name: 'Wed Breath',       host: 'Alex',   when: 'Wed 7:00', holds: '6/6',   price: 19, status: 'LOCKED',     color: TAD.black, fg: TAD.cream },
    { name: 'Tue Long Slow',    host: 'Pip',    when: 'Tue 6:00', holds: '2/8',   price: 33, status: 'SHORT',      color: TAD.red, fg: TAD.cream },
  ];

  return (
    <div data-screen-label="ADM-02 Live Platform" style={{
      background: TAD.cream, color: TAD.black, minHeight: '100%',
      fontFamily: TAD.body, paddingBottom: 100,
    }}>
      <AdminTopBar centerLabel="OVERSIGHT"
        right={<span style={{ fontFamily: TAD.mono, fontSize: 11, fontWeight: 700, letterSpacing: '0.10em', color: TAD.orange }}>● LIVE</span>}
      />

      <div style={{ padding: '12px 22px 14px' }}>
        <p style={{ fontFamily: TAD.mono, fontSize: 11, letterSpacing: '0.20em', color: TAD.textDim, margin: 0 }}>
          47 LIVE THIS WEEK · 2 NEED ATTENTION
        </p>
        <h1 style={{
          fontFamily: TAD.title, fontWeight: 700, fontSize: 48, lineHeight: 0.9,
          letterSpacing: '-0.03em', margin: '10px 0 0'}}>
          Everything,<br/>everywhere.
        </h1>
      </div>

      {/* status row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6, padding: '0 14px 14px' }}>
        {[
          ['HOLDING', 14, TAD.pink],
          ['FILLING', 12, TAD.orange],
          ['CONFIRMED', 8, TAD.green],
          ['SHORT', 2, TAD.red],
        ].map(([l, n, c]) => (
          <div key={l} style={{ padding: 10, borderRadius: 16, background: '#FFFFFF', border: `2px solid ${c}` }}>
            <div style={{ fontFamily: TAD.display, fontSize: 24, lineHeight: 0.9, letterSpacing: '-0.02em' }}>{n}</div>
            <div style={{ fontFamily: TAD.mono, fontSize: 9, fontWeight: 700, letterSpacing: '0.10em', color: c, marginTop: 4 }}>{l}</div>
          </div>
        ))}
      </div>

      {/* filter chips */}
      <div style={{ display: 'flex', gap: 8, padding: '0 22px 14px', overflow: 'auto' }}>
        {['ALL · 47', 'AUCKLAND', 'NEEDS HELP', 'CONFIRMED', 'LOCKED', 'CANCELLED'].map((f, i) => (
          <span key={f} style={{
            padding: '8px 14px', borderRadius: 999, whiteSpace: 'nowrap',
            background: i === 0 ? TAD.black : '#FFFFFF',
            color: i === 0 ? TAD.cream : TAD.black,
            border: i === 0 ? 'none' : AD_HAIR,
            fontFamily: TAD.mono, fontSize: 11, fontWeight: 700, letterSpacing: '0.10em',
          }}>{f}</span>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '0 14px' }}>
        {sessions.map((s, i) => (
          <div key={i} style={{
            padding: '14px 16px', borderRadius: 20, background: '#FFFFFF',
            border: s.hot ? `1.5px solid ${TAD.hotPink}` : AD_CARD,
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                <StatusPill color={s.fg || TAD.black} bg={s.color === TAD.black ? TAD.black : s.color === TAD.red ? TAD.red : s.color + '33'}>
                  {s.status}
                </StatusPill>
                <span style={{ fontFamily: TAD.mono, fontSize: 10, color: TAD.textDim, letterSpacing: '0.10em' }}>{s.when}</span>
              </div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{s.name}</div>
              <div style={{ fontSize: 11, color: TAD.textDim, marginTop: 2 }}>{s.host} · {s.holds} held</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: TAD.mono, fontSize: 16, fontWeight: 700 }}>${s.price}</div>
              <div style={{ fontFamily: TAD.mono, fontSize: 9, color: TAD.textDim, letterSpacing: '0.10em', marginTop: 2 }}>/SPOT</div>
            </div>
            <button style={{
              width: 32, height: 32, borderRadius: 999, border: 'none',
              background: 'rgba(26,26,26,0.06)', color: TAD.black, fontSize: 14,
            }}>›</button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// ADM-03 — SUGGESTIONS MANAGER
// ════════════════════════════════════════════════════════════════
function ScreenAdmSuggestions() {
  const items = [
    { name: 'Sunset HIIT at the viaduct', type: 'hiit', votes: 47, matched: 'Alex K.', status: 'NOTIFY' },
    { name: 'Te Atatū Sunday yoga',       type: 'yoga', votes: 32, matched: null,       status: 'NO MATCH' },
    { name: 'Run-then-stretch, Ponsonby', type: 'run',  votes: 28, matched: 'Pip C.',   status: 'NOTIFIED' },
    { name: 'Lunch pilates in the CBD',   type: 'pilates', votes: 19, matched: 'Jess M.', status: 'NOTIFIED' },
    { name: 'Cold plunge + sound bath',   type: 'sound', votes: 14, matched: null,      status: 'NO MATCH' },
  ];

  return (
    <div data-screen-label="ADM-03 Suggestions" style={{
      background: TAD.cream, color: TAD.black, minHeight: '100%',
      fontFamily: TAD.body, paddingBottom: 100,
    }}>
      <AdminTopBar centerLabel="SUGGESTIONS" />

      <div style={{ padding: '12px 22px 18px' }}>
        <p style={{ fontFamily: TAD.mono, fontSize: 11, letterSpacing: '0.20em', color: TAD.textDim, margin: 0 }}>
          5 LIVE · 2 HOT · 140 TOTAL VOTES
        </p>
        <h1 style={{
          fontFamily: TAD.title, fontWeight: 700, fontSize: 52, lineHeight: 0.9,
          letterSpacing: '-0.03em', margin: '10px 0 0'}}>
          What people<br/>want next.
        </h1>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '0 14px' }}>
        {items.map((it, i) => {
          const m = MOVEMENT[it.type];
          return (
            <div key={i} style={{
              padding: 16, borderRadius: 24, background: '#FFFFFF', border: AD_CARD,
              display: 'flex', flexDirection: 'column', gap: 12,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <MovementTile type={it.type} size={48} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: 15, lineHeight: 1.2 }}>{it.name}</div>
                  <div style={{ fontFamily: TAD.mono, fontSize: 10, color: TAD.textDim, marginTop: 4, letterSpacing: '0.10em' }}>
                    {m.label} · {it.votes} VOTES
                  </div>
                </div>
                <div style={{
                  display: 'flex', alignItems: 'baseline',
                  padding: '6px 12px', borderRadius: 999,
                  background: it.votes >= 30 ? TAD.hotPink : 'rgba(26,26,26,0.06)',
                  color: it.votes >= 30 ? TAD.cream : TAD.black,
                  fontFamily: TAD.display, fontSize: 22, fontWeight: 400, letterSpacing: '-0.02em',
                }}>{it.votes}</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
                <div style={{ fontSize: 12, color: TAD.textDim }}>
                  {it.matched ? <>Best match: <strong style={{ color: TAD.black }}>{it.matched}</strong></> : <em>No matching host yet</em>}
                </div>
                <StatusPill
                  color={it.status === 'NOTIFY' ? TAD.cream : it.status === 'NOTIFIED' ? '#2E7A52' : TAD.textDim}
                  bg={it.status === 'NOTIFY' ? TAD.hotPink : it.status === 'NOTIFIED' ? '#E6F5EC' : 'rgba(26,26,26,0.06)'}
                >{it.status}</StatusPill>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// ADM-04 — FINANCIAL DASHBOARD
// ════════════════════════════════════════════════════════════════
function ScreenAdmFinance() {
  return (
    <div data-screen-label="ADM-04 Financial" style={{
      background: TAD.cream, color: TAD.black, minHeight: '100%',
      fontFamily: TAD.body, paddingBottom: 100,
    }}>
      <AdminTopBar centerLabel="FINANCE"
        right={<span style={{ fontFamily: TAD.mono, fontSize: 11, fontWeight: 700, letterSpacing: '0.10em', color: TAD.textDim }}>MAY '26</span>}
      />

      <div style={{ padding: '12px 22px 18px' }}>
        <p style={{ fontFamily: TAD.mono, fontSize: 11, letterSpacing: '0.20em', color: TAD.textDim, margin: 0 }}>
          MONTH TO DATE · NZD
        </p>
        <h1 style={{
          fontFamily: TAD.title, fontWeight: 700, fontSize: 48, lineHeight: 0.9,
          letterSpacing: '-0.03em', margin: '10px 0 0'}}>
          The money<br/>map.
        </h1>
      </div>

      {/* Big yellow fees tile */}
      <div style={{ margin: '0 14px 12px', padding: 24, borderRadius: 28, background: TAD.yellow, color: TAD.black }}>
        <span style={{ fontFamily: TAD.mono, fontSize: 11, fontWeight: 700, letterSpacing: '0.16em' }}>STRETCHY FEES COLLECTED</span>
        <div style={{ display: 'flex', alignItems: 'baseline', marginTop: 8 }}>
          <span style={{ fontFamily: TAD.mono, fontSize: 28, fontWeight: 700 }}>$</span>
          <span style={{ fontFamily: TAD.display, fontSize: 88, lineHeight: 0.85, letterSpacing: '-0.04em' }}>4,310</span>
        </div>
        <div style={{ display: 'flex', gap: 18, marginTop: 12, fontFamily: TAD.mono, fontSize: 12 }}>
          <span><strong>187</strong> sessions</span>
          <span><strong>$23</strong> avg fee</span>
          <span style={{ color: TAD.green }}><strong>+31%</strong> MoM</span>
        </div>
      </div>

      {/* mini grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, padding: '0 14px 12px' }}>
        <div style={{ padding: 16, borderRadius: 20, background: '#FFFFFF', border: AD_CARD }}>
          <span style={{ fontFamily: TAD.mono, fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', color: TAD.textDim }}>HOST PAYOUTS</span>
          <div style={{ fontFamily: TAD.display, fontSize: 32, lineHeight: 0.9, marginTop: 4, letterSpacing: '-0.02em' }}>$38,420</div>
          <div style={{ fontFamily: TAD.mono, fontSize: 11, color: TAD.green, marginTop: 4 }}>← processed Mon</div>
        </div>
        <div style={{ padding: 16, borderRadius: 20, background: '#FFFFFF', border: AD_CARD }}>
          <span style={{ fontFamily: TAD.mono, fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', color: TAD.textDim }}>AVG / SPOT</span>
          <div style={{ fontFamily: TAD.display, fontSize: 32, lineHeight: 0.9, marginTop: 4, letterSpacing: '-0.02em' }}>$22.40</div>
          <div style={{ fontFamily: TAD.mono, fontSize: 11, color: TAD.textDim, marginTop: 4 }}>9.4 avg room</div>
        </div>
        <div style={{ padding: 16, borderRadius: 20, background: '#FFFFFF', border: AD_CARD }}>
          <span style={{ fontFamily: TAD.mono, fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', color: TAD.textDim }}>TIPS</span>
          <div style={{ fontFamily: TAD.display, fontSize: 32, lineHeight: 0.9, marginTop: 4, letterSpacing: '-0.02em' }}>$612</div>
          <div style={{ fontFamily: TAD.mono, fontSize: 11, color: TAD.textDim, marginTop: 4 }}>83 tips</div>
        </div>
        <div style={{ padding: 16, borderRadius: 20, background: '#FFFFFF', border: `1.5px solid ${TAD.red}33` }}>
          <span style={{ fontFamily: TAD.mono, fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', color: TAD.red }}>REFUNDS</span>
          <div style={{ fontFamily: TAD.display, fontSize: 32, lineHeight: 0.9, marginTop: 4, letterSpacing: '-0.02em' }}>$184</div>
          <div style={{ fontFamily: TAD.mono, fontSize: 11, color: TAD.textDim, marginTop: 4 }}>6 events · 0 disputes</div>
        </div>
      </div>

      {/* Stripe activity list */}
      <div style={{ padding: '14px 22px 8px' }}>
        <h3 style={{ fontFamily: TAD.title, fontSize: 22, margin: 0, fontWeight: 700}}>Stripe activity</h3>
      </div>
      <div style={{ margin: '0 14px', padding: 0, borderRadius: 24, background: '#FFFFFF', border: AD_CARD, overflow: 'hidden' }}>
        {[
          ['16:42', 'Payout · 14 hosts', '+$3,840', TAD.green],
          ['15:18', 'Refund · Tue Long Slow', '−$184', TAD.red],
          ['14:30', 'Tip · Tāne (×3)', '+$15', TAD.green],
          ['12:11', 'Charge · 11 attendees', '+$253', TAD.green],
          ['10:04', 'Failed · card declined ×1', '— retry', TAD.orange],
        ].map((row, i, arr) => (
          <div key={i} style={{
            padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            borderBottom: i < arr.length - 1 ? '1px solid rgba(26,26,26,0.06)' : 'none',
          }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', minWidth: 0 }}>
              <span style={{ fontFamily: TAD.mono, fontSize: 11, color: TAD.textDim }}>{row[0]}</span>
              <span style={{ fontSize: 13 }}>{row[1]}</span>
            </div>
            <span style={{ fontFamily: TAD.mono, fontSize: 13, fontWeight: 700, color: row[3] }}>{row[2]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// ADM-05 — ATTENDEE CRM
// ════════════════════════════════════════════════════════════════
function ScreenAdmAttendeeCRM() {
  const people = [
    { name: 'Marlee Fisher', hood: 'Grey Lynn', sessions: 27, spend: 612, mates: 41, color: TAD.purple, vip: true },
    { name: 'Kit Petersen',  hood: 'Pt Chev',   sessions: 22, spend: 482, mates: 38, color: TAD.sky },
    { name: 'Ari Tipene',    hood: 'Ponsonby',  sessions: 18, spend: 410, mates: 22, color: TAD.royal },
    { name: 'Sam Wallace',   hood: 'Herne Bay', sessions: 14, spend: 322, mates: 19, color: TAD.olive },
    { name: 'Jess Mendez',   hood: 'Ponsonby',  sessions: 12, spend: 288, mates: 16, color: TAD.orange },
    { name: 'Olive Karena',  hood: 'Mt Eden',   sessions: 9,  spend: 198, mates: 11, color: TAD.green },
  ];

  return (
    <div data-screen-label="ADM-05 Attendee CRM" style={{
      background: TAD.cream, color: TAD.black, minHeight: '100%',
      fontFamily: TAD.body, paddingBottom: 100,
    }}>
      <AdminTopBar centerLabel="ATTENDEES"
        right={<button style={{ width: 40, height: 40, borderRadius: 999, border: 'none', background: 'rgba(26,26,26,0.06)', color: TAD.black, fontSize: 16 }}>⌕</button>}
      />

      <div style={{ padding: '12px 22px 18px' }}>
        <p style={{ fontFamily: TAD.mono, fontSize: 11, letterSpacing: '0.20em', color: TAD.textDim, margin: 0 }}>
          1,847 ACTIVE · 64% RETURN · GREY LYNN HOTTEST
        </p>
        <h1 style={{
          fontFamily: TAD.title, fontWeight: 700, fontSize: 52, lineHeight: 0.9,
          letterSpacing: '-0.03em', margin: '10px 0 0'}}>
          The mates.
        </h1>
      </div>

      {/* search/sort */}
      <div style={{ display: 'flex', gap: 8, padding: '0 14px 14px' }}>
        <div style={{ flex: 1, padding: '12px 16px', borderRadius: 999, background: '#FFFFFF', border: AD_HAIR, fontFamily: TAD.body, fontSize: 13, color: TAD.textDim }}>
          🔍 &nbsp;Search by name, suburb, host…
        </div>
        <PillButton variant="ghostDark" size="md">Sort ⌄</PillButton>
      </div>

      <div style={{ display: 'flex', gap: 6, padding: '0 22px 14px', overflow: 'auto' }}>
        {['ALL · 1,847', 'VIPs', 'NEW (30d)', 'AT RISK', 'BY HOOD'].map((f, i) => (
          <span key={f} style={{
            padding: '7px 12px', borderRadius: 999, whiteSpace: 'nowrap',
            background: i === 0 ? TAD.black : '#FFFFFF',
            color: i === 0 ? TAD.cream : TAD.black,
            border: i === 0 ? 'none' : AD_HAIR,
            fontFamily: TAD.mono, fontSize: 10, fontWeight: 700, letterSpacing: '0.10em',
          }}>{f}</span>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '0 14px' }}>
        {people.map((p, i) => (
          <div key={i} style={{
            padding: '14px 16px', borderRadius: 20, background: '#FFFFFF',
            border: p.vip ? `2px solid ${TAD.yellow}` : AD_CARD,
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: 999, background: p.color, color: '#FFFFFF',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: TAD.display, fontSize: 18,
            }}>{p.name[0]}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontWeight: 700, fontSize: 14 }}>{p.name}</span>
                {p.vip && <span style={{ fontFamily: TAD.mono, fontSize: 9, fontWeight: 700, color: TAD.black, background: TAD.yellow, padding: '2px 6px', borderRadius: 999, letterSpacing: '0.08em' }}>VIP</span>}
              </div>
              <div style={{ fontSize: 11, color: TAD.textDim, marginTop: 2 }}>
                {p.hood} · {p.sessions} sessions · {p.mates} mates
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: TAD.mono, fontSize: 14, fontWeight: 700, color: TAD.black }}>${p.spend}</div>
              <div style={{ fontFamily: TAD.mono, fontSize: 9, color: TAD.textDim, letterSpacing: '0.10em', marginTop: 2 }}>LIFETIME</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// ADM-06 — HOST CRM (with health score)
// ════════════════════════════════════════════════════════════════
function ScreenAdmHostCRM() {
  const hosts = [
    { name: 'Tāne Ratima',   teaches: 'Vinyasa',    sessions: 47, earned: 5840, health: 96, status: 'STAR',    color: TAD.purple },
    { name: 'Marlee Fisher', teaches: 'Sunrise',    sessions: 31, earned: 3920, health: 88, status: 'STAR',    color: TAD.orange },
    { name: 'Alex Kim',      teaches: 'Breath',     sessions: 24, earned: 2960, health: 78, status: 'STEADY',  color: TAD.olive },
    { name: 'Rua Ohia',      teaches: 'Sound',      sessions: 18, earned: 2200, health: 72, status: 'STEADY',  color: TAD.sky },
    { name: 'Pip Carter',    teaches: 'Run + Stretch', sessions: 6, earned: 720, health: 42, status: 'AT RISK', color: TAD.red, alert: true },
    { name: 'Jess Mendez',   teaches: 'Pilates',    sessions: 12, earned: 1480, health: 58, status: 'AT RISK', color: TAD.hotPink, alert: true, renew: true },
  ];

  return (
    <div data-screen-label="ADM-06 Host CRM" style={{
      background: TAD.cream, color: TAD.black, minHeight: '100%',
      fontFamily: TAD.body, paddingBottom: 100,
    }}>
      <AdminTopBar centerLabel="HOSTS"
        right={<button style={{ width: 40, height: 40, borderRadius: 999, border: 'none', background: 'rgba(26,26,26,0.06)', color: TAD.black, fontSize: 16 }}>⌕</button>}
      />

      <div style={{ padding: '12px 22px 18px' }}>
        <p style={{ fontFamily: TAD.mono, fontSize: 11, letterSpacing: '0.20em', color: TAD.textDim, margin: 0 }}>
          42 ACTIVE · 2 AT RISK · 1 VETTING RENEWAL DUE
        </p>
        <h1 style={{
          fontFamily: TAD.title, fontWeight: 700, fontSize: 52, lineHeight: 0.9,
          letterSpacing: '-0.03em', margin: '10px 0 0'}}>
          The bench.
        </h1>
      </div>

      <div style={{ display: 'flex', gap: 6, padding: '0 22px 14px', overflow: 'auto' }}>
        {['ALL · 42', 'STARS · 11', 'STEADY · 22', 'AT RISK · 2', 'VETTING DUE · 1'].map((f, i) => (
          <span key={f} style={{
            padding: '7px 12px', borderRadius: 999, whiteSpace: 'nowrap',
            background: i === 0 ? TAD.black : '#FFFFFF',
            color: i === 0 ? TAD.cream : TAD.black,
            border: i === 0 ? 'none' : AD_HAIR,
            fontFamily: TAD.mono, fontSize: 10, fontWeight: 700, letterSpacing: '0.10em',
          }}>{f}</span>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '0 14px' }}>
        {hosts.map((h, i) => (
          <div key={i} style={{
            padding: 16, borderRadius: 22, background: '#FFFFFF',
            border: h.alert ? `2px solid ${TAD.red}` : AD_CARD,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 44, height: 44, borderRadius: 999, background: h.color, color: '#FFFFFF',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: TAD.display, fontSize: 18,
              }}>{h.name[0]}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{h.name}</div>
                <div style={{ fontSize: 11, color: TAD.textDim, marginTop: 2 }}>
                  {h.teaches} · {h.sessions} sessions · ${h.earned}
                </div>
              </div>
              <StatusPill
                color={h.status === 'AT RISK' ? TAD.cream : h.status === 'STAR' ? TAD.black : '#2E7A52'}
                bg={h.status === 'AT RISK' ? TAD.red : h.status === 'STAR' ? TAD.yellow : '#E6F5EC'}
              >{h.status}</StatusPill>
            </div>
            {/* health bar */}
            <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontFamily: TAD.mono, fontSize: 10, fontWeight: 700, letterSpacing: '0.10em', color: TAD.textDim }}>HEALTH</span>
              <div style={{ flex: 1, height: 8, borderRadius: 999, background: 'rgba(26,26,26,0.08)', position: 'relative' }}>
                <div style={{
                  width: `${h.health}%`, height: '100%', borderRadius: 999,
                  background: h.health >= 80 ? TAD.green : h.health >= 60 ? TAD.yellow : TAD.red,
                }} />
              </div>
              <span style={{ fontFamily: TAD.mono, fontSize: 12, fontWeight: 700 }}>{h.health}</span>
            </div>
            {h.renew && (
              <div style={{
                marginTop: 10, padding: '8px 12px', borderRadius: 12, background: TAD.orange + '22',
                fontFamily: TAD.mono, fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: TAD.orange,
              }}>⚠ VETTING RENEWAL DUE IN 12 DAYS</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// ADM-07 — CONTENT MODERATION (photo/video queue)
// ════════════════════════════════════════════════════════════════
function ScreenAdmModeration() {
  return (
    <div data-screen-label="ADM-07 Moderation" style={{
      background: TAD.cream, color: TAD.black, minHeight: '100%',
      fontFamily: TAD.body, paddingBottom: 100,
    }}>
      <AdminTopBar centerLabel="MODERATION"
        right={<span style={{ fontFamily: TAD.mono, fontSize: 11, fontWeight: 700, letterSpacing: '0.10em', color: TAD.textDim }}>12 LEFT</span>}
      />

      <div style={{ padding: '12px 22px 18px' }}>
        <p style={{ fontFamily: TAD.mono, fontSize: 11, letterSpacing: '0.20em', color: TAD.textDim, margin: 0 }}>
          NEVER AUTO-PUBLISH · ALL HUMAN-REVIEWED
        </p>
        <h1 style={{
          fontFamily: TAD.title, fontWeight: 700, fontSize: 52, lineHeight: 0.9,
          letterSpacing: '-0.03em', margin: '10px 0 0'}}>
          The queue.
        </h1>
      </div>

      {/* The card stack: current + peek at next 2 */}
      <div style={{ position: 'relative', height: 460, margin: '0 14px' }}>
        {/* peek 2 */}
        <div style={{
          position: 'absolute', top: 12, left: 30, right: 30, height: 440,
          background: '#FFFFFF', border: AD_CARD, borderRadius: 28, opacity: 0.5,
        }} />
        <div style={{
          position: 'absolute', top: 6, left: 18, right: 18, height: 440,
          background: '#FFFFFF', border: AD_CARD, borderRadius: 28, opacity: 0.85,
        }} />
        {/* top card */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 440,
          background: '#FFFFFF', border: AD_CARD, borderRadius: 28, padding: 16,
          display: 'flex', flexDirection: 'column', gap: 12,
        }}>
          {/* media placeholder */}
          <div style={{
            flex: 1, borderRadius: 20, position: 'relative', overflow: 'hidden',
            background: TAD.purple,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: TAD.cream, fontFamily: TAD.mono, fontSize: 12, fontWeight: 700, letterSpacing: '0.12em',
          }}>
            <span style={{ position: 'absolute', top: 12, left: 12, padding: '6px 12px', background: 'rgba(0,0,0,0.5)', color: TAD.cream, fontFamily: TAD.mono, fontSize: 11, borderRadius: 999, letterSpacing: '0.10em' }}>VIDEO · 0:23</span>
            <span style={{ position: 'absolute', top: 12, right: 12, padding: '6px 12px', background: 'rgba(0,0,0,0.5)', color: TAD.cream, fontFamily: TAD.mono, fontSize: 11, borderRadius: 999 }}>2 / 12</span>
            ▶ &nbsp;SUNDAY SLOW FLOW · GREY LYNN
          </div>

          <div>
            <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 2 }}>From Marlee F. · Sunday Slow Flow</div>
            <div style={{ fontSize: 12, color: TAD.textDim }}>Consent given · 14 mates in frame · uploaded 3h ago</div>
          </div>

          {/* AI hints */}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            <StatusPill color={TAD.green} bg="#E6F5EC">✓ No flagged content</StatusPill>
            <StatusPill color={TAD.olive} bg={TAD.olive + '22'}>✓ Faces opt-in</StatusPill>
            <StatusPill color={TAD.orange} bg={TAD.orange + '22'}>⚠ Audio not consented</StatusPill>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: 10, padding: '24px 14px 0' }}>
        <PillButton variant="ghostDark" size="md" style={{ flex: 1 }}>↺ Re-upload</PillButton>
        <PillButton variant="dark" size="md" style={{ flex: 1, background: TAD.red, color: TAD.cream }}>✕ Reject</PillButton>
        <PillButton variant="primary" size="md" style={{ flex: 1.4, background: TAD.green, color: TAD.cream }}>✓ Approve</PillButton>
      </div>

      <p style={{ margin: '14px 14px 0', fontSize: 12, color: TAD.textDim, textAlign: 'center', lineHeight: 1.45 }}>
        Approved content goes to the social pipeline. Mute audio before push if needed.
      </p>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// ADM-08 — ANALYTICS
// ════════════════════════════════════════════════════════════════
function ScreenAdmAnalytics() {
  // mini bar chart bars
  const weekBars = [38, 45, 52, 41, 58, 47, 62];
  const max = Math.max(...weekBars);

  return (
    <div data-screen-label="ADM-08 Analytics" style={{
      background: TAD.cream, color: TAD.black, minHeight: '100%',
      fontFamily: TAD.body, paddingBottom: 100,
    }}>
      <AdminTopBar centerLabel="ANALYTICS"
        right={<span style={{ fontFamily: TAD.mono, fontSize: 11, fontWeight: 700, letterSpacing: '0.10em', color: TAD.textDim }}>30D</span>}
      />

      <div style={{ padding: '12px 22px 18px' }}>
        <p style={{ fontFamily: TAD.mono, fontSize: 11, letterSpacing: '0.20em', color: TAD.textDim, margin: 0 }}>
          PLATFORM HEALTH · LAST 30 DAYS
        </p>
        <h1 style={{
          fontFamily: TAD.title, fontWeight: 700, fontSize: 52, lineHeight: 0.9,
          letterSpacing: '-0.03em', margin: '10px 0 0'}}>
          How it's<br/>moving.
        </h1>
      </div>

      {/* big number */}
      <div style={{ margin: '0 14px', padding: 22, borderRadius: 28, background: TAD.black, color: TAD.cream }}>
        <span style={{ fontFamily: TAD.mono, fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', color: TAD.yellow }}>SESSIONS RUN</span>
        <div style={{ display: 'flex', alignItems: 'baseline', marginTop: 6 }}>
          <span style={{ fontFamily: TAD.display, fontSize: 84, lineHeight: 0.85, color: TAD.cream, letterSpacing: '-0.03em' }}>187</span>
          <span style={{ fontFamily: TAD.mono, fontSize: 14, color: TAD.green, marginLeft: 12, fontWeight: 700 }}>+31% MoM</span>
        </div>
        {/* mini bar chart */}
        <div style={{ display: 'flex', gap: 6, alignItems: 'flex-end', height: 60, marginTop: 16 }}>
          {weekBars.map((v, i) => (
            <div key={i} style={{ flex: 1, height: `${(v / max) * 100}%`, background: i === weekBars.length - 1 ? TAD.yellow : 'rgba(245,237,227,0.30)', borderRadius: 4 }} />
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontFamily: TAD.mono, fontSize: 9, color: TAD.textDimDark, letterSpacing: '0.10em' }}>
          {['MON','TUE','WED','THU','FRI','SAT','SUN'].map(d => <span key={d}>{d}</span>)}
        </div>
      </div>

      {/* conversion grid */}
      <div style={{ padding: '20px 22px 8px' }}>
        <h3 style={{ fontFamily: TAD.title, fontSize: 20, margin: 0, fontWeight: 700}}>Conversions</h3>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, padding: '0 14px' }}>
        {[
          ['HOLD → CONFIRM', '83%', '+4', TAD.green],
          ['FLOOR-NOT-MET', '11%', '−2', TAD.green],
          ['REPEAT MATES', '64%', '+7', TAD.green],
          ['SUGGEST → SESSION', '22%', '+1', TAD.green],
          ['NEW HOST APPS', '14', 'this wk', TAD.textDim],
          ['CANCELLED', '6', 'this wk', TAD.red],
        ].map(([l, v, d, dc], i) => (
          <div key={i} style={{ padding: 16, borderRadius: 20, background: '#FFFFFF', border: AD_CARD }}>
            <span style={{ fontFamily: TAD.mono, fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', color: TAD.textDim }}>{l}</span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 4 }}>
              <span style={{ fontFamily: TAD.display, fontSize: 28, lineHeight: 0.9, letterSpacing: '-0.02em' }}>{v}</span>
              <span style={{ fontFamily: TAD.mono, fontSize: 11, color: dc, fontWeight: 700 }}>{d}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Hood heat map */}
      <div style={{ padding: '20px 22px 8px' }}>
        <h3 style={{ fontFamily: TAD.title, fontSize: 20, margin: 0, fontWeight: 700}}>Neighbourhood heat</h3>
      </div>
      <div style={{ margin: '0 14px', padding: 18, borderRadius: 24, background: '#FFFFFF', border: AD_CARD, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {[
          ['Grey Lynn',   92, TAD.purple],
          ['Ponsonby',    78, TAD.royal],
          ['Pt Chev',     71, TAD.orange],
          ['Herne Bay',   58, TAD.sky],
          ['Karangahape', 44, TAD.olive],
          ['Mt Eden',     31, TAD.green],
        ].map(([h, v, c]) => (
          <div key={h} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 90, fontSize: 12, fontWeight: 600 }}>{h}</span>
            <div style={{ flex: 1, height: 14, borderRadius: 999, background: 'rgba(26,26,26,0.06)' }}>
              <div style={{ width: `${v}%`, height: '100%', borderRadius: 999, background: c }} />
            </div>
            <span style={{ fontFamily: TAD.mono, fontSize: 11, fontWeight: 700, color: TAD.textDim, width: 28, textAlign: 'right' }}>{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// A4b — CANCELLED (36h cancellation state — companion to Going Ahead)
// ════════════════════════════════════════════════════════════════
function ScreenCancelled() {
  return (
    <div data-screen-label="A4b Cancelled" style={{
      background: TAD.cream, color: TAD.black, minHeight: '100%',
      fontFamily: TAD.body, paddingBottom: 100,
    }}>
      <TopBar
        center={
          <span style={{ fontFamily: TAD.mono, fontSize: 11, letterSpacing: '0.20em', fontWeight: 700, color: TAD.textDim }}>
            NOTIFICATION · 36H CHECK
          </span>
        }
        right={
          <button style={{ width: 32, height: 32, border: 'none', background: 'rgba(26,26,26,0.06)', color: TAD.black, borderRadius: 999, fontSize: 14 }}>✕</button>
        }
      />

      <div style={{ padding: '32px 22px 8px' }}>
        <p style={{ fontFamily: TAD.mono, fontSize: 11, letterSpacing: '0.20em', color: TAD.textDim, margin: 0 }}>
          DIDN'T HIT THE FLOOR THIS TIME
        </p>
        <h1 style={{
          fontFamily: TAD.title, fontWeight: 700, fontSize: 84, lineHeight: 0.86,
          letterSpacing: '-0.04em', margin: '12px 0 0'}}>
          Not<br/>this time.
        </h1>
        <p style={{ margin: '20px 0 0', fontSize: 16, lineHeight: 1.4, maxWidth: 320 }}>
          <strong>Sunday Slow Flow</strong> didn't have enough people. Your hold's released. Nothing charged. We hope to see you at the next one.
        </p>
      </div>

      {/* Receipt-style card */}
      <div style={{ margin: '24px 14px 0', padding: 18, borderRadius: 24, background: '#FFFFFF', border: AD_CARD, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 13 }}>Sunday Slow Flow · SUN 9am</span>
          <span style={{ fontFamily: TAD.mono, fontSize: 11, color: TAD.textDim, letterSpacing: '0.10em' }}>HOLD</span>
        </div>
        <div style={{ height: 1, background: 'rgba(26,26,26,0.08)' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 13 }}>Charged to card</span>
          <span style={{ fontFamily: TAD.mono, fontSize: 16, fontWeight: 700, color: TAD.green }}>$0.00</span>
        </div>
      </div>

      {/* Suggest CTA */}
      <div style={{ margin: '14px 14px 0', padding: 20, borderRadius: 28, background: TAD.purple, color: TAD.cream }}>
        <span style={{ fontFamily: TAD.mono, fontSize: 11, fontWeight: 700, letterSpacing: '0.16em' }}>WANT IT TO HAPPEN?</span>
        <h3 style={{ fontFamily: TAD.title, fontSize: 26, margin: '8px 0 12px', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 0.95 }}>
          Float it to the<br/>community.
        </h3>
        <p style={{ margin: '0 0 14px', fontSize: 13, lineHeight: 1.4, opacity: 0.9 }}>
          Add it to the suggestion list. Hosts watch this — if enough mates vote, it gets picked up.
        </p>
        <PillButton variant="secondary" style={{ width: '100%' }}>+ Add to suggestions</PillButton>
      </div>

      {/* What's still on */}
      <div style={{ padding: '20px 22px 8px' }}>
        <h3 style={{ fontFamily: TAD.title, fontSize: 20, margin: 0, fontWeight: 700}}>Still on this week</h3>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '0 14px' }}>
        {[
          { type: 'pilates', name: 'Ponsonby Pilates', when: 'THU 28 · 6:30 AM' },
          { type: 'breath',  name: 'Herne Bay Breath', when: 'WED 27 · 7:00 PM' },
        ].map((s, i) => (
          <div key={i} style={{
            padding: 14, borderRadius: 20, background: '#FFFFFF', border: AD_CARD,
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <MovementTile type={s.type} size={40} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{s.name}</div>
              <div style={{ fontSize: 11, color: TAD.textDim, marginTop: 2 }}>{s.when}</div>
            </div>
            <span style={{ color: TAD.textDim, fontSize: 18 }}>›</span>
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, {
  ScreenAdmVetting, ScreenAdmLive, ScreenAdmSuggestions, ScreenAdmFinance,
  ScreenAdmAttendeeCRM, ScreenAdmHostCRM, ScreenAdmModeration, ScreenAdmAnalytics,
  ScreenCancelled,
});


// ─────────── screens-auth.jsx ───────────

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


// ─────────── landing.jsx ───────────

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


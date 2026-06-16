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

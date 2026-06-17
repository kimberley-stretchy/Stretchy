'use client';

import { useState } from 'react';

const SCREENS = {
  attendee: [
    {
      id: 'home',
      label: 'Home',
      emoji: '🏠',
      title: 'Your weekly feed',
      desc: 'Sessions near you, prices updating live as more people hold.',
      preview: { bg: '#F5EDE3', items: ['Sunday Slow Flow · $18', 'HIIT in the Park · $22', 'Sound Bath · $28'] },
    },
    {
      id: 'detail',
      label: 'Session + Price',
      emoji: '💸',
      title: 'Live pricing',
      desc: 'Watch the price drop in real time as more people hold spots.',
      preview: { bg: '#1A1A1A', price: '$18', label: 'Sunday Slow Flow', sub: '14 holding · max $28' },
    },
    {
      id: 'held',
      label: 'Place Held',
      emoji: '🎟️',
      title: 'Spot secured',
      desc: 'No charge upfront. Locked in at gate, 36 hours before.',
      preview: { bg: '#7A8330', icon: '✓', label: "You're holding a spot", sub: 'No charge until confirmed' },
    },
    {
      id: 'going',
      label: 'Going Ahead',
      emoji: '🎉',
      title: 'It\'s on',
      desc: 'Minimum met — the session is confirmed. Price locked in.',
      preview: { bg: '#FFD166', icon: '🎉', label: "It's going ahead!", sub: 'Final price: $14' },
    },
  ],
  host: [
    {
      id: 'dash',
      label: 'Host Dashboard',
      emoji: '🎯',
      title: 'Your sessions at a glance',
      desc: 'See holds, pricing and status across all your upcoming sessions.',
      preview: { bg: '#A535C7', items: ['Sunday Slow Flow · 14 holds', 'Wed Pilates · 6 holds', 'Fri HIIT · 2 holds'] },
    },
    {
      id: 'add',
      label: 'Add a Session',
      emoji: '➕',
      title: 'Set your target',
      desc: 'Pick your movement type, set your revenue goal, choose min/max spots.',
      preview: { bg: '#F5EDE3', form: ['🧘 Yoga', 'Target: $200', 'Min: 8 people'] },
    },
    {
      id: 'payout',
      label: 'Host Payout',
      emoji: '💰',
      title: 'You hit your target',
      desc: 'Session confirmed. Payout lands in your account within 2 days.',
      preview: { bg: '#FFD166', icon: '💰', label: 'Payout: $200', sub: '14 attendees · $14/person' },
    },
  ],
};

export function ExploreApp() {
  const [active, setActive] = useState('detail');

  const allScreens = [...SCREENS.attendee, ...SCREENS.host];
  const cur = allScreens.find((s) => s.id === active)!;

  return (
    <div id="explore" style={{ background: '#7A8330', color: '#F5EDE3' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '96px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 8 }}>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.22em',
              color: '#FFD166',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <span style={{ width: 22, height: 2, background: '#FFD166', display: 'inline-block' }} />
            EXPLORE THE APP
          </div>
        </div>

        <h2
          style={{
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(34px, 5vw, 56px)',
            lineHeight: 0.98,
            letterSpacing: '-0.025em',
            textAlign: 'center',
            margin: '0 auto 16px',
            maxWidth: 720,
          }}
        >
          A real look inside.
        </h2>
        <p
          style={{
            textAlign: 'center',
            maxWidth: 520,
            margin: '0 auto 52px',
            fontSize: 17,
            lineHeight: 1.55,
            color: 'rgba(245,237,227,0.75)',
          }}
        >
          Tap through the key screens. This is exactly what you'll see when Auckland goes live Q3 2026.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0,1fr) auto',
            gap: 48,
            alignItems: 'center',
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.16em',
                color: '#FFD166',
                marginBottom: 12,
              }}
            >
              FOR MOVERS
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
              {SCREENS.attendee.map((s) => (
                <Chip key={s.id} s={s} active={active} setActive={setActive} />
              ))}
            </div>

            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.16em',
                color: '#FFD166',
                marginBottom: 12,
              }}
            >
              FOR HOSTS
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 36 }}>
              {SCREENS.host.map((s) => (
                <Chip key={s.id} s={s} active={active} setActive={setActive} />
              ))}
            </div>

            <div
              style={{
                padding: '20px 24px',
                borderRadius: 22,
                background: 'rgba(245,237,227,0.08)',
                border: '1px solid rgba(245,237,227,0.14)',
              }}
            >
              <div
                style={{
                  fontFamily: "'Space Grotesk', system-ui, sans-serif",
                  fontWeight: 700,
                  fontSize: 18,
                  marginBottom: 6,
                  letterSpacing: '-0.01em',
                }}
              >
                {cur.emoji} {cur.title}
              </div>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55, color: 'rgba(245,237,227,0.75)' }}>
                {cur.desc}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <PhoneMockup screen={cur} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Chip({ s, active, setActive }: { s: { id: string; label: string }; active: string; setActive: (id: string) => void }) {
  const on = active === s.id;
  return (
    <button
      onClick={() => setActive(s.id)}
      style={{
        padding: '10px 16px',
        borderRadius: 9999,
        cursor: 'pointer',
        border: on ? 'none' : '1.5px solid rgba(245,237,227,0.25)',
        background: on ? '#FFD166' : 'transparent',
        color: on ? '#1A1A1A' : '#F5EDE3',
        fontFamily: "'Space Grotesk', system-ui, sans-serif",
        fontSize: 14,
        fontWeight: 600,
        transition: 'all 0.15s',
      }}
    >
      {s.label}
    </button>
  );
}

function PhoneMockup({ screen }: { screen: { preview: Record<string, any>; [key: string]: any } }) {
  const p = screen.preview as any;
  return (
    <div
      style={{
        width: 240,
        height: 480,
        borderRadius: 40,
        background: '#1A1A1A',
        padding: 3,
        boxShadow: '0 40px 80px rgba(0,0,0,0.5)',
        flexShrink: 0,
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: 37,
          background: p.bg,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          padding: '32px 16px 16px',
        }}
      >
        <div
          style={{
            width: 60,
            height: 18,
            borderRadius: 9,
            background: 'rgba(0,0,0,0.15)',
            margin: '0 auto 20px',
          }}
        />

        {p.price ? (
          <div style={{ textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', color: '#FFD166', marginBottom: 6 }}>CURRENT PRICE</div>
            <div style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontWeight: 700, fontSize: 64, color: '#FFD166', letterSpacing: '-0.03em', lineHeight: 1 }}>{p.price}</div>
            <div style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontWeight: 700, fontSize: 16, color: '#F5EDE3', marginTop: 12 }}>{p.label}</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'rgba(245,237,227,0.5)', marginTop: 4 }}>{p.sub}</div>
          </div>
        ) : p.icon ? (
          <div style={{ textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>{p.icon}</div>
            <div style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontWeight: 700, fontSize: 18, color: p.bg === '#FFD166' ? '#1A1A1A' : '#F5EDE3', letterSpacing: '-0.01em' }}>{p.label}</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: p.bg === '#FFD166' ? 'rgba(26,26,26,0.6)' : 'rgba(245,237,227,0.6)', marginTop: 6 }}>{p.sub}</div>
          </div>
        ) : p.items ? (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {p.items.map((item: string, i: number) => (
              <div
                key={i}
                style={{
                  background: p.bg === '#F5EDE3' ? '#FFFFFF' : 'rgba(245,237,227,0.1)',
                  borderRadius: 14,
                  padding: '12px 14px',
                  fontFamily: "'Space Grotesk', system-ui, sans-serif",
                  fontSize: 13,
                  fontWeight: 600,
                  color: p.bg === '#F5EDE3' ? '#1A1A1A' : '#F5EDE3',
                }}
              >
                {item}
              </div>
            ))}
          </div>
        ) : p.form ? (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {p.form.map((item: string, i: number) => (
              <div
                key={i}
                style={{
                  background: '#FFFFFF',
                  borderRadius: 12,
                  padding: '12px 14px',
                  fontFamily: "'Space Grotesk', system-ui, sans-serif",
                  fontSize: 13,
                  fontWeight: 600,
                  color: '#1A1A1A',
                  border: '1.5px solid rgba(26,26,26,0.1)',
                }}
              >
                {item}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { SMark } from '@/components/ui/SMark';

// ─── Design tokens ───────────────────────────────────────────
const T = {
  cream: '#F5EDE3', black: '#1A1A1A', yellow: '#FFD166',
  olive: '#7A8330', purple: '#A535C7', pink: '#FF4D9E',
  blue: '#2C8FE0', orange: '#FF6B35', dim: '#888',
  card: 'rgba(26,26,26,0.06)', border: '1.5px solid rgba(26,26,26,0.10)',
};

const MOV: Record<string, { color: string; emoji: string; label: string }> = {
  yoga:    { color: '#A535C7', emoji: '🧘', label: 'YOGA' },
  pilates: { color: '#2A3FE0', emoji: '🤸', label: 'PILATES' },
  breath:  { color: '#7A8330', emoji: '🌬️', label: 'BREATH' },
  sound:   { color: '#4FB8E0', emoji: '🎵', label: 'SOUND' },
  flow:    { color: '#FF6B35', emoji: '🌊', label: 'FLOW' },
  hiit:    { color: '#FF4D9E', emoji: '⚡', label: 'HIIT' },
};

// ─── Phone chrome ───────────────────────────────────────────
function Phone({ children, bg = T.cream }: { children: React.ReactNode; bg?: string }) {
  return (
    <div style={{ width: 260, height: 520, borderRadius: 44, background: '#111', padding: 3, boxShadow: '0 40px 80px rgba(0,0,0,0.55)', flexShrink: 0 }}>
      <div style={{ width: '100%', height: '100%', borderRadius: 41, background: bg, overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column' }}>
        {/* status bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 20px 4px', flexShrink: 0 }}>
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, fontWeight: 700, color: bg === T.cream || bg === '#FFFFFF' ? T.black : '#F5EDE3', opacity: 0.6 }}>9:41</span>
          <div style={{ width: 50, height: 16, borderRadius: 8, background: '#111', flexShrink: 0 }} />
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, fontWeight: 700, color: bg === T.cream || bg === '#FFFFFF' ? T.black : '#F5EDE3', opacity: 0.6 }}>●●●</span>
        </div>
        <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
          {children}
        </div>
      </div>
    </div>
  );
}

// ─── Screen: Session Detail ───────────────────────────────────
function ScreenDetail() {
  return (
    <div style={{ height: '100%', overflowY: 'auto', background: T.cream }}>
      <div style={{ padding: '6px 16px 10px', display: 'flex', alignItems: 'center', gap: 8 }}>
        <SMark size={22} color={T.black} />
        <span style={{ flex: 1 }} />
        <div style={{ background: '#E6F5EC', color: '#2E7A52', padding: '4px 10px', borderRadius: 999, fontFamily: "'JetBrains Mono',monospace", fontSize: 9, fontWeight: 700, letterSpacing: '0.1em' }}>✓ VETTED</div>
      </div>
      <div style={{ padding: '0 16px 12px' }}>
        <div style={{ display: 'flex', gap: 6, marginBottom: 8, flexWrap: 'wrap' }}>
          <Pill bg="#B5DDE9" fg={T.black}>SUN · 9:00 AM</Pill>
          <Pill bg={MOV.yoga.color + '22'} fg={MOV.yoga.color}>YOGA</Pill>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
          <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 24, lineHeight: 1.0, letterSpacing: '-0.02em', flex: 1 }}>Sunday<br/>Slow Flow</div>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: MOV.yoga.color, color: '#F5EDE3', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>🧘</div>
        </div>
        <div style={{ fontSize: 11, color: T.dim, marginTop: 4 }}>with Tāne Ratima · Grey Lynn</div>
      </div>

      {/* Pricing card */}
      <div style={{ margin: '0 10px', padding: '14px 16px', borderRadius: 22, background: '#FFF', border: T.border }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <div style={{ display: 'flex', gap: 4 }}>
            {[1,2,3,4,5,6,7,8].map(i => (
              <div key={i} style={{ width: 14, height: 14, borderRadius: '50%', background: i <= 5 ? T.pink : 'rgba(26,26,26,0.14)' }} />
            ))}
          </div>
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', color: T.orange }}>● LIVE</span>
        </div>
        <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 13, lineHeight: 1.2, marginBottom: 10 }}>3 MORE ATTENDEES TO CONFIRM SESSION</div>
        <div style={{ background: T.yellow, borderRadius: 16, padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'baseline' }}>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, fontSize: 18 }}>$</span>
            <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 52, lineHeight: 0.9, letterSpacing: '-0.03em' }}>28</span>
          </div>
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', textAlign: 'right', lineHeight: 1.4 }}>STARTING<br/>PRICE</span>
        </div>
        <p style={{ margin: '0 0 10px', fontSize: 11, lineHeight: 1.4, color: T.black }}>The most you'll pay is <strong>$28</strong>. The more who join, the less everyone pays. Floor is <strong>$14</strong>.</p>
        {/* price scale */}
        <div style={{ marginBottom: 4 }}>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 8, fontWeight: 700, letterSpacing: '0.12em', color: T.dim, marginBottom: 4 }}>LIVE PRICE — DROPS AS ROOM FILLS</div>
          <div style={{ position: 'relative', height: 6, borderRadius: 3, background: 'rgba(26,26,26,0.1)' }}>
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '38%', borderRadius: 3, background: T.yellow }} />
            <div style={{ position: 'absolute', left: '36%', top: '50%', transform: 'translate(-50%,-50%)', width: 12, height: 12, borderRadius: '50%', background: T.black, border: '2px solid #F5EDE3', boxShadow: '0 2px 6px rgba(0,0,0,0.3)' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 3 }}>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 8, color: T.dim }}>$28 max</span>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 8, color: T.dim }}>$14 floor</span>
          </div>
        </div>
      </div>

      <div style={{ padding: '10px 10px 16px' }}>
        <div style={{ background: T.blue, color: '#FFF', borderRadius: 9999, padding: '12px 0', textAlign: 'center', fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 13 }}>
          Hold my place — no charge yet
        </div>
        <p style={{ margin: '6px 0 0', fontSize: 10, color: T.dim, textAlign: 'center', lineHeight: 1.4 }}>You only pay if it goes ahead — at the final lowest price.</p>
      </div>
    </div>
  );
}

// ─── Screen: This Week ───────────────────────────────────────
function ScreenThisWeek() {
  const sessions = [
    { day: 'WED', name: 'Herne Bay Breath', host: 'Alex K.', type: 'breath', held: 6, min: 6, price: 19, confirmed: true },
    { day: 'THU', name: 'Ponsonby Pilates', host: 'Jess M.', type: 'pilates', held: 3, min: 10, price: 30, confirmed: false },
    { day: 'FRI', name: 'K Rd Sound Bath', host: 'Rua O.', type: 'sound', held: 5, min: 8, price: 42, confirmed: false },
    { day: 'SUN', name: 'Sunday Slow Flow', host: 'Tāne R.', type: 'yoga', held: 5, min: 8, price: 28, confirmed: false },
  ];
  return (
    <div style={{ height: '100%', overflowY: 'auto', background: T.cream }}>
      <div style={{ padding: '6px 16px 4px', display: 'flex', alignItems: 'center' }}>
        <SMark size={22} color={T.black} />
      </div>
      <div style={{ padding: '4px 16px 12px' }}>
        <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 30, lineHeight: 0.95, letterSpacing: '-0.025em' }}>Pick your<br/>stretch.</div>
        <div style={{ fontSize: 11, color: T.dim, marginTop: 4 }}>4 sessions near you this week</div>
      </div>
      <div style={{ display: 'flex', gap: 6, padding: '0 14px 12px', overflow: 'hidden' }}>
        {['All', 'Yoga', 'Pilates', 'Sound'].map((c, i) => (
          <div key={c} style={{ padding: '5px 10px', borderRadius: 999, whiteSpace: 'nowrap', background: i === 0 ? T.black : '#FFF', color: i === 0 ? T.cream : T.black, border: i === 0 ? 'none' : T.border, fontFamily: "'Space Grotesk',sans-serif", fontSize: 10, fontWeight: 600 }}>{c}</div>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '0 10px 20px' }}>
        {sessions.map((s, i) => (
          <div key={i} style={{ background: '#FFF', borderRadius: 18, padding: '12px 14px', border: T.border }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: MOV[s.type].color, color: '#F5EDE3', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>{MOV[s.type].emoji}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 12, marginBottom: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.name}</div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: T.dim }}>{s.day} · {s.host}</div>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 16, color: T.yellow }}>${s.price}</div>
                {s.confirmed && <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 8, color: T.olive, fontWeight: 700 }}>✓ ON</div>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Screen: Place Held ───────────────────────────────────────
function ScreenPlaceHeld() {
  return (
    <div style={{ height: '100%', overflowY: 'auto', background: T.cream }}>
      <div style={{ padding: '6px 16px 4px', display: 'flex', alignItems: 'center' }}>
        <SMark size={22} color={T.black} />
      </div>
      <div style={{ margin: '8px 10px', padding: '18px 16px', borderRadius: 24, background: T.olive, color: '#F5EDE3' }}>
        <div style={{ fontSize: 32, marginBottom: 8 }}>✓</div>
        <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 20, letterSpacing: '-0.015em', marginBottom: 4 }}>Spot held.</div>
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, opacity: 0.75, lineHeight: 1.4 }}>No charge yet. We'll confirm 36 hours out once the minimum is met.</div>
      </div>
      <div style={{ margin: '8px 10px', padding: '14px 16px', borderRadius: 20, background: '#FFF', border: T.border }}>
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, fontWeight: 700, letterSpacing: '0.14em', color: T.dim, marginBottom: 8 }}>YOUR HOLD</div>
        <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 16, marginBottom: 4 }}>Sunday Slow Flow</div>
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: T.dim, marginBottom: 12 }}>SUN 9:00 AM · Grey Lynn</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: T.dim }}>MAX YOU PAY</div>
            <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 24, color: T.yellow }}>$28</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: T.dim }}>GATE</div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, fontWeight: 700 }}>SAT 9:00 AM</div>
          </div>
        </div>
      </div>
      <div style={{ padding: '8px 10px' }}>
        <div style={{ background: T.black, color: T.cream, borderRadius: 9999, padding: '11px 0', textAlign: 'center', fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 12 }}>Add to calendar</div>
      </div>
      <div style={{ margin: '0 10px', padding: '12px 16px', borderRadius: 20, background: '#FFF', border: T.border }}>
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', color: T.dim, marginBottom: 6 }}>HOW IT WORKS</div>
        {['Hold your spot — no charge.', 'More people = lower price.', 'Confirmed 36h out at final price.'].map((step, i) => (
          <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 6 }}>
            <div style={{ width: 16, height: 16, borderRadius: '50%', background: T.yellow, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'JetBrains Mono',monospace", fontSize: 8, fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
            <span style={{ fontSize: 11, lineHeight: 1.4 }}>{step}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Screen: Going Ahead ────────────────────────────────────
function ScreenGoingAhead() {
  return (
    <div style={{ height: '100%', overflowY: 'auto', background: T.yellow }}>
      <div style={{ padding: '6px 16px 4px', display: 'flex', alignItems: 'center' }}>
        <SMark size={22} color={T.black} />
      </div>
      <div style={{ padding: '12px 16px 0', textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 8 }}>🎉</div>
        <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 26, letterSpacing: '-0.02em', lineHeight: 1.05, marginBottom: 8 }}>It's going ahead!</div>
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: '0.1em', opacity: 0.6, marginBottom: 16 }}>SUNDAY SLOW FLOW · CONFIRMED</div>
      </div>
      <div style={{ margin: '0 10px', padding: '16px', borderRadius: 22, background: T.black, color: T.cream, textAlign: 'center', marginBottom: 8 }}>
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: '0.14em', opacity: 0.6, marginBottom: 4 }}>FINAL PRICE</div>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center' }}>
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, fontSize: 20 }}>$</span>
          <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 64, lineHeight: 0.9, letterSpacing: '-0.03em' }}>18</span>
        </div>
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: T.yellow, marginTop: 4 }}>$10 saved vs max · 14 attending</div>
      </div>
      <div style={{ margin: '0 10px 8px', padding: '12px 16px', borderRadius: 18, background: 'rgba(26,26,26,0.08)' }}>
        <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 13, marginBottom: 2 }}>📍 The Auckland Yoga Room</div>
        <div style={{ fontSize: 11, opacity: 0.7 }}>12 Williamson Ave, Grey Lynn</div>
      </div>
      <div style={{ margin: '0 10px 8px', padding: '12px 16px', borderRadius: 18, background: 'rgba(26,26,26,0.08)' }}>
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', opacity: 0.6, marginBottom: 4 }}>SOCIAL STRETCH AFTER</div>
        <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 13 }}>☕ Little Bird Café next door</div>
      </div>
    </div>
  );
}

// ─── Screen: Host Dashboard ───────────────────────────────────
function ScreenHostDash() {
  const sessions = [
    { name: 'Sunday Slow Flow', type: 'yoga', held: 14, min: 8, price: 18, state: 'confirmed' },
    { name: 'Wed Morning Pilates', type: 'pilates', held: 5, min: 10, price: 28, state: 'open' },
    { name: 'Fri Sound Bath', type: 'sound', held: 2, min: 8, price: 42, state: 'open' },
  ];
  return (
    <div style={{ height: '100%', overflowY: 'auto', background: '#F5EDE3' }}>
      <div style={{ padding: '6px 16px 4px', display: 'flex', alignItems: 'center' }}>
        <SMark size={22} color={T.purple} />
        <span style={{ flex: 1 }} />
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 8, fontWeight: 700, letterSpacing: '0.12em', color: T.purple }}>HOST</div>
      </div>
      <div style={{ padding: '4px 16px 12px' }}>
        <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 22, letterSpacing: '-0.02em' }}>Your sessions</div>
      </div>
      <div style={{ margin: '0 10px 8px', padding: '12px 14px', borderRadius: 18, background: T.purple, color: '#F5EDE3', display: 'flex', justifyContent: 'space-between' }}>
        <div><div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 8, opacity: 0.7, marginBottom: 2 }}>THIS MONTH</div><div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 22 }}>$340</div></div>
        <div style={{ textAlign: 'right' }}><div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 8, opacity: 0.7, marginBottom: 2 }}>SESSIONS</div><div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 22 }}>3</div></div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, padding: '0 10px 16px' }}>
        {sessions.map((s, i) => (
          <div key={i} style={{ background: '#FFF', borderRadius: 16, padding: '10px 12px', border: T.border }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <div style={{ width: 30, height: 30, borderRadius: 8, background: MOV[s.type].color, color: '#F5EDE3', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0 }}>{MOV[s.type].emoji}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 11, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.name}</div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: T.dim }}>{s.held}/{s.min} min</div>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 14, color: T.yellow }}>${s.price}</div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 8, color: s.state === 'confirmed' ? T.olive : T.dim, fontWeight: 700 }}>{s.state === 'confirmed' ? '✓ ON' : 'OPEN'}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ padding: '0 10px' }}>
        <div style={{ background: T.purple, color: '#F5EDE3', borderRadius: 9999, padding: '11px 0', textAlign: 'center', fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 12 }}>+ Add a session</div>
      </div>
    </div>
  );
}

// ─── Screen: Add Session ──────────────────────────────────────
function ScreenAddSession() {
  return (
    <div style={{ height: '100%', overflowY: 'auto', background: '#F5EDE3' }}>
      <div style={{ padding: '6px 16px 4px', display: 'flex', alignItems: 'center' }}>
        <SMark size={22} color={T.purple} />
        <span style={{ flex: 1 }} />
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 8, fontWeight: 700, color: T.purple }}>HOST</div>
      </div>
      <div style={{ padding: '4px 16px 12px' }}>
        <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 22, letterSpacing: '-0.02em' }}>New session</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '0 10px 16px' }}>
        {[
          { label: 'MOVEMENT TYPE', value: '🧘 Yoga', highlight: true },
          { label: 'DATE & TIME', value: 'Sun 31 May · 9:00 AM' },
          { label: 'LOCATION', value: 'The Auckland Yoga Room' },
          { label: 'REVENUE TARGET', value: '$200', highlight: true },
          { label: 'MINIMUM SPOTS', value: '8 people' },
          { label: 'MAXIMUM SPOTS', value: '20 people' },
        ].map((f, i) => (
          <div key={i} style={{ background: f.highlight ? T.yellow : '#FFF', borderRadius: 14, padding: '10px 12px', border: T.border }}>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 8, fontWeight: 700, letterSpacing: '0.12em', color: f.highlight ? 'rgba(26,26,26,0.6)' : T.dim, marginBottom: 2 }}>{f.label}</div>
            <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 13 }}>{f.value}</div>
          </div>
        ))}
        <div style={{ background: T.black, color: '#F5EDE3', borderRadius: 9999, padding: '11px 0', textAlign: 'center', fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 13, marginTop: 4 }}>List this session →</div>
      </div>
    </div>
  );
}

// ─── Screen: Host Payout ──────────────────────────────────────
function ScreenHostPayout() {
  return (
    <div style={{ height: '100%', overflowY: 'auto', background: T.yellow }}>
      <div style={{ padding: '6px 16px 4px', display: 'flex', alignItems: 'center' }}>
        <SMark size={22} color={T.black} />
      </div>
      <div style={{ padding: '8px 16px 0', textAlign: 'center' }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>💰</div>
        <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 24, letterSpacing: '-0.02em', lineHeight: 1.05, marginBottom: 6 }}>Payout on<br/>its way!</div>
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: '0.1em', opacity: 0.6, marginBottom: 14 }}>SUNDAY SLOW FLOW · 14 ATTENDEES</div>
      </div>
      <div style={{ margin: '0 10px 8px', padding: '14px 16px', borderRadius: 20, background: T.black, color: T.cream, textAlign: 'center' }}>
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: '0.12em', opacity: 0.6, marginBottom: 4 }}>YOUR PAYOUT</div>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center' }}>
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, fontSize: 18 }}>$</span>
          <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 56, lineHeight: 0.9, letterSpacing: '-0.03em', color: T.yellow }}>200</span>
        </div>
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: 'rgba(245,237,227,0.6)', marginTop: 4 }}>$20 Stretchy fee · $252 total collected</div>
      </div>
      <div style={{ margin: '0 10px 8px', padding: '12px 14px', borderRadius: 18, background: 'rgba(26,26,26,0.08)' }}>
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 8, fontWeight: 700, letterSpacing: '0.12em', opacity: 0.6, marginBottom: 4 }}>BREAKDOWN</div>
        {[['14 attendees × $18', '$252'], ['Stretchy fee', '-$20'], ['GST (included)', '-$32'], ['Your payout', '$200']].map(([l, v], i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
            <span style={{ fontSize: 11 }}>{l}</span>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, fontWeight: 700 }}>{v}</span>
          </div>
        ))}
      </div>
      <div style={{ margin: '0 10px', padding: '10px 14px', borderRadius: 18, background: 'rgba(26,26,26,0.08)' }}>
        <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 12 }}>Lands in your account within 2 business days.</div>
      </div>
    </div>
  );
}

// ─── Pill helper ─────────────────────────────────────────────
function Pill({ bg, fg, children }: { bg: string; fg: string; children: React.ReactNode }) {
  return (
    <div style={{ background: bg, color: fg, padding: '4px 10px', borderRadius: 999, fontFamily: "'JetBrains Mono',monospace", fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', display: 'inline-block' }}>
      {children}
    </div>
  );
}

// ─── Screen registry ─────────────────────────────────────────
const SCREENS = {
  attendee: [
    { id: 'detail',  label: 'Session + Price', component: ScreenDetail },
    { id: 'thisweek', label: 'This Week',      component: ScreenThisWeek },
    { id: 'held',    label: 'Place Held',      component: ScreenPlaceHeld },
    { id: 'going',   label: 'Going Ahead',     component: ScreenGoingAhead },
  ],
  host: [
    { id: 'dash',   label: 'Host Dashboard', component: ScreenHostDash },
    { id: 'add',    label: 'Add a Session',  component: ScreenAddSession },
    { id: 'payout', label: 'Host Payout',    component: ScreenHostPayout },
  ],
};

// ─── Main export ─────────────────────────────────────────────
export function ExploreApp() {
  const [active, setActive] = useState('detail');
  const all = [...SCREENS.attendee, ...SCREENS.host];
  const cur = all.find((s) => s.id === active)!;
  const ScreenComponent = cur.component;

  return (
    <div id="explore" style={{ background: T.olive, color: '#F5EDE3' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '96px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 8 }}>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, fontWeight: 700, letterSpacing: '0.22em', color: T.yellow, display: 'inline-flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 22, height: 2, background: T.yellow, display: 'inline-block' }} />
            EXPLORE THE APP
          </div>
        </div>
        <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 'clamp(34px,5vw,56px)', lineHeight: 0.98, letterSpacing: '-0.025em', textAlign: 'center', margin: '0 auto 14px', maxWidth: 720 }}>
          A real look inside.
        </h2>
        <p style={{ textAlign: 'center', maxWidth: 520, margin: '0 auto 52px', fontSize: 17, lineHeight: 1.55, color: 'rgba(245,237,227,0.75)' }}>
          These are the actual screens. Tap through the key moments — from spotting a session to getting your payout.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto', gap: 48, alignItems: 'center' }}>
          <div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', color: T.yellow, marginBottom: 12 }}>FOR MOVERS</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
              {SCREENS.attendee.map((s) => <Chip key={s.id} s={s} active={active} setActive={setActive} />)}
            </div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', color: T.yellow, marginBottom: 12 }}>FOR HOSTS</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 36 }}>
              {SCREENS.host.map((s) => <Chip key={s.id} s={s} active={active} setActive={setActive} />)}
            </div>
            <div style={{ padding: '20px 24px', borderRadius: 22, background: 'rgba(245,237,227,0.08)', border: '1px solid rgba(245,237,227,0.14)' }}>
              <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 18, marginBottom: 6, letterSpacing: '-0.01em' }}>
                Now showing: {cur.label}
              </div>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55, color: 'rgba(245,237,227,0.75)' }}>
                {getDesc(cur.id)}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Phone>
              <ScreenComponent />
            </Phone>
          </div>
        </div>
      </div>
    </div>
  );
}

function Chip({ s, active, setActive }: { s: { id: string; label: string }; active: string; setActive: (id: string) => void }) {
  const on = active === s.id;
  return (
    <button onClick={() => setActive(s.id)} style={{ padding: '10px 16px', borderRadius: 9999, cursor: 'pointer', border: on ? 'none' : '1.5px solid rgba(245,237,227,0.25)', background: on ? T.yellow : 'transparent', color: on ? T.black : '#F5EDE3', fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, fontWeight: 600, transition: 'all 0.15s' }}>
      {s.label}
    </button>
  );
}

function getDesc(id: string) {
  const descs: Record<string, string> = {
    detail:   'The pricing engine live — see the yellow price tile, progress dots, and the sliding price scale.',
    thisweek: 'Browse sessions near you. Confirmed sessions marked in olive. Filter by suburb or movement type.',
    held:     'Spot secured with no charge yet. Confirmation comes 36 hours before the session.',
    going:    'The session hit its minimum — it\'s on. Final price locked, Social Stretch location revealed.',
    dash:     'Host overview — monthly earnings, session status, and how many holds each session has.',
    add:      'Set your revenue target. Stretchy calculates the per-person price and handles everything else.',
    payout:   'Session ran. Payout breakdown showing Stretchy fee, GST, and amount landing in your account.',
  };
  return descs[id] ?? '';
}

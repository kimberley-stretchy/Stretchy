'use client';

import { useState } from 'react';
import Link from 'next/link';

const NEIGHBOURHOODS = [
  'Grey Lynn', 'Pt Chev', 'Ponsonby', 'Herne Bay', 'Mt Eden',
  'Karangahape', 'Westmere', 'Kingsland', 'CBD', 'Devonport', 'Takapuna',
];

const MOVEMENT_TYPES = [
  { id: 'yoga',    label: 'Yoga',       color: '#A535C7' },
  { id: 'pilates', label: 'Pilates',    color: '#2A3FE0' },
  { id: 'breath',  label: 'Breathwork', color: '#7A8330' },
  { id: 'sound',   label: 'Sound Bath', color: '#4FB8E0' },
  { id: 'hiit',    label: 'HIIT',       color: '#FF4D9E' },
  { id: 'run',     label: 'Run Club',   color: '#E63946' },
];

function StepDots({ step }: { step: number }) {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center', justifyContent: 'center' }}>
      {[1, 2, 3, 4].map((n) => (
        <div
          key={n}
          style={{
            width: n === step ? 24 : 8,
            height: 8,
            borderRadius: 9999,
            background: n < step ? '#1A1A1A' : n === step ? '#1A1A1A' : 'rgba(26,26,26,0.2)',
            transition: 'all 0.25s',
          }}
        />
      ))}
    </div>
  );
}

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      style={{
        width: 44,
        height: 26,
        borderRadius: 9999,
        border: 'none',
        background: on ? '#7A8330' : 'rgba(26,26,26,0.15)',
        cursor: 'pointer',
        position: 'relative',
        transition: 'background 0.2s',
        flexShrink: 0,
        padding: 0,
      }}
    >
      <div
        style={{
          width: 20,
          height: 20,
          borderRadius: 9999,
          background: '#FFFFFF',
          position: 'absolute',
          top: 3,
          left: on ? 21 : 3,
          transition: 'left 0.2s',
        }}
      />
    </button>
  );
}

const eyebrowStyle: React.CSSProperties = {
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: '0.20em',
  color: 'rgba(26,26,26,0.55)',
  margin: 0,
};

const h1Style: React.CSSProperties = {
  fontFamily: "'Space Grotesk', system-ui, sans-serif",
  fontWeight: 700,
  fontSize: 44,
  lineHeight: 0.95,
  letterSpacing: '-0.02em',
  margin: '10px 0 0',
  color: '#1A1A1A',
};

const primaryBtn: React.CSSProperties = {
  width: '100%',
  padding: '18px 24px',
  borderRadius: 9999,
  border: 'none',
  background: '#1A1A1A',
  color: '#F5EDE3',
  fontFamily: "'Space Grotesk', system-ui, sans-serif",
  fontWeight: 700,
  fontSize: 15,
  cursor: 'pointer',
};

const sectionLabel: React.CSSProperties = {
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: 10,
  fontWeight: 700,
  letterSpacing: '0.16em',
  color: 'rgba(26,26,26,0.6)',
  marginBottom: 6,
  display: 'block',
};

export default function OnboardingPage() {
  const [step, setStep] = useState(1);

  // Step 1
  const [name, setName] = useState('');

  // Step 2
  const [neighbourhoods, setNeighbourhoods] = useState<string[]>([]);
  const [movements, setMovements] = useState<string[]>([]);

  // Step 3
  const [notifPush, setNotifPush] = useState(true);
  const [notifSms, setNotifSms] = useState(true);
  const [notifEmail, setNotifEmail] = useState(false);

  const toggleNeighbourhood = (n: string) =>
    setNeighbourhoods((prev) => prev.includes(n) ? prev.filter((x) => x !== n) : [...prev, n]);

  const toggleMovement = (m: string) =>
    setMovements((prev) => prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]);

  const saveAndAdvance = async (body: Record<string, unknown>, nextStep: number) => {
    try {
      await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
    } catch {}
    setStep(nextStep);
  };

  const outer: React.CSSProperties = {
    minHeight: '100dvh',
    background: '#F5EDE3',
    color: '#1A1A1A',
    fontFamily: "'Space Grotesk', system-ui, sans-serif",
    paddingBottom: 100,
    position: 'relative',
  };

  const topBar = (showBack: boolean, showSkip: boolean, onSkip?: () => void) => (
    <div style={{ display: 'flex', alignItems: 'center', padding: '54px 22px 0' }}>
      {showBack ? (
        <button
          onClick={() => setStep((s) => s - 1)}
          style={{
            width: 40, height: 40, borderRadius: 999, border: 'none',
            background: 'rgba(26,26,26,0.08)', color: '#1A1A1A', fontSize: 16,
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >←</button>
      ) : (
        <div style={{ width: 40 }} />
      )}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
        <StepDots step={step} />
      </div>
      {showSkip ? (
        <button
          onClick={onSkip}
          style={{
            border: 'none', background: 'transparent', color: '#1A1A1A',
            fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700,
            letterSpacing: '0.12em', cursor: 'pointer', opacity: 0.55,
          }}
        >
          SKIP
        </button>
      ) : (
        <div style={{ width: 40 }} />
      )}
    </div>
  );

  // ── STEP 1 ──
  if (step === 1) {
    return (
      <div style={outer}>
        {topBar(false, false)}
        <div style={{ padding: '28px 24px 0' }}>
          <p style={eyebrowStyle}>STEP 1 OF 4 · YOU</p>
          <h1 style={h1Style}>What should we call you?</h1>
        </div>
        <div style={{ padding: '28px 14px 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && name.trim() && saveAndAdvance({ name }, 2)}
            placeholder="Alex"
            style={{
              background: 'rgba(255,255,255,0.8)',
              color: '#1A1A1A',
              border: '1.5px solid rgba(26,26,26,0.18)',
              borderRadius: 16,
              padding: '14px 16px',
              fontFamily: "'Space Grotesk', system-ui, sans-serif",
              fontSize: 16,
              outline: 'none',
              width: '100%',
              boxSizing: 'border-box',
            }}
          />
          <button
            onClick={() => name.trim() && saveAndAdvance({ name }, 2)}
            disabled={!name.trim()}
            style={{
              ...primaryBtn,
              opacity: !name.trim() ? 0.4 : 1,
              cursor: !name.trim() ? 'not-allowed' : 'pointer',
            }}
          >
            Continue →
          </button>
        </div>
      </div>
    );
  }

  // ── STEP 2 ──
  if (step === 2) {
    return (
      <div style={outer}>
        {topBar(true, true, () => setStep(3))}
        <div style={{ padding: '28px 24px 0' }}>
          <p style={eyebrowStyle}>STEP 2 OF 4 · WHERE &amp; WHAT</p>
          <h1 style={h1Style}>Tune your weekly drop.</h1>
          <p style={{ margin: '12px 0 0', fontSize: 15, opacity: 0.7, lineHeight: 1.4 }}>
            We&apos;ll only show what&apos;s in your suburbs and formats you love.
          </p>
        </div>

        <div style={{ padding: '28px 24px 0' }}>
          <label style={sectionLabel}>NEIGHBOURHOODS</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
            {NEIGHBOURHOODS.map((n) => {
              const selected = neighbourhoods.includes(n);
              return (
                <button
                  key={n}
                  onClick={() => toggleNeighbourhood(n)}
                  style={{
                    padding: '10px 16px',
                    borderRadius: 9999,
                    border: `1.5px solid ${selected ? '#2C8FE0' : 'rgba(26,26,26,0.18)'}`,
                    background: selected ? '#2C8FE0' : 'transparent',
                    color: selected ? '#F5EDE3' : '#1A1A1A',
                    fontFamily: "'Space Grotesk', system-ui, sans-serif",
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                >
                  {n}
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ padding: '28px 24px 0' }}>
          <label style={sectionLabel}>MOVEMENT</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
            {MOVEMENT_TYPES.map((m) => {
              const selected = movements.includes(m.id);
              return (
                <button
                  key={m.id}
                  onClick={() => toggleMovement(m.id)}
                  style={{
                    padding: '10px 16px',
                    borderRadius: 9999,
                    border: `1.5px solid ${selected ? m.color : 'rgba(26,26,26,0.18)'}`,
                    background: selected ? m.color : 'transparent',
                    color: selected ? '#F5EDE3' : '#1A1A1A',
                    fontFamily: "'Space Grotesk', system-ui, sans-serif",
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                >
                  {m.label}
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ padding: '32px 14px 0' }}>
          <button
            onClick={() => saveAndAdvance({ neighbourhoods, movements }, 3)}
            style={primaryBtn}
          >
            Continue →
          </button>
        </div>
      </div>
    );
  }

  // ── STEP 3 ──
  if (step === 3) {
    const toggleRow = (label: string, sub: string, on: boolean, onToggle: () => void) => (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 0',
          borderBottom: '1px solid rgba(26,26,26,0.08)',
        }}
      >
        <div>
          <div style={{ fontWeight: 600, fontSize: 15, color: '#1A1A1A' }}>{label}</div>
          <div style={{ fontSize: 12, color: 'rgba(26,26,26,0.55)', marginTop: 2 }}>{sub}</div>
        </div>
        <Toggle on={on} onToggle={onToggle} />
      </div>
    );

    return (
      <div style={outer}>
        {topBar(true, true, () => setStep(4))}
        <div style={{ padding: '28px 24px 0' }}>
          <p style={eyebrowStyle}>STEP 3 OF 4 · HOW TO REACH YOU</p>
          <h1 style={h1Style}>Stay in the loop.</h1>
        </div>

        <div style={{ padding: '24px 14px 0' }}>
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: 24,
              padding: '0 20px',
              border: '1.5px solid rgba(26,26,26,0.08)',
            }}
          >
            {toggleRow(
              'Push notifications',
              'Price drops, confirmations, locks',
              notifPush,
              () => setNotifPush((v) => !v),
            )}
            {toggleRow(
              'SMS',
              "For the can't-miss-this stuff",
              notifSms,
              () => setNotifSms((v) => !v),
            )}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 0',
              }}
            >
              <div>
                <div style={{ fontWeight: 600, fontSize: 15, color: '#1A1A1A' }}>Email</div>
                <div style={{ fontSize: 12, color: 'rgba(26,26,26,0.55)', marginTop: 2 }}>Weekly digest, receipts</div>
              </div>
              <Toggle on={notifEmail} onToggle={() => setNotifEmail((v) => !v)} />
            </div>
          </div>
        </div>

        <div style={{ padding: '24px 14px 0' }}>
          <button
            onClick={() => saveAndAdvance({ notif_push: notifPush, notif_sms: notifSms, notif_email: notifEmail }, 4)}
            style={primaryBtn}
          >
            Continue →
          </button>
        </div>
      </div>
    );
  }

  // ── STEP 4 ──
  return (
    <div style={outer}>
      {topBar(true, false)}
      <div style={{ padding: '28px 24px 0' }}>
        <p style={eyebrowStyle}>STEP 4 OF 4 · PAYMENT</p>
        <h1 style={{ ...h1Style, whiteSpace: 'pre-line' }}>{'Card on file.\nNothing charged yet.'}</h1>
        <p style={{ margin: '14px 0 0', fontSize: 15, opacity: 0.7, lineHeight: 1.5 }}>
          We hold your card so you can hold a place in one tap. You&apos;re only charged when your session locks in — 2 hours before.
        </p>
      </div>

      {/* Yellow disclaimer card */}
      <div style={{ padding: '24px 14px 0' }}>
        <div
          style={{
            background: '#FFD166',
            borderRadius: 24,
            padding: 24,
            color: '#1A1A1A',
          }}
        >
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.16em',
              display: 'block',
              marginBottom: 12,
            }}
          >
            BEFORE YOU HOLD
          </span>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              'Holding is free. Only pay if the session goes ahead.',
              'From 36hrs out, holds become locked-in bookings.',
              'Price locks 2 hours before — that\'s when you\'re charged.',
            ].map((item, i) => (
              <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 13, lineHeight: 1.45 }}>
                <span
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: 999,
                    background: '#1A1A1A',
                    color: '#FFD166',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 9,
                    fontWeight: 700,
                    flexShrink: 0,
                    marginTop: 1,
                  }}
                >
                  {i + 1}
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Buttons */}
      <div style={{ padding: '24px 14px 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Link
          href="/billing?next=/home"
          style={{
            display: 'block',
            width: '100%',
            padding: '18px 24px',
            borderRadius: 9999,
            border: 'none',
            background: '#1A1A1A',
            color: '#F5EDE3',
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
            fontWeight: 700,
            fontSize: 15,
            textAlign: 'center',
            textDecoration: 'none',
            boxSizing: 'border-box',
          }}
        >
          Set up payment →
        </Link>

        <Link
          href="/home"
          style={{
            display: 'block',
            width: '100%',
            padding: '18px 24px',
            borderRadius: 9999,
            border: '1.5px solid rgba(26,26,26,0.18)',
            background: 'transparent',
            color: '#1A1A1A',
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
            fontWeight: 700,
            fontSize: 15,
            textAlign: 'center',
            textDecoration: 'none',
            boxSizing: 'border-box',
          }}
        >
          Skip for now → browse sessions
        </Link>

        <p style={{ margin: '4px 0 0', fontSize: 12, opacity: 0.55, textAlign: 'center', lineHeight: 1.4 }}>
          You&apos;ll need a card saved to hold a spot.
        </p>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';

export function PricingMechanic() {
  const [target, setTarget] = useState(250);
  const [minSpots, setMinSpots] = useState(8);
  const [people, setPeople] = useState(8);
  const FEE = 20;
  const perPerson = Math.round((target + FEE) / Math.max(people, 1));
  const startPrice = Math.round((target + FEE) / Math.max(minSpots, 1));
  const confirmed = people >= minSpots;

  return (
    <div style={{ maxWidth: 1180, margin: '0 auto', padding: '96px 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: 12 }}>
        <Eyebrow>The pricing mechanic</Eyebrow>
      </div>
      <h2 style={heading2}>The more who join, the better value exchange for all.</h2>
      <p style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 48px', fontSize: 17, lineHeight: 1.55, color: '#555' }}>
        The host sets their revenue target. Add the flat Stretchy fee of NZD $20 + GST. Split it across everyone who holds a spot. Fair, transparent, good for all.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          background: '#FFFFFF',
          borderRadius: 32,
          overflow: 'hidden',
          border: '1.5px solid rgba(26,26,26,0.08)',
          boxShadow: '0 30px 60px rgba(26,26,26,0.06)',
        }}
        className="mechanic-grid"
      >
        {/* Controls */}
        <div style={{ padding: 36 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              marginBottom: 28,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.14em',
              background: '#7A8330',
              color: '#F5EDE3',
              padding: '6px 12px',
              borderRadius: 999,
            }}
          >
            ● INTERACTIVE — DRAG IT
          </div>
          <Slider
            label="HOST REVENUE TARGET"
            value={target}
            min={50}
            max={400}
            step={5}
            onChange={setTarget}
            minLabel="$50"
            maxLabel="$400"
            suffix=""
          />
          <Slider
            label="MINIMUM SPOTS TO GO AHEAD"
            value={minSpots}
            min={3}
            max={20}
            onChange={(v) => { setMinSpots(v); if (people < v) setPeople(v); }}
            minLabel="3"
            maxLabel="20"
            suffix=" people"
          />
          <Slider
            label="PEOPLE HOLDING A SPOT"
            value={people}
            min={3}
            max={50}
            onChange={setPeople}
            minLabel="3"
            maxLabel="50"
            suffix=" people"
          />
        </div>

        {/* Readout */}
        <div
          style={{
            padding: 36,
            background: confirmed ? '#7A8330' : '#2A2A2A',
            color: '#F5EDE3',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.16em',
              opacity: 0.8,
            }}
          >
            {confirmed ? '● GOING AHEAD' : `○ NEEDS ${minSpots - people} MORE TO CONFIRM`}
          </div>

          {/* Formula */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', margin: '28px 0', fontFamily: "'JetBrains Mono', monospace", fontSize: 13 }}>
            <span style={{ background: '#FFD166', color: '#1A1A1A', padding: '6px 11px', borderRadius: 10, fontWeight: 700 }}>${target} target</span>
            <span style={{ opacity: 0.7, fontSize: 16 }}>+</span>
            <span style={{ background: 'rgba(245,237,227,0.16)', padding: '6px 11px', borderRadius: 10, fontWeight: 700 }}>$20 + GST</span>
            <span style={{ opacity: 0.7, fontSize: 16 }}>÷</span>
            <span style={{ background: 'rgba(245,237,227,0.16)', padding: '6px 11px', borderRadius: 10, fontWeight: 700 }}>{people} people</span>
          </div>

          <div style={{ marginTop: 'auto' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', opacity: 0.8, marginBottom: 6 }}>
              EACH PERSON PAYS
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 34, fontWeight: 700, color: '#FFD166' }}>$</span>
              <span
                style={{
                  fontFamily: "'Bagel Fat One', 'Arial Black', sans-serif",
                  fontSize: 'clamp(72px, 9vw, 110px)',
                  lineHeight: 0.82,
                  color: '#FFD166',
                  letterSpacing: '-0.04em',
                }}
              >
                {perPerson}
              </span>
            </div>
            <p style={{ margin: '14px 0 0', fontSize: 13, lineHeight: 1.5, opacity: 0.9 }}>
              Started at <strong style={{ color: '#F5EDE3' }}>${startPrice}</strong> at minimum holds.
              Host earns <strong style={{ color: '#F5EDE3' }}>${target}</strong>. Stretchy gets
              a flat <strong style={{ color: '#F5EDE3' }}>$20 + GST</strong>. Everyone else? Better value.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  suffix = '',
  minLabel,
  maxLabel,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
  suffix?: string;
  minLabel: string;
  maxLabel: string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div style={{ marginBottom: 26 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', color: '#1A1A1A' }}>{label}</span>
        <span style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em' }}>
          {label.includes('TARGET') ? '$' : ''}{value}{suffix}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="stretchy-range"
        style={{
          width: '100%',
          background: `linear-gradient(90deg, #7A8330 0% ${pct}%, rgba(26,26,26,0.10) ${pct}% 100%)`,
        }}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'rgba(26,26,26,0.5)', letterSpacing: '0.08em' }}>
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: '#7A8330',
        marginBottom: 18,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
      }}
    >
      <span style={{ width: 22, height: 2, background: '#7A8330', display: 'inline-block' }} />
      {children}
    </div>
  );
}

const heading2: React.CSSProperties = {
  fontFamily: "'Space Grotesk', system-ui, sans-serif",
  fontWeight: 700,
  fontSize: 'clamp(34px, 5vw, 56px)',
  lineHeight: 0.98,
  letterSpacing: '-0.025em',
  textAlign: 'center',
  margin: '0 auto 18px',
  maxWidth: 820,
};

'use client';

import { useState } from 'react';

export function PricingCalculator() {
  const [target, setTarget] = useState(200);
  const [minSpots, setMinSpots] = useState(8);
  const [people, setPeople] = useState(12);

  const perPerson = Math.round((target + 23) / people);
  const confirmed = people >= minSpots;

  return (
    <div style={{ padding: '0 16px' }}>
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: 28,
          padding: 24,
          boxShadow: '0 4px 24px rgba(26,26,26,0.08)',
          maxWidth: 520,
          margin: '0 auto',
        }}
      >
        {/* Status */}
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.16em',
            color: confirmed ? '#7A8330' : '#1A1A1A',
            marginBottom: 20,
          }}
        >
          {confirmed
            ? '● GOING AHEAD'
            : `○ NEEDS ${minSpots - people} MORE TO CONFIRM`}
        </div>

        {/* Big price */}
        <div style={{ marginBottom: 20 }}>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.16em',
              color: 'rgba(26,26,26,0.5)',
              marginBottom: 4,
            }}
          >
            EACH PERSON PAYS
          </div>
          <div
            style={{
              fontFamily: "'Bagel Fat One', 'Arial Black', sans-serif",
              fontSize: 72,
              lineHeight: 1,
              color: '#FFD166',
              letterSpacing: '-0.02em',
            }}
          >
            ${perPerson}
          </div>
        </div>

        {/* Formula chips */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            flexWrap: 'wrap',
            marginBottom: 28,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
          }}
        >
          <span
            style={{
              background: '#FFD166',
              color: '#1A1A1A',
              padding: '5px 10px',
              borderRadius: 8,
              fontWeight: 700,
            }}
          >
            ${target}
          </span>
          <span style={{ color: 'rgba(26,26,26,0.5)', fontSize: 14 }}>+</span>
          <span
            style={{
              background: 'rgba(26,26,26,0.07)',
              color: '#1A1A1A',
              padding: '5px 10px',
              borderRadius: 8,
              fontWeight: 700,
            }}
          >
            $23 fee
          </span>
          <span style={{ color: 'rgba(26,26,26,0.5)', fontSize: 14 }}>÷</span>
          <span
            style={{
              background: 'rgba(26,26,26,0.07)',
              color: '#1A1A1A',
              padding: '5px 10px',
              borderRadius: 8,
              fontWeight: 700,
            }}
          >
            {people} people
          </span>
          <span style={{ color: 'rgba(26,26,26,0.5)', fontSize: 14 }}>=</span>
          <span
            style={{
              background: '#1A1A1A',
              color: '#FFD166',
              padding: '5px 10px',
              borderRadius: 8,
              fontWeight: 700,
            }}
          >
            ${perPerson}
          </span>
        </div>

        {/* Sliders */}
        <CalculatorSlider
          label="HOST REVENUE TARGET"
          value={target}
          min={50}
          max={400}
          step={5}
          onChange={setTarget}
          displayPrefix="$"
        />
        <CalculatorSlider
          label="MINIMUM SPOTS"
          value={minSpots}
          min={3}
          max={20}
          step={1}
          onChange={(v) => {
            setMinSpots(v);
            if (people < v) setPeople(v);
          }}
        />
        <CalculatorSlider
          label="PEOPLE HOLDING"
          value={people}
          min={3}
          max={50}
          step={1}
          onChange={setPeople}
        />
      </div>
    </div>
  );
}

interface CalculatorSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  displayPrefix?: string;
}

function CalculatorSlider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  displayPrefix = '',
}: CalculatorSliderProps) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: 8,
        }}
      >
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.12em',
            color: 'rgba(26,26,26,0.5)',
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
            fontSize: 20,
            fontWeight: 700,
            color: '#1A1A1A',
            letterSpacing: '-0.02em',
          }}
        >
          {displayPrefix}{value}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{
          width: '100%',
          accentColor: '#7A8330',
          cursor: 'pointer',
        }}
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: 4,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10,
          color: 'rgba(26,26,26,0.35)',
          letterSpacing: '0.06em',
        }}
      >
        <span>{displayPrefix}{min}</span>
        <span>{displayPrefix}{max}</span>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MOVEMENT_TYPES } from '@/lib/brand';

const MONO: React.CSSProperties = { fontFamily: "'JetBrains Mono', monospace" };
const BODY: React.CSSProperties = { fontFamily: "'Space Grotesk', system-ui, sans-serif" };

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const;
type DayOfWeek = typeof DAYS[number];

const TIMES = [
  { id: 'morning', label: 'Morning', sub: '6–10am' },
  { id: 'lunchtime', label: 'Lunchtime', sub: '12–2pm' },
  { id: 'evening', label: 'Evening', sub: '5–8pm' },
] as const;
type TimeOfDay = typeof TIMES[number]['id'];

export default function SuggestPage() {
  const router = useRouter();

  const [movementType, setMovementType] = useState<string | null>(null);
  const [neighbourhood, setNeighbourhood] = useState('');
  const [dayOfWeek, setDayOfWeek] = useState<DayOfWeek | null>(null);
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay | null>(null);
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const canSubmit = movementType !== null;

  async function handleSubmit() {
    if (!canSubmit || loading) return;
    setLoading(true);
    try {
      await fetch('/api/suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ movementType, neighbourhood, dayOfWeek, timeOfDay, note }),
      });
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div
        style={{
          background: '#7A8330',
          minHeight: '100dvh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 32,
          textAlign: 'center',
          ...BODY,
        }}
      >
        <h1
          style={{
            fontWeight: 700,
            fontSize: 72,
            lineHeight: 0.9,
            letterSpacing: '-0.03em',
            margin: '0 0 20px',
            color: '#F5EDE3',
          }}
        >
          Noted.
        </h1>
        <p
          style={{
            fontSize: 16,
            color: '#F5EDE3',
            opacity: 0.85,
            lineHeight: 1.4,
            maxWidth: 280,
            margin: '0 0 40px',
          }}
        >
          Thanks — we share this with hosts
        </p>
        <button
          onClick={() => router.push('/home')}
          style={{
            background: '#F5EDE3',
            color: '#1A1A1A',
            borderRadius: 9999,
            padding: '18px 36px',
            border: 'none',
            ...BODY,
            fontWeight: 700,
            fontSize: 16,
            cursor: 'pointer',
          }}
        >
          Back to home →
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        background: '#F5EDE3',
        minHeight: '100dvh',
        paddingBottom: 100,
        ...BODY,
      }}
    >
      {/* Top bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '54px 22px 0',
        }}
      >
        <button
          onClick={() => router.back()}
          style={{
            width: 40,
            height: 40,
            borderRadius: 999,
            border: 'none',
            background: 'rgba(26,26,26,0.08)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 16,
            color: '#1A1A1A',
          }}
        >
          ←
        </button>
        <div
          style={{
            padding: '7px 14px',
            borderRadius: 999,
            background: '#FFFFFF',
            border: '1.5px solid rgba(26,26,26,0.10)',
            ...MONO,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.14em',
          }}
        >
          SUGGEST A STRETCH
        </div>
        <div style={{ width: 40 }} />
      </div>

      {/* Hero */}
      <div style={{ padding: '20px 22px 28px' }}>
        <h1
          style={{
            fontWeight: 700,
            fontSize: 56,
            lineHeight: 0.92,
            letterSpacing: '-0.03em',
            margin: 0,
            color: '#1A1A1A',
            whiteSpace: 'pre-line',
          }}
        >
          {`What do\nyou want?`}
        </h1>
      </div>

      {/* Movement type card */}
      <div
        style={{
          margin: '0 14px',
          padding: 24,
          borderRadius: 24,
          background: '#FFFFFF',
          border: '1.5px solid rgba(26,26,26,0.08)',
          marginBottom: 12,
        }}
      >
        <div
          style={{
            ...MONO,
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.16em',
            color: 'rgba(26,26,26,0.55)',
            marginBottom: 14,
          }}
        >
          MOVEMENT TYPE
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {MOVEMENT_TYPES.map((mt) => {
            const selected = movementType === mt.id;
            return (
              <button
                key={mt.id}
                onClick={() => setMovementType(selected ? null : mt.id)}
                style={{
                  padding: '10px 16px',
                  borderRadius: 9999,
                  border: selected ? 'none' : '1.5px solid rgba(26,26,26,0.15)',
                  background: selected ? mt.color : 'transparent',
                  color: selected ? '#FFFFFF' : '#1A1A1A',
                  ...BODY,
                  fontWeight: 600,
                  fontSize: 14,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <span>{mt.emoji}</span>
                <span>{mt.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Neighbourhood card */}
      <div
        style={{
          margin: '0 14px',
          padding: 24,
          borderRadius: 24,
          background: '#FFFFFF',
          border: '1.5px solid rgba(26,26,26,0.08)',
          marginBottom: 12,
        }}
      >
        <div
          style={{
            ...MONO,
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.16em',
            color: 'rgba(26,26,26,0.55)',
            marginBottom: 12,
          }}
        >
          NEIGHBOURHOOD
        </div>
        <input
          type="text"
          value={neighbourhood}
          onChange={(e) => setNeighbourhood(e.target.value)}
          placeholder="e.g. Ponsonby, Grey Lynn, CBD…"
          style={{
            width: '100%',
            borderRadius: 14,
            border: '1.5px solid rgba(26,26,26,0.12)',
            background: '#F5EDE3',
            padding: '14px 16px',
            ...BODY,
            fontSize: 15,
            color: '#1A1A1A',
            outline: 'none',
            boxSizing: 'border-box',
          }}
        />
      </div>

      {/* Day chips */}
      <div style={{ padding: '4px 14px 12px' }}>
        <div
          style={{
            ...MONO,
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.16em',
            color: 'rgba(26,26,26,0.55)',
            marginBottom: 10,
            paddingLeft: 4,
          }}
        >
          DAY OF WEEK
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {DAYS.map((day) => {
            const selected = dayOfWeek === day;
            return (
              <button
                key={day}
                onClick={() => setDayOfWeek(selected ? null : day)}
                style={{
                  padding: '8px 14px',
                  borderRadius: 9999,
                  border: selected ? 'none' : '1.5px solid rgba(26,26,26,0.15)',
                  background: selected ? '#1A1A1A' : '#FFFFFF',
                  color: selected ? '#F5EDE3' : '#1A1A1A',
                  ...MONO,
                  fontWeight: 700,
                  fontSize: 11,
                  letterSpacing: '0.08em',
                  cursor: 'pointer',
                }}
              >
                {day.toUpperCase()}
              </button>
            );
          })}
        </div>
      </div>

      {/* Time chips */}
      <div style={{ padding: '4px 14px 12px' }}>
        <div
          style={{
            ...MONO,
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.16em',
            color: 'rgba(26,26,26,0.55)',
            marginBottom: 10,
            paddingLeft: 4,
          }}
        >
          TIME OF DAY
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {TIMES.map((t) => {
            const selected = timeOfDay === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTimeOfDay(selected ? null : t.id)}
                style={{
                  padding: '10px 18px',
                  borderRadius: 9999,
                  border: selected ? 'none' : '1.5px solid rgba(26,26,26,0.15)',
                  background: selected ? '#2C8FE0' : '#FFFFFF',
                  color: selected ? '#FFFFFF' : '#1A1A1A',
                  ...BODY,
                  fontWeight: 600,
                  fontSize: 14,
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <span>{t.label}</span>
                <span
                  style={{
                    ...MONO,
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    opacity: 0.7,
                  }}
                >
                  {t.sub}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Note card */}
      <div
        style={{
          margin: '4px 14px 0',
          padding: 24,
          borderRadius: 24,
          background: '#FFFFFF',
          border: '1.5px solid rgba(26,26,26,0.08)',
          marginBottom: 20,
        }}
      >
        <div
          style={{
            ...MONO,
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.16em',
            color: 'rgba(26,26,26,0.55)',
            marginBottom: 12,
          }}
        >
          ANYTHING ELSE? (OPTIONAL)
        </div>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Tell us more about what you're looking for…"
          rows={3}
          style={{
            width: '100%',
            borderRadius: 14,
            border: '1.5px solid rgba(26,26,26,0.12)',
            background: '#F5EDE3',
            padding: '12px 14px',
            ...BODY,
            fontSize: 14,
            color: '#1A1A1A',
            outline: 'none',
            resize: 'vertical',
            boxSizing: 'border-box',
          }}
        />
      </div>

      {/* Submit */}
      <div style={{ padding: '0 14px' }}>
        <button
          onClick={handleSubmit}
          disabled={!canSubmit || loading}
          style={{
            width: '100%',
            padding: '20px 0',
            borderRadius: 9999,
            border: 'none',
            background: canSubmit ? '#1A1A1A' : 'rgba(26,26,26,0.15)',
            color: '#F5EDE3',
            ...BODY,
            fontWeight: 700,
            fontSize: 17,
            cursor: canSubmit && !loading ? 'pointer' : 'not-allowed',
            opacity: !canSubmit || loading ? 0.5 : 1,
          }}
        >
          {loading ? 'Sending…' : 'Submit suggestion →'}
        </button>
      </div>
    </div>
  );
}

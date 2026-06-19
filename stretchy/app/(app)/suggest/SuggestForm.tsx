'use client';

import { useState, useEffect } from 'react';
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

type CommunitySuggestion = { type: string; neighbourhood: string | null; count: number };

const FALLBACK_SUGGESTIONS: CommunitySuggestion[] = [
  { type: 'hiit', neighbourhood: 'Viaduct', count: 47 },
  { type: 'yoga', neighbourhood: 'Te Atatū', count: 32 },
  { type: 'run', neighbourhood: 'Ponsonby', count: 28 },
  { type: 'pilates', neighbourhood: 'CBD', count: 19 },
  { type: 'breathwork', neighbourhood: null, count: 14 },
];

export function SuggestForm({ appMenuButton }: { appMenuButton: React.ReactNode }) {
  const router = useRouter();

  const [movementType, setMovementType] = useState<string | null>(null);
  const [neighbourhood, setNeighbourhood] = useState('');
  const [dayOfWeek, setDayOfWeek] = useState<DayOfWeek | null>(null);
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay | null>(null);
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [community, setCommunity] = useState<CommunitySuggestion[]>(FALLBACK_SUGGESTIONS);

  useEffect(() => {
    fetch('/api/suggestions')
      .then((r) => r.json())
      .then((d) => { if (d.suggestions?.length) setCommunity(d.suggestions); })
      .catch(() => {});
  }, []);

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
        {appMenuButton}
      </div>

      {/* Hero */}
      <div style={{ padding: '20px 22px 20px' }}>
        <h1 style={{ fontWeight: 700, fontSize: 56, lineHeight: 0.92, letterSpacing: '-0.03em', margin: 0, color: '#1A1A1A' }}>
          Float a<br />Stretchy.
        </h1>
        <p style={{ margin: '14px 0 0', fontSize: 14, color: 'rgba(26,26,26,0.55)', lineHeight: 1.45, maxWidth: 300 }}>
          Toss a session idea into the wild. Hosts watch this list — popular ones get picked up.
        </p>
      </div>

      {/* YOUR SUGGESTION — purple card */}
      <div style={{ margin: '0 14px', padding: 20, borderRadius: 28, background: '#A535C7', color: '#F5EDE3', marginBottom: 16 }}>
        <span style={{ ...MONO, fontSize: 11, fontWeight: 700, letterSpacing: '0.16em' }}>YOUR SUGGESTION</span>
        <h3 style={{ ...BODY, fontSize: 22, margin: '8px 0 18px', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1 }}>
          What do you<br />wish existed?
        </h3>

        {/* Movement type */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ ...MONO, fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', opacity: 0.75, marginBottom: 10 }}>TYPE</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
            {MOVEMENT_TYPES.map((mt) => {
              const selected = movementType === mt.id;
              return (
                <button
                  key={mt.id}
                  onClick={() => setMovementType(selected ? null : mt.id)}
                  style={{
                    padding: '9px 14px', borderRadius: 9999,
                    border: selected ? 'none' : '1.5px solid rgba(245,237,227,0.35)',
                    background: selected ? '#F5EDE3' : 'rgba(245,237,227,0.12)',
                    color: selected ? '#A535C7' : '#F5EDE3',
                    ...BODY, fontWeight: 600, fontSize: 13, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: 5,
                  }}
                >
                  <span>{mt.emoji}</span>
                  <span>{mt.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Neighbourhood + when row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
          <div>
            <div style={{ ...MONO, fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', opacity: 0.75, marginBottom: 8 }}>WHERE</div>
            <input
              type="text"
              value={neighbourhood}
              onChange={(e) => setNeighbourhood(e.target.value)}
              placeholder="Suburb…"
              style={{
                width: '100%', borderRadius: 12, border: '1.5px solid rgba(245,237,227,0.25)',
                background: 'rgba(245,237,227,0.15)', padding: '12px 14px',
                ...BODY, fontSize: 14, color: '#F5EDE3', outline: 'none', boxSizing: 'border-box',
              }}
            />
          </div>
          <div>
            <div style={{ ...MONO, fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', opacity: 0.75, marginBottom: 8 }}>WHEN</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              <select
                value={dayOfWeek ?? ''}
                onChange={(e) => setDayOfWeek((e.target.value as typeof dayOfWeek) || null)}
                style={{
                  width: '100%', borderRadius: 12, border: '1.5px solid rgba(245,237,227,0.25)',
                  background: 'rgba(245,237,227,0.15)', padding: '11px 12px',
                  ...BODY, fontSize: 13, color: '#F5EDE3', outline: 'none', cursor: 'pointer',
                }}
              >
                <option value="">Any day</option>
                {DAYS.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
              <select
                value={timeOfDay ?? ''}
                onChange={(e) => setTimeOfDay((e.target.value as typeof timeOfDay) || null)}
                style={{
                  width: '100%', borderRadius: 12, border: '1.5px solid rgba(245,237,227,0.25)',
                  background: 'rgba(245,237,227,0.15)', padding: '11px 12px',
                  ...BODY, fontSize: 13, color: '#F5EDE3', outline: 'none', cursor: 'pointer',
                }}
              >
                <option value="">Any time</option>
                {TIMES.map((t) => <option key={t.id} value={t.id}>{t.label} ({t.sub})</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Note */}
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Anything else? (optional)"
          rows={2}
          style={{
            width: '100%', borderRadius: 12, border: '1.5px solid rgba(245,237,227,0.25)',
            background: 'rgba(245,237,227,0.12)', padding: '12px 14px',
            ...BODY, fontSize: 14, color: '#F5EDE3', outline: 'none', resize: 'none', boxSizing: 'border-box',
            marginBottom: 14,
          }}
        />

        <button
          onClick={handleSubmit}
          disabled={!canSubmit || loading}
          style={{
            width: '100%', padding: '16px 0', borderRadius: 9999, border: 'none',
            background: canSubmit ? '#F5EDE3' : 'rgba(245,237,227,0.3)',
            color: canSubmit ? '#A535C7' : 'rgba(245,237,227,0.6)',
            ...BODY, fontWeight: 700, fontSize: 16,
            cursor: canSubmit && !loading ? 'pointer' : 'not-allowed',
          }}
        >
          {loading ? 'Sending…' : 'Float it →'}
        </button>
      </div>

      {/* Community wants */}
      <div style={{ padding: '32px 22px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <h3 style={{ ...BODY, fontWeight: 700, fontSize: 22, margin: 0, letterSpacing: '-0.01em' }}>
          What the community wants
        </h3>
        <span style={{ ...MONO, fontSize: 11, color: 'rgba(26,26,26,0.45)', letterSpacing: '0.08em' }}>
          {community.length} LIVE
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '0 14px 20px' }}>
        {community.map((s, i) => {
          const mt = MOVEMENT_TYPES.find((m) => m.id === s.type);
          const isHot = s.count >= 20;
          return (
            <div
              key={i}
              style={{
                padding: 16, borderRadius: 20,
                background: '#FFFFFF', border: '1.5px solid rgba(26,26,26,0.08)',
                display: 'flex', alignItems: 'center', gap: 12,
              }}
            >
              <div style={{
                width: 44, height: 44, borderRadius: 14, flexShrink: 0,
                background: mt?.color ?? '#1A1A1A',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 22,
              }}>
                {mt?.emoji ?? '✨'}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ ...BODY, fontWeight: 700, fontSize: 14, lineHeight: 1.2 }}>
                  {mt?.label ?? s.type}{s.neighbourhood ? ` · ${s.neighbourhood}` : ''}
                </div>
                <div style={{ ...MONO, fontSize: 11, color: 'rgba(26,26,26,0.5)', marginTop: 4, letterSpacing: '0.08em' }}>
                  {mt?.label ?? s.type}
                  {isHot && <span style={{ color: '#FF6B35', marginLeft: 6 }}>● HOT</span>}
                </div>
              </div>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 4,
                padding: '8px 12px', borderRadius: 999,
                border: `1.5px solid ${isHot ? '#FF6B35' : 'rgba(26,26,26,0.18)'}`,
                background: isHot ? 'rgba(255,107,53,0.08)' : 'transparent',
                color: isHot ? '#FF6B35' : '#1A1A1A',
                ...MONO, fontSize: 12, fontWeight: 700,
              }}>
                {isHot ? '✓' : '+'} {s.count}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

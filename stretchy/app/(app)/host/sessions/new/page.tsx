'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { MOVEMENT_TYPES } from '@/lib/brand';

const STRETCHY_FEE = 23; // $20 + 15% GST

const WHAT_TO_BRING_OPTIONS = [
  { id: 'yoga_mat', label: '🧘 Yoga mat' },
  { id: 'water', label: '💧 Water' },
  { id: 'towel', label: '🏊 Towel' },
  { id: 'comfy_clothes', label: '👕 Comfy clothes' },
  { id: 'layers', label: '🧥 Layers for after' },
  { id: 'nothing', label: '✓ Nothing — all provided' },
];

const DURATIONS = [30, 45, 60, 75, 90];

const card: React.CSSProperties = {
  background: '#FFFFFF',
  borderRadius: 20,
  padding: 20,
  border: '1.5px solid rgba(26,26,26,0.08)',
  marginBottom: 16,
};

const label: React.CSSProperties = {
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: 10,
  fontWeight: 700,
  letterSpacing: '0.16em',
  color: '#888',
  marginBottom: 10,
  display: 'block',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  fontFamily: "'Space Grotesk', system-ui, sans-serif",
  fontSize: 16,
  color: '#1A1A1A',
  background: '#F5EDE3',
  border: '1.5px solid rgba(26,26,26,0.12)',
  borderRadius: 12,
  padding: '12px 14px',
  outline: 'none',
  boxSizing: 'border-box',
};

const ctaButton: React.CSSProperties = {
  width: '100%',
  background: '#A535C7',
  color: '#F5EDE3',
  border: 'none',
  borderRadius: 9999,
  padding: '16px 24px',
  fontFamily: "'Space Grotesk', system-ui, sans-serif",
  fontWeight: 700,
  fontSize: 16,
  cursor: 'pointer',
  marginTop: 8,
};

function calcPerPerson(target: number, spots: number) {
  return Math.round((target + STRETCHY_FEE) / Math.max(spots, 1));
}

export default function NewSessionPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Step 1
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [duration, setDuration] = useState<number | null>(null);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  // Step 2
  const [locationName, setLocationName] = useState('');
  const [locationAddress, setLocationAddress] = useState('');
  const [gettingThere, setGettingThere] = useState('');
  const [socialStretch, setSocialStretch] = useState('');

  // Step 3
  const [description, setDescription] = useState('');
  const [whatToBring, setWhatToBring] = useState<string[]>([]);

  // Step 4
  const [target, setTarget] = useState(200);
  const [minSpots, setMinSpots] = useState(8);
  const [maxSpots, setMaxSpots] = useState(16);

  function toggleBring(id: string) {
    setWhatToBring((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  const startPrice = calcPerPerson(target, maxSpots);
  const midSpots = Math.round((minSpots + maxSpots) / 2);
  const midPrice = calcPerPerson(target, midSpots);
  const floorPrice = calcPerPerson(target, minSpots);

  async function handleSubmit() {
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          type,
          duration,
          date,
          time,
          locationName,
          locationAddress,
          gettingThere,
          socialStretch,
          description,
          whatToBring,
          target,
          minSpots,
          maxSpots,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to create session');
      }
      router.push('/host');
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  }

  // Pip progress indicator
  function Pips() {
    return (
      <div style={{ display: 'flex', gap: 6, alignItems: 'center', justifyContent: 'center', marginBottom: 28 }}>
        {[1, 2, 3, 4].map((s) => (
          <div
            key={s}
            style={{
              width: s === step ? 24 : 8,
              height: 8,
              borderRadius: 9999,
              background: s === step ? '#A535C7' : s < step ? '#1A1A1A' : 'rgba(26,26,26,0.15)',
              transition: 'all 0.2s ease',
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div style={{ background: '#F5EDE3', minHeight: '100dvh' }}>
      <div style={{ maxWidth: 560, margin: '0 auto', padding: '48px 20px 80px' }}>

        {/* Header */}
        <div style={{ marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12 }}>
          {step > 1 && (
            <button
              onClick={() => setStep((s) => s - 1)}
              style={{
                background: 'none',
                border: 'none',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.1em',
                color: '#666',
                cursor: 'pointer',
                padding: 0,
              }}
            >
              ← BACK
            </button>
          )}
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '0.16em',
                color: '#A535C7',
                marginBottom: 2,
              }}
            >
              STEP {step} OF 4
            </div>
            <div
              style={{
                fontFamily: "'Space Grotesk', system-ui, sans-serif",
                fontWeight: 700,
                fontSize: 22,
                color: '#1A1A1A',
                letterSpacing: '-0.02em',
              }}
            >
              {step === 1 && 'THE BASICS'}
              {step === 2 && 'THE PLACE'}
              {step === 3 && 'THE EXPERIENCE'}
              {step === 4 && 'THE NUMBERS'}
            </div>
          </div>
        </div>

        {step === 1 && (
          <div style={{ marginBottom: 16 }}>
            <Link
              href="/host"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.1em',
                color: '#666',
                textDecoration: 'none',
              }}
            >
              ← Back to host
            </Link>
          </div>
        )}

        <Pips />

        {/* ─── STEP 1: THE BASICS ─────────────────────────────────── */}
        {step === 1 && (
          <>
            {/* Session Name */}
            <div style={card}>
              <span style={label}>SESSION NAME</span>
              <input
                style={inputStyle}
                type="text"
                placeholder="e.g. Sunday Slow Flow"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Type of Session */}
            <div style={card}>
              <span style={label}>TYPE OF SESSION</span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {MOVEMENT_TYPES.map((m) => {
                  const selected = type === m.id;
                  return (
                    <button
                      key={m.id}
                      onClick={() => setType(m.id)}
                      style={{
                        padding: '8px 16px',
                        borderRadius: 9999,
                        border: selected ? 'none' : '1.5px solid rgba(26,26,26,0.15)',
                        background: selected ? m.color : 'transparent',
                        color: selected ? '#F5EDE3' : '#1A1A1A',
                        fontFamily: "'Space Grotesk', system-ui, sans-serif",
                        fontWeight: 600,
                        fontSize: 13,
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      {m.emoji} {m.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Duration */}
            <div style={card}>
              <span style={label}>DURATION</span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {DURATIONS.map((d) => {
                  const selected = duration === d;
                  return (
                    <button
                      key={d}
                      onClick={() => setDuration(d)}
                      style={{
                        padding: '8px 16px',
                        borderRadius: 9999,
                        border: selected ? 'none' : '1.5px solid rgba(26,26,26,0.15)',
                        background: selected ? '#1A1A1A' : 'transparent',
                        color: selected ? '#F5EDE3' : '#1A1A1A',
                        fontFamily: "'Space Grotesk', system-ui, sans-serif",
                        fontWeight: 600,
                        fontSize: 13,
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      {d} min
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Date & Time */}
            <div style={card}>
              <span style={label}>DATE & TIME</span>
              <div style={{ display: 'flex', gap: 10 }}>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  style={{ ...inputStyle, flex: 1 }}
                />
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  style={{ ...inputStyle, flex: 1 }}
                />
              </div>
            </div>

            <button
              style={ctaButton}
              onClick={() => setStep(2)}
              disabled={!name || !type || !duration || !date || !time}
            >
              Next → the place
            </button>
          </>
        )}

        {/* ─── STEP 2: THE PLACE ──────────────────────────────────── */}
        {step === 2 && (
          <>
            {/* Location */}
            <div style={card}>
              <span style={label}>LOCATION</span>
              <input
                style={{ ...inputStyle, marginBottom: 10 }}
                type="text"
                placeholder="Venue name"
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
              />
              <input
                style={inputStyle}
                type="text"
                placeholder="Street address"
                value={locationAddress}
                onChange={(e) => setLocationAddress(e.target.value)}
              />
            </div>

            {/* Getting There */}
            <div style={card}>
              <span style={label}>GETTING THERE</span>
              <textarea
                style={{ ...inputStyle, minHeight: 96, resize: 'vertical' }}
                placeholder="Parking, entrance, what to look for..."
                value={gettingThere}
                onChange={(e) => setGettingThere(e.target.value)}
              />
            </div>

            {/* Social Stretch */}
            <div
              style={{
                ...card,
                background: '#2C8FE0',
                border: 'none',
              }}
            >
              <span style={{ ...label, color: 'rgba(255,255,255,0.7)' }}>SOCIAL STRETCH</span>
              <p
                style={{
                  fontFamily: "'Space Grotesk', system-ui, sans-serif",
                  fontSize: 15,
                  color: '#FFFFFF',
                  margin: '0 0 12px',
                  fontWeight: 600,
                }}
              >
                Where's the hang after?
              </p>
              <input
                style={{
                  ...inputStyle,
                  background: 'rgba(255,255,255,0.15)',
                  border: '1.5px solid rgba(255,255,255,0.3)',
                  color: '#FFFFFF',
                }}
                type="text"
                placeholder="Café or spot nearby..."
                value={socialStretch}
                onChange={(e) => setSocialStretch(e.target.value)}
              />
              <p
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  color: 'rgba(255,255,255,0.6)',
                  marginTop: 8,
                  marginBottom: 0,
                  letterSpacing: '0.06em',
                }}
              >
                Optional — adds a social dimension.
              </p>
            </div>

            <button
              style={ctaButton}
              onClick={() => setStep(3)}
              disabled={!locationName || !locationAddress}
            >
              Next → the experience
            </button>
          </>
        )}

        {/* ─── STEP 3: THE EXPERIENCE ─────────────────────────────── */}
        {step === 3 && (
          <>
            {/* Description */}
            <div style={card}>
              <span style={label}>DESCRIPTION</span>
              <textarea
                style={{ ...inputStyle, minHeight: 120, resize: 'vertical' }}
                placeholder="Describe the tone, level, and how attendees will feel..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* What to Bring */}
            <div style={card}>
              <span style={label}>WHAT TO BRING</span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {WHAT_TO_BRING_OPTIONS.map((opt) => {
                  const selected = whatToBring.includes(opt.id);
                  return (
                    <button
                      key={opt.id}
                      onClick={() => toggleBring(opt.id)}
                      style={{
                        padding: '8px 14px',
                        borderRadius: 9999,
                        border: selected ? 'none' : '1.5px solid rgba(26,26,26,0.15)',
                        background: selected ? '#1A1A1A' : 'transparent',
                        color: selected ? '#F5EDE3' : '#1A1A1A',
                        fontFamily: "'Space Grotesk', system-ui, sans-serif",
                        fontWeight: 600,
                        fontSize: 13,
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      {selected ? '✓ ' : ''}{opt.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Hint tile */}
            <div
              style={{
                background: '#FFD166',
                borderRadius: 16,
                padding: '14px 18px',
                marginBottom: 16,
                fontFamily: "'Space Grotesk', system-ui, sans-serif",
                fontSize: 14,
                fontWeight: 600,
                color: '#1A1A1A',
              }}
            >
              Last step: set your pricing target →
            </div>

            <button
              style={ctaButton}
              onClick={() => setStep(4)}
              disabled={!description}
            >
              Next → the numbers
            </button>
          </>
        )}

        {/* ─── STEP 4: THE NUMBERS ────────────────────────────────── */}
        {step === 4 && (
          <>
            {/* Market tip */}
            <div
              style={{
                background: '#B5DDE9',
                borderRadius: 16,
                padding: '14px 18px',
                marginBottom: 16,
                fontFamily: "'Space Grotesk', system-ui, sans-serif",
                fontSize: 14,
                fontWeight: 600,
                color: '#1A1A1A',
              }}
            >
              Fair market in NZ is $25–35 per person for a quality class.
            </div>

            {/* Your Target */}
            <div style={card}>
              <span style={label}>YOUR TARGET</span>
              <div
                style={{
                  background: '#FFD166',
                  borderRadius: 14,
                  padding: '16px 20px',
                  marginBottom: 14,
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: 4,
                }}
              >
                <span
                  style={{
                    fontFamily: "'Bagel Fat One', 'Space Grotesk', system-ui, sans-serif",
                    fontSize: 48,
                    fontWeight: 900,
                    color: '#1A1A1A',
                    lineHeight: 1,
                  }}
                >
                  ${target}
                </span>
              </div>
              <input
                type="range"
                min={50}
                max={2000}
                step={10}
                value={target}
                onChange={(e) => setTarget(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#A535C7', marginBottom: 6 }}
              />
              <p
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  color: '#888',
                  margin: 0,
                  letterSpacing: '0.06em',
                }}
              >
                Stretchy adds $20 + GST on top. You always take home your target.
              </p>
            </div>

            {/* Min Spots */}
            <div style={card}>
              <span style={label}>MINIMUM SPOTS TO RUN</span>
              <div
                style={{
                  fontFamily: "'Space Grotesk', system-ui, sans-serif",
                  fontSize: 28,
                  fontWeight: 700,
                  color: '#1A1A1A',
                  marginBottom: 10,
                }}
              >
                {minSpots} people
              </div>
              <input
                type="range"
                min={4}
                max={20}
                step={1}
                value={minSpots}
                onChange={(e) => {
                  const v = Number(e.target.value);
                  setMinSpots(v);
                  if (maxSpots <= v) setMaxSpots(v + 1);
                }}
                style={{ width: '100%', accentColor: '#1A1A1A', marginBottom: 6 }}
              />
              <p
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  color: '#888',
                  margin: 0,
                  letterSpacing: '0.06em',
                }}
              >
                Below this — session cancels.
              </p>
            </div>

            {/* Capacity */}
            <div style={card}>
              <span style={label}>CAPACITY</span>
              <div
                style={{
                  fontFamily: "'Space Grotesk', system-ui, sans-serif",
                  fontSize: 28,
                  fontWeight: 700,
                  color: '#1A1A1A',
                  marginBottom: 10,
                }}
              >
                {maxSpots} people
              </div>
              <input
                type="range"
                min={minSpots + 1}
                max={30}
                step={1}
                value={maxSpots}
                onChange={(e) => setMaxSpots(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#1A1A1A' }}
              />
            </div>

            {/* Live Price Preview */}
            <div
              style={{
                ...card,
                background: '#1A1A1A',
                border: 'none',
                marginBottom: 16,
              }}
            >
              <span style={{ ...label, color: 'rgba(255,255,255,0.4)' }}>LIVE PRICE PREVIEW</span>
              <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                <div>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 10,
                      color: 'rgba(255,255,255,0.4)',
                      letterSpacing: '0.12em',
                      marginBottom: 4,
                    }}
                  >
                    AT CAPACITY ({maxSpots})
                  </div>
                  <div
                    style={{
                      fontFamily: "'Space Grotesk', system-ui, sans-serif",
                      fontWeight: 700,
                      fontSize: 28,
                      color: '#FFD166',
                    }}
                  >
                    ${startPrice}
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 10,
                      color: 'rgba(255,255,255,0.4)',
                      letterSpacing: '0.12em',
                      marginBottom: 4,
                    }}
                  >
                    MIDWAY ({midSpots})
                  </div>
                  <div
                    style={{
                      fontFamily: "'Space Grotesk', system-ui, sans-serif",
                      fontWeight: 700,
                      fontSize: 28,
                      color: '#FFD166',
                    }}
                  >
                    ${midPrice}
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 10,
                      color: 'rgba(255,255,255,0.4)',
                      letterSpacing: '0.12em',
                      marginBottom: 4,
                    }}
                  >
                    MINIMUM ({minSpots})
                  </div>
                  <div
                    style={{
                      fontFamily: "'Space Grotesk', system-ui, sans-serif",
                      fontWeight: 700,
                      fontSize: 28,
                      color: '#FFD166',
                    }}
                  >
                    ${floorPrice}
                  </div>
                </div>
              </div>
            </div>

            {error && (
              <div
                style={{
                  background: '#E63946',
                  color: '#FFFFFF',
                  borderRadius: 12,
                  padding: '12px 16px',
                  fontFamily: "'Space Grotesk', system-ui, sans-serif",
                  fontSize: 14,
                  marginBottom: 12,
                }}
              >
                {error}
              </div>
            )}

            <button
              style={{ ...ctaButton, opacity: submitting ? 0.6 : 1 }}
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting ? 'Posting...' : 'Post session →'}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { SMark } from '@/components/ui/SMark';
import { MOVEMENT_TYPES } from '@/lib/brand';

const STRETCHY_FEE = 23;

const WHAT_TO_BRING = [
  { id: 'yoga_mat', label: 'Yoga mat' },
  { id: 'water', label: 'Water' },
  { id: 'towel', label: 'Towel' },
  { id: 'comfy_clothes', label: 'Comfy clothes' },
  { id: 'layers', label: 'Layers for after' },
  { id: 'nothing', label: 'Nothing — provided' },
];

const DURATIONS = [30, 45, 60, 75, 90];

const MONO = "'JetBrains Mono', monospace";
const BODY = "'Space Grotesk', system-ui, sans-serif";
const DISPLAY = "'Bagel Fat One', system-ui, sans-serif";

function calcPer(target: number, spots: number) {
  return Math.round((target + STRETCHY_FEE) / Math.max(spots, 1));
}

const STEP_TITLES = ['Name your\nsession.', 'Where it\nhappens.', 'What to\nexpect.', 'Set your\ntarget.'];
const STEP_LABELS = ['THE BASICS', 'THE PLACE', 'THE EXPERIENCE', 'THE NUMBERS'];

export default function NewSessionPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [duration, setDuration] = useState<number | null>(null);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const [locationName, setLocationName] = useState('');
  const [locationAddress, setLocationAddress] = useState('');
  const [gettingThere, setGettingThere] = useState('');
  const [socialStretch, setSocialStretch] = useState('');

  const [description, setDescription] = useState('');
  const [whatToBring, setWhatToBring] = useState<string[]>([]);

  const [target, setTarget] = useState(200);
  const [minSpots, setMinSpots] = useState(8);
  const [maxSpots, setMaxSpots] = useState(16);

  const toggleBring = (id: string) =>
    setWhatToBring((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  const startPrice = calcPer(target, maxSpots);
  const floorPrice = calcPer(target, minSpots);

  async function handleSubmit() {
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, type, duration, date, time, locationName, locationAddress, gettingThere, socialStretch, description, whatToBring, target, minSpots, maxSpots }),
      });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error || 'Failed to create session');
      }
      router.push('/host');
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Something went wrong');
      setSubmitting(false);
    }
  }

  const canNext1 = !!name && !!type && !!duration && !!date && !!time;
  const canNext2 = !!locationName;

  const inputStyle: React.CSSProperties = {
    width: '100%', fontFamily: BODY, fontSize: 15, color: '#1A1A1A',
    background: '#F5EDE3', border: '1.5px solid rgba(26,26,26,0.12)',
    borderRadius: 14, padding: '14px 16px', outline: 'none', boxSizing: 'border-box',
  };

  return (
    <div style={{ background: '#F5EDE3', minHeight: '100dvh', paddingBottom: 100 }}>
      {/* Top bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '54px 22px 0' }}>
        {step > 1 ? (
          <button
            onClick={() => setStep((s) => s - 1)}
            style={{ width: 40, height: 40, borderRadius: 999, border: 'none', background: 'rgba(26,26,26,0.08)', cursor: 'pointer', fontSize: 18, color: '#1A1A1A' }}
          >←</button>
        ) : (
          <Link href="/host" style={{ width: 40, height: 40, borderRadius: 999, background: 'rgba(26,26,26,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1A1A1A', textDecoration: 'none', fontSize: 18 }}>←</Link>
        )}

        {/* Progress pips */}
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          {[1, 2, 3, 4].map((s) => (
            <div key={s} style={{ width: s === step ? 24 : 8, height: 6, borderRadius: 999, background: s < step ? '#1A1A1A' : s === step ? '#1A1A1A' : 'rgba(26,26,26,0.18)', transition: 'all 0.2s' }} />
          ))}
        </div>

        <span style={{ fontFamily: MONO, fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', color: 'rgba(26,26,26,0.4)', cursor: 'pointer' }}>
          SAVE
        </span>
      </div>

      {/* Step heading */}
      <div style={{ padding: '14px 22px 22px' }}>
        <p style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.20em', color: 'rgba(26,26,26,0.5)', margin: '0 0 10px', fontWeight: 700 }}>
          STEP {step} OF 4 · {STEP_LABELS[step - 1]}
        </p>
        <h1 style={{ fontFamily: BODY, fontWeight: 700, fontSize: 52, lineHeight: 0.92, letterSpacing: '-0.03em', margin: 0, color: '#1A1A1A', whiteSpace: 'pre-line' }}>
          {STEP_TITLES[step - 1]}
        </h1>
      </div>

      {/* ── STEP 1: THE BASICS ── */}
      {step === 1 && (
        <div style={{ padding: '0 14px' }}>
          <div style={{ background: '#FFFFFF', borderRadius: 24, padding: 20, marginBottom: 12 }}>
            <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', color: 'rgba(26,26,26,0.5)', marginBottom: 12 }}>SESSION NAME</div>
            <input style={inputStyle} placeholder="e.g. Sunday Slow Flow" value={name} onChange={(e) => setName(e.target.value)} />
            <div style={{ fontFamily: BODY, fontSize: 12, color: 'rgba(26,26,26,0.45)', marginTop: 8 }}>Make it inviting — this is the first thing people see.</div>
          </div>

          <div style={{ background: '#FFFFFF', borderRadius: 24, padding: 20, marginBottom: 12 }}>
            <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', color: 'rgba(26,26,26,0.5)', marginBottom: 14 }}>TYPE OF SESSION</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {MOVEMENT_TYPES.map((m) => {
                const sel = type === m.id;
                return (
                  <button key={m.id} onClick={() => setType(m.id)} style={{ padding: '9px 16px', borderRadius: 9999, border: sel ? 'none' : '1.5px solid rgba(26,26,26,0.15)', background: sel ? m.color : 'transparent', color: sel ? '#FFFFFF' : '#1A1A1A', fontFamily: BODY, fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>
                    {m.emoji} {m.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{ background: '#FFFFFF', borderRadius: 24, padding: 20, marginBottom: 12 }}>
            <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', color: 'rgba(26,26,26,0.5)', marginBottom: 14 }}>DURATION</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {DURATIONS.map((d) => {
                const sel = duration === d;
                return (
                  <button key={d} onClick={() => setDuration(d)} style={{ padding: '10px 18px', borderRadius: 9999, border: sel ? 'none' : '1.5px solid rgba(26,26,26,0.15)', background: sel ? '#1A1A1A' : 'transparent', color: sel ? '#F5EDE3' : '#1A1A1A', fontFamily: BODY, fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>
                    {d} min
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{ background: '#FFFFFF', borderRadius: 24, padding: 20, marginBottom: 20 }}>
            <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', color: 'rgba(26,26,26,0.5)', marginBottom: 12 }}>DATE & TIME</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 10 }}>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} style={inputStyle} />
              <input type="time" value={time} onChange={(e) => setTime(e.target.value)} style={inputStyle} />
            </div>
          </div>

          <button onClick={() => setStep(2)} disabled={!canNext1} style={{ width: '100%', padding: '20px 0', borderRadius: 9999, border: 'none', background: canNext1 ? '#1A1A1A' : 'rgba(26,26,26,0.15)', color: '#F5EDE3', fontFamily: BODY, fontWeight: 700, fontSize: 17, cursor: canNext1 ? 'pointer' : 'not-allowed' }}>
            Next — the place →
          </button>
        </div>
      )}

      {/* ── STEP 2: THE PLACE ── */}
      {step === 2 && (
        <div style={{ padding: '0 14px' }}>
          <div style={{ background: '#FFFFFF', borderRadius: 24, padding: 20, marginBottom: 12 }}>
            <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', color: 'rgba(26,26,26,0.5)', marginBottom: 12 }}>LOCATION</div>
            <input style={{ ...inputStyle, marginBottom: 10 }} placeholder="Venue name (e.g. Grey Lynn Community Hall)" value={locationName} onChange={(e) => setLocationName(e.target.value)} />
            <input style={inputStyle} placeholder="Street address" value={locationAddress} onChange={(e) => setLocationAddress(e.target.value)} />
          </div>

          <div style={{ background: '#FFFFFF', borderRadius: 24, padding: 20, marginBottom: 12 }}>
            <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', color: 'rgba(26,26,26,0.5)', marginBottom: 10 }}>GETTING THERE</div>
            <textarea
              style={{ ...inputStyle, minHeight: 100, resize: 'vertical' } as React.CSSProperties}
              placeholder="Parking, entrance, what to look for — anything that helps people arrive calm."
              value={gettingThere}
              onChange={(e) => setGettingThere(e.target.value)}
            />
          </div>

          {/* Social Stretch blue card */}
          <div style={{ background: '#2C8FE0', borderRadius: 24, padding: 20, marginBottom: 20 }}>
            <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', color: 'rgba(255,255,255,0.65)', marginBottom: 8 }}>SOCIAL STRETCH +</div>
            <p style={{ fontFamily: BODY, fontSize: 15, color: '#FFFFFF', fontWeight: 600, margin: '0 0 12px' }}>Where's the hang after?</p>
            <input
              style={{ ...inputStyle, background: 'rgba(255,255,255,0.18)', border: '1.5px solid rgba(255,255,255,0.3)', color: '#FFFFFF' }}
              placeholder="Café or spot nearby (optional)…"
              value={socialStretch}
              onChange={(e) => setSocialStretch(e.target.value)}
            />
          </div>

          <button onClick={() => setStep(3)} disabled={!canNext2} style={{ width: '100%', padding: '20px 0', borderRadius: 9999, border: 'none', background: canNext2 ? '#1A1A1A' : 'rgba(26,26,26,0.15)', color: '#F5EDE3', fontFamily: BODY, fontWeight: 700, fontSize: 17, cursor: canNext2 ? 'pointer' : 'not-allowed' }}>
            Next — the experience →
          </button>
        </div>
      )}

      {/* ── STEP 3: THE EXPERIENCE ── */}
      {step === 3 && (
        <div style={{ padding: '0 14px' }}>
          <div style={{ background: '#FFFFFF', borderRadius: 24, padding: 20, marginBottom: 12 }}>
            <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', color: 'rgba(26,26,26,0.5)', marginBottom: 10 }}>DESCRIPTION</div>
            <textarea
              style={{ ...inputStyle, minHeight: 130, resize: 'vertical' } as React.CSSProperties}
              placeholder="Set the tone and the level. Tell people how they'll feel walking out."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div style={{ fontFamily: BODY, fontSize: 12, color: 'rgba(26,26,26,0.45)', marginTop: 8 }}>Set the tone and the level. Tell people how they'll feel walking out.</div>
          </div>

          <div style={{ background: '#FFFFFF', borderRadius: 24, padding: 20, marginBottom: 12 }}>
            <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', color: 'rgba(26,26,26,0.5)', marginBottom: 14 }}>WHAT YOU MAY NEED</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {WHAT_TO_BRING.map((opt) => {
                const sel = whatToBring.includes(opt.id);
                return (
                  <button key={opt.id} onClick={() => toggleBring(opt.id)} style={{ padding: '9px 16px', borderRadius: 9999, border: sel ? 'none' : '1.5px solid rgba(26,26,26,0.15)', background: sel ? '#1A1A1A' : 'transparent', color: sel ? '#F5EDE3' : '#1A1A1A', fontFamily: BODY, fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>
                    {sel && '✓ '}{opt.label}
                  </button>
                );
              })}
            </div>
            <div style={{ fontFamily: BODY, fontSize: 12, color: 'rgba(26,26,26,0.45)', marginTop: 10 }}>Tap what applies, or add your own. Keeps the morning stress-free.</div>
          </div>

          {/* Yellow next-step hint */}
          <div style={{ background: '#FFD166', borderRadius: 20, padding: '14px 18px', marginBottom: 20, display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            <span style={{ fontSize: 18, marginTop: 1 }}>💡</span>
            <div style={{ fontFamily: BODY, fontSize: 13, fontWeight: 600, color: '#1A1A1A', lineHeight: 1.4 }}>
              Next you'll set <strong>the numbers</strong> — your target, the minimum to run, and the live price preview.
            </div>
          </div>

          <button onClick={() => setStep(4)} disabled={!description} style={{ width: '100%', padding: '20px 0', borderRadius: 9999, border: 'none', background: description ? '#1A1A1A' : 'rgba(26,26,26,0.15)', color: '#F5EDE3', fontFamily: BODY, fontWeight: 700, fontSize: 17, cursor: description ? 'pointer' : 'not-allowed' }}>
            Next — the numbers →
          </button>
        </div>
      )}

      {/* ── STEP 4: THE NUMBERS ── */}
      {step === 4 && (
        <div style={{ padding: '0 14px' }}>
          {/* Market tip */}
          <div style={{ background: '#B5DDE9', borderRadius: 20, padding: '14px 18px', marginBottom: 12, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <span style={{ fontSize: 18, marginTop: 1 }}>💡</span>
            <div style={{ fontFamily: BODY, fontSize: 13, fontWeight: 600, color: '#1A1A1A', lineHeight: 1.4 }}>
              For a 60-min casual vinyasa in Auckland, fair market is <strong>$25–35</strong>. With your target & min, you'd start at <strong>${floorPrice}</strong>.
            </div>
          </div>

          {/* Target */}
          <div style={{ background: '#FFFFFF', borderRadius: 24, padding: 22, marginBottom: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
              <span style={{ fontFamily: MONO, fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', color: 'rgba(26,26,26,0.5)' }}>YOUR TARGET</span>
              <span style={{ fontFamily: MONO, fontSize: 10, color: 'rgba(26,26,26,0.4)' }}>$50 — $2,000</span>
            </div>
            <div style={{ background: '#FFD166', padding: '14px 20px', borderRadius: 16, marginBottom: 14, display: 'flex', alignItems: 'baseline', gap: 4 }}>
              <span style={{ fontFamily: MONO, fontSize: 22, fontWeight: 700, color: '#1A1A1A' }}>$</span>
              <span style={{ fontFamily: DISPLAY, fontSize: 64, lineHeight: 0.85, color: '#1A1A1A', letterSpacing: '-0.04em' }}>{target}</span>
              <span style={{ fontFamily: MONO, fontSize: 13, color: 'rgba(26,26,26,0.6)', marginLeft: 8 }}>per session</span>
            </div>
            <input type="range" min={50} max={2000} step={10} value={target} onChange={(e) => setTarget(Number(e.target.value))} style={{ width: '100%', accentColor: '#1A1A1A', marginBottom: 6 }} />
            <p style={{ fontFamily: MONO, fontSize: 10, color: 'rgba(26,26,26,0.5)', margin: 0, letterSpacing: '0.04em' }}>
              Cover your venue, your time, your costs. The $20 + GST Stretchy fee is added on top.
            </p>
          </div>

          {/* Min spots */}
          <div style={{ background: '#FFFFFF', borderRadius: 24, padding: 22, marginBottom: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
              <span style={{ fontFamily: MONO, fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', color: 'rgba(26,26,26,0.5)' }}>MINIMUM SPOTS TO RUN</span>
              <span style={{ fontFamily: DISPLAY, fontSize: 32, lineHeight: 1, color: '#1A1A1A', letterSpacing: '-0.02em' }}>{minSpots}</span>
            </div>
            <input type="range" min={4} max={20} step={1} value={minSpots} onChange={(e) => { const v = Number(e.target.value); setMinSpots(v); if (maxSpots <= v) setMaxSpots(v + 4); }} style={{ width: '100%', accentColor: '#1A1A1A', marginBottom: 6 }} />
            <p style={{ fontFamily: MONO, fontSize: 10, color: 'rgba(26,26,26,0.5)', margin: 0, letterSpacing: '0.04em' }}>
              The smallest group that makes it worth running. Below this — no one's charged.
            </p>
          </div>

          {/* Capacity */}
          <div style={{ background: '#FFFFFF', borderRadius: 24, padding: 22, marginBottom: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
              <span style={{ fontFamily: MONO, fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', color: 'rgba(26,26,26,0.5)' }}>CAPACITY (MAX)</span>
              <span style={{ fontFamily: DISPLAY, fontSize: 32, lineHeight: 1, color: '#1A1A1A', letterSpacing: '-0.02em' }}>{maxSpots}</span>
            </div>
            <input type="range" min={minSpots + 1} max={30} step={1} value={maxSpots} onChange={(e) => setMaxSpots(Number(e.target.value))} style={{ width: '100%', accentColor: '#1A1A1A' }} />
          </div>

          {/* Live price preview — dark card */}
          <div style={{ background: '#1A1A1A', borderRadius: 24, padding: 22, marginBottom: 20 }}>
            <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', color: '#FFD166', marginBottom: 16 }}>LIVE PRICE PREVIEW</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {[
                [minSpots, floorPrice, 'STARTING PRICE'],
                [maxSpots, startPrice, 'FLOOR PRICE'],
              ].map(([spots, price, lbl], i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: i === 0 ? '1px solid rgba(245,237,227,0.10)' : 'none' }}>
                  <div>
                    <div style={{ fontFamily: MONO, fontSize: 12, fontWeight: 700, color: '#F5EDE3' }}>{spots} SPOTS</div>
                    <div style={{ fontFamily: MONO, fontSize: 9, color: '#FFD166', marginTop: 2, letterSpacing: '0.12em' }}>{lbl}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
                    <span style={{ fontFamily: MONO, fontSize: 14, fontWeight: 700, color: '#FFD166' }}>$</span>
                    <span style={{ fontFamily: DISPLAY, fontSize: 36, lineHeight: 0.85, color: '#FFD166', letterSpacing: '-0.02em' }}>{price}</span>
                  </div>
                </div>
              ))}
            </div>
            <p style={{ fontFamily: MONO, fontSize: 10, color: 'rgba(245,237,227,0.45)', margin: '14px 0 0', lineHeight: 1.5, letterSpacing: '0.04em' }}>
              At minimum, you hit your ${target} target. Every extra person is a better deal for the room.
            </p>
          </div>

          {error && (
            <div style={{ background: '#E63946', color: '#FFFFFF', borderRadius: 14, padding: '12px 16px', fontFamily: BODY, fontSize: 14, marginBottom: 12 }}>
              {error}
            </div>
          )}

          <button onClick={handleSubmit} disabled={submitting} style={{ width: '100%', padding: '20px 0', borderRadius: 9999, border: 'none', background: submitting ? 'rgba(26,26,26,0.4)' : '#A535C7', color: '#F5EDE3', fontFamily: BODY, fontWeight: 700, fontSize: 17, cursor: submitting ? 'not-allowed' : 'pointer' }}>
            {submitting ? 'Posting…' : 'Post session · go to dashboard →'}
          </button>
        </div>
      )}
    </div>
  );
}

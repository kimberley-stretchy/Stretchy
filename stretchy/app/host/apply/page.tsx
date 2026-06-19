'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { SMark } from '@/components/ui/SMark';
import { MOVEMENT_TYPES } from '@/lib/brand';

const MONO: React.CSSProperties = { fontFamily: "'JetBrains Mono', monospace" };
const BODY: React.CSSProperties = { fontFamily: "'Space Grotesk', system-ui, sans-serif" };

const CREDENTIAL_OPTIONS = ['Certified', 'First aid', 'Insurance', 'Other'];
const SOCIAL_OPTIONS = ['Instagram', 'TikTok', 'Website', 'Substack'];
const FREQUENCY_OPTIONS = ['Multiple/week', 'Weekly', 'Fortnightly', 'Monthly', 'Events only'];
const AUCKLAND_HOODS = ['Grey Lynn', 'Ponsonby', 'Herne Bay', 'Parnell', 'CBD', 'Newmarket', 'Mt Eden', 'Pt Chev', 'Te Atatū', 'Takapuna', 'Remuera', 'Ellerslie'];

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '14px 16px', borderRadius: 14,
  border: '1.5px solid rgba(26,26,26,0.14)', background: '#FFFFFF',
  ...BODY, fontSize: 15, color: '#1A1A1A', outline: 'none', boxSizing: 'border-box',
};

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ ...MONO, fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', color: 'rgba(26,26,26,0.55)', marginBottom: 8 }}>
      {children}
    </div>
  );
}

function ChipButton({
  selected, onClick, color = '#1A1A1A', children,
}: { selected: boolean; onClick: () => void; color?: string; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '9px 16px', borderRadius: 9999,
        border: selected ? 'none' : '1.5px solid rgba(26,26,26,0.18)',
        background: selected ? color : '#FFFFFF',
        color: selected ? '#F5EDE3' : '#1A1A1A',
        ...BODY, fontWeight: 600, fontSize: 13, cursor: 'pointer',
      }}
    >
      {children}
    </button>
  );
}

export default function ApplyPage() {
  const router = useRouter();
  const [basedInNz, setBasedInNz] = useState(true);
  const [bio, setBio] = useState('');
  const [teaches, setTeaches] = useState('');
  const [yearsActive, setYearsActive] = useState('');
  const [neighbourhoods, setNeighbourhoods] = useState<string[]>([]);
  const [customHood, setCustomHood] = useState('');
  const [showHoodInput, setShowHoodInput] = useState(false);
  const [credentials, setCredentials] = useState<string[]>([]);
  const [socialLinks, setSocialLinks] = useState<string[]>([]);
  const [hasSocialStretch, setHasSocialStretch] = useState(false);
  const [socialVenue, setSocialVenue] = useState('');
  const [frequency, setFrequency] = useState<string | null>(null);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const toggleArr = (arr: string[], set: (a: string[]) => void, val: string) => {
    set(arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]);
  };

  const canSubmit = agreed && !loading;

  const submit = async () => {
    if (!canSubmit) return;
    setLoading(true);
    const bioText = [
      bio,
      neighbourhoods.length ? `Hosts in: ${neighbourhoods.join(', ')}` : '',
      credentials.length ? `Credentials: ${credentials.join(', ')}` : '',
      socialLinks.length ? `Social: ${socialLinks.join(', ')}` : '',
      hasSocialStretch ? `Social stretch: YES${socialVenue ? ` at ${socialVenue}` : ''}` : '',
      frequency ? `Frequency: ${frequency}` : '',
      yearsActive ? `Years active: ${yearsActive}` : '',
    ].filter(Boolean).join('\n\n');

    await fetch('/api/host/apply', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        full_name: '',
        email: '',
        specialty: teaches,
        bio: bioText,
        instagram: socialLinks.includes('Instagram') ? 'yes' : '',
        basedInNz,
      }),
    });
    setLoading(false);
    setDone(true);
  };

  if (done) {
    return (
      <div style={{
        minHeight: '100dvh', background: '#7A8330',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: 32, textAlign: 'center', ...BODY,
      }}>
        <h1 style={{ fontWeight: 700, fontSize: 72, lineHeight: 0.9, letterSpacing: '-0.03em', margin: '0 0 20px', color: '#F5EDE3' }}>
          Applied.
        </h1>
        <p style={{ fontSize: 16, color: '#F5EDE3', opacity: 0.85, lineHeight: 1.4, maxWidth: 280, margin: '0 0 40px' }}>
          We'll vet your application and be in touch within 5 days.
        </p>
        <button
          onClick={() => router.push('/home')}
          style={{
            background: '#F5EDE3', color: '#1A1A1A', borderRadius: 9999,
            padding: '18px 36px', border: 'none', ...BODY, fontWeight: 700, fontSize: 16, cursor: 'pointer',
          }}
        >
          Back to home →
        </button>
      </div>
    );
  }

  return (
    <div style={{ background: '#F5EDE3', minHeight: '100dvh', paddingBottom: 100, ...BODY }}>
      {/* Top bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '54px 22px 0' }}>
        <button
          onClick={() => router.back()}
          style={{
            width: 40, height: 40, borderRadius: 999, border: 'none',
            background: 'rgba(26,26,26,0.08)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18, color: '#1A1A1A',
          }}
        >←</button>
        <div style={{
          padding: '7px 14px', borderRadius: 999, background: '#FFFFFF',
          border: '1.5px solid rgba(26,26,26,0.10)',
          ...MONO, fontSize: 11, fontWeight: 700, letterSpacing: '0.14em',
        }}>
          HOST APPLICATION
        </div>
        <Link href="/home" style={{ display: 'flex', alignItems: 'center' }}>
          <SMark size={32} color="#1A1A1A" />
        </Link>
      </div>

      {/* Heading */}
      <div style={{ padding: '16px 22px 20px' }}>
        <h1 style={{
          fontWeight: 700, fontSize: 56, lineHeight: 0.9,
          letterSpacing: '-0.03em', margin: 0, color: '#1A1A1A',
        }}>
          Host a<br />Stretchy.
        </h1>
      </div>

      {/* Info card — soft blue */}
      <div style={{ margin: '0 14px 20px', padding: 20, borderRadius: 28, background: '#B5DDE9', color: '#1A1A1A' }}>
        <p style={{ margin: '0 0 12px', fontSize: 14, lineHeight: 1.5 }}>
          A Stretchy movement led by locals. <strong>Vetted once. Active for 6 months.</strong> Change your sessions any time.
        </p>
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          {['Set your own target', 'No platform %', 'Cancel any session'].map((s) => (
            <span key={s} style={{ ...MONO, fontSize: 11, fontWeight: 700, letterSpacing: '0.08em' }}>✓ {s}</span>
          ))}
        </div>
      </div>

      <div style={{ padding: '0 14px', display: 'flex', flexDirection: 'column', gap: 18 }}>

        {/* NZ */}
        <div>
          <Label>ARE YOU BASED IN NEW ZEALAND?</Label>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={() => setBasedInNz(true)}
              style={{
                flex: 1, padding: 14, borderRadius: 14,
                border: basedInNz ? 'none' : '1.5px solid rgba(26,26,26,0.14)',
                background: basedInNz ? '#1A1A1A' : '#FFFFFF',
                color: basedInNz ? '#F5EDE3' : '#1A1A1A',
                ...BODY, fontWeight: 700, fontSize: 15, cursor: 'pointer',
              } as React.CSSProperties}
            >YES</button>
            <button
              onClick={() => setBasedInNz(false)}
              style={{
                flex: 1, padding: 14, borderRadius: 14,
                border: !basedInNz ? 'none' : '1.5px solid rgba(26,26,26,0.14)',
                background: !basedInNz ? '#1A1A1A' : '#FFFFFF',
                color: !basedInNz ? '#F5EDE3' : '#1A1A1A',
                ...BODY, fontWeight: 700, fontSize: 15, cursor: 'pointer',
              } as React.CSSProperties}
            >NO — waitlist</button>
          </div>
        </div>

        {/* Why you're perfect */}
        <div>
          <Label>WHY YOU&apos;RE PERFECT</Label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell us about you and your style — what makes your sessions worth showing up for?"
            rows={4}
            style={{ ...inputStyle, resize: 'none' }}
          />
        </div>

        {/* I TEACH + YEARS ACTIVE */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 10 }}>
          <div>
            <Label>I TEACH</Label>
            <input
              value={teaches}
              onChange={(e) => setTeaches(e.target.value)}
              placeholder="e.g. Vinyasa yoga"
              style={inputStyle}
            />
          </div>
          <div>
            <Label>YEARS ACTIVE</Label>
            <input
              value={yearsActive}
              onChange={(e) => setYearsActive(e.target.value)}
              placeholder="e.g. 4"
              type="number"
              min="0"
              style={inputStyle}
            />
          </div>
        </div>

        {/* WHERE YOU'LL HOST */}
        <div>
          <Label>WHERE YOU&apos;LL HOST</Label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
            {AUCKLAND_HOODS.map((hood) => (
              <ChipButton
                key={hood}
                selected={neighbourhoods.includes(hood)}
                onClick={() => toggleArr(neighbourhoods, setNeighbourhoods, hood)}
                color="#A535C7"
              >{hood}</ChipButton>
            ))}
            {customHood && (
              <ChipButton
                selected={neighbourhoods.includes(customHood)}
                onClick={() => toggleArr(neighbourhoods, setNeighbourhoods, customHood)}
                color="#A535C7"
              >{customHood}</ChipButton>
            )}
            {showHoodInput ? (
              <input
                autoFocus
                value={customHood}
                onChange={(e) => setCustomHood(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && customHood.trim()) {
                    setNeighbourhoods((prev) => [...prev, customHood.trim()]);
                    setCustomHood('');
                    setShowHoodInput(false);
                  }
                  if (e.key === 'Escape') setShowHoodInput(false);
                }}
                onBlur={() => { if (!customHood) setShowHoodInput(false); }}
                placeholder="Type + Enter"
                style={{ ...inputStyle, width: 110, padding: '8px 12px', fontSize: 13 }}
              />
            ) : (
              <ChipButton selected={false} onClick={() => setShowHoodInput(true)} color="#1A1A1A">
                + Add
              </ChipButton>
            )}
          </div>
        </div>

        {/* CREDENTIALS */}
        <div>
          <Label>CREDENTIALS (RECOMMENDED, NOT REQUIRED)</Label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
            {CREDENTIAL_OPTIONS.map((c) => (
              <ChipButton
                key={c}
                selected={credentials.includes(c)}
                onClick={() => toggleArr(credentials, setCredentials, c)}
                color="#7A8330"
              >{c}</ChipButton>
            ))}
          </div>
        </div>

        {/* WHERE MATES FIND YOU */}
        <div>
          <Label>WHERE MATES FIND YOU (ALL OPTIONAL)</Label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
            {SOCIAL_OPTIONS.map((s) => (
              <ChipButton
                key={s}
                selected={socialLinks.includes(s)}
                onClick={() => toggleArr(socialLinks, setSocialLinks, s)}
                color="#2C8FE0"
              >{s}</ChipButton>
            ))}
          </div>
        </div>

        {/* SOCIAL STRETCH */}
        <div style={{ padding: 16, borderRadius: 20, background: '#FFFFFF', border: '1.5px solid rgba(26,26,26,0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
            <div>
              <div style={{ ...MONO, fontSize: 10, fontWeight: 700, letterSpacing: '0.16em' }}>WILL YOU ADD A SOCIAL STRETCH?</div>
              <div style={{ fontSize: 12, color: '#888', marginTop: 4 }}>Coffee, beer, booch after the class.</div>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              <button
                onClick={() => setHasSocialStretch(true)}
                style={{
                  padding: '8px 14px', borderRadius: 9999, border: 'none',
                  background: hasSocialStretch ? '#2C8FE0' : 'rgba(26,26,26,0.08)',
                  color: hasSocialStretch ? '#F5EDE3' : '#1A1A1A',
                  ...BODY, fontWeight: 600, fontSize: 13, cursor: 'pointer',
                }}
              >YES</button>
              <button
                onClick={() => setHasSocialStretch(false)}
                style={{
                  padding: '8px 14px', borderRadius: 9999, border: 'none',
                  background: !hasSocialStretch ? '#1A1A1A' : 'rgba(26,26,26,0.08)',
                  color: !hasSocialStretch ? '#F5EDE3' : '#1A1A1A',
                  ...BODY, fontWeight: 600, fontSize: 13, cursor: 'pointer',
                }}
              >NO</button>
            </div>
          </div>
          {hasSocialStretch && (
            <div style={{ marginTop: 12 }}>
              <Label>VENUE PARTNER</Label>
              <input
                value={socialVenue}
                onChange={(e) => setSocialVenue(e.target.value)}
                placeholder="e.g. Little Bird Café, Grey Lynn"
                style={inputStyle}
              />
            </div>
          )}
        </div>

        {/* HOW OFTEN */}
        <div>
          <Label>HOW OFTEN?</Label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
            {FREQUENCY_OPTIONS.map((f) => (
              <ChipButton
                key={f}
                selected={frequency === f}
                onClick={() => setFrequency(frequency === f ? null : f)}
                color="#2A3FE0"
              >{f}</ChipButton>
            ))}
          </div>
        </div>

        {/* T&C */}
        <button
          onClick={() => setAgreed(!agreed)}
          style={{
            display: 'flex', alignItems: 'flex-start', gap: 10,
            padding: 14, borderRadius: 16, background: '#FFFFFF',
            border: '1.5px solid rgba(26,26,26,0.08)',
            textAlign: 'left', cursor: 'pointer', width: '100%',
          }}
        >
          <div style={{
            width: 22, height: 22, borderRadius: 6, flexShrink: 0, marginTop: 1,
            background: agreed ? '#FFD166' : 'rgba(26,26,26,0.08)',
            color: '#1A1A1A',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 13, fontWeight: 700,
          }}>
            {agreed ? '✓' : ''}
          </div>
          <span style={{ fontSize: 13, lineHeight: 1.4, color: '#1A1A1A' }}>
            I agree to the <strong>Stretchy host terms</strong>. Or — <span style={{ color: '#2C8FE0', fontWeight: 700 }}>chat to Stretchy</span> first.
          </span>
        </button>

        {/* Submit */}
        <button
          onClick={submit}
          disabled={!canSubmit}
          style={{
            padding: '18px 0', borderRadius: 9999, border: 'none',
            background: canSubmit ? '#1A1A1A' : 'rgba(26,26,26,0.25)',
            color: '#F5EDE3',
            ...BODY, fontWeight: 700, fontSize: 16,
            cursor: canSubmit ? 'pointer' : 'not-allowed',
            width: '100%', marginBottom: 8,
          } as React.CSSProperties}
        >
          {loading ? 'Submitting…' : 'Apply · we\'ll vet within 5 days'}
        </button>
      </div>
    </div>
  );
}

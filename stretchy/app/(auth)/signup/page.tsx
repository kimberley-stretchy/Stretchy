'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase';

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
      {[1, 2, 3].map((n) => (
        <div
          key={n}
          style={{
            width: n <= step ? 24 : 8,
            height: 8,
            borderRadius: 9999,
            background: n <= step ? '#1A1A1A' : 'rgba(26,26,26,0.2)',
            transition: 'all 0.25s',
          }}
        />
      ))}
    </div>
  );
}

export default function SignupPage() {
  const router = useRouter();
  const supabase = createClient();

  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [neighbourhoods, setNeighbourhoods] = useState<string[]>([]);
  const [movements, setMovements] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const toggleNeighbourhood = (n: string) =>
    setNeighbourhoods((prev) => prev.includes(n) ? prev.filter((x) => x !== n) : [...prev, n]);

  const toggleMovement = (m: string) =>
    setMovements((prev) => prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]);

  const signUpWithGoogle = async () => {
    setLoading(true);
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin + '/auth/callback?onboarding=1' },
    });
  };

  const handleContinueStep1 = () => {
    if (!name.trim() || !email.trim()) return;
    setStep(2);
  };

  const handleContinueStep2 = () => {
    setStep(3);
  };

  const inputStyle: React.CSSProperties = {
    background: 'rgba(255,255,255,0.55)',
    color: '#1A1A1A',
    border: '1.5px solid rgba(26,26,26,0.18)',
    borderRadius: 16,
    padding: '14px 16px',
    fontFamily: "'Space Grotesk', system-ui, sans-serif",
    fontSize: 15,
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: '0.16em',
    color: 'rgba(26,26,26,0.6)',
    marginBottom: 6,
    display: 'block',
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

  const outer: React.CSSProperties = {
    minHeight: '100dvh',
    background: '#F5EDE3',
    color: '#1A1A1A',
    fontFamily: "'Space Grotesk', system-ui, sans-serif",
    paddingBottom: 60,
    position: 'relative',
  };

  const eyebrow: React.CSSProperties = {
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

  if (step === 1) {
    return (
      <div style={outer}>
        <div style={{ display: 'flex', alignItems: 'center', padding: '54px 22px 0' }}>
          <button
            onClick={() => router.back()}
            style={{
              width: 40, height: 40, borderRadius: 999, border: 'none',
              background: 'rgba(26,26,26,0.08)', color: '#1A1A1A', fontSize: 16,
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >←</button>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <StepDots step={step} />
          </div>
          <div style={{ width: 40 }} />
        </div>

        <div style={{ padding: '28px 24px 0' }}>
          <p style={eyebrow}>STEP 1 OF 3 · YOU</p>
          <h1 style={h1Style}>What should we call you?</h1>
        </div>

        <div style={{ padding: '28px 14px 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button
            onClick={signUpWithGoogle}
            disabled={loading}
            style={{
              width: '100%', height: 56, borderRadius: 9999, border: 'none',
              background: '#1A1A1A', color: '#F5EDE3',
              fontFamily: "'Space Grotesk', system-ui, sans-serif",
              fontWeight: 700, fontSize: 15,
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
            }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
              <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
              <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
              <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
            </svg>
            Sign up with Google
          </button>
        </div>

        <div style={{
          display: 'flex', alignItems: 'center', gap: 14, margin: '20px 24px',
          fontFamily: "'JetBrains Mono', monospace", fontSize: 11, opacity: 0.5, letterSpacing: '0.14em',
        }}>
          <div style={{ flex: 1, height: 1, background: '#1A1A1A', opacity: 0.3 }} />
          <span>OR</span>
          <div style={{ flex: 1, height: 1, background: '#1A1A1A', opacity: 0.3 }} />
        </div>

        <div style={{ padding: '0 14px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div>
            <label style={labelStyle}>YOUR NAME</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Alex Smith"
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>EMAIL</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleContinueStep1()}
              placeholder="you@email.co.nz"
              style={inputStyle}
            />
          </div>
          <button
            onClick={handleContinueStep1}
            disabled={!name.trim() || !email.trim()}
            style={{
              ...primaryBtn,
              opacity: !name.trim() || !email.trim() ? 0.4 : 1,
              cursor: !name.trim() || !email.trim() ? 'not-allowed' : 'pointer',
            }}
          >
            Continue →
          </button>
          <p style={{ margin: '4px 0 0', fontSize: 12, opacity: 0.55, textAlign: 'center', lineHeight: 1.4 }}>
            By continuing you agree to the Stretchy terms.
          </p>
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div style={outer}>
        <div style={{ display: 'flex', alignItems: 'center', padding: '54px 22px 0' }}>
          <button
            onClick={() => setStep(1)}
            style={{
              width: 40, height: 40, borderRadius: 999, border: 'none',
              background: 'rgba(26,26,26,0.08)', color: '#1A1A1A', fontSize: 16,
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >←</button>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <StepDots step={step} />
          </div>
          <button
            onClick={handleContinueStep2}
            style={{
              border: 'none', background: 'transparent', color: '#1A1A1A',
              fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700,
              letterSpacing: '0.12em', cursor: 'pointer', opacity: 0.55,
            }}
          >
            SKIP
          </button>
        </div>

        <div style={{ padding: '28px 24px 0' }}>
          <p style={eyebrow}>STEP 2 OF 3 · WHERE &amp; WHAT</p>
          <h1 style={h1Style}>Tune your weekly drop.</h1>
          <p style={{ margin: '12px 0 0', fontSize: 15, opacity: 0.7, lineHeight: 1.4 }}>
            We&apos;ll only show what&apos;s in your suburbs and the formats you love.
          </p>
        </div>

        <div style={{ padding: '28px 24px 0' }}>
          <label style={labelStyle}>NEIGHBOURHOOD</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
            {NEIGHBOURHOODS.map((n) => {
              const selected = neighbourhoods.includes(n);
              return (
                <button
                  key={n}
                  onClick={() => toggleNeighbourhood(n)}
                  style={{
                    padding: '10px 16px', borderRadius: 9999,
                    border: `1.5px solid ${selected ? '#2C8FE0' : 'rgba(26,26,26,0.18)'}`,
                    background: selected ? '#2C8FE0' : 'transparent',
                    color: selected ? '#F5EDE3' : '#1A1A1A',
                    fontFamily: "'Space Grotesk', system-ui, sans-serif",
                    fontSize: 13, fontWeight: 600, cursor: 'pointer',
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
          <label style={labelStyle}>MOVEMENT TYPE</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
            {MOVEMENT_TYPES.map((m) => {
              const selected = movements.includes(m.id);
              return (
                <button
                  key={m.id}
                  onClick={() => toggleMovement(m.id)}
                  style={{
                    padding: '10px 16px', borderRadius: 9999,
                    border: `1.5px solid ${selected ? m.color : 'rgba(26,26,26,0.18)'}`,
                    background: selected ? m.color : 'transparent',
                    color: selected ? '#F5EDE3' : '#1A1A1A',
                    fontFamily: "'Space Grotesk', system-ui, sans-serif",
                    fontSize: 13, fontWeight: 600, cursor: 'pointer',
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
          <button onClick={handleContinueStep2} style={primaryBtn}>
            Continue → payment
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={outer}>
      <div style={{ display: 'flex', alignItems: 'center', padding: '54px 22px 0' }}>
        <button
          onClick={() => setStep(2)}
          style={{
            width: 40, height: 40, borderRadius: 999, border: 'none',
            background: 'rgba(26,26,26,0.08)', color: '#1A1A1A', fontSize: 16,
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >←</button>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <StepDots step={step} />
        </div>
        <div style={{ width: 40 }} />
      </div>

      <div style={{ padding: '28px 24px 0' }}>
        <p style={eyebrow}>STEP 3 OF 3 · PAYMENT</p>
        <h1 style={h1Style}>Save your card.</h1>
      </div>

      <div style={{ padding: '28px 14px 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{
          background: '#FFFFFF',
          borderRadius: 24,
          padding: 24,
          border: '1.5px solid rgba(26,26,26,0.08)',
        }}>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: '#1A1A1A', opacity: 0.8 }}>
            Your card is saved securely via Stripe. You&apos;re never charged until a session is confirmed — and only at the final, lowest price.
          </p>
        </div>

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
          You&apos;ll need a saved card to hold a spot.
        </p>
      </div>
    </div>
  );
}

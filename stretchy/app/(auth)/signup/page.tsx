'use client';

import { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase';

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
            background: n === step ? '#F5EDE3' : 'rgba(245,237,227,0.2)',
            transition: 'all 0.25s',
          }}
        />
      ))}
    </div>
  );
}

export default function SignupPage() {
  const supabase = createClient();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const signUpWithGoogle = async () => {
    setLoading(true);
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + '/auth/callback?next=/onboarding',
      },
    });
  };

  const sendMagicLink = async () => {
    if (!email.trim()) return;
    setLoading(true);
    await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        emailRedirectTo: window.location.origin + '/auth/callback?next=/onboarding',
      },
    });
    setLoading(false);
    setSent(true);
  };

  const outer: React.CSSProperties = {
    minHeight: '100dvh',
    background: '#7A8330',
    color: '#F5EDE3',
    fontFamily: "'Space Grotesk', system-ui, sans-serif",
    paddingBottom: 60,
    position: 'relative',
  };

  return (
    <div style={outer}>
      {/* Top bar */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '54px 22px 0' }}>
        <Link
          href="/welcome"
          style={{
            width: 40,
            height: 40,
            borderRadius: 999,
            background: 'rgba(255,255,255,0.15)',
            color: '#F5EDE3',
            fontSize: 16,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textDecoration: 'none',
          }}
        >
          ←
        </Link>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <StepDots step={1} />
        </div>
        <div style={{ width: 40 }} />
      </div>

      {/* Heading */}
      <div style={{ padding: '28px 24px 0' }}>
        <p
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.20em',
            color: 'rgba(245,237,227,0.7)',
            margin: 0,
          }}
        >
          STEP 1 OF 4 · YOU
        </p>
        <h1
          style={{
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
            fontWeight: 700,
            fontSize: 44,
            lineHeight: 0.95,
            letterSpacing: '-0.02em',
            margin: '10px 0 0',
            color: '#F5EDE3',
          }}
        >
          What should we call you?
        </h1>
        <p style={{ margin: '10px 0 0', fontSize: 14, color: 'rgba(245,237,227,0.7)', lineHeight: 1.4 }}>
          We&apos;ll only share your first name with hosts.
        </p>
      </div>

      {/* Google sign up */}
      <div style={{ padding: '28px 14px 0' }}>
        <button
          onClick={signUpWithGoogle}
          disabled={loading}
          style={{
            width: '100%',
            height: 56,
            borderRadius: 9999,
            border: '1.5px solid rgba(255,255,255,0.3)',
            background: 'rgba(255,255,255,0.15)',
            color: '#F5EDE3',
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
            fontWeight: 700,
            fontSize: 15,
            cursor: loading ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
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

      {/* OR divider */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          margin: '20px 24px',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          opacity: 0.5,
          letterSpacing: '0.14em',
          color: '#F5EDE3',
        }}
      >
        <div style={{ flex: 1, height: 1, background: '#F5EDE3', opacity: 0.4 }} />
        <span>OR</span>
        <div style={{ flex: 1, height: 1, background: '#F5EDE3', opacity: 0.4 }} />
      </div>

      {/* Email form or sent state */}
      {sent ? (
        <div style={{ padding: '0 14px' }}>
          <div
            style={{
              background: 'rgba(255,255,255,0.12)',
              borderRadius: 24,
              padding: 28,
              border: '1.5px solid rgba(255,255,255,0.2)',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: 48, marginBottom: 16 }}>✓</div>
            <p
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 13,
                color: '#F5EDE3',
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              Magic link sent to <strong>{email}</strong>. Check your inbox — tap the link and you&apos;re in.
            </p>
          </div>
        </div>
      ) : (
        <div style={{ padding: '0 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMagicLink()}
            placeholder="you@email.co.nz"
            style={{
              background: 'rgba(255,255,255,0.12)',
              color: '#F5EDE3',
              border: '1.5px solid rgba(255,255,255,0.3)',
              borderRadius: 16,
              padding: '14px 16px',
              fontFamily: "'Space Grotesk', system-ui, sans-serif",
              fontSize: 15,
              outline: 'none',
              width: '100%',
              boxSizing: 'border-box',
            }}
          />
          <button
            onClick={sendMagicLink}
            disabled={loading || !email.trim()}
            style={{
              width: '100%',
              padding: '18px 24px',
              borderRadius: 9999,
              border: 'none',
              background: '#F5EDE3',
              color: '#1A1A1A',
              fontFamily: "'Space Grotesk', system-ui, sans-serif",
              fontWeight: 700,
              fontSize: 15,
              cursor: loading || !email.trim() ? 'not-allowed' : 'pointer',
              opacity: !email.trim() ? 0.5 : 1,
            }}
          >
            Send magic link →
          </button>
        </div>
      )}
    </div>
  );
}

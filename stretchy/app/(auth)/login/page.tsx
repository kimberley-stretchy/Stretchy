'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase';
import { SMark } from '@/components/ui/SMark';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [tab, setTab] = useState<'mover' | 'host'>('mover');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const bg = tab === 'mover' ? '#FFD166' : '#A535C7';
  const fg = tab === 'mover' ? '#1A1A1A' : '#F5EDE3';
  const inputBg = tab === 'mover' ? '#FFFFFF' : 'rgba(245,237,227,0.15)';
  const inputBorder = tab === 'mover' ? 'rgba(26,26,26,0.16)' : 'rgba(245,237,227,0.25)';

  const signInWithGoogle = async () => {
    setLoading(true);
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `https://stretchy.social/auth/callback` },
    });
  };

  const signInWithEmail = async () => {
    if (!email.trim()) return;
    setLoading(true);
    await supabase.auth.signInWithOtp({
      email: email.trim().toLowerCase(),
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });
    setLoading(false);
    setSent(true);
  };

  return (
    <div
      style={{
        minHeight: '100dvh',
        background: bg,
        color: fg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        transition: 'background 0.3s',
      }}
    >
      <div style={{ width: '100%', maxWidth: 400 }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <SMark size={48} color={fg} style={{ marginBottom: 16 }} />
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.2em',
              opacity: 0.6,
            }}
          >
            STRETCHY
          </div>
        </div>

        <div
          style={{
            background: tab === 'mover' ? '#FFFFFF' : 'rgba(245,237,227,0.1)',
            borderRadius: 28,
            padding: 32,
            border: tab === 'host' ? '1px solid rgba(245,237,227,0.2)' : 'none',
          }}
        >
          <div
            style={{
              display: 'flex',
              background: tab === 'mover' ? 'rgba(26,26,26,0.06)' : 'rgba(245,237,227,0.1)',
              borderRadius: 14,
              padding: 4,
              marginBottom: 28,
            }}
          >
            {(['mover', 'host'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                style={{
                  flex: 1,
                  padding: '10px 0',
                  borderRadius: 11,
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: "'Space Grotesk', system-ui, sans-serif",
                  fontWeight: 700,
                  fontSize: 14,
                  background: tab === t ? (t === 'mover' ? '#1A1A1A' : '#F5EDE3') : 'transparent',
                  color: tab === t ? (t === 'mover' ? '#F5EDE3' : '#1A1A1A') : (tab === 'mover' ? '#1A1A1A' : '#F5EDE3'),
                  opacity: tab === t ? 1 : 0.5,
                  transition: 'all 0.2s',
                }}
              >
                {t === 'mover' ? 'I want to move' : 'I want to host'}
              </button>
            ))}
          </div>

          <h2
            style={{
              fontFamily: "'Space Grotesk', system-ui, sans-serif",
              fontWeight: 700,
              fontSize: 24,
              letterSpacing: '-0.02em',
              margin: '0 0 24px',
              color: tab === 'mover' ? '#1A1A1A' : '#F5EDE3',
            }}
          >
            {sent ? 'Check your email' : 'Log in or sign up'}
          </h2>

          {sent ? (
            <p style={{ color: tab === 'mover' ? '#444' : 'rgba(245,237,227,0.8)', fontSize: 15, lineHeight: 1.5, margin: 0 }}>
              We sent a magic link to <strong>{email}</strong>. Click it to continue.
            </p>
          ) : (
            <>
              <button
                onClick={signInWithGoogle}
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '14px 20px',
                  borderRadius: 14,
                  border: `1.5px solid ${inputBorder}`,
                  background: inputBg,
                  color: tab === 'mover' ? '#1A1A1A' : '#F5EDE3',
                  fontFamily: "'Space Grotesk', system-ui, sans-serif",
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 10,
                  marginBottom: 16,
                }}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
                  <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
                  <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
                  <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </button>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  marginBottom: 16,
                  opacity: 0.4,
                }}
              >
                <div style={{ flex: 1, height: 1, background: tab === 'mover' ? '#1A1A1A' : '#F5EDE3' }} />
                <span style={{ fontSize: 12, fontFamily: "'JetBrains Mono', monospace", color: tab === 'mover' ? '#1A1A1A' : '#F5EDE3' }}>OR</span>
                <div style={{ flex: 1, height: 1, background: tab === 'mover' ? '#1A1A1A' : '#F5EDE3' }} />
              </div>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && signInWithEmail()}
                placeholder="your@email.co.nz"
                style={{
                  width: '100%',
                  padding: '14px 18px',
                  borderRadius: 14,
                  border: `1.5px solid ${inputBorder}`,
                  background: inputBg,
                  color: tab === 'mover' ? '#1A1A1A' : '#F5EDE3',
                  fontFamily: "'Space Grotesk', system-ui, sans-serif",
                  fontSize: 15,
                  outline: 'none',
                  boxSizing: 'border-box',
                  marginBottom: 12,
                }}
              />

              <button
                onClick={signInWithEmail}
                disabled={loading || !email.trim()}
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  borderRadius: 9999,
                  border: 'none',
                  background: tab === 'mover' ? '#1A1A1A' : '#F5EDE3',
                  color: tab === 'mover' ? '#F5EDE3' : '#1A1A1A',
                  fontFamily: "'Space Grotesk', system-ui, sans-serif",
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: loading || !email.trim() ? 'not-allowed' : 'pointer',
                  opacity: !email.trim() ? 0.4 : 1,
                }}
              >
                {loading ? 'Sending…' : 'Send magic link →'}
              </button>
            </>
          )}
        </div>

        <p
          style={{
            textAlign: 'center',
            marginTop: 20,
            fontSize: 13,
            opacity: 0.6,
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
            color: fg,
          }}
        >
          By continuing you agree to our terms & privacy policy
        </p>
      </div>
    </div>
  );
}

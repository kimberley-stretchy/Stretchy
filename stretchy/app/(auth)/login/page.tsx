'use client';

import { useState } from 'react';
import { Suspense } from 'react';
import { createClient } from '@/lib/supabase';
import { useRouter, useSearchParams } from 'next/navigation';

function LoginForm() {
  const [tab, setTab] = useState<'mover' | 'host'>('mover');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const errorMsg = searchParams.get('error');
  const supabase = createClient();

  const isHost = tab === 'host';
  const bg = isHost ? '#A535C7' : '#FFD166';
  const fg = isHost ? '#F5EDE3' : '#1A1A1A';
  const cardBg = isHost ? 'rgba(245,237,227,0.10)' : 'rgba(26,26,26,0.08)';
  const inputBg = isHost ? 'rgba(245,237,227,0.12)' : 'rgba(255,255,255,0.55)';
  const inputBorder = isHost ? 'rgba(245,237,227,0.30)' : 'rgba(26,26,26,0.18)';
  const tabActiveBg = isHost ? '#F5EDE3' : '#1A1A1A';
  const tabActiveFg = isHost ? '#1A1A1A' : '#F5EDE3';

  const next = isHost ? '/host' : '/home';

  const signInWithGoogle = async () => {
    setLoading(true);
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback?next=${next}` },
    });
  };

  const signInWithEmail = async () => {
    if (!email.trim()) return;
    setLoading(true);
    await supabase.auth.signInWithOtp({
      email: email.trim().toLowerCase(),
      options: { emailRedirectTo: `${window.location.origin}/auth/callback?next=${next}` },
    });
    setLoading(false);
    setSent(true);
  };

  return (
    <div style={{
      minHeight: '100dvh', background: bg, color: fg,
      fontFamily: "'Space Grotesk', system-ui, sans-serif",
      paddingBottom: 80, position: 'relative', overflow: 'hidden',
      transition: 'background 0.3s',
    }}>
      {/* Top bar — no S here, the bold color wash IS the brand */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '54px 22px 0' }}>
        <button
          onClick={() => router.push('/')}
          style={{
            width: 40, height: 40, borderRadius: 999, border: 'none',
            background: cardBg, color: fg, fontSize: 16, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >←</button>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', opacity: 0.7 }}>
            LOG IN
          </span>
        </div>
        <div style={{ width: 40 }} />
      </div>

      {/* Role tabs */}
      <div style={{ padding: '16px 14px 0' }}>
        <div style={{
          display: 'flex', padding: 4, borderRadius: 999, background: cardBg,
          border: `1.5px solid ${inputBorder}`, gap: 4,
        }}>
          {(['mover', 'host'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                flex: 1, padding: '12px 16px', borderRadius: 999, border: 'none',
                background: tab === t ? tabActiveBg : 'transparent',
                color: tab === t ? tabActiveFg : fg,
                fontFamily: "'Space Grotesk', system-ui, sans-serif",
                fontSize: 13, fontWeight: 700, letterSpacing: '0.04em',
                cursor: 'pointer', opacity: tab === t ? 1 : 0.75,
                transition: 'all 0.2s',
              }}
            >
              {t === 'mover' ? "I'M HERE TO MOVE" : "I'M HOSTING"}
            </button>
          ))}
        </div>
        <p style={{ margin: '10px 8px 0', fontSize: 11, opacity: 0.65, textAlign: 'center', lineHeight: 1.4 }}>
          Some people are both. Either log-in unlocks the same account.
        </p>
        <p style={{ margin: '8px 8px 0', fontSize: 12, opacity: 0.7, textAlign: 'center', lineHeight: 1.4 }}>
          New here?{' '}
          <a
            href="/signup"
            style={{
              color: fg,
              fontWeight: 700,
              textDecoration: 'underline',
              textUnderlineOffset: 3,
            }}
          >
            Sign up →
          </a>
        </p>
      </div>

      {/* Hero */}
      <div style={{ padding: '28px 24px 0' }}>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.20em', opacity: 0.7, margin: 0 }}>
          WELCOME BACK
        </p>
        <h1 style={{
          fontFamily: "'Space Grotesk', system-ui, sans-serif",
          fontWeight: 700, fontSize: 52, lineHeight: 0.95,
          letterSpacing: '-0.02em', margin: '10px 0 0',
          whiteSpace: 'pre-line',
        }}>
          {isHost ? 'Run your\nroom.' : 'Hold your\nplace.'}
        </h1>
        <p style={{ margin: '12px 0 0', fontSize: 15, opacity: 0.8, maxWidth: 320, lineHeight: 1.4 }}>
          {isHost ? 'Your roster, your target, your payouts.' : 'Your sessions, your mates, your price.'}
        </p>
      </div>

      {/* Error */}
      {errorMsg && (
        <div style={{ margin: '20px 14px 0', padding: '12px 16px', borderRadius: 16, background: 'rgba(230,57,70,0.15)', border: '1.5px solid rgba(230,57,70,0.4)' }}>
          <span style={{ fontSize: 13, fontWeight: 600 }}>⚠ {decodeURIComponent(errorMsg)}</span>
        </div>
      )}

      {/* Social auth */}
      <div style={{ padding: '24px 14px 0', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <button
          onClick={signInWithGoogle}
          disabled={loading}
          style={{
            width: '100%', height: 56, padding: '0 24px', borderRadius: 9999,
            border: 'none', background: '#1A1A1A', color: '#F5EDE3',
            fontFamily: "'Space Grotesk', system-ui, sans-serif", fontWeight: 700, fontSize: 15,
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
          Continue with Google
        </button>
      </div>

      {/* Divider */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 14, margin: '20px 24px',
        fontFamily: "'JetBrains Mono', monospace", fontSize: 11, opacity: 0.5, letterSpacing: '0.14em',
      }}>
        <div style={{ flex: 1, height: 1, background: fg, opacity: 0.4 }} />
        <span>OR EMAIL</span>
        <div style={{ flex: 1, height: 1, background: fg, opacity: 0.4 }} />
      </div>

      {/* Email form */}
      {sent ? (
        <div style={{ padding: '0 14px' }}>
          <div style={{
            background: cardBg, borderRadius: 24, padding: 24,
            border: `1.5px solid ${inputBorder}`,
          }}>
            <div style={{ fontSize: 28, marginBottom: 12 }}>📬</div>
            <h3 style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontWeight: 700, fontSize: 20, margin: '0 0 8px' }}>
              Check your email
            </h3>
            <p style={{ margin: 0, fontSize: 14, opacity: 0.8, lineHeight: 1.5 }}>
              We sent a magic link to <strong>{email}</strong>. Tap the link to continue.
            </p>
          </div>
        </div>
      ) : (
        <div style={{ padding: '0 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', opacity: 0.7 }}>EMAIL</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && signInWithEmail()}
              placeholder="you@email.co.nz"
              style={{
                background: inputBg, color: fg,
                border: `1.5px solid ${inputBorder}`,
                borderRadius: 16, padding: '14px 16px',
                fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: 15,
                outline: 'none', width: '100%', boxSizing: 'border-box',
              }}
            />
          </div>
          <button
            onClick={signInWithEmail}
            disabled={loading || !email.trim()}
            style={{
              width: '100%', padding: '18px 24px', borderRadius: 9999,
              border: 'none', background: isHost ? '#F5EDE3' : '#1A1A1A',
              color: isHost ? '#1A1A1A' : '#F5EDE3',
              fontFamily: "'Space Grotesk', system-ui, sans-serif",
              fontWeight: 700, fontSize: 15, cursor: loading || !email.trim() ? 'not-allowed' : 'pointer',
              opacity: !email.trim() ? 0.4 : 1,
            }}
          >
            {loading ? 'Sending…' : 'Send magic link →'}
          </button>
          <p style={{ margin: '4px 0 0', fontSize: 12, opacity: 0.65, textAlign: 'center', lineHeight: 1.4 }}>
            No password to remember. Tap the link — you're in.
          </p>
        </div>
      )}

      {/* Apply to host */}
      {isHost && !sent && (
        <div style={{ margin: '20px 14px 0', padding: 16, borderRadius: 20, background: '#F5EDE3', color: '#1A1A1A', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
          onClick={() => router.push('/host/apply')}
        >
          <div style={{ fontSize: 13 }}>Not vetted yet? <strong>Apply to host →</strong></div>
          <span style={{ fontSize: 18 }}>→</span>
        </div>
      )}
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}

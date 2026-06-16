'use client';

import { useState } from 'react';
import { SMark } from '@/components/ui/SMark';

export function Waitlist() {
  const [role, setRole] = useState<'move' | 'host' | 'both'>('move');
  const [email, setEmail] = useState('');
  const [suburb, setSuburb] = useState('');
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!email.trim()) return;
    setLoading(true);
    try {
      await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role, email, suburb }),
      });
    } catch {}
    setLoading(false);
    setDone(true);
  };

  return (
    <div id="waitlist" style={{ background: '#FFD166', color: '#1A1A1A' }}>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '96px 24px', textAlign: 'center' }}>
        <SMark size={72} color="#1A1A1A" style={{ marginBottom: 22 }} />
        <div style={eyebrow}>
          <span style={{ width: 22, height: 2, background: '#1A1A1A', display: 'inline-block' }} />
          GET EARLY ACCESS
        </div>
        <h2
          style={{
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(38px, 6vw, 64px)',
            lineHeight: 0.95,
            letterSpacing: '-0.03em',
            margin: '0 auto 18px',
          }}
        >
          Move together. Pay less.<br />Better value exchange for all.
        </h2>
        <p style={{ margin: '0 auto 40px', fontSize: 18, lineHeight: 1.5, maxWidth: 540 }}>
          Auckland goes live Q3 2026 — more cities coming. Tell us where you are and you'll be first to know when Stretchy heads your way. The highlight of your week, every week.
        </p>

        {done ? (
          <div style={{ background: '#1A1A1A', color: '#F5EDE3', borderRadius: 28, padding: 40 }}>
            <SMark size={64} color="#FFD166" style={{ marginBottom: 18 }} />
            <h3
              style={{
                fontFamily: "'Space Grotesk', system-ui, sans-serif",
                fontWeight: 700,
                fontSize: 28,
                margin: '0 0 10px',
                letterSpacing: '-0.02em',
              }}
            >
              You're on the list.
            </h3>
            <p style={{ margin: 0, fontSize: 16, opacity: 0.85, lineHeight: 1.5 }}>
              We'll be in touch as {role === 'host' ? 'a host' : role === 'both' ? 'a host & mover' : 'a mover'}
              {suburb ? ` in ${suburb}` : ''}. Tell a mate — the more who join, the better it gets.
            </p>
          </div>
        ) : (
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: 28,
              padding: 32,
              textAlign: 'left',
              boxShadow: '0 30px 60px rgba(26,26,26,0.10)',
            }}
          >
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.16em',
                color: '#666',
                marginBottom: 12,
              }}
            >
              I WANT TO
            </div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 22 }}>
              {([['move', 'Move 🧘'], ['host', 'Host 🎯'], ['both', 'Both 🤙']] as const).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setRole(key)}
                  style={{
                    flex: 1,
                    padding: 14,
                    borderRadius: 16,
                    cursor: 'pointer',
                    border: role === key ? 'none' : '1.5px solid rgba(26,26,26,0.16)',
                    background: role === key ? '#1A1A1A' : 'transparent',
                    color: role === key ? '#F5EDE3' : '#1A1A1A',
                    fontFamily: "'Space Grotesk', system-ui, sans-serif",
                    fontSize: 15,
                    fontWeight: 700,
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.co.nz"
                type="email"
                style={inputStyle}
              />
              <input
                value={suburb}
                onChange={(e) => setSuburb(e.target.value)}
                placeholder="Your suburb or city"
                style={inputStyle}
              />
              <button
                onClick={submit}
                disabled={loading}
                style={{
                  width: '100%',
                  marginTop: 6,
                  background: '#1A1A1A',
                  color: '#F5EDE3',
                  border: 'none',
                  borderRadius: 9999,
                  padding: '18px 24px',
                  fontFamily: "'Space Grotesk', system-ui, sans-serif",
                  fontSize: 16,
                  fontWeight: 600,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.7 : 1,
                }}
              >
                {loading ? 'Adding you…' : 'Put me on the list →'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const eyebrow: React.CSSProperties = {
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: '0.22em',
  textTransform: 'uppercase',
  color: '#1A1A1A',
  marginBottom: 18,
  display: 'inline-flex',
  alignItems: 'center',
  gap: 10,
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '15px 18px',
  borderRadius: 14,
  border: '1.5px solid rgba(26,26,26,0.16)',
  background: '#FFF8F4',
  fontFamily: "'Space Grotesk', system-ui, sans-serif",
  fontSize: 16,
  color: '#1A1A1A',
  outline: 'none',
  boxSizing: 'border-box',
};

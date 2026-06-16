'use client';

import { useState } from 'react';
import { SMark } from '@/components/ui/SMark';
import { MOVEMENT_TYPES } from '@/lib/brand';

export default function ApplyPage() {
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    specialty: '',
    bio: '',
    instagram: '',
  });
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async () => {
    if (!form.full_name || !form.email) return;
    setLoading(true);
    await fetch('/api/host/apply', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setLoading(false);
    setDone(true);
  };

  if (done) {
    return (
      <div
        style={{
          minHeight: '100dvh',
          background: '#A535C7',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 24,
        }}
      >
        <div style={{ textAlign: 'center', maxWidth: 400 }}>
          <SMark size={64} color="#F5EDE3" style={{ marginBottom: 24 }} />
          <h2
            style={{
              fontFamily: "'Space Grotesk', system-ui, sans-serif",
              fontWeight: 700,
              fontSize: 28,
              color: '#F5EDE3',
              letterSpacing: '-0.02em',
              margin: '0 0 12px',
            }}
          >
            Application sent 🎯
          </h2>
          <p style={{ color: 'rgba(245,237,227,0.8)', fontSize: 16, lineHeight: 1.5, margin: 0 }}>
            We'll review your application and be in touch within a few days.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: '#F5EDE3', minHeight: '100dvh' }}>
      <div style={{ maxWidth: 520, margin: '0 auto', padding: '56px 24px' }}>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.2em',
            color: '#A535C7',
            marginBottom: 8,
          }}
        >
          APPLY TO HOST
        </div>
        <h1
          style={{
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(28px, 5vw, 40px)',
            letterSpacing: '-0.025em',
            color: '#1A1A1A',
            margin: '0 0 8px',
            lineHeight: 1.05,
          }}
        >
          Set your target.<br />We handle the rest.
        </h1>
        <p style={{ color: '#666', fontSize: 16, lineHeight: 1.5, margin: '0 0 32px' }}>
          Tell us a bit about you and what you teach. Vetted hosts can run as many sessions as they like.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <input
            value={form.full_name}
            onChange={(e) => update('full_name', e.target.value)}
            placeholder="Full name"
            style={inputStyle}
          />
          <input
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            placeholder="Email"
            type="email"
            style={inputStyle}
          />
          <select
            value={form.specialty}
            onChange={(e) => update('specialty', e.target.value)}
            style={{ ...inputStyle, color: form.specialty ? '#1A1A1A' : '#999' }}
          >
            <option value="" disabled>What do you teach?</option>
            {MOVEMENT_TYPES.map((m) => (
              <option key={m.id} value={m.id}>{m.emoji} {m.label}</option>
            ))}
          </select>
          <textarea
            value={form.bio}
            onChange={(e) => update('bio', e.target.value)}
            placeholder="Tell us about yourself and your style..."
            rows={4}
            style={{ ...inputStyle, resize: 'vertical' }}
          />
          <input
            value={form.instagram}
            onChange={(e) => update('instagram', e.target.value)}
            placeholder="Instagram handle (optional)"
            style={inputStyle}
          />
          <button
            onClick={submit}
            disabled={loading || !form.full_name || !form.email}
            style={{
              padding: '18px 0',
              borderRadius: 9999,
              border: 'none',
              background: '#A535C7',
              color: '#F5EDE3',
              fontFamily: "'Space Grotesk', system-ui, sans-serif",
              fontWeight: 700,
              fontSize: 16,
              cursor: loading || !form.full_name || !form.email ? 'not-allowed' : 'pointer',
              opacity: !form.full_name || !form.email ? 0.5 : 1,
              marginTop: 8,
            }}
          >
            {loading ? 'Submitting…' : 'Apply to host →'}
          </button>
        </div>
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '15px 18px',
  borderRadius: 14,
  border: '1.5px solid rgba(26,26,26,0.16)',
  background: '#FFFFFF',
  fontFamily: "'Space Grotesk', system-ui, sans-serif",
  fontSize: 15,
  color: '#1A1A1A',
  outline: 'none',
  boxSizing: 'border-box',
};

'use client';

import { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { SMark } from '@/components/ui/SMark';

const VIBES = ['Great energy', 'Welcoming space', 'Perfect pace', 'Loved the music', 'Amazing instructor', 'Would return', 'Challenging', 'Chill vibes', 'Small group', 'Social stretch was 🔥'];

function RateForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get('sessionId');

  const [stars, setStars] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [vibes, setVibes] = useState<string[]>([]);
  const [note, setNote] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleVibe = (v: string) => setVibes((prev) => prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]);

  const submit = async () => {
    if (stars === 0) return;
    setLoading(true);
    // Store rating — API endpoint to be wired when ratings table exists
    await fetch('/api/ratings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, stars, vibes, note }),
    }).catch(() => {});
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div style={{ background: '#7A8330', minHeight: '100dvh', color: '#F5EDE3', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 32, fontFamily: "'Space Grotesk', system-ui, sans-serif", textAlign: 'center' }}>
        <SMark size={80} color="#F5EDE3" style={{ marginBottom: 24 }} />
        <h1 style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontWeight: 700, fontSize: 52, lineHeight: 0.92, letterSpacing: '-0.03em', margin: '0 0 16px' }}>
          Thanks{stars === 5 ? '!' : '.'}
        </h1>
        <p style={{ fontSize: 16, opacity: 0.85, lineHeight: 1.4, maxWidth: 280, margin: '0 0 40px' }}>
          {stars >= 4 ? 'Glad you loved it. See you at the next one.' : 'Feedback helps hosts improve. See you next time.'}
        </p>
        <button onClick={() => router.push('/home')} style={{ background: '#F5EDE3', color: '#1A1A1A', borderRadius: 9999, padding: '18px 36px', border: 'none', fontFamily: "'Space Grotesk', system-ui, sans-serif", fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>
          Back to home →
        </button>
      </div>
    );
  }

  return (
    <div style={{ background: '#F5EDE3', minHeight: '100dvh', fontFamily: "'Space Grotesk', system-ui, sans-serif", paddingBottom: 120 }}>
      {/* Top bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '54px 22px 0' }}>
        <button onClick={() => router.back()} style={{ width: 40, height: 40, borderRadius: 999, border: 'none', background: 'rgba(26,26,26,0.08)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, color: '#1A1A1A' }}>←</button>
        <div style={{ padding: '7px 14px', borderRadius: 999, background: '#FFFFFF', border: '1.5px solid rgba(26,26,26,0.10)', fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, letterSpacing: '0.14em' }}>
          RATE IT
        </div>
        <div style={{ width: 40 }} />
      </div>

      {/* Hero */}
      <div style={{ padding: '20px 22px 28px' }}>
        <h1 style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontWeight: 700, fontSize: 52, lineHeight: 0.92, letterSpacing: '-0.03em', margin: 0, color: '#1A1A1A' }}>
          How was<br />it?
        </h1>
      </div>

      {/* Stars */}
      <div style={{ margin: '0 14px', padding: 24, borderRadius: 28, background: '#FFFFFF', border: '1.5px solid rgba(26,26,26,0.08)' }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', color: 'rgba(26,26,26,0.55)', marginBottom: 16 }}>
          YOUR RATING
        </div>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              onMouseEnter={() => setHovered(n)}
              onMouseLeave={() => setHovered(0)}
              onClick={() => setStars(n)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
            >
              <SMark
                size={44}
                color={(hovered || stars) >= n ? '#FFD166' : 'rgba(26,26,26,0.15)'}
              />
            </button>
          ))}
        </div>
        {stars > 0 && (
          <p style={{ margin: '14px 0 0', textAlign: 'center', fontSize: 15, fontWeight: 600, color: '#1A1A1A' }}>
            {['', 'Needs work', 'Okay', 'Good', 'Great', 'Loved it!'][stars]}
          </p>
        )}
      </div>

      {/* Vibe chips */}
      <div style={{ padding: '24px 22px 8px' }}>
        <h3 style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontWeight: 700, fontSize: 20, margin: 0 }}>What stood out?</h3>
      </div>
      <div style={{ padding: '8px 14px 0', display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {VIBES.map((v) => {
          const sel = vibes.includes(v);
          return (
            <button key={v} onClick={() => toggleVibe(v)} style={{ padding: '10px 16px', borderRadius: 9999, border: sel ? 'none' : '1.5px solid rgba(26,26,26,0.15)', background: sel ? '#1A1A1A' : 'transparent', color: sel ? '#F5EDE3' : '#1A1A1A', fontFamily: "'Space Grotesk', system-ui, sans-serif", fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>
              {sel ? '✓ ' : ''}{v}
            </button>
          );
        })}
      </div>

      {/* Note */}
      <div style={{ margin: '20px 14px 0', padding: 20, borderRadius: 28, background: '#FFFFFF', border: '1.5px solid rgba(26,26,26,0.08)' }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', color: 'rgba(26,26,26,0.55)', marginBottom: 10 }}>
          ANYTHING ELSE? (OPTIONAL)
        </div>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Leave a note for the host…"
          rows={3}
          style={{ width: '100%', borderRadius: 14, border: '1.5px solid rgba(26,26,26,0.12)', background: '#F5EDE3', padding: '12px 14px', fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: 14, color: '#1A1A1A', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }}
        />
      </div>

      {/* Submit */}
      <div style={{ padding: '20px 14px 0' }}>
        <button
          onClick={submit}
          disabled={stars === 0 || loading}
          style={{ width: '100%', padding: '20px 0', borderRadius: 9999, border: 'none', background: stars === 0 ? 'rgba(26,26,26,0.15)' : '#1A1A1A', color: '#F5EDE3', fontFamily: "'Space Grotesk', system-ui, sans-serif", fontWeight: 700, fontSize: 17, cursor: stars === 0 ? 'not-allowed' : 'pointer', opacity: stars === 0 ? 0.5 : 1 }}
        >
          {loading ? 'Submitting…' : 'Submit rating →'}
        </button>
        <button onClick={() => router.push('/home')} style={{ width: '100%', marginTop: 10, padding: '16px 0', borderRadius: 9999, border: 'none', background: 'transparent', color: 'rgba(26,26,26,0.45)', fontFamily: "'Space Grotesk', system-ui, sans-serif", fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>
          Skip for now
        </button>
      </div>
    </div>
  );
}

export default function RatePage() {
  return (
    <Suspense>
      <RateForm />
    </Suspense>
  );
}

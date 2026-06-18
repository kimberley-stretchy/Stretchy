'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { createClient } from '@/lib/supabase';
import { SMark } from '@/components/ui/SMark';

const STRETCHY_FEE = 23;

function calcPerPerson(target: number, spots: number) {
  return Math.round((target + STRETCHY_FEE) / Math.max(spots, 1));
}

export default function EditSessionPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [session, setSession] = useState<any>(null);
  const [holdCount, setHoldCount] = useState(0);

  const [minSpots, setMinSpots] = useState(8);
  const [maxSpots, setMaxSpots] = useState(16);
  const [socialStretch, setSocialStretch] = useState('');
  const [socialNote, setSocialNote] = useState('');

  useEffect(() => {
    const supabase = createClient();
    async function load() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }

      const { data: host } = await supabase
        .from('hosts')
        .select('id')
        .eq('auth_user_id', user.id)
        .single();
      if (!host) {
        router.push('/host');
        return;
      }

      const { data: s } = await supabase
        .from('sessions')
        .select('*')
        .eq('id', id)
        .eq('host_id', host.id)
        .single();
      if (!s) {
        router.push('/host');
        return;
      }

      const { count } = await supabase
        .from('holds')
        .select('*', { count: 'exact', head: true })
        .eq('session_id', id)
        .eq('state', 'active');

      setSession(s);
      setMinSpots(s.min_attendees ?? 8);
      setMaxSpots(s.max_attendees ?? 16);
      setSocialStretch(s.social_stretch_venue ?? '');
      setSocialNote(s.social_stretch_note ?? '');
      setHoldCount(count ?? 0);
      setLoading(false);
    }
    load();
  }, [id, router]);

  async function handleSave() {
    setSaving(true);
    setError('');
    try {
      const res = await fetch(`/api/sessions/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          min_attendees: minSpots,
          max_attendees: maxSpots,
          social_stretch_venue: socialStretch.trim() || null,
          social_stretch_note: socialNote.trim() || null,
        }),
      });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error || 'Save failed');
      }
      router.push('/host');
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Something went wrong');
      setSaving(false);
    }
  }

  const card: React.CSSProperties = {
    background: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    border: '1.5px solid rgba(26,26,26,0.08)',
    marginBottom: 16,
  };

  const labelStyle: React.CSSProperties = {
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
    fontSize: 15,
    color: '#1A1A1A',
    background: '#F5EDE3',
    border: '1.5px solid rgba(26,26,26,0.12)',
    borderRadius: 12,
    padding: '12px 14px',
    outline: 'none',
    boxSizing: 'border-box',
  };

  if (loading) {
    return (
      <div style={{ background: '#F5EDE3', minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <SMark size={48} color="rgba(26,26,26,0.2)" />
      </div>
    );
  }

  const floorPrice = calcPerPerson(session.host_target, minSpots);
  const ceilPrice = calcPerPerson(session.host_target, maxSpots);
  const canLowerMin = minSpots > holdCount && minSpots > 2;

  return (
    <div style={{ background: '#F5EDE3', minHeight: '100dvh', fontFamily: "'Space Grotesk', system-ui, sans-serif", paddingBottom: 100 }}>
      {/* Top bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '54px 22px 0' }}>
        <button
          onClick={() => router.back()}
          style={{ width: 40, height: 40, borderRadius: 999, border: 'none', background: 'rgba(26,26,26,0.08)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, color: '#1A1A1A' }}
        >
          ←
        </button>
        <div style={{ padding: '7px 14px', borderRadius: 999, background: '#1A1A1A', fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', color: '#F5EDE3' }}>
          EDIT SESSION
        </div>
        <div style={{ width: 40 }} />
      </div>

      <div style={{ padding: '24px 20px 0' }}>
        <h1 style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontWeight: 700, fontSize: 36, lineHeight: 1.0, letterSpacing: '-0.02em', margin: '0 0 4px', color: '#1A1A1A' }}>
          {session.title}
        </h1>
        <p style={{ margin: 0, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'rgba(26,26,26,0.45)', letterSpacing: '0.08em' }}>
          {holdCount} HOLDS ACTIVE
        </p>
      </div>

      <div style={{ padding: '24px 20px 0' }}>

        {/* Minimum spots */}
        <div style={card}>
          <span style={labelStyle}>MINIMUM TO RUN</span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 12 }}>
            <span style={{ fontFamily: "'Bagel Fat One', system-ui, cursive", fontSize: 48, color: '#1A1A1A', lineHeight: 1 }}>
              {minSpots}
            </span>
            <span style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: 16, color: 'rgba(26,26,26,0.55)' }}>people</span>
          </div>
          <input
            type="range"
            min={Math.max(2, holdCount)}
            max={maxSpots - 1}
            step={1}
            value={minSpots}
            onChange={(e) => setMinSpots(Number(e.target.value))}
            style={{ width: '100%', accentColor: '#FF6B35', marginBottom: 8 }}
          />
          {holdCount > 0 && (
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#FF6B35', margin: 0, letterSpacing: '0.06em' }}>
              CAN'T GO BELOW {holdCount} — THAT'S YOUR CURRENT HOLDS
            </p>
          )}
          {!canLowerMin && holdCount === 0 && (
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'rgba(26,26,26,0.45)', margin: 0, letterSpacing: '0.06em' }}>
              MINIMUM IS 2
            </p>
          )}
        </div>

        {/* Capacity */}
        <div style={card}>
          <span style={labelStyle}>CAPACITY</span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 12 }}>
            <span style={{ fontFamily: "'Bagel Fat One', system-ui, cursive", fontSize: 48, color: '#1A1A1A', lineHeight: 1 }}>
              {maxSpots}
            </span>
            <span style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: 16, color: 'rgba(26,26,26,0.55)' }}>people max</span>
          </div>
          <input
            type="range"
            min={minSpots + 1}
            max={50}
            step={1}
            value={maxSpots}
            onChange={(e) => setMaxSpots(Number(e.target.value))}
            style={{ width: '100%', accentColor: '#1A1A1A' }}
          />
        </div>

        {/* Price preview */}
        <div style={{ ...card, background: '#1A1A1A', border: 'none' }}>
          <span style={{ ...labelStyle, color: 'rgba(255,255,255,0.4)' }}>PRICE RANGE</span>
          <div style={{ display: 'flex', gap: 20 }}>
            <div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.12em', marginBottom: 4 }}>
                AT {maxSpots} SPOTS
              </div>
              <div style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontWeight: 700, fontSize: 28, color: '#FFD166' }}>
                ${ceilPrice}
              </div>
            </div>
            <div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.12em', marginBottom: 4 }}>
                AT {minSpots} SPOTS
              </div>
              <div style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontWeight: 700, fontSize: 28, color: '#FFD166' }}>
                ${floorPrice}
              </div>
            </div>
          </div>
        </div>

        {/* Social Stretch */}
        <div style={{ ...card, background: '#2C8FE0', border: 'none' }}>
          <span style={{ ...labelStyle, color: 'rgba(255,255,255,0.6)' }}>SOCIAL STRETCH 🤙</span>
          <input
            style={{ ...inputStyle, background: 'rgba(255,255,255,0.15)', border: '1.5px solid rgba(255,255,255,0.3)', color: '#FFFFFF', marginBottom: 10 }}
            type="text"
            placeholder="Where's the hang after?"
            value={socialStretch}
            onChange={(e) => setSocialStretch(e.target.value)}
          />
          <textarea
            style={{ ...inputStyle, background: 'rgba(255,255,255,0.12)', border: '1.5px solid rgba(255,255,255,0.25)', color: '#FFFFFF', minHeight: 72, resize: 'vertical' } as React.CSSProperties}
            placeholder="Any details for attendees… (optional)"
            value={socialNote}
            onChange={(e) => setSocialNote(e.target.value)}
          />
        </div>

        {error && (
          <div style={{ background: '#E63946', color: '#FFFFFF', borderRadius: 12, padding: '12px 16px', fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: 14, marginBottom: 12 }}>
            {error}
          </div>
        )}

        <button
          onClick={handleSave}
          disabled={saving}
          style={{ width: '100%', background: '#FF6B35', color: '#F5EDE3', border: 'none', borderRadius: 9999, padding: '18px 24px', fontFamily: "'Space Grotesk', system-ui, sans-serif", fontWeight: 700, fontSize: 16, cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.6 : 1 }}
        >
          {saving ? 'Saving…' : 'Save changes →'}
        </button>
      </div>
    </div>
  );
}

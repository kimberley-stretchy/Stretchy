'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MOVEMENT_TYPES } from '@/lib/brand';

const STRETCHY_FEE = 20;

function calcPrice(target: number, attendees: number) {
  return Math.round((target + STRETCHY_FEE) / Math.max(attendees, 1));
}

interface Hold {
  id: string;
  user_id: string;
  state: string;
}

interface Session {
  id: string;
  title: string;
  description?: string;
  movement_type: string;
  starts_at: string;
  ends_at?: string;
  location_name: string;
  location_address?: string;
  host_target: number;
  min_attendees: number;
  max_attendees: number;
  state: string;
  host: {
    id: string;
    display_name: string;
    avatar_url?: string;
    bio?: string;
  };
}

interface Props {
  session: Session;
  userHold: Hold | null;
  holdCount: number;
  userId: string;
}

export function SessionDetailClient({ session, userHold, holdCount: initialCount, userId }: Props) {
  const [holdCount, setHoldCount] = useState(initialCount);
  const [myHold, setMyHold] = useState(userHold);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const movement = MOVEMENT_TYPES.find((m) => m.id === session.movement_type);
  const movColor = movement?.color ?? '#7A8330';

  const currentPrice = calcPrice(session.host_target, Math.max(holdCount, session.min_attendees));
  const projectedPrice = calcPrice(session.host_target, holdCount + 1);
  const maxPrice = calcPrice(session.host_target, session.min_attendees);

  const date = new Date(session.starts_at);
  const dayLabel = date.toLocaleDateString('en-NZ', { weekday: 'long', day: 'numeric', month: 'long' });
  const timeLabel = date.toLocaleTimeString('en-NZ', { hour: 'numeric', minute: '2-digit', hour12: true });

  const spotsLeft = session.max_attendees - holdCount;
  const gateTime = new Date(date.getTime() - 36 * 60 * 60 * 1000);
  const gateLabel = gateTime.toLocaleDateString('en-NZ', { weekday: 'short', day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit', hour12: true });

  const placeHold = async () => {
    setLoading(true);
    const res = await fetch('/api/holds', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId: session.id }),
    });
    if (res.ok) {
      const data = await res.json();
      setMyHold(data.hold);
      setHoldCount((c) => c + 1);
    }
    setLoading(false);
  };

  const releaseHold = async () => {
    if (!myHold) return;
    setLoading(true);
    await fetch(`/api/holds/${myHold.id}`, { method: 'DELETE' });
    setMyHold(null);
    setHoldCount((c) => Math.max(c - 1, 0));
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', paddingBottom: 100 }}>
      <div
        style={{
          background: movColor,
          padding: '56px 24px 32px',
          marginBottom: 0,
        }}
      >
        <button
          onClick={() => router.back()}
          style={{
            background: 'rgba(255,255,255,0.2)',
            border: 'none',
            borderRadius: 9999,
            padding: '8px 16px',
            color: '#F5EDE3',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.1em',
            cursor: 'pointer',
            marginBottom: 24,
            display: 'block',
          }}
        >
          ← BACK
        </button>

        <div style={{ fontSize: 36, marginBottom: 12 }}>{movement?.emoji ?? '🧘'}</div>
        <h1
          style={{
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(26px, 6vw, 36px)',
            letterSpacing: '-0.02em',
            color: '#F5EDE3',
            margin: '0 0 8px',
            lineHeight: 1.1,
          }}
        >
          {session.title}
        </h1>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            color: 'rgba(245,237,227,0.7)',
            letterSpacing: '0.08em',
          }}
        >
          {dayLabel} · {timeLabel}
        </div>
      </div>

      <div style={{ padding: '0 16px' }}>
        <div
          style={{
            background: '#1A1A1A',
            borderRadius: 28,
            padding: 24,
            marginTop: -20,
            marginBottom: 16,
            position: 'relative',
            zIndex: 1,
          }}
        >
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.18em',
              color: '#FFD166',
              marginBottom: 8,
            }}
          >
            CURRENT PRICE
          </div>
          <div
            style={{
              fontFamily: "'Space Grotesk', system-ui, sans-serif",
              fontWeight: 700,
              fontSize: 56,
              letterSpacing: '-0.03em',
              color: '#FFD166',
              lineHeight: 1,
              marginBottom: 4,
            }}
          >
            ${currentPrice}
          </div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              color: 'rgba(245,237,227,0.5)',
              letterSpacing: '0.06em',
            }}
          >
            {holdCount} holding · max ${maxPrice} · {spotsLeft} spots left
          </div>

          {!myHold && holdCount < session.max_attendees && (
            <div
              style={{
                marginTop: 12,
                padding: '10px 14px',
                background: 'rgba(255,209,102,0.1)',
                borderRadius: 12,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                color: '#FFD166',
                letterSpacing: '0.06em',
              }}
            >
              + one more person → ${projectedPrice} each
            </div>
          )}
        </div>

        <div
          style={{
            background: '#FFFFFF',
            borderRadius: 24,
            padding: 20,
            marginBottom: 12,
            border: '1.5px solid rgba(26,26,26,0.08)',
          }}
        >
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: movColor,
                color: '#F5EDE3',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 20,
                flexShrink: 0,
              }}
            >
              📍
            </div>
            <div>
              <div
                style={{
                  fontFamily: "'Space Grotesk', system-ui, sans-serif",
                  fontWeight: 700,
                  fontSize: 15,
                  color: '#1A1A1A',
                  marginBottom: 2,
                }}
              >
                {session.location_name}
              </div>
              {session.location_address && (
                <div style={{ fontSize: 13, color: '#888', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.04em' }}>
                  {session.location_address}
                </div>
              )}
            </div>
          </div>
        </div>

        {session.description && (
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: 24,
              padding: 20,
              marginBottom: 12,
              border: '1.5px solid rgba(26,26,26,0.08)',
            }}
          >
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '0.16em',
                color: '#999',
                marginBottom: 10,
              }}
            >
              ABOUT
            </div>
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: '#444' }}>
              {session.description}
            </p>
          </div>
        )}

        <div
          style={{
            background: '#FFFFFF',
            borderRadius: 24,
            padding: 20,
            marginBottom: 20,
            border: '1.5px solid rgba(26,26,26,0.08)',
          }}
        >
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 22,
                background: '#7A8330',
                color: '#F5EDE3',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: "'Space Grotesk', system-ui, sans-serif",
                fontWeight: 700,
                fontSize: 18,
                flexShrink: 0,
              }}
            >
              {session.host.display_name[0]}
            </div>
            <div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: '0.16em',
                  color: '#999',
                  marginBottom: 2,
                }}
              >
                HOST
              </div>
              <div
                style={{
                  fontFamily: "'Space Grotesk', system-ui, sans-serif",
                  fontWeight: 700,
                  fontSize: 15,
                  color: '#1A1A1A',
                }}
              >
                {session.host.display_name}
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            background: 'rgba(26,26,26,0.04)',
            borderRadius: 18,
            padding: '14px 18px',
            marginBottom: 20,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            color: '#666',
            letterSpacing: '0.06em',
            lineHeight: 1.5,
          }}
        >
          <strong style={{ color: '#1A1A1A' }}>36h gate:</strong> confirms or cancels {gateLabel}. No charge until confirmed.
        </div>

        {myHold ? (
          <div>
            <div
              style={{
                background: '#7A8330',
                borderRadius: 20,
                padding: 20,
                textAlign: 'center',
                marginBottom: 12,
              }}
            >
              <div style={{ fontSize: 28, marginBottom: 6 }}>✓</div>
              <div
                style={{
                  fontFamily: "'Space Grotesk', system-ui, sans-serif",
                  fontWeight: 700,
                  fontSize: 18,
                  color: '#F5EDE3',
                  marginBottom: 4,
                }}
              >
                You're holding a spot
              </div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  color: 'rgba(245,237,227,0.7)',
                  letterSpacing: '0.08em',
                }}
              >
                No charge until confirmed at gate
              </div>
            </div>
            <button
              onClick={releaseHold}
              disabled={loading}
              style={{
                width: '100%',
                padding: '16px 0',
                borderRadius: 9999,
                border: '1.5px solid rgba(26,26,26,0.2)',
                background: 'transparent',
                fontFamily: "'Space Grotesk', system-ui, sans-serif",
                fontWeight: 600,
                fontSize: 15,
                color: '#666',
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
            >
              Release my spot
            </button>
          </div>
        ) : (
          <button
            onClick={placeHold}
            disabled={loading || spotsLeft <= 0}
            style={{
              width: '100%',
              padding: '20px 0',
              borderRadius: 9999,
              border: 'none',
              background: spotsLeft <= 0 ? '#CCC' : '#1A1A1A',
              color: '#F5EDE3',
              fontFamily: "'Space Grotesk', system-ui, sans-serif",
              fontWeight: 700,
              fontSize: 17,
              cursor: loading || spotsLeft <= 0 ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? 'Placing hold…' : spotsLeft <= 0 ? 'Session full' : `Hold a spot · $${currentPrice} max`}
          </button>
        )}
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MOVEMENT_TYPES } from '@/lib/brand';
import { SMark } from '@/components/ui/SMark';

const FEE = 23; // $20 + 15% GST

function calcPrice(target: number, attendees: number) {
  return Math.round((target + FEE) / Math.max(attendees, 1));
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
    name: string;
    avatar_url?: string;
    bio?: string;
  };
}

interface Props {
  session: Session;
  userHold: Hold | null;
  holdCount: number;
  userId: string;
  hasPaymentMethod: boolean;
}

function PricingScale({ startPrice, floorPrice, minSpots, currentSpots, maxCapacity }: {
  startPrice: number; floorPrice: number; minSpots: number; currentSpots: number; maxCapacity: number;
}) {
  const W = 300, H = 80;
  const padL = 0, padR = 0, padT = 8, padB = 20;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;

  const xForSpot = (n: number) => padL + ((n - 1) / (maxCapacity - 1)) * plotW;
  const yForPrice = (p: number) => padT + ((startPrice - p) / (startPrice - floorPrice)) * plotH;

  const confirmedX = xForSpot(minSpots);
  const currentX = xForSpot(Math.min(currentSpots, maxCapacity));
  const currentY = yForPrice(calcPrice(startPrice * minSpots - FEE, Math.min(currentSpots, maxCapacity)));

  // Build the price curve path (solid = already happened, dashed = projection)
  const solidPoints: [number, number][] = [];
  const dashedPoints: [number, number][] = [];

  for (let s = minSpots; s <= maxCapacity; s++) {
    const price = Math.round((startPrice * minSpots) / s);
    const x = xForSpot(s);
    const y = yForPrice(Math.max(price, floorPrice));
    if (s <= currentSpots) solidPoints.push([x, y]);
    else dashedPoints.push([x, y]);
  }

  // Start line — horizontal from left edge to minSpots
  const startY = yForPrice(startPrice);

  const toPath = (pts: [number, number][]) =>
    pts.length < 2 ? '' : pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');

  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto', overflow: 'visible' }}>
      {/* Plateau at starting price until min hits */}
      <line x1={padL} y1={startY} x2={confirmedX} y2={startY} stroke="rgba(26,26,26,0.20)" strokeWidth={2} strokeLinecap="round" />

      {/* Solid curve (filled so far) */}
      {solidPoints.length > 1 && (
        <path d={toPath(solidPoints)} fill="none" stroke="#2C8FE0" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
      )}

      {/* Dashed projected curve */}
      {dashedPoints.length > 1 && (
        <path d={toPath(dashedPoints)} fill="none" stroke="rgba(26,26,26,0.25)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" strokeDasharray="5,5" />
      )}

      {/* Live dot */}
      {currentSpots >= minSpots && (
        <>
          <circle cx={currentX} cy={currentY} r={8} fill="#2C8FE0" opacity={0.2} />
          <circle cx={currentX} cy={currentY} r={5} fill="#2C8FE0" />
        </>
      )}

      {/* Floor price label */}
      <text x={W - padR} y={H} textAnchor="end" fontFamily="'JetBrains Mono', monospace" fontSize={10} fontWeight={700} fill="rgba(26,26,26,0.45)" letterSpacing="0.08em">
        FLOOR ${floorPrice}
      </text>

      {/* Start price label */}
      <text x={padL} y={startY - 4} textAnchor="start" fontFamily="'JetBrains Mono', monospace" fontSize={10} fontWeight={700} fill="rgba(26,26,26,0.45)" letterSpacing="0.08em">
        MAX ${startPrice}
      </text>
    </svg>
  );
}

export function SessionDetailClient({ session, userHold, holdCount: initialCount, userId, hasPaymentMethod }: Props) {
  const [holdCount, setHoldCount] = useState(initialCount);
  const [myHold, setMyHold] = useState(userHold);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const movement = MOVEMENT_TYPES.find((m) => m.id === session.movement_type);
  const movColor = movement?.color ?? '#7A8330';

  const startPrice = calcPrice(session.host_target, session.min_attendees);
  const floorPrice = calcPrice(session.host_target, session.max_attendees);
  const currentPrice = calcPrice(session.host_target, Math.max(holdCount, 1));
  const displayPrice = holdCount >= session.min_attendees ? currentPrice : startPrice;

  const date = new Date(session.starts_at);
  const dayShort = date.toLocaleDateString('en-NZ', { weekday: 'short' }).toUpperCase();
  const dateStr = date.toLocaleDateString('en-NZ', { day: 'numeric', month: 'short' }).toUpperCase();
  const timeStr = date.toLocaleTimeString('en-NZ', { hour: 'numeric', minute: '2-digit', hour12: true }).toUpperCase();
  const duration = session.ends_at
    ? `${Math.round((new Date(session.ends_at).getTime() - date.getTime()) / 60000)} MIN`
    : '60 MIN';

  const spotsLeft = session.max_attendees - holdCount;
  const neededMore = Math.max(session.min_attendees - holdCount, 0);
  const isConfirmed = holdCount >= session.min_attendees;

  const placeHold = async () => {
    if (!hasPaymentMethod) {
      router.push(`/billing?next=/sessions/${session.id}`);
      return;
    }
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
    <div style={{ background: '#F5EDE3', minHeight: '100dvh', fontFamily: "'Space Grotesk', system-ui, sans-serif", paddingBottom: 120 }}>
      {/* Top bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '54px 22px 0' }}>
        <button
          onClick={() => router.back()}
          style={{
            width: 40, height: 40, borderRadius: 999, border: 'none',
            background: 'rgba(26,26,26,0.08)', color: '#1A1A1A', fontSize: 16,
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >←</button>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px',
          borderRadius: 999, background: '#E6F5EC', color: '#2E7A52',
          fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700, letterSpacing: '0.12em',
        }}>✓ VETTED HOST</div>
        <button style={{
          width: 40, height: 40, borderRadius: 999, border: 'none',
          background: 'rgba(26,26,26,0.06)', color: '#1A1A1A', fontSize: 16, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>♡</button>
      </div>

      {/* Title block */}
      <div style={{ padding: '8px 22px 18px' }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
          <span style={{
            background: '#B5DDE9', color: '#1A1A1A', padding: '5px 11px', borderRadius: 999,
            fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700, letterSpacing: '0.14em',
          }}>{dayShort} · {timeStr}</span>
          <span style={{
            background: 'rgba(26,26,26,0.06)', color: '#1A1A1A', padding: '5px 11px', borderRadius: 999,
            fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700, letterSpacing: '0.14em',
          }}>{duration}</span>
          <span style={{
            background: `${movColor}22`, color: movColor, padding: '5px 11px', borderRadius: 999,
            fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700, letterSpacing: '0.14em',
          }}>{movement?.label?.toUpperCase() ?? session.movement_type.toUpperCase()}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
          <h1 style={{
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
            fontWeight: 700, fontSize: 40, lineHeight: 0.95,
            letterSpacing: '-0.02em', margin: 0, flex: 1, color: '#1A1A1A',
          }}>{session.title}</h1>
          <div style={{
            width: 52, height: 52, borderRadius: 16, background: movColor,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 26, flexShrink: 0, marginTop: 4,
          }}>{movement?.emoji ?? '🧘'}</div>
        </div>
        <p style={{ margin: '10px 0 0', fontSize: 14, color: 'rgba(26,26,26,0.55)' }}>
          with {session.host.name} · {session.location_name}
        </p>
      </div>

      {/* THE PRICING ENGINE */}
      <div style={{ margin: '0 14px', padding: 22, borderRadius: 32, background: '#FFFFFF', border: '1.5px solid rgba(26,26,26,0.08)' }}>
        {/* Progress pips */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
            {Array.from({ length: session.min_attendees }, (_, i) => (
              <div key={i} style={{
                width: 14, height: 14, borderRadius: 999,
                background: i < holdCount ? '#2C8FE0' : 'rgba(26,26,26,0.14)',
              }} />
            ))}
          </div>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', color: '#FF6B35' }}>
            ● LIVE
          </span>
        </div>

        <p style={{ margin: '0 0 18px', fontWeight: 700, fontSize: 18, lineHeight: 1.2, color: '#1A1A1A', letterSpacing: '-0.01em' }}>
          {myHold
            ? '✓ You\'re holding a spot.'
            : isConfirmed
              ? 'Session confirmed — price still falling.'
              : `${neededMore} MORE ATTENDEE${neededMore !== 1 ? 'S' : ''} TO CONFIRM SESSION`}
        </p>

        {/* Price tile */}
        <div style={{
          background: '#FFD166', borderRadius: 24, padding: '20px 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14,
        }}>
          <div style={{ display: 'flex', alignItems: 'baseline' }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 28, color: '#1A1A1A' }}>$</span>
            <span style={{ fontFamily: "'Bagel Fat One', system-ui, sans-serif", fontWeight: 400, fontSize: 88, lineHeight: 0.85, color: '#1A1A1A', letterSpacing: '-0.04em' }}>
              {displayPrice}
            </span>
          </div>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', color: '#1A1A1A', textAlign: 'right', lineHeight: 1.3 }}>
            STARTING<br />PRICE
          </span>
        </div>

        <p style={{ margin: '0 0 22px', fontSize: 14, lineHeight: 1.45, color: '#1A1A1A' }}>
          The most you'll pay is <strong>${startPrice}</strong>. The more who join, the less <em>everyone</em> pays.
        </p>

        {/* Pricing scale chart */}
        <div style={{ padding: '4px 0 0' }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', color: 'rgba(26,26,26,0.55)' }}>
            LIVE PRICE — DROPS AS THE ROOM FILLS
          </span>
          <div style={{ marginTop: 10 }}>
            <PricingScale
              startPrice={startPrice}
              floorPrice={floorPrice}
              minSpots={session.min_attendees}
              currentSpots={holdCount}
              maxCapacity={session.max_attendees}
            />
          </div>
        </div>
      </div>

      {/* Hold CTA */}
      <div style={{ padding: '22px 14px 8px' }}>
        {myHold ? (
          <>
            <div style={{
              background: '#E6F5EC', border: '1.5px solid #4CAF82', borderRadius: 20,
              padding: '14px 20px', textAlign: 'center', marginBottom: 12,
            }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: '#2E7A52' }}>
                ✓ PLACE HELD · NO CHARGE YET
              </span>
            </div>
            <button
              onClick={releaseHold}
              disabled={loading}
              style={{
                width: '100%', padding: '16px 0', borderRadius: 9999,
                border: '1.5px dashed rgba(26,26,26,0.25)', background: 'transparent',
                fontFamily: "'Space Grotesk', system-ui, sans-serif", fontWeight: 600, fontSize: 14,
                color: '#666', cursor: loading ? 'not-allowed' : 'pointer',
              }}
            >
              {loading ? 'Releasing…' : 'Release my spot'}
            </button>
          </>
        ) : (
          <>
            <button
              onClick={placeHold}
              disabled={loading || spotsLeft <= 0}
              style={{
                width: '100%', padding: '20px 0', borderRadius: 9999,
                border: 'none', background: spotsLeft <= 0 ? '#CCC' : '#1A1A1A',
                color: '#F5EDE3', fontFamily: "'Space Grotesk', system-ui, sans-serif",
                fontWeight: 700, fontSize: 17, cursor: loading || spotsLeft <= 0 ? 'not-allowed' : 'pointer',
              }}
            >
              {loading ? 'Placing hold…' : spotsLeft <= 0 ? 'Session full' : !hasPaymentMethod ? 'Add card to hold →' : 'Hold my place — no charge yet'}
            </button>
            <p style={{ margin: '12px 14px 0', fontSize: 12, lineHeight: 1.4, color: 'rgba(26,26,26,0.55)', textAlign: 'center' }}>
              You only pay if it goes ahead — and only at the final, lowest price.
            </p>
          </>
        )}
      </div>

      {/* Where */}
      <div style={{ padding: '22px 22px 8px' }}>
        <h3 style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: 22, margin: 0, fontWeight: 700, letterSpacing: '-0.01em' }}>Where</h3>
      </div>
      <div style={{ margin: '0 14px', padding: 20, borderRadius: 28, background: '#FFFFFF', border: '1.5px solid rgba(26,26,26,0.08)' }}>
        <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 4 }}>{session.location_name}</div>
        {session.location_address && (
          <div style={{ fontSize: 13, color: 'rgba(26,26,26,0.55)', marginBottom: 14 }}>{session.location_address}</div>
        )}
        {/* Faux map placeholder */}
        <div style={{
          height: 110, borderRadius: 18,
          background: '#EFE7DA',
          backgroundImage: `repeating-linear-gradient(45deg, rgba(26,26,26,0.05) 0 2px, transparent 2px 14px), repeating-linear-gradient(-45deg, rgba(26,26,26,0.05) 0 2px, transparent 2px 22px)`,
          position: 'relative', marginBottom: 12, overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', left: '52%', top: '46%', transform: 'translate(-50%,-50%)' }}>
            <div style={{ width: 28, height: 28, borderRadius: '50% 50% 50% 0', background: '#2C8FE0', transform: 'rotate(-45deg)' }} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={{
            flex: 1, padding: '12px 0', borderRadius: 9999, border: 'none',
            background: '#1A1A1A', color: '#F5EDE3',
            fontFamily: "'Space Grotesk', system-ui, sans-serif", fontWeight: 700, fontSize: 13, cursor: 'pointer',
          }}>↗ Directions</button>
          <button style={{
            flex: 1, padding: '12px 0', borderRadius: 9999,
            border: '1.5px solid rgba(26,26,26,0.2)', background: 'transparent', color: '#1A1A1A',
            fontFamily: "'Space Grotesk', system-ui, sans-serif", fontWeight: 600, fontSize: 13, cursor: 'pointer',
          }}>Copy address</button>
        </div>
      </div>

      {/* Description */}
      {session.description && (
        <div style={{ margin: '14px 14px 0', padding: 20, borderRadius: 28, background: '#FFFFFF', border: '1.5px solid rgba(26,26,26,0.08)' }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', color: 'rgba(26,26,26,0.55)', marginBottom: 10 }}>
            ABOUT
          </div>
          <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: '#444' }}>{session.description}</p>
        </div>
      )}

      {/* Host */}
      <div style={{ padding: '24px 14px 0' }}>
        <div style={{
          padding: 18, borderRadius: 28, background: '#FFFFFF', border: '1.5px solid rgba(26,26,26,0.08)',
          display: 'flex', alignItems: 'center', gap: 14,
        }}>
          <div style={{
            width: 52, height: 52, borderRadius: 999, background: '#2C8FE0',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'Space Grotesk', system-ui, sans-serif", fontWeight: 700, color: '#F5EDE3', fontSize: 20,
          }}>
            {session.host.name[0]}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 600, fontSize: 15 }}>{session.host.name}</div>
            {session.host.bio && <div style={{ fontSize: 12, color: 'rgba(26,26,26,0.55)', marginTop: 2 }}>{session.host.bio}</div>}
          </div>
          <div style={{
            padding: '8px 14px', borderRadius: 9999,
            background: '#B5DDE9', color: '#1A1A1A',
            fontFamily: "'Space Grotesk', system-ui, sans-serif", fontWeight: 700, fontSize: 12,
            cursor: 'pointer',
          }}>+ Follow</div>
        </div>
      </div>
    </div>
  );
}

import Link from 'next/link';
import { MOVEMENT_TYPES } from '@/lib/brand';

interface SessionCardProps {
  session: {
    id: string;
    title: string;
    movement_type: string;
    starts_at: string;
    location_name: string;
    host_target: number;
    min_attendees: number;
    max_attendees: number;
    holds?: { count: number }[];
    host?: { display_name: string; avatar_url?: string };
  };
}

const STRETCHY_FEE = 20;

function calcPrice(target: number, attendees: number) {
  return Math.round((target + STRETCHY_FEE) / Math.max(attendees, 1));
}

export function SessionCard({ session }: SessionCardProps) {
  const holdCount = session.holds?.[0]?.count ?? session.min_attendees;
  const currentPrice = calcPrice(session.host_target, holdCount);
  const maxPrice = calcPrice(session.host_target, session.min_attendees);
  const isAtMin = holdCount <= session.min_attendees;

  const movement = MOVEMENT_TYPES.find((m) => m.id === session.movement_type);
  const movColor = movement?.color ?? '#7A8330';

  const date = new Date(session.starts_at);
  const dayLabel = date.toLocaleDateString('en-NZ', { weekday: 'short', day: 'numeric', month: 'short' });
  const timeLabel = date.toLocaleTimeString('en-NZ', { hour: 'numeric', minute: '2-digit', hour12: true });

  return (
    <Link href={`/sessions/${session.id}`} style={{ textDecoration: 'none' }}>
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: 24,
          padding: 20,
          border: '1.5px solid rgba(26,26,26,0.08)',
          display: 'flex',
          gap: 16,
          alignItems: 'flex-start',
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 14,
            background: movColor,
            color: '#F5EDE3',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 22,
            flexShrink: 0,
          }}
        >
          {movement?.emoji ?? '🧘'}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontFamily: "'Space Grotesk', system-ui, sans-serif",
              fontWeight: 700,
              fontSize: 17,
              letterSpacing: '-0.01em',
              color: '#1A1A1A',
              marginBottom: 4,
            }}
          >
            {session.title}
          </div>

          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              color: '#666',
              letterSpacing: '0.06em',
              marginBottom: 12,
            }}
          >
            {dayLabel} · {timeLabel} · {session.location_name}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <span
                style={{
                  fontFamily: "'Space Grotesk', system-ui, sans-serif",
                  fontWeight: 700,
                  fontSize: 22,
                  color: '#FFD166',
                  letterSpacing: '-0.02em',
                }}
              >
                ${currentPrice}
              </span>
              {isAtMin && (
                <span style={{ fontSize: 12, color: '#999', fontFamily: "'JetBrains Mono', monospace" }}>
                  max ${maxPrice}
                </span>
              )}
            </div>

            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '0.1em',
                color: holdCount >= session.min_attendees ? '#7A8330' : '#999',
              }}
            >
              {holdCount}/{session.min_attendees} min
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

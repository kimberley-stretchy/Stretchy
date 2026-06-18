import Link from 'next/link';
import { SMark } from '@/components/ui/SMark';

export default function WelcomePage() {
  return (
    <div
      style={{
        minHeight: '100dvh',
        background: '#7A8330',
        color: '#F5EDE3',
        fontFamily: "'Space Grotesk', system-ui, sans-serif",
        paddingTop: 36,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Logo */}
      <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 24 }}>
        <SMark size={180} color="#F5EDE3" />
      </div>

      {/* Text block */}
      <div style={{ textAlign: 'center', padding: '32px 24px 0' }}>
        <h1
          style={{
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
            fontWeight: 700,
            fontSize: 60,
            lineHeight: 0.92,
            letterSpacing: '-0.03em',
            margin: 0,
            color: '#F5EDE3',
          }}
        >
          A social movement.
        </h1>
        <p
          style={{
            fontSize: 16,
            lineHeight: 1.4,
            maxWidth: 300,
            margin: '16px auto 0',
            color: '#F5EDE3',
          }}
        >
          The larger the group gets, the better value for all. Join us.
        </p>
      </div>

      {/* CTAs */}
      <div
        style={{
          padding: '40px 14px 0',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        <Link
          href="/signup"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            background: '#F5EDE3',
            color: '#1A1A1A',
            borderRadius: 9999,
            padding: '20px 28px',
            fontWeight: 700,
            fontSize: 17,
            textDecoration: 'none',
            boxSizing: 'border-box',
          }}
        >
          <span>I&apos;m new — sign up</span>
          <span>→</span>
        </Link>

        <Link
          href="/login"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            background: 'rgba(26,26,26,0.25)',
            color: '#F5EDE3',
            borderRadius: 9999,
            padding: '20px 28px',
            fontWeight: 700,
            fontSize: 17,
            textDecoration: 'none',
            boxSizing: 'border-box',
          }}
        >
          <span>I have an account — log in</span>
          <span>→</span>
        </Link>
      </div>

      {/* Footer */}
      <div style={{ flex: 1 }} />
      <p
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          color: '#F5EDE3',
          opacity: 0.7,
          letterSpacing: '0.10em',
          textAlign: 'center',
          padding: '32px 24px 80px',
          margin: 0,
        }}
      >
        AUCKLAND · SESSIONS THIS MONTH · MATES
      </p>
    </div>
  );
}

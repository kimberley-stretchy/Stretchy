'use client';

import { useEffect, useState } from 'react';
import { SMark } from '@/components/ui/SMark';

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: scrolled ? 'rgba(245,237,227,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(26,26,26,0.08)' : '1px solid transparent',
        transition: 'all .25s ease',
      }}
    >
      <div
        style={{
          maxWidth: 1180,
          margin: '0 auto',
          padding: '14px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <SMark size={32} color="#7A8330" />
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <a href="/home" style={navLink}>Explore the app</a>
          <a href="#waitlist" style={navLink}>Join the waitlist</a>
          <a
            href="/login"
            style={{
              ...navLink,
              background: '#1A1A1A',
              color: '#F5EDE3',
              borderRadius: 9999,
              padding: '10px 18px',
            }}
          >
            Log in
          </a>
        </div>
      </div>
    </div>
  );
}

const navLink: React.CSSProperties = {
  fontFamily: "'Space Grotesk', system-ui, sans-serif",
  fontSize: 14,
  fontWeight: 600,
  color: '#1A1A1A',
  textDecoration: 'none',
  padding: '8px 12px',
  display: 'inline-block',
};

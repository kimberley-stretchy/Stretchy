'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export interface MenuDrawerProps {
  userName?: string;
  userEmail?: string;
  isHost?: boolean;
  open: boolean;
  onClose: () => void;
}

export function MenuDrawer({
  userName,
  userEmail,
  isHost = false,
  open,
  onClose,
}: MenuDrawerProps) {
  const router = useRouter();
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const initial = userName
    ? userName.trim().charAt(0).toUpperCase()
    : userEmail
    ? userEmail.trim().charAt(0).toUpperCase()
    : '?';

  const handleSignOut = async () => {
    onClose();
    await fetch('/api/auth/signout', { method: 'POST' });
    router.push('/login');
    router.refresh();
  };

  const linkStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '11px 16px',
    borderRadius: 12,
    textDecoration: 'none',
    fontFamily: "'Space Grotesk', system-ui, sans-serif",
    fontSize: 15,
    fontWeight: 600,
    color: '#1A1A1A',
    transition: 'background 0.12s',
    cursor: 'pointer',
    background: 'transparent',
  };

  const hostLinkStyle: React.CSSProperties = {
    ...linkStyle,
    background: 'rgba(165,53,199,0.10)',
    color: '#A535C7',
  };

  if (!open) return null;

  return (
    <>
      {/* Scrim */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(26,26,26,0.35)',
          zIndex: 998,
          animation: 'fadeIn 0.15s ease',
        }}
        aria-hidden="true"
      />

      {/* Drawer card */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        style={{
          position: 'absolute',
          top: 80,
          left: 14,
          width: 280,
          maxWidth: 'calc(100vw - 28px)',
          background: '#FFFFFF',
          borderRadius: 24,
          boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
          zIndex: 999,
          overflow: 'hidden',
          animation: 'slideDown 0.18s ease',
        }}
      >
        {/* Triangle pointer */}
        <div
          style={{
            position: 'absolute',
            top: -8,
            left: 18,
            width: 0,
            height: 0,
            borderLeft: '8px solid transparent',
            borderRight: '8px solid transparent',
            borderBottom: '8px solid #FFFFFF',
          }}
        />

        {/* User identity */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '20px 16px 16px',
            borderBottom: '1px solid rgba(26,26,26,0.07)',
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: '#FFD166',
              color: '#1A1A1A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: "'Space Grotesk', system-ui, sans-serif",
              fontWeight: 800,
              fontSize: 17,
              flexShrink: 0,
            }}
          >
            {initial}
          </div>
          <div style={{ minWidth: 0 }}>
            {userName && (
              <div
                style={{
                  fontFamily: "'Space Grotesk', system-ui, sans-serif",
                  fontSize: 15,
                  fontWeight: 700,
                  color: '#1A1A1A',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {userName}
              </div>
            )}
            {userEmail && (
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  color: 'rgba(26,26,26,0.5)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {userEmail}
              </div>
            )}
          </div>
        </div>

        {/* Menu items */}
        <nav style={{ padding: '10px 8px' }}>
          <MenuLink href="/sessions" label="Pick your stretch" style={linkStyle} onClick={onClose} />
          <MenuLink href="/held" label="My holds" style={linkStyle} onClick={onClose} />
          <MenuLink href="/suggest" label="Suggest a Stretchy" style={linkStyle} onClick={onClose} />

          {isHost ? (
            <MenuLink href="/host" label="Switch to Host view" style={hostLinkStyle} onClick={onClose} />
          ) : (
            <MenuLink href="/host/apply" label="Apply to be a host" style={linkStyle} onClick={onClose} />
          )}

          <MenuLink href="/notifications" label="Notifications" style={linkStyle} onClick={onClose} />

          <a
            href="mailto:hello@stretchy.nz"
            style={linkStyle}
            onClick={onClose}
          >
            Contact Stretchy
          </a>

          <div style={{ borderTop: '1px solid rgba(26,26,26,0.07)', margin: '8px 0' }} />

          <button
            onClick={handleSignOut}
            style={{
              ...linkStyle,
              width: '100%',
              border: 'none',
              textAlign: 'left',
              color: 'rgba(26,26,26,0.55)',
            }}
          >
            Sign out
          </button>
        </nav>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}

function MenuLink({
  href,
  label,
  style,
  onClick,
}: {
  href: string;
  label: string;
  style: React.CSSProperties;
  onClick: () => void;
}) {
  return (
    <Link href={href} style={style} onClick={onClick}>
      {label}
    </Link>
  );
}

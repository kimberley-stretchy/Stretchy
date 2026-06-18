'use client';

import { useState } from 'react';
import { SMark } from '@/components/ui/SMark';
import { MenuDrawer } from '@/components/app/MenuDrawer';

interface MenuButtonProps {
  userName?: string;
  userEmail?: string;
  isHost?: boolean;
}

export function MenuButton({ userName, userEmail, isHost = false }: MenuButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-haspopup="dialog"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 0,
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          borderRadius: 8,
          transition: 'opacity 0.15s',
        }}
      >
        <SMark size={32} color="#1A1A1A" />
      </button>

      <MenuDrawer
        userName={userName}
        userEmail={userEmail}
        isHost={isHost}
        open={open}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}

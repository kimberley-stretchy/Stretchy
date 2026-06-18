'use client';

import { useState } from 'react';
import { SMark } from '@/components/ui/SMark';
import { MenuDrawer } from '@/components/app/MenuDrawer';

interface MenuButtonProps {
  userName?: string;
  userEmail?: string;
  isHost?: boolean;
  color?: string;
  size?: number;
}

export function MenuButton({ userName, userEmail, isHost = false, color = '#1A1A1A', size = 32 }: MenuButtonProps) {
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
        <SMark size={size} color={color} />
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

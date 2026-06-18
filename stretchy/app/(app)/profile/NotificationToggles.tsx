'use client';

import { useState } from 'react';

interface Props {
  notificationEmail: boolean;
  notificationPush: boolean;
}

function Toggle({ on, onToggle, label }: { on: boolean; onToggle: () => void; label: string }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '16px 0', borderBottom: '1px solid rgba(26,26,26,0.07)',
    }}>
      <span style={{ fontWeight: 600, fontSize: 15 }}>{label}</span>
      <button
        onClick={onToggle}
        aria-pressed={on}
        style={{
          width: 44, height: 26, borderRadius: 9999,
          background: on ? '#7A8330' : 'rgba(26,26,26,0.15)',
          border: 'none', cursor: 'pointer', padding: 0,
          position: 'relative', transition: 'background 0.2s',
          flexShrink: 0,
        }}
      >
        <div style={{
          width: 20, height: 20, borderRadius: 9999, background: '#FFFFFF',
          position: 'absolute', top: 3,
          left: on ? 21 : 3,
          transition: 'left 0.2s',
          boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
        }} />
      </button>
    </div>
  );
}

export function NotificationToggles({ notificationEmail, notificationPush }: Props) {
  const [email, setEmail] = useState(notificationEmail);
  const [push, setPush] = useState(notificationPush);

  const save = async (field: string, value: boolean) => {
    await fetch('/api/profile/notifications', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ [field]: value }),
    });
  };

  return (
    <div style={{ margin: '0 20px' }}>
      <Toggle
        label="Email notifications"
        on={email}
        onToggle={() => { const v = !email; setEmail(v); save('notification_email', v); }}
      />
      <Toggle
        label="Push notifications"
        on={push}
        onToggle={() => { const v = !push; setPush(v); save('notification_push', v); }}
      />
    </div>
  );
}

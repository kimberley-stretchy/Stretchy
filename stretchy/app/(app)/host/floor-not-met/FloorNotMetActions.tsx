'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function FloorNotMetActions({ sessionId }: { sessionId: string }) {
  const router = useRouter();
  const [cancelling, setCancelling] = useState(false);
  const [copied, setCopied] = useState(false);

  async function copyShareLink() {
    const url = `${window.location.origin}/sessions/${sessionId}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      prompt('Copy this link:', url);
    }
  }

  async function cancelSession() {
    if (!confirm('Cancel this session? All holds will be released.')) return;
    setCancelling(true);
    const res = await fetch(`/api/sessions/${sessionId}`, { method: 'DELETE' });
    if (res.ok) {
      router.push('/host');
    } else {
      const d = await res.json().catch(() => ({}));
      alert(d.error ?? 'Could not cancel session');
      setCancelling(false);
    }
  }

  const btnBase: React.CSSProperties = {
    borderRadius: 999,
    padding: '12px 24px',
    fontFamily: "'Space Grotesk', system-ui, sans-serif",
    fontWeight: 700,
    fontSize: 14,
    cursor: 'pointer',
  };

  return (
    <>
      {/* Share card */}
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: 24,
          padding: '20px 20px',
          border: '1.5px solid rgba(26,26,26,0.08)',
          color: '#1A1A1A',
        }}
      >
        <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 4 }}>Share it</div>
        <p style={{ margin: '0 0 16px', fontSize: 14, color: 'rgba(26,26,26,0.65)', lineHeight: 1.5 }}>
          Every share could be the hold that tips it.
        </p>
        <button
          onClick={copyShareLink}
          style={{
            ...btnBase,
            background: '#FF6B35',
            color: '#F5EDE3',
            border: '2px solid #FF6B35',
          }}
        >
          {copied ? 'Copied!' : 'Copy share link'}
        </button>
      </div>

      {/* Cancel card */}
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: 24,
          padding: '20px 20px',
          border: '1.5px solid rgba(26,26,26,0.08)',
          color: '#1A1A1A',
        }}
      >
        <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 4 }}>Cancel now</div>
        <p style={{ margin: '0 0 16px', fontSize: 14, color: 'rgba(26,26,26,0.65)', lineHeight: 1.5 }}>
          Release all holds. No one is charged.
        </p>
        <button
          onClick={cancelSession}
          disabled={cancelling}
          style={{
            ...btnBase,
            background: 'transparent',
            color: '#E63946',
            border: '2px solid #E63946',
            opacity: cancelling ? 0.6 : 1,
          }}
        >
          {cancelling ? 'Cancelling…' : 'Cancel session'}
        </button>
      </div>
    </>
  );
}

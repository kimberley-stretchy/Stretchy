'use client';

import { useState } from 'react';

export function GoingAheadActions({ sessionId }: { sessionId: string }) {
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

  return (
    <button
      onClick={copyShareLink}
      style={{
        width: '100%', padding: '18px 24px', borderRadius: 9999,
        border: 'none', background: '#F5EDE3', color: '#1A1A1A',
        fontFamily: "'Space Grotesk', system-ui, sans-serif",
        fontWeight: 700, fontSize: 15, cursor: 'pointer',
      }}
    >
      {copied ? 'Copied!' : '＋ Bring a mate — drop the price again'}
    </button>
  );
}

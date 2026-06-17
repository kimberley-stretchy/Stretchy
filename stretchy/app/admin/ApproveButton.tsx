'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Props {
  applicationId: string;
  userId: string;
  name: string;
  specialty: string | null;
}

export function ApproveButton({ applicationId, userId, name, specialty }: Props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const approve = async () => {
    setLoading(true);
    await fetch('/api/admin/approve-host', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ applicationId, userId, name, specialty }),
    });
    setLoading(false);
    router.refresh();
  };

  return (
    <button
      onClick={approve}
      disabled={loading}
      style={{
        background: '#A535C7',
        color: '#F5EDE3',
        borderRadius: 9999,
        border: 'none',
        padding: '10px 20px',
        fontFamily: "'Space Grotesk', sans-serif",
        fontWeight: 700,
        fontSize: 14,
        cursor: loading ? 'not-allowed' : 'pointer',
        opacity: loading ? 0.6 : 1,
      }}
    >
      {loading ? 'Approving…' : 'Approve →'}
    </button>
  );
}

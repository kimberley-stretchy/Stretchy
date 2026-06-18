'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase';

const MONO: React.CSSProperties = { fontFamily: "'JetBrains Mono', monospace" };
const BODY: React.CSSProperties = { fontFamily: "'Space Grotesk', system-ui, sans-serif" };

type Tab = 'VETTING' | 'LIVE' | 'PAYOUTS';

interface Application {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  specialty: string | null;
  bio: string | null;
  instagram: string | null;
  created_at: string;
  status: string | null;
}

interface LiveSession {
  id: string;
  title: string;
  state: string;
  starts_at: string;
  min_attendees: number;
  host: { name: string } | null;
  holds: { count: number }[];
}

interface PayoutSession {
  id: string;
  title: string;
  host_target: number;
  starts_at: string;
  paid_out: boolean | null;
  host_paid_at: string | null;
  host: { name: string } | null;
}

function Pill({ children, color, bg }: { children: React.ReactNode; color: string; bg: string }) {
  return (
    <span
      style={{
        ...MONO,
        display: 'inline-block',
        background: bg,
        color,
        borderRadius: 999,
        padding: '4px 12px',
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: '0.12em',
      }}
    >
      {children}
    </span>
  );
}

export default function AdminPage() {
  const [tab, setTab] = useState<Tab>('VETTING');
  const [applications, setApplications] = useState<Application[]>([]);
  const [approvedIds, setApprovedIds] = useState<Set<string>>(new Set());
  const [rejectedIds, setRejectedIds] = useState<Set<string>>(new Set());
  const [liveSessions, setLiveSessions] = useState<LiveSession[]>([]);
  const [payoutSessions, setPayoutSessions] = useState<PayoutSession[]>([]);
  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const [paidSessionIds, setPaidSessionIds] = useState<Set<string>>(new Set());
  const [authorized, setAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const supabase = createClient();

    async function load() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        window.location.href = '/login';
        return;
      }

      const adminEmails = (process.env.NEXT_PUBLIC_ADMIN_EMAILS ?? '').split(',').map((e) => e.trim().toLowerCase());
      if (!adminEmails.includes(user.email?.toLowerCase() ?? '')) {
        setAuthorized(false);
        return;
      }

      setAuthorized(true);

      const [appsRes, hostsRes, liveRes, payoutsRes] = await Promise.all([
        supabase.from('host_applications').select('*').order('created_at', { ascending: false }),
        supabase.from('hosts').select('auth_user_id, status'),
        supabase
          .from('sessions')
          .select('*, host:hosts(name), holds(count)')
          .in('state', ['open', 'confirmed'])
          .order('starts_at'),
        supabase
          .from('sessions')
          .select('*, host:hosts(name)')
          .eq('state', 'confirmed')
          .order('starts_at'),
      ]);

      setApplications(appsRes.data ?? []);

      const hosts = hostsRes.data ?? [];
      const approved = new Set(hosts.filter((h) => h.status !== 'rejected').map((h) => h.auth_user_id));
      const rejected = new Set(hosts.filter((h) => h.status === 'rejected').map((h) => h.auth_user_id));
      setApprovedIds(approved);
      setRejectedIds(rejected);

      setLiveSessions((liveRes.data as LiveSession[]) ?? []);
      setPayoutSessions((payoutsRes.data as PayoutSession[]) ?? []);
    }

    load();
  }, []);

  async function handleApprove(app: Application) {
    setLoadingAction(app.id + '-approve');
    await fetch('/api/admin/approve-host', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        applicationId: app.id,
        userId: app.user_id,
        name: app.full_name,
        specialty: app.specialty,
      }),
    });
    setApprovedIds((prev) => new Set([...prev, app.user_id]));
    setLoadingAction(null);
  }

  async function handleReject(app: Application) {
    setLoadingAction(app.id + '-reject');
    await fetch('/api/admin/reject-host', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ applicationId: app.id }),
    });
    setRejectedIds((prev) => new Set([...prev, app.user_id]));
    setLoadingAction(null);
  }

  async function handleMarkPaid(sessionId: string) {
    setLoadingAction(sessionId + '-pay');
    const res = await fetch(`/api/admin/payouts/${sessionId}`, { method: 'POST' });
    if (res.ok) {
      setPaidSessionIds((prev) => new Set([...prev, sessionId]));
    }
    setLoadingAction(null);
  }

  const totalPendingPayout = payoutSessions.reduce((sum, s) => sum + (s.host_target ?? 0), 0);

  if (authorized === null) {
    return (
      <div style={{ background: '#F5EDE3', minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ ...MONO, fontSize: 12, color: 'rgba(26,26,26,0.5)', letterSpacing: '0.1em' }}>LOADING…</span>
      </div>
    );
  }

  if (authorized === false) {
    return (
      <div style={{ background: '#F5EDE3', minHeight: '100dvh', padding: 48, ...BODY, color: '#1A1A1A' }}>
        <h1>Access denied.</h1>
      </div>
    );
  }

  return (
    <div style={{ background: '#F5EDE3', minHeight: '100dvh', ...BODY }}>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '56px 24px' }}>
        <div style={{ ...MONO, fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', color: '#A535C7', marginBottom: 8 }}>
          ADMIN
        </div>
        <h1
          style={{
            ...BODY,
            fontWeight: 700,
            fontSize: 32,
            letterSpacing: '-0.025em',
            margin: '0 0 32px',
            color: '#1A1A1A',
          }}
        >
          Dashboard
        </h1>

        <div style={{ display: 'flex', gap: 8, marginBottom: 28 }}>
          {(['VETTING', 'LIVE', 'PAYOUTS'] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                ...MONO,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.14em',
                padding: '10px 18px',
                borderRadius: 999,
                border: tab === t ? '2px solid #1A1A1A' : '1.5px solid rgba(26,26,26,0.15)',
                background: tab === t ? '#1A1A1A' : 'transparent',
                color: tab === t ? '#F5EDE3' : 'rgba(26,26,26,0.55)',
                cursor: 'pointer',
              }}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === 'VETTING' && (
          <div>
            {applications.length === 0 ? (
              <p style={{ color: '#666' }}>No applications yet.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {applications.map((app) => {
                  const isApproved = approvedIds.has(app.user_id);
                  const isRejected = rejectedIds.has(app.user_id);
                  const isPending = !isApproved && !isRejected;

                  return (
                    <div
                      key={app.id}
                      style={{
                        background: '#FFFFFF',
                        borderRadius: 20,
                        padding: 20,
                        border: isApproved
                          ? '1.5px solid #7A8330'
                          : isRejected
                          ? '1.5px solid rgba(230,57,70,0.3)'
                          : '1.5px solid rgba(26,26,26,0.08)',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          justifyContent: 'space-between',
                          gap: 16,
                        }}
                      >
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 700, fontSize: 17, color: '#1A1A1A', marginBottom: 4 }}>
                            {app.full_name}
                          </div>
                          <div
                            style={{
                              ...MONO,
                              fontSize: 11,
                              color: '#888',
                              letterSpacing: '0.06em',
                              marginBottom: 8,
                            }}
                          >
                            {app.email} · {app.specialty ?? 'no specialty'} ·{' '}
                            {new Date(app.created_at).toLocaleDateString('en-NZ', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </div>
                          {app.bio && (
                            <p style={{ margin: '0 0 8px', fontSize: 14, color: '#555', lineHeight: 1.5 }}>
                              {app.bio}
                            </p>
                          )}
                          {app.instagram && (
                            <div style={{ ...MONO, fontSize: 11, color: '#A535C7', letterSpacing: '0.06em' }}>
                              @{app.instagram}
                            </div>
                          )}
                        </div>
                        <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-end' }}>
                          {isApproved && (
                            <div
                              style={{
                                background: '#7A8330',
                                color: '#F5EDE3',
                                borderRadius: 9999,
                                padding: '8px 16px',
                                ...MONO,
                                fontSize: 11,
                                fontWeight: 700,
                                letterSpacing: '0.1em',
                              }}
                            >
                              ✓ APPROVED
                            </div>
                          )}
                          {isRejected && (
                            <div
                              style={{
                                background: 'rgba(230,57,70,0.10)',
                                color: '#E63946',
                                borderRadius: 9999,
                                padding: '8px 16px',
                                ...MONO,
                                fontSize: 11,
                                fontWeight: 700,
                                letterSpacing: '0.1em',
                              }}
                            >
                              ✕ REJECTED
                            </div>
                          )}
                          {isPending && (
                            <div style={{ display: 'flex', gap: 8 }}>
                              <button
                                onClick={() => handleReject(app)}
                                disabled={loadingAction !== null}
                                style={{
                                  background: 'transparent',
                                  color: '#E63946',
                                  border: '1.5px solid #E63946',
                                  borderRadius: 9999,
                                  padding: '9px 16px',
                                  ...BODY,
                                  fontWeight: 700,
                                  fontSize: 13,
                                  cursor: loadingAction ? 'not-allowed' : 'pointer',
                                  opacity: loadingAction === app.id + '-reject' ? 0.5 : 1,
                                }}
                              >
                                {loadingAction === app.id + '-reject' ? 'Rejecting…' : 'Reject'}
                              </button>
                              <button
                                onClick={() => handleApprove(app)}
                                disabled={loadingAction !== null}
                                style={{
                                  background: '#A535C7',
                                  color: '#F5EDE3',
                                  borderRadius: 9999,
                                  border: 'none',
                                  padding: '10px 20px',
                                  ...BODY,
                                  fontWeight: 700,
                                  fontSize: 14,
                                  cursor: loadingAction ? 'not-allowed' : 'pointer',
                                  opacity: loadingAction === app.id + '-approve' ? 0.5 : 1,
                                }}
                              >
                                {loadingAction === app.id + '-approve' ? 'Approving…' : 'Approve →'}
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {tab === 'LIVE' && (
          <div>
            {liveSessions.length === 0 ? (
              <p style={{ color: '#666' }}>No live sessions.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {liveSessions.map((s) => {
                  const holdCount = s.holds?.[0]?.count ?? 0;
                  const isConfirmed = s.state === 'confirmed';
                  const dateStr = new Date(s.starts_at).toLocaleDateString('en-NZ', {
                    weekday: 'short',
                    day: 'numeric',
                    month: 'short',
                    hour: 'numeric',
                    minute: '2-digit',
                  });

                  return (
                    <div
                      key={s.id}
                      style={{
                        background: '#FFFFFF',
                        borderRadius: 20,
                        padding: '18px 20px',
                        border: '1.5px solid rgba(26,26,26,0.08)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 16,
                      }}
                    >
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 700, fontSize: 16, color: '#1A1A1A', marginBottom: 3 }}>
                          {s.title}
                        </div>
                        <div style={{ ...MONO, fontSize: 11, color: '#888', letterSpacing: '0.04em' }}>
                          {s.host?.name ?? 'Unknown host'} · {dateStr}
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                        <div style={{ ...MONO, fontSize: 12, color: 'rgba(26,26,26,0.6)', letterSpacing: '0.04em' }}>
                          {holdCount}/{s.min_attendees}
                        </div>
                        <Pill
                          color="#FFFFFF"
                          bg={isConfirmed ? '#4CAF82' : '#FF6B35'}
                        >
                          {isConfirmed ? 'CONFIRMED' : 'OPEN'}
                        </Pill>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {tab === 'PAYOUTS' && (
          <div>
            <div
              style={{
                background: '#FFD166',
                borderRadius: 24,
                padding: 22,
                marginBottom: 20,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ ...MONO, fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', marginBottom: 4 }}>
                  TOTAL PENDING PAYOUT
                </div>
                <div
                  style={{
                    fontFamily: "'Bagel Fat One', system-ui, sans-serif",
                    fontSize: 48,
                    lineHeight: 0.9,
                    letterSpacing: '-0.02em',
                    color: '#1A1A1A',
                  }}
                >
                  ${totalPendingPayout}
                </div>
              </div>
              <div style={{ ...MONO, fontSize: 13, color: 'rgba(26,26,26,0.55)' }}>
                {payoutSessions.length} sessions
              </div>
            </div>

            {payoutSessions.length === 0 ? (
              <p style={{ color: '#666' }}>No confirmed sessions to pay out.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {payoutSessions.map((s) => {
                  const dateStr = new Date(s.starts_at).toLocaleDateString('en-NZ', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  });

                  return (
                    <div
                      key={s.id}
                      style={{
                        background: '#FFFFFF',
                        borderRadius: 20,
                        padding: '18px 20px',
                        border: '1.5px solid rgba(26,26,26,0.08)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 16,
                      }}
                    >
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 700, fontSize: 16, color: '#1A1A1A', marginBottom: 3 }}>
                          {s.title}
                        </div>
                        <div style={{ ...MONO, fontSize: 11, color: '#888', letterSpacing: '0.04em' }}>
                          {s.host?.name ?? 'Unknown host'} · {dateStr}
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                        <span
                          style={{
                            background: '#FFD166',
                            color: '#1A1A1A',
                            borderRadius: 10,
                            padding: '5px 12px',
                            ...MONO,
                            fontSize: 12,
                            fontWeight: 700,
                          }}
                        >
                          ${s.host_target}
                        </span>
                        {paidSessionIds.has(s.id) || s.host_paid_at ? (
                          <div
                            style={{
                              background: '#7A8330',
                              color: '#F5EDE3',
                              borderRadius: 9999,
                              padding: '9px 16px',
                              ...MONO,
                              fontSize: 11,
                              fontWeight: 700,
                              letterSpacing: '0.1em',
                            }}
                          >
                            ✓ PAID
                          </div>
                        ) : (
                          <button
                            onClick={() => handleMarkPaid(s.id)}
                            disabled={loadingAction !== null}
                            style={{
                              background: '#1A1A1A',
                              color: '#F5EDE3',
                              border: 'none',
                              borderRadius: 999,
                              padding: '9px 16px',
                              ...BODY,
                              fontWeight: 700,
                              fontSize: 13,
                              cursor: loadingAction ? 'not-allowed' : 'pointer',
                              opacity: loadingAction === s.id + '-pay' ? 0.5 : 1,
                            }}
                          >
                            {loadingAction === s.id + '-pay' ? 'Marking…' : 'Mark as paid'}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

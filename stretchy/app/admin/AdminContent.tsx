'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase';

const MONO: React.CSSProperties = { fontFamily: "'JetBrains Mono', monospace" };
const BODY: React.CSSProperties = { fontFamily: "'Space Grotesk', system-ui, sans-serif" };

type Tab = 'VETTING' | 'LIVE' | 'PAYOUTS' | 'SUGGESTIONS' | 'FINANCES' | 'ATTENDEES' | 'HOSTS' | 'ANALYTICS';

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

interface Suggestion {
  id: string;
  session_type: string;
  preferred_neighbourhood: string | null;
  preferred_time: string | null;
  notes: string | null;
  vote_count: number;
  created_at: string;
  suggested_by_id: string | null;
}

interface Hold {
  id: string;
  amount_charged_nzd: number | null;
  state: string;
  created_at: string;
  session: { title: string }[] | { title: string } | null;
}

interface FinanceSession {
  id: string;
  title: string;
  state: string;
  host_paid_at: string | null;
}

interface Attendee {
  id: string;
  name: string | null;
  email: string | null;
  stripe_pm_id: string | null;
  created_at: string;
  neighbourhood: string | null;
  sessions_attended: number | null;
}

interface Host {
  id: string;
  name: string;
  email: string | null;
  vetting_status: string | null;
  created_at: string;
  sessions_hosted: number | null;
  rating_average: number | null;
  rating_count: number | null;
}

interface AnalyticsData {
  totalSessions: number;
  sessionsByState: Record<string, number>;
  totalHolds: number;
  confirmedHolds: number;
  totalAttendees: number;
  totalHosts: number;
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

function sessionTypePillColors(type: string): { bg: string; color: string } {
  const t = type.toLowerCase();
  if (t.includes('yoga')) return { bg: '#A535C7', color: '#FFFFFF' };
  if (t.includes('pilates')) return { bg: '#2A3FE0', color: '#FFFFFF' };
  if (t.includes('sound')) return { bg: '#4FB8E0', color: '#FFFFFF' };
  if (t.includes('breath')) return { bg: '#7A8330', color: '#FFFFFF' };
  if (t.includes('flow')) return { bg: '#FF6B35', color: '#FFFFFF' };
  if (t.includes('run')) return { bg: '#E63946', color: '#FFFFFF' };
  if (t.includes('hiit')) return { bg: '#2C8FE0', color: '#FFFFFF' };
  return { bg: '#1A1A1A', color: '#F5EDE3' };
}

function StarRating({ rating, count }: { rating: number | null; count: number | null }) {
  if (rating === null) return <span style={{ ...MONO, fontSize: 11, color: '#999' }}>No ratings</span>;
  const stars = Math.round(rating);
  return (
    <span style={{ ...MONO, fontSize: 12, color: '#1A1A1A' }}>
      {'★'.repeat(stars)}{'☆'.repeat(5 - stars)} <span style={{ color: '#888' }}>({count ?? 0})</span>
    </span>
  );
}

export function AdminContent({ appMenuButton }: { appMenuButton: React.ReactNode }) {
  const [tab, setTab] = useState<Tab>('VETTING');
  const [applications, setApplications] = useState<Application[]>([]);
  const [approvedIds, setApprovedIds] = useState<Set<string>>(new Set());
  const [rejectedIds, setRejectedIds] = useState<Set<string>>(new Set());
  const [liveSessions, setLiveSessions] = useState<LiveSession[]>([]);
  const [payoutSessions, setPayoutSessions] = useState<PayoutSession[]>([]);
  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const [paidSessionIds, setPaidSessionIds] = useState<Set<string>>(new Set());
  const [authorized, setAuthorized] = useState<boolean | null>(null);

  // New tab state
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [chargedHolds, setChargedHolds] = useState<Hold[]>([]);
  const [financeSessions, setFinanceSessions] = useState<FinanceSession[]>([]);
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [hosts, setHosts] = useState<Host[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);

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

      const [appsRes, hostsStatusRes, liveRes, payoutsRes, suggestionsRes, chargedHoldsRes, financeSessionsRes, attendeesRes, hostsRes, allSessionsRes, allHoldsRes, allAttendeesRes, allHostsRes] = await Promise.all([
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
        // SUGGESTIONS
        supabase
          .from('suggestions')
          .select('*')
          .order('vote_count', { ascending: false }),
        // FINANCES - charged holds
        supabase
          .from('holds')
          .select('id, amount_charged_nzd, state, created_at, session:sessions(title)')
          .eq('state', 'charged')
          .order('created_at', { ascending: false })
          .limit(50),
        // FINANCES - sessions
        supabase
          .from('sessions')
          .select('id, title, state, host_paid_at')
          .in('state', ['confirmed', 'completed']),
        // ATTENDEES
        supabase
          .from('attendees')
          .select('*')
          .order('created_at', { ascending: false }),
        // HOSTS
        supabase
          .from('hosts')
          .select('id, name, email, vetting_status, created_at, sessions_hosted, rating_average, rating_count')
          .order('created_at', { ascending: false }),
        // ANALYTICS - all sessions
        supabase.from('sessions').select('id, state'),
        // ANALYTICS - all holds
        supabase.from('holds').select('id, state'),
        // ANALYTICS - attendees count
        supabase.from('attendees').select('id'),
        // ANALYTICS - hosts count
        supabase.from('hosts').select('id'),
      ]);

      setApplications(appsRes.data ?? []);

      const hostStatuses = hostsStatusRes.data ?? [];
      const approved = new Set(hostStatuses.filter((h) => h.status !== 'rejected').map((h) => h.auth_user_id));
      const rejected = new Set(hostStatuses.filter((h) => h.status === 'rejected').map((h) => h.auth_user_id));
      setApprovedIds(approved);
      setRejectedIds(rejected);

      setLiveSessions((liveRes.data as LiveSession[]) ?? []);
      setPayoutSessions((payoutsRes.data as PayoutSession[]) ?? []);

      setSuggestions((suggestionsRes.data as Suggestion[]) ?? []);
      setChargedHolds((chargedHoldsRes.data as Hold[]) ?? []);
      setFinanceSessions((financeSessionsRes.data as FinanceSession[]) ?? []);
      setAttendees((attendeesRes.data as Attendee[]) ?? []);
      setHosts((hostsRes.data as Host[]) ?? []);

      // Build analytics
      const allSessions = allSessionsRes.data ?? [];
      const allHolds = allHoldsRes.data ?? [];
      const sessionsByState: Record<string, number> = {};
      for (const s of allSessions) {
        sessionsByState[s.state] = (sessionsByState[s.state] ?? 0) + 1;
      }
      const confirmedHolds = allHolds.filter((h) => h.state === 'charged').length;
      setAnalytics({
        totalSessions: allSessions.length,
        sessionsByState,
        totalHolds: allHolds.length,
        confirmedHolds,
        totalAttendees: allAttendeesRes.data?.length ?? 0,
        totalHosts: allHostsRes.data?.length ?? 0,
      });
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

  const totalChargedNzd = chargedHolds.reduce((sum, h) => sum + ((h.amount_charged_nzd ?? 0) / 100), 0);
  const pendingHostPayouts = financeSessions.filter((s) => s.state === 'confirmed' && !s.host_paid_at).length;
  const confirmedOrCompletedCount = financeSessions.length;

  const STATE_COLORS: Record<string, { bg: string; color: string }> = {
    open: { bg: '#FF6B35', color: '#FFFFFF' },
    confirmed: { bg: '#4CAF82', color: '#FFFFFF' },
    cancelled: { bg: '#E63946', color: '#FFFFFF' },
    completed: { bg: '#2C8FE0', color: '#FFFFFF' },
  };

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

  const ALL_TABS: Tab[] = ['VETTING', 'LIVE', 'PAYOUTS', 'SUGGESTIONS', 'FINANCES', 'ATTENDEES', 'HOSTS', 'ANALYTICS'];

  function tabLabel(t: Tab): string {
    if (t === 'SUGGESTIONS') return `SUGGESTIONS ${suggestions.length > 0 ? `(${suggestions.length})` : ''}`;
    if (t === 'ATTENDEES') return `ATTENDEES ${attendees.length > 0 ? `(${attendees.length})` : ''}`;
    if (t === 'HOSTS') return `HOSTS ${hosts.length > 0 ? `(${hosts.length})` : ''}`;
    return t;
  }

  return (
    <div style={{ background: '#F5EDE3', minHeight: '100dvh', ...BODY }}>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '56px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <div style={{ ...MONO, fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', color: '#A535C7' }}>
            ADMIN
          </div>
          {appMenuButton}
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

        <div
          style={{
            display: 'flex',
            gap: 8,
            marginBottom: 28,
            overflowX: 'auto',
            paddingBottom: 4,
            scrollbarWidth: 'none',
          }}
        >
          {ALL_TABS.map((t) => (
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
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              {tabLabel(t)}
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

        {tab === 'SUGGESTIONS' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <h2 style={{ ...BODY, fontSize: 20, fontWeight: 700, color: '#1A1A1A', margin: 0 }}>
                Community Requests
              </h2>
              <span
                style={{
                  background: '#A535C7',
                  color: '#FFFFFF',
                  borderRadius: 999,
                  padding: '3px 10px',
                  ...MONO,
                  fontSize: 11,
                  fontWeight: 700,
                }}
              >
                {suggestions.length}
              </span>
            </div>
            {suggestions.length === 0 ? (
              <p style={{ color: '#666' }}>No suggestions yet.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {suggestions.map((s) => {
                  const pillColors = sessionTypePillColors(s.session_type);
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
                        gap: 14,
                      }}
                    >
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6, flexWrap: 'wrap' }}>
                          <Pill color={pillColors.color} bg={pillColors.bg}>
                            {s.session_type.toUpperCase()}
                          </Pill>
                          {s.preferred_neighbourhood && (
                            <span style={{ ...MONO, fontSize: 11, color: '#555', letterSpacing: '0.06em' }}>
                              {s.preferred_neighbourhood}
                            </span>
                          )}
                          {s.preferred_time && (
                            <span style={{ ...MONO, fontSize: 11, color: '#888', letterSpacing: '0.06em' }}>
                              {s.preferred_time}
                            </span>
                          )}
                        </div>
                        {s.notes && (
                          <p
                            style={{
                              margin: 0,
                              fontSize: 13,
                              color: '#555',
                              lineHeight: 1.4,
                              overflow: 'hidden',
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                            }}
                          >
                            {s.notes}
                          </p>
                        )}
                      </div>
                      <div style={{ flexShrink: 0 }}>
                        <span
                          style={{
                            background: '#FFD166',
                            color: '#1A1A1A',
                            borderRadius: 999,
                            padding: '6px 14px',
                            ...MONO,
                            fontSize: 13,
                            fontWeight: 700,
                          }}
                        >
                          {s.vote_count} votes
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {tab === 'FINANCES' && (
          <div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: 14,
                marginBottom: 28,
              }}
            >
              {/* Yellow: Total fees */}
              <div
                style={{
                  background: '#FFD166',
                  borderRadius: 20,
                  padding: 20,
                }}
              >
                <div style={{ ...MONO, fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', marginBottom: 8, color: 'rgba(26,26,26,0.6)' }}>
                  TOTAL FEES COLLECTED
                </div>
                <div style={{ fontWeight: 700, fontSize: 32, color: '#1A1A1A', letterSpacing: '-0.02em' }}>
                  ${confirmedOrCompletedCount * 23}
                </div>
                <div style={{ ...MONO, fontSize: 11, color: 'rgba(26,26,26,0.5)', marginTop: 4 }}>
                  {confirmedOrCompletedCount} sessions × $23
                </div>
              </div>

              {/* Blue: Total charged */}
              <div
                style={{
                  background: '#2C8FE0',
                  borderRadius: 20,
                  padding: 20,
                }}
              >
                <div style={{ ...MONO, fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', marginBottom: 8, color: 'rgba(255,255,255,0.7)' }}>
                  TOTAL CHARGED TO ATTENDEES
                </div>
                <div style={{ fontWeight: 700, fontSize: 32, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
                  ${totalChargedNzd.toFixed(2)}
                </div>
                <div style={{ ...MONO, fontSize: 11, color: 'rgba(255,255,255,0.6)', marginTop: 4 }}>
                  {chargedHolds.length} charged holds
                </div>
              </div>

              {/* Orange: Pending payouts */}
              <div
                style={{
                  background: '#FF6B35',
                  borderRadius: 20,
                  padding: 20,
                }}
              >
                <div style={{ ...MONO, fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', marginBottom: 8, color: 'rgba(255,255,255,0.7)' }}>
                  PENDING HOST PAYOUTS
                </div>
                <div style={{ fontWeight: 700, fontSize: 32, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
                  {pendingHostPayouts}
                </div>
                <div style={{ ...MONO, fontSize: 11, color: 'rgba(255,255,255,0.6)', marginTop: 4 }}>
                  confirmed, unpaid sessions
                </div>
              </div>
            </div>

            <h3 style={{ ...MONO, fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', color: '#888', marginBottom: 12 }}>
              RECENT CHARGES
            </h3>
            {chargedHolds.length === 0 ? (
              <p style={{ color: '#666' }}>No charged holds yet.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {chargedHolds.slice(0, 20).map((h) => {
                  const dateStr = new Date(h.created_at).toLocaleDateString('en-NZ', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  });
                  const sessionTitle = Array.isArray(h.session)
                    ? (h.session[0] as { title: string } | undefined)?.title
                    : (h.session as { title: string } | null)?.title;
                  return (
                    <div
                      key={h.id}
                      style={{
                        background: '#FFFFFF',
                        borderRadius: 16,
                        padding: '14px 18px',
                        border: '1.5px solid rgba(26,26,26,0.08)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 12,
                      }}
                    >
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 600, fontSize: 14, color: '#1A1A1A', marginBottom: 2 }}>
                          {sessionTitle ?? 'Unknown session'}
                        </div>
                        <div style={{ ...MONO, fontSize: 11, color: '#888', letterSpacing: '0.04em' }}>{dateStr}</div>
                      </div>
                      <span
                        style={{
                          background: '#2C8FE0',
                          color: '#FFFFFF',
                          borderRadius: 10,
                          padding: '4px 12px',
                          ...MONO,
                          fontSize: 12,
                          fontWeight: 700,
                        }}
                      >
                        ${((h.amount_charged_nzd ?? 0) / 100).toFixed(2)}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {tab === 'ATTENDEES' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <h2 style={{ ...BODY, fontSize: 20, fontWeight: 700, color: '#1A1A1A', margin: 0 }}>
                Attendees
              </h2>
              <span
                style={{
                  background: '#2C8FE0',
                  color: '#FFFFFF',
                  borderRadius: 999,
                  padding: '3px 10px',
                  ...MONO,
                  fontSize: 11,
                  fontWeight: 700,
                }}
              >
                {attendees.length}
              </span>
            </div>
            {attendees.length === 0 ? (
              <p style={{ color: '#666' }}>No attendees yet.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {attendees.map((a) => {
                  const dateStr = new Date(a.created_at).toLocaleDateString('en-NZ', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  });
                  return (
                    <div
                      key={a.id}
                      style={{
                        background: '#FFFFFF',
                        borderRadius: 16,
                        padding: '14px 18px',
                        border: '1.5px solid rgba(26,26,26,0.08)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 14,
                      }}
                    >
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 600, fontSize: 15, color: '#1A1A1A', marginBottom: 2 }}>
                          {a.name ?? '—'}
                          {a.stripe_pm_id && (
                            <span
                              style={{
                                marginLeft: 8,
                                ...MONO,
                                fontSize: 10,
                                color: '#7A8330',
                                fontWeight: 700,
                              }}
                            >
                              ✓ CARD
                            </span>
                          )}
                        </div>
                        <div style={{ ...MONO, fontSize: 11, color: '#888', letterSpacing: '0.04em' }}>
                          {a.email ?? '—'}
                          {a.neighbourhood ? ` · ${a.neighbourhood}` : ''}
                          {' · '}joined {dateStr}
                        </div>
                      </div>
                      <div style={{ flexShrink: 0, textAlign: 'right' }}>
                        <div
                          style={{
                            background: '#F5EDE3',
                            borderRadius: 10,
                            padding: '5px 12px',
                            ...MONO,
                            fontSize: 12,
                            fontWeight: 700,
                            color: '#1A1A1A',
                          }}
                        >
                          {a.sessions_attended ?? 0} sessions
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {tab === 'HOSTS' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <h2 style={{ ...BODY, fontSize: 20, fontWeight: 700, color: '#1A1A1A', margin: 0 }}>
                Hosts
              </h2>
              <span
                style={{
                  background: '#1A1A1A',
                  color: '#F5EDE3',
                  borderRadius: 999,
                  padding: '3px 10px',
                  ...MONO,
                  fontSize: 11,
                  fontWeight: 700,
                }}
              >
                {hosts.length}
              </span>
            </div>
            {hosts.length === 0 ? (
              <p style={{ color: '#666' }}>No hosts yet.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {hosts.map((h) => {
                  const dateStr = new Date(h.created_at).toLocaleDateString('en-NZ', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  });
                  const vettingStatus = h.vetting_status ?? 'pending';
                  const statusStyle =
                    vettingStatus === 'approved'
                      ? { bg: '#7A8330', color: '#FFFFFF' }
                      : vettingStatus === 'rejected'
                      ? { bg: '#E63946', color: '#FFFFFF' }
                      : { bg: '#FF6B35', color: '#FFFFFF' };

                  return (
                    <div
                      key={h.id}
                      style={{
                        background: '#FFFFFF',
                        borderRadius: 20,
                        padding: '18px 20px',
                        border: '1.5px solid rgba(26,26,26,0.08)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 14,
                      }}
                    >
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 700, fontSize: 16, color: '#1A1A1A', marginBottom: 4 }}>
                          {h.name}
                        </div>
                        <div style={{ ...MONO, fontSize: 11, color: '#888', letterSpacing: '0.04em', marginBottom: 6 }}>
                          {h.email ?? '—'} · joined {dateStr}
                        </div>
                        <StarRating rating={h.rating_average} count={h.rating_count} />
                      </div>
                      <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
                        <Pill color={statusStyle.color} bg={statusStyle.bg}>
                          {vettingStatus.toUpperCase()}
                        </Pill>
                        <span style={{ ...MONO, fontSize: 11, color: '#888' }}>
                          {h.sessions_hosted ?? 0} sessions
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {tab === 'ANALYTICS' && analytics && (
          <div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 14,
              }}
            >
              {/* Total sessions */}
              <div style={{ background: '#FFFFFF', borderRadius: 20, padding: 22, border: '1.5px solid rgba(26,26,26,0.08)' }}>
                <div style={{ ...MONO, fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', color: '#888', marginBottom: 10 }}>
                  TOTAL SESSIONS
                </div>
                <div style={{ fontWeight: 700, fontSize: 40, color: '#1A1A1A', letterSpacing: '-0.02em' }}>
                  {analytics.totalSessions}
                </div>
              </div>

              {/* Sessions by state */}
              <div style={{ background: '#FFFFFF', borderRadius: 20, padding: 22, border: '1.5px solid rgba(26,26,26,0.08)' }}>
                <div style={{ ...MONO, fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', color: '#888', marginBottom: 10 }}>
                  BY STATE
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {Object.entries(analytics.sessionsByState).map(([state, count]) => {
                    const sc = STATE_COLORS[state] ?? { bg: '#888', color: '#FFF' };
                    return (
                      <span
                        key={state}
                        style={{
                          background: sc.bg,
                          color: sc.color,
                          borderRadius: 999,
                          padding: '4px 10px',
                          ...MONO,
                          fontSize: 11,
                          fontWeight: 700,
                        }}
                      >
                        {state} {count}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Total holds */}
              <div style={{ background: '#2C8FE0', borderRadius: 20, padding: 22 }}>
                <div style={{ ...MONO, fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.7)', marginBottom: 10 }}>
                  TOTAL HOLDS PLACED
                </div>
                <div style={{ fontWeight: 700, fontSize: 40, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
                  {analytics.totalHolds}
                </div>
              </div>

              {/* Hold conversion rate */}
              <div style={{ background: '#FFD166', borderRadius: 20, padding: 22 }}>
                <div style={{ ...MONO, fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', color: 'rgba(26,26,26,0.6)', marginBottom: 10 }}>
                  HOLD CONVERSION RATE
                </div>
                <div style={{ fontWeight: 700, fontSize: 40, color: '#1A1A1A', letterSpacing: '-0.02em' }}>
                  {analytics.totalHolds > 0
                    ? `${Math.round((analytics.confirmedHolds / analytics.totalHolds) * 100)}%`
                    : '—'}
                </div>
                <div style={{ ...MONO, fontSize: 11, color: 'rgba(26,26,26,0.5)', marginTop: 4 }}>
                  {analytics.confirmedHolds} charged / {analytics.totalHolds} total
                </div>
              </div>

              {/* Total attendees */}
              <div style={{ background: '#A535C7', borderRadius: 20, padding: 22 }}>
                <div style={{ ...MONO, fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.7)', marginBottom: 10 }}>
                  TOTAL ATTENDEES
                </div>
                <div style={{ fontWeight: 700, fontSize: 40, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
                  {analytics.totalAttendees}
                </div>
              </div>

              {/* Total hosts */}
              <div style={{ background: '#7A8330', borderRadius: 20, padding: 22 }}>
                <div style={{ ...MONO, fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.7)', marginBottom: 10 }}>
                  TOTAL HOSTS
                </div>
                <div style={{ fontWeight: 700, fontSize: 40, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
                  {analytics.totalHosts}
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === 'ANALYTICS' && !analytics && (
          <p style={{ color: '#666' }}>Loading analytics…</p>
        )}
      </div>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase';

const MONO = "'JetBrains Mono', monospace";
const BODY = "'Space Grotesk', system-ui, sans-serif";
const DISPLAY = "'Bagel Fat One', system-ui, sans-serif";

const cream = '#F5EDE3';
const black = '#1A1A1A';
const yellow = '#FFD166';
const purple = '#A535C7';
const olive = '#7A8330';
const blue = '#2C8FE0';
const green = '#4CAF82';
const orange = '#FF6B35';
const hotPink = '#FF6B35';
const textDim = 'rgba(26,26,26,0.45)';
const AD_CARD = '1.5px solid rgba(26,26,26,0.08)';

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

function StatusPill({ children, color = black, bg }: { children: React.ReactNode; color?: string; bg?: string }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: '4px 9px', borderRadius: 999,
      background: bg ?? (color + '22'), color,
      fontFamily: MONO, fontSize: 10, fontWeight: 700, letterSpacing: '0.10em',
    }}>{children}</span>
  );
}

function sessionTypePillColors(type: string): { bg: string; color: string } {
  const t = type.toLowerCase();
  if (t.includes('yoga')) return { bg: purple, color: '#FFFFFF' };
  if (t.includes('pilates')) return { bg: '#2A3FE0', color: '#FFFFFF' };
  if (t.includes('sound')) return { bg: '#4FB8E0', color: '#FFFFFF' };
  if (t.includes('breath')) return { bg: olive, color: '#FFFFFF' };
  if (t.includes('flow')) return { bg: orange, color: '#FFFFFF' };
  if (t.includes('run')) return { bg: '#E63946', color: '#FFFFFF' };
  if (t.includes('hiit')) return { bg: blue, color: '#FFFFFF' };
  return { bg: black, color: cream };
}

function StarRating({ rating, count }: { rating: number | null; count: number | null }) {
  if (rating === null) return <span style={{ fontFamily: MONO, fontSize: 11, color: '#999' }}>No ratings</span>;
  const stars = Math.round(rating);
  return (
    <span style={{ fontFamily: MONO, fontSize: 12, color: black }}>
      {'★'.repeat(stars)}{'☆'.repeat(5 - stars)} <span style={{ color: '#888' }}>({count ?? 0})</span>
    </span>
  );
}

// Avatar circle with initial
function Avatar({ name, bg }: { name: string; bg: string }) {
  return (
    <div style={{
      width: 44, height: 44, borderRadius: 999, background: bg, color: '#FFFFFF',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: DISPLAY, fontSize: 18, flexShrink: 0,
    }}>{name[0]}</div>
  );
}

const AVATAR_COLORS = [purple, orange, olive, blue, green, '#4FB8E0', '#E63946', '#2A3FE0'];
function avatarColor(index: number) { return AVATAR_COLORS[index % AVATAR_COLORS.length]; }

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
    open: { bg: orange, color: '#FFFFFF' },
    confirmed: { bg: green, color: '#FFFFFF' },
    cancelled: { bg: '#E63946', color: '#FFFFFF' },
    completed: { bg: blue, color: '#FFFFFF' },
  };

  if (authorized === null) {
    return (
      <div style={{ background: cream, minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontFamily: MONO, fontSize: 12, color: 'rgba(26,26,26,0.5)', letterSpacing: '0.1em' }}>LOADING…</span>
      </div>
    );
  }

  if (authorized === false) {
    return (
      <div style={{ background: cream, minHeight: '100dvh', padding: 48, fontFamily: BODY, color: black }}>
        <h1>Access denied.</h1>
      </div>
    );
  }

  const ALL_TABS: Tab[] = ['VETTING', 'LIVE', 'PAYOUTS', 'SUGGESTIONS', 'FINANCES', 'ATTENDEES', 'HOSTS', 'ANALYTICS'];

  // Hero heading and subtext per tab
  const TAB_HERO: Record<Tab, { heading: React.ReactNode; subtext: string }> = {
    VETTING: {
      heading: <>Vetting<br />queue.</>,
      subtext: `${applications.length} IN QUEUE`,
    },
    LIVE: {
      heading: <>Everything,<br />everywhere.</>,
      subtext: `${liveSessions.length} LIVE · ${liveSessions.filter(s => s.state === 'open').length} NEEDS ATTENTION`,
    },
    PAYOUTS: {
      heading: <>Pay<br />them out.</>,
      subtext: `$${totalPendingPayout} TOTAL PENDING`,
    },
    SUGGESTIONS: {
      heading: <>What people<br />want next.</>,
      subtext: `${suggestions.length} LIVE · ${suggestions.reduce((s, x) => s + x.vote_count, 0)} TOTAL VOTES`,
    },
    FINANCES: {
      heading: <>The<br />numbers.</>,
      subtext: `MONTH TO DATE · NZD`,
    },
    ATTENDEES: {
      heading: <>The<br />community.</>,
      subtext: `${attendees.length} MEMBERS`,
    },
    HOSTS: {
      heading: <>The<br />team.</>,
      subtext: `${hosts.length} ACTIVE HOSTS`,
    },
    ANALYTICS: {
      heading: <>By the<br />numbers.</>,
      subtext: `${analytics?.totalSessions ?? 0} TOTAL SESSIONS`,
    },
  };

  const hero = TAB_HERO[tab];

  return (
    <div style={{ background: cream, minHeight: '100dvh', fontFamily: BODY, color: black, paddingBottom: 100 }}>

      {/* ── TopBar ── */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 50,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '12px 16px',
        background: cream,
        borderBottom: '1px solid rgba(26,26,26,0.06)',
      }}>
        {/* Back to host */}
        <a
          href="/host"
          style={{
            display: 'flex', alignItems: 'center', gap: 4,
            fontFamily: MONO, fontSize: 11, fontWeight: 700, letterSpacing: '0.10em',
            color: black, textDecoration: 'none', opacity: 0.6,
          }}
        >
          ← BACK
        </a>

        {/* Center pill */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '6px 12px', borderRadius: 999, background: black, color: cream,
          fontFamily: MONO, fontSize: 10, fontWeight: 700, letterSpacing: '0.14em',
        }}>
          <span style={{ width: 6, height: 6, borderRadius: 999, background: hotPink, flexShrink: 0 }} />
          STRETCHY HQ · {tab}
        </div>

        {/* Right: app menu */}
        {appMenuButton}
      </div>

      {/* ── Hero ── */}
      <div style={{ padding: '16px 22px 12px' }}>
        <p style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.20em', color: textDim, margin: 0 }}>
          {hero.subtext}
        </p>
        <h1 style={{
          fontFamily: DISPLAY, fontWeight: 700, fontSize: 52, lineHeight: 0.9,
          letterSpacing: '-0.03em', margin: '10px 0 0', color: black,
        }}>
          {hero.heading}
        </h1>
      </div>

      {/* ── Tab chips ── */}
      <div style={{
        display: 'flex', gap: 8,
        overflowX: 'auto', padding: '0 14px 16px',
        scrollbarWidth: 'none',
      }}>
        {ALL_TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              fontFamily: MONO,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.12em',
              padding: '8px 16px',
              borderRadius: 999,
              border: tab === t ? 'none' : '1.5px solid rgba(26,26,26,0.15)',
              background: tab === t ? black : '#FFFFFF',
              color: tab === t ? cream : black,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* ── VETTING ── */}
      {tab === 'VETTING' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '0 14px' }}>
          {applications.length === 0 ? (
            <p style={{ color: '#666', padding: '0 8px' }}>No applications yet.</p>
          ) : (
            applications.map((app, i) => {
              const isApproved = approvedIds.has(app.user_id);
              const isRejected = rejectedIds.has(app.user_id);
              const isPending = !isApproved && !isRejected;

              return (
                <div
                  key={app.id}
                  style={{
                    background: '#FFFFFF',
                    borderRadius: 24,
                    padding: 16,
                    border: isApproved
                      ? `1.5px solid ${olive}`
                      : isRejected
                      ? '1.5px solid rgba(230,57,70,0.3)'
                      : AD_CARD,
                    display: 'flex', flexDirection: 'column', gap: 12,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1, minWidth: 0 }}>
                      <Avatar name={app.full_name} bg={avatarColor(i)} />
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontWeight: 700, fontSize: 15 }}>{app.full_name}</div>
                        <div style={{ fontFamily: MONO, fontSize: 11, color: textDim, letterSpacing: '0.06em', marginTop: 2 }}>
                          {app.specialty ?? 'no specialty'} · {new Date(app.created_at).toLocaleDateString('en-NZ', { day: 'numeric', month: 'short' })}
                        </div>
                        {app.instagram && (
                          <div style={{ fontFamily: MONO, fontSize: 10, color: purple, marginTop: 2 }}>@{app.instagram}</div>
                        )}
                      </div>
                    </div>
                    <div style={{ flexShrink: 0 }}>
                      {isApproved && <StatusPill color={cream} bg={olive}>✓ APPROVED</StatusPill>}
                      {isRejected && <StatusPill color='#E63946' bg='rgba(230,57,70,0.10)'>✕ REJECTED</StatusPill>}
                      {isPending && <StatusPill color={black} bg={yellow}>PENDING</StatusPill>}
                    </div>
                  </div>
                  {app.bio && (
                    <p style={{ margin: 0, fontSize: 13, color: '#555', lineHeight: 1.5 }}>{app.bio}</p>
                  )}
                  <div style={{ fontFamily: MONO, fontSize: 10, color: textDim, letterSpacing: '0.06em' }}>
                    {app.email}
                  </div>
                  {isPending && (
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button
                        onClick={() => handleReject(app)}
                        disabled={loadingAction !== null}
                        style={{
                          flex: 1, background: 'transparent', color: '#E63946',
                          border: '1.5px solid #E63946', borderRadius: 999,
                          padding: '10px 0', fontFamily: BODY, fontWeight: 700, fontSize: 13,
                          cursor: loadingAction ? 'not-allowed' : 'pointer',
                          opacity: loadingAction === app.id + '-reject' ? 0.5 : 1,
                        }}
                      >
                        {loadingAction === app.id + '-reject' ? 'Rejecting…' : '✕ Reject'}
                      </button>
                      <button
                        onClick={() => handleApprove(app)}
                        disabled={loadingAction !== null}
                        style={{
                          flex: 1.5, background: olive, color: cream,
                          border: 'none', borderRadius: 999,
                          padding: '10px 0', fontFamily: BODY, fontWeight: 700, fontSize: 14,
                          cursor: loadingAction ? 'not-allowed' : 'pointer',
                          opacity: loadingAction === app.id + '-approve' ? 0.5 : 1,
                        }}
                      >
                        {loadingAction === app.id + '-approve' ? 'Approving…' : '✓ Approve'}
                      </button>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}

      {/* ── LIVE ── */}
      {tab === 'LIVE' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '0 14px' }}>
          {liveSessions.length === 0 ? (
            <p style={{ color: '#666', padding: '0 8px' }}>No live sessions.</p>
          ) : (
            liveSessions.map((s) => {
              const holdCount = s.holds?.[0]?.count ?? 0;
              const isConfirmed = s.state === 'confirmed';
              const dateStr = new Date(s.starts_at).toLocaleDateString('en-NZ', {
                weekday: 'short', day: 'numeric', month: 'short',
                hour: 'numeric', minute: '2-digit',
              });

              return (
                <div
                  key={s.id}
                  style={{
                    padding: '14px 16px', borderRadius: 20, background: '#FFFFFF',
                    border: AD_CARD,
                    display: 'flex', alignItems: 'center', gap: 12,
                  }}
                >
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                      <StatusPill
                        color={isConfirmed ? cream : black}
                        bg={isConfirmed ? green : yellow}
                      >
                        {isConfirmed ? 'CONFIRMED' : 'OPEN'}
                      </StatusPill>
                      <span style={{ fontFamily: MONO, fontSize: 10, color: textDim, letterSpacing: '0.08em' }}>{dateStr}</span>
                    </div>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{s.title}</div>
                    <div style={{ fontSize: 11, color: textDim, marginTop: 2 }}>
                      {s.host?.name ?? 'Unknown host'} · {holdCount}/{s.min_attendees} held
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* ── PAYOUTS ── */}
      {tab === 'PAYOUTS' && (
        <div>
          {/* Big yellow summary tile */}
          <div style={{
            margin: '0 14px 14px', padding: 22, borderRadius: 28,
            background: yellow, color: black,
          }}>
            <div style={{ fontFamily: MONO, fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', marginBottom: 4, color: 'rgba(26,26,26,0.6)' }}>
              TOTAL PENDING PAYOUT
            </div>
            <div style={{ fontFamily: DISPLAY, fontSize: 56, lineHeight: 0.9, letterSpacing: '-0.02em' }}>
              ${totalPendingPayout}
            </div>
            <div style={{ fontFamily: MONO, fontSize: 12, marginTop: 10, color: 'rgba(26,26,26,0.55)' }}>
              {payoutSessions.length} sessions
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '0 14px' }}>
            {payoutSessions.length === 0 ? (
              <p style={{ color: '#666' }}>No confirmed sessions to pay out.</p>
            ) : (
              payoutSessions.map((s) => {
                const dateStr = new Date(s.starts_at).toLocaleDateString('en-NZ', {
                  day: 'numeric', month: 'short', year: 'numeric',
                });

                return (
                  <div
                    key={s.id}
                    style={{
                      background: '#FFFFFF', borderRadius: 20, padding: '16px',
                      border: AD_CARD,
                      display: 'flex', alignItems: 'center', gap: 12,
                    }}
                  >
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 3 }}>{s.title}</div>
                      <div style={{ fontFamily: MONO, fontSize: 11, color: textDim, letterSpacing: '0.04em' }}>
                        {s.host?.name ?? 'Unknown host'} · {dateStr}
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                      <span style={{
                        background: yellow, color: black,
                        borderRadius: 10, padding: '5px 12px',
                        fontFamily: MONO, fontSize: 12, fontWeight: 700,
                      }}>
                        ${s.host_target}
                      </span>
                      {paidSessionIds.has(s.id) || s.host_paid_at ? (
                        <StatusPill color={cream} bg={olive}>✓ PAID</StatusPill>
                      ) : (
                        <button
                          onClick={() => handleMarkPaid(s.id)}
                          disabled={loadingAction !== null}
                          style={{
                            background: black, color: cream,
                            border: 'none', borderRadius: 999,
                            padding: '9px 16px', fontFamily: BODY, fontWeight: 700, fontSize: 13,
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
              })
            )}
          </div>
        </div>
      )}

      {/* ── SUGGESTIONS ── */}
      {tab === 'SUGGESTIONS' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '0 14px' }}>
          {suggestions.length === 0 ? (
            <p style={{ color: '#666' }}>No suggestions yet.</p>
          ) : (
            suggestions.map((s) => {
              const pillColors = sessionTypePillColors(s.session_type);
              const isHot = s.vote_count >= 20;
              return (
                <div
                  key={s.id}
                  style={{
                    padding: 16, borderRadius: 24, background: '#FFFFFF', border: AD_CARD,
                    display: 'flex', flexDirection: 'column', gap: 12,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{
                      width: 48, height: 48, borderRadius: 16, flexShrink: 0,
                      background: pillColors.bg,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: MONO, fontSize: 9, fontWeight: 700, color: pillColors.color, letterSpacing: '0.08em',
                    }}>
                      {s.session_type.slice(0, 3).toUpperCase()}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 4 }}>
                        <StatusPill color={pillColors.color} bg={pillColors.bg}>
                          {s.session_type.toUpperCase()}
                        </StatusPill>
                        {s.preferred_neighbourhood && (
                          <span style={{ fontFamily: MONO, fontSize: 10, color: textDim, letterSpacing: '0.06em' }}>
                            {s.preferred_neighbourhood}
                          </span>
                        )}
                        {s.preferred_time && (
                          <span style={{ fontFamily: MONO, fontSize: 10, color: textDim, letterSpacing: '0.06em' }}>
                            {s.preferred_time}
                          </span>
                        )}
                      </div>
                      {s.notes && (
                        <p style={{
                          margin: 0, fontSize: 13, color: '#555', lineHeight: 1.4,
                          overflow: 'hidden', display: '-webkit-box',
                          WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                        }}>
                          {s.notes}
                        </p>
                      )}
                    </div>
                    <div style={{
                      display: 'flex', alignItems: 'baseline',
                      padding: '6px 12px', borderRadius: 999, flexShrink: 0,
                      background: isHot ? hotPink : 'rgba(26,26,26,0.06)',
                      color: isHot ? cream : black,
                      fontFamily: DISPLAY, fontSize: 22, letterSpacing: '-0.02em',
                    }}>{s.vote_count}</div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* ── FINANCES ── */}
      {tab === 'FINANCES' && (
        <div>
          {/* Stats grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, padding: '0 14px 14px' }}>
            <div style={{ background: yellow, borderRadius: 20, padding: 18, gridColumn: '1 / -1' }}>
              <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', color: 'rgba(26,26,26,0.6)', marginBottom: 6 }}>
                STRETCHY FEES COLLECTED (EST.)
              </div>
              <div style={{ fontFamily: DISPLAY, fontSize: 48, lineHeight: 0.9, letterSpacing: '-0.02em', color: black }}>
                ${confirmedOrCompletedCount * 23}
              </div>
              <div style={{ fontFamily: MONO, fontSize: 11, color: 'rgba(26,26,26,0.5)', marginTop: 6 }}>
                {confirmedOrCompletedCount} sessions × $23
              </div>
            </div>

            <div style={{ background: '#FFFFFF', borderRadius: 20, padding: 16, border: AD_CARD }}>
              <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', color: textDim, marginBottom: 6 }}>
                TOTAL CHARGED
              </div>
              <div style={{ fontFamily: DISPLAY, fontSize: 32, lineHeight: 0.9, letterSpacing: '-0.02em', color: black }}>
                ${totalChargedNzd.toFixed(0)}
              </div>
              <div style={{ fontFamily: MONO, fontSize: 11, color: textDim, marginTop: 4 }}>
                {chargedHolds.length} holds
              </div>
            </div>

            <div style={{ background: '#FFFFFF', borderRadius: 20, padding: 16, border: `1.5px solid ${orange}33` }}>
              <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', color: orange, marginBottom: 6 }}>
                PENDING PAYOUTS
              </div>
              <div style={{ fontFamily: DISPLAY, fontSize: 32, lineHeight: 0.9, letterSpacing: '-0.02em', color: black }}>
                {pendingHostPayouts}
              </div>
              <div style={{ fontFamily: MONO, fontSize: 11, color: textDim, marginTop: 4 }}>
                unpaid sessions
              </div>
            </div>
          </div>

          <div style={{ padding: '4px 22px 10px' }}>
            <h3 style={{ fontFamily: MONO, fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', color: textDim, margin: 0 }}>
              RECENT CHARGES
            </h3>
          </div>

          <div style={{ margin: '0 14px', borderRadius: 24, background: '#FFFFFF', border: AD_CARD, overflow: 'hidden' }}>
            {chargedHolds.length === 0 ? (
              <p style={{ padding: 16, color: '#666', margin: 0 }}>No charged holds yet.</p>
            ) : (
              chargedHolds.slice(0, 20).map((h, i, arr) => {
                const dateStr = new Date(h.created_at).toLocaleDateString('en-NZ', {
                  day: 'numeric', month: 'short', year: 'numeric',
                });
                const sessionTitle = Array.isArray(h.session)
                  ? (h.session[0] as { title: string } | undefined)?.title
                  : (h.session as { title: string } | null)?.title;
                return (
                  <div
                    key={h.id}
                    style={{
                      padding: '14px 16px', display: 'flex',
                      justifyContent: 'space-between', alignItems: 'center',
                      borderBottom: i < arr.length - 1 ? '1px solid rgba(26,26,26,0.06)' : 'none',
                    }}
                  >
                    <div style={{ display: 'flex', gap: 10, alignItems: 'center', minWidth: 0 }}>
                      <span style={{ fontFamily: MONO, fontSize: 11, color: textDim, flexShrink: 0 }}>{dateStr}</span>
                      <span style={{ fontSize: 13, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {sessionTitle ?? 'Unknown session'}
                      </span>
                    </div>
                    <span style={{ fontFamily: MONO, fontSize: 13, fontWeight: 700, color: green, flexShrink: 0, marginLeft: 8 }}>
                      ${((h.amount_charged_nzd ?? 0) / 100).toFixed(2)}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* ── ATTENDEES ── */}
      {tab === 'ATTENDEES' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '0 14px' }}>
          {attendees.length === 0 ? (
            <p style={{ color: '#666' }}>No attendees yet.</p>
          ) : (
            attendees.map((a, i) => {
              const dateStr = new Date(a.created_at).toLocaleDateString('en-NZ', {
                day: 'numeric', month: 'short', year: 'numeric',
              });
              return (
                <div
                  key={a.id}
                  style={{
                    background: '#FFFFFF', borderRadius: 20, padding: '14px 16px',
                    border: AD_CARD,
                    display: 'flex', alignItems: 'center', gap: 12,
                  }}
                >
                  <Avatar name={a.name ?? '?'} bg={avatarColor(i)} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 2 }}>
                      {a.name ?? '—'}
                      {a.stripe_pm_id && (
                        <span style={{ marginLeft: 8, fontFamily: MONO, fontSize: 10, color: olive, fontWeight: 700 }}>
                          ✓ CARD
                        </span>
                      )}
                    </div>
                    <div style={{ fontFamily: MONO, fontSize: 11, color: textDim, letterSpacing: '0.04em' }}>
                      {a.email ?? '—'}
                      {a.neighbourhood ? ` · ${a.neighbourhood}` : ''}
                      {' · '}joined {dateStr}
                    </div>
                  </div>
                  <div style={{ flexShrink: 0, textAlign: 'right' }}>
                    <div style={{
                      background: cream, borderRadius: 10, padding: '5px 12px',
                      fontFamily: MONO, fontSize: 12, fontWeight: 700, color: black,
                    }}>
                      {a.sessions_attended ?? 0}
                    </div>
                    <div style={{ fontFamily: MONO, fontSize: 9, color: textDim, letterSpacing: '0.10em', marginTop: 2 }}>SESSIONS</div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* ── HOSTS ── */}
      {tab === 'HOSTS' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '0 14px' }}>
          {hosts.length === 0 ? (
            <p style={{ color: '#666' }}>No hosts yet.</p>
          ) : (
            hosts.map((h, i) => {
              const dateStr = new Date(h.created_at).toLocaleDateString('en-NZ', {
                day: 'numeric', month: 'short', year: 'numeric',
              });
              const vettingStatus = h.vetting_status ?? 'pending';
              const statusStyle =
                vettingStatus === 'approved'
                  ? { bg: olive, color: cream }
                  : vettingStatus === 'rejected'
                  ? { bg: '#E63946', color: '#FFFFFF' }
                  : { bg: orange, color: '#FFFFFF' };

              return (
                <div
                  key={h.id}
                  style={{
                    background: '#FFFFFF', borderRadius: 22, padding: 16,
                    border: AD_CARD,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <Avatar name={h.name} bg={avatarColor(i)} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 700, fontSize: 15 }}>{h.name}</div>
                      <div style={{ fontFamily: MONO, fontSize: 11, color: textDim, letterSpacing: '0.04em', marginTop: 2 }}>
                        {h.email ?? '—'} · joined {dateStr}
                      </div>
                    </div>
                    <StatusPill color={statusStyle.color} bg={statusStyle.bg}>
                      {vettingStatus.toUpperCase()}
                    </StatusPill>
                  </div>
                  <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
                    <StarRating rating={h.rating_average} count={h.rating_count} />
                    <div style={{ marginLeft: 'auto', fontFamily: MONO, fontSize: 11, color: textDim }}>
                      {h.sessions_hosted ?? 0} sessions
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* ── ANALYTICS ── */}
      {tab === 'ANALYTICS' && !analytics && (
        <p style={{ color: '#666', padding: '0 22px' }}>Loading analytics…</p>
      )}

      {tab === 'ANALYTICS' && analytics && (
        <div>
          {/* Big black hero tile */}
          <div style={{ margin: '0 14px 14px', padding: 22, borderRadius: 28, background: black, color: cream }}>
            <span style={{ fontFamily: MONO, fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', color: yellow }}>SESSIONS RUN</span>
            <div style={{ fontFamily: DISPLAY, fontSize: 72, lineHeight: 0.85, letterSpacing: '-0.03em', marginTop: 6 }}>
              {analytics.totalSessions}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, padding: '0 14px 14px' }}>
            {/* By state */}
            <div style={{ background: '#FFFFFF', borderRadius: 20, padding: 18, border: AD_CARD, gridColumn: '1 / -1' }}>
              <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', color: textDim, marginBottom: 10 }}>
                BY STATE
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {Object.entries(analytics.sessionsByState).map(([state, count]) => {
                  const sc = STATE_COLORS[state] ?? { bg: '#888', color: '#FFF' };
                  return (
                    <span
                      key={state}
                      style={{
                        background: sc.bg, color: sc.color,
                        borderRadius: 999, padding: '4px 10px',
                        fontFamily: MONO, fontSize: 11, fontWeight: 700,
                      }}
                    >
                      {state} {count}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Total holds */}
            <div style={{ background: blue, borderRadius: 20, padding: 18 }}>
              <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.7)', marginBottom: 8 }}>
                TOTAL HOLDS
              </div>
              <div style={{ fontFamily: DISPLAY, fontSize: 36, lineHeight: 0.9, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
                {analytics.totalHolds}
              </div>
            </div>

            {/* Hold conversion */}
            <div style={{ background: yellow, borderRadius: 20, padding: 18 }}>
              <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', color: 'rgba(26,26,26,0.6)', marginBottom: 8 }}>
                CONVERSION
              </div>
              <div style={{ fontFamily: DISPLAY, fontSize: 36, lineHeight: 0.9, color: black, letterSpacing: '-0.02em' }}>
                {analytics.totalHolds > 0
                  ? `${Math.round((analytics.confirmedHolds / analytics.totalHolds) * 100)}%`
                  : '—'}
              </div>
              <div style={{ fontFamily: MONO, fontSize: 11, color: 'rgba(26,26,26,0.5)', marginTop: 4 }}>
                {analytics.confirmedHolds}/{analytics.totalHolds}
              </div>
            </div>

            {/* Attendees */}
            <div style={{ background: purple, borderRadius: 20, padding: 18 }}>
              <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.7)', marginBottom: 8 }}>
                ATTENDEES
              </div>
              <div style={{ fontFamily: DISPLAY, fontSize: 36, lineHeight: 0.9, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
                {analytics.totalAttendees}
              </div>
            </div>

            {/* Hosts */}
            <div style={{ background: olive, borderRadius: 20, padding: 18 }}>
              <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.7)', marginBottom: 8 }}>
                HOSTS
              </div>
              <div style={{ fontFamily: DISPLAY, fontSize: 36, lineHeight: 0.9, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
                {analytics.totalHosts}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

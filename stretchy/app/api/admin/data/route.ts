import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';
import { createClient as createServiceClient } from '@supabase/supabase-js';

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS ?? '').split(',').map((e) => e.trim().toLowerCase()).filter(Boolean);

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user || !ADMIN_EMAILS.includes(user.email?.toLowerCase() ?? '')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const service = createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  const [
    appsRes,
    hostsStatusRes,
    liveRes,
    payoutsRes,
    suggestionsRes,
    chargedHoldsRes,
    financeSessionsRes,
    attendeesRes,
    hostsRes,
    allSessionsRes,
    allHoldsRes,
    allAttendeesRes,
    allHostsRes,
  ] = await Promise.all([
    service.from('host_applications').select('*').order('created_at', { ascending: false }),
    service.from('hosts').select('auth_user_id, status'),
    service.from('sessions').select('*, host:hosts(name), holds(count)').in('state', ['open', 'confirmed']).order('starts_at'),
    service.from('sessions').select('*, host:hosts(name)').eq('state', 'confirmed').order('starts_at'),
    service.from('suggestions').select('*').order('vote_count', { ascending: false }),
    service.from('holds').select('id, amount_charged_nzd, state, created_at, session:sessions(title)').eq('state', 'charged').order('created_at', { ascending: false }).limit(50),
    service.from('sessions').select('id, title, state, host_paid_at').in('state', ['confirmed', 'completed']),
    service.from('attendees').select('*').order('created_at', { ascending: false }),
    service.from('hosts').select('id, name, email, vetting_status, created_at, sessions_hosted, rating_average, rating_count').order('created_at', { ascending: false }),
    service.from('sessions').select('id, state'),
    service.from('holds').select('id, state'),
    service.from('attendees').select('id'),
    service.from('hosts').select('id'),
  ]);

  return NextResponse.json({
    applications: appsRes.data ?? [],
    hostsStatus: hostsStatusRes.data ?? [],
    liveSessions: liveRes.data ?? [],
    payoutSessions: payoutsRes.data ?? [],
    suggestions: suggestionsRes.data ?? [],
    chargedHolds: chargedHoldsRes.data ?? [],
    financeSessions: financeSessionsRes.data ?? [],
    attendees: attendeesRes.data ?? [],
    hosts: hostsRes.data ?? [],
    allSessions: allSessionsRes.data ?? [],
    allHolds: allHoldsRes.data ?? [],
    totalAttendees: allAttendeesRes.data?.length ?? 0,
    totalHosts: allHostsRes.data?.length ?? 0,
  });
}

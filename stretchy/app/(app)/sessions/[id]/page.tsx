import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase-server';
import { SessionDetailClient } from '@/components/app/SessionDetailClient';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function SessionDetailPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: session } = await supabase
    .from('sessions')
    .select('*, host:hosts(id, name, avatar_url, bio), holds(id, user_id, state)')
    .eq('id', id)
    .single();

  if (!session) notFound();

  const { data: { user } } = await supabase.auth.getUser();

  const userHold = session.holds?.find((h: { user_id: string }) => h.user_id === user?.id) ?? null;
  const holdCount = session.holds?.filter((h: { state: string }) => h.state === 'active').length ?? 0;

  const { data: attendee } = await supabase
    .from('attendees')
    .select('stripe_pm_id')
    .eq('auth_user_id', user!.id)
    .single();

  return (
    <SessionDetailClient
      session={session}
      userHold={userHold}
      holdCount={holdCount}
      userId={user?.id ?? ''}
      hasPaymentMethod={!!attendee?.stripe_pm_id}
    />
  );
}

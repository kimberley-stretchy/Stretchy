import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase-server';
import { BottomNav } from '@/components/app/BottomNav';

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const { data: host } = await supabase
    .from('hosts')
    .select('id')
    .eq('auth_user_id', user.id)
    .single();

  const adminEmails = (process.env.ADMIN_EMAILS ?? '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  const isAdmin = adminEmails.includes(user.email?.toLowerCase() ?? '');

  return (
    <div style={{ background: '#F5EDE3', minHeight: '100dvh', paddingBottom: 80 }}>
      {children}
      <BottomNav isHost={!!host} isAdmin={isAdmin} />
    </div>
  );
}

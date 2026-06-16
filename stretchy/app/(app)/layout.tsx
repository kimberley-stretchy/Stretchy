import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase-server';
import { BottomNav } from '@/components/app/BottomNav';

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  return (
    <div style={{ background: '#F5EDE3', minHeight: '100dvh', paddingBottom: 80 }}>
      {children}
      <BottomNav />
    </div>
  );
}

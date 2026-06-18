import { createClient } from '@/lib/supabase-server';
import { MenuButton } from './MenuButton';

interface Props {
  color?: string;
  size?: number;
}

export async function AppMenuButton({ color = '#1A1A1A', size = 32 }: Props) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const [{ data: attendee }, { data: host }] = await Promise.all([
    supabase.from('attendees').select('name').eq('auth_user_id', user.id).single(),
    supabase.from('hosts').select('id').eq('auth_user_id', user.id).single(),
  ]);

  return (
    <MenuButton
      userName={attendee?.name ?? user.email}
      userEmail={user.email}
      isHost={!!host}
      color={color}
      size={size}
    />
  );
}

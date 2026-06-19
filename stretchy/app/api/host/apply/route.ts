import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const { specialty, bio, instagram, teaches, basedInNz } = body;

  // Get name from attendees if not supplied
  const { data: attendee } = await supabase
    .from('attendees')
    .select('name')
    .eq('auth_user_id', user.id)
    .single();

  const fullName = attendee?.name ?? '';
  const email = user.email ?? '';

  const { error } = await supabase.from('host_applications').insert({
    user_id: user.id,
    email: email.toLowerCase(),
    full_name: fullName,
    specialty: teaches || specialty || null,
    bio: bio?.trim() || null,
    instagram: instagram?.trim() || null,
  });

  if (error) return NextResponse.json({ error: 'Failed to submit application' }, { status: 500 });

  return NextResponse.json({ ok: true });
}

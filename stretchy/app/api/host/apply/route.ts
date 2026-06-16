import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const { full_name, email, specialty, bio, instagram } = body;

  if (!full_name?.trim() || !email?.trim()) {
    return NextResponse.json({ error: 'Name and email required' }, { status: 400 });
  }

  const { error } = await supabase.from('host_applications').insert({
    user_id: user.id,
    email: email.trim().toLowerCase(),
    full_name: full_name.trim(),
    specialty: specialty || null,
    bio: bio?.trim() || null,
    instagram: instagram?.trim() || null,
  });

  if (error) return NextResponse.json({ error: 'Failed to submit application' }, { status: 500 });

  return NextResponse.json({ ok: true });
}

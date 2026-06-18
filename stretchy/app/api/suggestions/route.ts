import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { movementType, neighbourhood, dayOfWeek, timeOfDay, note } = await req.json();

  const { data: attendee } = await supabase
    .from('attendees')
    .select('id')
    .eq('auth_user_id', user.id)
    .single();

  const preferredTime = [dayOfWeek, timeOfDay].filter(Boolean).join(' ') || null;

  const { error } = await supabase.from('suggestions').insert({
    suggested_by_id: attendee?.id ?? null,
    session_type: movementType ?? null,
    preferred_neighbourhood: neighbourhood?.trim() || null,
    preferred_time: preferredTime,
    notes: note?.trim() || null,
  });

  if (error) {
    if (error.code === '42P01') {
      // Table not yet created — swallow gracefully
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json({ error: 'Failed to save suggestion' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

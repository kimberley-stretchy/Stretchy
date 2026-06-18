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

  const { error } = await supabase.from('suggestions').insert({
    user_id: user.id,
    movement_type: movementType ?? null,
    neighbourhood: neighbourhood?.trim() || null,
    day_of_week: dayOfWeek ?? null,
    time_of_day: timeOfDay ?? null,
    note: note?.trim() || null,
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

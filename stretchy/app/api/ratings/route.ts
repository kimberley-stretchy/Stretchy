import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { sessionId, stars, vibes, note } = await req.json();
  if (!sessionId) return NextResponse.json({ error: 'sessionId required' }, { status: 400 });
  if (!stars || stars < 1 || stars > 5)
    return NextResponse.json({ error: 'stars must be 1–5' }, { status: 400 });

  const { data: hold } = await supabase
    .from('holds')
    .select('id')
    .eq('session_id', sessionId)
    .eq('user_id', user.id)
    .in('state', ['active', 'charged'])
    .single();

  if (!hold) return NextResponse.json({ error: 'No hold for this session' }, { status: 403 });

  const { error } = await supabase.from('ratings').upsert(
    {
      session_id: sessionId,
      user_id: user.id,
      stars,
      vibes: vibes ?? [],
      note: note?.trim() || null,
    },
    { onConflict: 'session_id,user_id' }
  );

  if (error) {
    if (error.code === '42P01') {
      return NextResponse.json({ ok: true, note: 'ratings table not yet created' });
    }
    return NextResponse.json({ error: 'Failed to save rating' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

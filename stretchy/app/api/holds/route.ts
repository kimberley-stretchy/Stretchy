import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { sessionId } = await req.json();
  if (!sessionId) return NextResponse.json({ error: 'sessionId required' }, { status: 400 });

  const { data: session } = await supabase
    .from('sessions')
    .select('id, state, max_attendees, holds(count)')
    .eq('id', sessionId)
    .single();

  if (!session) return NextResponse.json({ error: 'Session not found' }, { status: 404 });
  if (session.state !== 'open') return NextResponse.json({ error: 'Session not open' }, { status: 409 });

  const holdCount = session.holds?.[0]?.count ?? 0;
  if (holdCount >= session.max_attendees) {
    return NextResponse.json({ error: 'Session full' }, { status: 409 });
  }

  const { data: existing } = await supabase
    .from('holds')
    .select('id')
    .eq('session_id', sessionId)
    .eq('user_id', user.id)
    .eq('state', 'active')
    .single();

  if (existing) return NextResponse.json({ error: 'Already holding' }, { status: 409 });

  const { data: hold, error } = await supabase
    .from('holds')
    .insert({ session_id: sessionId, user_id: user.id, state: 'active' })
    .select()
    .single();

  if (error) return NextResponse.json({ error: 'Failed to place hold' }, { status: 500 });

  return NextResponse.json({ hold });
}

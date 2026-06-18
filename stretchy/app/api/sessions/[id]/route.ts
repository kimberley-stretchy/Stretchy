import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data: host } = await supabase
    .from('hosts')
    .select('id')
    .eq('auth_user_id', user.id)
    .single();
  if (!host) return NextResponse.json({ error: 'Not a host' }, { status: 403 });

  const { data: session } = await supabase
    .from('sessions')
    .select('id, host_id, min_attendees')
    .eq('id', id)
    .single();

  if (!session || session.host_id !== host.id) {
    return NextResponse.json({ error: 'Session not found' }, { status: 404 });
  }

  const { count: holdCount } = await supabase
    .from('holds')
    .select('*', { count: 'exact', head: true })
    .eq('session_id', id)
    .eq('state', 'active');

  const body = await req.json();
  const { min_attendees, max_attendees, social_stretch_venue, social_stretch_note } = body;

  const update: Record<string, unknown> = {};

  if (min_attendees !== undefined) {
    const minVal = Number(min_attendees);
    const holds = holdCount ?? 0;
    if (minVal < holds) {
      return NextResponse.json(
        { error: `Can't set minimum below current hold count (${holds})` },
        { status: 400 }
      );
    }
    if (minVal < 2) {
      return NextResponse.json({ error: 'Minimum must be at least 2' }, { status: 400 });
    }
    update.min_attendees = minVal;
  }

  if (max_attendees !== undefined) {
    update.max_attendees = Number(max_attendees);
  }

  if (social_stretch_venue !== undefined) {
    update.social_stretch_venue = social_stretch_venue;
  }

  if (social_stretch_note !== undefined) {
    update.social_stretch_note = social_stretch_note;
  }

  if (Object.keys(update).length === 0) {
    return NextResponse.json({ error: 'Nothing to update' }, { status: 400 });
  }

  const { error } = await supabase.from('sessions').update(update).eq('id', id);
  if (error) return NextResponse.json({ error: 'Update failed' }, { status: 500 });

  return NextResponse.json({ ok: true });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data: host } = await supabase
    .from('hosts')
    .select('id')
    .eq('auth_user_id', user.id)
    .single();
  if (!host) return NextResponse.json({ error: 'Not a host' }, { status: 403 });

  const { data: session } = await supabase
    .from('sessions')
    .select('id, host_id, state')
    .eq('id', id)
    .single();

  if (!session || session.host_id !== host.id) {
    return NextResponse.json({ error: 'Session not found' }, { status: 404 });
  }

  if (session.state === 'confirmed') {
    return NextResponse.json({ error: 'Cannot cancel a confirmed session' }, { status: 409 });
  }

  await supabase.from('holds').update({ state: 'released' }).eq('session_id', id).eq('state', 'active');
  const { error } = await supabase.from('sessions').update({ state: 'cancelled' }).eq('id', id);
  if (error) return NextResponse.json({ error: 'Cancel failed' }, { status: 500 });

  return NextResponse.json({ ok: true });
}

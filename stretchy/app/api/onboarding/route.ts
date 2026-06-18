import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const update: Record<string, unknown> = {};

  if (typeof body.name === 'string' && body.name.trim()) {
    update.name = body.name.trim();
    update.email = user.email ?? '';
  }
  if (Array.isArray(body.neighbourhoods)) update.preferred_neighbourhood = body.neighbourhoods.join(',');
  if (Array.isArray(body.movements)) update.preferred_session_type = body.movements.join(',');
  if (typeof body.notif_push === 'boolean') update.notification_push = body.notif_push;
  if (typeof body.notif_email === 'boolean') update.notification_email = body.notif_email;

  if (!Object.keys(update).length) return NextResponse.json({ ok: true });

  const { error } = await supabase
    .from('attendees')
    .upsert({ ...update, auth_user_id: user.id }, { onConflict: 'auth_user_id' });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

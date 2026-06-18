import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';

export async function PATCH(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const update: Record<string, boolean> = {};
  if (typeof body.notification_email === 'boolean') update.notification_email = body.notification_email;
  if (typeof body.notification_push === 'boolean') update.notification_push = body.notification_push;
  if (typeof body.notification_sms === 'boolean') update.notification_sms = body.notification_sms;

  if (!Object.keys(update).length) return NextResponse.json({ error: 'Nothing to update' }, { status: 400 });

  const { error } = await supabase
    .from('attendees')
    .update(update)
    .eq('auth_user_id', user.id);

  if (error) return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  return NextResponse.json({ ok: true });
}

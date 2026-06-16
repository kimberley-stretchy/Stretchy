import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data: hold } = await supabase
    .from('holds')
    .select('id, user_id, session_id')
    .eq('id', id)
    .single();

  if (!hold) return NextResponse.json({ error: 'Hold not found' }, { status: 404 });
  if (hold.user_id !== user.id) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  await supabase.from('holds').update({ state: 'released' }).eq('id', id);

  return NextResponse.json({ ok: true });
}

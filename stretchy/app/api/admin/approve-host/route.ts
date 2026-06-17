import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';
import { createClient as createServiceClient } from '@supabase/supabase-js';

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS ?? '').split(',').map((e) => e.trim().toLowerCase());

const service = createServiceClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user || !ADMIN_EMAILS.includes(user.email?.toLowerCase() ?? '')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const { applicationId, userId, name, specialty } = await req.json();

  // Create host record
  const { error } = await service.from('hosts').insert({
    auth_user_id: userId,
    name,
    specialty: specialty ?? null,
  });

  if (error && error.code !== '23505') {
    return NextResponse.json({ error: 'Failed to create host' }, { status: 500 });
  }

  // Mark application as approved
  await service
    .from('host_applications')
    .update({ status: 'approved', approved_at: new Date().toISOString() })
    .eq('id', applicationId);

  return NextResponse.json({ ok: true });
}

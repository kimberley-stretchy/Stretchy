import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';
import { createClient as createServiceClient } from '@supabase/supabase-js';

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS ?? '').split(',').map((e) => e.trim().toLowerCase());

const service = createServiceClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> },
) {
  // Check auth header first (for server-to-server calls)
  const headerEmail = request.headers.get('x-admin-email')?.toLowerCase() ?? '';
  if (headerEmail && ADMIN_EMAILS.includes(headerEmail)) {
    // Authorised via header
  } else {
    // Fall back to checking the session user
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user || !ADMIN_EMAILS.includes(user.email?.toLowerCase() ?? '')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }
  }

  const { sessionId } = await params;

  const { error } = await service
    .from('sessions')
    .update({ host_paid_at: new Date().toISOString() })
    .eq('id', sessionId);

  if (error) {
    return NextResponse.json({ error: 'Failed to mark as paid' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

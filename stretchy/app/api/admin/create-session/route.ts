import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';
import { createClient as createServiceClient } from '@supabase/supabase-js';

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS ?? '').split(',').map((e) => e.trim().toLowerCase()).filter(Boolean);

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user || !ADMIN_EMAILS.includes(user.email?.toLowerCase() ?? '')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const service = createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  const { hostId, title, movementType, startsAt, locationName, target, minSpots, maxSpots, description } = await req.json();

  if (!hostId) return NextResponse.json({ error: 'hostId required' }, { status: 400 });

  const start = new Date(startsAt);
  const end = new Date(start.getTime() + 60 * 60 * 1000); // default 60min

  const { data: session, error } = await service.from('sessions').insert({
    host_id: hostId,
    title: title ?? 'Test Session',
    movement_type: movementType ?? 'yoga',
    starts_at: start.toISOString(),
    ends_at: end.toISOString(),
    location_name: locationName ?? 'TBC',
    description: description ?? null,
    host_target: Number(target ?? 200),
    min_attendees: Number(minSpots ?? 6),
    max_attendees: Number(maxSpots ?? 16),
    state: 'open',
  }).select().single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ session });
}
